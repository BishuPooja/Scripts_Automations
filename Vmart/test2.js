let index = process.argv[2]
let data = require("./produceChunkOfInput.json")
let externalIds = data[index]
console.log(externalIds[0])


const rp = require("request-promise")
const fs = require("fs")
let TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODg0NTYyOTEsInVzZXJJZCI6ImJvdHVzZXItLTc2OWUwYjY2LTFmYjgtNDczYS05YzZlLTkzODAwZDBmYjQ5MiIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTc2OWUwYjY2LTFmYjgtNDczYS05YzZlLTkzODAwZDBmYjQ5MiIsIm9yZ0lkIjoiZmM1ZTczNGEtMjg3OC00NWU1LTg3MmEtMTQzMzhkNTU3OGM2IiwibmFtZSI6InN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.6knzVHDAZo9IB0FENqZitWO9jvsQYhN20AtJYRgMqEw"

async function getOrderByExternalId(extIds) {
    try {
        console.log(`extids length ${extIds.length}`)
        let filters = { "consignee": ["VRL-PALWAL WAREHOUSE"], "status": ["CLOSED"], "orderType": ["Order", "MTROrder", "MarketOrder"], "orderNumber": extIds }

        let url = `https://apis.fretron.com/shipment-view/sales/v2/orders?limit=100&filters=${encodeURIComponent(JSON.stringify(filters))}`
        // console.log(url)
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
async function putOrder(payload) {
    try {

        let url = `http://apis.fretron.com/order-manager-v2/v1/admin/sales-order`
        let res = await rp({
            uri: url,
            json: true,
            method: "PUT",
            body: payload,
            headers: {
                authorization: TOKEN
            }
        })
        console.log(`Put Api Res status ${res.status}`)
        return res ?? null
    }
    catch (e) {
        console.log(`error catch put order  ${e.message}`)
    }
    return null
}

function splitArrayIntoChunks(arr, chunkSize) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
}
async function main() {
    let chunkExtIds = splitArrayIntoChunks(externalIds, 100)

    for (let item of chunkExtIds) {
        console.log(`externalIds Length   ${item.length}`)
        let orderGroup = await getOrderByExternalId(item)
        console.log(`Order Res Length ${orderGroup.length}`)
        let count = 0
        if (orderGroup?.length) {
            for (let orderRes of orderGroup) {
                count += 1
                console.log(`count : ${count}`)
                if (orderRes) { 
                    console.log(`Before UPDATION orderNumber : ${orderRes.orderNumber} orderExternalId: ${orderRes.externalId}`)
                    orderRes.orderNumber = `T_${orderRes.orderNumber}`
                    orderRes.externalId = `T_${orderRes.externalId}`
                    let updatedOrderRes = await putOrder(orderRes)
                    if (updatedOrderRes?.status == 200) {
                        console.log(`Updated orderNumber : ${updatedOrderRes.data.orderNumber} orderExternalId: ${updatedOrderRes.data.externalId}`)
                    }
                }
            }
        }
        else {
            console.log(`order not found ${JSON.stringify(item)}`)
        }

    }
}
try {
    main()
}
catch (e) {
    console.log(`Error in calling main ${e.message}`)
}

