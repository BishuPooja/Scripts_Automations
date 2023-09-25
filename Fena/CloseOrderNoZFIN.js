const rp = require("request-promise")

const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTI4NTcwMDksInVzZXJJZCI6ImJvdHVzZXItLTYxMjc0MzViLTlhMzYtNDJiZC1hODA2LTFiM2JhYjliYzk5NiIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTYxMjc0MzViLTlhMzYtNDJiZC1hODA2LTFiM2JhYjliYzk5NiIsIm9yZ0lkIjoiM2U0Y2RlZTktMGIzYi00NmRkLTliOTgtZGYwZTM4YTAyNzFjIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.u_anv189syhUd15qjwFID0eIOPWVPfA9L29G2Yskd5E"

async function getOrderByFilter() {
    try {
        let filters = { "status": ["OPEN"], "lineItems.status": ["FINALIZED"], "orderType": ["Order", "MTROrder", "MarketOrder"] }
        let url = `https://apis.fretron.com/shipment-view/sales/v2/orders?limit=35&filters=${encodeURIComponent(JSON.stringify(filters))}`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })

        return res?.length ? res : []
    }
    catch (e) {
        console.log(`Error exceuting while getting order ${e.message}`)
    }
    return []
}

async function forceCloseOrder(orderId) {
    try {
        let url = `https://apis.fretron.com/order-manager-v2/sales-orders/v1/order/${orderId}/closeOrder`;
        let res = await rp({
            uri: url,
            method: "PUT",
            json: true,
            body: {
                isShortClose: true,
                isForeClose: true,
            },
            headers: {
                authorization: TOKEN
            }
        })

        if (res?.status == 200) {
            console.log(`order closed successfully ${orderId}`)
            return res
        } else {
            console.log(`error order close ${JSON.stringify(res)}`)
        }

    } catch (e) {
        console.log(`Caught error in close order Api ${e.message}`)
    }
    return null
}


function getFromCf(cfs, key) {
    return cfs?.find((v) => v.fieldKey == key)?.value
}

async function main() {
    try {
        let orders = await getOrderByFilter()
        console.log(`Total Open Orders With Pending LineItems ${orders.length}`)

        for (let order of orders) {
            try {
                let orderNumber = order?.orderNumber
                console.log(`Executing For ${orderNumber}`)
                let orderId = order.uuid
                let pendingLineItems = order?.lineItems?.filter((item) => (item?.status == "PENDING"))

                if (pendingLineItems?.length) {
                    let orderClose = true
                    for (let item of pendingLineItems) {
                        let cfs = item?.customFields
                        let materialType = getFromCf(cfs, "Material Type")
                        if (materialType == "ZFIN") {
                            orderClose = false
                        }
                    }
                    console.log(`Order  ${orderNumber} Close ${orderClose}`)
                    if (orderClose) {
                        await forceCloseOrder(orderId)
                    }
                } else {
                    console.log(`No Pending LineItems Found for ${orderNumber}`)
                }



            } catch (e) {
                console.log(`Caught Error order ${order.orderNumber} ${e.message}`)
            }
        }
    } catch (e) {
        console.log(`Caught Error in main ${e.message}`)
    }
}
main()