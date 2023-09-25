const rp = require("request-promise")
var FRT_PUB_BASE_URL = "https://apis.fretron.com"
const { log } = require("console");
const { loadavg } = require("os");
const _ = require("lodash")
const moment = require("moment")
const fs = require("fs")

const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODA4NjcxNTgsInVzZXJJZCI6ImJvdHVzZXItLTZjNDZiNjZmLTY1NWEtNDM2NC05YWRlLWJiZGFlNzE2ODZhYSIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTZjNDZiNjZmLTY1NWEtNDM2NC05YWRlLWJiZGFlNzE2ODZhYSIsIm9yZ0lkIjoiODIzOTQ3YTMtMDJjMC00ZTY1LThmNGUtMjFkYTM3MGVhNmNkIiwibmFtZSI6InNoIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.Zz-8ZnwtdVKayyW7ZpX7POxdgWLnhKnXcNxPadF3yJw"

// PICK BELOW
async function calculateDistanceByCordinates(origin, destination) {
    let url =
        `${FRT_PUB_BASE_URL}/itinerary/admin/calculateDistance?originLat=${origin[1]}&originLng=${origin[0]}&destinationLat=${destination[1]}&destinationLng=${destination[0]}`
    console.log(`URL : ${url}`)
    let res = await rp({
        method: "GET",
        uri: url,
        json: true,
    });
    console.log(`CalKm by shipment Stage status : ${res.status}`);
    if (res.status == 200) {
        return res.data
    } else {
        console.log(`Error calculating distance- ${res.error}`)
        return 0
    }
}

async function getTimeline(startTime, endTime, imei) {
    try {
        let url = `${FRT_PUB_BASE_URL}/reports/timeline/byrange/v2?startTime=${startTime}&endTime=${endTime}&imei=${imei}`
        let res = await rp({
            method: "GET",
            uri: url,
            json: true,
            headers: { Authorization: token }
        });
        console.log(`Total timelines ${res.length} : imei ${imei} : from ${startTime} : till ${endTime}`)
        return res
    } catch (err) {
        console.log(`caught error in getting distance from timeline- ${err.message}`)
        return []
    }
}

async function ensureExtraKm(sh) {
    try {
        let origin = _.first(sh.shipmentStages).place
            ? _.first(sh.shipmentStages).place.centerCoordinates
            : _.first(sh.shipmentStages).hub
                ? _.first(sh.shipmentStages).hub.centerCoordinates
                : null

        let destination = _.last(sh.shipmentStages).place
            ? _.last(sh.shipmentStages).place.centerCoordinates
            : _.last(sh.shipmentStages).hub
                ? _.last(sh.shipmentStages).hub.centerCoordinates
                : null



        if (!origin && !destination) {
            console.log(`center cordinates not found`)
            return
        }

        let imei = sh?.fleetInfo?.device?.imei ?? sh?.fleetInfo?.vehicle.vtsDeviceId
        if (imei) {
            var calculatedDistance = await calculateDistanceByCordinates(origin, destination)
            let startTime = _.first(sh.shipmentStages).departureTime
            let endTime = _.last(sh.shipmentStages).arrivalTime
            let timeline = await getTimeline(startTime, endTime, imei)
            var totalDistance = 0
            timeline.map((value) => {
                if (value.totalDistance) totalDistance += value.totalDistance
            })

            calculatedDistance = Number((calculatedDistance /= 1000).toFixed(2))
            totalDistance = Number((totalDistance /= 1000).toFixed(2))

            console.log(`timelineDistance: ${totalDistance}`)
            console.log(`calculatedDistance: ${calculatedDistance}`)


            let extraTravelled = 0
            if (calculatedDistance && totalDistance) {
                let timeDiff = totalDistance - calculatedDistance
                if (timeDiff > 5) {
                    extraTravelled = timeDiff
                }
            }

            await customFieldAdd(sh.uuid, "Actual Distance", calculatedDistance, 'number');
            await customFieldAdd(sh.uuid, "Distance by GPS", totalDistance, 'number');
            await customFieldAdd(sh.uuid, "Extra KM Travelled", extraTravelled, 'number');
        }
        else {
            console.log(`Imei not found for timeline`)
        }
    }
    catch (e) {
        console.log(`Error in calculating Extra KM ${e.message} : ${e}`)
    }

}
async function getShById(id) {
    let res = await rp({
        'method': 'GET',
        'uri': `${FRT_PUB_BASE_URL}/shipment/v1/admin/shipment/${id}?skipCn=false`,
        'json': true
    })
    return res.data
}

async function customFieldAdd(shUUID, fieldKey, value, valueType = "string") {

    let res = await rp({
        url: `${FRT_PUB_BASE_URL}/shipment/v1/shipment/bulk/sync`,
        json: true,
        method: "POST",
        body: {
            shipmentId: shUUID,
            updates: [
                {
                    keyToUpdate: "customfields",
                    updatedValue: [
                        {
                            indexedValue: [""],
                            fieldKey: fieldKey,
                            multiple: false,
                            description: "",
                            remark: "",
                            required: true,
                            accessType: null,
                            'input': valueType,
                            unit: null,
                            'valueType': "string",
                            options: null,
                            fieldType: "text",
                            value: value + "",
                            isRemark: false,
                        },
                    ],
                },
            ],
        },
        headers: {
            Authorization: token,
        },
    });
    console.log(`Add cf ${fieldKey} : ${res.status}`)
    return res.status == 200
        ? "Custom Field " + value + " Added successfully"
        : res.error;
}


async function getSh() {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/shipment-view/shipments/v1?filters=%7B%22__version%22%3A2%2C%22shipmentDate%22%3A%7B%22isTillExpression%22%3Afalse%2C%22isFromExpression%22%3Afalse%2C%22from%22%3A1677609000000%2C%22till%22%3A1681324252000%7D%2C%22_shipmentStatus_%22%3A%7B%22shipmentStatus%22%3A%5B%22Completed%22%5D%7D%2C%22_shcf_Transportation%20Type%22%3A%5B%22CT%22%5D%7D&size=3500`,
            method: "GET",
            json: true,
            headers: {
                authorization: token
            }
        })
        // console.log(res);
        return res
    }
    catch (e) {
        console.log(`error executing while getting sh ${e.message}`);
    }

}

async function main() {
    // let sh = await getSh()
    // console.log(sh.length)
    let count = 0
    let readData = JSON.parse(fs.readFileSync("shIdForExtraKm.json", "utf-8"))
    console.log(readData.length)
    for (let i = 1000; i < 2000; i++) {
        let item = readData[i]
        let shId = item.shId
        console.log(`shipment Number ${item.shNo}`);
        let shMaster = await getShById(shId)
        if (shMaster) {

            await ensureExtraKm(shMaster)
            count += 1
            console.log(`total count ${count} `);
        }
        console.log("----------------")

    }
}

main()