const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODM4MDkyMDAsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiODIzOTQ3YTMtMDJjMC00ZTY1LThmNGUtMjFkYTM3MGVhNmNkIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.DT9AMo7T-D53qvPFHc3mEFlQDm-4PcGlwTY-2FFZGIA"
const rp = require("request-promise")
const $event = {
    "resourceId": "9f9d42a4-cc37-4e7b-96f4-9e8bcbc4d987",
    "attachments": null,
    "customeFields": null,
    "customFields": [
        {
            "indexedValue": [
                "Bill_Number_VB0000001"
            ],
            "fieldKey": "Bill_Number",
            "multiple": true,
            "description": "Bill Number",
            "remark": "",
            "uuid": "Bill_Number",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": "VB0000001",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Billing_Format_CONSIGNMENT_WISE_BILLING"
            ],
            "fieldKey": "Billing_Format",
            "multiple": true,
            "description": "Billing Format",
            "remark": "",
            "uuid": "Billing_Format",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": "CONSIGNMENT_WISE_BILLING",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Billing_Method_BILL_WITH_DETAILS"
            ],
            "fieldKey": "Billing_Method",
            "multiple": true,
            "description": "Billing Method",
            "remark": "",
            "uuid": "Billing_Method",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": "BILL_WITH_DETAILS",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Billing_Date_20220402"
            ],
            "fieldKey": "Billing_Date",
            "multiple": true,
            "description": "Billing Date",
            "remark": "",
            "uuid": "Billing_Date",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": "20220402",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Vendor_RV TRANSPORT, VISAKHAPATNAM"
            ],
            "fieldKey": "Vendor",
            "multiple": true,
            "description": "Vendor Name",
            "remark": "",
            "uuid": "Vendor",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": "RV TRANSPORT, VISAKHAPATNAM",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Bill_Amount_1111815.0"
            ],
            "fieldKey": "Bill_Amount",
            "multiple": true,
            "description": "Bill Amount",
            "remark": "",
            "uuid": "Bill_Amount",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": "1111815.0",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Bill_Difference_YES"
            ],
            "fieldKey": "Bill_Difference",
            "multiple": false,
            "description": "Bill_diff",
            "remark": "",
            "uuid": "Bill_Difference",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "yes-no",
            "value": "YES",
            "isRemark": false
        }
    ],
    "resolutionDate": 1648898601715,
    "source": "SYSTEM",
    "updates": {
        "traceID": "89d6f579-efa2-4fb7-82fc-d4ae6fdd1cc6",
        "resourceId": "d20bca76-c024-482d-9bb7-f436196d0d4b",
        "updatedBy": "USER",
        "sourceOfInformation": null,
        "description": "marked issue Resolved",
        "forwardReasons": [
            "issue.status.updated"
        ],
        "userId": "60a0968a-cd4d-4f33-8e97-18dc065e7477",
        "uuid": "5b49ff13-2bde-4ee9-8d18-690e8978d138",
        "revision": 0,
        "time": 1648898601778,
        "forwardedFrom": null,
        "resourceType": "Issue",
        "updateType": null
    },
    "issueNo": "FRET0000001",
    "uuid": "d20bca76-c024-482d-9bb7-f436196d0d4b",
    "branch": null,
    "orgId": "823947a3-02c0-4e65-8f4e-21da370ea6cd",
    "createdAt": 1648898442594,
    "issueTypeId": null,
    "escalationPerson": null,
    "userWatchers": null,
    "descriptionHTML": " <!DOCTYPE html>\n<html>\n<body>\n\n<table style=\"width:20%\">\n  <tr>\n    <th>ShipmentNo</th>\n    <th>Amount</th> \n    <th>ActualAmount</th>\n    <th>Difference</th>\n    <th>Remarks</th>\n  </tr>\n  [<tr>\n   <td>3cd5b0c3-e904-4807-a9a7-038c4063c6b0</td>\n    <td>1111815.0</td>\n    <td>1150000.0</td>\n    <td>38185.0</td>\n    <td>[25000- Detetion]</td>\n  </tr>\n] </table>\n\n</body>\n</html>\n",
    "filterTags": null,
    "escalationDueDate": null,
    "updatedAt": 1648898601778,
    "holdOnTime": null,
    "dueDateExtensions": null,
    "issueSummery": "Vendor Bill Approval Ticket",
    "creator": null,
    "resolutionDuration": null,
    "updatedBy": null,
    "comments": [
        {
            "commentHTML": null,
            "likedBy": null,
            "edited": null,
            "by": "60a0968a-cd4d-4f33-8e97-18dc065e7477",
            "mentions": [],
            "comment": "32 MT truck was used\n\n",
            "time": 1648898565102,
            "source": "Web",
            "uuid": "9e69b118-5908-4279-afa7-3d96e9b873b1"
        }
    ],
    "onHoldDueTo": null,
    "showIn": null,
    "reporter": {
        "address": null,
        "profileThumbnailString": null,
        "mobileNumber": "9872847482",
        "authToken": null,
        "updates": null,
        "uuid": "60a0968a-cd4d-4f33-8e97-18dc065e7477",
        "mergedUserIds": null,
        "isGod": null,
        "profileDocumentId": null,
        "otpEnabled": null,
        "onBoardingType": null,
        "alternateEmails": [],
        "name": "Ram ",
        "tokens": null,
        "alternateMobileNumbers": [],
        "email": "ram.parkash@fretron.com"
    },
    "priority": "LOW",
    "escalationLevel": null,
    "parentId": null,
    "tags": null,
    "issueType": "Minimum Guarantee Approval",
    "dueAt": 14400000,
    "estimatedResolutionDate": null,
    "bpartnerFollowers": null,
    "resourceIdentifier": null,
    "escalationName": null,
    "secondaryStatus": "Approved",
    "bpartnerWatchers": null,
    "assignee": {
        "address": null,
        "profileThumbnailString": null,
        "mobileNumber": "9050042789",
        "authToken": null,
        "updates": null,
        "uuid": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
        "mergedUserIds": null,
        "isGod": null,
        "profileDocumentId": null,
        "otpEnabled": null,
        "onBoardingType": null,
        "alternateEmails": [],
        "name": "MONU KHAN",
        "tokens": null,
        "alternateMobileNumbers": [],
        "email": "monu.khan@m.fretron.com"
    },
    "category": "Approval",
    "subIssues": null,
    "userFollowers": [
        {
            "address": null,
            "profileThumbnailString": null,
            "mobileNumber": "9050042789",
            "authToken": null,
            "updates": null,
            "uuid": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
            "mergedUserIds": null,
            "isGod": null,
            "profileDocumentId": null,
            "otpEnabled": null,
            "onBoardingType": null,
            "alternateEmails": [],
            "name": "MONU KHAN",
            "tokens": null,
            "alternateMobileNumbers": [],
            "email": "monu.khan@m.fretron.com"
        },
        {
            "address": null,
            "profileThumbnailString": null,
            "mobileNumber": "9872847482",
            "authToken": null,
            "updates": null,
            "uuid": "60a0968a-cd4d-4f33-8e97-18dc065e7477",
            "mergedUserIds": null,
            "isGod": null,
            "profileDocumentId": null,
            "otpEnabled": null,
            "onBoardingType": null,
            "alternateEmails": [],
            "name": "Ram ",
            "tokens": null,
            "alternateMobileNumbers": [],
            "email": "ram.parkash@fretron.com"
        }
    ],
    "issueDescription": "Bill Approval Request Received from Vendor RV TRANSPORT, VISAKHAPATNAM",
    "resourceType": "VendorBill",
    "status": "Resolved"
}

