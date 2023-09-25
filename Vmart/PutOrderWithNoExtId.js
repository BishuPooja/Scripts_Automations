const rp = require("request-promise")
const fs = require("fs")
let TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODg0NTYyOTEsInVzZXJJZCI6ImJvdHVzZXItLTc2OWUwYjY2LTFmYjgtNDczYS05YzZlLTkzODAwZDBmYjQ5MiIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTc2OWUwYjY2LTFmYjgtNDczYS05YzZlLTkzODAwZDBmYjQ5MiIsIm9yZ0lkIjoiZmM1ZTczNGEtMjg3OC00NWU1LTg3MmEtMTQzMzhkNTU3OGM2IiwibmFtZSI6InN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.6knzVHDAZo9IB0FENqZitWO9jvsQYhN20AtJYRgMqEw"

let index = process.argv[2]
let data = require("./produceChunkOfInput.json")
let externalIds = data[index]

// async function getOrderByExternalId(extId) {
//     try {

//         let url = `http://apis.fretron.com/order-manager-v2/v1/admin/order/by_externalId?orgId=fc5e734a-2878-45e5-872a-14338d5578c6&externalId=${extId}`
//         // console.log(url)
//         let res = await rp({
//             uri: url,
//             json: true,
//             method: "GET",

//         })
//         console.log(`Order Get Res status ${res.status}`)
//         if (res.status == 200) {

//             return res.data

//         } else {

//             console.log(`Get order by ExternalId ${extId} api res error : ${res.error}`)

//         }
//     }
//     catch (e) {
//         console.log(`error catch order get ${e.message}`)
//     }
//     return null
// }

async function getOrderByExternalId(extIds) {
    try {
        let filters = { "consignee": ["VRL-PALWAL WAREHOUSE"], "status": ["CLOSED"], "orderType": ["Order", "MTROrder", "MarketOrder"], "orderNumber": extIds }

        let url = `https://apis.fretron.com/shipment-view/sales/v2/orders?limit=50&filters=${filters}`
        // console.log(url)
        let res = await rp({
            uri: url,
            json: true,
            method: "GET",

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


async function getConsigneeById(consigneeId) {
    try {

        let url = `https://apis.fretron.com/business-partners/v2/partner/${consigneeId}`

        let res = await rp({
            uri: url,
            json: true,
            method: "GET",
            headers: {
                authorization: TOKEN
            }
        })

        return res.status == 200 ? res.data : null
    }
    catch (e) {
        console.log(`error catch consignee get ${e.message}`)
    }
    return null
}

async function main() {
    let OrderNotExist = []
    let updatedOrders = []
    let notPALWALcase = []
    let orderExtIds = JSON.parse(fs.readFileSync("orderVmart - Sheet1.txt", "utf-8"))
    console.log(orderExtIds.length)
    let count = 0
    for (let item of orderExtIds) {
        count += 1
        console.log(`count : ${count}`)
        let extId = item.ExtId
        console.log("orderNumber :", extId)
        let orderRes = await getOrderByExternalId(extId)
        // console.log(orderRes)
        if (orderRes) {
            console.log(" consignee Name :", orderRes?.lineItems?.[0]?.consignee?.name)
            if (orderRes?.lineItems?.[0]?.consignee?.name === "VRL-PALWAL WAREHOUSE") {
                let consigneeId = orderRes?.lineItems?.[0]?.consignee?.uuid
                console.log(`consigneeId : ${consigneeId}`)
                let consigneeRes = await getConsigneeById(consigneeId)
                if (!consigneeRes) {
                    console.log(`Consignee Not Found ${extId}`)
                    continue
                }
                // console.log(consigneeRes)
                if (consigneeRes?.name === "VRL-PALWAL WAREHOUSE") {
                    orderRes.orderNumber = `T_${extId}`
                    orderRes.externalId = `T_${extId}`
                    console.log(`updated order payload : ${(orderRes)}`)
                    // let updatedOrderRes = await putOrder(orderRes)
                    // if (updatedOrderRes?.status == 200) {
                    //     updatedOrders.push(extId)
                    // }
                    break
                } else {
                    console.log(`Consignee Name Not Match ${consigneeRes?.name}`)
                }
            }
            else {
                notPALWALcase.push(extId)
                console.log(`Not VRL-PALWAL WAREHOUSE case ${extId} `)
            }
        }
        else {
            OrderNotExist.push(extId)
            console.log(`Order Not found ${extId}`)

        }
        // if (count == 16) {
        //     break
        // }
    }

    console.log(`OrderNotExist ${JSON.stringify(OrderNotExist)}`)
    console.log(OrderNotExist.length)
    console.log(`updatedOrders  ${JSON.stringify(updatedOrders)}`)
    console.log(updatedOrders.length)
    console.log(`notPALWALcase  ${JSON.stringify(notPALWALcase)}`)
    console.log(notPALWALcase.length)
}

try {
    main()
}
catch (e) {
    console.log(`Error in calling main ${e.message}`)
}




