
const rp = require("request-promise")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"
console.log("Hit!")
const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzM0MjE5MTgsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiM2U0Y2RlZTktMGIzYi00NmRkLTliOTgtZGYwZTM4YTAyNzFjIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.Es6erVa21gtwNhRI0jQ9NDcOpvNzvapxvCMaujB7oyo"


let sh = $event
let orders = []

console.log(`Event ${sh.shipmentNumber} : ${sh.uuid} : fwd ${sh.updates?.forwardReasons}`)

async function getOrderById(orderId) {
    let url = `${FRT_PUB_BASE_URL}/order-manager-v2/sales-orders/v1/order/${orderId}`
    try {
        let res = await rp({
            method: "GET",
            uri: url,
            headers: {
                Authorization: TOKEN
            },
            json: true
        })
        console.log(`Get orderById response status : ${res.status}`)
        if (res.status == 200) {
            return res.data
        } else {
            console.log(`Get orderById response error : ${res.error}`)
        }
    } catch (e) {
        console.log(`Catched error in getting orderById : ${e.message}`)
    }
    return null
}

async function getFreightUnitByLineItemId(lineItemId) {
    let body = [lineItemId];
    let options = {
        method: "POST",
        uri: `${FRT_PUB_BASE_URL}/order-manager-v2/freight-units/v1/freight-units/by/linItemIds`,
        json: true,
        body: body,
        headers: {
            "Content-Type": "application/json",
            Authorization: TOKEN,
        },
    };
    return rp(options)
        .then((result) => {
            if (result.status != 200) {
                console.log("Error in get freight unit " + result.error);
                return null;
            }
            return result.data[0];
        })
        .catch((e) => {
            console.log("Error in get freight unit " + e);
            return null;
        });
}

async function ensureFleetOwner(sh) {
    try {
        console.log(`Executing for shipment - ${sh.shipmentNumber}`);

        let shMaster = sh
        let shNo = shMaster.shipmentNumber;
        let broker = shMaster?.fleetInfo?.broker;
        let fleetOwner = shMaster?.fleetInfo?.fleetOwner;

        if (broker && fleetOwner && broker.name != fleetOwner.name) {
            console.log(
                `Broker - ${broker.name}, Fleet Owner - ${fleetOwner.name} --> CHANGED`
            );
            shMaster.fleetInfo.fleetOwner = broker;
            let payload = shMaster;

            await shipmentPUT(payload);
            console.log(`Update Shipment - ${shNo}`);
        } else {
            console.log(`Fleet owner and Broker are same----- not updating on shipment`)
        }


        async function shipmentPUT(payload) {
            try {
                let res = await rp({
                    url: `${FRT_PUB_BASE_URL}/shipment/v1/admin/shipment`,
                    method: "PUT",
                    json: true,
                    body: payload,
                });
                console.log(`shipment put status ${res.status}`);
                return res;
            } catch (e) {
                console.log(`Caught Error in put sh admin ${e.message}`);
            }

            return null;
        }
    } catch (error) {
        console.log(
            `Caught Error in executing ensure FleetOwner - ${error.message}`
        );
    }
}

