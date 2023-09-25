const rp = require("request-promise")
const _ = require("lodash")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"
const FONUMBER = "LR Number"
const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTAyNzc5MjMsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiM2U0Y2RlZTktMGIzYi00NmRkLTliOTgtZGYwZTM4YTAyNzFjIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.624ca-_4_r2VFIUbYg8gH57dA4ZzahepYBREyRv3Xkk"



async function getCn(uuid) {
    try {
        const url = `${FRT_PUB_BASE_URL}/shipment/v1/consignment/${uuid}/shipments`;
        const options = {
            uri: url,
            method: "GET",
            headers: {
                Authorization: TOKEN,
            },
            json: true,
        };

        const res = await rp(options);

        if (res?.status === 200) {
            return res.data;
        } else {
            console.log(`Error in getCn: ${res.error}`);
        }
    } catch (e) {
        console.log(`getCn catch error: ${e.message}`);
    }

    return null;
}

async function getShs() {
    try {
        let url = `https://apis.fretron.com/shipment-view/shipments/v1?filters=%7B%22_shipmentTrackingStatus_%22%3A%7B%22_or%22%3A%7B%22_enroute_for_delivery_%22%3A%7B%22shipmentTrackingStatus%22%3A%5B%22Enroute%20For%20Delivery%22%5D%7D%7D%7D%2C%22__version%22%3A2%7D`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })

        return res?.length ? res : []
    } catch (e) {
        console.log(`error in getting shs ${e.message}`)
    }
}

async function getConsignmentTrackingLink(cnId) {
    var payload = {
        "consignmentId": cnId,
        "uiRestrictions": {
            "cnInfo": {
                "consignmentNo": true,
                "vehicleInfo": true,
                "materialInfo": true,
                "consignor": true,
                "consignee": true,
                "origin": true,
                "destination": true,
                "customer": true,
                "valuOfGoods": false,
                "currentStatus": true,
                "currentAddress": true
            },
            "epod": {
                "upload": true,
                "timing": true,
                "feeding": true,
                "otpToDriver": true,
                "unloadingStart": false,
                "unloadingEnd": true,
                "reportingTime": true,
                "vehicleReleaseTime": false,
                "unloadingCharge": true,
                "isMandateTiming": true,
                "isMandateFeeding": true,
                "markManually": true,
                "otpToConsignee": false
            },
            "map": true,
            "liveTracking": true,
            "updateTracking": true,
            "miscFields": false,
            "customFields": []
        }
    };
    var res = await rp({
        method: "POST",
        uri: `${FRT_PUB_BASE_URL}/sharing-utils/v1/share-cn`,
        body: payload,
        json: true,
        headers: { "Authorization": "Beaer " + TOKEN, "Content-Type": "application/json" }
    });
    if (res.data != null) {
        return "https://alpha.fretron.com/trip-share/vehicleLocation/consignment?code=" + res.data
    } else {
        console.log("Issue while fetching the consignment tracking link: " + res.error)
        return ""
    }
}

function getFromCf(cfs, key) {
    return cfs?.find((v) => v.fieldKey == key)?.value ?? null
}

async function main() {
    try {
        let jsonArr = []
        let shs = await getShs()
        if (shs?.length) {
            for (let sh of shs) {
                let json = {
                    "vehicleNumber": "",
                    "customerCode": "",
                    "foNumber": "",
                    "trackingLink": ""
                }
                let vehicleNo = sh?.fleetInfo?.vehicle?.vehicleRegistrationNumber ?? ""
                let cnIds = sh?.consignments ?? []
                // console.log(cnIds)
                let consigneeExtIds = []
                if (cnIds?.length) {
                    for (let cnId of cnIds) {
                        let consignment = await getCn(cnId.uuid)
                        consignment = consignment?.consignment
                        let externalId = consignment?.consignee?.externalId ?? null
                        let cnTrackingLink = await getConsignmentTrackingLink(consignment?.uuid)
                        let cnNumber = consignment?.consignmentNo
                        let cfs = consignment?.customFields ?? []
                        let foNumber = getFromCf(cfs, FONUMBER)
                        consigneeExtIds.push({
                            externalId: externalId,
                            cnNo: cnNumber,
                            cnId: cnId.uuid
                        })
                        json["vehicleNumber"] = vehicleNo
                        json["customerCode"] = externalId
                        json["foNumber"] = foNumber
                        break
                    }
                    let groupedByextId = _.groupBy(consigneeExtIds, "externalId")
                    console.log(groupedByextId)
                    json["trackingLink"] = cnTrackingLink
                    console.log(groupedByextId)
                    // jsonArr.push(json)
                }
            }
            console.log(jsonArr)
        }
    } catch (e) {
        console.log(`error in   main ${e.message}`)
    }
}

main()