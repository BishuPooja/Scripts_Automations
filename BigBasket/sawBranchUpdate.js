const rp = require("request-promise")
const _ = require("lodash")
const moment = require("moment")
const fs = require("fs")
const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODE4MjA0ODQsInVzZXJJZCI6ImJvdHVzZXItLTExOGE5NjFkLWU3OTUtNGJiNS1iMzlhLTA1YjlkZTI0NjA5MyIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTExOGE5NjFkLWU3OTUtNGJiNS1iMzlhLTA1YjlkZTI0NjA5MyIsIm9yZ0lkIjoiM2FlZGE1MjctZWIzZS00MTNiLWFiNzgtY2FlNzdlMTE5N2QwIiwibmFtZSI6InNoIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.VrkOSAv0xUe7D_E_I_RQhl8mqFes43eSDbymAyb9aOk"

async function getSh() {
    try {

        let res = await rp({
            url: `https://apis.fretron.com/shipment-view/shipments/v1?filters=%7B%22shipmentDate%22%3A%7B%22isTillExpression%22%3Afalse%2C%22isFromExpression%22%3Afalse%2C%22from%22%3A1677609000000%2C%22till%22%3A1682533829000%7D%2C%22__version%22%3A2%7D&size=8700`,
            method: "GET",
            json: true,
            headers: {
                authorization: token
            }

        })

        return res


    } catch (e) {
        console.log(`error executing while fetching shipment ${e.message}`)
    }

}


async function getShWithCn(shId) {
    try {

        let res = await rp({
            url: `https://apis.fretron.com/shipment/v1/shipment/${shId}?skipCn=false`,
            method: "GET",
            json: true,
            headers: {
                authorization: token
            }

        })
        if (res.status == 200) {

            return res.data
        }
        else {
            return null
        }


    } catch (e) {
        console.log(`error executing while fetching shipment ${e.message}`)
    }

}

async function getOrderIdByFreighId(freightId) {
    try {
        let res = await rp({
            url: `http://apis.fretron.com/order-manager-v2/freight-units/v1/freight-units/by/linItemIds`,
            method: 'POST',
            body: [freightId],
            json: true,
            headers: {
                authorization: token
            }
        })
        if (res.status == 200) {

            return res.data
        }
        else {
            return null
        }
    } catch (e) {
        console.log(`error getting order id ${e.message}`)
    }

}

async function getOrderById(ORDER_ID) {
    let res = await rp({
        url: `https://apis.fretron.com/order-manager-v2/sales-orders/v1/order/${ORDER_ID}`,
        method: 'GET',
        json: true,
        headers: {
            authorization: token
        }
    })
    if (res.status == 200) {

        return res.data
    } else {
        return null
    }
}

async function bulkSyncApi(payload) {
    let shServiceBaseUrl = "https://apis.fretron.com"
    let url = `${shServiceBaseUrl}/shipment/v1/shipment/bulk/sync`;
    try {
        let res = await rp({
            method: "POST",
            uri: url,
            body: payload,
            headers: {
                Authorization: token,
            },
            json: true,
        });
        console.log(`Bulk Sync api response status : ${res.status}`);
        if (res.status == 200) {
            return res
        } else {
            console.log(`Bulk Sync api response error : ${res.error}`);
        }
    } catch (e) {
        console.log(`Catched Error in Bulk Sync api : ${e.message}`);
    }
    return null;
}
async function main() {
    // let shRes = await getSh()
    // console.log(shRes.length)
    // let shDetails = []
    // let count = 0
    // for (let item of shRes) {
    //     count += 1
    //     console.log(count)
    //     let branch = item.branch
    //     if (!branch) {
    //         console.log(item.shipmentNumber)
    //         shDetails.push({
    //             shNo: item.shipmentNumber,
    //             shId: item.uuid,
    //             freightUnitLineItemId: item.freightUnitLineItemId
    //         })
    //         console.log(`length No branch data ${shDetails.length}`)
    //     }
    // }
    // console.log(`Shdetails: ${shDetails.length}`)
    // fs.writeFileSync("NoBranches.json", JSON.stringify(shDetails))

    let nobrachData = JSON.parse(fs.readFileSync("NoBranches.json", "utf8"));
    console.log(nobrachData.length)
    let count = 0
    for (let item of nobrachData) {
        count += 1
        console.log(count)

        let shId = item.shId
        let freightUnitLineItemId = item.freightUnitLineItemId
        let freightRes = await getOrderIdByFreighId(freightUnitLineItemId)
        let orderId = freightRes[0].lineItems[0].salesOrderMappings[0].orderId
        let orderRes = await getOrderById(orderId)
        let salesOffice = orderRes.salesOffice
        if (salesOffice) {
            let shPayload = {
                shipmentId: shId,
                updates: [{
                    "keyToUpdate": "shbranch",
                    "updatedValue": salesOffice
                }]
            }
            console.log(shPayload)

            // let updatedSalesOfficeSh = await bulkSyncApi(shPayload)
            // if (updatedSalesOfficeSh) {
            //     console.log(`updatedSalesOfficeSh  ${updatedSalesOfficeSh.status}`)
            //     console.log(item.shNo)
            // }
            // else {
            //     console.log(`error updating sales office -->${updatedSalesOfficeSh.error}`)
            // }
        }
        else {
            console.log(`salesoffice is not available ${item.shNo}`)
        }



        // break
    }

}


async function main2() {
    let shRes = await getSh()
    console.log(shRes.length)
    let shDetails = []
    let count = 0
    for (let item of shRes) {
        count += 1
        console.log(count)
        let edd = item.originalEdd ? (item.originalEdd) : item.edd ? (item.edd) : ""
        if (!edd) {
            console.log(item.shipmentNumber)
            shDetails.push({
                shNo: item.shipmentNumber,
                shId: item.uuid,
            })
            console.log(`length No edd data ${shDetails.length}`)
        }
    }
    console.log(`Shdetails: ${shDetails.length}`)
    fs.writeFileSync("NoEddData.json", JSON.stringify(shDetails))
}

main2()