
const rp = require("request-promise")

console.log('Hit')
const transporterMap = {
    "T242K01138": {
        1100: 1500,
        2100: 2500,
        3000: 3200
    },
    "T242P10130": {
        1100: 1500,
        2100: 2500,
        3000: 3200
    },
    "T242V01017": {
        1100: 1500,
        2100: 2500,
        3000: 3200
    },
    "T242K01138": {
        1100: 1500,
        2100: 2500,
        3000: 3200
    },
    "T242V01017": {
        1100: 1500,
        2100: 2500,
        3000: 3200
    }
}


// let payload = $event.body
// let shId = payload.shipmentId
let shId = 'b3318a73-910c-47ab-a67b-9e415aeda13b'
// let token = `Bearer ${payload.token}`
let token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODYxMTY5OTQsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiMGJiZGMxMjItZjk2My00NTJmLTlhZjEtMjg3MTVmNWUzNmIyIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.5FoH-sBxumLKI0OPwRdlvnZvXv2T9Kwj4oDz3qae57E"
// let chargeTypes = payload.cfs[0].options
let chargeTypes = [`Door Delivery Charge`]
if (!chargeTypes.length) {
    return 'Please selected at least one chagre.'
}
console.log(`${JSON.stringify(chargeTypes)} , shId ${shId}`)



// const BASE_URL = `${FRT_PUB_BASE_URL}`;
const BASE_URL = "https://apis.fretron.com"

//charge name constants
const LR_Number = 'LR Number'

const Additional_Delivery_13 = 'Additional Per Point Delivery Charges(1-3 KM)'
const Additional_Delivery_46 = 'Additional Per Point Delivery Charges(4-6 KM)'
const Plant_Delivery_Charge = 'Plant Delivery Charge'
const Sugar_DD = 'Sugar DD'
const Door_Delivery_Charge = 'Door Delivery Charge'
const Loading_Charge_Per_KG = 'Loading Charge per KG'
const Unloading_Charge_Per_KG = 'Unloading Charge per KG'
const Handling_Charges_Per_Bag = 'Handling Charges Per Bag'
const Handling_Charges_Per_MT = 'Handling Charges Per MT'
const LR_Charges_Per_CN = 'LR Charges per CN'




