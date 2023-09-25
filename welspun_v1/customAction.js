const { get } = require("request")
const rp = require("request-promise")



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

async function main(data) {
    try {
        let shId = data.shipmentId
        let token = "Bearer " + data.token
        let cfs = data?.cfs ?? []
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
        console.log(payload)
        // await sendData(payload, token)
    } catch (e) {
        console.log(`Error Catched Main ${e.message}`)
    }
}



try {

    main($event.body)
} catch (e) {
    console.log(`Error Catched ${e.message}`)
}