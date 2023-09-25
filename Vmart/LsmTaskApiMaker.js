const rp = require("request-promise")
const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTMzMDk0NjAsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiZmM1ZTczNGEtMjg3OC00NWU1LTg3MmEtMTQzMzhkNTU3OGM2IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.BNNuP0vfk7dleJYAm-2nBfx-PCzWc9q37dBBJITr9r4"

async function getShsByFilter(filter) {
    try {
        let url = `https://apis.fretron.com/shipment-view/shipments/v1?filters=${JSON.stringify(filter)}&size=500`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })

        return res?.length ? res : []
    } catch (e) {
        console.log(`Caught error Getting Shipments ${e.message}`)
    }
    return []
}


async function ensureLmsCfs(shId) {
    try {
        let url = ``
        let res = await rp({
            uri: url,
            method: "POST",
            body: { "shipmentId": shId },
            json: true,
            headers: {
                authorization: TOKEN
            }
        })

        console.log(`API maker Res ${res?.status}`)
    } catch (e) {
        console.log(`Caught Error Api Maker ${e.message}`)
    }
}
async function main() {
    try {
        let filters = {
            "_shipmentTrackingStatus_": {
                "_or": {
                    "_at_pickup_point_": {
                        "shipmentTrackingStatus": ["At Pickup Point"]
                    },
                    "_enroute_for_delivery_": {
                        "shipmentTrackingStatus": ["Enroute For Delivery"]
                    }
                }
            },
            "__version": 2
        }
        let shs = await getShsByFilter(filters)
        if (!shs?.length) {
            console.log(`Shipments Not Found`)
        }
        console.log(`Total Shipments ${shs?.length}`)
        for (let sh of shs) {
            try {
                let shId = sh?.uuid
                await ensureLmsCfs(shId)
                let shNo = sh?.shipmentNumber
                console.log(`Executing For Shipment ${shNo}`)
            } catch (e) {
                console.log(`Caught Error in Shipment ${sh?.shipmentNumber} error ${e.message}`)
            }
        }
    } catch (e) {
        console.log(`Caught Error main ${e.message}`)
    }
}

main()