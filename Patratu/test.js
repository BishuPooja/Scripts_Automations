let url = `https://apis.fretron.com/shipment/v1/shipment/3bfe5deb-6705-4c6d-827e-c1accf5a9d3e/update-trail/v2?limit=240&offset=0`
const rp = require("request-promise")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"
const _ = require("lodash")



const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTA3OTc0MzIsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiODIzOTQ3YTMtMDJjMC00ZTY1LThmNGUtMjFkYTM3MGVhNmNkIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.L7E7sb5uop2tT8iBUZQQUPMQNO-Fk1KVLHvLCI7BF8g"
async function getActivityLogs(shId) {
    try {
        let res = await rp({
            method: "GET",
            uri: url,
            headers: {
                Authorization: TOKEN,
            },
            json: true,
        });

        return res?.data?.length ? res.data : []

    } catch (e) {
        console.log(`error in getting ActivityLogs ${e.message}`)
    }
}

async function main() {
    let res = await getActivityLogs()
    console.log(res.length)
}
main()