async function main(issue) {
    if (issue.issueType == "Minimum Guarantee Approval") {
        console.log("Issue Number " + issue.issueNo)
        let shId = issue.resourceId
        let sh = await getShipmentById(shId, false)
        if (sh) {
            console.log(sh.shipmentNumber)
            let cns = sh.consignments ?? []
            let customer = getFromCf(sh.customFields, "Customer Name")
            if (!customer) {
                customer = cns.length > 0 && cns[0].consignee ? cns[0].consignee.name : "N/A"
            }

            let destination = getFromCf(sh.customFields, "Customer City")
            if (!destination) {
                let lastStage = sh.shipmentStages[sh.shipmentStages.length - 1]
                destination = lastStage?.place?.name ?? lastStage?.hub?.name ?? lastStage.stageName ?? "N/A"
            }
            let cnsNetWeightQuantity = cns.reduce((total, cn) => total + cn?.loadInfo?.standardMeasurement?.weight?.netQuantity ?? 0.0, 0.0);

            let transporter = sh.fleetInfo?.broker?.name ?? sh.fleetInfo.fleetOwner?.name ?? "N/A"

            let sapWtQty = getFromCf(sh.customFields, "SAP Total Weight")
            let quantity = getFromCf(sh.customFields, "Quantity")
            let loadedQty = cns.length > 0 ? cnsNetWeightQuantity : (sapWtQty ?? quantity ?? 0.0)

            let cfs = []
            cfs.push(createCfAddIfNotNull("Load QTY", loadedQty, "text"))
            cfs.push(createCfAddIfNotNull("Consingnment QTY", cnsNetWeightQuantity, "text"))
            cfs.push(createCfAddIfNotNull("Customer", customer, "text"))
            cfs.push(createCfAddIfNotNull("Destination", destination, "text"))
            cfs.push(createCfAddIfNotNull("Transporter", transporter, "text"))

            try {
                let shCfs = sh.customFields ?? []
                let vehicleNo = sh?.fleetInfo?.vehicle?.vehicleRegistrationNumber ?? "N/A"
                const keys = shCfs.reduce((result, obj) => {
                    if (obj.fieldKey.includes("Net Wt Order")) {
                        result.push(obj.fieldKey);
                    }
                    return result;
                }, []);

                let orderNos = ""
                if (keys && keys.length) {
                    for (let element of keys) {
                        let getNumbers = element.split("Net Wt Order")
                        console.log(getNumbers)
                        let orderNo = getNumbers[1].split(":")[0]
                        if (orderNos) {
                            orderNos += ","
                        }
                        orderNos += orderNo

                    }
                    orderNos = [...new Set(orderNos.split(',').map(value => value.trim()))].join(', ');
                    orderNos = orderNos ?? "N/A"
                }
                let doNumber = getFromCf(shCfs, "Do Numbers")
                doNumber = doNumber ?? "N/A"
                console.log(`doNumber ${doNumber}`)
                cfs.push(createCfAddIfNotNull("Vehicle No", vehicleNo, "text"))
                cfs.push(createCfAddIfNotNull("SO No", orderNos, "text"))
                cfs.push(createCfAddIfNotNull("DO No", doNumber, "text"))
                console.log(cfs)
            }
            catch (e) {
                console.log(`error creating cfs ${e.message}`)
            }
            // let issueId = issue.uuid
            // let updatedIssue = await addCfsInIssue(issueId, cfs)
            // if (updatedIssue) {
            //     console.log("CFS Updated ")
            // } else {
            //     console.log("error in adding cfs in issue")
            // }
        }
    }
}

