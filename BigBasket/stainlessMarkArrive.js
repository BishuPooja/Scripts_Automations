const rp = require("request-promise")
const _ = require("lodash")
const { log } = require("console")
const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODExMTQyMTYsInVzZXJJZCI6ImJvdHVzZXItLWZmYjNlZjBlLWI2MTUtNDkzNC1hNmY5LTVhYzEzYzZlNmRiZSIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLWZmYjNlZjBlLWI2MTUtNDkzNC1hNmY5LTVhYzEzYzZlNmRiZSIsIm9yZ0lkIjoiZDI1NWEwMDAtZjI3MS00ODllLTk0MDgtYjlmYjdkNTkyYjQ0IiwibmFtZSI6IlNISVBNRU5UX1RPS0VOIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.0DNhxf1UDvoZvO-fJaZiNcsbBkJUhcotQ7GsTdR7yCM"
async function getSh() {
    let res = await rp({
        url: `https://apis.fretron.com/shipment-view/shipments/v1?filters=%7B%22__version%22%3A2%2C%22_origin_%22%3A%7B%22_nested%22%3A%7B%22_path%22%3A%22shipmentStages%22%2C%22shipmentStages.tripPoint.purpose%22%3A%5B%22Pickup%22%5D%2C%22_or%22%3A%7B%22shipmentStages.place.name%22%3A%5B%22JSHL%20CRD%22%5D%2C%22shipmentStages.hub.name%22%3A%5B%22JSHL%20CRD%22%5D%7D%7D%7D%2C%22_shipmentTrackingStatus_%22%3A%7B%22_or%22%3A%7B%22_enroute_for_pickup_%22%3A%7B%22shipmentTrackingStatus%22%3A%5B%22Enroute%20For%20Pickup%22%5D%7D%7D%7D%7D`,
        method: 'GET',
        json: true,
        headers: {
            authorization: token
        }
    })

    return res
}
async function bulkSyncApi(payload) {
    try {
        let res = await rp({
            url: "https://apis.fretron.com/shipment/v1/shipment/bulk/sync",
            method: "POST",
            body: payload,
            headers: {
                Authorization: token,
            },
            json: true
        })
        console.log(`bulk syn res status ${res.status}`)
        if (res.status == 200) {
            return res.data
        }
        else {
            console.log(res.error);
            return null
        }
    } catch (e) {
        console.log(`error executing while mark complete ${e.message}`);
        return null
    }
}

async function getActivityLog(uuid) {
    let url = `https://apis.fretron.com/shipment/v1/shipment/${uuid}/update-trail/v2?limit=150&offset=0`

    // console.log(url)
    let res = await rp({
        url: url,
        json: true,
        method: "GET",
        headers: {
            Authorization: token
        }
    })
    return res.status == 200 ? res.data : res.error
}

async function main() {
    let shs = await getSh()
    let count = 0
    console.log(shs.length)
    for (let j = 1; j < shs.length; j++) {
        let item = shs[j]
        console.log(item.shipmentNumber)
        let uuid = item.uuid
        let stageId = (item.shipmentStages[0]).uuid
        let logs = await getActivityLog(uuid)

        for (let i = logs.length - 1; i >= 0; i--) {
            let value = logs[i]
            let updatedBy = value.updatedBy.includes("System Trip")
            let markArrive = value.description.includes("Marked arrive")
            let markDeparture = value.description.includes("Marked vehicle departed")
            let time = value?.time
            let payload = {
                "shipmentId": uuid,
                "updates": []
            }
            if (updatedBy && markArrive) {
                count += 1
                console.log(`count ${count}`)
                payload.updates.push({
                    "keyToUpdate": "arrivalTime",
                    "updatedValue": time,
                    "stageId": stageId,
                })
                console.log("mark Arrive")
            }
            if (updatedBy && markDeparture) {
                count += 1
                console.log(`count ${count}`)
                payload.updates.push({
                    "keyToUpdate": "departureTime",
                    "updatedValue": time,
                    "stageId": stageId,
                })
                console.log("mark departed ")
            }

            if (payload.updates.length > 0) {
                console.log(payload)
                // await bulkSyncApi(payload)
            }

            if (updatedBy && markArrive && markDeparture) {
                break
            }
        }
    }
    console.log(`count ${count}`)

}
main()

