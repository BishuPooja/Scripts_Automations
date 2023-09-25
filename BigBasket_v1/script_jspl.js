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

            await customFieldAdd(sh.uuid, "Actual Distance", calculatedDistance,'number');
            await customFieldAdd(sh.uuid, "Distance by GPS", totalDistance,'number');
            await customFieldAdd(sh.uuid, "Extra KM Travelled", extraTravelled,'number');
        }
        else {
            console.log(`Imei not found for timeline`)
        }
    }
    catch (e) {
        console.log(`Error in calculating Extra KM ${e.message} : ${e}`)
    }

}
async function getShById(id){
    let res = await rp({
        'method':'GET',
        'uri':`${FRT_PUB_BASE_URL}/shipment/v1/admin/shipment/${id}?skipCn=false`,
        'json':true
    })
    return res.data
}

async function customFieldAdd(shUUID, fieldKey, value,valueType="string") {

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
                            value: value+"",
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

    return res.status == 200
        ? "Custom Field " + value + " Added successfully"
        : res.error;
}
await main()
