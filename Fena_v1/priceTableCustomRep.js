const moment = require("moment")
const _ = require("lodash")
const fs = require("fs");
const rp = require("request-promise")
const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTM4ODkxNjAsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiM2U0Y2RlZTktMGIzYi00NmRkLTliOTgtZGYwZTM4YTAyNzFjIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.KT0MjKMZNiY5ca5GcbIJ31Vcqsc_v_ZgZkDxqpBJ4zg"

let uniqueChargeTypes = new Set()

function sortSet(set) {
    [...set].sort((a, b) => {
        const numA = parseInt(a.split("MT")[0]);
        const numB = parseInt(b.split("MT")[0]);

        return numA - numB;
    });
}
async function getConditionRecords(limit, offset) {
    let pricetableId = "4c39b2b6-bf9f-46f8-8488-7d2fbc7e3769"
    let res = await rp({
        url: `https://apis.fretron.com/freight-pricing/v1/price/conditions?limit=${limit}&offset=${offset}&freightId=${pricetableId}`,
        method: "GET",
        json: true,
        headers: {
            authorization: TOKEN
        }
    })
    if (res.status == 200) {
        return res.data
    } else {
        return null
    }
}



async function main() {
    let limit = 100
    let offset = 0
    let response = await getConditionRecords(limit, offset)
    let records = response

    while (response.length) {
        offset += 1
        response = await getConditionRecords(limit, offset);
        records = [...records, ...response];
    }

    console.log(`total records --->${records.length}`)
    let json = {}
    let anyChargeTypes = new Set()
    for (let record of records) {
        let from = ""
        let till = ""
        let consignerExtId = ""
        let origin = ""
        let destination = ""
        let chargeType = ""
        from = record?.fixedRanges?.find((v) => v.min)?.min
        from = from ? moment(from).format("DD-MM-YYYY") : null
        till = record?.fixedRanges?.find((v) => v.max)?.max
        till = till ? moment(till).format("DD-MM-YYYY") : null
        consignerExtId = record.conditionValues?.find((v) => v.fieldPath == "Consignor Ext Id")?.value[0]
        origin = record.conditionValues?.find((v) => v.fieldPath == "originHub")?.value[0]
        destination = record.conditionValues?.find((v) => v.fieldPath == "destinationHub")?.value[0]
        chargeType = record.conditionValues?.find((v) => v.fieldPath == "_cf_fixed_ApprovedWeight")?.value[0]
        chargeType = (!["NOT_EXIST"].includes(chargeType)) ? chargeType?.split("MT")[0] + "MT" : chargeType
        let approvedFreight_1 = record?.chargeTypes?.find((v) => v.name == "Approved Freight_1")?.amount ?? 0
        let distance = record?.chargeTypes?.find((v) => v.name == "distance(KM)")?.amount ?? 0
        if (!["NOT_EXIST"].includes(chargeType)) {
            uniqueChargeTypes.add(chargeType)
        } else {
            anyChargeTypes.add(chargeType)
        }
        // console.log(uniqueChargeTypes)
        if (from && till && consignerExtId && origin && origin && destination) {
            if (!json[`${from}_${till}_${consignerExtId}_${origin}_${destination}`]) {
                json[`${from}_${till}_${consignerExtId}_${origin}_${destination}`] = {
                    [chargeType]: approvedFreight_1,
                    "Distance (Km)": distance
                }
            }
            else if (json[`${from}_${till}_${consignerExtId}_${origin}_${destination}`]["distance"]) {
                json[`${from}_${till}_${consignerExtId}_${origin}_${destination}`][chargeType] = approvedFreight_1
            }
            else {
                json[`${from}_${till}_${consignerExtId}_${origin}_${destination}`][chargeType] = approvedFreight_1
                json[`${from}_${till}_${consignerExtId}_${origin}_${destination}`]["distance"] = distance
            }
        }
    }
    console.log(json)
    console.log(uniqueChargeTypes)
    uniqueChargeTypes = [...uniqueChargeTypes]
    let sortedArray = _.sortBy(uniqueChargeTypes)
    console.log(sortedArray)
    sortedArray.push(...anyChargeTypes)
    let arrayOfObject = []
    for (key in json) {
        let from = key.split("_")[0]
        let till = key.split("_")[1]
        let consignorExtId = key.split("_")[2]
        let origin = key.split("_")[3]
        let destination = key.split("_")[4]
        let remainingData = json[key]
        console.log(remainingData)
        let obj = {
            From: from,
            Till: till,
            "Consignor Ext Id": consignorExtId,
            originHub: origin,
            Destination: destination,
            ...remainingData,
        }
        sortedArray.forEach((e) => {
            if (!obj[e]) {
                obj[e] = ""
            }
        })
        arrayOfObject.push(obj)
    }
    console.log(arrayOfObject)
}

main()


