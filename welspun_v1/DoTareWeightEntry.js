const rp = require("request-promise")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"
const validUserIds = ["a42e539c-88f3-42cf-a1e7-d13e0b60833d", '97122da8-f5e1-45cf-9ba8-abbf6943aa2c']
function _parseJwt(token) {
    var base64Url = token.split(".")[1];
    return JSON.parse(Buffer.from(base64Url, "base64").toString());
}

async function getShByShId(shId, TOKEN) {
    try {
        let url = `https://apis.fretron.com/shipment/v1/shipment/${shId}`
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

async function sendData(payload, TOKEN) {
    try {
        let url = ``
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
        if (!validUserIds.includes(userId)) {
            return { data: data, error: `UserId Not Allowed ${userId}`, status: status }
        }
        let cfs = body?.cfs ?? []
        console.log(cfs.map(_ => {
            return `${_.fieldKey}___${_.value}`

        }))
        let feed_tare_weight = getFromCf(cfs, "Feed Tare Weight")
        let feed_tare_date = getFromCf(cfs, "Feed Tare Date")
        let feed_gross_weight = getFromCf(cfs, "Feed Gross Weight")
        let feed_gross_weight_date = getFromCf(cfs, "Fedd Gross Weight Date")
        let gate_entry_date = getFromCf(cfs, "Gate Entry Date")
        let gate_entry_no_manual = getFromCf(cfs, "Gate Entry Number_Manual")
        let shipment = await getShByShId(shId, token)

        let payload = {
            "tareWeight": feed_tare_weight,
            "tareDate": feed_tare_date,
            "grossWeight": feed_gross_weight,
            "grossWeightDate": feed_gross_weight_date,
            "gateEntryDate": gate_entry_date,
            "gateEntryNumber": gate_entry_no_manual,
            "shipment": shipment
        }
        if (feed_tare_weight && feed_tare_date) {
            let sentDataRes = await sendData(payload, token)
            if (sentDataRes?.status == 200) {
                data = sentDataRes?.data
                status = 200
            } else {
                error = sentDataRes?.error
            }
        } else {
            error = "Tare Weight or Tare Date Missing"
            console.log(`Tare Weight or Tare Date Missing`)
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