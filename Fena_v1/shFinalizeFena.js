/**
 *  On shipment finalized : add shipment cost document
 */

const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODA2Nzg5OTEsInVzZXJJZCI6ImJvdHVzZXItLWM1MDZmNzY1LTY3MjgtNDg2Ny04Yzg3LWY3MGM2OTdhMzllMSIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLWM1MDZmNzY1LTY3MjgtNDg2Ny04Yzg3LWY3MGM2OTdhMzllMSIsIm9yZ0lkIjoiY2YyODA2MTctMDNjNi00NGQ0LWI1NmEtMjY3YTJmMjk1MDU4IiwibmFtZSI6InNoIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.3GGKvsBwKjzUr0iaoQ-k__9xeh3Ww3g-ZXluSB2btNE"
const CHARGE = { "amount": null, "rateValueRuleId": null, "isCalculated": false, "baseValueRuleId": null, "rateUnit": null, "amountValueRuleId": null, "vendorFeedingType": "Broker", "baseValueFeedingType": null, "distributionBasis": "Weight", "amountFeedingType": "User", "rate": null, "chargeId": "987dd2d1-882c-40a4-97bc-c076e388d75b", "vendor": null, "applicability": "Shipment", "chargeName": "Vendor Freight", "rateFeedingType": "User", "base": null, "vendorRuleId": null }
const EXTRA_CHARGE = {
    "amount": null,
    "rateValueRuleId": null,
    "isCalculated": false,
    "baseValueRuleId": null,
    "rateUnit": "Fixed",
    "amountValueRuleId": null,
    "vendorFeedingType": "User",
    "baseValueFeedingType": null,
    "distributionBasis": "Equally",
    "amountFeedingType": "User",
    "rate": null,
    "chargeId": "926c64b7-4d09-480c-a201-44f4a9c1730f",
    "vendor": null,
    "applicability": "Shipment",
    "chargeName": "Extra Charge",
    "rateFeedingType": "User",
    "base": null,
    "vendorRuleId": null
}
async function getFuByLineItem(fuItemId) {
    let res = await rp({
        'uri': `${FRT_PUB_BASE_URL}/order-manager-v2/freight-units/v1/freight-units/by/linItemIds`,
        'body': [fuItemId],
        'headers': {
            'Authorization': TOKEN
        },
        'method': 'POST',
        'json': true
    })

    if (res.status == 200) {
        return res.data && res.data.length > 0 ? res.data[0] : null
    }
    else {
        console.log(`eror in getting fu by item ${fuItemId} ` + res)
        return null
    }
}


async function getFreightCost(sh) {
    let fuItemId = sh.freightUnitLineItemId
    if (fuItemId) {
        let fu = await getFuByLineItem(fuItemId)
        if (fu) {
            return fu.lineItems[0].expectedFreightINR && fu.lineItems[0].expectedFreightINR > 0.0 ? fu.lineItems[0].expectedFreightINR : -1
        }
    }
    return -1
}

async function saveShipmentCost(shId, cost) {
    let payload = {
        "shipmentCost": cost,
        "chargeSetting": CHARGE
    }
    try {
        let url = `${FRT_PUB_BASE_URL}/shipment-cost/v1/cost?shipmentId=${shId}`
        let res = await rp({
            'uri': url,
            'method': 'POST',
            'headers': {
                'Authorization': TOKEN,
                'traceID': 'FENA_COST_AUTOMATION_' + Date.now()
            },
            'body': payload,
            'json': true
        })

        if (res.status == 200) {
            return res.data
        }
        else {
            console.log(`error in create cost: ${JSON.stringify(res)}`)
        }
    }
    catch (e) {
        console.log(`error in create cost ` + e)
    }
    return null
}

async function autoFillCharge(shId, charge) {
    try {
        let url = `${FRT_PUB_BASE_URL}/shipment-cost/v1/auto-fill/cost-detail?shipmentId=${shId}`
        let res = await rp({
            'uri': url,
            'method': 'POST',
            'headers': {
                'Authorization': TOKEN,
                'traceID': 'FENA_COST_AUTOMATION_' + Date.now()
            },
            'body': charge,
            'json': true
        })

        if (res.status == 200) {
            return res.data
        }
        else {
            console.log(`error in autofill charge: ${JSON.stringify(res)}`)
        }
    }
    catch (e) {
        console.log(`error in autofill charge ` + e)
    }
    return null
}

async function sendAlert(shipmentId, payload) {
    try {
        let res = await rp({
            url: `http://apis.fretron.com/shipment/v1/shipment/${shipmentId}/alert`,
            method: "POST",
            json: "true",
            body: payload,
            headers: {
                Authorization: TOKEN
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
        console.log(`error sending alert ${e.message}`);
    }


}

async function addCostDocument(sh) {
    console.log(`Event for ${sh.shipmentNumber} : ${sh.uuid}`)
    let vendorFreightCost = await getFreightCost(sh)
    console.log(`calulated venodr freight cost ${vendorFreightCost}`)
    if (vendorFreightCost > 1) {
        let shCharge = await autoFillCharge(sh.uuid, CHARGE)
        if (shCharge) {
            shCharge.charge.amount = vendorFreightCost
            shCharge.amount = vendorFreightCost
            // shCharge.charge.uuid = CHARGE.chargeId
            await saveShipmentCost(sh.uuid, shCharge)
            console.log("Saved Shipment Cost")
        }
        else {
            console.log("auto Fill charge not found foir FREIGH CHARGE")
        }
    }
    else if (vendorFreightCost <= 1) {
        // alert 
        let shipmentId = sh.uuid
        let alertPayload = {
            "closedBy": null,
            "createdAt": null,
            "issueId": null,
            "createdBy": null,
            "snoozTime": null,
            "description": "freight cost not found",
            "type": null,
            "uuid": null,
            "status": "OPEN",
            "updatedAt": null
        }
        let alertSendRes = await sendAlert(shipmentId, alertPayload)
        console.log(alertSendRes);

    }

    var deliveryStages = sh.shipmentStages.filter(({ tripPoint: { purpose } }) => purpose == "Delivery")
    console.log(`total delivery ${deliveryStages.length}`)

    if (deliveryStages.length > 1) {
        let shExtraCharge = await autoFillCharge(sh.uuid, EXTRA_CHARGE)
        if (shExtraCharge) {
            let extraAmount = getAmount(deliveryStages)
            shExtraCharge.charge.amount = extraAmount
            shExtraCharge.amount = extraAmount
            if (!shExtraCharge.vendor) {
                shExtraCharge.vendor = sh.fleetInfo.broker ?? sh.fleetInfo?.forwardingAgent ?? sh.fleetInfo.fleetOwner ?? null
            }
            await saveShipmentCost(sh.uuid, shExtraCharge)
            console.log(`ShCost For Extra Charge Saved`)
        }
        else {
            console.log(`Auto fill charge not found for EXTRA CHARGE`)
        }
    }
}

function getAmount(deliveryStages) {
    let names = deliveryStages.map(_ => {
        return _.hub?.name ?? _.place.name
    })
    console.log(`Total delivery : ${names}`)
    let totalAmount = 0;

    let currentCity = names[0];
    for (let i = 1; i < names.length; i++) {
        let nextCity = names[i];
        if (nextCity === currentCity) {
            totalAmount += 300; // If yes, add 300 to the total amount
        } else {
            totalAmount += 500;
        }
        currentCity = nextCity;
    }
    console.log(`total extra amount ${totalAmount}`)
    return totalAmount
}

try {
    console.log(Date.now())
    await delay(3000)
    console.log(Date.now())
    await addCostDocument($event)
}
catch (e) {

}

