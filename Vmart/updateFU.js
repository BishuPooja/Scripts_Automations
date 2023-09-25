const { get } = require("https")
const rp = require("request-promise")
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODQzODk0MDksInVzZXJJZCI6ImJvdHVzZXItLTQzZTczNTI3LTFmY2QtNDMwMi1iNTYxLTFkMTIwZjViZjRkMSIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTQzZTczNTI3LTFmY2QtNDMwMi1iNTYxLTFkMTIwZjViZjRkMSIsIm9yZ0lkIjoiZmM1ZTczNGEtMjg3OC00NWU1LTg3MmEtMTQzMzhkNTU3OGM2IiwibmFtZSI6IkRpc3BhdGNoIFBsYW5uaW5nIEJvdCIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.2gehDqWWUGjkggui9oic2VpnF12zynesm6v793yTifs"

async function getDispatch() {
    try {
        let url = `https://apis.fretron.com/shipment-view/freightunits/v2/freightunits/extendedV3?group1=null&group1Limit=100&filters=%7B%22lineItems.status%22%3A%5B%22PLACED%22%5D%2C%22lineItems.transporterId%22%3A%5B%5D%2C%22lineItems.loadTypeId%22%3A%5B%5D%2C%22documentDate%22%3A%7B%22from%22%3Anull%2C%22till%22%3Anull%7D%2C%22_customeField%22%3Anull%2C%22_not%22%3A%7B%22type%22%3A%5B%22Temporary%22%5D%2C%22lineItems.status%22%3A%5B%22FINALIZED%22%2C%22FINALIZATION_IN_PROGRESS%22%5D%7D%7D&soFilters=%7B%22lineItems.status%22%3A%5B%5D%2C%22secondaryStatus%22%3A%5B%5D%2C%22salesBranch%22%3A%5B%5D%2C%22customer%22%3A%5B%5D%2C%22orderDate%22%3A%7B%22from%22%3Anull%2C%22till%22%3Anull%7D%2C%22consignee%22%3A%5B%5D%2C%22consigner%22%3A%5B%5D%2C%22origin%22%3A%5B%5D%2C%22destination%22%3A%5B%5D%2C%22route%22%3A%5B%5D%2C%22salesOffice.zoneName%22%3A%5B%5D%2C%22salesOffice.regionName%22%3A%5B%5D%2C%22contractBranch.name%22%3A%5B%5D%2C%22_not%22%3A%7B%22lineItems.status%22%3A%5B%22CLOSED%22%5D%7D%2C%22orderNumber%22%3A%5B%5D%7D`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                Authorization: TOKEN
            }
        })
        return res?.length ? res : null

    } catch (e) {
        console.l.log(`Error in getting Dispatch ${e.message}`)
    }
}


async function getDispatchOrders(fuId) {
    try {
        let filters = { "_nested": { "_path": "lineItems", "_include_nested_hits": true, "lineItems.freightUnitLineItemIds": [fuId] } }
        let url = `https://apis.fretron.com/shipment-view/sales/v2/orders_new?byLineItems=true&orderOrEnquiry=order&li{"_nested":{"_path":"lineItems","_include_nested_hits":true,"lineItems.freightUnitLineItemIds":["f8c58e2c-f8f1-4f5f-93f4-f9f7e7fdfd81"]}}mit=500&filters=${JSON.stringify(filters)}`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                Authorization: TOKEN
            }
        })
        return res?.length ? res : []
    } catch (e) {
        console.log(`error in getting order master ${e.message}`)
    }
    return null
}

async function freightUnitUpdate(payload) {
    try {
        let url = `http://apis.fretron.com/order-manager-v2/v1/admin/freight-unit`
        let res = await rp({
            uri: url,
            method: "PUT",
            json: true,
            body: payload
        })
        console.log(`FU PUT  Response status ${res.status}`)
        if (res.status == 200) {
            console.log(`FU updated Successfully`)
        } else {
            console.log(JSON.stringify(res))
        }
        return res
    }
    catch (e) {
        console.log(`Error in freight update ${e.message}`)
    }
}

async function main() {
    let dispactRes = await getDispatch()
    console.log(dispactRes?.length)
    let udpatedFU = []
    let count = 0
    for (let item of dispactRes) {
        let flag = false
        let documentNumber = item.documentNumber
        let shStatus = item?.lineItems[0].shipment?.shipmentStatus
        // console.log(shStatus)

        if (shStatus == "Completed") {
            let fuId = item?.lineItems[0].uuid
            let orders = await getDispatchOrders(fuId)
            let orderStatus = []
            if (orders.length) {
                for (let order of orders) {
                    console.log(order)
                    if (order.status == "CLOSED") {
                        orderStatus.push("CLOSED")
                    }
                    else {
                        orderStatus.push("OPEN")
                    }
                }
            }

            if (orderStatus.includes("OPEN")) {
                console.log(`ALl orders Not closed for ${documentNumber}`)
            } else {
                flag = true
            }
            console.log(` Document ${item.documentNumber}`)
            if (flag) {
                item.lineItems[0].status = "FINALIZED"
                let payload = item
                // let updatedRes = await freightUnitUpdate(payload)
                // if (updatedRes?.status == 200) {
                //     count += 1
                //     udpatedFU.push(documentNumber)
                // }
            }

        } else {
            console.log(`Not completed shStatus ${documentNumber}`)
        }

    }
    console.log(`TOTAL count  updated fu${count}`)
    console.log(`total fu udpated ${udpatedFU.length}  ${JSON.stringify(udpatedFU)}`)



}
main()

