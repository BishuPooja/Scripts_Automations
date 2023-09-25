const rp = require("request-promise")
const FRT_PUB_BASE_URL = "http://apis.fretron.com"
let $event = {
    "body": [{ "mblnr": "5001681037", "gpnum": "GPLII0082314", "vhtyp": "TRUCK", "vhnum": "UK06CB1787", "tripid": "", "werks": "GPLI", "ebeln": "6400047719", "lifnr": "0006005279", "name1": "SURYA POLYPET PVT LTD.", "ekgrp": "S49", "bldat": "2023-05-28", "zeile": 1, "maktx": "BOTTLE,PET,200ML,CL,FLAT", "xblnr": "154", "zindate": "2023-05-29", "pknum": 0, "pknat": "", "tgrno": "7747", "tgrdt": "2023-05-28", "zintime": "16:27:11", "matnr": "000000003519200599", "qty": "211200.000", "meins": "NOS", "materialcode": "000000003519200599", "mattype": "VERP", "matgroup": "MGP000005" }]
}
/**
     *  This is used for recieveing event of GATE-IN and other data -> INBOUND case
     */

console.log("HIT")
console.log($event.body)

const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjA5MDI1OTIsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNDcyYjNjNTEtZDhlOS00Mjk0LThhN2YtYTY5MDkzYjUwNWI3IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.GnkPKO8URn1c70Us-p8-2LOuPTWKgN-SOMaaSm1jiAs"

// let $event = {
//     body: [{
//         "mblnr": "5001558469", // MRN No
//         "gpnum": "GPLII0071844", // IGP No
//         "vhtyp": "OTHERS", // vehicle
//         "vhnum": "UP16ET-7383", // vehicle no
//         "werks": "GPLI",  // Plant
//         "ebeln": "6400043425", // PO No : PLI
//         "lifnr": "0006007196",  // Vendor code
//         "name1": "POLYLAM PRINTERS PVT. LTD.", // Vendor Name
//         "ekgrp": "93",  // purchase group
//         "bldat": "2022-04-02", // MRN Date
//         "zeile": 1,  // MRN line item
//         "maktx": "LABEL WAH USTAD 200ML PET-36%", // Material Description : PLI
//         "xblnr": "GST/0012",  // challan No
//         "zindate": "2022-04-09", // challan date
//         "pknum": 0, // no of packet : PLI
//         "pknat": "C/BOX",   // nature of packet : PLI
//         "tgrno": "",  // transporter gr no
//         "tgrdt": "0000-00-00", // gr date
//         "zintime": "14:55:25", // Date time
//         "matnr": "000000003530407619", // item code : PLI
//         "qty": "299250.000", // Qty : : PLI
//         "meins": "NOS"  // UNIT : : PLI
//     }]
// }

let keyNameMap = {
    mblnr: "MRN No",
    gpnum: "IGP No",
    vhtyp: "Vehicle",
    vhnum: "Vehicle No",
    tripid: "TripID",
    werks: "Plant",
    ebeln: "PO No",
    lifnr: "Vendor Code",
    name1: "Vendor Name",
    ekgrp: "Purchase Group",
    bldat: "MRN Date",
    zeile: "MRN Lineitem",
    maktx: "Material Description",
    xblnr: "Challan No",
    zindate: "Challan Date",
    pknum: "No of Packet",
    pknat: "Nature of Packet",
    tgrno: "Transporter GR No",
    tgrdt: "GR Date",
    zintime: "Challan time",
    matnr: "Item Code",
    qty: "Qty",
    meins: "UNIT",
    materialcode: "Material Code",
    mattype: "Material Type",
    matgroup: "Material Group",
    division: "Material Division"
}

let lineItemWiseFields = ["PO No", "No of Packet", "Nature of Packet", "Item Code", "Qty", "UNIT", "Material Code", "Material Group", "Material Type"]

function topLevelCfs(data) {
    let topLevelCfs = []
    Object.keys(data).forEach(key => {
        if (!lineItemWiseFields.includes(keyNameMap[key]) && keyNameMap[key] != "MRN Lineitem" && keyNameMap[key] != "TripID") {
            topLevelCfs.push({
                fieldKey: keyNameMap[key],
                fieldType: "text",
                valueType: "string",
                value: (data[key] != null) ? data[key] : "",
            })
        }
    })
    if (data.zindate && data.zintime) {
        let dateString = `${data.zindate} ${data.zintime}`
        let gateInTime = new Date(dateString).getTime()
        let gateInTimeCf = {
            "fieldType": "dateTime",
            "fieldKey": "GateIn Time SAP",
            "value": gateInTime - (5 * 5 * 60 * 60 * 1000),
            "valueType": "string",
            "input": "date"
        }
        topLevelCfs.push(gateInTimeCf)
    }
    return topLevelCfs
}

