const { error } = require("console")
const rp = require("request-promise")   
const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODkxNDUyNDMsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiI2ZjgwZWZmNS1mYWQxLTRmYmYtOTc2Yi1iNWJmYjU5NWQ0NTQiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.15Ls4nnXBxn1oEk4undu2cAZ-xZo-prxAEDnUFhBYfY"
let payload = {
    "Gate Out": null,
    "IPOS to Fretron": null,
    "Tare Weight": "66890",
    "Gross Weight": null,
    "Gate Out Date Time": null,
    "Vehicle No": "GJ234U7891",
    "Net Weight": null,
    "Transporter Name": null,
    "BOE Qty": null,
    "Commulitative Dispatch Qty": null,
    "Balance Qty": null,
    "Type of Material ??": null,
    "HSN Code": null
}

function getFromCf(cf, key) {
    return cf?.find((v) => v.fieldKey == key)?.value ?? null
}

function getCfPayload(key, type, value) {
    return {
        "indexedValue": [],
        "fieldKey": key,
        "multiple": false,
        "description": "",
        "remark": "",
        "uuid": null,
        "required": false,
        "accessType": null,
        "input": "string",
        "unit": "",
        "valueType": "string",
        "options": [],
        "fieldType": type,
        "value": value,
        "isRemark": false
    }
}

async function bulkSyncApi(payload) {
    let url = `https://apis.fretron.com/shipment/v1/shipment/bulk/sync`;
    try {
        let res = await rp({
            method: "POST",
            uri: url,
            body: payload,
            headers: {
                Authorization: TOKEN,
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
async function getShipmentByVehNo(vehNo) {
    try {
        let url = `https://apis.fretron.com/shipment-view/shipments/v1?filters=%7B%22__version%22%3A2%7D&search=${vehNo}`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                Authorization: TOKEN
            }
        })
        return res?.length ? res : []
    }
    catch (e) {
        console.log(`error executing when getting shipment ${e.message}`);
    }
    return []
}

async function orderLinkWithShipment(payload) {
    try {
        console.log(JSON.stringify(payload))
        let url = `https://apis.fretron.com/order-manager-v2/sales-orders/v1/link/shipment?skipPreHook=false`
        let res = await rp({
            uri: url,
            method: "POST",
            body: payload,
            json: true,
            headers: {
                Authorization: TOKEN
            }
        })
        if (res?.status == 200) {
            return res
        } else {
            console.log(`error in order link with shipment ${res.error}`)
            return null
        }

    } catch (e) {
        console.log(`Error in linking order with shipment ${e.message}`)
    }
    return null
}

async function consignmentCreate(paylaod) {
    try {
        let url = `https://apis.fretron.com/consignment/v1/consignment`
        let res = await rp({
            uri: url,
            method: "POST",
            json: true,
            body: paylaod,
            headers: {
                Authorization: TOKEN
            }
        })
        if (res?.status == 200) {
            console.log(`Consignment created Successfully status ${res.status}`)
            return res
        } else {
            console.log(`error in creating cn ${res.error}`)
            return null
        }
    } catch (e) {
        console.log(`Error creating consignment ${e.message}`)
    }
    return null

}

async function shipmentConLink(payload) {
    try {
        console.log(JSON.stringify(payload))
        let url = `https://apis.fretron.com/shipment/v1/shipment/stage/cn/mapping`
        let res = await rp({
            uri: url,
            method: "POST",
            body: payload,
            json: true,
            headers: {
                Authorization: TOKEN
            }
        })
        console.log(`sh-cn link ${JSON.stringify(res)}`)

        if (res?.status == 200) {
            return res
        } else {
            console.log(`error in linking sh cn ${res.error}`)
            return null
        }

    }
    catch (e) {
        console.log(`Error In sh-cn linking ${e.message}`)
    }

}

async function getOrderByOrderNo(orderNo) {
    try {
        let url = `https://apis.fretron.com/shipment-view/sales/v2/orders?limit=50&search=${orderNo}&filters={"orderType":["PurchaseOrder"]}`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                Authorization: TOKEN
            }
        })
        console.log(res)
        return res?.length ? res.find((v) => v.orderNumber == orderNo) : null
    } catch (e) {
        console.log(`Error in getting Order ${orderNo} ${e.message}`)
    }
    return null
}

