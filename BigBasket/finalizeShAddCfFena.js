const rp = require("request-promise")

const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODUxMDQ1NjIsInVzZXJJZCI6ImJvdHVzZXItLTIwYzEwNzBiLWMwNzQtNDcxYS05NzA4LWU1MmZhZmEwNTdhZCIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTIwYzEwNzBiLWMwNzQtNDcxYS05NzA4LWU1MmZhZmEwNTdhZCIsIm9yZ0lkIjoiM2U0Y2RlZTktMGIzYi00NmRkLTliOTgtZGYwZTM4YTAyNzFjIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.Y3Lg4tmDXELG920JoEvAwUQQNva9H2fPvPbw5iXvfYY"


const FRT_PUB_BASE_URL = "https://apis.fretron.com"
const IS_FINALIZATION_DONE = "IsFinalization Done"

async function finalizeShipment(shId) {
    let url = `http://35.192.123.13:8084/fena/on-finalize`
    try {
        let res = await rp({
            method: "POST",
            uri: url,
            body: {
                "shipmentId": shId
            },
            json: true
        })
        console.log(`Finalize sh res : ${JSON.stringify(res)}`)
        if (res) {
            return res
        }
    } catch (e) {
        console.log(`Catched error in finalizing sh : ${e.message}`)
    }
    return null
}



async function getShipmentByFilter(filter, allFields) {
    try {

        let url = `https://apis.fretron.com/shipment-view/shipments/v1?filters=${JSON.stringify(filter)}&size=500&allFields=${encodeURIComponent(JSON.stringify(allFields))}`
        let res = await rp({
            uri: url,
            json: true,
            method: "GET",
            headers: {
                authorization: TOKEN
            }
        })
        return res?.length ? res : []
    }
    catch (e) {
        console.log(`getShEFD_finalizationNo catch error : ${e.message}`)
    }
    return []

}

function getFromCf(cfs, key) {
    const found = cfs?.find(item => item.fieldKey === key);
    return found ?? null;
}

async function getShWithCn(shId) {
    try {

        let res = await rp({
            url: `https://apis.fretron.com/shipment/v1/shipment/${shId}?skipCn=false`,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }

        })
        if (res?.status == 200) {
            return res.data
        }
    } catch (e) {
        console.log(`error executing while fetching shipment ${e.message}`)
    }
    return null
}


async function bulkSync(cfPayload) {
    try {
        let res = await rp({
            url: "https://apis.fretron.com/shipment/v1/shipment/bulk/sync",
            json: true,
            method: "POST",
            body: cfPayload,
            headers: {
                authorization: TOKEN
            }
        })

        if (res.status === 200) {
            console.log(`Added cf On shipment : ${res.status}`);
            return res;
        } else {
            console.log(`Error while adding CF on shipment : ${res.error}`);
        }
    } catch (e) {
        console.log("bulkSync catch error: " + e.message);
    }
    return null;
}

async function ensure_isFinalization_Done(shMaster) {
    let shId = shMaster.uuid
    let cfs = shMaster?.customFields ?? []
    let isFinalization_Done = null
    let isFinalizationCustomField = null
    isFinalization_Done = getFromCf(cfs, IS_FINALIZATION_DONE)
    if (isFinalization_Done?.value == "Yes") {
        console.log(`isFinalization_Done already Yes in shipment ${shMaster.shipmentNumber}`)
    } else if (isFinalization_Done) {
        isFinalization_Done.value = "Yes"
        isFinalizationCustomField = isFinalization_Done
    } else {
        isFinalizationCustomField = {
            "indexedValue": [],
            "fieldKey": "IsFinalization Done",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": null,
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
            "value": "Yes",
            "isRemark": false
        }
    }

    let payload = {
        "shipmentId": shId,
        "updates": [{
            "keyToUpdate": "customfields",
            "updatedValue": [isFinalizationCustomField]
        }]
    }

    let updatedCf = await bulkSync(payload)
    console.log(`Is finalization Done Cf Added Status ${updatedCf?.status}`)
}

async function forwardEmail(subject, to, cc, html) {
    console.log("Sending email with SUB: " + subject);
    await rp({
        uri: `${FRT_PUB_BASE_URL}/notifications/emails/email`,
        method: "POST",
        body: {
            cc: cc,
            to: to,
            subject: subject,
            html: html,
        },
        timeout: 2000,
        json: true,
    });
    return "Mail Sent";
}

async function mailForNoInvoiceCf(shMaster) {
    let vehicleNo = shMaster?.fleetInfo?.vehicle?.vehicleRegistrationNumber
    let shipmentNo = shMaster?.shipmentNumber
    let html = `
    <html>
    <head>
    <body>
    <p>Dear Sir</p>
    <p>Please Find Below Details</p>
    <p>shipment No :${shipmentNo ?? "N/A"}</p>
    <p>vehicle No:${vehicleNo ?? "N/A"}</p>
    </body>
    </head>
    </html>`;
    let subject = `FENA -Invoice Nos Cf Not Found shipmentNo ${shipmentNo}`
    let mailer = await forwardEmail(
        subject,
        ["sagar.soni@fretron.com", "shivam.kumar@fretron.com"],
        ["pooja.bishu@fretron.com"],
        html
    );
    console.log(mailer);
}

