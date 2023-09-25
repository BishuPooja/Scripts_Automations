const { lstat } = require("fs")
const _ = require("lodash")
const rp = require("request-promise")
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODk4MzA2MDIsInVzZXJJZCI6ImJvdHVzZXItLTcyZGI1ZTU0LWMxZjctNDhiZi05ZWYxLTNmOWUyZjE4MzU5NCIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTcyZGI1ZTU0LWMxZjctNDhiZi05ZWYxLTNmOWUyZjE4MzU5NCIsIm9yZ0lkIjoiNTk2MzY5NmEtZTUyNC00NWM4LTkyMzctZDZhYzM5NjMxODg4IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.3fkTUtVFPSLyfDax3Wv5gMsJyI7HzrPqEFhQhi9Lhus"

async function getShs() {
    try {
        let filters = { "__version": 2, "_trackingMode_": { "_or": { "_vts_lbs_": { "trackingMode": ["VTS-LBS"] } } }, "_shipmentTrackingStatus_": { "_or": { "_enroute_for_delivery_": { "shipmentTrackingStatus": ["Enroute For Delivery"] } } } }

        let url = `https://apis.fretron.com/shipment-view/shipments/v1?filters=%7B%22__version%22%3A2%2C%22_trackingMode_%22%3A%7B%22_or%22%3A%7B%22_vts_lbs_%22%3A%7B%22trackingMode%22%3A%5B%22VTS-LBS%22%5D%7D%7D%7D%2C%22_shipmentStatus_%22%3A%7B%22shipmentStatus%22%3A%5B%22Created%22%2C%22Planned%22%5D%7D%2C%22_destination_%22%3A%7B%22_nested%22%3A%7B%22_path%22%3A%22shipmentStages%22%2C%22shipmentStages.tripPoint.purpose%22%3A%5B%22Delivery%22%5D%2C%22_or%22%3A%7B%22shipmentStages.place.name%22%3A%5B%22BHILWARA%22%2C%22DUMMY%22%5D%2C%22shipmentStages.hub.name%22%3A%5B%22BHILWARA%22%2C%22DUMMY%22%5D%7D%7D%7D%7D&size=500`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })
        if (res?.length) {
            return res
        }
    } catch (e) {
        console.log(`Error in getShs ${e.message}`)
    }
    return []
}
async function callApiMakerCompleteSh(shId) {
    let payload = { "shipmentId": shId, "cfs": [{ "indexedValue": [], "fieldKey": "Select Reason", "multiple": false, "description": "", "remark": "", "uuid": "9cc631fe-4ed6-4451-8d41-86974d4e8c3c", "required": false, "accessType": null, "input": "", "unit": "", "valueType": "string", "options": [" Vehicle Return Without Loading"], "fieldType": "select", "value": " Vehicle Return Without Loading", "isRemark": false }], "token": "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODk4Mjk3MTksInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNTk2MzY5NmEtZTUyNC00NWM4LTkyMzctZDZhYzM5NjMxODg4IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.ABswYPPfGC_K64Mgo7R81TB34_nn2MXt8EuBJ7VKICI" }
    try {

        let url = `https://apis.fretron.com/automate/autoapi/run/6f80ba1b-d733-401e-9a0f-cba68e46defa`
        let res = await rp({
            uri: url,
            method: "POST",
            json: true,
            headers: {
                authorization: TOKEN
            },
            body: payload
        })

    } catch (e) {
        console.log(`Error in getShs ${e.message}`)
    }


}
async function main() {
    try {
        let shs = await getShs()
        console.log("Total SH " + shs.length)
        
        if (shs?.length) {
            for (let sh of shs) {
                let shCreationTime = sh?.creationTime
                let stages = sh?.shipmentStages
                let destiantion = stages[stages.length - 1]?.place?.name ?? stages[stages.length - 1]?.hub?.name ?? ""
                if (destiantion == "BHILWARA" || destiantion == "DUMMY") {
                    let time = shCreationTime + 4 * 8.64e+7
                    if (time < Date.now()) {
                        console.log("call for " + sh.shipmentNumber)
                        await callApiMakerCompleteSh(sh.uuid)
                    }
                }
            }
        } else {
            console.log(`shipments Not Found`)
        }
    } catch (e) {
        console.log(`Error executing Main ${e.message}`)
    }
}

try {
    main()
} catch (e) {
    console.log(`error in calling main ${e.message}`)
}


