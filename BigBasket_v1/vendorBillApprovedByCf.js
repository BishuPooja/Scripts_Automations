const rp = require("request-promise")
const fs = require("fs")
const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODMwOTU1NTUsInVzZXJJZCI6ImJvdHVzZXItLTI5ODA4MTA2LWI4YWQtNDVhNy1iYTM1LTVjYWU4YTMyMjI1ZCIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTI5ODA4MTA2LWI4YWQtNDVhNy1iYTM1LTVjYWU4YTMyMjI1ZCIsIm9yZ0lkIjoiODIzOTQ3YTMtMDJjMC00ZTY1LThmNGUtMjFkYTM3MGVhNmNkIiwibmFtZSI6InZlbmRvciBiaWxsIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.qO-0NyQ_5QQib2PIMbtPKSmhzuZZkTeh2iybX3KuA4I"

var FRT_PUB_BASE_URL = "https://apis.fretron.com"
async function getVendorBill() {
    let res = await rp({
        url: ` https://apis.fretron.com/shipment-view/vendor-bill/v1/vendor-bills?filters=%7B%22vendorName%22%3A%5B%5D%2C%22billingStatus%22%3A%5B%22BILLED%22%5D%2C%22billCreationTime%22%3Anull%2C%22billDate%22%3Anull%2C%22approvalDate%22%3Anull%7D&size=4000`,
        json: true,
        method: "GET",
        headers: {
            authorization: token
        }
    })
    return res

}

async function customFieldUpdate(uuid, payload, token) {

    let res = await rp({
        url: `${FRT_PUB_BASE_URL}/shipment-cost/v1/vendor/bill/` + uuid + `/add/customFields`,
        method: "POST",
        json: true,
        body: payload,
        headers: {
            Authorization: token
        }
    })
    console.log(`customFieldUpdate status ${res.status}`)
    return res.status == 200 ? res.status : res.error

}

async function userFromUserId(uuid, token) {

    let res = await rp({

        url: `${FRT_PUB_BASE_URL}/users/v1/user?key=uuid&value=` + uuid,

        json: true,

        headers: {

            Authorization: token

        }

    })



    if (res.status == 200) {
        if (res.data?.name) {
            return res.data.name
        }
    }
    else {
        return null
    }
}
async function getActivityLog(uuid, token) {
    let url = `https://apis.fretron.com/shipment-cost/v1/activity-logs?resourceId=${uuid}&resourceType=Vendor%20Bill&limit=1000&offset=0`
    // console.log(url)
    let res = await rp({
        url: url,
        json: true,
        method: "GET",
        headers: {
            Authorization: token
        }
    })
    return res.status == 200 ? res.data : res.error
}
function getFromCf(cf, key) {
    if (cf) {
        let value = cf.find((v) => v.fieldKey == key)
        if (value) {
            return value.value
        }
    }
    else {
        return null
    }

}
async function main() {
    let vendorBillRes = await getVendorBill()
    console.log(vendorBillRes.length)
    let count = 0
    let countUpdate = 0
    let countPResent = 0
    for (let i = 0; i < vendorBillRes.length; i++) {
        console.log(`start count ${i}`)
        let item = vendorBillRes[i]
        let billNo = item.billNumber
        console.log(`BillNo ${billNo}`)
        let cf = item.customFields
        let vendorId = item.uuid
        let approvedBy = getFromCf(cf, "Approved By")
        if (!approvedBy) {
            count += 1
            console.log(`count ${count} bill no ${billNo}`)
            let activityLog = await getActivityLog(vendorId, token)
            if (activityLog && activityLog.length) {
                for (let value of activityLog) {
                    let description = value?.description
                    if (description) {
                        let descriptionText = description.includes("marked bill status as Billed")
                        if (descriptionText) {
                            let userId = value.userId
                            console.log(userId)
                            let userName = await userFromUserId(userId, token)
                            if (userName) {
                                console.log(userName)
                                let payload = [{
                                    "indexedValue": [""],
                                    "fieldKey": "Approved By",
                                    "multiple": false,
                                    "description": "",
                                    "remark": "",
                                    "uuid": null,
                                    "required": false,
                                    "accessType": null,
                                    "input": null,
                                    "unit": "",
                                    "valueType": "string",
                                    "options": [],
                                    "fieldType": "text",
                                    "value": userName,
                                    "isRemark": false
                                }]
                                // let updatedCf = await customFieldUpdate(vendorId, payload, token)
                                // console.log(updatedCf)
                                countUpdate += 1
                                console.log(`countUpdate ${countUpdate} bill No ${countUpdate} userName ${userName}`)
                            }
                            break
                        }
                    }
                }
            }


        }
        else {
            countPResent += 1
            console.log(`approved By present ${billNo} ${countPResent}`)
        }
    }

    console.log(countPResent)
}
main()
async function checkbillNO() {
    let res = await getVendorBill()
    for (let i = 0; i < res.length; i++) {
        let item = res[i]
        // console.log(item.billNumber)
        if (i = 3906) {
            console.log(item.billNumber)
            console.log(i)
            break
        }
    }
}
// checkbillNO()