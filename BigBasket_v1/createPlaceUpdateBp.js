const rp = require("request-promise")
const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODQ5MTExNzIsInVzZXJJZCI6ImJvdHVzZXItLTA3MTI5YjQ3LTg3ZjQtNGJjOC05MThmLTFmZTQ0YTQ5N2JmNiIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTA3MTI5YjQ3LTg3ZjQtNGJjOC05MThmLTFmZTQ0YTQ5N2JmNiIsIm9yZ0lkIjoiZDI1NWEwMDAtZjI3MS00ODllLTk0MDgtYjlmYjdkNTkyYjQ0IiwibmFtZSI6ImJwIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.OjQSGTjoXxJzXVxUC7sKTI3FUU7rrasx256Au9FGMpc"
const bpMaster = [

    {
        "geoFence": null,
        "documents": [],
        "customFields": [],
        "isPortalEnabled": false,
        "type": "customer",
        "updates": {
            "traceID": "654872d4-fb1c-4648-bab2-84c5c5bf4013",
            "resourceId": "352133b2-7616-4742-8778-7feb5bf2dc23",
            "updatedBy": "USER",
            "changes": [
                {
                    "lastValue": null,
                    "fieldName": "Partner",
                    "fieldType": "String",
                    "currentValue": "JSHL HRD"
                }
            ],
            "sourceOfInformation": null,
            "description": "added new partner  JSHL HRD.",
            "forwardReasons": [
                "business.partner.add.event"
            ],
            "userId": "a42e539c-88f3-42cf-a1e7-d13e0b60833d",
            "uuid": "2f2ffa66-223a-42f7-a845-7fd7091cb771",
            "revision": null,
            "time": 1684406869628,
            "forwardedFrom": null,
            "resourceType": "Business-Partner",
            "updateType": null
        },
        "uuid": "352133b2-7616-4742-8778-7feb5bf2dc23",
        "orgId": "d255a000-f271-489e-9408-b9fb7d592b44",
        "firmType": "INDIVISUAL",
        "gstn": null,
        "voterId": null,
        "verificationTicketId": null,
        "group": {
            "name": "Consignee",
            "partnerType": "customer",
            "uuid": "0a4a4546-a0be-4c30-b430-2bf2b91f2c42",
            "orgId": "d255a000-f271-489e-9408-b9fb7d592b44"
        },
        "address": "{\"address\":null,\"city\":null,\"state\":null,\"pincode\":null}",
        "verificationStatus": "unverified",
        "externalId": "SP1110",
        "panNumber": null,
        "aadharNo": null,
        "parentId": null,
        "places": [
            {
                "hubId": null,
                "boundary": null,
                "address": "36A, Sirsa Rd, BHP colony, Industrial Area, Hisar, Haryana 125011, India",
                "accessibility": "public",
                "addedBy": "495b8728-c761-4fa7-83fe-db75a7d63221",
                "center": {
                    "latitude": 29.1271687,
                    "longitude": 75.7778469
                },
                "suggestedRadius": 1000,
                "isOwned": false,
                "centerCoordinates": [
                    75.7778469,
                    29.1271687
                ],
                "placeId": null,
                "geoJsonBoundry": null,
                "externalId": null,
                "source": "FRETRON",
                "places": null,
                "viewport": null,
                "district": null,
                "name": "JSHL HRD",
                "state": null,
                "category": "Pick up - Delivery Area",
                "subDistrict": null
            }
        ],
        "route": null,
        "name": "JSHL HRD",
        "location": null,
        "fretronId": null,
        "contacts": null,
        "status": "ACTIVE"
    }]

async function updateBp(payload) {
    try {

        let res = await rp({
            url: `https://apis.fretron.com/business-partners/v2/partner`,
            json: true,
            body: payload,
            method: "PUT",
            headers: {
                authorization: token
            }
        })
        console.log(`update partner res ${res.status} ; error ${res.error}`)
        return res
    }
    catch (e) {
        console.log("Error update place");
    }


}
async function createPlace(payload, token) {
    try {

        let res = await rp({
            url: "https://apis.fretron.com/place-manager/v2/place",
            json: true,
            body: payload,
            method: "POST",
            headers: {
                authorization: token
            }
        })
        console.log(`error creating place: ${res.error}`)

        return res
    }
    catch (e) {
        console.log("Error creating place");
    }
}

async function main() {
    for (let item of bpMaster) {
        item.places[0].placeId = null
        item.places[0].addedBy = null
        let payloadCreatePlace = item.places[0]
        console.log(payloadCreatePlace)
        let createdPlaceRes = await createPlace(payloadCreatePlace, token)
        if (createdPlaceRes.status == 200) {
            item.places = [createdPlaceRes.data]
            let paylaodUpdateBP = item
            let updatedRes = await updateBp(paylaodUpdateBP, token)
            console.log(updatedRes)

        }
        else {
            console.log(`place  not created `);
        }
    }
}
main()