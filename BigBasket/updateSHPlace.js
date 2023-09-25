const rp = require("request-promise")
const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODAwODU3MjAsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiIzZTRjZGVlOS0wYjNiLTQ2ZGQtOWI5OC1kZjBlMzhhMDI3MWMiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.qXZE5R8uF7r_48LYh7x6kjP2yxoL7VZlcc7xjZKHiDQ"

async function updatePlaceSh(payload) {
    let res = await rp({
        url: "",
        method: "PUT",
        json: true,
        body: JSON.stringify(payload),
        headers: {
            authorization: token
        }

    })
    return res.status == 200 ? 'ok' : res.error
}

async function getShMaster(shId) {
    let res = await rp({
        url: "https://apis.fretron.com/shipment/v1/shipment/" + shId + "?skipCn=true",
        method: "GET",
        json: true,
        headers: {
            authorization: token
        }
    })
    return res.data
}

async function getCnByExternalId(exId) {
    try {
        let res = await rp({
            url: "https://apis.fretron.com/shipment-view/consignments/enriched?filters=%7B%22_shipment_%22%3A%7B%22shipmentNumber%22%3A%5B%5D%2C%22vehicleRN%22%3A%5B%5D%2C%22shipmentType%22%3A%5B%5D%2C%22shipmentEdd%22%3A%7B%22from%22%3Anull%2C%22till%22%3Anull%7D%2C%22shipmentDate%22%3A%7B%22from%22%3Anull%2C%22till%22%3Anull%7D%2C%22_origin_%22%3Anull%2C%22_destination_%22%3Anull%2C%22challanBranchName%22%3A%5B%5D%2C%22challanZoneName%22%3A%5B%5D%2C%22challanRegionName%22%3A%5B%5D%7D%2C%22_consignment_%22%3A%7B%22status%22%3A%5B%5D%2C%22trackingStatus%22%3A%5B%5D%2C%22edd%22%3A%7B%22from%22%3Anull%2C%22till%22%3Anull%7D%2C%22consignee%22%3A%5B%5D%2C%22consigner%22%3A%5B%5D%2C%22consignerPlace%22%3A%5B%5D%2C%22consigneePlace%22%3A%5B%5D%2C%22customer%22%3A%5B%5D%2C%22consignmentDate%22%3A%7B%22from%22%3Anull%2C%22till%22%3Anull%7D%2C%22material%22%3A%5B%5D%2C%22invoiceValue%22%3Anull%2C%22billToParty%22%3A%5B%5D%2C%22branch%22%3A%5B%5D%2C%22zone%22%3A%5B%5D%2C%22region%22%3A%5B%5D%2C%22podEdd%22%3A%7B%22from%22%3Anull%2C%22till%22%3Anull%7D%2C%22podSubmissionDate%22%3A%7B%22from%22%3Anull%2C%22till%22%3Anull%7D%2C%22podStatus%22%3A%5B%5D%2C%22podFeedingStatus%22%3Anull%2C%22consignmentDeliveryDate%22%3Anull%2C%22podTrackingStatus%22%3A%5B%5D%7D%7D&search=" + exId + "&sortBy=%5B%22consignmentDate%22%5D",
            json: true,
            method: "GET",
            headers: {
                authorization: token
            }
        })
        return res[0].consignment
    }
    catch (e) {
        console.log("error getting cn", e.message);
    }
}



function getFromCf(cfs, key) {
    if (cfs == null) {
        return null
    } else {
        let found = cfs.find(_ => _.fieldKey == key)
        return found ? found.value : null
    }
}

async function main() {
    let shObj = await getShMaster()
    let cf = shObj.customFields
    let invoiceNo = getFromCf(cf, 'invoiceNo')
    invoiceNo = invoiceNo.split(",")
    cnObj = await getCnByExternalId(invoiceNo)


}