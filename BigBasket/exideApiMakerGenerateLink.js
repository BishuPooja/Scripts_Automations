const { log } = require("console")
const rp = require("request-promise")
const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODE3MzE1OTcsInVzZXJJZCI6ImJvdHVzZXItLTU5NGQxMTkyLWU3ZWEtNGY3Zi04MDBhLTRhYWM5NjA0MzA4OSIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTU5NGQxMTkyLWU3ZWEtNGY3Zi04MDBhLTRhYWM5NjA0MzA4OSIsIm9yZ0lkIjoiNGU0ODMwMzgtNmY4MC00ZWU5LTkyODEtMTVhNDYyYmZjYmRhIiwibmFtZSI6InNoIGNuIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.dnjilnRR4c_Hu9TU_oSLWL4eCZtcvwyfEnglFQjGSzU"

async function getShByNo(shNo) {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/shipment-view/shipments/v1?search=${shNo}`,
            method: "GET",
            json: true,
            headers: {
                Authorization: token
            }
        })
        if (res && res.length) {
            return res.find(v => v.shipmentNumber == shNo)?.uuid
        }
        else {
            return null
        }
    } catch (e) {
        console.log(`error executing while getting shipment ${e.message}`)
    }
}

async function getCnByCnNo(cnNo) {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/shipment-view/consignments/enriched?search=${cnNo}`,
            method: "GET",
            json: true,
            headers: {
                Authorization: token
            }
        })

        if (res && res.length) {
            return res.find(v => v.consignment.consignmentNo == cnNo)
        }
        else {
            return null
        }
    }
    catch (e) {
        console.log(`error getting consignments  ${e.message}`)
    }
}

async function main(shipmentNo, consignmentNo) {
    let link = `http://alpha.fretron.com/shared-shipment?uuid=`
    let shNo = shipmentNo
    let cnNo = consignmentNo
    let data = null
    let status = 400
    let error = null
    let shipmentId = await getShByNo(shNo)
    let consignmentRes = await getCnByCnNo(cnNo)

    if (shipmentId) {
        link = link + shipmentId
        data = link
        status = 200
    }
    else if (consignmentRes) {
        let associatedShipments = consignmentRes?.associatedShipments?.length
        console.log(associatedShipments)
        if (associatedShipments) {
            let shId = consignmentRes.associatedShipments[0]?.uuid
            link = link + shId
            data = link
            status = 200
        }
        else {
            error = `Shipment Not Found For  ${cnNo}`
        }

    }
    else {
        error = `SH -CN Not found`
    }
    return { data: data, status: status, error: error }
}


let shipmentNo = "000000000061002449172881"
let consignmentNo = "1115209494"
main(shipmentNo, consignmentNo).then((v) => {
    console.log(v)
})