function itemLevelCfs(lineItemsData) {
    let itemLevelCfs = []
    let lineItemNos = []
    lineItemsData.forEach(it => {
        Object.keys(it).forEach(key => {
            if (lineItemWiseFields.includes(keyNameMap[key])) {
                itemLevelCfs.push({
                    fieldKey: `${keyNameMap[key]}_${it.zeile}`,
                    fieldType: "text",
                    valueType: "string",
                    value: (it[key] != null) ? it[key] : "",
                })
            }
        })
        lineItemNos.push(it.zeile)
    })
    if (lineItemNos.length) {
        itemLevelCfs.push({
            fieldKey: `MRN Lineitem No's`,
            fieldType: "text",
            valueType: "string",
            value: lineItemNos.join()
        })
    }
    return itemLevelCfs
}

async function bulkSyncApi(payload) {
    let url = `${FRT_PUB_BASE_URL}/shipment/v1/shipment/bulk/sync`;
    try {
        let res = await rp({
            method: "POST",
            uri: url,
            body: payload,
            headers: {
                Authorization: TOKEN,
                "traceID": "harshit_test"
            },
            json: true,
        });
        console.log(`Bulk Sync api response status : ${res.status}`);
        if (res.status == 200) {
            return res.data;
        } else {
            console.log(`Bulk Sync api response error : ${res.error}`);
        }
    } catch (e) {
        console.log(`Catched Error in Bulk Sync api : ${e.message}`);
    }
    return null;
}

async function getShipmentById(shId) {
    let url = `${FRT_PUB_BASE_URL}/shipment/v1/admin/shipment/${shId}?skipCn=true`;
    try {
        let res = await rp({
            method: "GET",
            uri: url,
            json: true,
        });
        console.log(`Get shipment by id status : ${res.status}`);
        if (res.status == 200) {
            return res.data;
        } else {
            console.log(`Get shipment by id error: ${res.error}`);
        }
    } catch (e) {
        console.log(`Get shipment by id catched err : ${e.message}`);
    }
    return null;
}

async function categoryResponse(type, materialCode, materialGroup, division) {
    let url = `${FRT_PUB_BASE_URL}/automate/autoapi/run/d3aca79a-b641-4ce5-a7c6-6549de02ffb0`

    let options = {
        uri: url,
        method: "POST",
        json: true,
        body: {
            type: type,
            code: materialCode,
            group: materialGroup,
            division: division
        }
    }

    return await rp(options)
}

async function ensureCategoryOnSh() {
    if ($event.body?.length) {
        let shipmentId = $event.body[0].tripid
        let sh = await ensureShByVehicleNoAndTripId(shipmentId)
        if (!sh) {
            return "NOT OK"
        }
        let cfs = sh.customFields
        let category = null
        let types = getFromCf(cfs, 'Material Type')
        let materialCodes = getFromCf(cfs, 'Material Code')
        let materialGroups = getFromCf(cfs, 'Material Group')
        let divisions = getFromCf(cfs, 'Division')
        for (let items of types) {
            let type = items.value
            let lineItemNo = items.fieldKey.split("_")?.[1]
            let materialGroup = materialGroups.find(({ fieldKey }) => fieldKey == "Material Group_" + lineItemNo)?.value
            let materialCode = materialCodes.find(({ fieldKey }) => fieldKey == "Material Code_" + lineItemNo)?.value
            let division = divisions.find(({ fieldKey }) => fieldKey == "Division_" + lineItemNo)?.value

            let res = await categoryResponse(type, materialCode, materialGroup, division)

            if (res.data) {
                category = res.data
                break
            }
        }
        let categoryOnSh = sh.customFields?.find(_ => _.fieldKey == "Category")?.value

        if (category && (category != categoryOnSh)) {
            console.log("Mismatch in Category changing on sh")
            console.log("Found category- " + category)
            console.log("Category on SH- " + categoryOnSh)
            let payload = {
                "shipmentId": sh.uuid,
                "updates": [{
                    "keyToUpdate": "customfields",
                    "updatedValue": [{
                        "indexedValue": [],
                        "fieldKey": "Category",
                        "multiple": false,
                        "description": "",
                        "remark": "",
                        "required": true,
                        "accessType": "mandotary_on_create",
                        "input": "",
                        "unit": "",
                        "valueType": "string",
                        "options": ["Country Liquor", "IMFL", "SDS", "Fusel Oil", "DDGS", "ENA", "Silica Sand", "Coal", "Chemical", "Iron | Steel ", "Country Liquor", "Scrap", "Antifoam/Urea/Zinc/Magnesium", "Fly Ash", "Molasses", "Empty Bottle Point-1", "Empty Bottle Point-2", "Rice Husk", "Broken Rice", "Cement", "Package Unload", "Others", "ETHANOL", "PET RESIN"],
                        "fieldType": "select",
                        "value": category,
                        "isRemark": false
                    }]
                }]
            }
            await bulkSyncApi(payload)
        }

        return "OK"
    } else {
        return "NOT OK"
    }
}

