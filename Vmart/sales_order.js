const rp = require("request-promise")
const _ = require("lodash")
const fs = require("fs")
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTAzNjU1MDEsInVzZXJJZCI6ImJvdHVzZXItLTVhZTYzMDlhLWEwN2YtNGY1ZC05ZDdiLTVhYWMwN2ZkMjQ2ZSIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTVhZTYzMDlhLWEwN2YtNGY1ZC05ZDdiLTVhYWMwN2ZkMjQ2ZSIsIm9yZ0lkIjoiZmM1ZTczNGEtMjg3OC00NWU1LTg3MmEtMTQzMzhkNTU3OGM2IiwibmFtZSI6InN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.mMu569cuLXAhuQ2pptoC3rphaSQda9xMGOQkm3GSi6o"

// const sheetData = JSON.parse(fs.readFileSync("vmartSalesorder.json", "utf-8"))
const sheetData = require(`./vmartSalesorder.json`)

console.log(sheetData.length)
let closeOrderCount = 0


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
            // console.log(`order closed successfully ${orderId}`)
            return res
        } else {
            console.log(`error order close ${JSON.stringify(res)}`)
        }

    } catch (e) {
        console.log(`error in close order Api ${e.message}`)
    }
    return null
}

async function getOrders() {
    try {
        let options = {
            json: true,
            method: "GET",
            headers: {
                "Authorization": TOKEN
            }
        }
        let source = ["uuid", "externalId"]
        let filter = { "status": ["OPEN"] }
        url = `https://apis.fretron.com/shipment-view/sales/v2/orders?limit=10&filters=${JSON.stringify(filter)}&source=${encodeURIComponent(JSON.stringify(source))}`
        console.log(url);
        options["url"] = url
        return await rp(options)
    } catch (e) {
        console.log(`error in getting orders ${e.message}`)
    }
}

async function delay(t, v) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, v), t);       
    });
}
async function main() {
    let orders = await getOrders()
    console.log(JSON.stringify(orders[0]))
    console.log(`Total Orders: ${orders.length}`);
    if (orders?.length) {
        await closeOrdersExceptSheet(orders)
    }
    // let lastOrder = _.last(orders)
    // let offset = [lastOrder.orderDate, lastOrder.uuid]
    while (true) {

        // offset = [lastOrder.orderDate, lastOrder.uuid]
        orders = await getOrders()
        console.log(`Total Orders: ${orders.length}`);
        lastOrder = _.last(orders)
        if (orders?.length) {
            await closeOrdersExceptSheet(orders)
        }
        await delay(3000)
        if (orders.length < 10) {
            break;
        }
    }
}
main()

async function closeOrdersExceptSheet(orders) {
    try {
        let orderOpenSheet = []
        let closeOrders = []
        for (let order of orders) {
            let externalId = order?.externalId
            console.log(`externalId ${externalId}`)
            let orderId = order.uuid
            // console.log(`orderId ${orderId}`)
            // console.log("sheetData ", sheetData[0])
            console.log("sheetData", sheetData.find((v) => v.extId != externalId))
            if (sheetData.find((v) => v.extId != externalId)) {
                // let closeOrderRes =await forceCloseOrder(orderId)
                // if (closeOrderRes?.status == 200) {
                //     closeOrders.push({
                //         "id": orderId,
                //         "extId": externalId
                //     })
                //     closeOrderCount += 1
                // }
            } else {
                console.log(`orderOpenSheet ${externalId}`)
                orderOpenSheet.push(externalId)
            }
        }
        console.log(`orderOpenSheet length ${orderOpenSheet?.length}`)
        console.log(JSON.stringify(orderOpenSheet))
        console.log(`closeOrders length ${closeOrders.length}`)
        console.log(JSON.stringify(closeOrders))
        console.log(`closeOrderCount ${closeOrderCount}`)

    } catch (e) {
        console.log(`error in close order ${e.message}`)
    }
}