const moment = require("moment")
const rp = require("request-promise")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"
const _ = require("lodash")
const TOKEN = ""

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
function getFromCf(cfs, fieldKey) {
    return cfs?.find((v) => v.fieldKey == fieldKey)
}
async function mainForPhysicalBillStatus(bill) {
    try {
        let billId = bill?.uuid
        let billNo = bill?.billNumber
        console.log(`Executing For ${billNo}`)
        let updates = bill?.updates
        let updatedTime = updates?.time
        let cfs = bill?.customFields
        let newCf = []
        let changes = updates?.changes?.find((v) => v.fieldName == "Physical Bill Status")

        if (changes) {
            let physicalBillStatus = bill?.physicalBillStatus
            console.log(`physicalBillStatus ${physicalBillStatus}`)
            if (physicalBillStatus == "RECIEVED") {
                let physicalBillStatusCf = getFromCf(cfs, "Physical Bill Status Recieved At")
                if (physicalBillStatusCf) {
                    physicalBillStatusCf.value = updatedTime
                    newCf.push(physicalBillStatusCf)
                } else {
                    newCf.push(getCfPayload("Physical Bill Status Recieved At", updatedTime))
                }
            }
        } else {
            console.log(`No Changes Found for ${billNo}`)
        }
        console.log(newCf)
        await updateCfsOnBill(billId, newCf)
    } catch (e) {
        console.log(`Caught Error ${e.message}`)
    }
}
mainForPhysicalBillStatus($event)