const rp = require("request-promise")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"
const validUserIds = ["a42e539c-88f3-42cf-a1e7-d13e0b60833d", '97122da8-f5e1-45cf-9ba8-abbf6943aa2c']
function _parseJwt(token) {
    var base64Url = token.split(".")[1];
    return JSON.parse(Buffer.from(base64Url, "base64").toString());
}


async function getShByShId(shId, TOKEN) {
    try {
        let url = `${FRT_PUB_BASE_URL}/shipment/v1/shipment/${shId}`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                Authorization: TOKEN
            }
        })
        if (res.error) {
            console.log(`shRes Error ${JSON.stringify(res)}`)
        }
        return res?.status == 200 ? res.data : null
    }
    catch (e) {
        console.log(`error executing when getting shipment ${e.message}`);
    }
    return null
}

async function sendData(payload, event, TOKEN) {
    try {
        let url = `base_url/welspun/ipos`

        if (event === 'gateIn') {
            url += `/manual-sync/gateIn`
        } else {
            url += `/manual-sync/gateOut`
        }

        let res = await rp({
            uri: url,
            method: "POST",
            body: payload,
            json: true,
            headers: {
                Authorization: TOKEN
            }
        })
        return res
    } catch (e) {
        console.log(`error catched SendData ${e.message}`)
    }
}

function getFromCf(cfs, key) {
    return cfs.find((v) => v.fieldKey == key)?.value
}

async function main(body) {
    try {
        let data = null
        let status = 400
        let error = null
        let shId = body.shipmentId
        let token = "Bearer " + body.token
        let parseToken = _parseJwt(`${token}`)
        let userId = parseToken?.userId
        console.log(userId)
        if (!validUserIds.includes(userId)) {
            return { data: data, error: `UserId Not Allowed ${userId}`, status: status }
        }
        let cfs = body?.cfs ?? []
        console.log(cfs.map(_ => {
            return `${_.fieldKey}-${_.value}`

        }))
        let gateIn = getFromCf(cfs, "IPOS Gate In")
        let gateOut = getFromCf(cfs, "IPOS Gate Out")
        let tareWeight = getFromCf(cfs, "IPOS Tare Weight")
        let netweight = getFromCf(cfs, "IPOS Net Weight")
        let grossWeight = getFromCf(cfs, "IPOS Gross Weight")
        let boe = getFromCf(cfs, "IPOS BOE")
        let shipment = await getShByShId(shId, token)

        let payload = {
            "gateIn": gateIn,
            "gateOut": gateOut,
            "tareWeight": tareWeight,
            "netWeight": netweight,
            "grossWeight": grossWeight,
            "boe": boe,
            "shipment": shipment
        }
        let sentDataRes = null
        if (gateIn) {
            sentDataRes = await sendData(payload, "gateIn", token)
            if (sentDataRes?.status == 200) {
                data = sentDataRes
                status = 200
            } else {
                error = sentDataRes
            }
        } else if (gateOut) {
            sentDataRes = await sendData(payload, "gateOut", token)
            if (sentDataRes?.status == 200) {
                data = sentDataRes
                status = 200
            } else {
                error = sentDataRes
            }
        } else {
            error = "Event Not Found"
            console.log(`Event Not Found`)
        }
        return { "data": data, "error": error, "status": status }

    } catch (e) {
        console.log(`Error Catched Main ${e.message}`)
        return { "data": null, "error": e.message, "status": 400 }

    }
}

try {

    return await main($event.body)
} catch (e) {
    console.log(`Error Catched ${e.message}`)
}

