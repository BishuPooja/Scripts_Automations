const moment = require("moment")
const rp = require("request-promise")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"
const _ = require("lodash")
const TOKEN = ""
const physicalbillCfs = ["Physical Bill Satus For Logistics", "Physical Bill Satus For Account Unit"]


async function updateCfsOnBill(billId, cfs) {
    try {
        let res = await rp({
            'uri': `${FRT_PUB_BASE_URL}/shipment-cost/v1/vendor/bill/${billId}/add/customFields`,
            'json': true,
            'method': 'POST',
            'headers': {
                'Authorization': TOKEN
            },
            'body': cfs
        })
        console.log(`Custom Field updated on bill ${billId}, status: ${res.status}, res: ${JSON.stringify(res.data.customFields)}`);
        if (res?.status != 200) {
            console.log(`Error while updating cf on bill ${billId}, status: ${res.status}`)
        } else {
            return res?.data
        }
    }
    catch (e) {
        console.log(`Error while updating cf on bill ${billId}, status: ${e.message}`)
    }
}
function getFromCf(cfs, fieldKey) {
    return cfs?.find((v) => v.fieldKey == fieldKey)
}
function getCfPayload(key, value) {
    return {
        "fieldKey": key,
        "multiple": false,
        "description": "",
        "remark": "",
        "uuid": null,
        "required": false,
        "accessType": null,
        "input": "date",
        "unit": "",
        "valueType": "string",
        "options": [],
        "fieldType": "dateTime",
        "value": value,
        "isRemark": false
    }
}


async function main(bill) {
    try {
        let billId = bill?.uuid
        let billNo = bill?.billNumber
        console.log(`Executing For ${billNo}`)
        let updates = bill?.updates
        let updatedTime = updates?.time
        let cfs = bill?.customFields
        let forwardedFrom = updates?.forwardedFrom ? (updates?.forwardedFrom).split(",") : null
        if (!forwardedFrom) {
            console.log(`ForwardedFrom Not Found For Bill ${billNo}`)
            return
        }
        let udpatedCfs = null
        if (forwardedFrom) {
            udpatedCfs = forwardedFrom.filter((v) => physicalbillCfs.find((it) => it == v))
        }
        let receivedAtcfs = []
        if (udpatedCfs?.length) {
            for (cf of cfs) {
                let fieldKey = cf.fieldKey
                if (udpatedCfs.find((v) => v == fieldKey)) {
                    let cfValue = cf.value
                    if (cfValue == "Recieved") {
                        let recievedAtFieldKey = `${fieldKey} Received At`
                        let recievedAtCf = getFromCf(cfs, recievedAtFieldKey)
                        if (recievedAtCf) {
                            receivedAtcfs.value = updatedTime
                            receivedAtcfs.push(recievedAtCf)
                        } else {
                            receivedAtcfs.push(getCfPayload(recievedAtFieldKey, updatedTime))
                        }
                    } else {
                        console.log(` ${fieldKey} : ${cfValue}`)
                    }
                }
            }
        } else {
            console.log(`Physical Bill status cfs are not updated for ${billNo}`)
        }
        console.log(receivedAtcfs)
        await updateCfsOnBill(billId, receivedAtcfs)
    } catch (e) {
        console.log(`Caught Error in Main ${e.message}`)
    }
}
main($event)


