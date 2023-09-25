const rp = require("request-promise")
const TOKEN = ""

async function getVendorBills() {
    try {
        let filters = { "billingStatus": ["APPROVAL_PENDING"] }
        let url = `
        https://apis.fretron.com/shipment-view/vendor-bill/v1/vendor-bills?filters=${encodeURIComponent(JSON.stringify(filters))}&size=1000`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })

        return res.length ? res : []

    } catch (e) {
        console.log(`Error in getting vendorBills ${e.message}`)
    }
    return []
}

async function getVendorBillMaster(billId) {
    try {
        let url = `https://apis.fretron.com/shipment-cost/v1/vendor/bill/${billId}`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })

        return res?.status == 200 ? res.data : null

    } catch (e) {
        console.log(`Error in getting vendorBills ${e.message}`)
    }
    return []
}
async function putVendorBill(payload) {
    try {
        let url = `https://apis.fretron.com/shipment-cost/v1/vendor/bill`
        let res = await rp({
            uri: url,
            method: "PUT",
            json: true,
            body: payload,
            headers: {
                authorization: TOKEN
            }
        })

        if (res?.status == 200) {
            console.log(`Updated  Vendor Bill successfully `)
        } else {
            console.log(`Error in Put Api ${JSON.stringify(res)}`)
        }

    } catch (e) {
        console.log(`Error in Updating vendor Bill ${e.message}`)
    }
}

async function rejectIssue(billId) {
    try {
        let url = `https://apis.fretron.com/shipment-cost/v1/vendor/bill/reject-issue?uuid=${billId}`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })

        if (res) {
            console.log(`rejectIssue Status ${res?.status}`)
            return res
        }
    } catch (e) {
        console.log(`Error in cancel ticket ${e.message}`)
    }
    return null
}

async function main() {
    try {
        let vendorBills = await getVendorBills()
        console.log(vendorBills?.length)
        if (vendorBills?.length) {
            for (let bill of vendorBills) {
                let billId = bill.uuid
                let billNo = bill.billNumber
                console.log(`billNo ${billNo}`)
                let billMaster = await getVendorBillMaster(billId)
                // console.log(billMaster)
                if (billMaster) {
                    let ticketId = billMaster?.ticketId
                    console.log(`ticketId ${ticketId}`)
                    if (ticketId) {
                        let rejectIssueRes = await rejectIssue(billMaster.uuid)
                        if (rejectIssueRes?.status == 200) {
                            billMaster = await getVendorBillMaster(billId)
                            await putVendorBill(billMaster)
                        }
                    } else {
                        console.log(`ticketId not found ${billNo}`)
                    }
                } else {
                    console.log(`Bill Master Not Found For this Bill ${billNo}`)
                }
                break
            }
        } else {
            console.log(`Vendor Bill not found`)
        }
    } catch (e) {
        console.log(`Error catch main ${e.message}`)
    }

}


main()