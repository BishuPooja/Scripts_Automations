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
        console.log(userId)
        if (!validUserIds.includes(userId)) {
            return { data: data, error: `UserId Not Allowed ${userId}`, status: status }
        }
        let cfs = body?.cfs ?? []
        console.log(cfs.map(_ => {
            return `${_.fieldKey}___${_.value}`

        }))
        let feed_gross_weight = getFromCf(cfs, "Feed Gross Weight")
        let feed_gross_weight_date = getFromCf(cfs, "Feed Gross Weight Date")
        let gate_entry_date = getFromCf(cfs, "Gate Entry Date")
        let gate_entry_no_manual = getFromCf(cfs, "Gate Entry Number_Manual")
        let shipment = await getShByShId(shId, token)

        let payload = {
            "grossWeight": feed_gross_weight,
            "grossWeightDate": feed_gross_weight_date,
            "gateEntryDate": gate_entry_date,
            "gateEntryNumber": gate_entry_no_manual,
            "shipment": shipment
        }
        if (feed_gross_weight && feed_gross_weight_date) {
            let sentDataRes = await sendData(payload, token)
            if (sentDataRes?.status == 200) {
                data = sentDataRes
                status = 200
            } else {
                error = sentDataRes
            }
        } else {
            error = "Gross Weight or Gross weight Date Missing"
            console.log(`Gross Weight or Gross weight Date Missing`)
        }
        return { "data": data, "error": error, "status": status }

    } catch (e) {
        console.log(`Error Catched Main ${e.message}`)
        return { "data": null, "error": e.message, "status": 400 }

    }
}



try {
    let $event = {
        body: {
            "shipmentId": "cfbb9138-8aca-4ebc-a39e-c2b6cc7b8351",
            "cfs": [{
                "indexedValue": [],
                "fieldKey": "IPOS Gate In",
                "multiple": true,
                "description": "",
                "remark": "",
                "uuid": "be6fbfaf-e904-4bb2-8bc7-1eca0f4e3180",
                "required": false,
                "accessType": null,
                "input": "date",
                "unit": "",
                "valueType": "string",
                "options": [],
                "fieldType": "dateTime",
                "value": 1691473905500,
                "isRemark": false
            }, {
                "indexedValue": [],
                "fieldKey": "IPOS Gate Out",
                "multiple": true,
                "description": "",
                "remark": "",
                "uuid": "d238ce62-1a9d-45c9-8452-5b5888fed61d",
                "required": false,
                "accessType": null,
                "input": "date",
                "unit": "",
                "valueType": "string",
                "options": [],
                "fieldType": "dateTime",
                "value": null,
                "isRemark": false
            }, {
                "indexedValue": [],
                "fieldKey": "IPOS Tare Weight",
                "multiple": false,
                "description": "",
                "remark": "",
                "uuid": "f6e77cf6-36fd-4ca9-acc1-176faadaa47c",
                "required": false,
                "accessType": null,
                "input": "string",
                "unit": "",
                "valueType": "string",
                "options": [],
                "fieldType": "text",
                "value": null,
                "isRemark": false
            }, {
                "indexedValue": [],
                "fieldKey": "IPOS Net Weight",
                "multiple": false,
                "description": "",
                "remark": "",
                "uuid": "c625a3f2-2139-46db-abce-562234a4cb38",
                "required": false,
                "accessType": null,
                "input": "string",
                "unit": "",
                "valueType": "string",
                "options": [],
                "fieldType": "text",
                "value": null,
                "isRemark": false
            }, {
                "indexedValue": [],
                "fieldKey": "IPOS Gross Weight",
                "multiple": false,
                "description": "",
                "remark": "",
                "uuid": "78dc1011-0641-430e-a72c-d4e0635ffe82",
                "required": false,
                "accessType": null,
                "input": "string",
                "unit": "",
                "valueType": "string",
                "options": [],
                "fieldType": "text",
                "value": null,
                "isRemark": false
            }, {
                "indexedValue": [],
                "fieldKey": "IPOS BOE",
                "multiple": false,
                "description": "",
                "remark": "",
                "uuid": "e4904d96-e6a8-443d-95b5-0fb3da66ec2d",
                "required": false,
                "accessType": null,
                "input": "string",
                "unit": "",
                "valueType": "string",
                "options": [],
                "fieldType": "text",
                "value": null,
                "isRemark": false
            }],
            "token": "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTE0NzAzMTgsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiI2ZjgwZWZmNS1mYWQxLTRmYmYtOTc2Yi1iNWJmYjU5NWQ0NTQiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.eC--rNap44o3Ox0Jt1d8O5Wrc6grt2lJJmMXKQ2PBHA"
        }
    }
    main($event.body)
} catch (e) {
    console.log(`Error Catched custom Action ${e.message}`)
}