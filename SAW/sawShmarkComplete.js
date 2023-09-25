const rp = require("request-promise")
const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODE4MjA0ODAsInVzZXJJZCI6ImJvdHVzZXItLWFkMDFiOTlmLWU3YTYtNGZjNS04ZmZmLWYxNmFmMzQzYjFlYyIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLWFkMDFiOTlmLWU3YTYtNGZjNS04ZmZmLWYxNmFmMzQzYjFlYyIsIm9yZ0lkIjoiM2FlZGE1MjctZWIzZS00MTNiLWFiNzgtY2FlNzdlMTE5N2QwIiwibmFtZSI6InNoIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.7IlVfVUERp0-oYxEWwSOog3Fg8VEGh9GSDGE4gwH580"

async function getShs() {
    let res = await rp({
        url: `https://apis.fretron.com/shipment-view/shipments/v1?filters={
             "__version": 2,
             "shipmentTrackingStatus":["Departed From Delivery Point"]
            }&size=400`,
        method: "GET",
        json: true,
        headers: {
            authorization: token
        }
    })

    if (res.status == 200) {
        return res.data
    }
    else {
        return res
    }
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
        if (res.status == 200) {
            return res
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

async function main() {
    let shipments = await getShs()
    console.log(shipments.length)
    let count = 0
    for (let i = 0; i < shipments.length; i++) {
        let item = shipments[i]
        let shId = item.uuid
        let shNo = item.shipmentNumber  
        console.log(`--- shNo  ${shNo} : ${i} -----`)
        let stages = item.shipmentStages
        let lastStage = stages[stages.length - 1]
        let departureTime = lastStage?.departureTime
        let stageId = lastStage.uuid

        if (departureTime) {
            let payload = {
                "shipmentId": shId,
                "updates": [
                    {
                        "keyToUpdate": "markcomplete",
                        "updatedValue": departureTime + 100000,
                        "stageId": stageId,
                        "markComplete": true
                    }
                ]
            }
            count = count + 1
            console.log(count)
            console.log(payload)
            let completedSh = await bulkSyncApi(payload)
            if (completedSh) {
                console.log(`sh completed -->${completedSh?.shipmentNumber} now status ${completedSh?.data?.shipmentStatus}`)
            }
            else {
                console.log(`shipment Not completed ${shNo}`)
            }
        }
        else {
            console.log(`departureTime not found ${shNo}`)
        }
    }
}

main()