const rp = require("request-promise")
const fs = require("fs")
let TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODg0NTYyOTEsInVzZXJJZCI6ImJvdHVzZXItLTc2OWUwYjY2LTFmYjgtNDczYS05YzZlLTkzODAwZDBmYjQ5MiIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTc2OWUwYjY2LTFmYjgtNDczYS05YzZlLTkzODAwZDBmYjQ5MiIsIm9yZ0lkIjoiZmM1ZTczNGEtMjg3OC00NWU1LTg3MmEtMTQzMzhkNTU3OGM2IiwibmFtZSI6InN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.6knzVHDAZo9IB0FENqZitWO9jvsQYhN20AtJYRgMqEw"

async function orderDelete(uuid) {
    try {

    } catch (e) {
        console.log(`order Delete Error ${e.message}`)
    }
    let url = "https://apis.fretron.com/order-manager-v2/sales-orders/v1/order/" + uuid + "?skipValidation=true"

    let res = await rp({
        uri: url,
        method: "DELETE",
        json: true,
        headers: {
            'Authorization': TOKEN
        },
    })

    console.log(`order Delete Status ${res.status}`)
    if (res.status != 200) {

        console.log(`order Delete Error ${res.error}`)
    }
    return res.status == 200 ? "Order Deleted successfully!" : res.error
}
async function getOrders() {
    try {
        let filters = { "consignee": ["VRL-PALWAL WAREHOUSE"], "status": ["OPEN"], "orderType": ["Order", "MTROrder", "MarketOrder"] }

        let url = `https://apis.fretron.com/shipment-view/sales/v2/orders?limit=7000&filters=${encodeURIComponent(JSON.stringify(filters))}&allFields=["uuid","orderNumber"]`
        let res = await rp({
            uri: url,
            json: true,
            method: "GET",
            headers: {
                authorization: TOKEN
            }

        })

        return res ?? []
    }
    catch (e) {
        console.log(`error catch order get ${e.message}`)
    }
    return []
}

async function main() {
    // let orders = await getOrders()
    // console.log(orders.length)
    // let data = []
    // let count = 0
    // for (let item of orders) {
    //     count += 1
    //     console.log(`count ${count}`)
    //     let uuid = item.uuid
    //     let orderNumber = item.orderNumber
    //     data.push({
    //         uuid: uuid,
    //         orderNumber: orderNumber
    //     })
    // }
    // fs.writeFileSync("OrderDataToDelete.txt", JSON.stringify(data))

    let orderData = JSON.parse(fs.readFileSync("OrderDataToDelete.txt", "utf8"));
    console.log(`orderData length ${orderData.length}`)
    let count = 0

    for (let item of orderData) {
        count += 1
        console.log(`count ${count}`)
        let uuid = item.uuid
        let orderNumber = item.orderNumber
        console.log(`orderNumber ${orderNumber} orderId ${uuid}`)
        await orderDelete(uuid)
        break
    }


}

try {
    main()
}
catch (e) {
    console.log(`Error in calling main ${e.message}`)
}