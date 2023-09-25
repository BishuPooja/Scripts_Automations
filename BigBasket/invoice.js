const rp = require("request-promise")

const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Nzg2ODQyNjcsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiI1YzllNzEwZC1kM2NkLTQ3NjktYmY4Yy04OGJlNGMxNjk1ZDkiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.xWSxnaxCj-fXjVV0qtjzoseCBvw-OsARREFkVhOTxXk"

const invoice = {
    "approvalDate": 1674039670560,
    "creationTime": 1674039670643,
    "documents": [],
    "customFields": [],
    "billFeedingType": "PerConsignment",
    "updates": {
        "traceID": "f8cc5f9a-66f4-48fa-a2c4-88a5dfa28c94",
        "resourceId": "5783e6d9-610b-4929-af89-20926f69876f",
        "updatedBy": "USER",
        "changes": [],
        "sourceOfInformation": null,
        "description": "created Invoice",
        "forwardReasons": [
            "invoice.created"
        ],
        "userId": "c84f50e8-432b-4f54-884f-78626ba18e25",
        "uuid": "89da7ce3-b75a-4a82-b13f-c8f80e3d0b36",
        "revision": 0,
        "time": 1674039670560,
        "forwardedFrom": null,
        "resourceType": "Invoice",
        "updateType": "CREATED"
    },
    "uuid": "5783e6d9-610b-4929-af89-20926f69876f",
    "orgId": "5c9e710d-d3cd-4769-bf8c-88be4c1695d9",
    "lineItems": [
        {
            "revenueDocs": [
                {
                    "amount": 45000,
                    "charge": {
                        "amount": 45000,
                        "amountByVendor": null,
                        "rate": null,
                        "chartsOfAccount": null,
                        "name": "Freight",
                        "rateUnit": "perMT",
                        "uuid": "a2346331-afc2-4111-b34e-6c73579cf829",
                        "base": null
                    },
                    "billItemId": null,
                    "billFeedingType": null,
                    "updates": null,
                    "uuid": "1f471131-f9ca-4ee4-adb3-1a1b59872924",
                    "orgId": "5c9e710d-d3cd-4769-bf8c-88be4c1695d9",
                    "lineItems": [
                        {
                            "amount": 45000,
                            "charge": {
                                "amount": 45000,
                                "amountByVendor": null,
                                "rate": 1500,
                                "chartsOfAccount": null,
                                "name": "Freight",
                                "rateUnit": "perMT",
                                "uuid": "a2346331-afc2-4111-b34e-6c73579cf829",
                                "base": 30
                            },
                            "billId": null,
                            "billItemId": null,
                            "consignmentId": "6390b600-5512-46b9-a34e-9ed9758e6dc2",
                            "billStatus": null
                        }
                    ],
                    "distributionBasis": null,
                    "shipmentId": "8762f93f-c945-4ad7-80dc-84cf9ff18dcf",
                    "billId": null,
                    "billStatus": null,
                    "applicability": "Consignment",
                    "customer": {
                        "gstn": null,
                        "name": "UTTAM VALUE STEELS LTD",
                        "externalId": null,
                        "type": "customer",
                        "uuid": "73260452-5b58-4275-bea4-b63ea7c422eb",
                        "group": {
                            "name": "Consignor",
                            "partnerType": null,
                            "uuid": null,
                            "orgId": null
                        }
                    }
                }
            ],
            "amount": 45000,
            "gstInfo": [
                {
                    "isExempted": false,
                    "amount": 2700,
                    "type": "SGST",
                    "percent": 6,
                    "payableAmount": 2700,
                    "isPayable": true
                },
                {
                    "isExempted": false,
                    "amount": 2700,
                    "type": "CGST",
                    "percent": 6,
                    "payableAmount": 2700,
                    "isPayable": true
                }
            ],
            "hsnOrSacCode": "996791",
            "exemptedReason": null,
            "customFields": [],
            "uuid": "2e99f2a2-1397-427c-9e2f-afe3ff029d37",
            "remarks": null
        }
    ],
    "accountStatus": "OPEN",
    "isOverDue": null,
    "supplier": {
        "address": null,
        "state": "Maharashtra"
    },
    "billTo": {
        "address": null,
        "state": "Maharashtra"
    },
    "invoiceNumber": "10000000003",
    "overDueAt": 1676718045000,
    "onHoldReason": null,
    "amount": 45000,
    "totalPaid": null,
    "billDate": 1674039642000,
    "billingStatus": "BILLED",
    "chargeMechanism": "FCM",
    "gstInfo": [
        {
            "isExempted": false,
            "amount": 2700,
            "type": "SGST",
            "percent": null,
            "payableAmount": 2700,
            "isPayable": true
        },
        {
            "isExempted": false,
            "amount": 2700,
            "type": "CGST",
            "percent": null,
            "payableAmount": 2700,
            "isPayable": true
        }
    ],
    "totalPayable": 50400,
    "ticketId": null,
    "remarks": null,
    "status": "CREATED",
    "customer": {
        "gstn": "27AAACL6670Q1ZU",
        "name": "UTTAM VALUE STEELS LTD",
        "externalId": null,
        "type": "customer",
        "uuid": "73260452-5b58-4275-bea4-b63ea7c422eb",
        "group": {
            "name": "Consignor",
            "partnerType": "customer",
            "uuid": "d3c37001-c20b-4395-bb03-9287188355cc",
            "orgId": "5c9e710d-d3cd-4769-bf8c-88be4c1695d9"
        }
    }
}

