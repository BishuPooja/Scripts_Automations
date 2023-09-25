const rp = require("request-promise")
const _ = require("lodash")
const { json } = require("stream/consumers")
const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODQ0NzU4MjksInVzZXJJZCI6ImJvdHVzZXItLTZlM2M5MGU4LWMwZTItNDhlYS1iNjc4LTlmNzZhOGRhZTk2YyIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTZlM2M5MGU4LWMwZTItNDhlYS1iNjc4LTlmNzZhOGRhZTk2YyIsIm9yZ0lkIjoiMDZhY2FjN2YtNTY5Ny00ZmVmLTlhNjEtZWVmNDdmNzUzNjdhIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.0Kk62vXUuI2VBWAwauBiluOAGrNX1DH93mhC45xklmI"
const $event = {
    "creationTime": 1685682624614,
    "customFields": [
        {
            "indexedValue": [
                "Total Distance_8.30"
            ],
            "fieldKey": "Total Distance",
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
            "value": "8.30",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Trip Type_Round Trip"
            ],
            "fieldKey": "Trip Type",
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
            "value": "Round Trip",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Vehicle Type_Covered Container"
            ],
            "fieldKey": "Vehicle Type",
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
            "value": "Covered Container",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Vendor Name_Mk Transport"
            ],
            "fieldKey": "Vendor Name",
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
            "value": "Mk Transport",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Mode_Dedicated"
            ],
            "fieldKey": "Mode",
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
            "value": "Dedicated",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Stock Type_Type 3"
            ],
            "fieldKey": "Stock Type",
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
            "value": "Type 3",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Vehicle Utilization_75.00%"
            ],
            "fieldKey": "Vehicle Utilization",
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
            "value": "75.00%",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Battery Percentage_40%"
            ],
            "fieldKey": "Battery Percentage",
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
            "value": "40%",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Covered Distance_3.19"
            ],
            "fieldKey": "Covered Distance",
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
            "value": "3.19",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Device Un-Lock Time_1685693644783"
            ],
            "fieldKey": "Device Un-Lock Time",
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
            "value": "1685693644783",
            "isRemark": false
        },
        {
            "indexedValue": [
                "TotalKmRun_10.94"
            ],
            "fieldKey": "TotalKmRun",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": "72aff6f6-26a7-49de-8a65-e5c90c6dd3bf",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "10.94",
            "isRemark": false
        },
        {
            "indexedValue": [
                "KmRun For Bill_0.0"
            ],
            "fieldKey": "KmRun For Bill",
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
            "value": "0.0",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Extra Kms_10.94"
            ],
            "fieldKey": "Extra Kms",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": "7211decf-95e9-4bcf-aa08-6bf634a2c615",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "10.94",
            "isRemark": false
        }
    ],
    "transportationMode": "ByRoad",
    "freightUnitLineItemId": null,
    "lastSyncUpTime": 1688798141788,
    "updates": {
        "traceID": "50755fa5-ba29-481a-a64a-b8923dc1376e",
        "resourceId": "608ee4d6-260b-4297-b7c0-3fd0905278c7",
        "updatedBy": "USER",
        "changes": null,
        "sourceOfInformation": null,
        "description": "Marked vehicle gate in at Noida-DC on 10:28 AM | 02-06-23",
        "forwardReasons": [
            "shipment.stageTiming.updated",
            "shipment.updated"
        ],
        "userId": "ebe5751a-a05b-46b6-91b4-1c112a90f638",
        "uuid": "2a7fc581-13c3-47b9-a6fd-0ac38578a50f",
        "revision": 235,
        "time": 1688798141779,
        "forwardedFrom": null,
        "resourceType": "ShipmentObject",
        "updateType": null
    },
    "isActive": false,
    "uuid": "608ee4d6-260b-4297-b7c0-3fd0905278c7",
    "issues": null,
    "branch": {
        "companyCode": null,
        "address": "A-25/1, Sahibabad, Ghaziabad, Uttar Pradesh 201010",
        "updatedBy": null,
        "customFields": null,
        "regionName": "Noida",
        "externalId": null,
        "branchName": null,
        "type": [
            "IT",
            "Operation"
        ],
        "updates": null,
        "orgId": "06acac7f-5697-4fef-9a61-eef47f75367a",
        "areaId": null,
        "geoLocation": null,
        "regionId": "474a0d12-2ade-4b1d-9113-5b43756c510c",
        "areaName": null,
        "name": "Noida DC",
        "zoneId": null,
        "_id": "2a988dd8-e9b5-4ea0-a80f-05e202bf26d5",
        "zoneName": null,
        "contacts": [],
        "officeType": null,
        "materialServices": null
    },
    "orgId": "06acac7f-5697-4fef-9a61-eef47f75367a",
    "shipmentType": "DirectLeg",
    "completionTime": 1686029753832,
    "routeId": null,
    "shipmentTrackingStatus": null,
    "lastForwardTime": 1688798141800,
    "runningStatus": null,
    "delayTrackingStatus": null,
    "delayReasonLastUpdateTime": null,
    "links": null,
    "shipmentDate": 1685644200000,
    "delayReason": null,
    "shipmentNumber": "2623193",
    "originalEdd": null,
    "edd": null,
    "delayReasonUpdateExpiryTime": null,
    "externalShipmentId": "2623193",
    "fleetInfo": {
        "isTrackingEnable": null,
        "forwardingAgent": null,
        "verificationStatus": null,
        "trackingMode": "VTS",
        "broker": {
            "geoFence": null,
            "documents": [],
            "customFields": null,
            "isPortalEnabled": false,
            "type": "vendor",
            "updates": null,
            "uuid": "587d5670-50af-4a8d-9f93-c6e146dfe183",
            "orgId": "06acac7f-5697-4fef-9a61-eef47f75367a",
            "firmType": "INDIVISUAL",
            "gstn": null,
            "voterId": null,
            "verificationTicketId": null,
            "companyCodes": null,
            "group": {
                "name": "lorryOwner",
                "partnerType": null,
                "uuid": null,
                "orgId": null
            },
            "address": "{\"pincode\":201301,\"address\":\"Noida\",\"city\":\"Noida\",\"state\":\"\"}",
            "verificationStatus": "unverified",
            "externalId": null,
            "panNumber": null,
            "aadharNo": null,
            "parentId": null,
            "places": null,
            "route": null,
            "name": "MK Transport",
            "location": null,
            "fretronId": null,
            "contacts": null,
            "status": "ACTIVE"
        },
        "uuid": "0815a533-c40c-4ae9-b04b-e2343d1100bb",
        "orgId": null,
        "vehicle": {
            "vtsDeviceId": null,
            "kmDriven": null,
            "secondaryDriverId": null,
            "attachedDocs": [],
            "customFields": [
                {
                    "indexedValue": [
                        "PassingCapacity_3"
                    ],
                    "fieldKey": "PassingCapacity",
                    "valueType": "string",
                    "fieldType": "number",
                    "value": "3",
                    "definitionId": null
                },
                {
                    "indexedValue": [
                        "Charge Mechanism_RCM"
                    ],
                    "fieldKey": "Charge Mechanism",
                    "valueType": "string",
                    "fieldType": "select",
                    "value": "RCM",
                    "definitionId": "4aeebfdf-95f4-4e0c-a821-63284cad688f"
                },
                {
                    "indexedValue": [
                        "Is GST Exempted?_No"
                    ],
                    "fieldKey": "Is GST Exempted?",
                    "valueType": "string",
                    "fieldType": "yes-no",
                    "value": "No",
                    "definitionId": "a16da455-bac4-4dd1-bebc-14f8e96fde61"
                },
                {
                    "indexedValue": [
                        "GST Rate_0%"
                    ],
                    "fieldKey": "GST Rate",
                    "valueType": "string",
                    "fieldType": "radio-button",
                    "value": "0%",
                    "definitionId": "ab239921-e436-434d-9bd6-c5f16321ee5e"
                },
                {
                    "indexedValue": [
                        "Line of Business_BBN"
                    ],
                    "fieldKey": "Line of Business",
                    "valueType": "string",
                    "fieldType": "select",
                    "value": "BBN",
                    "definitionId": "93c09ff1-c637-4a87-9d91-814d07216dc7"
                },
                {
                    "indexedValue": [
                        "Fleet Type_Dedicated"
                    ],
                    "fieldKey": "Fleet Type",
                    "valueType": "string",
                    "fieldType": "select",
                    "value": "Dedicated",
                    "definitionId": "63ae845f-de79-4dd2-99d2-20b44e9ac820"
                }
            ],
            "floorType": null,
            "description": null,
            "source": "FRETRON",
            "isTrackingEnabled": false,
            "updates": null,
            "uuid": null,
            "branch": {
                "companyCode": null,
                "address": "A-25/1, Sahibabad, Ghaziabad, Uttar Pradesh 201010",
                "updatedBy": null,
                "customFields": null,
                "regionName": "Noida",
                "externalId": null,
                "branchName": null,
                "type": [
                    "IT",
                    "Operation"
                ],
                "updates": null,
                "orgId": "06acac7f-5697-4fef-9a61-eef47f75367a",
                "areaId": null,
                "geoLocation": null,
                "regionId": "474a0d12-2ade-4b1d-9113-5b43756c510c",
                "areaName": null,
                "name": "Noida DC",
                "zoneId": null,
                "_id": "2a988dd8-e9b5-4ea0-a80f-05e202bf26d5",
                "zoneName": null,
                "contacts": [],
                "officeType": null,
                "materialServices": null
            },
            "orgId": "06acac7f-5697-4fef-9a61-eef47f75367a",
            "vehicleLoadType": {
                "bodyType": "Close",
                "passingCapacityMT": 3,
                "minLength": 0,
                "updates": {
                    "traceID": null,
                    "resourceId": "0f27a355-3251-45f2-b0ca-30d8cae54e69",
                    "updatedBy": "USER",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": "Updated Load Type , Vehicle Category.",
                    "forwardReasons": [
                        "load.type.updated.event"
                    ],
                    "userId": "1d9a79bc-9747-435e-a265-b0552a880d2d",
                    "uuid": "9d20e7dd-6df0-45f8-9f64-17bea60384cc",
                    "revision": null,
                    "time": 1684328090322,
                    "forwardedFrom": null,
                    "resourceType": "LoadTypes",
                    "updateType": null
                },
                "vehicleCategories": [],
                "uuid": "0f27a355-3251-45f2-b0ca-30d8cae54e69",
                "orgId": "06acac7f-5697-4fef-9a61-eef47f75367a",
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
                "chassisType": "Truck",
                "includeMinHeight": false,
                "name": "14Ft",
                "partnerId": null,
                "includeMaxHeight": false,
                "dimensionString": null,
                "maxLength": -1
            },
            "associatedWith": null,
            "isDeleted": null,
            "customerId": null,
            "vehicleModel": "",
            "mileageEmpty": null,
            "mileageLoaded": null,
            "vehicleType": "hire",
            "groups": null,
            "externalId": null,
            "updateTime": 1685337352297,
            "sharedWith": [],
            "baseLocationId": null,
            "vehicleMake": null,
            "vehicleRegistrationNumber": "DL01LY9541",
            "chassisNumber": "",
            "driverId": null,
            "createTime": null,
            "loadCapacity": 3,
            "truckLength": null,
            "category": "14Ft",
            "groupsExtended": []
        },
        "driver": null,
        "fleetType": "Market",
        "fleetOwner": {
            "geoFence": null,
            "documents": [],
            "customFields": null,
            "isPortalEnabled": false,
            "type": "vendor",
            "updates": null,
            "uuid": "587d5670-50af-4a8d-9f93-c6e146dfe183",
            "orgId": "06acac7f-5697-4fef-9a61-eef47f75367a",
            "firmType": "INDIVISUAL",
            "gstn": null,
            "voterId": null,
            "verificationTicketId": null,
            "companyCodes": null,
            "group": {
                "name": "lorryOwner",
                "partnerType": null,
                "uuid": null,
                "orgId": null
            },
            "address": "{\"pincode\":201301,\"address\":\"Noida\",\"city\":\"Noida\",\"state\":\"\"}",
            "verificationStatus": "unverified",
            "externalId": null,
            "panNumber": null,
            "aadharNo": null,
            "parentId": null,
            "places": null,
            "route": null,
            "name": "MK Transport",
            "location": null,
            "fretronId": null,
            "contacts": null,
            "status": "ACTIVE"
        },
        "trainInfo": null,
        "lbsNumber": null,
        "secondaryDriver": null,
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
            "type": null,
            "updates": null,
            "uuid": "5471388b-c80e-42c3-bffd-0ebbc3798a4b",
            "orgId": "06acac7f-5697-4fef-9a61-eef47f75367a",
            "attachedResourceId": null,
            "isDeleted": null,
            "createTime": null,
            "serviceProvider": null,
            "imei": "838067731071",
            "usedBy": null,
            "status": null
        },
        "status": null
    },
    "syncUpDueTime": null,
    "billingStatus": "UnSettled",
    "currentLocation": {
        "isFillingEnabled": false,
        "address": null,
        "lngLat": [
            77.448352,
            28.532262
        ],
        "odometer": null,
        "latitude": 28.532262,
        "course": 103,
        "imei": "838067731071",
        "decoder": "elock",
        "time": 1685690930000,
        "vehicleId": null,
        "speed": 214,
        "longitude": 77.448352
    },
    "alerts": [],
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
            "departureTime": 1685683334000,
            "gateInTime": 1685681939000,
            "actualActivityStartTime": 1685681940000,
            "actualActivityEndTime": 1685682300000,
            "uuid": "9263cd27-1939-4d80-b174-428b39e107bd",
            "consignmentDelivered": null,
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": null,
            "hub": null,
            "arrivalTime": 1685682633000,
            "expectedActivityStartTime": null,
            "secondaryStatus": null,
            "consignmentPickUps": [
                "f5151e68-1c0d-432e-9ad2-6b83c787d786"
            ],
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": 1685682711101,
                "purpose": "Pickup",
                "plannedArrival": null,
                "currentGpsState": {
                    "numberOfRecord": 3,
                    "totalTime": 917000,
                    "averageSpeeds": 2.0062009824457614,
                    "eventType": "StateDetected",
                    "uuid": "c8e7f3bd-1030-4de5-8d2a-3be090c47872",
                    "isDisconnected": false,
                    "startLocation": {
                        "isFillingEnabled": false,
                        "address": "Dadri Main Rd, Ecotech III, Greater Noida, Uttar Pradesh 201306, India",
                        "lngLat": [
                            77.447232,
                            28.532539999999997
                        ],
                        "odometer": null,
                        "latitude": 28.532539999999997,
                        "course": 356,
                        "imei": "838067731071",
                        "decoder": "elock",
                        "time": 1685682417000,
                        "vehicleId": null,
                        "speed": 0,
                        "longitude": 77.447232
                    },
                    "isNoGpsZone": false,
                    "mean": {
                        "isFillingEnabled": false,
                        "address": "Dadri Main Rd, Ecotech III, Greater Noida, Uttar Pradesh 201306, India",
                        "lngLat": [
                            77.44385333333334,
                            28.533191999999996
                        ],
                        "odometer": null,
                        "latitude": 28.533191999999996,
                        "course": null,
                        "imei": "",
                        "decoder": null,
                        "time": 1685683027666,
                        "vehicleId": "",
                        "speed": 0,
                        "longitude": 77.44385333333334
                    },
                    "imei": "838067731071",
                    "startTime": 1685682417000,
                    "endTime": 1685683334000,
                    "vehicleId": null,
                    "state": "Moving",
                    "totalDistance": 511.0239724729898,
                    "endLocation": {
                        "isFillingEnabled": false,
                        "address": "Dadri Main Rd, Jalpura, Greater Noida, Uttar Pradesh 201306, India",
                        "lngLat": [
                            77.442128,
                            28.533521999999998
                        ],
                        "odometer": null,
                        "latitude": 28.533521999999998,
                        "course": 265,
                        "imei": "838067731071",
                        "decoder": "elock",
                        "time": 1685683334000,
                        "vehicleId": null,
                        "speed": 70,
                        "longitude": 77.442128
                    }
                },
                "updates": {
                    "traceID": "vehiclegpsstatetopic_11_17651570",
                    "resourceId": "9263cd27-1939-4d80-b174-428b39e107bd",
                    "updatedBy": "SYSTEM",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": "From AT to COMPLETED",
                    "forwardReasons": [
                        "trippoint.current.location.updated",
                        "gps.state.detected"
                    ],
                    "userId": null,
                    "uuid": "9a62add9-29e4-4b36-8663-fd079a5c9461",
                    "revision": 1,
                    "time": 1685683349557,
                    "forwardedFrom": null,
                    "resourceType": "TripPoint",
                    "updateType": null
                },
                "uuid": "9263cd27-1939-4d80-b174-428b39e107bd",
                "sequenceId": null,
                "isDisconnected": false,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": 5000,
                "eta": null,
                "routeId": null,
                "expectedActivityStartTime": null,
                "actualDeparture": 1685683334000,
                "vehicleId": "838067731071",
                "place": {
                    "hubId": null,
                    "boundary": null,
                    "address": "Dadri Main Rd, Ecotech III, Greater Noida, Uttar Pradesh 201306, India",
                    "accessibility": "public",
                    "addedBy": "06acac7f-5697-4fef-9a61-eef47f75367a",
                    "center": {
                        "latitude": 28.533540873967606,
                        "longitude": 77.4478201571039
                    },
                    "suggestedRadius": 168,
                    "isOwned": false,
                    "centerCoordinates": [
                        77.4478201571039,
                        28.533540873967606
                    ],
                    "placeId": "3f5d040d-d855-415d-a3a1-025a19f56a1b",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "FRETRON",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "Noida-DC",
                    "state": null,
                    "category": "DC",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "remainingDistance": 125.38888697801274,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "9263cd27-1939-4d80-b174-428b39e107bd"
                ],
                "actualActivityEndTime": 1685683334000,
                "actualArrival": 1685682633787,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": {
                    "isFillingEnabled": false,
                    "address": "Dadri Main Rd, Jalpura, Greater Noida, Uttar Pradesh 201306, India",
                    "lngLat": [
                        77.442128,
                        28.533521999999998
                    ],
                    "odometer": null,
                    "latitude": 28.533521999999998,
                    "course": 265,
                    "imei": "838067731071",
                    "decoder": "elock",
                    "time": 1685683334000,
                    "vehicleId": null,
                    "speed": 70,
                    "longitude": 77.442128
                },
                "isAutoCompleted": true,
                "coveredDistance": 1.3628020892993644,
                "hub": {
                    "hubId": null,
                    "boundary": null,
                    "address": "Dadri Main Rd, Ecotech III, Greater Noida, Uttar Pradesh 201306, India",
                    "accessibility": "public",
                    "addedBy": "06acac7f-5697-4fef-9a61-eef47f75367a",
                    "center": {
                        "latitude": 28.533540873967606,
                        "longitude": 77.4478201571039
                    },
                    "suggestedRadius": 168,
                    "isOwned": false,
                    "centerCoordinates": [
                        77.4478201571039,
                        28.533540873967606
                    ],
                    "placeId": "3f5d040d-d855-415d-a3a1-025a19f56a1b",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "FRETRON",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "Noida-DC",
                    "state": null,
                    "category": "DC",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "imei": "838067731071",
                "assosiatedShipmentsId": [
                    "608ee4d6-260b-4297-b7c0-3fd0905278c7"
                ],
                "status": "COMPLETED"
            },
            "place": {
                "hubId": null,
                "boundary": null,
                "address": "Dadri Main Rd, Ecotech III, Greater Noida, Uttar Pradesh 201306, India",
                "accessibility": "public",
                "addedBy": "06acac7f-5697-4fef-9a61-eef47f75367a",
                "center": {
                    "latitude": 28.533540873967606,
                    "longitude": 77.4478201571039
                },
                "suggestedRadius": 168,
                "isOwned": false,
                "centerCoordinates": [
                    77.4478201571039,
                    28.533540873967606
                ],
                "placeId": "3f5d040d-d855-415d-a3a1-025a19f56a1b",
                "geoJsonBoundry": null,
                "externalId": null,
                "source": "FRETRON",
                "places": null,
                "viewport": null,
                "district": null,
                "name": "Noida-DC",
                "state": null,
                "category": "DC",
                "subDistrict": null,
                "controllingBranchId": null
            },
            "controllingBranchId": null,
            "gateOutTime": null,
            "status": "COMPLETED"
        },
        {
            "departureTime": 1685690341000,
            "gateInTime": null,
            "actualActivityStartTime": null,
            "actualActivityEndTime": null,
            "uuid": "4ecd3211-0f9c-4178-9a0e-46038f0e8aad",
            "consignmentDelivered": [
                "f5151e68-1c0d-432e-9ad2-6b83c787d786"
            ],
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": null,
            "hub": null,
            "arrivalTime": 1685684144000,
            "expectedActivityStartTime": null,
            "secondaryStatus": null,
            "consignmentPickUps": [
                "77353808-657c-4e9f-a6b6-e27059d7dbb9"
            ],
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": 1685683350009,
                "purpose": "Delivery",
                "plannedArrival": null,
                "currentGpsState": {
                    "numberOfRecord": 49,
                    "totalTime": 208000,
                    "averageSpeeds": 11.997482899346004,
                    "eventType": "StateUpdated",
                    "uuid": "2a7b419b-79f7-4fb3-8d3c-b194990523be",
                    "isDisconnected": false,
                    "startLocation": {
                        "isFillingEnabled": false,
                        "address": "I-Area,A-4A, Pusta Road, Block A, Sector 80, Noida, Uttar Pradesh 201305, India",
                        "lngLat": [
                            77.412272,
                            28.558636
                        ],
                        "odometer": null,
                        "latitude": 28.558636,
                        "course": 0,
                        "imei": "838067731071",
                        "decoder": "elock",
                        "time": 1685690133000,
                        "vehicleId": null,
                        "speed": 0,
                        "longitude": 77.412272
                    },
                    "isNoGpsZone": false,
                    "mean": {
                        "isFillingEnabled": false,
                        "address": "",
                        "lngLat": [
                            77.41246106122452,
                            28.557724530612234
                        ],
                        "odometer": null,
                        "latitude": 28.557724530612234,
                        "course": null,
                        "imei": "",
                        "decoder": null,
                        "time": 1685690264702,
                        "vehicleId": "",
                        "speed": 0,
                        "longitude": 77.41246106122452
                    },
                    "imei": "838067731071",
                    "startTime": 1685690133000,
                    "endTime": 1685690341000,
                    "vehicleId": null,
                    "state": "Moving",
                    "totalDistance": 693.1879008511024,
                    "endLocation": {
                        "isFillingEnabled": false,
                        "address": null,
                        "lngLat": [
                            77.412984,
                            28.553174
                        ],
                        "odometer": null,
                        "latitude": 28.553174,
                        "course": 177,
                        "imei": "838067731071",
                        "decoder": "elock",
                        "time": 1685690341000,
                        "vehicleId": null,
                        "speed": 151,
                        "longitude": 77.412984
                    }
                },
                "updates": {
                    "traceID": "vehiclegpsstatetopic_11_17662099",
                    "resourceId": "4ecd3211-0f9c-4178-9a0e-46038f0e8aad",
                    "updatedBy": "SYSTEM",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": "From AT to COMPLETED",
                    "forwardReasons": [
                        "trippoint.current.location.updated",
                        "gps.state.updated"
                    ],
                    "userId": null,
                    "uuid": "0a9e145a-0b80-4b25-8caa-3c14ecff5949",
                    "revision": 35,
                    "time": 1685690653984,
                    "forwardedFrom": null,
                    "resourceType": "TripPoint",
                    "updateType": null
                },
                "uuid": "4ecd3211-0f9c-4178-9a0e-46038f0e8aad",
                "sequenceId": null,
                "isDisconnected": false,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": 5000,
                "eta": null,
                "routeId": null,
                "expectedActivityStartTime": null,
                "actualDeparture": 1685690341000,
                "vehicleId": "838067731071",
                "place": {
                    "hubId": null,
                    "boundary": null,
                    "address": "D003, Phase-2, Sector 80, NoidaNoida-",
                    "accessibility": "public",
                    "addedBy": "06acac7f-5697-4fef-9a61-eef47f75367a",
                    "center": {
                        "latitude": 28.558334717901,
                        "longitude": 77.412751816671
                    },
                    "suggestedRadius": 500,
                    "isOwned": true,
                    "centerCoordinates": [
                        77.412751816671,
                        28.558334717901
                    ],
                    "placeId": "9c534c1a-b45a-4f3b-85ae-c2fa04f171cf",
                    "geoJsonBoundry": null,
                    "externalId": "",
                    "source": "FRETRON",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "Noida Sec 80",
                    "state": null,
                    "category": "5K",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "remainingDistance": 0,
                "actualActivityStartTime": 1685684144000,
                "forShipmentStages": [
                    "4ecd3211-0f9c-4178-9a0e-46038f0e8aad"
                ],
                "actualActivityEndTime": 1685690341000,
                "actualArrival": 1685684144000,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": {
                    "isFillingEnabled": false,
                    "address": null,
                    "lngLat": [
                        77.412984,
                        28.553174
                    ],
                    "odometer": null,
                    "latitude": 28.553174,
                    "course": 177,
                    "imei": "838067731071",
                    "decoder": "elock",
                    "time": 1685690341000,
                    "vehicleId": null,
                    "speed": 151,
                    "longitude": 77.412984
                },
                "isAutoCompleted": true,
                "coveredDistance": 3191.7924094305304,
                "hub": null,
                "imei": "838067731071",
                "assosiatedShipmentsId": [
                    "608ee4d6-260b-4297-b7c0-3fd0905278c7"
                ],
                "status": "COMPLETED"
            },
            "place": {
                "hubId": null,
                "boundary": null,
                "address": "D003, Phase-2, Sector 80, NoidaNoida-",
                "accessibility": "public",
                "addedBy": "06acac7f-5697-4fef-9a61-eef47f75367a",
                "center": {
                    "latitude": 28.558334717901,
                    "longitude": 77.412751816671
                },
                "suggestedRadius": 500,
                "isOwned": true,
                "centerCoordinates": [
                    77.412751816671,
                    28.558334717901
                ],
                "placeId": "9c534c1a-b45a-4f3b-85ae-c2fa04f171cf",
                "geoJsonBoundry": null,
                "externalId": "",
                "source": "FRETRON",
                "places": null,
                "viewport": null,
                "district": null,
                "name": "Noida Sec 80",
                "state": null,
                "category": "5K",
                "subDistrict": null,
                "controllingBranchId": null
            },
            "controllingBranchId": null,
            "gateOutTime": null,
            "status": "COMPLETED"
        },
        {
            "departureTime": 1685907469191,
            "gateInTime": 1685907463534,
            "actualActivityStartTime": 1685907463535,
            "actualActivityEndTime": 1685907466839,
            "uuid": "99042767-db37-468a-a649-f60c518f1c56",
            "consignmentDelivered": [
                "77353808-657c-4e9f-a6b6-e27059d7dbb9"
            ],
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": null,
            "hub": null,
            "arrivalTime": 1685693641802,
            "expectedActivityStartTime": null,
            "secondaryStatus": null,
            "consignmentPickUps": null,
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": 1685693636718,
                "purpose": "Delivery",
                "plannedArrival": null,
                "currentGpsState": {
                    "numberOfRecord": 19,
                    "totalTime": 155721035,
                    "averageSpeeds": 0.0033117349042540226,
                    "eventType": "StateUpdated",
                    "uuid": "1d949493-56ff-4ea9-a7d9-75430b5aec7b",
                    "isDisconnected": false,
                    "startLocation": {
                        "isFillingEnabled": false,
                        "address": "Dadri Main Rd, Ecotech III, Greater Noida, Uttar Pradesh 201306, India",
                        "lngLat": [
                            77.447656,
                            28.53266
                        ],
                        "odometer": null,
                        "latitude": 28.53266,
                        "course": 0,
                        "imei": "838067731071",
                        "decoder": "elock",
                        "time": 1685709371000,
                        "vehicleId": null,
                        "speed": 6,
                        "longitude": 77.447656
                    },
                    "isNoGpsZone": false,
                    "mean": {
                        "isFillingEnabled": false,
                        "address": "",
                        "lngLat": [
                            77.44711199999999,
                            28.532344000000027
                        ],
                        "odometer": null,
                        "latitude": 28.532344000000027,
                        "course": null,
                        "imei": "",
                        "decoder": null,
                        "time": 1685828068642,
                        "vehicleId": "",
                        "speed": 0,
                        "longitude": 77.44711199999999
                    },
                    "imei": "838067731071",
                    "startTime": 1685709371000,
                    "endTime": 1685865092035,
                    "vehicleId": null,
                    "state": "Stopped",
                    "totalDistance": 109.48779578736256,
                    "endLocation": {
                        "isFillingEnabled": false,
                        "address": null,
                        "lngLat": [
                            77.44711199999999,
                            28.532344
                        ],
                        "odometer": null,
                        "latitude": 28.532344,
                        "course": 0,
                        "imei": "838067731071",
                        "decoder": "elock",
                        "time": 1685828389000,
                        "vehicleId": null,
                        "speed": 23,
                        "longitude": 77.44711199999999
                    }
                },
                "updates": {
                    "traceID": "scheduledTaskTopic_4_1470231",
                    "resourceId": "99042767-db37-468a-a649-f60c518f1c56",
                    "updatedBy": "SYSTEM",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": null,
                    "forwardReasons": [
                        "trippoint.disconnection.updated"
                    ],
                    "userId": null,
                    "uuid": "3a16a48d-2f74-47a0-982e-8f537b3c1f4f",
                    "revision": 420,
                    "time": 1685867271092,
                    "forwardedFrom": null,
                    "resourceType": "TripPoint",
                    "updateType": null
                },
                "uuid": "99042767-db37-468a-a649-f60c518f1c56",
                "sequenceId": null,
                "isDisconnected": true,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": null,
                "eta": null,
                "routeId": null,
                "expectedActivityStartTime": null,
                "actualDeparture": null,
                "vehicleId": "838067731071",
                "place": {
                    "hubId": null,
                    "boundary": null,
                    "address": "Dadri Main Rd, Ecotech III, Greater Noida, Uttar Pradesh 201306, India",
                    "accessibility": "public",
                    "addedBy": "06acac7f-5697-4fef-9a61-eef47f75367a",
                    "center": {
                        "latitude": 28.533540873967606,
                        "longitude": 77.4478201571039
                    },
                    "suggestedRadius": 168,
                    "isOwned": false,
                    "centerCoordinates": [
                        77.4478201571039,
                        28.533540873967606
                    ],
                    "placeId": "3f5d040d-d855-415d-a3a1-025a19f56a1b",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "FRETRON",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "Noida-DC",
                    "state": null,
                    "category": "DC",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "remainingDistance": 0,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "99042767-db37-468a-a649-f60c518f1c56"
                ],
                "actualActivityEndTime": null,
                "actualArrival": 1685693641802,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": null,
                "isAutoCompleted": false,
                "coveredDistance": 5970.806712485242,
                "hub": null,
                "imei": "838067731071",
                "assosiatedShipmentsId": [
                    "608ee4d6-260b-4297-b7c0-3fd0905278c7"
                ],
                "status": "COMPLETED"
            },
            "place": {
                "hubId": null,
                "boundary": null,
                "address": "Dadri Main Rd, Ecotech III, Greater Noida, Uttar Pradesh 201306, India",
                "accessibility": "public",
                "addedBy": "06acac7f-5697-4fef-9a61-eef47f75367a",
                "center": {
                    "latitude": 28.533540873967606,
                    "longitude": 77.4478201571039
                },
                "suggestedRadius": 168,
                "isOwned": false,
                "centerCoordinates": [
                    77.4478201571039,
                    28.533540873967606
                ],
                "placeId": "3f5d040d-d855-415d-a3a1-025a19f56a1b",
                "geoJsonBoundry": null,
                "externalId": null,
                "source": "FRETRON",
                "places": null,
                "viewport": null,
                "district": null,
                "name": "Noida-DC",
                "state": null,
                "category": "5K",
                "subDistrict": null,
                "controllingBranchId": null
            },
            "controllingBranchId": null,
            "gateOutTime": null,
            "status": "COMPLETED"
        },

        {
            "departureTime": 1685907469191,
            "gateInTime": 1685907463534,
            "actualActivityStartTime": 1685907463535,
            "actualActivityEndTime": 1685907466839,
            "uuid": "99042767-db37-468a-a649-f60c518f1c56",
            "consignmentDelivered": [
                "77353808-657c-4e9f-a6b6-e27059d7dbb9"
            ],
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": null,
            "hub": null,
            "arrivalTime": 1685693641802,
            "expectedActivityStartTime": null,
            "secondaryStatus": null,
            "consignmentPickUps": null,
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": 1685693636718,
                "purpose": "Delivery",
                "plannedArrival": null,
                "currentGpsState": {
                    "numberOfRecord": 19,
                    "totalTime": 155721035,
                    "averageSpeeds": 0.0033117349042540226,
                    "eventType": "StateUpdated",
                    "uuid": "1d949493-56ff-4ea9-a7d9-75430b5aec7b",
                    "isDisconnected": false,
                    "startLocation": {
                        "isFillingEnabled": false,
                        "address": "Dadri Main Rd, Ecotech III, Greater Noida, Uttar Pradesh 201306, India",
                        "lngLat": [
                            77.447656,
                            28.53266
                        ],
                        "odometer": null,
                        "latitude": 28.53266,
                        "course": 0,
                        "imei": "838067731071",
                        "decoder": "elock",
                        "time": 1685709371000,
                        "vehicleId": null,
                        "speed": 6,
                        "longitude": 77.447656
                    },
                    "isNoGpsZone": false,
                    "mean": {
                        "isFillingEnabled": false,
                        "address": "",
                        "lngLat": [
                            77.44711199999999,
                            28.532344000000027
                        ],
                        "odometer": null,
                        "latitude": 28.532344000000027,
                        "course": null,
                        "imei": "",
                        "decoder": null,
                        "time": 1685828068642,
                        "vehicleId": "",
                        "speed": 0,
                        "longitude": 77.44711199999999
                    },
                    "imei": "838067731071",
                    "startTime": 1685709371000,
                    "endTime": 1685865092035,
                    "vehicleId": null,
                    "state": "Stopped",
                    "totalDistance": 109.48779578736256,
                    "endLocation": {
                        "isFillingEnabled": false,
                        "address": null,
                        "lngLat": [
                            77.44711199999999,
                            28.532344
                        ],
                        "odometer": null,
                        "latitude": 28.532344,
                        "course": 0,
                        "imei": "838067731071",
                        "decoder": "elock",
                        "time": 1685828389000,
                        "vehicleId": null,
                        "speed": 23,
                        "longitude": 77.44711199999999
                    }
                },
                "updates": {
                    "traceID": "scheduledTaskTopic_4_1470231",
                    "resourceId": "99042767-db37-468a-a649-f60c518f1c56",
                    "updatedBy": "SYSTEM",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": null,
                    "forwardReasons": [
                        "trippoint.disconnection.updated"
                    ],
                    "userId": null,
                    "uuid": "3a16a48d-2f74-47a0-982e-8f537b3c1f4f",
                    "revision": 420,
                    "time": 1685867271092,
                    "forwardedFrom": null,
                    "resourceType": "TripPoint",
                    "updateType": null
                },
                "uuid": "99042767-db37-468a-a649-f60c518f1c56",
                "sequenceId": null,
                "isDisconnected": true,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": null,
                "eta": null,
                "routeId": null,
                "expectedActivityStartTime": null,
                "actualDeparture": null,
                "vehicleId": "838067731071",
                "place": {
                    "hubId": null,
                    "boundary": null,
                    "address": "Dadri Main Rd, Ecotech III, Greater Noida, Uttar Pradesh 201306, India",
                    "accessibility": "public",
                    "addedBy": "06acac7f-5697-4fef-9a61-eef47f75367a",
                    "center": {
                        "latitude": 28.533540873967606,
                        "longitude": 77.4478201571039
                    },
                    "suggestedRadius": 168,
                    "isOwned": false,
                    "centerCoordinates": [
                        77.4478201571039,
                        28.533540873967606
                    ],
                    "placeId": "3f5d040d-d855-415d-a3a1-025a19f56a1b",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "FRETRON",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "Noida-DC",
                    "state": null,
                    "category": "DC",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "remainingDistance": 0,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "99042767-db37-468a-a649-f60c518f1c56"
                ],
                "actualActivityEndTime": null,
                "actualArrival": 1685693641802,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": null,
                "isAutoCompleted": false,
                "coveredDistance": 5970.806712485242,
                "hub": null,
                "imei": "838067731071",
                "assosiatedShipmentsId": [
                    "608ee4d6-260b-4297-b7c0-3fd0905278c7"
                ],
                "status": "COMPLETED"
            },
            "place": {
                "hubId": null,
                "boundary": null,
                "address": "Dadri Main Rd, Ecotech III, Greater Noida, Uttar Pradesh 201306, India",
                "accessibility": "public",
                "addedBy": "06acac7f-5697-4fef-9a61-eef47f75367a",
                "center": {
                    "latitude": 28.533540873967606,
                    "longitude": 77.4478201571039
                },
                "suggestedRadius": 168,
                "isOwned": false,
                "centerCoordinates": [
                    77.4478201571039,
                    28.533540873967606
                ],
                "placeId": "3f5d040d-d855-415d-a3a1-025a19f56a1b",
                "geoJsonBoundry": null,
                "externalId": null,
                "source": "FRETRON",
                "places": null,
                "viewport": null,
                "district": null,
                "name": "Noida-oC",
                "state": null,
                "category": "4K",
                "subDistrict": null,
                "controllingBranchId": null
            },
            "controllingBranchId": null,
            "gateOutTime": null,
            "status": "COMPLETED"
        }
    ],
    "remarks": null,
    "syncUpExpiryTime": null,
    "shipmentStatus": "Completed"
}


