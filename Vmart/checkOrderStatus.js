const rp = require("request-promise")
const _ = require("lodash")
const fs = require("fs")
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTAzNjU1MDEsInVzZXJJZCI6ImJvdHVzZXItLTVhZTYzMDlhLWEwN2YtNGY1ZC05ZDdiLTVhYWMwN2ZkMjQ2ZSIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTVhZTYzMDlhLWEwN2YtNGY1ZC05ZDdiLTVhYWMwN2ZkMjQ2ZSIsIm9yZ0lkIjoiZmM1ZTczNGEtMjg3OC00NWU1LTg3MmEtMTQzMzhkNTU3OGM2IiwibmFtZSI6InN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.mMu569cuLXAhuQ2pptoC3rphaSQda9xMGOQkm3GSi6o"


let sheetData = require(`./Sheet_orders.json`)
console.log(sheetData.length)


async function getOrders(externalIds) {
    try {
        let options = {
            json: true,
            method: "GET",
            headers: {
                "Authorization": TOKEN
            }
        }

        url = `https://apis.fretron.com/shipment-view/sales/v2/orders?limit=50&filters={"externalId":${externalIds}}&source=["orderNumber","externalId","status"]`
        console.log(url);
        options["url"] = url
        return await rp(options)
    } catch (e) {
        console.log(`error in getting orders ${e.message} `)
    }
}

function convertDataEqualChunks(arr, size) {

    const chunkSize = Math.ceil(arr.length / size);

    const result = [];




    for (let i = 0; i < arr.length; i += chunkSize) {

        const chunk = arr.slice(i, i + chunkSize);

        result.push(chunk);

    }

    console.log(result)

    return result;

}

async function main() {
    try {
        let finalData = []
        let chunks = convertDataEqualChunks(sheetData, 500)
        for (let ids of chunks) {
            let orderRes = await getOrders(ids)
            // console.log(orderRes)
            for (let order of orderRes) {
                console.log(`status   ${order?.status}`)
                finalData.push({
                    "extId": order.externalId,
                    "status": order?.status
                })
            }
            // break
        }
        console.log(JSON.stringify(finalData))
    } catch (e) {
        console.log(`error in main ${e.message} `)
    }
}

main()