async function main(payload) {
    try {
        let vehicleNo = payload["Vehicle No"]
        console.log(vehicleNo)
        if (vehicleNo) {
            let shRes = await getShipmentByVehNo(vehicleNo)
            let count = 0
            if (shRes?.length) {
                for (let item of shRes) {
                    if (item?.shipmentTrackingStatus == "At Pickup Point") {
                        shRes = item
                        console.log(item.shipmentNumber)
                        count += 1
                    }
                }
                if (count && count > 1) {
                    throw new Error(`More than One vehicle is At Pickup Point ${vehicleNo}`)
                }
                // console.log(shRes)

                let shId = shRes?.uuid
                let cfs = shRes?.customFields ?? []
                let freightUnitLineItemId = shRes?.freightUnitLineItemId
                let po_number = getFromCf(cfs, "PO Number")
                let flag = false
                let tareWeight = payload["Tare Weight"]
                let shStage = shRes?.shipmentStages ?? []
                let cfToAdd = []
                tareWeight ? cfToAdd.push(getCfPayload("Tare Weight", "text", tareWeight)) : null
                let payloadAddCf = {
                    shipmentId: shId,
                    updates: [
                        {
                            keyToUpdate: "customfields",
                            updatedValue: cfToAdd,
                        },
                    ],
                }

                await bulkSyncApi(payloadAddCf)

                if (po_number && freightUnitLineItemId) {
                    console.log(`fu id found ${freightUnitLineItemId}`)
                    flag = true
                }
                else if (po_number && !freightUnitLineItemId) {
                    // sh order link 
                    let orderRes = await getOrderByOrderNo(po_number)

                    if (orderRes) {
                        let loadTypeId = "b28b6edc-a08d-4ad3-980a-41359731c09b"
                        let freightCost = "7867888"
                        let vendorId = "89adf72d-4ec2-4af9-9e47-6e2a2043ce51"
                        let vehCapacity = "30"
                        let orderId = orderRes.uuid
                        let lineItemId = orderRes.lineItems[0].uuid
                        let shOrderLinkPayload = {
                            "type": "Order",
                            "assignRequest": {
                                "loadTypeId": loadTypeId,
                                "freightCost": freightCost,
                                "freightType": "perVehicle",
                                "vendorId": vendorId,
                                "vehicleCapacity": vehCapacity,
                                "optimizationBasis": "weight",
                                "shipmentId": shId,
                                "customFields": [],
                                "assignmentStrategy": "ByUser",
                                "orders": [{
                                    "orderId": orderId,
                                    "lineItemId": lineItemId,
                                    "quantity": {
                                        "weight": orderRes.lineItems[0].mappings[0].quantity.weight,
                                        "volume": null,
                                        "packageMeasurement": null,
                                        "trucks": null,
                                        "containers": null
                                    }
                                }]
                            }
                        }
                        let orderShLinkRes = await orderLinkWithShipment(shOrderLinkPayload)
                        // return
                        flag = orderShLinkRes?.status == 200 ? true : false
                    } else {
                        throw new Error(`order Not found ${po_number}`)
                    }
                }
                else {
                    throw new Error(`Po Number not found ${po_number}`)
                }

                if (flag) {
                    // create Cn
                    let createCnPayload = {}
                    let createdCnRes = await consignmentCreate(createCnPayload)
                    if (createdCnRes?.status == 200) {
                        // sh-cn link
                        createdCnRes = createdCnRes?.data
                        console.log(createdCnRes)
                        let cnId = createdCnRes.consignment.uuid
                        console.log(cnId)


                        let sh_cn_linkPayload = {
                            "shipmentId": shId,
                            "cnAdded": [cnId],
                            "cnRemoved": [],
                            "rearrange": false,
                            "stageList": shStage,
                            "stageMapping": [{
                                "consignmentPickUps": [cnId],
                                "consignmentDelivered": [cnId]
                            }]
                        }
                        let shCnLinkRes = await shipmentConLink(sh_cn_linkPayload)
                    }
                }
            } else {
                console.log(`Shipment Not found for veh ${vehicleNo}`)
            }
        } else {
            throw new Error("Vehicle No Not Found")
        }
    } catch (e) {
        throw new Error(`Error in main ${e.message}`)
    }
}

try {
    main(payload)
} catch (e) {
    console.log(`error in calling main ${e.message}`)
}