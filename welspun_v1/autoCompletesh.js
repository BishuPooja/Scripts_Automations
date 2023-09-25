const rp = require("request-promise")
const _ = require("lodash")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"


const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTI5NTcxNDEsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiI0OTViODcyOC1jNzYxLTRmYTctODNmZS1kYjc1YTdkNjMyMjEiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.z-v8d7Dmw3MbuQ6rEo9y6Tit3AnrKqISvbPzF7a-Ez8"

async function bulkSync(payload) {
    let url = `${FRT_PUB_BASE_URL}/shipment/v1/shipment/bulk/sync`
    try {
        let res = await rp({
            uri: url,
            method: "POST",
            body: payload,
            headers: {
                authorization: TOKEN
            },
            json: true
        })
        console.log(`Bulk Sync api res status for sh ${payload.shipmentId} : ${res.status}`);
        if (res.status === 200) {
            return res.data
        } else {
            console.log(`Bulk Sync api res error for sh ${payload.shipmentId} : ${res.error}`);
        }
    } catch (e) {
        console.log(`Catched error in bulkSync api for sh ${payload.shipmentId} : ${e.message}`);
    }
    return null;
}


async function main(sh) {
    try {
        let shNo = sh?.shipmentNumber
        let shId = sh?.uuid
        console.log(`Shipment ${shNo}`)
        let lastStage = _.last(sh?.shipmentStages)
        let stageId = lastStage?.uuid
        let userId = sh?.updates?.userId
        if (lastStage?.departureTime && userId != "868ac373-ed4f-407d-9a26-b6b0e17fae1f") {
            // complete Sh
            let shCompletePayload = {
                "shipmentId": shId,
                "updates": [{
                    "keyToUpdate": "markcomplete",
                    "updatedValue": lastStage?.departureTime + 100000,
                    "stageId": stageId
                }]
            }
            console.log(`shipment Departure Time ${lastStage?.departureTime}`)
            await bulkSync(shCompletePayload)
        } else {
            console.log(`Found User Id Of System So Not Updating Via Automation ${lastStage?.departureTime}`)
        }
    } catch (e) {
        console.log(`Caught Error main ${e.message}`)
    }
}

await main($event)