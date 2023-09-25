const rp = require("request-promise")
const _ = require("lodash")
const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODUxMDQ1NjIsInVzZXJJZCI6ImJvdHVzZXItLTIwYzEwNzBiLWMwNzQtNDcxYS05NzA4LWU1MmZhZmEwNTdhZCIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTIwYzEwNzBiLWMwNzQtNDcxYS05NzA4LWU1MmZhZmEwNTdhZCIsIm9yZ0lkIjoiM2U0Y2RlZTktMGIzYi00NmRkLTliOTgtZGYwZTM4YTAyNzFjIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.Y3Lg4tmDXELG920JoEvAwUQQNva9H2fPvPbw5iXvfYY"

const data = [{
    shNo: 'FRETSH000002333',
    shId: '2ec8ea87-0d82-4674-a485-96bff52c0644',
    invoiceNo: 7022302344
},
{
    shNo: 'FRETSH000002335',
    shId: '3ab1d15e-356b-4129-b03c-f6a29caa1827',
    invoiceNo: 7022302345
},
{
    shNo: 'FRETSH000002337',
    shId: '6ce46e80-c9cb-4ff3-b7fb-e661226d5183',
    invoiceNo: 7022302351
},
{
    shNo: 'FRETSH000002402',
    shId: '6105b8bb-bcbc-4202-8980-d9e0a887a7b8',
    invoiceNo: 7022302364
},
{
    shNo: 'FRETSH000001437',
    shId: '27f17807-15d1-44b6-8215-6034cb3e2637',
    invoiceNo: 7022368216
},
{
    shNo: 'FRETSH000002555',
    shId: '0eeaf1fe-701d-4881-b2e1-1acdbc7ff0a7',
    invoiceNo: 7022368307
},
{
    shNo: 'FRETSH000003011',
    shId: 'ec0f1f5f-38cf-444e-bdea-6a5fc9f6e602',
    invoiceNo: 7052308213
},
{
    shNo: 'FRETSH000002347',
    shId: 'd730acb3-106e-4560-8e59-9d2761749062',
    invoiceNo: 7052358224
},
{
    shNo: 'FRETSH000002517',
    shId: '9212d9a3-ab87-4a22-9b75-fe7a4b3b1184',
    invoiceNo: 7052358231
},
{
    shNo: 'FRETSH000003054',
    shId: '0a3d993e-64b7-421f-9fa5-88a57024048a',
    invoiceNo: 7622308001
},
{
    shNo: 'FRETSH000003053',
    shId: 'a2324f1c-2112-4908-8ae1-1c9ca7058a89',
    invoiceNo: 7622308001
},
{
    shNo: 'FRETSH000000520',
    shId: '4cb1ee73-2c3d-4415-bad8-775c76e882ab',
    invoiceNo: '7022301209,7022300000'
},
{
    shNo: 'FRETSH000002798',
    shId: '0979ddc3-1995-49fb-80e7-f1d0cdc0ed19',
    invoiceNo: ''
},
{
    shNo: 'FRETSH000003007',
    shId: 'ae877085-a3a3-4967-a26b-f8a896c271b5',
    invoiceNo: '7022302595'
}]
async function getSh(uuid) {
    try {

        let url = `https://apis.fretron.com/shipment/v1/shipment/${uuid}`
        let res = await rp({
            uri: url,
            json: true,
            method: "GET",
            headers: {
                authorization: TOKEN
            }
        })
        return res?.status == 200 ? res.data : null
    }
    catch (e) {
        console.log(`get Shipment catch error : ${e.message}`)
    }
    return null
}

async function getCnMaster(cnId) {
    try {
        let url = `https://apis.fretron.com/shipment/v1/consignment/${cnId}/shipments`

        let res = await rp({
            uri: url,
            json: true,
            method: "GET",
            headers: {
                authorization: TOKEN
            }
        })
        return res?.status == 200 ? res.data : null
    }
    catch (e) {
        console.log(`get Shipment catch error : ${e.message}`)
    }
    return null
}
async function getCnByExternalId(extId) {
    try {

        let url = `https://apis.fretron.com/shipment-view/consignments/enriched?search=${extId}`
        let res = await rp({
            uri: url,
            json: true,
            method: "GET",
            headers: {
                authorization: TOKEN
            }
        })
        return res?.find((v) => v.consignment.externalId == extId)
    }
    catch (e) {
        console.log(`get Shipment catch error : ${e.message}`)
    }
    return null
}

async function getOrderMaster(orderId) {
    try {
        console.log(`Get Order API `)
        let url = `https://apis.fretron.com/order-manager-v2/sales-orders/v1/order/${orderId}`
        // console.log(url)

        let res = await rp({
            uri: url,
            json: true,
            method: "GET",
            headers: {
                authorization: TOKEN
            }
        })
        return res?.status == 200 ? res.data : null
    }
    catch (e) {
        console.log(`get Shipment catch error : ${e.message}`)
    }
    return null
}
function getFromCf(cfs, key) {
    return cfs?.find(item => item.fieldKey === key) ?? "";
}

