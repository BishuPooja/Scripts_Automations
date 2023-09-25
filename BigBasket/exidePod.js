const rp = require("request-promise")
const fs = require("fs")
const _ = require("lodash")
const { log } = require("console")

const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODE0NjcwNDUsInVzZXJJZCI6ImJvdHVzZXItLTAwMTdkMmMwLTMwMGEtNGRkMS04NjBkLTExNGI0Yjk4NDE5OSIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTAwMTdkMmMwLTMwMGEtNGRkMS04NjBkLTExNGI0Yjk4NDE5OSIsIm9yZ0lkIjoiNGU0ODMwMzgtNmY4MC00ZWU5LTkyODEtMTVhNDYyYmZjYmRhIiwibmFtZSI6InNoaXBtZW50Iiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.Mcs_YHCi872NynxNEKde31QOvgYoVZPm-hZGGYAsMdE"
let FRT_PUB_BASE_URL = "https://apis.fretron.com"

async function getConsignment() {

    let res = await rp({
        url: `https://apis.fretron.com/shipment-view/consignments/enriched?filters=%7B%22_shipment_%22%3A%7B%22shipmentNumber%22%3A%5B%5D%2C%22vehicleRN%22%3A%5B%5D%2C%22shipmentType%22%3A%5B%5D%2C%22shipmentEdd%22%3A%7B%22from%22%3Anull%2C%22till%22%3Anull%7D%2C%22shipmentDate%22%3A%7B%22from%22%3Anull%2C%22till%22%3Anull%7D%2C%22_origin_%22%3Anull%2C%22_destination_%22%3Anull%2C%22challanBranchName%22%3A%5B%5D%2C%22challanZoneName%22%3A%5B%5D%2C%22challanRegionName%22%3A%5B%5D%7D%2C%22_consignment_%22%3A%7B%22trackingStatus%22%3A%5B%5D%2C%22edd%22%3A%7B%22from%22%3Anull%2C%22till%22%3Anull%7D%2C%22consignee%22%3A%5B%5D%2C%22consigner%22%3A%5B%5D%2C%22consignerPlace%22%3A%5B%5D%2C%22consigneePlace%22%3A%5B%5D%2C%22customer%22%3A%5B%5D%2C%22consignmentDate%22%3A%7B%22from%22%3A1675189860000%2C%22till%22%3A1681731060000%7D%2C%22material%22%3A%5B%5D%2C%22invoiceValue%22%3Anull%2C%22billToParty%22%3A%5B%5D%2C%22branch%22%3A%5B%5D%2C%22zone%22%3A%5B%5D%2C%22region%22%3A%5B%5D%2C%22podEdd%22%3A%7B%22from%22%3Anull%2C%22till%22%3Anull%7D%2C%22podSubmissionDate%22%3A%7B%22from%22%3Anull%2C%22till%22%3Anull%7D%2C%22podStatus%22%3A%5B%22SUBMITTED%22%5D%2C%22podFeedingStatus%22%3Anull%2C%22consignmentDeliveryDate%22%3Anull%2C%22podTrackingStatus%22%3A%5B%5D%2C%22status%22%3A%5B%22Planned%22%2C%22In%20Transit%22%2C%22Created%22%2C%22Delivered%20%3A%20Hosur%22%2C%22Delivered%20%3A%20Bawal%22%2C%22Delivered%20%3A%20Chennai%22%2C%22Delivered%20%3A%20Pantnagar%22%2C%22Delivered%20%3A%20Indore%22%2C%22Delivered%20%3A%20Nagpur%22%5D%7D%7D&sortBy=%5B%22consignmentDate%22%5D&size=80`,
        method: "GET",
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

async function getShMaster(shId) {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/shipment/v1/shipment/${shId}?skipCn=false`,
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
            return null
        }
    } catch (e) {
        console.log(`error executing getShMaster ${e.message}`)
    }

}


async function main() {
    let consignments = await getConsignment()
    console.log(consignments.length)
    let count = 0
    let shData = []
    let successData = []
    for (let element of consignments) {
        let cnObj = element.consignment
        let cnNo = cnObj.consignmentNo
        let shipmentId = cnObj.activeShipment
        let value = await getShMaster(shipmentId)
        let shId = value.uuid

        if (value.shipmentStatus != "Completed") {
            count += 1
            console.log(`count---->${count}  status --->${value.shipmentStatus}`)
            let shStages = (value?.shipmentStages?.length) ? value.shipmentStages : []
            for (let i = 0; i < shStages.length; i++) {
                let item = shStages[i]
                let actualActivityEndTime = item?.actualActivityEndTime
                let actualActivityStartTime = item?.actualActivityStartTime
                let arrivalTime = item?.arrivalTime
                let timeUpdate = actualActivityEndTime ?? actualActivityStartTime ?? arrivalTime
                let stageId = item.uuid
                let conDelivered = item?.consignmentDelivered ?? []
                if (conDelivered.includes(cnObj.uuid)) {
                    console.log(`delivered for this consignment ${cnObj.consignmentNo}  shipment ${value.shipmentNumber}`);
                    let departureTime = item?.departureTime
                    console.log(`DepartureTime -->${departureTime}, arrivalTime -->${arrivalTime}, activityStTime -->${actualActivityStartTime},activityEndTime --->${actualActivityEndTime}, shNUm -->${value.shipmentNumber}, stageIdx --->${i}`)
                    if (departureTime) {
                        console.log(`departureTime`)
                        let payload1 = {
                            "shipmentId": shId,
                            "updates": [
                                {
                                    "keyToUpdate": "markcomplete",
                                    "updatedValue": departureTime,
                                    "stageId": stageId,
                                    "markComplete": true
                                }
                            ]
                        }

                        let updatedSh = await bulkSyncApi(payload1)
                        if (updatedSh == null) {
                            shData.push({
                                shNo: value.shipmentNumber
                            })
                        }
                        successData.push({
                            shNo: value.shipmentNumber
                        })
                    }
                    else {
                        if (timeUpdate) {
                            timeUpdate = timeUpdate + 3600000
                            console.log(`timeUpdate : ${timeUpdate}`)
                            let payload = {
                                "shipmentId": shId,
                                "updates": [
                                    {
                                        "keyToUpdate": "departureTime",
                                        "updatedValue": timeUpdate,
                                        "stageId": stageId,
                                        "markComplete": true
                                    }
                                ]
                            }
                            let updatedSh = await bulkSyncApi(payload)

                            if (updatedSh == null) {
                                shData.push({
                                    shNo: value.shipmentNumber
                                })
                            }
                            successData.push({
                                shNo: value.shipmentNumber
                            })
                        }
                    }
                }
            }
        }
    }
    console.log(`total Count -->${count}`)
    console.log(`failed cases --->${shData.length}---->${JSON.stringify(shData)}`)
    console.log(`successData  ---> ${successData.length} ----->  ${JSON.stringify(successData)}`)
}

main()

