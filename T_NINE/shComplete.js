const { lstat } = require("fs")
const _ = require("lodash")
const rp = require("request-promise")
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODk4MzA2MDIsInVzZXJJZCI6ImJvdHVzZXItLTcyZGI1ZTU0LWMxZjctNDhiZi05ZWYxLTNmOWUyZjE4MzU5NCIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTcyZGI1ZTU0LWMxZjctNDhiZi05ZWYxLTNmOWUyZjE4MzU5NCIsIm9yZ0lkIjoiNTk2MzY5NmEtZTUyNC00NWM4LTkyMzctZDZhYzM5NjMxODg4IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.3fkTUtVFPSLyfDax3Wv5gMsJyI7HzrPqEFhQhi9Lhus"



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

async function getShs() {
    try {
        let filters = { "_shipmentStatus_": { "shipmentStatus": ["Planned", "Created"] }, "_trackingMode_": { "_or": { "_vts_lbs_": { "trackingMode": ["VTS-LBS"] } } }, "__version": 2, "shipmentDate": { "isTillExpression": false, "isFromExpression": false, "from": 1682879400000, "till": 1688149775000 } }

        let url = `https://apis.fretron.com/shipment-view/shipments/v1?filters=${encodeURIComponent(JSON.stringify(filters))}&size=1200`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })
        if (res?.length) {
            return res
        }
    } catch (e) {
        console.log(`Error in getShs ${e.message}`)
    }
    return []
}
async function main() {
    try {
        let shs = await getShs()
        console.log(shs?.length)
        let count = 0
        let completedShs = []
        for (let sh of shs) {
            let shNo = sh.shipmentNumber
            console.log(`ShipmentNo ${shNo}`)
            let shId = sh.uuid
            let shCreationTime = sh?.creationTime
            let shStages = sh?.shipmentStages
            let updatePayload = []
            for (let i = 0; i < shStages.length; i++) {
                let stage = shStages[i]
                let stageId = stage.uuid
                let status = stage?.status
                let arrivalTime = stage.arrivalTime
                let departureTime = stage.departureTime
                let isLastStage = shStages.length - 1

                if (status != "COMPLETED") {
                    console.log(`status ${status}`)
                    if (i != isLastStage) {
                        updatePayload.push(getPayload(shCreationTime, stageId, arrivalTime, departureTime, false, i, null))
                    }
                    if (i == isLastStage) {
                        let firstStageDepartureTime = shStages[i - 1]?.arrivalTime
                        updatePayload.push(getPayload(shCreationTime, stageId, arrivalTime, departureTime, true, i, firstStageDepartureTime))
                    }
                }
            }
            updatePayload = updatePayload.flat()
            let payload = {
                "shipmentId": shId,
                "updates": updatePayload
            }
            console.log(JSON.stringify(payload))
            let bulkSyncApiRes = await bulkSyncApi(payload)
            if (bulkSyncApiRes?.status == 200) {
                count += 1
                console.log(`count ${count}`)
                completedShs.push(shNo)
            }
            break
        }
        console.log(`Total ${count} completed`)
        console.log(JSON.stringify(completedShs))
    } catch (e) {
        console.log(`error in main ${e.message}`)
    }
}
function getPayload(shCreationTime, stageId, arrivalTime, departureTime, isLastStage, i, firstStageDepartureTime) {
    let updatePayload = []
    if (isLastStage && !arrivalTime) {

        let time = shCreationTime + 8.64e+7 * (i + 3)
        if (firstStageDepartureTime) {
            if (firstStageDepartureTime > time) {
                console.log(firstStageDepartureTime)
                time = firstStageDepartureTime + 60000
            }
        }

        updatePayload.push(
            {
                keyToUpdate: "arrivalTime",
                updatedValue: time,
                stageId: stageId,
            }, {
            keyToUpdate: "departureTime",
            updatedValue: time + 60000,
            stageId: stageId,
            markComplete: true
        })
    }

    if (isLastStage && arrivalTime && !departureTime) {
        updatePayload.push(
            {
                keyToUpdate: "departureTime",
                updatedValue: arrivalTime + 60000,
                stageId: stageId,
                markComplete: true
            })
    }

    if (!arrivalTime && !isLastStage) {
        updatePayload.push({
            keyToUpdate: "arrivalTime",
            updatedValue: shCreationTime + 8.64e+7 * (i + 2),
            stageId: stageId,
        }, {
            keyToUpdate: "departureTime",
            updatedValue: shCreationTime + 8.64e+7 * (i + 2) + 60000,
            stageId: stageId,
        }
        )
    }

    if (arrivalTime && !departureTime && !isLastStage) {
        updatePayload.push({
            keyToUpdate: "departureTime",
            updatedValue: arrivalTime + 60000,
            stageId: stageId,
        })
    }

    return updatePayload
    
}

main()