async function putCn(payload) {
    try {
        let url = `https://apis.fretron.com/consignment/v1/admin/consignment`
        let res = await rp({
            uri: url,
            json: true,
            method: "PUT",
            body: payload,
            headers: {
                authorization: TOKEN
            }
        })
        console.log(`Put api res status ${res.status}`)
        if (res.status != 200) {
            console.log(`Put api error ${res.error}`)
        }
        return res
    } catch (e) {
        console.log(`Error in put Api ${e.message}`)
    }
}

async function finalizeShipment(shId) {
    let url = `http://34.93.148.238:8084/fena/on-finalize`
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
async function main() {
    try {
        let invoiceNos = []
        for (let item of data) {
            let shId = item.shId
            let invoiceNo = `${item.invoiceNo}`
            invoiceNo = invoiceNo?.split(',')
            let shMaster = await getSh(shId)
            let cfs = shMaster?.customFields ?? []
            let invoiceNofromCf = `${getFromCf(cfs, "Invoice No's")?.value ?? ""}`
            invoiceNofromCf = invoiceNofromCf?.split(",")
            // console.log(invoiceNofromCf)
            let matchInvoiceNos = invoiceNo?.every(element => invoiceNofromCf?.includes(element)) && invoiceNofromCf?.every(element => invoiceNo?.includes(element));
            if (matchInvoiceNos) {
                // console.log("invoiceNo match")
                invoiceNos.push(invoiceNo)
            }
            else {
                console.log(invoiceNo, "  invoiceNo not match")
            }
        }

        invoiceNos = invoiceNos?.flat(Infinity)
        invoiceNos = invoiceNos ? _.uniq(invoiceNos) : []
        console.log(invoiceNos)
        let orderMasterMap = {}

        if (invoiceNos?.length) {
            for (let invoiceNo of invoiceNos) {
                let corruptedData = [];
                let flag = false
                let cn = await getCnByExternalId(invoiceNo)
                let cnId = cn?.consignment?.uuid
                let cnMasterRes = await getCnMaster(cnId)
                let orderMappings = cnMasterRes?.consignment?.orderMappings ?? []
                let lineItems = cnMasterRes?.consignment?.lineItems ?? [];
                orderMappings?.forEach((v) => {
                    if (!v.lineItemId) {
                        console.log(`corruptedData case found for ${invoiceNo}`)
                        corruptedData.push({
                            consignmentLineItemId: v.consignmentLineItemId,
                            orderId: v.orderId,
                            externalId: null,
                            orderLineItemId: null
                        });
                    }
                });

                if (corruptedData?.length) {
                    flag = true
                    console.log(corruptedData.length)
                    for (let i = 0; i < corruptedData.length; i++) {
                        let corruptedItem = corruptedData[i]
                        let lineItemWithMatchingId = lineItems.find(
                            (item) => item.uuid === corruptedItem.consignmentLineItemId
                        );
                        if (lineItemWithMatchingId) {
                            corruptedData[i].externalId = lineItemWithMatchingId.externalId
                        }
                    }

                    for (let i = 0; i < corruptedData.length; i++) {
                        let item = corruptedData[i]
                        let orderId = item.orderId
                        let orderMasterRes = null
                        if (orderMasterMap?.[orderId]) {
                            orderMasterRes = orderMasterMap[orderId]
                        } else {
                            orderMasterRes = await getOrderMaster(orderId)
                            orderMasterMap[orderId] = orderMasterRes
                        }
                        orderMasterRes?.lineItems.map((v) => {
                            if (v.externalId == item.externalId) {
                                corruptedData[i].orderLineItemId = v.uuid
                            }
                        })
                    }
                    let updatedArray = orderMappings.map(value => {
                        let matchingvalue = corruptedData.find(item => item.consignmentLineItemId === value.consignmentLineItemId);
                        if (matchingvalue && value.lineItemId === null) {
                            value.lineItemId = matchingvalue.orderLineItemId;
                        }
                        return value;
                    });
                    // console.log(`updatedArray ${updatedArray.length}`)
                    if (cnMasterRes?.consignment?.orderMappings && updatedArray?.length) {
                        cnMasterRes.consignment.orderMappings = updatedArray;

                    }
                    if (cnMasterRes?.consignment && flag) {
                        console.log(`cnPUT api call ${invoiceNo}`)
                        // console.log(JSON.stringify(cnMasterRes?.consignment))
                        let payload = cnMasterRes?.consignment
                        await putCn(payload)
                        let shId = data.find((v) => v.invoiceNo == invoiceNo)
                        shId = shId?.shId
                        console.log(shId)
                        // await finalizeShipment(shId)
                        // break
                    }
                } else {
                    console.log(`All Ok ${invoiceNo}`)
                }
            }

        } else {
            console.log(`NO invoice found`)
        }

    } catch (e) {
        console.log(`Error in Main  : ${e.message}`)
    }
}

try {

    main()
}
catch (e) {
    console.log(`Error in calling main ${e.message}}`)
}