async function main() {
    const filter = {
        "_shcf_IsFinalization Done": ["No"],
        "_shipmentTrackingStatus_": {
            "_or": {
                "_enroute_for_delivery_": {
                    "shipmentTrackingStatus": ["Enroute For Delivery"]
                }
            }
        },
        "__version": 2
    }
    const allFields = [
        "uuid",
        "shipmentNumber",
        "shipmentStages"
    ];
    let shs = await getShipmentByFilter(filter, allFields)
    console.log(`Total shipment EFD and IsfinalizationDone NO  ->${shs.length}`)
    console.log(shs[0])
    // if (shs?.length) {
    //     let filteredData = []
    //     for (let sh of shs) {
    //         let originStatus = sh?.shipmentStages?.[0]?.status
    //         let firstStageStatus = sh?.shipmentStages?.[1]?.status
    //         if (originStatus == "COMPLETED" && firstStageStatus == "UPCOMING") {
    //             filteredData.push({
    //                 shId: sh.uuid,
    //                 shNo: sh.shipmentNumber
    //             })
    //         }
    //     }
    //     console.log(`filteredData length ${filteredData.length}`)
    //     if (filteredData?.length) {
    //         for (let item of filteredData) {
    //             console.log(`shipmentNo  ${item.shNo}`)
    //             let shId = item.shId
    //             let shMaster = await getShWithCn(shId)
    //             let cfs = shMaster?.customFields ?? []
    //             let shInvoiceNos = getFromCf(cfs, "Invoice No's")?.value?.split(",") ?? []

    //             if (!shInvoiceNos?.length) {
    //                 // send mail to shivam, pooja, sagar soni
    //                 console.log(`invoice No's customfield not found in shipment ${shMaster.shipmentNumber}`)
    //                 await mailForNoInvoiceCf(shMaster)
    //                 continue
    //             }
    //             let cnNos = shMaster?.consignments?.map(cn => cn.consignmentNo)
    //             let matchAllInvoiceNos = null
    //             if (shInvoiceNos?.length && cnNos?.length) {
    //                 matchAllInvoiceNos = shInvoiceNos.every(element => cnNos.includes(element)) &&
    //                     cnNos.every(element => shInvoiceNos.includes(element));
    //             }
    //             if (matchAllInvoiceNos) {
    //                 console.log(`shipment already finalized ${shMaster.shipmentNumber}`)
    //                 await ensure_isFinalization_Done(shMaster)
    //                 continue
    //             }
    //             else {
    //                 if (shMaster.shipmentStatus != "Created") {
    //                     // set isfinalization done to No
    //                     console.log(`shipmentStatus not created`)
    //                     let isFinalizationCustomField = {
    //                         "indexedValue": [],
    //                         "fieldKey": "IsFinalization Done",
    //                         "multiple": false,
    //                         "description": "",
    //                         "remark": "",
    //                         "uuid": null,
    //                         "required": false,
    //                         "accessType": null,
    //                         "input": "",
    //                         "unit": "",
    //                         "valueType": "string",
    //                         "options": [
    //                             "Yes",
    //                             "No"
    //                         ],
    //                         "fieldType": "yes-no",
    //                         "value": "No",
    //                         "isRemark": false
    //                     }
    //                     let payload = {
    //                         "shipmentId": shId,
    //                         "updates": [{
    //                             "keyToUpdate": "customfields",
    //                             "updatedValue": [isFinalizationCustomField]
    //                         }]
    //                     }
    //                     console.log(JSON.stringify(payload))

    //                     let updatedCf = await bulkSync(payload)
    //                     console.log(`Is finalization Done Cf Added Status ${updatedCf?.status}`)
    //                 }
    //                 console.log(`not finalize case *******************************`)
    //                 let shFinalizeRes = await finalizeShipment(shId)
    //                 if (shFinalizeRes?.status == 200) {
    //                     shMaster = await getShWithCn(shId)
    //                     cnNos = shMaster?.consignments?.map((c) => {
    //                         return c.consignmentNo
    //                     })
    //                     matchAllInvoiceNos = shInvoiceNos.every(element => cnNos.includes(element)) &&
    //                         cnNos.every(element => shInvoiceNos.includes(element));
    //                     if (matchAllInvoiceNos) {
    //                         console.log(`shipment finalized successfully for shipment ${shMaster.shipmentNumber}`)
    //                         await ensure_isFinalization_Done(shMaster)
    //                         continue
    //                     }
    //                     else {
    //                         console.log(` finalization  Fail Case - ${shMaster.shipmentNumber}`)
    //                     }
    //                 }
    //                 else {
    //                     console.log(`Error in shipment ${shMaster.shipmentNumber} finalization  ${shFinalizeRes}`)
    //                 }
    //             }
    //         }
    //     }
    //     else {
    //         console.log(`filtered shipment not found `)
    //     }
    // }
    // else {
    //     console.log(`No shipments Found for Enroute For Delivery and finalization Done No`)
    // }
}


main()