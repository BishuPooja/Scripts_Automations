const rp = require("request-promise")
const fs = require("fs")
const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODIzMzUxNTMsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNDcyYjNjNTEtZDhlOS00Mjk0LThhN2YtYTY5MDkzYjUwNWI3IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.ekrmfdJVauK90T7nauw0W-sG5NPzBR93ADfeMUBEFzQ"


async function removeVehicleHistoryFromMap(shId) {
    try {
        let res = await rp({
            url: "",
            method: "DELETE",
            json: true,
            headers: {
                authorization: token
            }
        })
        if (res.status == 200) {

            return res
        }
        else {
            console.log(res.error)
            return null
        }

    } catch (e) {
        console.log(`error delete vehicle : ${e.message}`)
    }
}

async function getShipments(vhNo) {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/shipment-view/shipments/v1?filters=%7B%22_shipmentStatus_%22%3A%7B%22shipmentStatus%22%3A%5B%22Completed%22%5D%7D%2C%22__version%22%3A2%7D&search=${vhNo}`,
            method: "GET",
            json: true,
            headers: {
                authorization: token
            }
        })
        if (res.length > 0) {

            return res
        }
        else {
            return null
        }
    }
    catch (e) {
        console.log(`error getting shId ${e.message}`)
    }
}

async function getvehicleHistory(shId) {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/plant-tracking/v1/admin/histories?shipmentIds=${shId}&orgId=472b3c51-d8e9-4294-8a7f-a69093b505b7`,
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
        console.log(`error getting shId ${e.message}`)
    }

}

async function getVehiclesData() {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/plant-tracking/v1/map-dashboard/v2`,
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
        console.log(`error getting shId ${e.message}`)
    }

}



async function main2() {
    let vehicles = ["UP54D3800", "UP42BT0528", "UP53AK7711", "UP53EJ1584", "UP82AT2773", "UP53AT4253", "UP53BT1044", "UP53AH7201", "UP16HT0449", "NL01AB2215", "UP61AT1945"]
    let vehiclesData = await getVehiclesData()
    console.log(vehiclesData.length)
    let historyId = []
    let totalHistoryIds = []
    for (let item of vehiclesData) {
        let vehicleNo = item.meta.vehicleNo
        let vehicleMatch = vehicles.includes(vehicleNo)

        let shId = item.meta.shipmentId
        console.log(shId)
        if (vehicleMatch) {
            let vehicleHistory = await getvehicleHistory(shId)
            for (let value of vehicleHistory) {
                let isDirty = value.isDirty
                let vehicleHisId = value.uuid
                totalHistoryIds.push(vehicleHisId)
                if (isDirty == false) {
                    historyId.push(vehicleHisId)
                }
            }
        }
        else {
            console.log(`vehicleMatch  ${vehicleMatch} vehicleNo ${vehicleNo}`)
        }

    }

    console.log(historyId.length)
    console.log(`totalHistoryIds ${totalHistoryIds.length}`)
    fs.writeFileSync("shIdForDelete.json", JSON.stringify(historyId))



    let historyIdsData = JSON.parse(fs.readFileSync("shIdForDelete.json", "utf-8"))
    console.log(historyIdsData.length)
    // for (let id of historyIdsData) {
    //     await removeVehicleHistoryFromMap(id)
    // }



}

main2()