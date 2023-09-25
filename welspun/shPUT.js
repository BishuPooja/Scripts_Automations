const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTI5NjM0NTgsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNmY4MGVmZjUtZmFkMS00ZmJmLTk3NmItYjViZmI1OTVkNDU0IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.Y6LL3z5TRos-4SRpuicBFtNaAI3tSUl_nKbd_E0-6NI"
const rp = require("request-promise")
const _ = require("lodash")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"


async function generateAlert(alert, sh) {
    try {
        let res = await rp({
            'uri': `${FRT_PUB_BASE_URL}/shipment/v1/shipment/${sh.uuid}/alert`,
            'method': 'POST',
            'headers': {
                'Authorization': TOKEN
            },
            'json': true,
            'body': alert
        })
        if (res.status === 200) {
            console.log(`successfully added alert ${alert.description} on shipmentNo : ${sh.shipmentNumber}`)
        } else {
            console.log(`Some error in adding alert ${alert.description} : ${sh.shipmentNumber}, error: ${res.error}`)
        }
    }
    catch (e) {
        console.log(`Some catched error in adding alert on shipmentNo : ${sh.shipmentNumber}, error: ${e.message}`)
    }
}

async function updateSh(sh) {
    try {
        let url = `https://apis.fretron.com/shipment/v1/admin/shipment`
        let res = await rp({
            uri: url,
            method: "PUT",
            json: true,
            body: sh,
            headers: {
                Authorization: TOKEN
            }
        })
        console.log(`UpdatedSh Res status ${res?.status}`)
        if (res?.error) {
            console.log(`Error Res ${res?.error}`)
        }
    } catch (e) {
        console.log(`Caught Error ${e.message}`)
    }
}
let sh = {
    "creationTime": 1693220112100,
    "customFields": [
        {
            "indexedValue": [
                "Plant Tracking_Yes"
            ],
            "fieldKey": "Plant Tracking",
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
                "Tracking Radius_1000.0"
            ],
            "fieldKey": "Tracking Radius",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "1000.0",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Plant Tracking Eligibility_Yes"
            ],
            "fieldKey": "Plant Tracking Eligibility",
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
                "Plant Tracking Last Update_1693220112104"
            ],
            "fieldKey": "Plant Tracking Last Update",
            "multiple": true,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [],
            "fieldType": "dateTime",
            "value": "1693220112104",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Category_Others"
            ],
            "fieldKey": "Category",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": "b6304c1c-c0e2-4b87-bb2f-0847cf90cceb",
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": "",
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "Others",
            "isRemark": false
        },
        {
            "indexedValue": [
                "MG3 Gate In Time_1693220147412"
            ],
            "fieldKey": "MG3 Gate In Time",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "date",
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "dateTime",
            "value": "1693220147412",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Error In Amazin Events_Yes"
            ],
            "fieldKey": "Error In Amazin Events",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": "e5c3326a-87cf-415a-9581-8f981fb57f11",
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
                "Gate In Error_Cannot read properties of null  reading  orderNumber  "
            ],
            "fieldKey": "Gate In Error",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": "cc07ba90-e601-4f86-af16-69fc5a762e2e",
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "Cannot read properties of null  reading  orderNumber  ",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Pickup Point Tat (Min)_0.31"
            ],
            "fieldKey": "Pickup Point Tat (Min)",
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
            "value": "0.31",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Enroute Tat (Min)_0.06"
            ],
            "fieldKey": "Enroute Tat (Min)",
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
            "value": "0.06",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Delivery Point Tat (Min)_0.05"
            ],
            "fieldKey": "Delivery Point Tat (Min)",
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
            "value": "0.05",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Full-Tat (Min)_0.42"
            ],
            "fieldKey": "Full-Tat (Min)",
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
            "value": "0.42",
            "isRemark": false
        },
        {
            "indexedValue": [
                "MG3 Gate Out Time_1693220150617"
            ],
            "fieldKey": "MG3 Gate Out Time",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "date",
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "dateTime",
            "value": "1693220150617",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Gate Out Error_Cannot read properties of null  reading  customFields  "
            ],
            "fieldKey": "Gate Out Error",
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
            "value": "Cannot read properties of null  reading  customFields  ",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Net Weight Difference_56"
            ],
            "fieldKey": "Net Weight Difference",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": "4b869581-f6b2-46ff-8376-343d2e51f2ee",
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": "",
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "56",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Tolerance Percentage_5"
            ],
            "fieldKey": "Tolerance Percentage",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": "99aa9f3d-9dcf-4e5e-a4fd-5e365ff625a2",
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": "",
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "5",
            "isRemark": false
        }
    ],
    "transportationMode": "ByRoad",
    "freightUnitLineItemId": null,
    "lastSyncUpTime": 1693220151345,
    "updates": {
        "traceID": "fbe2441c-e098-4b34-917c-265454e47758",
        "resourceId": "b0163f1f-4253-4be7-b817-72b939aa3ded",
        "updatedBy": "SYSTEM",
        "changes": null,
        "sourceOfInformation": "16b01de5-45ff-4ee7-ac09-d3fbfc42647b",
        "description": null,
        "forwardReasons": [
            "shipment.alert.added",
            "shipment.disconnected.notification.generated"
        ],
        "userId": null,
        "uuid": "294d9d81-c29f-411f-93f7-42430ad7ca0f",
        "revision": 38,
        "time": 1693222540432,
        "forwardedFrom": null,
        "resourceType": "ShipmentObject",
        "updateType": null
    },
    "isActive": false,
    "uuid": "b0163f1f-4253-4be7-b817-72b939aa3ded",
    "issues": null,
    "branch": {
        "companyCode": null,
        "address": "Unnamed Road, Varshamedi, Gujarat 370110, India",
        "updatedBy": null,
        "customFields": null,
        "regionName": null,
        "externalId": null,
        "branchName": null,
        "type": [
            "IT",
            "Operation",
            "Sales",
            ""
        ],
        "updates": null,
        "orgId": "6f80eff5-fad1-4fbf-976b-b5bfb595d454",
        "areaId": null,
        "geoLocation": [
            70.0970089725326,
            23.12915847344465
        ],
        "regionId": null,
        "areaName": null,
        "name": "Welspun Anjar",
        "zoneId": null,
        "_id": "9e85dae9-3fe1-4b5a-871e-8b9f38566fbd",
        "zoneName": null,
        "contacts": [],
        "officeType": null,
        "materialServices": null
    },
    "orgId": "6f80eff5-fad1-4fbf-976b-b5bfb595d454",
    "shipmentType": "DirectLeg",
    "completionTime": 1693220250607,
    "orderNumbers": [],
    "routeId": "f6160d69-8429-4e5f-941d-0564bb0ae63c",
    "shipmentTrackingStatus": null,
    "lastForwardTime": 1693222353259,
    "runningStatus": null,
    "delayTrackingStatus": null,
    "delayReasonLastUpdateTime": null,
    "links": null,
    "shipmentDate": 1693220077941,
    "delayReason": null,
    "shipmentNumber": "FRETSH000001290",
    "originalEdd": null,
    "edd": 1693221950000,
    "delayReasonUpdateExpiryTime": null,
    "externalShipmentId": null,
    "fleetInfo": {
        "isTrackingEnable": null,
        "forwardingAgent": null,
        "verificationStatus": null,
        "trackingMode": "MANUAL",
        "broker": null,
        "uuid": "a55a74a2-1f82-42fe-8e47-18a2300c044a",
        "orgId": null,
        "vehicle": {
            "vtsDeviceId": null,
            "kmDriven": null,
            "secondaryDriverId": null,
            "attachedDocs": [],
            "customFields": [],
            "floorType": null,
            "description": null,
            "source": "FRETRON",
            "isTrackingEnabled": false,
            "updates": {
                "traceID": "3d6637c1-ec2a-433f-8844-8c599d01d09b",
                "resourceId": "a55a74a2-1f82-42fe-8e47-18a2300c044a",
                "updatedBy": "SYSTEM",
                "changes": null,
                "sourceOfInformation": null,
                "description": null,
                "forwardReasons": [
                    "device.unassign.event"
                ],
                "userId": null,
                "uuid": "018f4927-4e87-4739-9f37-5571a49bce4e",
                "revision": null,
                "time": 1692181069074,
                "forwardedFrom": null,
                "resourceType": "PartnerFleet",
                "updateType": null
            },
            "uuid": null,
            "branch": null,
            "orgId": "6f80eff5-fad1-4fbf-976b-b5bfb595d454",
            "vehicleLoadType": {
                "bodyType": "Truck",
                "passingCapacityMT": null,
                "minLength": 0,
                "updates": {
                    "traceID": null,
                    "resourceId": "b28b6edc-a08d-4ad3-980a-41359731c09b",
                    "updatedBy": "USER",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": "Created Load Type.",
                    "forwardReasons": [
                        "load.type.created.event"
                    ],
                    "userId": "97122da8-f5e1-45cf-9ba8-abbf6943aa2c",
                    "uuid": "2c9f3c6c-4b76-4208-9ed6-83d710209dd7",
                    "revision": null,
                    "time": 1689080065660,
                    "forwardedFrom": null,
                    "resourceType": "LoadTypes",
                    "updateType": null
                },
                "vehicleCategories": [],
                "uuid": "b28b6edc-a08d-4ad3-980a-41359731c09b",
                "orgId": "6f80eff5-fad1-4fbf-976b-b5bfb595d454",
                "vehicleCategory": "Truck",
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
                "numberOfWheels": null,
                "chassisType": "NEW1",
                "includeMinHeight": false,
                "name": "Truck_25MT",
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
            "vehicleType": "hire",
            "groups": [],
            "externalId": null,
            "updateTime": 1692181069074,
            "sharedWith": [],
            "baseLocationId": null,
            "vehicleMake": null,
            "vehicleRegistrationNumber": "GJ234U7891",
            "chassisNumber": "18283001203801231",
            "driverId": null,
            "createTime": null,
            "loadCapacity": null,
            "truckLength": null,
            "category": "Truck_25MT",
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
            "mobileNumber": "4323OP",
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
            "name": "Aman",
            "vehicleId": null,
            "associatedUserId": null,
            "status": null
        },
        "fleetType": "Owned",
        "fleetOwner": {
            "geoFence": null,
            "documents": null,
            "customFields": null,
            "isPortalEnabled": false,
            "type": null,
            "updates": null,
            "uuid": null,
            "orgId": null,
            "firmType": null,
            "gstn": null,
            "voterId": null,
            "verificationTicketId": null,
            "companyCodes": null,
            "group": null,
            "address": null,
            "verificationStatus": null,
            "externalId": null,
            "panNumber": null,
            "aadharNo": null,
            "parentId": null,
            "places": null,
            "route": null,
            "name": "AMAN",
            "location": null,
            "fretronId": null,
            "contacts": null,
            "status": null
        },
        "trainInfo": null,
        "lbsNumber": null,
        "secondaryDriver": null,
        "device": null,
        "status": null
    },
    "syncUpDueTime": null,
    "billingStatus": null,
    "currentLocation": null,
    "alerts": [
        {
            "closedBy": null,
            "createdAt": 1693220703604,
            "issueId": null,
            "createdBy": null,
            "snoozTime": null,
            "description": "",
            "type": "red.zone.notification",
            "uuid": "88e319fe-d144-4734-a9c4-295379be2bce",
            "status": "OPEN",
            "updatedAt": 1693221568000
        },
        {
            "closedBy": null,
            "createdAt": 1693221171739,
            "issueId": null,
            "createdBy": null,
            "snoozTime": null,
            "description": "",
            "type": "shipment.route.deviation.notification",
            "uuid": "3127c310-7d77-45fe-9dc0-8ac1c95ef7e7",
            "status": "CLOSED",
            "updatedAt": 1693222297785
        },
        {
            "closedBy": null,
            "createdAt": 1693222540431,
            "issueId": null,
            "createdBy": null,
            "snoozTime": null,
            "description": "",
            "type": "shipment.disconnected.notification",
            "uuid": "16b01de5-45ff-4ee7-ac09-d3fbfc42647b",
            "status": "OPEN",
            "updatedAt": 1693181986000
        }
    ],
    "equipments": null,
    "tripType": "Shipment",
    "lastDelayCalculationTime": null,
    "delayReasonUpdateDueTime": null,
    "locationTrackingStatus": null,
    "poLineItemId": null,
    "consignments": [],
    "customContacts": null,
    "shipmentStages": [
        {
            "departureTime": 1693221586000,
            "gateInTime": 1693220128789,
            "actualActivityStartTime": 1693220143784,
            "actualActivityEndTime": 1693220143784,
            "preActWtTime": 1693220143884,
            "uuid": "dd25c64c-36a3-45c6-a28f-7bc2f4f42a10",
            "consignmentDelivered": null,
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": null,
            "hub": null,
            "arrivalTime": 1693220125154,
            "expectedActivityStartTime": null,
            "secondaryStatus": "WaitingForFinalize",
            "consignmentPickUps": null,
            "postActWtTime": 1693220144784,
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": null,
                "purpose": "Pickup",
                "plannedArrival": null,
                "currentGpsState": null,
                "updates": null,
                "uuid": "dd25c64c-36a3-45c6-a28f-7bc2f4f42a10",
                "sequenceId": null,
                "isDisconnected": false,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": null,
                "eta": null,
                "routeId": null,
                "expectedActivityStartTime": null,
                "actualDeparture": 1693220143784,
                "vehicleId": null,
                "place": {
                    "hubId": null,
                    "boundary": null,
                    "address": "Tuna Port Road, Gujarat, India",
                    "accessibility": "public",
                    "addedBy": "6f80eff5-fad1-4fbf-976b-b5bfb595d454",
                    "center": {
                        "latitude": 22.931678467812894,
                        "longitude": 70.10238243526386
                    },
                    "suggestedRadius": 0,
                    "isOwned": false,
                    "centerCoordinates": [
                        70.10238243526386,
                        22.931678467812894
                    ],
                    "placeId": "0c64983f-c90b-4c51-be30-d3aa685f916b",
                    "geoJsonBoundry": {
                        "coordinates": [
                            [
                                [
                                    70.10240793228151,
                                    22.931653197111654
                                ],
                                [
                                    70.09993493556978,
                                    22.931618613819737
                                ],
                                [
                                    70.10024070739748,
                                    22.88439924928305
                                ],
                                [
                                    70.111141204834,
                                    22.887166848468993
                                ],
                                [
                                    70.10818004608156,
                                    22.932053374561406
                                ],
                                [
                                    70.1042613387108,
                                    22.93187057760144
                                ],
                                [
                                    70.10240793228151,
                                    22.931653197111654
                                ]
                            ]
                        ],
                        "type": "Polygon"
                    },
                    "externalId": null,
                    "source": "FRETRON",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "Tuna Port",
                    "state": "GUJARAT",
                    "category": "Port",
                    "subDistrict": "370410",
                    "controllingBranchId": null
                },
                "remainingDistance": null,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "dd25c64c-36a3-45c6-a28f-7bc2f4f42a10"
                ],
                "actualActivityEndTime": null,
                "actualArrival": 1693220125154,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": null,
                "isAutoCompleted": false,
                "coveredDistance": null,
                "hub": null,
                "imei": null,
                "assosiatedShipmentsId": [
                    "b0163f1f-4253-4be7-b817-72b939aa3ded"
                ],
                "status": "COMPLETED"
            },
            "place": {
                "hubId": null,
                "boundary": null,
                "address": "Tuna Port Road, Gujarat, India",
                "accessibility": "public",
                "addedBy": "6f80eff5-fad1-4fbf-976b-b5bfb595d454",
                "center": {
                    "latitude": 22.931678467812894,
                    "longitude": 70.10238243526386
                },
                "suggestedRadius": 0,
                "isOwned": false,
                "centerCoordinates": [
                    70.10238243526386,
                    22.931678467812894
                ],
                "placeId": "0c64983f-c90b-4c51-be30-d3aa685f916b",
                "geoJsonBoundry": {
                    "coordinates": [
                        [
                            [
                                70.10240793228151,
                                22.931653197111654
                            ],
                            [
                                70.09993493556978,
                                22.931618613819737
                            ],
                            [
                                70.10024070739748,
                                22.88439924928305
                            ],
                            [
                                70.111141204834,
                                22.887166848468993
                            ],
                            [
                                70.10818004608156,
                                22.932053374561406
                            ],
                            [
                                70.1042613387108,
                                22.93187057760144
                            ],
                            [
                                70.10240793228151,
                                22.931653197111654
                            ]
                        ]
                    ],
                    "type": "Polygon"
                },
                "externalId": null,
                "source": "FRETRON",
                "places": null,
                "viewport": null,
                "district": null,
                "name": "Tuna Port",
                "state": "GUJARAT",
                "category": "Port",
                "subDistrict": "370410",
                "controllingBranchId": null
            },
            "controllingBranchId": null,
            "gateOutTime": null,
            "status": "COMPLETED"
        },
        {
            "departureTime": 1693181986000,
            "gateInTime": 1693178686000,
            "actualActivityStartTime": 1693178986000,
            "actualActivityEndTime": 1693179346000,
            "preActWtTime": 1693178866000,
            "uuid": "e1f5b4fa-4ade-4b3e-a370-89353112f3da",
            "consignmentDelivered": null,
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": null,
            "hub": null,
            "arrivalTime": 1693178446000,
            "expectedActivityStartTime": null,
            "secondaryStatus": null,
            "consignmentPickUps": null,
            "postActWtTime": 1693180126000,
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": null,
                "purpose": "Delivery",
                "plannedArrival": null,
                "currentGpsState": null,
                "updates": null,
                "uuid": "e1f5b4fa-4ade-4b3e-a370-89353112f3da",
                "sequenceId": null,
                "isDisconnected": false,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": null,
                "eta": null,
                "routeId": null,
                "expectedActivityStartTime": null,
                "actualDeparture": null,
                "vehicleId": null,
                "place": {
                    "hubId": null,
                    "boundary": null,
                    "address": "Unnamed Road, Varshamedi, Gujarat 370110, India",
                    "accessibility": "public",
                    "addedBy": "6f80eff5-fad1-4fbf-976b-b5bfb595d454",
                    "center": {
                        "latitude": 23.12096315319712,
                        "longitude": 70.07646897768014
                    },
                    "suggestedRadius": 0,
                    "isOwned": false,
                    "centerCoordinates": [
                        70.0970089725326,
                        23.12915847344465
                    ],
                    "placeId": "a88e21e4-f936-4b1d-a4df-9485698771b3",
                    "geoJsonBoundry": {
                        "coordinates": [
                            [
                                [
                                    70.06075859069826,
                                    23.117588142640578
                                ],
                                [
                                    70.06067276000978,
                                    23.120449635353804
                                ],
                                [
                                    70.06175100803377,
                                    23.12138700763033
                                ],
                                [
                                    70.06222844123842,
                                    23.122699317816924
                                ],
                                [
                                    70.06185293197633,
                                    23.125328833062305
                                ],
                                [
                                    70.0653934481303,
                                    23.126912424050825
                                ],
                                [
                                    70.06903052396137,
                                    23.128343081963784
                                ],
                                [
                                    70.0765085220337,
                                    23.13112542478185
                                ],
                                [
                                    70.08385777473451,
                                    23.134124754323118
                                ],
                                [
                                    70.09143233299257,
                                    23.136906967148136
                                ],
                                [
                                    70.09554114484251,
                                    23.13274310796055
                                ],
                                [
                                    70.09963827825402,
                                    23.130909652730676
                                ],
                                [
                                    70.10088345630521,
                                    23.127554553019095
                                ],
                                [
                                    70.09946823120119,
                                    23.122363841245967
                                ],
                                [
                                    70.08929729461671,
                                    23.107641514118967
                                ],
                                [
                                    70.08368611595144,
                                    23.109555919426167
                                ],
                                [
                                    70.08299946662908,
                                    23.10906253465565
                                ],
                                [
                                    70.08180855921455,
                                    23.10903304810404
                                ],
                                [
                                    70.07221698760988,
                                    23.11119396604795
                                ],
                                [
                                    70.07040381431581,
                                    23.111361718398285
                                ],
                                [
                                    70.06756067276002,
                                    23.113552347496388
                                ],
                                [
                                    70.0610375404358,
                                    23.114726588917915
                                ],
                                [
                                    70.06075859069826,
                                    23.117588142640578
                                ]
                            ]
                        ],
                        "type": "Polygon"
                    },
                    "externalId": null,
                    "source": "FRETRON",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "Welspun Anjar",
                    "state": "GUJARAT",
                    "category": "Parking",
                    "subDistrict": "370110",
                    "controllingBranchId": null
                },
                "remainingDistance": 0,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "e1f5b4fa-4ade-4b3e-a370-89353112f3da"
                ],
                "actualActivityEndTime": null,
                "actualArrival": null,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": null,
                "isAutoCompleted": false,
                "coveredDistance": null,
                "hub": null,
                "imei": null,
                "assosiatedShipmentsId": [
                    "b0163f1f-4253-4be7-b817-72b939aa3ded"
                ],
                "status": "COMPLETED"
            },
            "place": {
                "hubId": null,
                "boundary": null,
                "address": "Unnamed Road, Varshamedi, Gujarat 370110, India",
                "accessibility": "public",
                "addedBy": "6f80eff5-fad1-4fbf-976b-b5bfb595d454",
                "center": {
                    "latitude": 23.12096315319712,
                    "longitude": 70.07646897768014
                },
                "suggestedRadius": 0,
                "isOwned": false,
                "centerCoordinates": [
                    70.0970089725326,
                    23.12915847344465
                ],
                "placeId": "a88e21e4-f936-4b1d-a4df-9485698771b3",
                "geoJsonBoundry": {
                    "coordinates": [
                        [
                            [
                                70.06075859069826,
                                23.117588142640578
                            ],
                            [
                                70.06067276000978,
                                23.120449635353804
                            ],
                            [
                                70.06175100803377,
                                23.12138700763033
                            ],
                            [
                                70.06222844123842,
                                23.122699317816924
                            ],
                            [
                                70.06185293197633,
                                23.125328833062305
                            ],
                            [
                                70.0653934481303,
                                23.126912424050825
                            ],
                            [
                                70.06903052396137,
                                23.128343081963784
                            ],
                            [
                                70.0765085220337,
                                23.13112542478185
                            ],
                            [
                                70.08385777473451,
                                23.134124754323118
                            ],
                            [
                                70.09143233299257,
                                23.136906967148136
                            ],
                            [
                                70.09554114484251,
                                23.13274310796055
                            ],
                            [
                                70.09963827825402,
                                23.130909652730676
                            ],
                            [
                                70.10088345630521,
                                23.127554553019095
                            ],
                            [
                                70.09946823120119,
                                23.122363841245967
                            ],
                            [
                                70.08929729461671,
                                23.107641514118967
                            ],
                            [
                                70.08368611595144,
                                23.109555919426167
                            ],
                            [
                                70.08299946662908,
                                23.10906253465565
                            ],
                            [
                                70.08180855921455,
                                23.10903304810404
                            ],
                            [
                                70.07221698760988,
                                23.11119396604795
                            ],
                            [
                                70.07040381431581,
                                23.111361718398285
                            ],
                            [
                                70.06756067276002,
                                23.113552347496388
                            ],
                            [
                                70.0610375404358,
                                23.114726588917915
                            ],
                            [
                                70.06075859069826,
                                23.117588142640578
                            ]
                        ]
                    ],
                    "type": "Polygon"
                },
                "externalId": null,
                "source": "FRETRON",
                "places": null,
                "viewport": null,
                "district": null,
                "name": "Welspun Anjar",
                "state": "GUJARAT",
                "category": "Parking",
                "subDistrict": "370110",
                "controllingBranchId": null
            },
            "controllingBranchId": null,
            "gateOutTime": 1693180786000,
            "status": "COMPLETED"
        }
    ],
    "remarks": null,
    "syncUpExpiryTime": null,
    "shipmentStatus": "Completed"
}
async function main() {
    let alert = {
        "closedBy": null,
        "createdAt": Date.now(),
        "issueId": null,
        "createdBy": null,
        "snoozTime": null,
        "description": "",
        "type": "shipment.disconnected.notification",
        "status": "OPEN",
        "updatedAt": 1693181986000
    }
    await updateSh(sh)
}
main()