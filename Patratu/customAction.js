const rp = require("request-promise")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"


const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTA3OTc0MzIsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiODIzOTQ3YTMtMDJjMC00ZTY1LThmNGUtMjFkYTM3MGVhNmNkIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.L7E7sb5uop2tT8iBUZQQUPMQNO-Fk1KVLHvLCI7BF8g"
async function getSh(shId) {
    try {
        let url = `${FRT_PUB_BASE_URL}/shipment/v1/shipment/${shId}`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })
        if (res?.status != 200) {
            console.log(`Error in Fetching Sh Master ${shId}`)
        }
        return res?.status == 200 ? res.data : null
    }
    catch (e) {
        console.log(`error in getting shs ${e.message}`)
    }

    return null
}


async function ensureCfsOnShs(payload) {
    try {
        let res = await rp({
            uri: `${FRT_PUB_BASE_URL}/automate/autoapi/run/af6a16da-6784-4df8-a98e-0ef92fba58f2`,
            method: "POST",
            body: payload,
            json: true,
            headers: {
                authorization: TOKEN
            }
        })
        return "OK"

    } catch (e) {
        console.log(`error in call Api Maker ${e.message}`)
    }
}

async function main(shId) {
    try {
        let shRes = await getSh(shId)
        if (shRes) {
            await ensureCfsOnShs(shRes)
        } else {
            console.log(`Shipment Master Not found ${shId}`)
        }
    } catch (e) {
        console.log(`error in main ${e.message}`)
    }
}


try {
    let shId = $event?.body?.shipmentId
    await main(shId)
}
catch (e) {
    console.log(`error in calling main ${e.message}`)
}