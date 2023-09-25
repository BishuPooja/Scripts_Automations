
// "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODA4NDg4ODcsInVzZXJJZCI6ImJvdHVzZXItLTAxNDljNzY4LWRiNjMtNGJlNi1hZGIyLWZlMzRiOGYzMDliMCIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTAxNDljNzY4LWRiNjMtNGJlNi1hZGIyLWZlMzRiOGYzMDliMCIsIm9yZ0lkIjoiNDk1Yjg3MjgtYzc2MS00ZmE3LTgzZmUtZGI3NWE3ZDYzMjIxIiwibmFtZSI6IlNIIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.FYYGyXA6AZImcqr3u_F2K-t8DVsQmQHygRN3gdxrcEk"
const FRT_PUB_BASE_URL = "https://apis.fretron.com"
const rp = require("request-promise")
const _ = require("lodash")
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTA3OTc0MzIsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiODIzOTQ3YTMtMDJjMC00ZTY1LThmNGUtMjFkYTM3MGVhNmNkIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.L7E7sb5uop2tT8iBUZQQUPMQNO-Fk1KVLHvLCI7BF8g"
async function getShs() {
    try {
        let filters = { "__version": 2, "_shipmentStatus_": { "shipmentStatus": ["Completed"] }, "_trackingMode_": { "_or": { "_vts_": { "trackingMode": ["VTS"] } } }, "shipmentDate": { "isTillExpression": false, "isFromExpression": false, "from": 1685617020000, "till": 1690801071000 } }
        let url = `${FRT_PUB_BASE_URL}/shipment-view/shipments/v1?filters=${encodeURIComponent(JSON.stringify(filters))}&size=5000`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })
        return res?.length ? res : []
    }
    catch (e) {
        console.log(`error in getting shs ${e.message}`)
    }

    return []
}

async function ensureCfsOnShs(payload) {
    try {
        let res = await rp({
            uri: `${FRT_PUB_BASE_URL}/automate/autoapi/run/99436b15-3f70-40a4-a919-c75669eed144`,
            method: "POST",
            body: payload,
            json: true,
            headers: {
                authorization: TOKEN
            }
        })
        return res ?? []

    } catch (e) {
        console.log(`error in call Api Maker ${e.message}`)
    }
}

async function main() {
    try {
        let shs = await getShs()
        console.log("Total Sh Found EFD & CTS Mode : " + shs.length)
        if (shs.length) {
            let count = 0
            for (let sh of shs) {
                console.log(`call api maker for ${sh?.shipmentNumber}`)
                await ensureCfsOnShs(sh)
                count += 1
                console.log(`count ${count}`)
                // break
            }
        }
    } catch (e) {
        console.log(`error in main ${e.message}`)
    }
}


try {
    main()
} catch (e) {
    console.log(`errro in calling main ${e.message}`)
}