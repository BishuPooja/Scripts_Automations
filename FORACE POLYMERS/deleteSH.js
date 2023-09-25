const rp = require("request-promise")
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODg2NDM0MjMsInVzZXJJZCI6ImJvdHVzZXItLTU2NWEzODRiLWI1ZGYtNGZlNC1iNWM5LTI1ZWE4ODljZWZiYSIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTU2NWEzODRiLWI1ZGYtNGZlNC1iNWM5LTI1ZWE4ODljZWZiYSIsIm9yZ0lkIjoiMTFhMzlkMmYtMTQ4NS00MDEwLWJmOTYtNjllOWZkY2RlMjAzIiwibmFtZSI6InN5c3RlbSBpbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.E9Yxr8ZMhDBaqOixSyGUNZNg8TQqg7ZqXsTiNokImCU"


async function getShs() {
    try {
        let filter = { "shipmentDate": { "isTillExpression": false, "isFromExpression": false, "from": 1688322600000, "till": 1709231437000 }, "__version": 2 }
        let url = `https://apis.fretron.com/shipment-view/shipments/v1?filters=${encodeURIComponent(JSON.stringify(filter))}&size=200`

        let res = await rp({
            uri: url,
            method: "GET",
            headers: {
                Authorization: TOKEN,
            },
            json: true,
        });
        // console.log(res)
        return res ?? []

    } catch (e) {
        console.log(`error getting shs ${e.message}`)
    }
    return []
}
async function deletesh(uuid) {
    try {
        let url = `https://apis.fretron.com/shipment/v1/shipment/${uuid}`
        console.log(url)
        let res = await rp({
            uri: url,
            method: "DELETE",
            headers: {
                Authorization: TOKEN,
            },
            json: true,
        });
        // console.log(res)
        console.log("deleted status :", res.status)
        console.log(`error ${res.error}`)
        return res
    } catch (e) {
        console.log(`error in delete sh ${e.message}`)
    }
}
async function main() {
    let shs = await getShs()
    console.log(shs.length)
    for (let item of shs) {
        console.log(`shNo: ${item.shipmentNumber}`)
        let shId = item.uuid
        console.log(shId)
        await deletesh(shId)
        // break
    }
}
main()