let chargeSettingByName = {
    [Handling_Charges_Per_MT]: { "amount": null, "rateValueRuleId": null, "isCalculated": true, "baseValueRuleId": null, "rateUnit": "perMT", "amountValueRuleId": null, "vendorFeedingType": "User", "baseValueFeedingType": "User", "distributionBasis": "Weight", "amountFeedingType": "User", "rate": null, "chargeId": "3bf3c7c5-e101-44bb-91dd-f5b323568fbe", "vendor": null, "applicability": "Shipment", "chargeName": "Handling Charges Per MT", "rateFeedingType": "User", "base": null, "vendorRuleId": null },
    [Handling_Charges_Per_Bag]: { "amount": null, "rateValueRuleId": null, "isCalculated": true, "baseValueRuleId": null, "rateUnit": "perBag", "amountValueRuleId": null, "vendorFeedingType": "User", "baseValueFeedingType": "User", "distributionBasis": "Package", "amountFeedingType": "User", "rate": null, "chargeId": "fb99348b-a95f-4427-80e6-b1f10a853cd2", "vendor": null, "applicability": "Shipment", "chargeName": "Handling Charges Per Bag", "rateFeedingType": "User", "base": null, "vendorRuleId": null },
    [Loading_Charge_Per_KG]: { "amount": null, "rateValueRuleId": null, "isCalculated": true, "baseValueRuleId": null, "rateUnit": "perKG", "amountValueRuleId": null, "vendorFeedingType": "User", "baseValueFeedingType": "User", "distributionBasis": "Weight", "amountFeedingType": "User", "rate": null, "chargeId": "b5ea56cd-477d-4d40-a74c-bb3976a67a68", "vendor": null, "applicability": "Shipment", "chargeName": "Loading Charge per KG", "rateFeedingType": "User", "base": null, "vendorRuleId": null },
    [Unloading_Charge_Per_KG]: { "amount": null, "rateValueRuleId": null, "isCalculated": true, "baseValueRuleId": null, "rateUnit": "perKG", "amountValueRuleId": null, "vendorFeedingType": "User", "baseValueFeedingType": "User", "distributionBasis": "Weight", "amountFeedingType": "User", "rate": null, "chargeId": "7d99814b-ca73-4707-a7ce-ba2dcf085c26", "vendor": null, "applicability": "Shipment", "chargeName": "Unloading Charge per KG", "rateFeedingType": "User", "base": null, "vendorRuleId": null },
    [Door_Delivery_Charge]: { "amount": null, "rateValueRuleId": null, "isCalculated": false, "baseValueRuleId": null, "rateUnit": "Fixed", "amountValueRuleId": null, "vendorFeedingType": "User", "baseValueFeedingType": null, "distributionBasis": "Weight", "amountFeedingType": "User", "rate": null, "chargeId": "afca4cc8-8ddc-47a9-9f24-80a44f68204e", "vendor": null, "applicability": "Shipment", "chargeName": "Door Delivery Charge", "rateFeedingType": "User", "base": null, "vendorRuleId": null },
    [LR_Charges_Per_CN]: { "amount": null, "rateValueRuleId": null, "isCalculated": false, "baseValueRuleId": null, "rateUnit": "Fixed", "amountValueRuleId": null, "vendorFeedingType": "User", "baseValueFeedingType": null, "distributionBasis": "Weight", "amountFeedingType": "User", "rate": null, "chargeId": "b4093be0-4baa-4345-a590-1056fc9cc5fb", "vendor": null, "applicability": "Shipment", "chargeName": "LR Charges per CN", "rateFeedingType": "User", "base": null, "vendorRuleId": null },
    [Plant_Delivery_Charge]: { "amount": null, "rateValueRuleId": null, "isCalculated": false, "baseValueRuleId": null, "rateUnit": "Fixed", "amountValueRuleId": null, "vendorFeedingType": "User", "baseValueFeedingType": null, "distributionBasis": "Weight", "amountFeedingType": "User", "rate": null, "chargeId": "6474efc2-f9bb-4573-85de-e25664b1944c", "vendor": null, "applicability": "Shipment", "chargeName": "Plant Delivery Charge", "rateFeedingType": "User", "base": null, "vendorRuleId": null },
    [Additional_Delivery_13]: { "amount": null, "rateValueRuleId": null, "isCalculated": false, "baseValueRuleId": null, "rateUnit": null, "amountValueRuleId": null, "vendorFeedingType": "User", "baseValueFeedingType": null, "distributionBasis": "Equally", "amountFeedingType": "User", "rate": null, "chargeId": "cff6f5ce-bb5c-4f29-aac8-e33801eda064", "vendor": null, "applicability": "Shipment", "chargeName": "Additional Per Point Delivery Charges(1-3)KM", "rateFeedingType": "User", "base": null, "vendorRuleId": null },
    [Additional_Delivery_46]: { "amount": null, "rateValueRuleId": null, "isCalculated": false, "baseValueRuleId": null, "rateUnit": "Fixed", "amountValueRuleId": null, "vendorFeedingType": "User", "baseValueFeedingType": null, "distributionBasis": "Equally", "amountFeedingType": "User", "rate": null, "chargeId": "facadb92-51ea-40ea-8b31-e6a6d2082801", "vendor": null, "applicability": "Shipment", "chargeName": "Additional Per Point Delivery Charges(3-6)KM", "rateFeedingType": "User", "base": null, "vendorRuleId": null }
}



//Entry Point

// let response = await main(shId, chargeTypes)
// console.log(`Return ${response}`)
// return response
main(shId, chargeTypes)


