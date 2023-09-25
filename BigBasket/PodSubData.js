const rp = require("request-promise")
const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODM3MTEzMjcsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiIwYmJkYzEyMi1mOTYzLTQ1MmYtOWFmMS0yODcxNWY1ZTM2YjIiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.IZWkWfwp34dhMrOR7n5ab0t--e3EFs-QWB7U_R7MeGE"



async function getPodData(cnId) {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/pod/v1/action/ensure-pod?consignmentId=${cnId}`,
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
    }
    catch (e) {
        console.log(`error executing getting pod data ${e.message}`)
    }

}

async function main(cn) {
    let data = {}
    let shipmentId = cn.shipments[0].uuid
    let dispatchPlant = cn?.consigner?.name
    let invoiceNo = cn?.consignmentNo
    let invoiceDate = cn?.consignmentDate
    let podAck = "Received"
    let customerCode = cn?.consignee?.externalId
    let vendorCode = cn?.consigner?.externalId
    let cnId = cn.uuid
    let podData = await getPodData(cnId)
    let remarks = podData?.remarks
    // console.log(podData)
    console.log(podData?.issues?.length)
    let shortage = podData?.issues.length ? "YES" : "NO"
    let podSubmissionDate = podData?.submissionDate
    let receivedQty = null
    if (podData && podData.deliveryItems && podData.deliveryItems.length) {
        for (let item of podData.deliveryItems) {
            console.log(item)
            receivedQty += item.orderMapping?.quantity?.weight?.netQuantity
            console.log(`receivedQty`, receivedQty)
        }
    }
    data["shipmentId"] = shipmentId ?? "N/A"
    data["dispatchPlant"] = dispatchPlant ?? "N/A"
    data["invoiceNo"] = invoiceNo ?? "N/A"
    data["invoiceDate"] = invoiceDate ?? "N/A"
    data["PODAcknowledgement"] = podAck ?? "N/A"
    data["customerCode"] = customerCode ?? "N/A"
    data["vendorCode"] = vendorCode ?? "N/A"
    data["shortage"] = shortage ?? "N/A"
    data["podSubmissionDate"] = podSubmissionDate ?? "N/A"
    data["receivedQty"] = receivedQty ?? "N/A"
    data["remarks"] = remarks ?? "N/A"
    console.log(data)
}


main($event)