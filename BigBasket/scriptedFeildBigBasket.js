const moment = require('moment');
var _f = function (record) {
    let sh = record
    let departureTime = sh.shipmentStages != null ? sh.shipmentStages.length > 1 ? sh.shipmentStages[sh.shipmentStages.length - 1].departureTime : null : null

    let arrivalTime = sh.shipmentStages != null ? sh.shipmentStages.length > 1 ? sh.shipmentStages[sh.shipmentStages.length - 1].arrivalTime : null : null
    let milliseconds = departureTime - arrivalTime
    let hours = Math.floor(milliseconds / 3600000);
    let minutes = Math.floor((milliseconds % 3600000) / 60000);
    let differnce = hours + ":" + minutes
    console.log(differnce)
    return differnce ?? ""

}
let sh = {
    "creationTime": 1686300067021,
    "customFields": [
        {
            "indexedValue": [
                "Trip Type_Multi City Trip"
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
            "value": "Multi City Trip",
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
            "indexedValue": [],
            "fieldKey": "E-Lock Image Upload",
            "multiple": true,
            "description": "",
            "remark": "",
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "",
            "unit": "",
            "valueType": "arrayOfJson",
            "options": [],
            "fieldType": "camera",
            "value": null,
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
                "Vendor Name_BABA HARIDASS CARRIER"
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
            "value": "BABA HARIDASS CARRIER",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Stock Type_FMCG-F1"
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
            "value": "FMCG-F1",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Vehicle Utilization_100.00%"
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
            "value": "100.00%",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Battery Percentage_43%"
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
            "value": "43%",
            "isRemark": false
        },
        {
            "indexedValue": [
                "VehicleAtSamePosition_1686317745228"
            ],
            "fieldKey": "VehicleAtSamePosition",
            "multiple": false,
            "description": "Vehicle At Same Position",
            "remark": "",
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "date",
            "value": "1686317745228",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Device Un-Lock Time_1686326066440"
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
            "value": "1686326066440",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Covered Distance_48.58"
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
            "value": "48.58",
            "isRemark": false
        },
        {
            "indexedValue": [
                "TotalKmRun_53.33"
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
            "value": "53.33",
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
        }
    ],
    "transportationMode": "ByRoad",
    "freightUnitLineItemId": null,
    "lastSyncUpTime": 1686380526490,
    "updates": {
        "traceID": "24945852-e1ca-480a-a01e-2482ddb69097",
        "resourceId": "05b92dd1-2ce1-42cf-8ea1-de7fe1cd7df1",
        "updatedBy": "USER",
        "changes": null,
        "sourceOfInformation": null,
        "description": null,
        "forwardReasons": [
            "shipment.custom.fields.updated"
        ],
        "userId": "a42e539c-88f3-42cf-a1e7-d13e0b60833d",
        "uuid": "b35f0631-8d98-48f0-9216-d8bf03c745fd",
        "revision": 235,
        "time": 1686564756548,
        "forwardedFrom": "",
        "resourceType": "ShipmentObject",
        "updateType": null
    },
    "isActive": false,
    "uuid": "05b92dd1-2ce1-42cf-8ea1-de7fe1cd7df1",
    "issues": null,
    "branch": null,
    "orgId": "06acac7f-5697-4fef-9a61-eef47f75367a",
    "shipmentType": "DirectLeg",
    "completionTime": 1686380526293,
    "routeId": null,
    "shipmentTrackingStatus": null,
    "lastForwardTime": 1686380527249,
    "runningStatus": null,
    "delayTrackingStatus": null,
    "delayReasonLastUpdateTime": null,
    "links": null,
    "shipmentDate": 1686300065673,
    "delayReason": null,
    "shipmentNumber": "2661459",
    "originalEdd": null,
    "edd": null,
    "delayReasonUpdateExpiryTime": null,
    "externalShipmentId": "2661459",
    "fleetInfo": {
        "isTrackingEnable": null,
        "forwardingAgent": null,
        "verificationStatus": null,
        "trackingMode": "VTS",
        "broker": null,
        "uuid": null,
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
            "updates": null,
            "uuid": null,
            "branch": null,
            "orgId": null,
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
            "vehicleModel": null,
            "mileageEmpty": null,
            "mileageLoaded": null,
            "vehicleType": "14Ft",
            "groups": null,
            "externalId": null,
            "updateTime": null,
            "sharedWith": [],
            "baseLocationId": null,
            "vehicleMake": null,
            "vehicleRegistrationNumber": "DL01LAF0881",
            "chassisNumber": null,
            "driverId": null,
            "createTime": null,
            "loadCapacity": 3,
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
            "mobileNumbers": [],
            "dlNumber": null,
            "mobileNumber": "89206986886",
            "customFields": [],
            "externalId": null,
            "updates": {
                "traceID": "documentManagerScheduledTasksTopic_0_181468",
                "resourceId": "8425c0e5-2b18-4fc8-9e4c-fd8b544959ca",
                "updatedBy": "USER",
                "changes": null,
                "sourceOfInformation": null,
                "description": "added new Driver Kushal",
                "forwardReasons": [
                    "driver.add.event"
                ],
                "userId": "1d9a79bc-9747-435e-a265-b0552a880d2d",
                "uuid": "2e70b19f-5ef0-47da-b232-435fdd199dfe",
                "revision": null,
                "time": 1684320931212,
                "forwardedFrom": null,
                "resourceType": "Driver",
                "updateType": null
            },
            "aadharNo": null,
            "type": null,
            "uuid": "8425c0e5-2b18-4fc8-9e4c-fd8b544959ca",
            "branch": null,
            "orgId": "06acac7f-5697-4fef-9a61-eef47f75367a",
            "vehicleRegistrationNumber": null,
            "name": "Kushal",
            "vehicleId": null,
            "associatedUserId": null,
            "status": "Active"
        },
        "fleetType": "Owned",
        "fleetOwner": {
            "geoFence": null,
            "documents": null,
            "customFields": null,
            "isPortalEnabled": false,
            "type": "vendor",
            "updates": null,
            "uuid": "e8ebda16-18de-4097-a18a-8b3d041114cb",
            "orgId": null,
            "firmType": null,
            "gstn": null,
            "voterId": null,
            "verificationTicketId": null,
            "group": {
                "name": "lorryOwner",
                "partnerType": null,
                "uuid": null,
                "orgId": null
            },
            "address": "{\"address\":null,\"city\":null,\"state\":null,\"pincode\":null}",
            "verificationStatus": null,
            "externalId": null,
            "panNumber": "9889798798",
            "aadharNo": null,
            "parentId": null,
            "places": null,
            "route": null,
            "name": "KALRA TEMPO TRANSPORT SERVICES",
            "location": null,
            "fretronId": null,
            "contacts": [
                {
                    "emails": [],
                    "address": null,
                    "mobileNumbers": [],
                    "mobileNumber": null,
                    "name": "KALRA TRANSPORT SERVICES",
                    "type": null
                }
            ],
            "status": "ACTIVE"
        },
        "trainInfo": null,
        "lbsNumber": "8377029703",
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
            "uuid": "b7e89016-2a48-4f13-8408-ed8dac60d682",
            "orgId": "06acac7f-5697-4fef-9a61-eef47f75367a",
            "attachedResourceId": null,
            "isDeleted": null,
            "createTime": null,
            "serviceProvider": null,
            "imei": "838067629176",
            "usedBy": null,
            "status": "PENDING"
        },
        "status": null
    },
    "syncUpDueTime": null,
    "billingStatus": null,
    "currentLocation": {
        "isFillingEnabled": false,
        "address": null,
        "lngLat": [
            77.449208,
            28.532334
        ],
        "odometer": null,
        "latitude": 28.532334,
        "course": 201,
        "imei": "838067629176",
        "decoder": "elock",
        "time": 1686332820000,
        "vehicleId": null,
        "speed": 113,
        "longitude": 77.449208
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
            "departureTime": 1686315099000,
            "gateInTime": 1686315086000,
            "actualActivityStartTime": 1686315093000,
            "actualActivityEndTime": 1686315096000,
            "uuid": "e81c8216-1864-490d-bef8-3b093324ea8a",
            "consignmentDelivered": null,
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": null,
            "hub": null,
            "arrivalTime": 1686315081000,
            "expectedActivityStartTime": null,
            "secondaryStatus": null,
            "consignmentPickUps": [
                "fad5163e-f848-4277-af5b-af7a4841877c",
                "3725b816-dfb4-4269-97cf-44317813fe9d"
            ],
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": 1686325320724,
                "purpose": "Pickup",
                "plannedArrival": null,
                "currentGpsState": {
                    "numberOfRecord": 19,
                    "totalTime": 301000,
                    "averageSpeeds": 5.3048646262419386,
                    "eventType": "StateUpdated",
                    "uuid": "349387d8-d33d-4105-af4d-ca3e3a12fc18",
                    "isDisconnected": false,
                    "startLocation": {
                        "isFillingEnabled": false,
                        "address": null,
                        "lngLat": [
                            77.421056,
                            28.700944
                        ],
                        "odometer": {
                            "isSoftwareMeterManuallyCalibrated": null,
                            "softwareMeter": null,
                            "hardwareDistance": null,
                            "lastUpdateTime": null,
                            "lastCalibrationTime": null,
                            "hardwareReading": null
                        },
                        "latitude": 28.700944,
                        "course": 122,
                        "imei": "838067629176",
                        "decoder": "elock",
                        "time": 1686324999000,
                        "vehicleId": null,
                        "speed": 19,
                        "longitude": 77.421056
                    },
                    "isNoGpsZone": false,
                    "mean": {
                        "isFillingEnabled": false,
                        "address": "",
                        "lngLat": [
                            77.41136880455714,
                            28.679791649166997
                        ],
                        "odometer": null,
                        "latitude": 28.679791649166997,
                        "course": null,
                        "imei": "",
                        "decoder": null,
                        "time": 1686324088662,
                        "vehicleId": "",
                        "speed": 0,
                        "longitude": 77.41136880455714
                    },
                    "imei": "838067629176",
                    "startTime": 1686324999000,
                    "endTime": 1686325300000,
                    "vehicleId": null,
                    "state": "Stopped",
                    "totalDistance": 443.5456256941176,
                    "endLocation": {
                        "isFillingEnabled": false,
                        "address": null,
                        "lngLat": [
                            77.418144,
                            28.700571999999998
                        ],
                        "odometer": {
                            "isSoftwareMeterManuallyCalibrated": null,
                            "softwareMeter": null,
                            "hardwareDistance": null,
                            "lastUpdateTime": null,
                            "lastCalibrationTime": null,
                            "hardwareReading": null
                        },
                        "latitude": 28.700571999999998,
                        "course": 0,
                        "imei": "838067629176",
                        "decoder": "elock",
                        "time": 1686325300000,
                        "vehicleId": null,
                        "speed": 0,
                        "longitude": 77.418144
                    }
                },
                "updates": {
                    "traceID": "d2d3e46c-bb06-4cb6-a904-017b188061de",
                    "resourceId": "e81c8216-1864-490d-bef8-3b093324ea8a",
                    "updatedBy": "SYSTEM",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": "From AT to AT",
                    "forwardReasons": [
                        "trippoint.updated",
                        "trippoint.updated"
                    ],
                    "userId": null,
                    "uuid": "9c9f9703-b01c-4291-a55c-db237383666a",
                    "revision": 4,
                    "time": 1686325879641,
                    "forwardedFrom": null,
                    "resourceType": "TripPoint",
                    "updateType": null
                },
                "uuid": "e81c8216-1864-490d-bef8-3b093324ea8a",
                "sequenceId": null,
                "isDisconnected": false,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": null,
                "eta": null,
                "routeId": null,
                "expectedActivityStartTime": null,
                "actualDeparture": null,
                "vehicleId": "838067629176",
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
                    "suggestedRadius": 251,
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
                    "name": "Noida DC",
                    "state": null,
                    "category": "DC",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "remainingDistance": 0,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "e81c8216-1864-490d-bef8-3b093324ea8a"
                ],
                "actualActivityEndTime": null,
                "actualArrival": 1686315081000,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": null,
                "isAutoCompleted": false,
                "coveredDistance": 28905.61452643167,
                "hub": null,
                "imei": "838067629176",
                "assosiatedShipmentsId": [
                    "05b92dd1-2ce1-42cf-8ea1-de7fe1cd7df1"
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
                "suggestedRadius": 251,
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
                "name": "Noida DC",
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
            "departureTime": 1686318735000,
            "gateInTime": 1686318711999,
            "actualActivityStartTime": 1686318712000,
            "actualActivityEndTime": 1686318732000,
            "uuid": "683afedd-3534-4571-8c46-6e4cff24a055",
            "consignmentDelivered": [
                "fad5163e-f848-4277-af5b-af7a4841877c"
            ],
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": null,
            "hub": null,
            "arrivalTime": 1686318704000,
            "expectedActivityStartTime": null,
            "secondaryStatus": null,
            "consignmentPickUps": [
                "e6fc2517-6e8e-4ab1-9590-eb949a8e672e"
            ],
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": null,
                "purpose": "Delivery",
                "plannedArrival": null,
                "currentGpsState": {
                    "numberOfRecord": 19,
                    "totalTime": 301000,
                    "averageSpeeds": 5.3048646262419386,
                    "eventType": "StateUpdated",
                    "uuid": "349387d8-d33d-4105-af4d-ca3e3a12fc18",
                    "isDisconnected": false,
                    "startLocation": {
                        "isFillingEnabled": false,
                        "address": null,
                        "lngLat": [
                            77.421056,
                            28.700944
                        ],
                        "odometer": {
                            "isSoftwareMeterManuallyCalibrated": null,
                            "softwareMeter": null,
                            "hardwareDistance": null,
                            "lastUpdateTime": null,
                            "lastCalibrationTime": null,
                            "hardwareReading": null
                        },
                        "latitude": 28.700944,
                        "course": 122,
                        "imei": "838067629176",
                        "decoder": "elock",
                        "time": 1686324999000,
                        "vehicleId": null,
                        "speed": 19,
                        "longitude": 77.421056
                    },
                    "isNoGpsZone": false,
                    "mean": {
                        "isFillingEnabled": false,
                        "address": "",
                        "lngLat": [
                            77.41136880455714,
                            28.679791649166997
                        ],
                        "odometer": null,
                        "latitude": 28.679791649166997,
                        "course": null,
                        "imei": "",
                        "decoder": null,
                        "time": 1686324088662,
                        "vehicleId": "",
                        "speed": 0,
                        "longitude": 77.41136880455714
                    },
                    "imei": "838067629176",
                    "startTime": 1686324999000,
                    "endTime": 1686325300000,
                    "vehicleId": null,
                    "state": "Stopped",
                    "totalDistance": 443.5456256941176,
                    "endLocation": {
                        "isFillingEnabled": false,
                        "address": null,
                        "lngLat": [
                            77.418144,
                            28.700571999999998
                        ],
                        "odometer": {
                            "isSoftwareMeterManuallyCalibrated": null,
                            "softwareMeter": null,
                            "hardwareDistance": null,
                            "lastUpdateTime": null,
                            "lastCalibrationTime": null,
                            "hardwareReading": null
                        },
                        "latitude": 28.700571999999998,
                        "course": 0,
                        "imei": "838067629176",
                        "decoder": "elock",
                        "time": 1686325300000,
                        "vehicleId": null,
                        "speed": 0,
                        "longitude": 77.418144
                    }
                },
                "updates": null,
                "uuid": "683afedd-3534-4571-8c46-6e4cff24a055",
                "sequenceId": null,
                "isDisconnected": false,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": null,
                "eta": null,
                "routeId": null,
                "expectedActivityStartTime": null,
                "actualDeparture": null,
                "vehicleId": "838067629176",
                "place": {
                    "hubId": null,
                    "boundary": null,
                    "address": "Plot No./Khasra No. 996,Opp Sahjyog Mandir,Ansal API (Crossing Republic),  Village-Dundhera,Tehsil & Distt-Ghaziabad, Uttar Pradesh-201009",
                    "accessibility": "public",
                    "addedBy": "06acac7f-5697-4fef-9a61-eef47f75367a",
                    "center": {
                        "latitude": 28.627539,
                        "longitude": 77.441988
                    },
                    "suggestedRadius": 500,
                    "isOwned": true,
                    "centerCoordinates": [
                        77.441988,
                        28.627539
                    ],
                    "placeId": "36ef0077-284e-407d-8162-1f854d44ac4e",
                    "geoJsonBoundry": null,
                    "externalId": "",
                    "source": "FRETRON",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "BBNow-NOI-Dundhera",
                    "state": null,
                    "category": "BBN",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "remainingDistance": 10479.343509796272,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "683afedd-3534-4571-8c46-6e4cff24a055"
                ],
                "actualActivityEndTime": null,
                "actualArrival": 1686318704000,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": null,
                "isAutoCompleted": false,
                "coveredDistance": 0,
                "hub": null,
                "imei": "838067629176",
                "assosiatedShipmentsId": [
                    "05b92dd1-2ce1-42cf-8ea1-de7fe1cd7df1"
                ],
                "status": "COMPLETED"
            },
            "place": {
                "hubId": null,
                "boundary": null,
                "address": "Plot No./Khasra No. 996,Opp Sahjyog Mandir,Ansal API (Crossing Republic),  Village-Dundhera,Tehsil & Distt-Ghaziabad, Uttar Pradesh-201009",
                "accessibility": "public",
                "addedBy": "06acac7f-5697-4fef-9a61-eef47f75367a",
                "center": {
                    "latitude": 28.627539,
                    "longitude": 77.441988
                },
                "suggestedRadius": 500,
                "isOwned": true,
                "centerCoordinates": [
                    77.441988,
                    28.627539
                ],
                "placeId": "36ef0077-284e-407d-8162-1f854d44ac4e",
                "geoJsonBoundry": null,
                "externalId": "",
                "source": "FRETRON",
                "places": null,
                "viewport": null,
                "district": null,
                "name": "BBNow-NOI-Dundhera",
                "state": null,
                "category": "BBN",
                "subDistrict": null,
                "controllingBranchId": null
            },
            "controllingBranchId": null,
            "gateOutTime": null,
            "status": "COMPLETED"
        },
        {
            "departureTime": 1686330114000,
            "gateInTime": null,
            "actualActivityStartTime": null,
            "actualActivityEndTime": null,
            "uuid": "19483a88-49ef-4983-bdaa-6b8e43aaa774",
            "consignmentDelivered": [
                "3725b816-dfb4-4269-97cf-44317813fe9d"
            ],
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": null,
            "hub": null,
            "arrivalTime": 1686325861000,
            "expectedActivityStartTime": null,
            "secondaryStatus": null,
            "consignmentPickUps": null,
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": 1686325939293,
                "purpose": "Delivery",
                "plannedArrival": null,
                "currentGpsState": {
                    "numberOfRecord": 62,
                    "totalTime": 389000,
                    "averageSpeeds": 20.64119700401755,
                    "eventType": "StateUpdated",
                    "uuid": "f9077dbf-ec40-4b73-82d5-591831a7f9ac",
                    "isDisconnected": false,
                    "startLocation": {
                        "isFillingEnabled": false,
                        "address": "12/60, Raj Nagar Ext Rd, Sehani Khurd, Ghukna, Ghaziabad, Uttar Pradesh 201003, India",
                        "lngLat": [
                            77.418128,
                            28.700584
                        ],
                        "odometer": null,
                        "latitude": 28.700584,
                        "course": 0,
                        "imei": "838067629176",
                        "decoder": "elock",
                        "time": 1686329725000,
                        "vehicleId": null,
                        "speed": 0,
                        "longitude": 77.418128
                    },
                    "isNoGpsZone": false,
                    "mean": {
                        "isFillingEnabled": false,
                        "address": "",
                        "lngLat": [
                            77.41566890322581,
                            28.700906258064517
                        ],
                        "odometer": null,
                        "latitude": 28.700906258064517,
                        "course": null,
                        "imei": "",
                        "decoder": null,
                        "time": 1686329900653,
                        "vehicleId": "",
                        "speed": 0,
                        "longitude": 77.41566890322581
                    },
                    "imei": "838067629176",
                    "startTime": 1686329725000,
                    "endTime": 1686330114000,
                    "vehicleId": null,
                    "state": "Moving",
                    "totalDistance": 2230.3960096007854,
                    "endLocation": {
                        "isFillingEnabled": false,
                        "address": null,
                        "lngLat": [
                            77.401928,
                            28.697651999999998
                        ],
                        "odometer": null,
                        "latitude": 28.697651999999998,
                        "course": 246,
                        "imei": "838067629176",
                        "decoder": "elock",
                        "time": 1686330114000,
                        "vehicleId": null,
                        "speed": 352,
                        "longitude": 77.401928
                    }
                },
                "updates": {
                    "traceID": "vehiclegpsstatetopic_10_20939346",
                    "resourceId": "19483a88-49ef-4983-bdaa-6b8e43aaa774",
                    "updatedBy": "SYSTEM",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": "From AT to COMPLETED",
                    "forwardReasons": [
                        "trippoint.current.location.updated",
                        "gps.state.updated"
                    ],
                    "userId": null,
                    "uuid": "1c347c56-b4d3-4928-be5d-d3025e6df785",
                    "revision": 25,
                    "time": 1686330443336,
                    "forwardedFrom": null,
                    "resourceType": "TripPoint",
                    "updateType": null
                },
                "uuid": "19483a88-49ef-4983-bdaa-6b8e43aaa774",
                "sequenceId": null,
                "isDisconnected": false,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": 5000,
                "eta": null,
                "routeId": null,
                "expectedActivityStartTime": null,
                "actualDeparture": 1686330114000,
                "vehicleId": "838067629176",
                "place": {
                    "hubId": null,
                    "boundary": null,
                    "address": "Raj Nagar Extn, Landcraft River Heights Block-17,Sehani Khurd, Ghukna, Ghaziabad,Uttar Pradesh 201003",
                    "accessibility": "public",
                    "addedBy": "06acac7f-5697-4fef-9a61-eef47f75367a",
                    "center": {
                        "latitude": 28.70053994,
                        "longitude": 77.41785606
                    },
                    "suggestedRadius": 500,
                    "isOwned": true,
                    "centerCoordinates": [
                        77.41785606,
                        28.70053994
                    ],
                    "placeId": "f566306c-39d1-4e93-b075-0546bd6f656d",
                    "geoJsonBoundry": null,
                    "externalId": "",
                    "source": "FRETRON",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "BBNow-NOI-Raj Nagar",
                    "state": null,
                    "category": "BBN",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "remainingDistance": 0,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "19483a88-49ef-4983-bdaa-6b8e43aaa774"
                ],
                "actualActivityEndTime": 1686330114000,
                "actualArrival": 1686325861000,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": {
                    "isFillingEnabled": false,
                    "address": null,
                    "lngLat": [
                        77.401928,
                        28.697651999999998
                    ],
                    "odometer": null,
                    "latitude": 28.697651999999998,
                    "course": 246,
                    "imei": "838067629176",
                    "decoder": "elock",
                    "time": 1686330114000,
                    "vehicleId": null,
                    "speed": 352,
                    "longitude": 77.401928
                },
                "isAutoCompleted": true,
                "coveredDistance": 19671.193949506836,
                "hub": null,
                "imei": "838067629176",
                "assosiatedShipmentsId": [
                    "05b92dd1-2ce1-42cf-8ea1-de7fe1cd7df1"
                ],
                "status": "COMPLETED"
            },
            "place": {
                "hubId": null,
                "boundary": null,
                "address": "Raj Nagar Extn, Landcraft River Heights Block-17,Sehani Khurd, Ghukna, Ghaziabad,Uttar Pradesh 201003",
                "accessibility": "public",
                "addedBy": "06acac7f-5697-4fef-9a61-eef47f75367a",
                "center": {
                    "latitude": 28.70053994,
                    "longitude": 77.41785606
                },
                "suggestedRadius": 500,
                "isOwned": true,
                "centerCoordinates": [
                    77.41785606,
                    28.70053994
                ],
                "placeId": "f566306c-39d1-4e93-b075-0546bd6f656d",
                "geoJsonBoundry": null,
                "externalId": "",
                "source": "FRETRON",
                "places": null,
                "viewport": null,
                "district": null,
                "name": "BBNow-NOI-Raj Nagar",
                "state": null,
                "category": "BBN",
                "subDistrict": null,
                "controllingBranchId": null
            },
            "controllingBranchId": null,
            "gateOutTime": null,
            "status": "COMPLETED"
        },
        {
            "departureTime": 1686380498702,
            "gateInTime": null,
            "actualActivityStartTime": 1686380498702,
            "actualActivityEndTime": 1686380498702,
            "uuid": "25c8b43e-8fea-4a70-9fac-2dc670b295d0",
            "consignmentDelivered": [
                "e6fc2517-6e8e-4ab1-9590-eb949a8e672e"
            ],
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": null,
            "hub": null,
            "arrivalTime": 1686332820000,
            "expectedActivityStartTime": null,
            "secondaryStatus": null,
            "consignmentPickUps": null,
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": 1686330444005,
                "purpose": "Delivery",
                "plannedArrival": null,
                "currentGpsState": {
                    "numberOfRecord": 2041,
                    "totalTime": 23808000,
                    "averageSpeeds": 0.015859039314757573,
                    "eventType": "StateUpdated",
                    "uuid": "d92c9680-f784-40f4-a4d0-dae08c7c667c",
                    "isDisconnected": false,
                    "startLocation": {
                        "isFillingEnabled": false,
                        "address": "Dadri Main Rd, Ecotech III, Greater Noida, Uttar Pradesh 201306, India",
                        "lngLat": [
                            77.447256,
                            28.532566
                        ],
                        "odometer": null,
                        "latitude": 28.532566,
                        "course": 0,
                        "imei": "838067629176",
                        "decoder": "elock",
                        "time": 1686356291000,
                        "vehicleId": null,
                        "speed": 8,
                        "longitude": 77.447256
                    },
                    "isNoGpsZone": false,
                    "mean": {
                        "isFillingEnabled": false,
                        "address": "",
                        "lngLat": [
                            77.44764584055264,
                            28.53246997048466
                        ],
                        "odometer": null,
                        "latitude": 28.53246997048466,
                        "course": null,
                        "imei": "",
                        "decoder": null,
                        "time": 1686370108659,
                        "vehicleId": "",
                        "speed": 0,
                        "longitude": 77.44764584055264
                    },
                    "imei": "838067629176",
                    "startTime": 1686356291000,
                    "endTime": 1686380099000,
                    "vehicleId": null,
                    "state": "Stopped",
                    "totalDistance": 104.88111333493006,
                    "endLocation": {
                        "isFillingEnabled": false,
                        "address": null,
                        "lngLat": [
                            77.447648,
                            28.53247
                        ],
                        "odometer": null,
                        "latitude": 28.53247,
                        "course": 0,
                        "imei": "838067629176",
                        "decoder": "elock",
                        "time": 1686380099000,
                        "vehicleId": null,
                        "speed": 0,
                        "longitude": 77.447648
                    }
                },
                "updates": {
                    "traceID": "vehiclegpsstatetopic_10_21007275",
                    "resourceId": "25c8b43e-8fea-4a70-9fac-2dc670b295d0",
                    "updatedBy": "SYSTEM",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": "From AT to AT",
                    "forwardReasons": [
                        "trippoint.current.location.updated",
                        "gps.state.updated",
                        "trippoint.updated"
                    ],
                    "userId": null,
                    "uuid": "34b3f514-386c-4b0b-9749-4182dc0b99e9",
                    "revision": 192,
                    "time": 1686380287439,
                    "forwardedFrom": null,
                    "resourceType": "TripPoint",
                    "updateType": null
                },
                "uuid": "25c8b43e-8fea-4a70-9fac-2dc670b295d0",
                "sequenceId": null,
                "isDisconnected": false,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": 5000,
                "eta": null,
                "routeId": null,
                "expectedActivityStartTime": null,
                "actualDeparture": null,
                "vehicleId": "838067629176",
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
                    "suggestedRadius": 251,
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
                    "name": "Noida DC",
                    "state": null,
                    "category": "DC",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "remainingDistance": 0,
                "actualActivityStartTime": 1686332820000,
                "forShipmentStages": [
                    "25c8b43e-8fea-4a70-9fac-2dc670b295d0"
                ],
                "actualActivityEndTime": null,
                "actualArrival": 1686332820000,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": {
                    "isFillingEnabled": false,
                    "address": null,
                    "lngLat": [
                        77.447648,
                        28.53247
                    ],
                    "odometer": null,
                    "latitude": 28.53247,
                    "course": 0,
                    "imei": "838067629176",
                    "decoder": "elock",
                    "time": 1686380099000,
                    "vehicleId": null,
                    "speed": 0,
                    "longitude": 77.447648
                },
                "isAutoCompleted": false,
                "coveredDistance": 23182.34716452217,
                "hub": null,
                "imei": "838067629176",
                "assosiatedShipmentsId": [
                    "05b92dd1-2ce1-42cf-8ea1-de7fe1cd7df1"
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
                "suggestedRadius": 251,
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
                "name": "Noida DC",
                "state": null,
                "category": "DC",
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
_f(sh)