function getFromCf(cfs, key) {
    if (cfs == null) {
        return null
    } else {
        let found = cfs.find(_ => _.fieldKey == key)
        if (found) {
            return found.value
        } else {
            return null
        }
    }
}

async function getShipmentById(shId, skipCn) {
    try {
        let url = `http://apis.fretron.com/shipment/v1/admin/shipment/${shId}?skipCn=${skipCn}`
        let res = await rp({
            method: "GET",
            uri: url,
            json: true
        });
        if (res.status == 200) {
            return res.data
        } else {
            console.log(`Get shipment by id res error : ${res.error}`)
            return null
        }
    } catch (e) {
        console.log(`Catched error in get sh by id : ${e.message}`)
    }
    return null
}

function createCfAddIfNotNull(key, value, input) {
    if (!value || value != "") {
        return {
            fieldKey: key,
            multiple: false,
            description: "",
            remark: "",
            required: false,
            accessType: null,
            input: input,
            unit: "",
            valueType: "string",
            options: [],
            fieldType: "text",
            value: value,
            isRemark: false,
        };
    }
}

async function addCfsInIssue(issueId, cfs) {
    try {
        let url = `https://apis.fretron.com/issue/v1/issue/add/customFields?issueId=${issueId}`
        let res = await rp({
            method: "POST",
            uri: url,
            body: cfs,
            json: true,
            headers: {
                "Content-Type": "Application/json",
                "Authorization": TOKEN
            },
        });
        if (res.status == 200) {
            return res.data
        } else {
            console.log(`Get issue by id res error : ${res.error}`)
            return null
        }
    } catch (e) {
        console.log(`Catched error in get issue by id : ${e.message}`)
    }
    return null
}

// try {
//     console.log($event.issueNo)
//     await main($event)
// } catch (e) {
//     console.log("error " + e)
// }

main($event)