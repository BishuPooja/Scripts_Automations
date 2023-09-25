const rp = require("request-promise")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"



const token_live = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTIxNzkzNjUsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNmY4MGVmZjUtZmFkMS00ZmJmLTk3NmItYjViZmI1OTVkNDU0IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.M8JSbjIam0zW-ipGftY8-5keUeozgOfFYI5LLftQArE"

const token_testing = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTIyNjgzMTYsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiMGE1MzM0NDUtMWI5OS00MmY5LTliMmYtZDYyMWRlZTUxMjllIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.NhOl0Gz-NKqne0LPutZ3A2wn-aXnxqRXYJyjzZQowJY"

const token = token_testing

async function main() {
    try {
        let payload = $event.body
        if (!Object.keys(payload).length) {
            throw new Error(`Invalid Method Calling!`)
        }
        let shipmentId = payload?.shipmentNumber
        if (!shipmentId) {
            console.log(`Shipment Id`)
        }
        let shipment = await getShipmentById()

        console.log(payload)
        let weightBridgeResponse = await doWeightBridge(payload, token)

        return weightBridgeResponse 
    } catch (err) {
        console.log(`Some error executing API-Maker - ${err.message}`)
        return { data: null, error: `Some server error - ${err.message}`, status: 400 }
    }
}

async function getShipmentById(shId, skipCn) {
    try {
        let url = `${FRT_PUB_BASE_URL}/shipment/v1/admin/shipment/${shId}?skipCn=${skipCn}`
        let options = {
            uri: url,
            json: true,
            method: 'GET'
        }

        let res = await rp(options)

        console.log(`Error if any in getting shipment with id - ${shId}, error - ${res.error}`)

        return res?.data ?? null
    } catch (err) {
        console.log(`Some error getting shipment by id - ${err.message}`)
    }

    return null
}

async function doWeightBridge(payload, token, wbType) {
    try {
        let url_grossWeight = `http://122.180.251.100:8088/welspun/amazin/gross-weight`
        let url_tareWeight = `http://122.180.251.100:8088/welspun/amazin/tare-weight`

        let url = url_grossWeight

        if (wbType == "Tare Weight") {
            url = url_tareWeight
        }

        let options = {
            uri: url,
            json: true,
            method: "POST",
            headers: {
                Authorization: token
            },
            body: payload
        }

        let res = await rp(options)

        console.log(`Incoming response of - ${JSON.stringify(res)}`)

        return res
    } catch (err) {
        console.log(`Some error in calling gate in API - ${err.message}`)
    }

    return null
}