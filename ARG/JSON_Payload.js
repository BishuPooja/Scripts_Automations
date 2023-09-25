const rp = require("request-promise")
const _ = require("lodash")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"
const FONUMBER = "LR Number"
const TRACKINGLINK = ""

const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTA0NDMyNzMsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiIzZTRjZGVlOS0wYjNiLTQ2ZGQtOWI5OC1kZjBlMzhhMDI3MWMiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.FIEbnnSqkdRk0OD7L2huCypBAEVhuU4nmLIxuSQGAyE"



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
        let filters = { "__version": 2, "_shipmentTrackingStatus_": { "_or": { "_enroute_for_delivery_": { "shipmentTrackingStatus": ["Enroute For Delivery"] } } } }
        let url = `${FRT_PUB_BASE_URL}/shipment-view/shipments/v1?filters=${encodeURIComponent(JSON.stringify(filters))}&size=40`
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


async function getCnTrackLink(dataList, cnId) {
    let cnLink = ""
    for (let data of dataList) {
        cnLink = data?.trackingLink
        if (cnLink) {
            break
        }
    }
    if (cnLink) {
        return cnLink
    } else {
        cnLink = await getConsignmentTrackingLink(cnId)
        return cnLink
    }
}


async function makeJson(sh) {
    try {
        let finalJson = []
        let jsonArr = []
        let vehicleNo = sh?.fleetInfo?.vehicle?.vehicleRegistrationNumber ?? ""
        let cnIds = sh?.consignments ?? []
        if (cnIds?.length) {
            for (let cnId of cnIds) {
                let json = {
                    "vehicleNumber": "",
                    "customerCode": "",
                    "foNumber": "",
                    "trackingLink": "",
                    "cnId": ""
                }
                let consignment = await getCn(cnId.uuid)
                consignment = consignment?.consignment
                let externalId = consignment?.consignee?.externalId ?? null
                let cfs = consignment?.customFields ?? []
                let foNumber = getFromCf(cfs, FONUMBER)
                let cnTrackingLink = getFromCf(cfs, TRACKINGLINK)

                json["vehicleNumber"] = vehicleNo
                json["customerCode"] = externalId
                json["foNumber"] = foNumber
                json["cnId"] = cnId.uuid
                if (cnTrackingLink) {
                    json["trackingLink"] = cnTrackingLink
                }
                jsonArr.push(json)
            }
            let groupedData = _.groupBy(jsonArr, "customerCode")
            for (let extId in groupedData) {
                let cnId = groupedData[extId][0].cnId
                let consignmentTrackingLink = await getCnTrackLink(groupedData[extId], cnId)
                for (let value of groupedData[extId]) {
                    value.trackingLink = consignmentTrackingLink
                    delete value["cnId"]
                    finalJson.push(value)
                }
            }
        }
        return finalJson ?? []

    } catch (e) {
        console.log(`Error in MakeJson ${e.message}`)
    }
}


async function main() {
    try {
        let finalJson = []
        let shs = await getShs()
        console.log("shipments ", shs?.length)
        if (shs?.length) {
            for (let sh of shs) {
                let json = await makeJson(sh)
                finalJson.push(json)
            }
            finalJson = _.flatMap(finalJson)
            console.log(finalJson)
        }
    } catch (e) {
        console.log(`error in   main ${e.message}`)
    }
}

main()


