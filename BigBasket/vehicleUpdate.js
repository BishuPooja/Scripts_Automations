const rp = require("request-promise")
let fs = require("fs")
let _ = require("lodash")
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODQ0NzU4MjksInVzZXJJZCI6ImJvdHVzZXItLTZlM2M5MGU4LWMwZTItNDhlYS1iNjc4LTlmNzZhOGRhZTk2YyIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTZlM2M5MGU4LWMwZTItNDhlYS1iNjc4LTlmNzZhOGRhZTk2YyIsIm9yZ0lkIjoiMDZhY2FjN2YtNTY5Ny00ZmVmLTlhNjEtZWVmNDdmNzUzNjdhIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.0Kk62vXUuI2VBWAwauBiluOAGrNX1DH93mhC45xklmI"

async function getShs() {
    try {
        let url = `https://apis.fretron.com/shipment-view/shipments/v1?&size=800`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })
        return res.length ? res : []
    } catch (e) {
        console.log(`Getshs catch error ${e.message}`)
    }
}

async function getVehicleByVehNo(vehNo) {
    try {
        let url = `https://apis.fretron.com/shipment-view/partner-fleet/fleets/v2?size=50&sharedOnly=false&search=${vehNo}`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })
        // console.log(res)
        return res.data?.find((v) => v?.vehicle?.vehicleRegistrationNumber == vehNo) ?? null
    } catch (e) {
        console.log(`Getshs catch error ${e.message}`)
        return null
    }
}

async function getVehicleMaster(uuid) {
    try {
        let url = `https://apis.fretron.com/partner-fleet/v2/fleet/resource/${uuid}`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })
        console.log(`vehicle Master get Status ${res.status}`)
        return res?.status == 200 ? res.data : null
    }
    catch (e) {
        console.log(`get vehicle catch error ${e.message}`)
    }

}

async function bulkSync(payload) {
    try {
        let url = `http://apis.fretron.com/shipment/v1/shipment/bulk/sync`
        let res = await rp({
            uri: url,
            method: "POST",
            body: payload,
            json: true,
            headers: {
                authorization: TOKEN
            }
        })
        console.log(`bulk sync status ${res.status}`)
        if (res.status != 200) {
            console.log(res.error)
        }
    }
    catch (E) {
        console.log(`udpate vehicle in shipment catch error ${E.message}`)
    }
    return null
}

async function main() {
    // let shs = await getShs()
    // fs.writeFileSync(`shData`, JSON.stringify(shs))
    // console.log(shs.length)

    let shipments = JSON.parse(fs.readFileSync("shData.txt", "utf-8"))
    console.log(shipments.length)
    let count = 0
    let notVehicle = []
    let vehicleData = []
    for (let item of shipments) {
        count += 1
        console.log(count)
        let shId = item.uuid
        let vehicleId = item?.fleetInfo?.vehicle?.uuid
        let vehicleNo = item?.fleetInfo?.vehicle?.vehicleRegistrationNumber
        let shNo = item.shipmentNumber
        console.log(`Executin for Shipment ${shNo}`)
        let shDate = new Date(item.shipmentDate).toLocaleDateString()
        let vehicleRes = await getVehicleByVehNo(vehicleNo)
        // console.log(vehicleRes)
        if (!vehicleRes) {
            notVehicle.push({
                vehicleNo: vehicleNo,
                shNo: shNo
            })
        }
        else {
            let uuid = vehicleRes.uuid
            let vehicleMaster = await getVehicleMaster(uuid)

            if (vehicleMaster) {
                // console.log(vehicleMaster)
                console.log(`Vehicle Number- ${(vehicleMaster.vehicle.branch)}`)
                vehicleMaster = vehicleMaster.vehicle
                let shBranch = vehicleMaster.branch
                // console.log(shBranch)
                let payload = {
                    "shipmentId": shId,
                    "updates": [
                        {
                            "keyToUpdate": "vehicle",
                            "updatedValue": vehicleMaster
                        }, {
                            "keyToUpdate": "shbranch",
                            "updatedValue": shBranch
                        }
                    ]
                }
                vehicleData.push({
                    vehicleNo: vehicleNo,
                    shNo: shNo,
                    shipmentDate: shDate
                })
                console.log((payload))
                await bulkSync(payload)
            } else {
                console.log(`vehicle MasterNot found for vehicle ${vehicleNo} `)
            }

        }
    }
    vehicleData = _.groupBy(vehicleData, "vehicleNo")
    console.log(vehicleData)

    console.log(notVehicle.length)

}




main()


