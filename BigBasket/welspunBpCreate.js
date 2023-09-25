// welspun
const rp = require("request-promise")
const TOKEN = ""

async function createBP(payload) {
    try {
        let url = "https://apis.fretron.com/business-partners/v2/partner"
        let res = await rp({
            uri: url,
            method: "POST",
            body: payload,
            json: true,
            headers: {
                'Authorization': TOKEN
            }
        })
        if (res?.status == 200) {
            console.log("Successfully created BP")
        } else {
            console.log("Error creating BP")
            console.log(JSON.stringify(res))
        }


    }
    catch (e) {
        console.log(`Error creating BP: ${e.message}`)
    }
}
async function main() {
    let payload = {
        "geoFence": null,
        "documents": [],
        "customFields": [],
        "isPortalEnabled": false,
        "type": partner,
        "updates": null,
        "uuid": null,
        "orgId": null,
        "firmType": "INDIVISUAL",
        "gstn": gstn == "" ? null : gstn,
        "voterId": null,
        "verificationTicketId": null,
        "group": partnerGroup,
        "address": JSON.stringify({ "pincode": postalCode, "address": address, "city": city, "state": district }),
        "verificationStatus": null,
        "externalId": externalId ? externalId : null,
        "panNumber": panNumber == "" ? null : panNumber,
        "aadharNo": null,
        "parentId": null,
        "places": place ? [place] : null,   
        "route": null,
        "name": bpName,
        "location": null,
        "fretronId": null,
        "contacts": null,
        "status": null
    }

    console.log(JSON.stringify(payload))

    let creationResponse = createBP(payload)
}