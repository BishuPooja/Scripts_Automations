const rp = require("request-promise")
const { log } = require("util")
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTAyODA1NjAsInVzZXJJZCI6ImJvdHVzZXItLTMzNDNhNGVjLWRlMDAtNGEwZS1iNjYzLTNkZjZiNDUxM2M1MCIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTMzNDNhNGVjLWRlMDAtNGEwZS1iNjYzLTNkZjZiNDUxM2M1MCIsIm9yZ0lkIjoiM2U0Y2RlZTktMGIzYi00NmRkLTliOTgtZGYwZTM4YTAyNzFjIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.ChxajaU-wlYjVRdCatW-kLFuVurbAhu5u9n0miCOoUI"


const cfRemoveKey1 = "Physical Bill Satus For Logistics"
const cfRemoveKey2 = "Physical Bill Satus For Account Unit"
const cfRemoveKey3 = "Physical Bill Satus For Account HO"

function getFromCf(cfs, key) {
    return cfs?.find((v) => v.fieldKey == key) ?? null
}
async function removeCf(billId, cfs) {
    try {
        let url = `http://apis.fretron.com/shipment-cost/v1/vendor/bill/${billId}/remove/customFields`
        let res = await rp({
            uri: url,
            method: "POST",
            body: cfs,
            json: true,
            headers: {
                Authorization: TOKEN
            }
        })

        console.log(`Remove Cf Status :${res?.status}`)
        if (res?.status == 200) {
            console.log(`Cf Removed Successfully`)
        } else {
            console.log(`error in removing cf ${JSON.stringify(res)}`)
        }
    } catch (e) {
        console.log(`Error in remove cf ${e.message}`)
    }
}

async function main(vendorBill) {
    try {
        console.log(`Bill No ${vendorBill.billNumber}`)
        let billId = vendorBill?.uuid
        let cfs = vendorBill?.customFields ?? []
        let cfToRemove = []
        let logistics_bill_status = getFromCf(cfs, cfRemoveKey1)
        logistics_bill_status ? cfToRemove.push(logistics_bill_status) : null

        let accountUnit_bill = getFromCf(cfs, cfRemoveKey2)
        accountUnit_bill ? cfToRemove.push(accountUnit_bill) : null

        let accountHO_bill_status = getFromCf(cfs, cfRemoveKey3)
        accountHO_bill_status ? cfToRemove.push(accountHO_bill_status) : null

        if (billId && cfToRemove?.length) {
            await removeCf(billId, cfToRemove)
        } else {
            console.log(`Remove Cfs Not Found ${billNumber}`)
        }
    } catch (e) {
        console.log(`Error in main ${e.message}`)
    }
}

try {
    await main($event)
} catch (e) {
    console.log(`Error in calling main ${e.message}`)
}