function getFromCf(cfs, fieldKey) {
    if (!cfs?.length) {
        return null
    }

    return cfs.filter(_ => _.fieldKey.includes(fieldKey))
}

async function populateCfs() {
    if ($event.body && $event.body.length) {
        let tripId = $event.body[0].tripid
        let sh = await ensureShByVehicleNoAndTripId(tripId)
        console.log(sh)
        if (sh) {
            let topCfs = topLevelCfs($event.body[0])
            let itemCfs = itemLevelCfs($event.body)
            let cfs = [...topCfs, ...itemCfs]
            console.log(JSON.stringify(cfs))
            console.log(cfs)
            if (cfs.length) {
                let payload = {
                    "shipmentId": sh.uuid,
                    "updates": [{
                        "keyToUpdate": "customfields",
                        "updatedValue": cfs
                    }]
                }
                await bulkSyncApi(payload)
                console.log(JSON.stringify(payload))
            }
        } else {
            console.log(`Some error in getting sh by id : ${tripId}`)
        }
        return "OK"
    } else {
        return "NOT OK"
    }
}



async function ensureShByVehicleNoAndTripId(tripId) {
    let sh = null
    if (tripId) {
        sh = await getShipmentById(tripId)
    }
    if (!sh) {
        let vehNo = $event.body[0].vhnum
        let shByVehNo = await getShipmentByVehicleNo(vehNo)
        console.log(shByVehNo)
        if (shByVehNo) {
            return await getShipmentById(shByVehNo.uuid)
        }
    }
    return sh
}

async function getShipmentByVehicleNo(vehNo) {
    let vehicleNo = vehNo.replace(/[^a-zA-Z0-9]/g, "")
    let filter = {
        "fleetInfo.vehicle.vehicleRegistrationNumber": [vehicleNo],
        "_shipmentStatus_": {
            "shipmentStatus": ["Planned"]
        },
        "__version": 2
    }
    console.log(JSON.stringify(filter))
    let url = `http://apis.fretron.com/shipment-view/shipments/v1?filters=${JSON.stringify(filter)}&allFields=["uuid"]`;
    console.log("URL " + url)
    try {
        let res = await rp({
            method: "GET",
            uri: url,
            json: true,
            headers: {
                Authorization: TOKEN
            }
        });
        console.log("Res Length " + res.length)
        if (res.length == 1) {
            return res[0]
        } else {
            return null
        }
    } catch (e) {
        console.log(`Get shipment by id catched err : ${e.message}`);
        return null
    }
}

async function saveDataInDb(payload) {
    try {
        let res = await rp({
            url: `${FRT_PUB_BASE_URL}/integration-exide/v1/integration-data`,
            method: "POST",
            json: true,
            body: payload,
            headers: {
                Authorization: TOKEN
            }
        })
        return res
    }
    catch (e) {
        console.log(`Error saving intergration data ${e.message}`)
    }

}

async function saveIntegrationData() {
    try {
        let primaryKey = $event.body.length ? $event.body[0]?.mblnr : ""
        if (primaryKey) {
            let payload = {
                "eventType": "Inbound_GateIn",
                "orgId": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
                "primaryKey": primaryKey,
                "inputData": $event.body,
            }
            await saveDataInDb(payload)
        }
        else {
            console.log(`primary key not found`)
        }
    }
    catch (e) {
        console.log(`error in saving inbound gate-in data ${e.message}`)
    }
}
async function main() {
    try {
        try {
            await saveIntegrationData()
        } catch (e) {
            console.log("Error in saving integration data " + e.message)
        }
        await populateCfs()
        await ensureCategoryOnSh()
        return { "status": 200 }
    } catch (e) {
        console.log(`Catched error : ${e.message}`)
        return { "status": 400 }
    }

}



main().then(_ => console.log(JSON.stringify(_))).catch(e => console.log(e))
