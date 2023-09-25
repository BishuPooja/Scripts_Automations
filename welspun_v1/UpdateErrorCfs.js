const rp = require("request-promise")
const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTI1OTMzMTYsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiI0OTViODcyOC1jNzYxLTRmYTctODNmZS1kYjc1YTdkNjMyMjEiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.BH3u2WYj5qCb2R_mColdg_RLiimU5xh_Vzgd4i2vQak"
const FRT_PUB_BASE_URL = "https://apis.fretron.com"


async function getShsByFilter(filter) {
    try {
        let url = `${FRT_PUB_BASE_URL}/shipment-view/shipments/v1?filters=${encodeURIComponent(JSON.stringify(filter))}&size=500`
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
        console.log(`Caught Error ${e.message}`)
    }
    return []
}

async function bulkSyncApi(payload) {
    try {
        let res = await rp({
            url: `${FRT_PUB_BASE_URL}/shipment/v1/shipment/bulk/sync`,
            method: "POST",
            body: payload,
            headers: {
                Authorization: TOKEN,
            },
            json: true
        })
        if (res.status == 200) {
            console.log(`BulkSync Api Status ${res?.status}`)
            return res.data
        }
        else {
            console.log(`BulkSync Api Error ${res?.error}`)
            return null
        }
    } catch (e) {
        console.log(`Caught Error In BulkSync Api ${e.message}`);
        return null
    }
}
async function getInErrorApi(payload) {
    try {
        let url = `http://122.180.251.100:8088/welspun/amazin/retry/mg3GateIn`
        let res = await rp({
            uri: url,
            method: "POST",
            body: payload,
            json: true,
            headers: {
                aurhorization: TOKEN
            }
        })
        return res
    } catch (e) {
        console.log(`Caught Gate In Error ${e.message}`)
    }
    return null
}


function getFromCf(cf, key) {
    return cf.find((v) => v.fieldKey == key)?.value
}

function getcfPayload(fieldKey, value) {
    return {
        "fieldKey": fieldKey,
        "multiple": false,
        "description": "",
        "remark": "",
        "required": false,
        "accessType": null,
        "input": "",
        "unit": "",
        "valueType": "string",
        "options": [
            "Yes",
            "No"
        ],
        "fieldType": "yes-no",
        "value": value,
        "isRemark": false
    }
}



async function main() {
    try {
        let filters = { "_shcf_Error In Amazin Events": ["Yes"], "__version": 2 }
        let shs = await getShsByFilter(filters)
        console.log(shs)
        for (let sh of shs) {
            let updatedCfs = []
            let shId = sh.uuid

            let shNo = sh?.shipmentNumber
            let gateInTime = sh?.shipmentStages ? sh?.shipmentStages[sh?.shipmentStages?.length - 1]?.arrivalTime : null
            if (!gateInTime) {
                console.log(`${shNo} Gate In Time Not Present `)
            }
            console.log(`Executing For ${shNo}`)
            let cfs = sh?.customFields ?? []
            let amazinError = getFromCf(cfs, "Error In Amazin Events")
            if (amazinError == "Yes" && gateInTime) {
                // call Gate In Error Api
                let payload = {
                    "shipmentId": shId,
                    "gateInTime": gateInTime
                }
                // let amazinErrorRes = await getInErrorApi()
                let amazinErrorRes = { data: "Success" }
                if (amazinErrorRes?.data == "Success") {
                    updatedCfs.push(getcfPayload("Error In Amazin Events", ""))
                } else {
                    updatedCfs.push(getcfPayload("Error In Amazin Events", amazinErrorRes.error))
                }
            }

            let cfUpdatePayload = {
                "shipmentId": shId,
                "updates": [{
                    "keyToUpdate": "customfields",
                    "updatedValue": updatedCfs
                }]
            }
            await bulkSyncApi(cfUpdatePayload)
        }
    } catch (e) {
        console.log(`Error Main ${e.message}`)
    }
}
main()


