const rp = require("request-promise")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTI4NTcwMDksInVzZXJJZCI6ImJvdHVzZXItLTYxMjc0MzViLTlhMzYtNDJiZC1hODA2LTFiM2JhYjliYzk5NiIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTYxMjc0MzViLTlhMzYtNDJiZC1hODA2LTFiM2JhYjliYzk5NiIsIm9yZ0lkIjoiM2U0Y2RlZTktMGIzYi00NmRkLTliOTgtZGYwZTM4YTAyNzFjIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.u_anv189syhUd15qjwFID0eIOPWVPfA9L29G2Yskd5E"
const lineItemStatus = ["FINALIZED", "CLOSED"]
async function getOrdersByFuLineItemId(fuLineItenId) {
    let filter = {
        "_nested": {
            "_path": "lineItems",
            "_include_nested_hits": true,
            "lineItems.freightUnitLineItemIds": [fuLineItenId],
        }
    }
    let allFields = true
    let url = `${FRT_PUB_BASE_URL}/shipment-view/sales/v2/orders_new?orderOrEnquiry=order&limit=500&filters=${JSON.stringify(filter)}&source=${JSON.stringify(allFields)}`
    return rp({
        url: url,
        method: "GET",
        json: true,
        headers: { Authorization: TOKEN }
    }).then((res) => {
        return res.length ? res : []
    }).catch((err) => {
        console.log(`error getting order - ${err}`)
        return []
    })

}
async function forceCloseOrder(orderId) {
    try {
        let url = `${FRT_PUB_BASE_URL}/order-manager-v2/sales-orders/v1/order/${orderId}/closeOrder`;
        let res = await rp({
            uri: url,
            method: "PUT",
            json: true,
            body: {
                isShortClose: true,
                isForeClose: true,
            },
            headers: {
                authorization: TOKEN
            }
        })

        if (res?.status == 200) {
            console.log(`order closed successfully ${orderId}`)
            return res
        } else {
            console.log(`error order close ${JSON.stringify(res)}`)
        }

    } catch (e) {
        console.log(`Caught error in close order Api ${e.message}`)
    }
    return null
}


function getFromCf(cfs, key) {
    return cfs?.find((v) => v.fieldKey == key)?.value
}

async function main(sh) {
    try {
        let shNo = sh?.shipmentNumber
        let fuId = sh?.freightUnitLineItemId
        if (!fuId) {
            console.log(`freightUnitLineItemId Not Found For Shipment ${shNo}`)
            return
        }
        let orders = await getOrdersByFuLineItemId(fuId)
        if (!orders?.length) {
            console.log(`Orders Not Found ${shNo}`)
            return
        }
        for (let order of orders) {
            try {
                let orderNumber = order?.orderNumber
                console.log(`Executing Order ${orderNumber}`)
                let orderId = order.uuid
                let pendingLineItems = order?.lineItems?.filter((item) => (!lineItemStatus.includes(item?.status)))

                if (pendingLineItems?.length) {
                    let orderClose = true
                    for (let item of pendingLineItems) {
                        let cfs = item?.customFields
                        let materialType = getFromCf(cfs, "Material Type")
                        if (materialType == "ZFIN") {
                            orderClose = false
                        }
                    }
                    console.log(`Order  ${orderNumber} Close ${orderClose}`)
                    if (orderClose) {
                        // await forceCloseOrder(orderId)
                    } else {
                        console.log(`Order Found With ZFIN Material Type ${orderNumber}`)
                    }
                } else {
                    console.log(`All LineItems With ${lineItemStatus} Found for ${orderNumber}`)
                }
            } catch (e) {
                console.log(`Caught Error order ${order.orderNumber} ${e.message}`)
            }
        }
    } catch (e) {
        console.log(`Caught Error in main ${e.message}`)
    }
}

