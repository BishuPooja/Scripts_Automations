const rp = require("request-promise")
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODQ0NzU4MjksInVzZXJJZCI6ImJvdHVzZXItLTZlM2M5MGU4LWMwZTItNDhlYS1iNjc4LTlmNzZhOGRhZTk2YyIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTZlM2M5MGU4LWMwZTItNDhlYS1iNjc4LTlmNzZhOGRhZTk2YyIsIm9yZ0lkIjoiMDZhY2FjN2YtNTY5Ny00ZmVmLTlhNjEtZWVmNDdmNzUzNjdhIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.0Kk62vXUuI2VBWAwauBiluOAGrNX1DH93mhC45xklmI"

async function getShs() {
    try {
        let url = `https://apis.fretron.com/shipment-view/shipments/v1?filters=%7B%22shipmentDate%22%3A%7B%22isTillExpression%22%3Afalse%2C%22isFromExpression%22%3Afalse%2C%22from%22%3A1664562600000%2C%22till%22%3A1689791380000%7D%2C%22__version%22%3A2%2C%22_shipmentTrackingStatus_%22%3A%7B%22_or%22%3A%7B%22_at_delivery_%22%3A%7B%22shipmentTrackingStatus%22%3A%5B%22At%20Delivery%20Point%22%5D%7D%7D%7D%7D`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })
        return res.length ? res : []
    } catch (e) {
        console.log(`Getshs catch error ${e.message}`)
    }
    return []
}

async function bulkSyncApi(payload) {
    try {
        let res = await rp({
            url: "https://apis.fretron.com/shipment/v1/shipment/bulk/sync",
            method: "POST",
            body: payload,
            headers: {
                Authorization: TOKEN,
            },
            json: true
        })
        console.log(`bulkSyncApi Res Status: ${res?.status}`)
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
    let shs = await getShs()
    console.log(shs.length)
    for (let sh of shs) {
        let shNo = sh?.shipmentNumber
        console.log(`shipment No ${shNo}`)
        let shId = sh?.uuid
        let shStages = sh?.shipmentStages
        if (shStages[shStages?.length - 1].status == "AT") {
            let arrivalTime = shStages[shStages.length - 1]?.arrivalTime
            let stageId = shStages[shStages.length - 1].uuid
            let updatePayload = []
            if (arrivalTime) {
                updatePayload.push(
                    {
                        keyToUpdate: "departureTime",
                        updatedValue: arrivalTime + 60000,
                        stageId: stageId,
                        markComplete: true
                    })

                let payload = {
                    "shipmentId": shId,
                    "updates": updatePayload
                }
                console.log(JSON.stringify(payload))
                await bulkSyncApi(payload)
            }
        }
        // break
    }
}
main()