async function sendEventDataToSap(data) {
    let url = `https://49.249.154.146:50002/sap/bc/zfretron_vad?sap-client=800`
    try {
        let res = await rp({
            method: "POST",
            uri: url,
            headers: {
                Authorization: "Basic aXQwMDA3OlByZEBNYXIyMw=="
            },
            body: data,
            json: true
        })
        console.log(`Send event data to SAP res : ${JSON.stringify(res)}`)
    } catch (e) {
        console.log(`Catched error : ${e.message}`)
    }
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

function getCfObj(fieldKey, value) {
    return {
        "indexedValue": [],
        "fieldKey": fieldKey,
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
        "fieldType": "text",
        "value": value,
        "isRemark": false
    }
}

function getOrderNoAndCustomerCf() {
    try {
        let cfs = []
        let customerNames = []
        let orderNos = []
        for (let order of orders) {
            let customerName = order?.lineItems?.[0]?.consignee?.name
            customerNames.push(customerName)
            orderNos.push(order?.externalId ?? "")
        }
        if (customerNames) {
            cfs.push(getCfObj("Customer Name", customerNames?.join()))
        }
        if (orderNos) {
            cfs.push(getCfObj("Order No's", orderNos?.join()))
        }
        return cfs
    } catch (e) {
        console.log(`Catched error in getting cfs for orderNo and customer codes : ${e.message}`)
    }
    return []
}

async function addCfsOnShCreate(cfPayload) {
    try {
        let shId = sh.uuid
        let cfs = getOrderNoAndCustomerCf()
        cfs = [...cfPayload, ...cfs]
        console.log(`Adding cfs : ${cfs.map(it => it.fieldKey)}`)
        let payload = {
            "shipmentId": shId,
            "updates": [
                {
                    "keyToUpdate": "customfields",
                    "updatedValue": cfs
                }
            ]
        }
        return await bulkSyncApi(payload)
    } catch (e) {
        console.log(`Catched error in add IsFinalization Done? Cf on Sh ${sh.shipmentNumber} : ${e.message}`)
    }
    return null
}

function getYesNoTypeCf(key, value) {
    return {
        "fieldKey": key,
        "valueType": "string",
        "options": [
            "Yes",
            "No"
        ],
        "fieldType": "yes-no",
        "value": value
    }
}

try {
    let shId = sh.uuid
    let freightUnitLineItemId = sh.freightUnitLineItemId
    let orderNos = []
    if (freightUnitLineItemId) {
        let fu = await getFreightUnitByLineItemId(freightUnitLineItemId)
        let fuLineItem = fu && fu.lineItems && fu.lineItems.length ? fu.lineItems[0] : null
        if (fuLineItem) {
            let salesOrderMapping = fuLineItem.salesOrderMappings ? fuLineItem.salesOrderMappings : []
            // let orderIds = salesOrderMapping.filter( orderMap => orderMap.fuMappings.find( fuMap => fuMap.fuLineItemId === freightUnitLineItemId)).map( it => it.orderId)
            let orderIds = salesOrderMapping.map(it => it.orderId)
            orderIds = [...new Set(orderIds)]
            for (let i = 0; i < orderIds.length; i++) {
                let order = await getOrderById(orderIds[i])
                let orderNo = order.externalId ? order.externalId : order.orderNumber
                orderNos.push(orderNo)
                orders.push(order)
            }
        }
    }
    let fleetInfo = sh.fleetInfo
    let vehicle = fleetInfo ? fleetInfo.vehicle : null
    let driver = fleetInfo ? fleetInfo.driver : null
    let vehicleNumber = vehicle ? vehicle.vehicleRegistrationNumber : null
    let driverName = driver ? driver.name : null
    let driverContact = driver && driver.mobileNumber ? driver.mobileNumber : (driver.mobileNumbers && driver.mobileNumbers.length ? driver.mobileNumbers[0] : null)
    let brokerCode = fleetInfo && fleetInfo.broker ? fleetInfo.broker.externalId : null
    let forwardingAgentCode = fleetInfo && fleetInfo.forwardingAgent ? fleetInfo.forwardingAgent.externalId : null
    let fleetOwnerCode = fleetInfo && fleetInfo.fleetOwner ? fleetInfo.fleetOwner.externalId : null
    let transporterCode = brokerCode ? brokerCode : (forwardingAgentCode ? forwardingAgentCode : fleetOwnerCode)
    let sapPayload = {
        "shipmentId": shId,
        "vehicleRegistrationNumber": vehicleNumber,
        "driverName": driverName,
        "driverContact": driverContact,
        "orderNumbers": orderNos,
        "transporterCode": transporterCode
    }
    console.log(JSON.stringify(sapPayload))
    let sapEventRes = await sendEventDataToSap(sapPayload)
    let shDataSentValue = "No"
    if (sapEventRes?.success == "true") {
        shDataSentValue = "Yes"
    }
    //Ensure FleetOwner on shipment
    await ensureFleetOwner(sh)
    let cfPayload = []
    cfPayload.push(getYesNoTypeCf("IsFinalization Done", "No"))
    cfPayload.push(getYesNoTypeCf("Shipment Data Sent", shDataSentValue))
    await addCfsOnShCreate(cfPayload)
} catch (e) {
    console.log(`Catched error : ${e.message}`)
}