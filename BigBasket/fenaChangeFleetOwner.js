const rp = require("request-promise")
const fs = require("fs")
const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTk2MTUwNzgsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiM2U0Y2RlZTktMGIzYi00NmRkLTliOTgtZGYwZTM4YTAyNzFjIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.5O6WOi-X1oPHeB0MBR55595z8P_R1pn3rhPKMHisk0I"

const cnArr = ["7022301516", "7022301313", "7022301384", "7022301640"]
const rubaniTransport = {
    "geoFence": null,
    "documents": [],
    "customFields": [
        {
            "indexedValue": [
                "bidRemainingV2_0"
            ],
            "fieldKey": "bidRemainingV2",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "String",
            "unit": null,
            "valueType": "String",
            "options": null,
            "fieldType": "text",
            "value": "0",
            "isRemark": false
        },
        {
            "indexedValue": [
                "bidSubmittedV2_0"
            ],
            "fieldKey": "bidSubmittedV2",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "String",
            "unit": null,
            "valueType": "String",
            "options": null,
            "fieldType": "text",
            "value": "0",
            "isRemark": false
        },
        {
            "indexedValue": [
                "minRemainingTimeV2_0"
            ],
            "fieldKey": "minRemainingTimeV2",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "String",
            "unit": null,
            "valueType": "String",
            "options": null,
            "fieldType": "text",
            "value": "0",
            "isRemark": false
        },
        {
            "indexedValue": [
                "totalAuctionsV2_0"
            ],
            "fieldKey": "totalAuctionsV2",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "String",
            "unit": null,
            "valueType": "String",
            "options": null,
            "fieldType": "text",
            "value": "0",
            "isRemark": false
        },
        {
            "indexedValue": [
                "criticalOrderV2_0"
            ],
            "fieldKey": "criticalOrderV2",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "String",
            "unit": null,
            "valueType": "String",
            "options": null,
            "fieldType": "text",
            "value": "0",
            "isRemark": false
        },
        {
            "indexedValue": [
                "live-auctions_0"
            ],
            "fieldKey": "live-auctions",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "String",
            "unit": null,
            "valueType": "String",
            "options": null,
            "fieldType": "text",
            "value": "0",
            "isRemark": false
        },
        {
            "indexedValue": [
                "live-bids-pending_0"
            ],
            "fieldKey": "live-bids-pending",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "String",
            "unit": null,
            "valueType": "String",
            "options": null,
            "fieldType": "text",
            "value": "0",
            "isRemark": false
        },
        {
            "indexedValue": [
                "totalPlacementPendingV2_0"
            ],
            "fieldKey": "totalPlacementPendingV2",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "String",
            "unit": null,
            "valueType": "String",
            "options": null,
            "fieldType": "text",
            "value": "0",
            "isRemark": false
        }
    ],
    "isPortalEnabled": true,
    "type": "vendor",
    "updates": {
        "traceID": "d4528450-3e30-40e8-8f7b-0d9f1b928fff",
        "resourceId": "77783d42-86b0-4f5e-a618-2a34d9e2e778",
        "updatedBy": "SYSTEM",
        "changes": [
            {
                "lastValue": "1",
                "fieldName": "totalPlacementPendingV2",
                "fieldType": "String",
                "currentValue": "0"
            }
        ],
        "sourceOfInformation": null,
        "description": "updated field totalPlacementPendingV2",
        "forwardReasons": [
            "business.partner.update.event",
            "business.partner.custom.field"
        ],
        "userId": null,
        "uuid": "827005dd-c42b-457a-aecd-3c4b321caacc",
        "revision": null,
        "time": 1684495198573,
        "forwardedFrom": null,
        "resourceType": "Business-Partner",
        "updateType": null
    },
    "uuid": "77783d42-86b0-4f5e-a618-2a34d9e2e778",
    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
    "firmType": "INDIVISUAL",
    "gstn": "07ESXPK6651Q2ZG",
    "voterId": null,
    "verificationTicketId": null,
    "group": {
        "name": "Broker",
        "partnerType": "vendor",
        "uuid": "661a7cb5-339b-48f5-942f-967e9fc1abf3",
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
    },
    "address": "{\"pincode\":110014,\"address\":\"58 CHURCH ROAD BHOGAL\",\"city\":\"NEW DELHI\",\"state\":\"\"}",
    "verificationStatus": "unverified",
    "externalId": "7500484",
    "panNumber": "ESXPK6651Q",
    "aadharNo": null,
    "parentId": null,
    "places": [],
    "route": null,
    "name": "RUBANI TRANSPORT",
    "location": null,
    "fretronId": null,
    "contacts": [
        {
            "emails": [
                "gagandeepsingh.gs5004@gmail.com"
            ],
            "address": null,
            "mobileNumbers": [
                "9654818191"
            ],
            "mobileNumber": null,
            "name": "Mr. RAVNEET KAUR",
            "type": null
        },
        {
            "emails": [
                "logistics@fena.com"
            ],
            "address": null,
            "mobileNumbers": [],
            "mobileNumber": null,
            "name": "Mr. RAVNEET KAUR",
            "type": null
        }
    ],
    "status": "ACTIVE"
}
async function getshipments(shNo) {
    let res = await rp({
        uri: `https://apis.fretron.com/shipment-view/shipments/v1?search=${shNo}`,
        method: "GET",
        headers: {
            "Authorization": token,
        },
        json: true
    })
    // console.log(res)
    return res
}

async function putSh(payload) {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/shipment/v1/admin/shipment`,
            method: "PUT",
            json: true,
            body: payload,
        })
        console.log(`shipment put status ${res.status}`)
        return res
    }
    catch (e) {
        console.log(`error in put sh ${e.message}`)
    }

}
async function getShWithCn(shId) {
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
        console.log(`error executing while fetching shipment ${e.message}`)
    }

}

async function main() {
    // let shData = await getshipments()
    // console.log(shData)
    // fs.writeFileSync("fenaIncompleteSh.json", JSON.stringify(shData))
    let shs = JSON.parse(fs.readFileSync("fenaIncompleteSh.json", "utf8"))
    console.log(shs.length)
    let count = 0
    for (let item of shs) {
        count += 1
        console.log(`count ${count}`)
        let shId = item.uuid
        let shMaster = await getShWithCn(shId)
        let shNo = shMaster.shipmentNumber
        console.log(shNo)
        if (shMaster) {
            let broker = shMaster?.fleetInfo?.broker
            let fleetOwner = shMaster?.fleetInfo?.fleetOwner

            if (broker && fleetOwner && broker.name != fleetOwner.name) {
                console.log(`broker--> ${broker.name}, fleetOwner --> ${fleetOwner.name}`)
                shMaster.fleetInfo.fleetOwner = broker
                let payload = shMaster
                // await putSh(payload)
                console.log(`Execute for ${shNo}`)
                // break
            }
        }
    }
}

// main()

async function main2() {
    for (let item of cnArr) {
        let shRes = await getshipments(item)
        let shId = shRes.length ? shRes[0].uuid : null
        if (shId) {
            console.log(shRes[0].shipmentNumber)
            let shMaster = await getShWithCn(shId)
            console.log(`fleetOwner Name ${shMaster.fleetInfo.fleetOwner?.name}  brokerName  ${shMaster.fleetInfo.broker?.name}`)
            shMaster.fleetInfo.fleetOwner = rubaniTransport
            shMaster.fleetInfo.broker = rubaniTransport
            if (shMaster) {
                await putSh(shMaster)
            }
        }
        // break
    }
}
// main2()