let $event = {
    "creationTime": 1692794794945,
    "customFields": [
        {
            "indexedValue": [
                "FreightCost_9800.0"
            ],
            "fieldKey": "FreightCost",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "9800.0",
            "isRemark": false
        },
        {
            "indexedValue": [
                "FreightType_perVehicle"
            ],
            "fieldKey": "FreightType",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "perVehicle",
            "isRemark": false
        },
        {
            "indexedValue": [
                "PONo_f0d0dbc0-c7f9-4198-a946-40c44c079cb4"
            ],
            "fieldKey": "PONo",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "f0d0dbc0-c7f9-4198-a946-40c44c079cb4",
            "isRemark": false
        },
        {
            "indexedValue": [
                "IsFinalization Done_No"
            ],
            "fieldKey": "IsFinalization Done",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [
                "Yes",
                "No"
            ],
            "fieldType": "yes-no",
            "value": "No",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Shipment Data Sent_Yes"
            ],
            "fieldKey": "Shipment Data Sent",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [
                "Yes",
                "No"
            ],
            "fieldType": "yes-no",
            "value": "Yes",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Customer Name_R.P.TRADERS"
            ],
            "fieldKey": "Customer Name",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": "",
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "R.P.TRADERS",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Order No's_346757"
            ],
            "fieldKey": "Order No's",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": "",
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "346757",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Invoice No's_7922305743"
            ],
            "fieldKey": "Invoice No's",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "7922305743",
            "isRemark": false
        }
    ],
    "transportationMode": "ByRoad",
    "freightUnitLineItemId": "d366a3a6-5284-4265-b1e0-27e7abd3e4fb",
    "lastSyncUpTime": 1692857501782,
    "updates": {
        "traceID": "consignmentTopic_5_1746153",
        "resourceId": "49b58a7e-4d80-4856-a481-cc97177e5f8f",
        "updatedBy": "SYSTEM",
        "changes": null,
        "sourceOfInformation": null,
        "description": null,
        "forwardReasons": [
            "shipment.consignment.updated"
        ],
        "userId": null,
        "uuid": "1f8c69f1-3e24-48ee-a65f-33a02ca713a9",
        "revision": 96,
        "time": 1692878013465,
        "forwardedFrom": null,
        "resourceType": "ShipmentObject",
        "updateType": null
    },
    "isActive": false,
    "uuid": "49b58a7e-4d80-4856-a481-cc97177e5f8f",
    "issues": null,
    "branch": {
        "companyCode": "DPAT",
        "address": "BIHAR SHARIF",
        "updatedBy": null,
        "customFields": [
            {
                "indexedValue": [
                    "FCM_GSTN_10AAACS0326G1Z6"
                ],
                "fieldKey": "FCM_GSTN",
                "valueType": "string",
                "fieldType": "text",
                "value": "10AAACS0326G1Z6",
                "definitionId": null
            },
            {
                "indexedValue": [
                    "RCM_GSTN_null"
                ],
                "fieldKey": "RCM_GSTN",
                "valueType": "string",
                "fieldType": "text",
                "value": null,
                "definitionId": null
            },
            {
                "indexedValue": [
                    "STATE_NAME_BIHAR"
                ],
                "fieldKey": "STATE_NAME",
                "valueType": "string",
                "fieldType": "text",
                "value": "BIHAR",
                "definitionId": null
            }
        ],
        "regionName": "PATNA",
        "externalId": "DPAT",
        "branchName": null,
        "type": [
            "Operation",
            "Sales"
        ],
        "updates": null,
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
        "areaId": null,
        "geoLocation": null,
        "regionId": null,
        "areaName": null,
        "name": "FENA (P) LIMITED-PATNA",
        "zoneId": null,
        "_id": "ffb72963-5028-4490-b812-e1996a5908bf",
        "zoneName": null,
        "contacts": [
            {
                "emails": [
                    ""
                ],
                "address": null,
                "mobileNumbers": [
                    ""
                ],
                "mobileNumber": null,
                "name": "",
                "type": null
            }
        ],
        "officeType": null,
        "materialServices": null
    },
    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
    "shipmentType": "DirectLeg",
    "completionTime": 1692857515152,
    "orderNumbers": [
        "346757"
    ],
    "routeId": null,
    "shipmentTrackingStatus": null,
    "lastForwardTime": 1692878013643,
    "runningStatus": null,
    "delayTrackingStatus": null,
    "delayReasonLastUpdateTime": null,
    "links": null,
    "shipmentDate": 1692794794905,
    "delayReason": null,
    "shipmentNumber": "FRETSH000008068",
    "originalEdd": null,
    "edd": null,
    "delayReasonUpdateExpiryTime": null,
    "externalShipmentId": null,
    "fleetInfo": {
        "isTrackingEnable": false,
        "forwardingAgent": null,
        "verificationStatus": "UnVerified",
        "trackingMode": "VTS-LBS",
        "broker": {
            "geoFence": null,
            "documents": [],
            "customFields": null,
            "isPortalEnabled": true,
            "type": "vendor",
            "updates": null,
            "uuid": "0aed382a-88bc-4e82-a6ae-b2917cd1efdc",
            "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
            "firmType": "INDIVISUAL",
            "gstn": "07AACCG4154E2ZW",
            "voterId": null,
            "verificationTicketId": null,
            "companyCodes": null,
            "group": {
                "name": "Broker",
                "partnerType": null,
                "uuid": null,
                "orgId": null
            },
            "address": "{\"pincode\":110035,\"address\":\"G 1 AND 2 UPPER FLOOR ALLIED HOUSE\",\"city\":\"DELHI\",\"state\":\"\"}",
            "verificationStatus": "unverified",
            "externalId": "7500509",
            "panNumber": "AACCG4154E",
            "aadharNo": null,
            "parentId": null,
            "places": null,
            "route": null,
            "name": "GGT LOGISTICS PVT LTD",
            "location": null,
            "fretronId": null,
            "contacts": [
                {
                    "emails": [
                        "ggt.bhiw@gmail.com"
                    ],
                    "address": null,
                    "mobileNumbers": [
                        "8010559967"
                    ],
                    "mobileNumber": null,
                    "name": "GGT LOGISTICS PVT LTD",
                    "type": null
                },
                {
                    "emails": [
                        "ggt.hald@gmail.com"
                    ],
                    "address": null,
                    "mobileNumbers": [
                        "9318393483"
                    ],
                    "mobileNumber": null,
                    "name": "GGT LOGISTICS PVT LTD HALDWANI",
                    "type": null
                },
                {
                    "emails": [
                        "ggt.patna@gmail.com"
                    ],
                    "address": null,
                    "mobileNumbers": [
                        "8527411383"
                    ],
                    "mobileNumber": null,
                    "name": "GGT LOGISTICS PVT PATNA",
                    "type": null
                },
                {
                    "emails": [
                        "ggtl.kolkata@gmail.com"
                    ],
                    "address": null,
                    "mobileNumbers": [
                        "9418544752"
                    ],
                    "mobileNumber": null,
                    "name": "GGT LOGISTICS PVT LTD howrah",
                    "type": null
                },
                {
                    "emails": [
                        "account02@ggtlpl.com"
                    ],
                    "address": null,
                    "mobileNumbers": [
                        "7000748630"
                    ],
                    "mobileNumber": null,
                    "name": "GGT LOGISTICS PVT LTD- ADMIN",
                    "type": null
                }
            ],
            "status": "ACTIVE"
        },
        "uuid": "03b1e2d0-9e7b-4ef1-b13a-5e5a92343a78",
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
        "vehicle": {
            "vtsDeviceId": null,
            "kmDriven": null,
            "secondaryDriverId": null,
            "attachedDocs": [
                "a0dcd942-9560-4ca6-a086-9137490fdcbb",
                "431d6510-7bee-41bf-9694-50595c4c1562",
                "399ab06e-6305-45fd-b27c-3bf095ac2b8c"
            ],
            "customFields": [
                {
                    "indexedValue": [
                        "EngineNumber_497TC92BUY807322"
                    ],
                    "fieldKey": "EngineNumber",
                    "valueType": "string",
                    "fieldType": "text",
                    "value": "497TC92BUY807322",
                    "definitionId": null
                }
            ],
            "floorType": null,
            "description": null,
            "source": null,
            "isTrackingEnabled": false,
            "updates": null,
            "uuid": null,
            "branch": null,
            "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
            "vehicleLoadType": {
                "bodyType": "Open Body",
                "passingCapacityMT": 9,
                "minLength": 0,
                "updates": {
                    "traceID": null,
                    "resourceId": "a39fb94c-c3ae-45ed-bea5-b293134c936c",
                    "updatedBy": "USER",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": "Created Load Type.",
                    "forwardReasons": [
                        "load.type.created.event"
                    ],
                    "userId": "fc6a1d6e-cf18-4bf8-9489-58d56aab16ec",
                    "uuid": "b2700fcd-19ac-43de-ab25-ad77f3eb9979",
                    "revision": null,
                    "time": 1679052745044,
                    "forwardedFrom": null,
                    "resourceType": "LoadTypes",
                    "updateType": null
                },
                "vehicleCategories": [],
                "uuid": "a39fb94c-c3ae-45ed-bea5-b293134c936c",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                "vehicleCategory": "Taurus",
                "includeMaxLength": false,
                "minHeight": 0,
                "maxHeight": -1,
                "passingCapacityCFT": null,
                "bodyTypes": [],
                "partnerName": null,
                "includeMinLength": false,
                "partnerExternalId": null,
                "externalId": null,
                "chassisTypes": [],
                "numberOfWheels": 6,
                "chassisType": "LCV-6W",
                "includeMinHeight": false,
                "name": "Truck 9MT",
                "partnerId": null,
                "includeMaxHeight": false,
                "dimensionString": null,
                "maxLength": -1
            },
            "associatedWith": null,
            "isDeleted": null,
            "customerId": null,
            "vehicleModel": null,
            "mileageEmpty": null,
            "mileageLoaded": null,
            "vehicleType": "Truck",
            "groups": null,
            "externalId": null,
            "updateTime": null,
            "sharedWith": null,
            "baseLocationId": null,
            "vehicleMake": null,
            "vehicleRegistrationNumber": "BR01GE1694",
            "chassisNumber": "MAT457403F7B03301",
            "driverId": null,
            "createTime": null,
            "loadCapacity": 9,
            "truckLength": null,
            "category": null,
            "groupsExtended": null
        },
        "driver": {
            "pincode": null,
            "dlExpiryTime": null,
            "attachedDocs": [],
            "isEmployee": false,
            "pfNumber": null,
            "address": null,
            "mobileNumbers": null,
            "dlNumber": null,
            "mobileNumber": "8292414235",
            "customFields": null,
            "externalId": null,
            "updates": null,
            "aadharNo": null,
            "type": null,
            "uuid": null,
            "branch": null,
            "orgId": null,
            "vehicleRegistrationNumber": null,
            "dob": null,
            "name": null,
            "vehicleId": null,
            "associatedUserId": null,
            "status": null
        },
        "fleetType": "Market",
        "fleetOwner": {
            "geoFence": null,
            "documents": [],
            "customFields": null,
            "isPortalEnabled": true,
            "type": "vendor",
            "updates": null,
            "uuid": "0aed382a-88bc-4e82-a6ae-b2917cd1efdc",
            "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
            "firmType": "INDIVISUAL",
            "gstn": "07AACCG4154E2ZW",
            "voterId": null,
            "verificationTicketId": null,
            "companyCodes": null,
            "group": {
                "name": "Broker",
                "partnerType": null,
                "uuid": null,
                "orgId": null
            },
            "address": "{\"pincode\":110035,\"address\":\"G 1 AND 2 UPPER FLOOR ALLIED HOUSE\",\"city\":\"DELHI\",\"state\":\"\"}",
            "verificationStatus": "unverified",
            "externalId": "7500509",
            "panNumber": "AACCG4154E",
            "aadharNo": null,
            "parentId": null,
            "places": null,
            "route": null,
            "name": "GGT LOGISTICS PVT LTD",
            "location": null,
            "fretronId": null,
            "contacts": [
                {
                    "emails": [
                        "ggt.bhiw@gmail.com"
                    ],
                    "address": null,
                    "mobileNumbers": [
                        "8010559967"
                    ],
                    "mobileNumber": null,
                    "name": "GGT LOGISTICS PVT LTD",
                    "type": null
                },
                {
                    "emails": [
                        "ggt.hald@gmail.com"
                    ],
                    "address": null,
                    "mobileNumbers": [
                        "9318393483"
                    ],
                    "mobileNumber": null,
                    "name": "GGT LOGISTICS PVT LTD HALDWANI",
                    "type": null
                },
                {
                    "emails": [
                        "ggt.patna@gmail.com"
                    ],
                    "address": null,
                    "mobileNumbers": [
                        "8527411383"
                    ],
                    "mobileNumber": null,
                    "name": "GGT LOGISTICS PVT PATNA",
                    "type": null
                },
                {
                    "emails": [
                        "ggtl.kolkata@gmail.com"
                    ],
                    "address": null,
                    "mobileNumbers": [
                        "9418544752"
                    ],
                    "mobileNumber": null,
                    "name": "GGT LOGISTICS PVT LTD howrah",
                    "type": null
                },
                {
                    "emails": [
                        "account02@ggtlpl.com"
                    ],
                    "address": null,
                    "mobileNumbers": [
                        "7000748630"
                    ],
                    "mobileNumber": null,
                    "name": "GGT LOGISTICS PVT LTD- ADMIN",
                    "type": null
                }
            ],
            "status": "ACTIVE"
        },
        "trainInfo": null,
        "lbsNumber": null,
        "secondaryDriver": {
            "pincode": null,
            "dlExpiryTime": null,
            "attachedDocs": null,
            "isEmployee": false,
            "pfNumber": null,
            "address": null,
            "mobileNumbers": null,
            "dlNumber": null,
            "mobileNumber": null,
            "customFields": null,
            "externalId": null,
            "updates": null,
            "aadharNo": null,
            "type": null,
            "uuid": null,
            "branch": null,
            "orgId": null,
            "vehicleRegistrationNumber": null,
            "dob": null,
            "name": null,
            "vehicleId": null,
            "associatedUserId": null,
            "status": null
        },
        "device": {
            "branchId": null,
            "isSuspended": null,
            "mobileNumber": null,
            "manufacturerName": null,
            "groups": null,
            "attachedResourceNumber": null,
            "externalId": null,
            "updateTime": null,
            "isAssociated": null,
            "sharedWith": null,
            "type": "lbs",
            "updates": null,
            "uuid": null,
            "orgId": "98da24c6-800c-4c4d-9a57-bada0a3dfb1f",
            "attachedResourceId": null,
            "isDeleted": null,
            "createTime": 1692794795053,
            "serviceProvider": null,
            "imei": "8292414235",
            "usedBy": null,
            "status": "FAILED"
        },
        "status": "ACTIVE"
    },
    "syncUpDueTime": null,
    "billingStatus": "UnSettled",
    "currentLocation": null,
    "alerts": [
        {
            "closedBy": null,
            "createdAt": 1692799945848,
            "issueId": null,
            "createdBy": null,
            "snoozTime": null,
            "description": "7922305743 E-Way bill will expire today",
            "type": "shipment.eway.bill.expiry.notification",
            "uuid": "10b653bc-d64f-4386-b432-038e98067a8f",
            "status": "CLOSED",
            "updatedAt": 1692857494399
        }
    ],
    "equipments": null,
    "tripType": "Shipment",
    "lastDelayCalculationTime": null,
    "delayReasonUpdateDueTime": null,
    "locationTrackingStatus": null,
    "poLineItemId": "234b4d26-2f19-469c-b8ec-b0b810ae86a1",
    "consignments": [],
    "customContacts": null,
    "shipmentStages": [
        {
            "departureTime": 1692799946517,
            "gateInTime": 1692799943392,
            "actualActivityStartTime": 1692799944526,
            "actualActivityEndTime": 1692799945622,
            "preActWtTime": null,
            "uuid": "4dd75257-d51c-400d-ade8-67e75beddbb4",
            "consignmentDelivered": null,
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": "FENA (P) LIMITED (PATNA), PATNA",
            "hub": {
                "hubId": null,
                "boundary": [],
                "address": null,
                "accessibility": "private",
                "addedBy": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                "center": {
                    "latitude": 25.5940947,
                    "longitude": 85.1375645
                },
                "suggestedRadius": 5000,
                "isOwned": null,
                "centerCoordinates": [
                    85.1375645,
                    25.5940947
                ],
                "placeId": "50e43aba-289d-4341-ab45-5fe896757848",
                "geoJsonBoundry": null,
                "externalId": null,
                "source": "GOOGLE",
                "places": null,
                "viewport": null,
                "district": "PATNA",
                "name": "PATNA",
                "state": "BIHAR",
                "category": "Hub",
                "subDistrict": null,
                "controllingBranchId": null
            },
            "arrivalTime": 1692799919982,
            "expectedActivityStartTime": null,
            "secondaryStatus": null,
            "consignmentPickUps": [
                "5521806b-e70d-4ab5-bbf4-986de52f3a53"
            ],
            "postActWtTime": null,
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": 1692799921997,
                "purpose": "Pickup",
                "plannedArrival": null,
                "currentGpsState": null,
                "updates": {
                    "traceID": "0e7b06b3-1d5a-4a13-b5a5-08deb42a57d8",
                    "resourceId": "4dd75257-d51c-400d-ade8-67e75beddbb4",
                    "updatedBy": "SYSTEM",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": null,
                    "forwardReasons": [
                        "trippoint.created"
                    ],
                    "userId": null,
                    "uuid": "f741f0bc-a713-40b6-980c-b13f0fec21c3",
                    "revision": 0,
                    "time": 1692799921997,
                    "forwardedFrom": null,
                    "resourceType": "TripPoint",
                    "updateType": null
                },
                "uuid": "4dd75257-d51c-400d-ade8-67e75beddbb4",
                "sequenceId": null,
                "isDisconnected": false,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": null,
                "eta": null,
                "routeId": null,
                "expectedActivityStartTime": null,
                "actualDeparture": null,
                "vehicleId": "8292414235",
                "place": null,
                "remainingDistance": null,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "4dd75257-d51c-400d-ade8-67e75beddbb4"
                ],
                "actualActivityEndTime": null,
                "actualArrival": 1692799919982,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": null,
                "isAutoCompleted": false,
                "coveredDistance": null,
                "hub": {
                    "hubId": null,
                    "boundary": null,
                    "address": null,
                    "accessibility": "private",
                    "addedBy": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "center": {
                        "latitude": 25.5940947,
                        "longitude": 85.1375645
                    },
                    "suggestedRadius": 5000,
                    "isOwned": null,
                    "centerCoordinates": [
                        85.1375645,
                        25.5940947
                    ],
                    "placeId": "50e43aba-289d-4341-ab45-5fe896757848",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "GOOGLE",
                    "places": null,
                    "viewport": null,
                    "district": "PATNA",
                    "name": "PATNA",
                    "state": "BIHAR",
                    "category": "Hub",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "imei": "8292414235",
                "assosiatedShipmentsId": [
                    "49b58a7e-4d80-4856-a481-cc97177e5f8f"
                ],
                "status": "COMPLETED"
            },
            "place": null,
            "controllingBranchId": null,
            "gateOutTime": null,
            "status": "COMPLETED"
        },
        {
            "departureTime": 1692846709000,
            "gateInTime": null,
            "actualActivityStartTime": 1692846709000,
            "actualActivityEndTime": 1692846709000,
            "preActWtTime": null,
            "uuid": "4d69ce15-6ac3-4eb1-a754-dad4fa3aeb0b",
            "consignmentDelivered": [
                "5521806b-e70d-4ab5-bbf4-986de52f3a53"
            ],
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": null,
            "hub": {
                "hubId": null,
                "boundary": [],
                "address": null,
                "accessibility": "private",
                "addedBy": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                "center": {
                    "latitude": 26.1137757,
                    "longitude": 85.5380411
                },
                "suggestedRadius": 5000,
                "isOwned": null,
                "centerCoordinates": [
                    85.5380411,
                    26.1137757
                ],
                "placeId": "9f294b6a-543e-454a-9b3c-0899f3d142e3",
                "geoJsonBoundry": null,
                "externalId": null,
                "source": "GOOGLE",
                "places": null,
                "viewport": null,
                "district": "MUZAFFARPUR",
                "name": "SARFUDDINPUR",
                "state": "BIHAR",
                "category": "Hub",
                "subDistrict": null,
                "controllingBranchId": null
            },
            "arrivalTime": 1692843100000,
            "expectedActivityStartTime": null,
            "secondaryStatus": null,
            "consignmentPickUps": null,
            "postActWtTime": null,
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": 1692799943084,
                "purpose": "Delivery",
                "plannedArrival": null,
                "currentGpsState": null,
                "updates": {
                    "traceID": "TestFena_finalize",
                    "resourceId": "4d69ce15-6ac3-4eb1-a754-dad4fa3aeb0b",
                    "updatedBy": "SYSTEM",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": null,
                    "forwardReasons": [
                        "trippoint.created"
                    ],
                    "userId": null,
                    "uuid": "4788db3b-f6a6-4bcc-a86c-2e9b87db14f6",
                    "revision": 0,
                    "time": 1692799943084,
                    "forwardedFrom": null,
                    "resourceType": "TripPoint",
                    "updateType": null
                },
                "uuid": "4d69ce15-6ac3-4eb1-a754-dad4fa3aeb0b",
                "sequenceId": null,
                "isDisconnected": false,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": null,
                "eta": null,
                "routeId": null,
                "expectedActivityStartTime": null,
                "actualDeparture": null,
                "vehicleId": "8292414235",
                "place": null,
                "remainingDistance": null,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "4d69ce15-6ac3-4eb1-a754-dad4fa3aeb0b"
                ],
                "actualActivityEndTime": null,
                "actualArrival": 1692843100000,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": null,
                "isAutoCompleted": false,
                "coveredDistance": null,
                "hub": {
                    "hubId": null,
                    "boundary": null,
                    "address": null,
                    "accessibility": "private",
                    "addedBy": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "center": {
                        "latitude": 26.1137757,
                        "longitude": 85.5380411
                    },
                    "suggestedRadius": 5000,
                    "isOwned": null,
                    "centerCoordinates": [
                        85.5380411,
                        26.1137757
                    ],
                    "placeId": "9f294b6a-543e-454a-9b3c-0899f3d142e3",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "GOOGLE",
                    "places": null,
                    "viewport": null,
                    "district": "MUZAFFARPUR",
                    "name": "SARFUDDINPUR",
                    "state": "BIHAR",
                    "category": "Hub",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "imei": "8292414235",
                "assosiatedShipmentsId": [
                    "49b58a7e-4d80-4856-a481-cc97177e5f8f"
                ],
                "status": "COMPLETED"
            },
            "place": null,
            "controllingBranchId": null,
            "gateOutTime": null,
            "status": "COMPLETED"
        }
    ],
    "remarks": null,
    "syncUpExpiryTime": null,
    "shipmentStatus": "Completed"
}
main($event)