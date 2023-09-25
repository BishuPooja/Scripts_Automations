const rp = require("request-promise")
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODg2NDM0MjMsInVzZXJJZCI6ImJvdHVzZXItLTU2NWEzODRiLWI1ZGYtNGZlNC1iNWM5LTI1ZWE4ODljZWZiYSIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTU2NWEzODRiLWI1ZGYtNGZlNC1iNWM5LTI1ZWE4ODljZWZiYSIsIm9yZ0lkIjoiMTFhMzlkMmYtMTQ4NS00MDEwLWJmOTYtNjllOWZkY2RlMjAzIiwibmFtZSI6InN5c3RlbSBpbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.E9Yxr8ZMhDBaqOixSyGUNZNg8TQqg7ZqXsTiNokImCU"

const vendor = {
    "geoFence": null,
    "documents": [],
    "customFields": [
        {
            "indexedValue": [
                "totalPlacementPendingV2_1"
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
            "value": "1",
            "isRemark": false
        }
    ],
    "isPortalEnabled": true,
    "type": "vendor",
    "updates": {
        "traceID": "0ed55e2d-34d4-4e28-b510-8e3162822223",
        "resourceId": "8b049597-d664-41ce-9ca8-413197a048a6",
        "updatedBy": "SYSTEM",
        "changes": [],
        "sourceOfInformation": null,
        "description": "no fields updated",
        "forwardReasons": [
            "business.partner.update.event",
            "business.partner.custom.field"
        ],
        "userId": null,
        "uuid": "b93a8516-eb2f-4b7d-8194-f5c18e8fbd97",
        "revision": null,
        "time": 1684321494502,
        "forwardedFrom": null,
        "resourceType": "Business-Partner",
        "updateType": null
    },
    "uuid": "8b049597-d664-41ce-9ca8-413197a048a6",
    "orgId": "11a39d2f-1485-4010-bf96-69e9fdcde203",
    "firmType": "INDIVISUAL",
    "gstn": null,
    "voterId": null,
    "verificationTicketId": null,
    "companyCodes": null,
    "group": {
        "name": "lorryOwner",
        "partnerType": "vendor",
        "uuid": "9787c2f8-f248-4bd8-80fc-d190079f3576",
        "orgId": "11a39d2f-1485-4010-bf96-69e9fdcde203"
    },
    "address": "{\"address\":null,\"city\":null,\"state\":null,\"pincode\":null}",
    "verificationStatus": "verified",
    "externalId": null,
    "panNumber": null,
    "aadharNo": null,
    "parentId": null,
    "places": [
        {
            "hubId": null,
            "boundary": [
                [
                    [
                        78.0457731849373,
                        29.93453773152269
                    ],
                    [
                        78.05058212248304,
                        29.93621213129923
                    ],
                    [
                        78.04946576198137,
                        29.93256562453864
                    ],
                    [
                        78.0457731849373,
                        29.93453773152269
                    ]
                ]
            ],
            "address": null,
            "accessibility": "private",
            "addedBy": "11a39d2f-1485-4010-bf96-69e9fdcde203",
            "center": {
                "latitude": 29.934463304720808,
                "longitude": 78.04789856358475
            },
            "suggestedRadius": 0,
            "isOwned": null,
            "centerCoordinates": [
                78.04789856358475,
                29.934463304720808
            ],
            "placeId": "760c75b6-6957-4419-ae93-2d7496e40b8e",
            "geoJsonBoundry": null,
            "externalId": null,
            "source": "GOOGLE",
            "places": [
                {
                    "hubId": "760c75b6-6957-4419-ae93-2d7496e40b8e",
                    "boundary": null,
                    "address": "Pallvika Nursery Sidcul Rd, Dadpur Govindpur, Uttarakhand 249403, India",
                    "accessibility": "private",
                    "addedBy": "11a39d2f-1485-4010-bf96-69e9fdcde203",
                    "center": {
                        "latitude": 29.93384,
                        "longitude": 78.04833
                    },
                    "suggestedRadius": 190,
                    "isOwned": false,
                    "centerCoordinates": [
                        78.04833,
                        29.93384
                    ],
                    "placeId": "c3c1d452-b26b-4f53-93f9-7d706f78922c",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "FRETRON",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "RAMA LOGISTICS",
                    "state": null,
                    "category": "Fleet Office",
                    "subDistrict": null,
                    "controllingBranchId": null
                }
            ],
            "viewport": null,
            "district": null,
            "name": "RAMA LOGISTICS HUB",
            "state": null,
            "category": "Hub",
            "subDistrict": null,
            "controllingBranchId": null
        }
    ],
    "route": null,
    "name": "RAMA LOGISTICS",
    "location": null,
    "fretronId": null,
    "contacts": null,
    "status": "ACTIVE"
}
async function getShs() {
    try {
        let url = `https://apis.fretron.com/shipment-view/shipments/v1?size=300&allFields=["uuid","shipmentNumber"]`

        let res = await rp({
            uri: url,
            method: "GET",
            headers: {
                Authorization: TOKEN,
            },
            json: true,
        });
        // console.log(res)
        return res ?? []

    } catch (e) {
        console.log(`error getting shs ${e.message}`)
    }
    return []
}


async function updateFleetInfo(payload) {
    try {
        let url = `http://apis.fretron.com/shipment/v1/shipment/bulk/sync`
        let res = await rp({
            uri: url,
            method: "POST",
            body: payload,
            headers: {
                Authorization: TOKEN,
            },
            json: true,
        });
        console.log(`update fleetInfo status ${res.status}`)
        if (res.status != 200) {
            console.log(`error updating fleetInfo status ${res.error}`)
        }
    } catch (e) {
        console.log(`error updatingFleetInfo: ${e.message}`)
    }

}
async function main() {
    let shs = await getShs()
    console.log(shs.length)
    let count = 0
    for (let item of shs) {
        count += 1
        console.log(`count ${count}`)
        console.log(`Shipment Number ${item.shipmentNumber}`)
        let shId = item.uuid
        let payload = {
            "shipmentId": shId,
            "updates": []
        }

        payload.updates.push({
            "keyToUpdate": "fleetowner",
            "updatedValue": vendor
        })
        await updateFleetInfo(payload)
        // break
    }

}

main()