async function getContract(contractId) {
    let res = await rp({
        url: "https://apis.fretron.com/order-manager-v2/contracts/v1/contract/" + contractId,
        json: true,
        method: "GET",
        headers: {
            authorization: token
        }
    })
    return res.data

}

async function getorder(orderId) {
    let res = await rp({
        url: "https://apis.fretron.com/order-manager-v2/sales-orders/v1/order/" + orderId,
        method: "GET",
        json: true,
        headers: {
            authorization: token
        }
    })
    return res.data
}

async function getConsignmentMaster(uuid) {
    let res = await rp({
        url: "https://apis.fretron.com/shipment/v1/consignment/" + uuid + "/shipments",
        json: true,
        method: "GET",
        headers: {
            authorization: token
        }
    })
    return res.data
}

async function updateInvoiceDueAt(invoiceId, payload) {
    let res = await rp({
        url: `https://apis.fretron.com/shipment-cost/v1/customer/invoice/overDueAt?uuid=${invoiceId}`,
        json: true,
        body: payload,
        method: "PUT",
        headers: {
            authorization: token
        }
    })
    return res
}



async function main(invoice) {
    try {
        console.log(invoice.invoiceNumber, "invoiceNo");
        let invoiceLineitems = (invoice?.lineItems?.length) ? invoice.lineItems[0] : null
        if (!invoiceLineitems) {
            throw new Error(`Invoice ${invoice.uuid} lineItems not present`)
        }

        let revenueDoc = (invoiceLineitems?.revenueDocs?.length) ? invoiceLineitems.revenueDocs[0] : null
        let revenueDocLineitems = (revenueDoc?.lineItems?.length) ? revenueDoc.lineItems[0] : null
        if (!revenueDocLineitems) {
            throw new Error(`revenueDoc lineItems not present for Invoice ${invoice.uuid} `)
        }

        let cnId = revenueDocLineitems ? revenueDocLineitems.consignmentId : null
        if (!cnId) {
            throw new Error(`consignment Id not found for Invoice ${invoice.uuid}`)
        }

        let cnMasterRes = await getConsignmentMaster(cnId)
        let orderId = (cnMasterRes?.consignment?.orderMappings?.length) ? cnMasterRes.consignment.orderMappings[0].orderId : null
        if (!orderId) {
            throw new Error(`orderId not found for consignmentId ${cnId}`)
        }

        let orderMasterRes = await getorder(orderId)
        let contractId = orderMasterRes?.contractUuid ?? null
        if (!contractId) {
            throw new Error(`contract id not found for orderId ${orderId}`)
        }
        let contractMasterRes = await getContract(contractId)
        let duration = (contractMasterRes?.paymentRules?.whenClaimApplicable?.duration) ?? 0

        if (!duration) {
            throw new Error(`duration not found for contractId ${contractId}`)
        }

        duration = duration * 24 * 60 * 60 * 1000
        let overDueAt = invoice.creationTime + duration
        let invoiceId = invoice.uuid
        let payload = {
            "overDueAt": overDueAt
        }
        console.log(duration);
        console.log(payload);
        // let updatedOverDueAt = await updateInvoiceDueAt(invoiceId, payload)
        // console.log(updatedOverDueAt);


        return payload
    } catch (error) {
        console.log(`error ${error}`)
        return 0
    }

}

// main(invoice)
main(invoice).then(res => {
    console.log(`res ${res}`)
})
    .catch(err => {
        console.log(`Some error ${err}`)
    })


let doc = [
    {
        "amount": 45000,
        "charge": {
            "amount": 45000,
            "amountByVendor": null,
            "rate": null,
            "chartsOfAccount": null,
            "name": "Freight",
            "rateUnit": "perMT",
            "uuid": "a2346331-afc2-4111-b34e-6c73579cf829",
            "base": null
        },
        "billItemId": null,
        "billFeedingType": null,
        "updates": null,
        "uuid": "1f471131-f9ca-4ee4-adb3-1a1b59872924",
        "orgId": "5c9e710d-d3cd-4769-bf8c-88be4c1695d9",
        "lineItems": [
            {
                "amount": 45000,
                "charge": {
                    "amount": 45000,
                    "amountByVendor": null,
                    "rate": 1500,
                    "chartsOfAccount": null,
                    "name": "Freight",
                    "rateUnit": "perMT",
                    "uuid": "a2346331-afc2-4111-b34e-6c73579cf829",
                    "base": 30
                },
                "billId": null,
                "billItemId": null,
                "consignmentId": "6390b600-5512-46b9-a34e-9ed9758e6dc2",
                "billStatus": null
            }
        ],
        "distributionBasis": null,
        "shipmentId": "8762f93f-c945-4ad7-80dc-84cf9ff18dcf",
        "billId": null,
        "billStatus": null,
        "applicability": "Consignment",
        "customer": {
            "gstn": null,
            "name": "UTTAM VALUE STEELS LTD",
            "externalId": null,
            "type": "customer",
            "uuid": "73260452-5b58-4275-bea4-b63ea7c422eb",
            "group": {
                "name": "Consignor",
                "partnerType": null,
                "uuid": null,
                "orgId": null
            }
        }
    }
]