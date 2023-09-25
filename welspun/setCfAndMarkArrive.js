const rp = require("request-promise")
const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODk1Njk1MzMsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiI0OTViODcyOC1jNzYxLTRmYTctODNmZS1kYjc1YTdkNjMyMjEiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.6llZ0QWJ62KOy2CPZBCG-7pv0nKyNAFLFmrzMmcGif0"
const payload = {
    "Shipment ID": "4cd106a4-4390-4a95-810c-2ed4a62d651a",
    "Gate No -  MG3": 99,
    "Gate In Date": "7/17/2023",
    "Gate In Time": "2:23:34",
    "Remarks.": "ok",
    "Client Number": "678987"
}

function getCfPayload(key, type, value) {
    return {
        "indexedValue": [],
        "fieldKey": key,
        "multiple": false,
        "description": "",
        "remark": "",
        "uuid": null,
        "required": false,
        "accessType": null,
        "input": "string",
        "unit": "",
        "valueType": "string",
        "options": [],
        "fieldType": type,
        "value": value,
        "isRemark": false
    }
}


async function getShipmentById(shId) {
    try {
        let url = `https://apis.fretron.com/shipment/v1/shipment/${shId}?skipCn=true`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                Authorization: TOKEN
            }
        })
        if (res?.status == 200) {
            return res.data
        } else {
            console.log(`Error in getting sh ${res?.error}`)
            return null
        }
    } catch (e) {
        console.log(`Error in getting shipment ${e.message}`)
    }
    return null
}
async function bulkSyncApi(payload) {
    let url = `https://apis.fretron.com/shipment/v1/shipment/bulk/sync`;

    try {
        let res = await rp({
            method: "POST",
            uri: url,
            body: payload,
            headers: {
                Authorization: TOKEN,
            },
            json: true,
        });
        console.log(`Bulk Sync api response status : ${res.status}`);
        if (res.status == 200) {
            return res.data;
        } else {
            console.log(`Bulk Sync api response error : ${res.error}`);
        }
    } catch (e) {
        console.log(`Catched Error in Bulk Sync api : ${e.message}`);
    }
    return null;
}

async function main(paylaod) {
    let shId = ""
    let gateInDate = ""
    let gateInTime = ""
    let cfToAdd = []
    for (let item in paylaod) {
        console.log(item)
        if (item == "Shipment ID") {
            shId = payload[item]
        }
        else if (item == "Gate In Date") {
            gateInDate = payload[item]
        }
        else if (item == "Gate In Time") {
            gateInTime = paylaod[item]
        }
        else {

            cfToAdd.push(getCfPayload(item, "text", payload[item]))
        }
    }

    let shRes = await getShipmentById(shId)
    if (shRes) {
        let shNo = shRes?.shipmentNumber
        console.log(`shNo ${shNo}`)
        let shStage = shRes?.shipmentStages
        let destinationId = shStage?.length == 2 ? shStage[1]?.uuid : null
        let payloadAddCf = {
            shipmentId: shId,
            updates: [
                {
                    keyToUpdate: "customfields",
                    updatedValue: cfToAdd,
                },
            ],
        }

        console.log(JSON.stringify(payloadAddCf))
        await bulkSyncApi(payloadAddCf)
        if (destinationId) {
            let markArrivePayload = {
                "shipmentId": shId,
                "updates": [{
                    "keyToUpdate": "arrivalTime",
                    "updatedValue": new Date(`${gateInDate} ${gateInTime}`).valueOf(),
                    "stageId": destinationId
                }]
            }

            console.log(JSON.stringify(markArrivePayload))
            await bulkSyncApi(markArrivePayload)
        }
        else {
            console.log(`Destination Id not found For ${shNo}`)
        }

    } else {
        console.log(`shipment Not found ${shId}`)
    }

}

try {
    main(payload)
} catch (e) {
    console.log(`error in calling main ${e.message}`)
}