const rp = require("request-promise")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"

const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODUxMDQ1NjIsInVzZXJJZCI6ImJvdHVzZXItLTIwYzEwNzBiLWMwNzQtNDcxYS05NzA4LWU1MmZhZmEwNTdhZCIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTIwYzEwNzBiLWMwNzQtNDcxYS05NzA4LWU1MmZhZmEwNTdhZCIsIm9yZ0lkIjoiM2U0Y2RlZTktMGIzYi00NmRkLTliOTgtZGYwZTM4YTAyNzFjIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.Y3Lg4tmDXELG920JoEvAwUQQNva9H2fPvPbw5iXvfYY"
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
    let url = `${FRT_PUB_BASE_URL}/shipment-view/shipments/v1?filters=${JSON.stringify(filter)}&size=500&allFields=${encodeURIComponent(JSON.stringify(allFields))}`
    try {
        let res = await rp({
            method: "GET",
            uri: url,
            headers: {
                authorization: TOKEN
            },
            json: true
        })
        return res?.length ? res : []
    } catch (e) {
        console.log(`Catched error in getting shs by filter : ${e.message}`)
    }
    return []
}

function getFromCf(cfs, key) {
    return cfs?.find(item => item.fieldKey === key);
}

async function getShWithCn(shId) {
    let url = `${FRT_PUB_BASE_URL}/shipment/v1/shipment/${shId}?skipCn=false`
    try {
        let res = await rp({
            uri: url,
            method: "GET",
            headers: {
                authorization: TOKEN
            },
            json: true
        })
        if (res?.status == 200) {
            return res.data
        } else {
            console.log(`Error in  getting sh with cn ${shId} : ${res.error}`)
        }
    } catch (e) {
        console.log(`Catched error executing while fetching shipment ${shId} :  ${e.message}`)
    }
    return null
}


async function bulkSync(payload) {
    let url = `${FRT_PUB_BASE_URL}/shipment/v1/shipment/bulk/sync`
    try {
        let res = await rp({
            uri: url,
            method: "POST",
            body: payload,
            headers: {
                authorization: TOKEN
            },
            json: true
        })
        console.log(`Bulk Sync api res status for sh ${payload.shipmentId} : ${res.status}`);
        if (res.status === 200) {
            return res.data
        } else {
            console.log(`Bulk Sync api res error for sh ${payload.shipmentId} : ${res.error}`);
        }
    } catch (e) {
        console.log(`Catched error in bulkSync api for sh ${payload.shipmentId} : ${e.message}`);
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
    await bulkSync(payload)
}

async function forwardEmail(subject, to, cc, html) {
    try {
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
    } catch (e) {
        return `Some error in sending mail : ${e.message}`;
    }
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
    let mailRes = await forwardEmail(
        subject,
        ["sagar.soni@fretron.com", "shivam.kumar@fretron.com"],
        ["pooja.bishu@fretron.com"],
        html
    );
    console.log(mailRes);
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
        "shipmentStages.status"
    ];
    let shs = await getShipmentByFilter(filter, allFields)
    console.log(`Total shipment EFD and IsfinalizationDone NO  ->${shs.length}`)
    if (shs?.length) {
        let filteredData = []
        for (let sh of shs) {
            let originStatus = sh?.shipmentStages?.[0]?.status
            let firstStageStatus = sh?.shipmentStages?.[1]?.status
            if (originStatus == "COMPLETED" && firstStageStatus == "UPCOMING") {
                filteredData.push({
                    shId: sh.uuid,
                    shNo: sh.shipmentNumber
                })
            }
        }
        console.log(`filteredData length ${filteredData.length}`)
        if (filteredData?.length) {
            for (let item of filteredData) {
                console.log(`shipmentNo  ${item.shNo}`)
                let shId = item.shId
                let shMaster = await getShWithCn(shId)
                let cfs = shMaster?.customFields ?? []
                let shInvoiceNos = getFromCf(cfs, "Invoice No's")?.value?.split(",") ?? []
                if (!shInvoiceNos.length) {
                    // send mail to shivam, pooja, sagar soni
                    console.log(`invoice No's customfield not found in shipment ${shMaster.shipmentNumber}`)
                    await mailForNoInvoiceCf(shMaster)
                    continue;
                }
                let cnNos = shMaster?.consignments?.map(cn => cn.consignmentNo) ?? []
                console.log(`shInvoice Cf ${shInvoiceNos} ConsignmentNos ${cnNos} For shipment ${shMaster.shipmentNumber}`)

                let matchAllInvoiceNos = shInvoiceNos.every(element => cnNos.includes(element)) && cnNos.every(element => shInvoiceNos.includes(element));
                if (matchAllInvoiceNos) {
                    console.log(`shipment already finalized ${shMaster.shipmentNumber}`)
                    await ensure_isFinalization_Done(shMaster)
                    continue;
                } else {
                    console.log(`not finalize case *******************************`)
                    let shFinalizeRes = await finalizeShipment(shId)
                    if (shFinalizeRes?.status == 200) {
                        shMaster = await getShWithCn(shId)
                        cnNos = shMaster?.consignments?.map(cn => cn.consignmentNo)
                        matchAllInvoiceNos = shInvoiceNos.every(element => cnNos.includes(element)) && cnNos.every(element => shInvoiceNos.includes(element));
                        if (matchAllInvoiceNos) {
                            console.log(`Shipment finalized successfully for shipment ${shMaster.shipmentNumber}`)
                            await ensure_isFinalization_Done(shMaster)
                            continue;
                        } else {
                            console.log(`Finalization Fail for shipment ${shMaster.shipmentNumber}`)
                        }
                    } else {
                        console.log(`Error in shipment ${shMaster.shipmentNumber} finalization  ${shFinalizeRes}`)
                    }
                }
            }
        }
        else {
            console.log(`filtered shipment not found `)
        }
    } else {
        console.log(`No shipments Found for Enroute For Delivery and finalization Done No`)
    }
}



main()