let cost_customField = {
    fieldKey: "splitted Extra Per Km and Toll Cost",
    multiple: false,
    description: "",
    remark: "",
    required: false,
    accessType: null,
    input: "text",
    unit: "",
    valueType: "string",
    options: [],
    fieldType: "text",
    value: null,
    isRemark: false,
};

async function getShCostById(shId) {
    let url = `https://apis.fretron.com/shipment-cost/v1/costs?shipmentId=${shId}`
    try {
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })
        if (res?.status == 200) {
            return res.data
        } else {
            console.log(`Getting shipment cost by id ${shId} error : ${res?.error}`)
        }
    } catch (e) {
        console.log(`Catched error in getting shipmentCost by id ${shId} : ${e.message}`)
    }
    return null
}

function getJsonCostWise(categoryArr, cost) {
    let json = {}
    for (let item of categoryArr) {
        json[item] = parseFloat((cost / categoryArr.length).toFixed(2))
    }
    return json
}

async function bulkSyncApi(payload) {
    let url = `https://apis.fretron.com/shipment/v1/shipment/bulk/sync`;
    try {
        let res = await rp({
            method: "POST",
            uri: url,
            body: payload,
            headers: {
                Authorization: TOKEN,
            },
            json: true,
        });
        console.log(`Bulk Sync api response status : ${res.status}`);
        if (res.status == 200) {
            return res.data;
        } else {
            console.log(`Bulk Sync api response error : ${res.error}`);
        }
    } catch (e) {
        console.log(`Catched Error in Bulk Sync api : ${e.message}`);
    }
    return null;
}