async function calculateCost(sh, consignments, chargeTypes) {
    try {
        if (!consignments) {
            throw new Error("Not allowed as shipment not finalized")
        }

        let priceTableCharges = await getPriceTable(sh.uuid, sh, consignments.map((cn) => cn.uuid))
        if (!priceTableCharges.length) {
            throw new Error("No matching trabsporter found in rule table")
        }

        //Weight & Distance calculations...
        let loadedWeight = consignments.reduce((pv, cv) => {
            pv = pv + (cv?.loadInfo?.standardMeasurement?.weight?.netQuantity ?? 0.0)
            return pv
        }, 0.0)

        let loadedBags = consignments.reduce((pv, cv) => {
            pv = pv + (cv?.loadInfo?.standardMeasurement?.packageMeasurement?.netQuantity ?? 0.0)
            return pv
        }, 0.0)



        //{'lrNumber' : [cnids]}  considering 1LR = 1 Delivery
        let cnIdsByLRNumber = {};
        consignments.forEach((cn) => {
            const lrNumber = cn.customFields?.find((cfs) => cfs.fieldKey == LR_Number)?.value;
            if (lrNumber) {
                if (!cnIdsByLRNumber[lrNumber]) {
                    cnIdsByLRNumber[lrNumber] = [];
                }
                cnIdsByLRNumber[lrNumber].push(cn.cnId);
            }
        });

        let numberOfDelivery = Object.keys(cnIdsByLRNumber).length
        let additionalKM = getAdditionalKM(sh.shipmentStages)
        console.log(`total wt as per CN ${loadedWeight} , bags ${loadedBags} , numberOfDelivery ${numberOfDelivery} , additionalKM ${additionalKM}`)

        let shCostList = await getShCostListForSh(sh.uuid);
        for (let chargeType of chargeTypes) {
            console.log(chargeType)
            if (chargeType == 'Additional Per Point Delivery Charges') {
                chargeType = (additionalKM >= 4.0) ? Additional_Delivery_46 : Additional_Delivery_13
            }
            // console.log(chargeType, chargeSettingByName[`${chargeType}`])
            let chargeSetting = chargeSettingByName[chargeType]
            if (!chargeSetting) {
                console.log(`Charge setting not found for charge ${chargeType}`)
                continue
            }

            let priceCharge = priceTableCharges.find((ch) => ch.name == chargeType)
            console.log(priceCharge)
            if (!priceCharge) {
                console.log(`Charge type not found in condition record`)
                continue
            }

            let amount = priceCharge.amount ?? 0
            let rate = priceCharge.rate ?? 0.0
            if (amount <= 0.0 && rate <= 0.0) {
                console.log(`Charge type ${chargeType} pricing table amount and rate is zero.`)
                continue
            }

            let cost = shCostList.find(_ => _.charge.name === chargeType)
            console.log(`cost  ${cost}`)
            if (!cost) {
                cost = await autoFillCharge(sh.uuid, chargeSetting)
            }

            cost.vendor = sh.fleetInfo?.broker ?? sh.fleetInfo?.forwardingAgent ?? sh.fleetInfo?.fleetOwner

            if (chargeType == Plant_Delivery_Charge) {
                cost.amount = (1 * priceCharge.amount ?? 0)
                cost.charge.amount = (1 * priceCharge.amount ?? 0)

            } else if (chargeType == Sugar_DD) {
                cost.amount = priceCharge.amount ?? 0
                cost.charge.amount = priceCharge.amount ?? 0
            }
            else if (chargeType == LR_Charges_Per_CN) {
                cost.amount = (numberOfDelivery * priceCharge.amount ?? 0)
                cost.charge.amount = (numberOfDelivery * priceCharge.amount ?? 0)

            } else if (chargeType == Door_Delivery_Charge) {

                let transporterExternalId = sh?.fleetInfo?.broker?.externalId ?? null
                let chargeValueFromTransporterMap = getChargeFromTransporter(transporterExternalId, loadedWeight)
                if (chargeValueFromTransporterMap) {
                    cost.amount = chargeValueFromTransporterMap
                    cost.charge.amount = chargeValueFromTransporterMap
                }
                else {
                    cost.amount = (numberOfDelivery * priceCharge.amount ?? 0)
                    cost.charge.amount = (numberOfDelivery * priceCharge.amount ?? 0)
                }

            } else if (chargeType == Handling_Charges_Per_Bag) {
                cost.charge.base = loadedBags
                cost.charge.rate = priceCharge.rate
                cost.amount = (cost.charge.base * cost.charge.rate)
                cost.charge.amount = cost.amount
            } else if (chargeType == Handling_Charges_Per_MT) {
                cost.charge.base = loadedWeight
                cost.charge.rate = priceCharge.rate
                cost.amount = (cost.charge.base * cost.charge.rate)
                cost.charge.amount = cost.amount

            } else if (chargeType == Loading_Charge_Per_KG) {
                cost.charge.base = loadedWeight
                cost.charge.rate = priceCharge.rate
                cost.amount = (cost.charge.base * cost.charge.rate)
                cost.charge.amount = cost.amount

            } else if (chargeType == Unloading_Charge_Per_KG) {
                cost.charge.base = loadedWeight
                cost.charge.rate = priceCharge.rate
                cost.amount = (cost.charge.base * cost.charge.rate)
                cost.charge.amount = cost.amount

            } else if (chargeType == Additional_Delivery_46) {
                cost.amount = (1 * priceCharge.amount ?? 0)
                cost.charge.amount = (1 * priceCharge.amount ?? 0)

            } else if (chargeType == Additional_Delivery_13) {
                cost.amount = (1 * priceCharge.amount ?? 0)
                cost.charge.amount = (1 * priceCharge.amount ?? 0)

            } else {
                console.log(`Charge type ${chargeType} not handled yet so skipping...`)
                continue
            }
            console.log(cost, chargeSetting)
            console.log(`Ensure charge type is ${chargeType}`)
            // await updateShipmentFreightCost(cost, sh.uuid, chargeSetting)

        }

        return 'Document Created Sucessfully'

    } catch (err) {
        console.log(`Error while cal. cost, error: ${err.message}`)
        return 'Something went wrong'
    }
    return 'Something went wrong'
}

function getChargeFromTransporter(externalId, loadedWeight) {
    let chargeCharge = null;
    const transporter = transporterMap[externalId];

    if (externalId && loadedWeight && transporter) {
        if (loadedWeight <= 1100) {
            chargeCharge = transporter[1100];
        } else if (loadedWeight <= 2100) {
            chargeCharge = transporter[2100];
        } else if (loadedWeight <= 3000) {
            chargeCharge = transporter[3000];
        }
    }

    return chargeCharge;
}

