const rp = require("request-promise")
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTMyMjUxOTUsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiIzZTRjZGVlOS0wYjNiLTQ2ZGQtOWI5OC1kZjBlMzhhMDI3MWMiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.h1NTGMwDK764hcQnZ5Ez1BzRdYSi3eOlNducv8sAxS4"
const FRT_PUB_BASE_URL = "https://apis.fretron.com"

async function getVendorBill(billId) {
    try {
        let url = `${FRT_PUB_BASE_URL}/shipment-cost/v1/vendor/bill/${billId}/expand-details`

        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })
        if (res?.error) {
            console.log(`Vendor Bill Get Error ${res.error}`)
        }
        return res?.status == 200 ? res.data : null

    } catch (e) {
        console.log(`Caught Error Get Vendor Bill ${e.message}`)
    }
}
function getFromCf(cfs, key) {
    return cfs?.find(v => v.fieldKey == key)?.value
}

async function main(issue) {
    try {
        let data = null
        let status = 400
        let error = null
        let issueType = issue?.issueType
        let resourceId = issue?.resourceId
        console.log(`IssueType ${issueType} BillId ${resourceId}`)

        if (!resourceId) { throw new Error(`Resource Id Not Found For Issue ${issue?.issueNo}`) }

        let vendorBill = await getVendorBill(resourceId)
        if (!vendorBill) { throw new Error(`Vendor Bill Not Found For ResourceId ${resourceId}`) }


        let cfs = vendorBill?.customFields
        if (issueType == "New Vendor Bill Approval Ticket Level One") {
            let physical_Bill_Status_For_Logistics = getFromCf(cfs, "Physical Bill Satus For Logistics")
            let physical_Bill_Status_For_Account_Unit = getFromCf(cfs, "Physical Bill Status For Account Unit")
            if (physical_Bill_Status_For_Account_Unit == "Recieved" && physical_Bill_Status_For_Logistics == "Recieved") {
                status = 200
                data = issue
                error = null
            } else {
                error = "Physical Bill Status For Logistics Or Account Unit Is Pending"

            }
        }
        else if (issueType == "New Vendor Bill Approval Ticket") {

            let billStatus = vendorBill?.physicalBillStatus
            if (billStatus == "RECIEVED") {
                status = 200
                data = issue
                error = null
            } else {
                error = "Physical Bill Status Is Pending"
            }
        }
        console.log({ data: data, error: error, status: status })
        return { data: data, error: error, status: status }
    } catch (e) {
        console.log(`Caught Error Main ${e.message}`)
        return { data: null, error: e.message, status: 400 }

    }
}

let issue = $event?.body?.actionData
main(issue)