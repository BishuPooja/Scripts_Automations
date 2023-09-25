const rp = require("request-promise")
const moment = require("moment")
const _ = require("lodash")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"
const FONUMBER = "IRN Number"
const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTA0NDMyNzMsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiIzZTRjZGVlOS0wYjNiLTQ2ZGQtOWI5OC1kZjBlMzhhMDI3MWMiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.FIEbnnSqkdRk0OD7L2huCypBAEVhuU4nmLIxuSQGAyE"

async function getCn(uuid) {
    try {
        const url = `${FRT_PUB_BASE_URL}/shipment/v1/consignment/${uuid}/shipments`;
        // console.log(url)
        const options = {
            uri: url,
            method: "GET",
            headers: {
                Authorization: TOKEN,
            },
            json: true,
        };

        const res = await rp(options);
        if (res?.status === 200) {
            return res.data;
        } else {
            console.log(`Error in getCn: ${res.error}`);
        }
    } catch (e) {
        console.log(`getCn catch error: ${e.message}`);
    }
    return null;
}

async function getShs() {
    try {
        let filters = { "_shipmentTrackingStatus_": { "_or": { "_at_delivery_": { "shipmentTrackingStatus": ["At Delivery Point"] } } }, "__version": 2 }
        let url = `https://apis.fretron.com/shipment-view/shipments/v1?filters=${encodeURIComponent(JSON.stringify(filters))}`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })

        return res?.length ? res : []
    } catch (e) {
        console.log(`error in getting shs ${e.message}`)
    }
}

function getFromCf(cfs, key) {
    return cfs?.find((v) => v.fieldKey == key)?.value ?? null
}

async function getTimeline(startTime, endTime, imei) {
    try {
        let url = `${FRT_PUB_BASE_URL}/reports/timeline/byrange/v2?startTime=${startTime}&endTime=${endTime}&imei=${imei}`
        let res = await rp({
            method: "GET",
            uri: url,
            json: true,
            headers: {
                Authorization: TOKEN
            }
        });
        console.log(`Total timelines ${res.length} : imei ${imei} : from ${startTime} : till ${endTime}`)
        return res
    } catch (err) {
        console.log(`caught error in getting distance from timeline- ${err.message}`)
        return []
    }
}


async function main() {
    try {
        let finalJson = []
        let shs = await getShs()
        console.log(`shs length ${shs?.length}`)
        if (shs?.length) {
            for (let sh of shs) {
                let stageId = sh.shipmentStages[sh.shipmentStages.length - 1].uuid
                let json = await makeJson(sh, stageId)
                finalJson.push(json)
                // break
            }
            finalJson = _.flatMap(finalJson)
            console.log(finalJson)
        }
    } catch (e) {
        console.log(`error in main ${e.message}`)
    }
}

main()

async function makeJson(sh, stageId) {
    try {
        let jsonArr = []
        let vehicleNo = sh?.fleetInfo?.vehicle?.vehicleRegistrationNumber ?? ""
        let shStages = sh?.shipmentStages
        let imei = sh?.fleetInfo?.device?.imei ?? null
        let json = {
            "vehicleNumber": "",
            "customerCode": "",
            "foNumber": "",
            "totalTravelTime": "",
            "totalDistance": "",
            "deliveryDate": "",
            "deliveryTime": "",
        }

        let deliveryStage = shStages?.find((v) => v.uuid == stageId)
        let cnIds = deliveryStage?.consignmentDelivered ?? []

        if (!cnIds) {
            return
        }
        for (let cnId of cnIds) {
            let pickupStage = shStages.find((v) => v?.consignmentPickUps?.includes(cnId)) ?? null
            if (!pickupStage) {
                pickupStage = shStages.filter(_ => _.tripPoint?.purpose == "Pickup");
                pickupStage = _.last(pickupStage)
                // console.log(pickupStage)
            }
            let consignment = await getCn(cnId)
            consignment = consignment?.consignment
            let externalId = consignment?.consignee?.externalId ?? null
            let cfs = consignment?.customFields ?? []
            let foNumber = getFromCf(cfs, FONUMBER)
            let startTime = pickupStage?.departureTime
            let endTime = deliveryStage?.arrivalTime
            let deliveryDate = moment(endTime).format("DD-MM-YYYY")
            let deliveryTime = moment(endTime).format(`HH:MM:SS`)
            let timeline = await getTimeline(startTime, endTime, imei)
            var totalDistance = 0
            timeline.map((value) => {
                if (value.totalDistance) totalDistance += value.totalDistance
            })

            let totalTravelTime = endTime - startTime
            totalDistance = Number((totalDistance /= 1000).toFixed(2))
            json["vehicleNumber"] = vehicleNo
            json["customerCode"] = externalId
            json["foNumber"] = foNumber
            json["totalTravelTime"] = totalTravelTime
            json["totalDistance"] = totalDistance
            json["deliveryDate"] = deliveryDate
            json["deliveryTime"] = deliveryTime
            jsonArr.push(json)
        }
        return jsonArr ?? []
    } catch (e) {
        console.log(`error in make json ${e.message}`)
    }
}