function distance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // distance in km
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}


/*
Additional KM Logic : If more than one delivery is available then distance from first delivery to last delivery.
*/
function getAdditionalKM(shipmentStages) {
    let totalKm = 0;
    let deliveryStages = shipmentStages.filter(st => st.tripPoint?.status === 'Delivery')
    if (deliveryStages.length > 1) {
        for (let i = 0; i + 1 < deliveryStages.length; i++) {
            const stage1 = deliveryStages[i];
            const stage2 = deliveryStages[i + 1];
            const { latitude: lat1, longitude: lon1 } = stage1?.place?.center ?? stage1?.hub?.center;
            const { latitude: lat2, longitude: lon2 } = stage2?.place?.center ?? stage2?.hub?.center;
            totalKm += Number(distance(lat1, lon1, lat2, lon2))
        }
    }
    return totalKm;
}


//Helping functions
async function getShById(shId) {
    let url = `${BASE_URL}/shipment/v1/admin/shipment/${shId}`;
    let res = await rp({
        uri: url,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        json: true,
    });
    if (res.data) {
        return res.data
    }
    else {
        return null
    }
}

async function getCnsForSh(shId) {
    let url = `${BASE_URL}/shipment/v1/shipment/${shId}/consignments`;
    let res = await rp({
        uri: url,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        json: true,
    });
    if (res.data) {
        return res.data
    }
    else {
        return []
    }
}

async function getPriceTable(shId, shipment, consignmentIds) {
    if (!shipment.fleetInfo) {
        shipment.fleetInfo = {}
    }
    shipment.fleetInfo.broker = shipment.fleetInfo?.broker ?? shipment.fleetInfo?.forwardingAgent ?? shipment.fleetInfo?.fleetOwner
    shipment.fleetInfo.fleetOwner = shipment.fleetInfo.broker

    let externalId = shipment.fleetInfo?.broker?.externalId
    console.log("Ext Id : " + externalId)
    if (externalId != null) {
        try {
            let tableId = 'e5046b10-f966-4221-b85f-0e98f385e709'
            let url = `http://apis.fretron.com/freight-pricing/v1/condition/shipment?freightId=${tableId}&shipmentId=${shId}&cnIds=${consignmentIds.join(',')}`
            console.log(url)
            let response = await rp({
                'uri': url,
                method: "POST",
                body: shipment,
                'headers': { 'Authorization': token, 'Content-Type': 'application/json' },
                json: true
            })
            if (response.status == 200) {
                return response.data
            }

        } catch (error) {
            console.error(`Exception while getting price table, error: ${error.message}`)
        }
    }
    return []
}

async function getShCostListForSh(shId) {
    let path = `${BASE_URL}/shipment-cost/v1/costs?shipmentId=${shId}`;
    try {
        let res = await rp({
            method: "GET",
            uri: path,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });
        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.log(`Error while getting shipment cost list : ${e.message}`);
        throw e

    }
    return [];
}

async function updateShipmentFreightCost(costObj, shId, charge) {
    let payload = {
        chargeSetting: charge,
        shipmentCost: costObj,
    };
    let path = `${BASE_URL}/shipment-cost/v1/cost?shipmentId=${shId}`;
    try {
        let res = await rp({
            method: "POST",
            uri: path,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: payload,
        });
        console.log(`update freightCost charge ${payload.chargeSetting.chargeId}res ${res.status} :  error ${res.error}`)
        if (res.status === 200) {
            return res;
        } else {
            return null;
        }
    } catch (e) {
        console.log(`Error while updating shipment cost : ${e.message}`);
        return null;
    }
}




async function autoFillCharge(shId, chargeSetting) {
    try {
        let url = `${BASE_URL}/shipment-cost/v1/auto-fill/cost-detail?shipmentId=${shId}`;
        let res = await rp({
            'uri': url,
            'method': 'POST',
            'headers': {
                "Content-Type": "application/json",
                "Authorization": token
            },
            'body': chargeSetting,
            'json': true
        })
        if (res.status == 200) {
            return res.data;
        } else {
            console.log(`error in autofill charge: ${JSON.stringify(res)}`)
        }
    } catch (e) {
        console.log(`error in autofill charge ` + e)
    }
    return null;
}

async function main(shId, chargeTypes) {
    try {
        let shipmentInfo = await getShById(shId);
        let consignments = await getCnsForSh(shId)
        console.log(`execute for sh ${shipmentInfo.shipmentNumber} : ${shId}`)
        let res = await calculateCost(shipmentInfo, consignments, chargeTypes);
        return { "status": 200, "data": { "message": "success" }, "error": null };
    } catch (e) {
        console.log(e);
        return "Something went wrong";
    }
}










