const rp = require("request-promise")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"

const Wel_Token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTM1NDc5NTMsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNmY4MGVmZjUtZmFkMS00ZmJmLTk3NmItYjViZmI1OTVkNDU0IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.c6uiK1f9NLPrhGHCaUFHihCx0ECTZbgavrKNOSdFq9I"
const WelDemo_Token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTIyNzM0NTQsInVzZXJJZCI6ImJvdHVzZXItLTQzNjA2MzE2LTc0Y2EtNDRkZC1iOWYyLTQzYTlmYzMxNTlkYiIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTQzNjA2MzE2LTc0Y2EtNDRkZC1iOWYyLTQzYTlmYzMxNTlkYiIsIm9yZ0lkIjoiMGE1MzM0NDUtMWI5OS00MmY5LTliMmYtZDYyMWRlZTUxMjllIiwibmFtZSI6InN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.h3zePhYxFJsPjj1BTbcVEoirfNmYGrCS5Megg-S8cHY"

async function createOffice(payload) {
    try {
        let url = `https://apis.fretron.com/offices/v1/office`
        let res = await rp({
            uri: url,
            method: "POST",
            body: payload,
            json: true,
            headers: {
                authorization: WelDemo_Token
            }
        })
        if (res?.status == 200) {
            console.log(`Office created Successfully`)
        } else {
            console.log(`office creation error ${JSON.stringify(res)}`)
        }

    } catch (e) {
        console.log(`Caught Error Creation Office ${e.message}`)
    }
}

async function getOffices() {
    try {
        let url = `https://apis.fretron.com/offices/v1/offices/pages?limit=50`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: Wel_Token
            }
        })
        return res.data?.length ? res.data : []
    } catch (e) {
        console.log(`Caught Error Getting Offices ${e.message}`)
    }
}

async function main() {
    let offices = await getOffices()
    console.log(`offices ${offices?.length}`)
    for (let office of offices) {
        console.log(office)
        office._id = null
        await createOffice(office)
        // break
    }
}
main()