async function main(sh) {
    try {
        let placeJson = { "Extra per Km": null, "Toll": null }
        let shipmentNo = sh?.shipmentNumber
        console.log(`Shipment No : ${shipmentNo}`)
        let shStage = sh?.shipmentStages ?? []
        let shId = sh?.uuid
        let placeCategory = []
        let shCosts = await getShCostById(shId)
        let shCostExtraPerKm = shCosts?.find((v) => v.charge.name == "Extra per Km")?.amount ?? null
        let shCostToll = shCosts?.find((v) => v.charge.name == "Toll")?.amount ?? null
        for (let item of shStage) {
            let category = item?.place?.category ?? null
            let placeName = item?.place?.name ?? null
            if (category == "DC") {
                continue
            }
            placeCategory.push(`${placeName}_${category}`)
        }
        placeCategory = placeCategory ? _.uniq(placeCategory) : []
        if (shCostExtraPerKm && placeCategory) {
            let jsonExtraKm = getJsonCostWise(placeCategory, shCostExtraPerKm)
            placeJson["Extra per Km"] = jsonExtraKm
        }
        else {
            console.log(`Extra per km Charge Not exist for ${shipmentNo}`)
        }
        if (shCostToll && placeCategory) {
            let jsonToll = getJsonCostWise(placeCategory, shCostToll)
            placeJson["Toll"] = jsonToll
        } else {
            console.log(`Toll Charge Not exist for sh ${shipmentNo}`)
        }
        if (placeJson["Extra per Km"] || placeJson["Toll"]) {
            // add cf
            placeJson = JSON.stringify(placeJson)
            cost_customField.value = placeJson
            let payload = {
                shipmentId: shId,
                updates: [
                    {
                        keyToUpdate: "customfields",
                        updatedValue: [cost_customField],
                    },
                ],
            };
            await bulkSyncApi(payload)
        }
        else {
            console.log(`No value found for Adding Cf ${shipmentNo}`)
        }
        return "All Ok"
    }
    catch (e) {
        console.log(`Error in Main ${e.message}`)
    }
}

try {
    main($event)
}
catch (e) {
    console.log(`error in calling main ${e.message}`)
}