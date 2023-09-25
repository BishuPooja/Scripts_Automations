const { lstat } = require("fs")
const _ = require("lodash")
const rp = require("request-promise")
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODkyMzk1MDQsInVzZXJJZCI6ImJvdHVzZXItLWQ5Y2E4MmE3LWQyNTItNDdhZS1iYTQ4LTYxMTAxYTc1NTdjMSIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLWQ5Y2E4MmE3LWQyNTItNDdhZS1iYTQ4LTYxMTAxYTc1NTdjMSIsIm9yZ0lkIjoiNDY0ZDRlNmEtNGQ2Mi00MjlmLWE2NjAtODZhNDg4MzljN2FmIiwibmFtZSI6InN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.Yg6D_CHDMq44OEufsJbofihk6HpCNp6-yrNStaXKgaE"



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
        let filters = { "shipmentDate": { "isTillExpression": false, "isFromExpression": false, "from": 1669874220000, "till": 1690828175000 }, "__version": 2, "_not": { "_shipmentStatus_": { "shipmentStatus": ["Completed"] } } }

        let url = `https://apis.fretron.com/shipment-view/shipments/v1?filters=${encodeURIComponent(JSON.stringify(filters))}&size=300`
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

function getPayload(shCreationTime, stageId, arrivalTime, departureTime, isLastStage, i, firstStageDepartureTime) {
    try {
        let updatePayload = []
        if (isLastStage && !arrivalTime) {
            let time = shCreationTime + 8.64e+7 * (i + 2)
            if (firstStageDepartureTime) {
                if (firstStageDepartureTime > time) {
                    console.log(firstStageDepartureTime)
                    time = firstStageDepartureTime + 600000
                }
            }

            updatePayload.push(
                {
                    keyToUpdate: "arrivalTime",
                    updatedValue: time,
                    stageId: stageId,
                }, {
                keyToUpdate: "departureTime",
                updatedValue: time + 600000,
                stageId: stageId,
                markComplete: true
            })
        }

        if (isLastStage && arrivalTime && !departureTime) {
            updatePayload.push(
                {
                    keyToUpdate: "departureTime",
                    updatedValue: arrivalTime + 600000,
                    stageId: stageId,
                    markComplete: true
                })
        }

        if (!arrivalTime && !isLastStage) {
            updatePayload.push({
                keyToUpdate: "arrivalTime",
                updatedValue: shCreationTime + 8.64e+7 * (i + 1),
                stageId: stageId,
            }, {
                keyToUpdate: "departureTime",
                updatedValue: shCreationTime + 8.64e+7 * (i + 1) + 600000,
                stageId: stageId,
            }
            )
        }

        if (arrivalTime && !departureTime && !isLastStage) {
            updatePayload.push({
                keyToUpdate: "departureTime",
                updatedValue: arrivalTime + 600000,
                stageId: stageId,
            })
        }

        return updatePayload

    } catch (e) {
        console.log(`error in Getting Payload ${e.message}`)
    }

}

async function main() {
    try {
        let shs = await getShs()
        console.log(shs?.length)
        let count = 0
        let completedShs = []
        if (!shs.length) {
            return
        }
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
            // break
        }
        console.log(`Total ${count} completed`)
        console.log(JSON.stringify(completedShs))
    } catch (e) {
        console.log(`error in main ${e.message}`)
    }
}


main()