// async function main() {
//     try {
//         let filters = { "_shcf_Error In Amazin Events": ["Yes"], "__version": 2 }
//         let shs = await getShsByFilter(filters)
//         for (let sh of shs) {
//             let updatedCfs = []
//             let shId = sh.uuid

//             let shNo = sh?.shipmentNumber
//             console.log(`Executing For ${shNo}`)
//             let cfs = sh?.customFields ?? []
//             let amazinError = getFromCf(cfs, "Gate In Error")
//             if (amazinError) {
//                 // call Gate In Error Api
//                 let amazinErrorRes = await getInErrorApi()
//                 if (amazinErrorRes?.data == "Success") {
//                     updatedCfs.push(getcfPayload("Gate In Error", "Text", " "))
//                 } else {
//                     updatedCfs.push(getcfPayload("Gate In Error", "Text", amazinErrorRes.error))
//                 }
//             }

//             let gateOutError = getFromCf(cfs, "Gate Out Error")
//             if (gateOutError) {
//                 // call Gate OUt Error Api
//                 let gateOutErrorRes = await gateOutErrorApi()
//                 if (gateOutErrorRes?.data == "Success") {
//                     updatedCfs.push(getcfPayload("Gate Out Error", "Text", " "))

//                 } else {
//                     updatedCfs.push(getcfPayload("Gate Out Error", "Text", gateOutErrorRes.error))

//                 }
//             }
//             let grossWeightError = getFromCf(cfs, "Gross Weight Error")
//             if (grossWeightError) {
//                 // call Gross Weight Error api
//                 let grossWeightErrorRes = await grossWeightErrorApi()
//                 if (grossWeightErrorRes) {
//                     updatedCfs.push(getcfPayload("Gross Weight Error", "Text", " "))
//                 } else {
//                     updatedCfs.push(getcfPayload("Gross Weight Error", "Text", grossWeightErrorRes.error))
//                 }
//             }
//             let tareWeightError = getFromCf(cfs, "Tare Weight Error")
//             if (tareWeightError) {
//                 // call Tare Weight Error Api
//                 let tareWeightErrorRes = await tareWeightErrorApi()
//                 if (tareWeightErrorRes?.data == "success") {
//                     updatedCfs.push("Tare Weight Error", " ")
//                 } else {
//                     updatedCfs.push("Tare Weight Error", tareWeightErrorRes?.error)
//                 }
//             }
//             let cfUpdatePayload = {
//                 "shipmentId": shId,
//                 "updates": [{
//                     "keyToUpdate": "customfields",
//                     "updatedValue": updatedCfs
//                 }]
//             }
//             console.log(cfUpdatePayload)
//         }
//     } catch (e) {
//         console.log(`Error Main ${e.message}`)
//     }
// }

// main()

// async function grossWeightErrorApi(payload) {
//     try {
//         let url = ``
//         let res = await rp({
//             uri: url,
//             method: "POST",
//             body: payload,
//             json: true,
//             headers: {
//                 aurhorization: TOKEN
//             }
//         })
//         return res
//     } catch (e) {
//         console.log(`Caught Gross Weight Error ${e.message}`)
//     }
// }
// async function tareWeightErrorApi(payload) {

//     try {
//         let url = ``
//         let res = await rp({
//             uri: url,
//             method: "POST",
//             body: payload,
//             json: true,
//             headers: {
//                 aurhorization: TOKEN
//             }
//         })
//         return res
//     } catch (e) {
//         console.log(`Caught TareWeight Error ${e.message}`)
//     }
// }
// async function gateOutErrorApi(payload) {
//     try {
//         let url = ``
//         let res = await rp({
//             uri: url,
//             method: "POST",
//             body: payload,
//             json: true,
//             headers: {
//                 aurhorization: TOKEN
//             }
//         })
//         return res
//     } catch (e) {
//         console.log(`Caught Gate Out Error ${e.message}`)
//     }
// }