const rp = require('request-promise');
const _ = require('lodash');
const FRT_BASE_URL = "https://apis.fretron.com"
const Wel_Token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTM1NDc5NTMsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNmY4MGVmZjUtZmFkMS00ZmJmLTk3NmItYjViZmI1OTVkNDU0IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.c6uiK1f9NLPrhGHCaUFHihCx0ECTZbgavrKNOSdFq9I"
const WelDemo_Token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTIyNzM0NTQsInVzZXJJZCI6ImJvdHVzZXItLTQzNjA2MzE2LTc0Y2EtNDRkZC1iOWYyLTQzYTlmYzMxNTlkYiIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTQzNjA2MzE2LTc0Y2EtNDRkZC1iOWYyLTQzYTlmYzMxNTlkYiIsIm9yZ0lkIjoiMGE1MzM0NDUtMWI5OS00MmY5LTliMmYtZDYyMWRlZTUxMjllIiwibmFtZSI6InN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.h3zePhYxFJsPjj1BTbcVEoirfNmYGrCS5Megg-S8cHY"


async function getAllPartners() {
    let res = await rp({
        url: `https://apis.fretron.com/shipment-view/bpartners/partners?size=4000&from=0&allFields=true`,
        json: true,
        method: "GET",
        headers: {
            Authorization: Wel_Token
        }
    });

    return res
}

async function createPartner(payload) {
    let url = `${FRT_BASE_URL}/business-partners/v2/partner`
    try {
        let res = await rp({
            method: "POST",
            uri: url,
            headers: {
                Authorization: token_sklm
            },
            body: payload,
            json: true
        })
        // console.log(`Create bp with extId ${payload.externalId} res api status : ${res.status}`)
        if (res.status == 200) {
            return res.data
        } else {
            console.log(`Create bp with name ${payload.name} res api error : ${res.error}`)
        }
    } catch (e) {
        console.log(`Catched error in creating bp with name ${payload.name} : ${e.message}`)
    }
}

async function getHubByName(name) {

    let hubUrl = `https://apis.fretron.com/shipment-view/places/page/hubs?search=${encodeURIComponent(JSON.stringify(name))}`

    let options = {
        url: hubUrl,
        json: true,
        method: "GET",
        headers: {
            Authorization: token_sklm
        }
    }
    let hubs = await rp(options);

    if (hubs?.length) {
        let hub = hubs.find(hub => hub.name == name)
        return hub ? hub : null
    } else {
        return null
    }
}

async function main() {
    try {

    } catch (e) {
        console.log(`Caught Error ${e.message}`)
    }
}