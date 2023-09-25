
const rp = require("request-promise")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"
const EXTRA_PER_KM_CHARGE = "Extra Per Km"
const PER_KM = "Per Km"
const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODQzMjQxMDIsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiMDZhY2FjN2YtNTY5Ny00ZmVmLTlhNjEtZWVmNDdmNzUzNjdhIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.5CmmBhAWnIcC-lvguHujB9B-apn0ISn2J4OmcdwfBv8"


// let shId = $event.query.shipmentId
let shId = "9b9561f0-d258-48dd-9086-d8f7cceea5cb"


async function getShipmentById(shId) {
    let url = `https://apis.fretron.com/shipment/v1/admin/shipment/${shId}?skipCn=true`;
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

async function saveShipmentCost(shipmentCost, chargeSetting, shipmentId) {
    let url = `https://apis.fretron.com/shipment-cost/v1/cost?shipmentId=${shipmentId}`
    try {
        let res = await rp({
            method: "POST",
            uri: url,
            body: {
                "shipmentCost": shipmentCost,
                "chargeSetting": chargeSetting
            },
            headers: {
                Authorization: TOKEN
            },
            json: true
        });
        console.log(`Save shipment cost api res status : ${res.status}`)
        if (res.status == 200) {
            return res.data
        } else {
            console.log(`Save shipment cost api res error : ${res.error}`)
        }
    } catch (e) {
        console.log(`Catched error in saving shipment cost : ${e.message}`)
    }
    return []
}

async function autoFillCostDetail(chargeSetting, shipmentId) {
    let url = `https://apis.fretron.com/shipment-cost/v1/auto-fill/cost-detail?shipmentId=${shipmentId}`
    try {
        let res = await rp({
            method: "POST",
            uri: url,
            body: chargeSetting,
            headers: {
                Authorization: TOKEN
            },
            json: true
        })
        console.log(`AutoFill shipment cost detail api res status : ${res.status}`)
        if (res.status == 200) {
            return res.data
        } else {
            console.log(`AutoFill shipment cost detail api res error : ${res.error}`)
        }
    } catch (e) {
        console.log(`Catched error in autoFilling shCost details : ${e.message}`)
    }
    return null
}

async function getRouteByKeyValue(key, value) {
    let url = `https://apis.fretron.com/routes/v1/route?key=${key}&value=${value}`
    try {
        let res = await rp({
            method: "GET",
            uri: url,
            headers: {
                Authorization: TOKEN
            },
            json: true
        });
        console.log(`Get route by ${key} ${value} api res status : ${res.status}`)
        if (res.status == 200) {
            return res.data
        } else {
            console.log(`Get route by ${key} ${value} api res  : ${res.error}`)
        }
    } catch (e) {
        console.log(`Catched error in getting route by ${key} ${value} : ${e.message}`)
    }
    return null
}

async function saveShCostOnShComplete(sh, extraKms, extraPerKmRate, tollAmount, totalKmRun, perKmRate) {
    try {
        let vendor = sh?.fleetInfo?.broker ?? sh?.fleetInfo?.fleetOwner ?? sh?.fleetInfo?.forwardingAgent
        let shId = sh.uuid
        console.log(`Vendor for save ShCost on sh ${sh.shipmentNumber} : ${vendor?.name}`)
        let res = null
        if (tollAmount) {
            let chargeSettingForTollCharge = {
                "amount": null,
                "rateValueRuleId": null,
                "isCalculated": false,
                "baseValueRuleId": null,
                "rateUnit": "Fixed",
                "amountValueRuleId": null,
                "vendorFeedingType": "User",
                "baseValueFeedingType": null,
                "distributionBasis": "Weight",
                "amountFeedingType": "User",
                "rate": null,
                "chargeId": "203ac307-772d-4cb4-8144-a562ffe8d195",
                "vendor": null,
                "applicability": "Shipment",
                "chargeName": "Toll",
                "rateFeedingType": "User",
                "base": null,
                "vendorRuleId": null
            }
            let tollCharge = {
                amount: tollAmount,
                amountByVendor: null,
                rate: null,
                chartsOfAccount: null,
                name: "Toll",
                rateUnit: "Fixed",
                uuid: "203ac307-772d-4cb4-8144-a562ffe8d195",
                base: null,
            }
            let shCostForTollCharge = await autoFillCostDetail(chargeSettingForTollCharge, sh.uuid)
            if (shCostForTollCharge) {
                shCostForTollCharge.vendor = vendor
                shCostForTollCharge.charge = tollCharge
                shCostForTollCharge.amount = tollAmount
                res = await saveShipmentCost(shCostForTollCharge, chargeSettingForTollCharge, sh.uuid)
            }
        }

        if (extraKms && extraPerKmRate) {
            let chargeSettingForExtraPerKmCharge = {
                "amount": null,
                "rateValueRuleId": null,
                "isCalculated": true,
                "baseValueRuleId": null,
                "rateUnit": "perKM",
                "amountValueRuleId": null,
                "vendorFeedingType": "User",
                "baseValueFeedingType": "User",
                "distributionBasis": "Weight",
                "amountFeedingType": "User",
                "rate": null,
                "chargeId": "ccae083b-5ef3-46c1-ac13-31e8290cd375",
                "vendor": null,
                "applicability": "Shipment",
                "chargeName": "Extra per Km",
                "rateFeedingType": "User",
                "base": null,
                "vendorRuleId": null
            }
            let extraPerKmCharge = {
                amount: null,
                amountByVendor: null,
                rate: extraPerKmRate,
                chartsOfAccount: null,
                name: "Extra per Km",
                rateUnit: "perKM",
                uuid: "ccae083b-5ef3-46c1-ac13-31e8290cd375",
                base: extraKms,
            }
            let shCostForExtraPerKmCharge = await autoFillCostDetail(chargeSettingForExtraPerKmCharge, sh.uuid)
            if (shCostForExtraPerKmCharge) {
                shCostForExtraPerKmCharge.vendor = vendor
                shCostForExtraPerKmCharge.charge = extraPerKmCharge
                shCostForExtraPerKmCharge.amount = parseFloat((extraKms * extraPerKmRate).toFixed(2))
                res = await saveShipmentCost(shCostForExtraPerKmCharge, chargeSettingForExtraPerKmCharge, sh.uuid)
            }
        } else {
            await ensureExtraKm(EXTRA_PER_KM_CHARGE, shId)
        }
        if (totalKmRun && perKmRate) {
            let chargeSettingForPerKmCharge = {
                "amount": null,
                "rateValueRuleId": null,
                "isCalculated": true,
                "baseValueRuleId": null,
                "rateUnit": "perKM",
                "amountValueRuleId": null,
                "vendorFeedingType": "User",
                "baseValueFeedingType": "User",
                "distributionBasis": "Weight",
                "amountFeedingType": "User",
                "rate": null,
                "chargeId": "753c245b-af16-4a88-9181-eb91c4b54eea",
                "vendor": null,
                "applicability": "Shipment",
                "chargeName": "Per Km",
                "rateFeedingType": "User",
                "base": null,
                "vendorRuleId": null
            }
            let perKmCharge = {
                amount: null,
                amountByVendor: null,
                rate: perKmRate,
                chartsOfAccount: null,
                name: "Per Km",
                rateUnit: "perKM",
                uuid: "753c245b-af16-4a88-9181-eb91c4b54eea",
                base: totalKmRun,
            }
            let shCostForPerKmCharge = await autoFillCostDetail(chargeSettingForPerKmCharge, sh.uuid)
            if (shCostForPerKmCharge && perKmRate && totalKmRun) {
                shCostForPerKmCharge.vendor = vendor
                shCostForPerKmCharge.charge = perKmCharge
                shCostForPerKmCharge.amount = parseFloat((perKmRate * totalKmRun).toFixed(2))
                res = await saveShipmentCost(shCostForPerKmCharge, chargeSettingForPerKmCharge, sh.uuid)
            }
        } else {
            await ensureExtraKm(PER_KM, shId)
        }
        return res ? "DONE" : "NOT-DONE"
    } catch (e) {
        console.log(`Catched error in saving Shipment cost on sh Complete : ${e.message}`)
    }
    return "NOT-DONE"
}

async function getChargeForShipment(freightId, shipment, cnId = null) {
    let url = `https://apis.fretron.com/freight-pricing/v1/condition/shipment?freightId=${freightId}&shipmentId=${shipment.uuid}`
    if (cnId) { url += `&cnIds=${cnId}` }
    try {
        let res = await rp({
            method: "POST",
            uri: url,
            headers: {
                Authorization: TOKEN
            },
            body: shipment,
            json: true
        });
        console.log(`Get fixed and perKm charge for sh ${shipment.shipmentNumber} res status : ${res.status}`)
        if (res.status == 200) {
            return res.data
        } else {
            console.log(`Get fixed and perKm charge for sh ${shipment.shipmentNumber} res error : ${res.error}`)
        }
    } catch (e) {
        console.log(`Catched error in getting fixed and perKm charge for sh ${shipment.shipmentNumber} : ${e.message}`)
    }
    return []
}

async function getFixedAndPerKmCharge(sh) {
    let freightId = "72121e2b-f68e-4816-b4a8-37c70dee4e7e"
    let charges = await getChargeForShipment(freightId, sh)
    let chargesMap = charges.reduce((acc, cv) => { acc[cv.name] = cv; return acc }, {})
    return {
        allowedKmsLimit: chargesMap["KM Limit"]?.amount,
        fixedAmount: chargesMap["Commercial"]?.amount,
        extraPerKmRate: chargesMap["Extra per Km"]?.rate,
        perKmRate: chargesMap["Per Km"]?.rate,
        extraVanAmount: chargesMap["Extra Van"]?.amount
    }
}

async function getFleetInfoByRnNumber(vehicleRegistrationNumber) {
    let url = `https://apis.fretron.com/partner-fleet/v2/fleet/byVehicleRn?vehicleRegistrationNumber=${vehicleRegistrationNumber}`
    try {
        let res = await rp({
            method: "GET",
            uri: url,
            headers: {
                Authorization: TOKEN
            },
            json: true
        });
        console.log(`Get fleetInfo by RnNum res status: ${res.status}`)
        if (res.status == 200) {
            return res.data
        } else {
            console.log(`Get fleetInfo by RnNum res error : ${res.error}`)
        }
    } catch (e) {
        console.log(`Catched error in getting fleetInfo by RnNum : ${e.message}`)
    }
    return null
}


async function getShcostById(shId) {
    try {

        let res = await rp({
            uri: `https://apis.fretron.com/shipment-cost/v1/costs?shipmentId=${shId}`,
            method: "GET",
            json: true,
            headers: {
                Authorization: TOKEN
            }
        })
        if (res?.status == 200) {
            return res.data
        }
        else {
            console.log(`shipment cost not found : ${res.error}`)
        }
    }
    catch (e) {
        console.log(`error getting shCost for shipment ${shId} ${e.message}`)
    }
    return null
}

async function deleteShCost(costId, shId) {
    try {
        let url = `https://apis.fretron.com/shipment-cost/v1/cost/${costId}?shipmentId=${shId}`
        let res = await rp({
            uri: url,
            method: "DELETE",
            json: true,
            headers: {
                Authorization: TOKEN
            }
        })
        console.log(`shCost deleted  status ${res.status}`)
        if (res?.status == 200) {
            return res
        }

    }
    catch (e) {
        console.log(`error in deleting shCost ${e.message}`)
    }
    return null

}

async function ensureExtraKm(chargeType, shId) {
    let shCosts = await getShcostById(shId)
    let findchargeType = shCosts?.find(v => v?.charge?.name == chargeType)
    let shcostId = findchargeType?.uuid
    if (findchargeType) {
        await deleteShCost(shcostId, shId)
    }
    else {
        console.log(`charge type not found  ${chargeType}`)
    }
}


async function main(shId) {
    try {
        let tollAmount = 0
        let sh = await getShipmentById(shId)
        if (!sh) throw new Error(`Shipment not found with shId : ${shId} `)
        let vehicleNum = sh?.fleetInfo?.vehicle?.vehicleRegistrationNumber
        vehicleNum = vehicleNum?.toUpperCase().replace(/\s/g, "").trim()
        let masterPartnerFleet = await getFleetInfoByRnNumber(vehicleNum)
        if (masterPartnerFleet?.vehicle) { sh.fleetInfo.vehicle = masterPartnerFleet.vehicle }
        let extraKms = parseFloat((sh?.customFields ?? []).find(({ fieldKey }) => fieldKey == "Extra Kms")?.value ?? "0.0")
        let totalKmRun = parseFloat((sh?.customFields ?? []).find(({ fieldKey }) => fieldKey == "TotalKmRun")?.value ?? "0.0")
        if (sh.routeId) {
            let route = await getRouteByKeyValue("_id", sh.routeId)
            tollAmount = (route?.tollDetails ?? []).reduce((acc, cv) => acc + (cv.costs ?? []).find(({ type }) => type == "LCV")?.value ?? 0.0, 0.0)
        }
        let { extraPerKmRate, perKmRate } = await getFixedAndPerKmCharge(sh)
        let kmRunForBill = parseFloat((sh?.customFields ?? []).find(({ fieldKey }) => fieldKey == "KmRun For Bill")?.value ?? "0.0")
        if ((kmRunForBill == 0.0) && totalKmRun == extraKms) {
            /*
                This case is for market vehicle not moving in its store category therefore
                PerKm Charge is applicable in it with Rate = extraPerKmRate and base = extraKms 
            */
            perKmRate = extraPerKmRate
            totalKmRun = extraKms
            extraKms = 0.0
            extraPerKmRate = 0.0
        }
        if (!extraPerKmRate && !perKmRate) {
            console.log(`Some error in getting extraPerKm / perKm rate on sh ${sh.shipmentNumber} ,so not adding any cost need to reprocess it`)
            return "NOT-DONE"
        }
        return await saveShCostOnShComplete(sh, extraKms, extraPerKmRate, tollAmount, totalKmRun, perKmRate)
    } catch (e) {
        console.log(`Catched error: ${e.message} `)
    }
    return "NOT-DONE"
}

// return await main(shId)

main(shId)

// async function test() {
//     let id = "7f5a7652-7d97-4f93-95be-89e10d1b45db"
//     let res = await getShcostById(id)
//     console.log(res)
//     deleteShCost("579a1675-c11d-4206-afcf-49fa6436ef07")
// }
// test()