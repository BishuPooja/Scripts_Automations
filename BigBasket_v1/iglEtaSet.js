// const rp = require("request promise")

const token = ""

const $event = {
    "creationTime": 1679208357560,
    "customFields": [
        {
            "indexedValue": [
                "Category_Country Liquor"
            ],
            "fieldKey": "Category",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": "248f19f4-cea6-47d8-a2ff-af0c26460df2",
            "required": true,
            "accessType": "mandotary_on_create",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": [
                "Country Liquor",
                "IMFL",
                "SDS",
                "Fusel Oil",
                "DDGS",
                "ENA",
                "Silica Sand",
                "Coal",
                "Chemical",
                "Iron | Steel ",
                "Country Liquor",
                "Scrap",
                "Antifoam/Urea/Zinc/Magnesium",
                "Fly Ash",
                "Molasses",
                "Empty Bottle Point-1",
                "Empty Bottle Point-2",
                "Rice Husk",
                "Broken Rice",
                "Cement",
                "Package Unload",
                "Others"
            ],
            "fieldType": "select",
            "value": "Country Liquor",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Type_Outbound"
            ],
            "fieldKey": "Type",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": "1e30ca1c-591a-403c-bab4-2727740b3fff",
            "required": true,
            "accessType": "mandatory_on_create",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": [
                "Inbound",
                "Outbound"
            ],
            "fieldType": "select",
            "value": "Outbound",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Vehicle Type_Dedicated"
            ],
            "fieldKey": "Vehicle Type",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": "3137c4d3-816e-442a-8aea-685aeb98a9cb",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [
                "Dedicated",
                "Market"
            ],
            "fieldType": "select",
            "value": "Dedicated",
            "isRemark": false
        },
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
                "Plant Tracking Eligibility_No"
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
            "value": "No",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Plant Tracking Last Update_1679287857397"
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
            "value": "1679287857397",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Color_#a84432"
            ],
            "fieldKey": "Color",
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
            "value": "#a84432",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Device Battery %_93"
            ],
            "fieldKey": "Device Battery %",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": "01d9905d-ac37-4a91-bf48-02c586c6217a",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "93",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Device Submitted_NO"
            ],
            "fieldKey": "Device Submitted",
            "multiple": false,
            "description": "Device Submitted?",
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
            "value": "NO",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Device Submit Date_null"
            ],
            "fieldKey": "Device Submit Date",
            "multiple": true,
            "description": "Device Submit Date",
            "remark": "",
            "uuid": "378509c4-97f3-4c3f-a312-4f03ece7e1d5",
            "required": false,
            "accessType": null,
            "input": "date",
            "unit": "",
            "valueType": "string",
            "options": [],
            "fieldType": "dateTime",
            "value": null,
            "isRemark": false
        },
        {
            "indexedValue": [
                "ProcessingStateName_Loading Dock"
            ],
            "fieldKey": "ProcessingStateName",
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
            "value": "Loading Dock",
            "isRemark": false
        },
        {
            "indexedValue": [
                "InPlantTATCalculated_Yes"
            ],
            "fieldKey": "InPlantTATCalculated",
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
        }
    ],
    "transportationMode": "ByRoad",
    "freightUnitLineItemId": null,
    "lastSyncUpTime": 1679287052718,
    "updates": {
        "traceID": "tripPointEventsTopicByImei_5_12055734",
        "resourceId": "f19560d3-a633-46b4-9946-0b5d35398816",
        "updatedBy": "USER",
        "changes": null,
        "sourceOfInformation": null,
        "description": null,
        "forwardReasons": [
            "gps.state.updated"
        ],
        "userId": "868ac373-ed4f-407d-9a26-b6b0e17fae1f",
        "uuid": "19f7e6e0-b98a-4520-b44e-04e1848614b2",
        "revision": 15,
        "time": 1679289519185,
        "forwardedFrom": null,
        "resourceType": "ShipmentObject",
        "updateType": "Enroute For Delivery"
    },
    "isActive": true,
    "uuid": "f19560d3-a633-46b4-9946-0b5d35398816",
    "issues": null,
    "branch": null,
    "orgId": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
    "shipmentType": "DirectLeg",
    "completionTime": null,
    "routeId": "890c2e68-4eda-4d87-8d88-e194f66d41e2",
    "shipmentTrackingStatus": "Enroute For Delivery",
    "lastForwardTime": 1679287857323,
    "runningStatus": null,
    "delayTrackingStatus": "UP TO DATE",
    "delayReasonLastUpdateTime": null,
    "links": null,
    "shipmentDate": 1679207987000,
    "delayReason": null,
    "shipmentNumber": "FRETSH0017093",
    "originalEdd": null,
    "edd": null,
    "delayReasonUpdateExpiryTime": null,
    "externalShipmentId": null,
    "fleetInfo": {
        "isTrackingEnable": null,
        "forwardingAgent": null,
        "verificationStatus": null,
        "trackingMode": "VTS",
        "broker": null,
        "uuid": "4110fc2b-20a7-4d86-81af-3150415bce65",
        "orgId": null,
        "vehicle": {
            "vtsDeviceId": null,
            "kmDriven": null,
            "secondaryDriverId": null,
            "attachedDocs": [],
            "customFields": [
                {
                    "indexedValue": [
                        "MakeDate_1237833000000"
                    ],
                    "fieldKey": "MakeDate",
                    "valueType": "string",
                    "fieldType": "date",
                    "value": "1237833000000",
                    "definitionId": null
                },
                {
                    "indexedValue": [
                        "PassingCapacity_18.925"
                    ],
                    "fieldKey": "PassingCapacity",
                    "valueType": "string",
                    "fieldType": "number",
                    "value": "18.925",
                    "definitionId": null
                }
            ],
            "floorType": null,
            "description": null,
            "source": "FRETRON",
            "isTrackingEnabled": false,
            "updates": {
                "traceID": "c1dded57-42f2-4aaa-8773-4cdcf7d14f1e",
                "resourceId": "4110fc2b-20a7-4d86-81af-3150415bce65",
                "updatedBy": "USER",
                "changes": null,
                "sourceOfInformation": null,
                "description": "Update Custom Fields.",
                "forwardReasons": [
                    "partner.fleet.custom.fields.updated"
                ],
                "userId": "564a12a4-c1fc-4d42-8a24-03140bf72256",
                "uuid": "a2b8bc21-ec8e-4015-9c19-6addccfecf5f",
                "revision": null,
                "time": 1678884883050,
                "forwardedFrom": null,
                "resourceType": "PartnerFleet",
                "updateType": null
            },
            "uuid": null,
            "branch": null,
            "orgId": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
            "vehicleLoadType": {
                "bodyType": "Closed",
                "passingCapacityMT": 20,
                "minLength": 0,
                "updates": {
                    "traceID": null,
                    "resourceId": "16567448-b230-4f97-8d2f-66895eaf3eb5",
                    "updatedBy": "USER",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": "Created Load Type.",
                    "forwardReasons": [
                        "load.type.created.event"
                    ],
                    "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                    "uuid": "44bee3d3-b90c-425e-bdf9-00aa2be3b718",
                    "revision": null,
                    "time": 1678861316640,
                    "forwardedFrom": null,
                    "resourceType": "LoadTypes",
                    "updateType": null
                },
                "vehicleCategories": [],
                "uuid": "16567448-b230-4f97-8d2f-66895eaf3eb5",
                "orgId": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
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
                "name": "22 ft Closed Body",
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
            "updateTime": 1678884883050,
            "sharedWith": [],
            "baseLocationId": null,
            "vehicleMake": null,
            "vehicleRegistrationNumber": "UP53ET8972",
            "chassisNumber": null,
            "driverId": "bd6fe95e-60d9-40ca-b4a0-aad591669e3d",
            "createTime": null,
            "loadCapacity": null,
            "truckLength": null,
            "category": "22 ft Closed Body",
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
            "mobileNumber": "9793494399",
            "customFields": [],
            "externalId": null,
            "updates": {
                "traceID": "c1e88e43-5c48-4b1e-92c9-05b04ac62363",
                "resourceId": "bd6fe95e-60d9-40ca-b4a0-aad591669e3d",
                "updatedBy": "USER",
                "changes": null,
                "sourceOfInformation": null,
                "description": "added new Driver Girish Chand",
                "forwardReasons": [
                    "driver.add.event"
                ],
                "userId": "a42e539c-88f3-42cf-a1e7-d13e0b60833d",
                "uuid": "c7e17235-eb49-4a9a-b32f-c6cb99a30475",
                "revision": null,
                "time": 1655114666835,
                "forwardedFrom": null,
                "resourceType": "Driver",
                "updateType": null
            },
            "aadharNo": null,
            "type": null,
            "uuid": "bd6fe95e-60d9-40ca-b4a0-aad591669e3d",
            "branch": null,
            "orgId": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
            "vehicleRegistrationNumber": null,
            "name": "Girish Chand",
            "vehicleId": null,
            "associatedUserId": null,
            "status": null
        },
        "fleetType": "Contracted",
        "fleetOwner": {
            "geoFence": null,
            "documents": [],
            "customFields": [],
            "isPortalEnabled": true,
            "type": "vendor",
            "updates": {
                "traceID": "2311b161-47f7-4d2a-99fe-d138451617d8",
                "resourceId": "64f97b76-d146-497d-9009-08b1f99a5e96",
                "updatedBy": "USER",
                "changes": [
                    {
                        "lastValue": null,
                        "fieldName": "USER INVITED",
                        "fieldType": "Boolean",
                        "currentValue": "YASHU GLOBAL LOGISTICS"
                    }
                ],
                "sourceOfInformation": null,
                "description": "User YASHU GLOBAL LOGISTICS invited on portal.",
                "forwardReasons": [
                    "user.invited.on.portal.event"
                ],
                "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                "uuid": "21cf388c-adc0-4636-bfdf-62e1875a9692",
                "revision": null,
                "time": 1675422382116,
                "forwardedFrom": null,
                "resourceType": "Business-Partner",
                "updateType": null
            },
            "uuid": "64f97b76-d146-497d-9009-08b1f99a5e96",
            "orgId": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
            "firmType": "INDIVISUAL",
            "gstn": null,
            "voterId": null,
            "verificationTicketId": null,
            "group": {
                "name": "lorryOwner",
                "partnerType": "vendor",
                "uuid": "f168dda5-35a4-4da3-8d05-a2fbea623f9e",
                "orgId": "472b3c51-d8e9-4294-8a7f-a69093b505b7"
            },
            "address": "{\"address\":\"TRANSPORT NAGAR, GIDA,\",\"city\":null,\"state\":\"Uttar Pradesh\",\"pincode\":273209}",
            "verificationStatus": "unverified",
            "externalId": "4002405",
            "panNumber": null,
            "aadharNo": null,
            "parentId": null,
            "places": [],
            "route": null,
            "name": "YASHU GLOBAL LOGISTICS",
            "location": null,
            "fretronId": null,
            "contacts": [
                {
                    "emails": [
                        "yashugloballogistics18@gmail.com"
                    ],
                    "address": null,
                    "mobileNumbers": [
                        "9889388280"
                    ],
                    "mobileNumber": null,
                    "name": "YASHU GLOBAL LOGISTICS",
                    "type": null
                }
            ],
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
            "uuid": null,
            "orgId": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
            "attachedResourceId": null,
            "isDeleted": null,
            "createTime": null,
            "serviceProvider": null,
            "imei": "937066741860",
            "usedBy": null,
            "status": null
        },
        "status": null
    },
    "syncUpDueTime": null,
    "billingStatus": null,
    "currentLocation": {
        "isFillingEnabled": false,
        "address": null,
        "lngLat": [
            83.01259999999999,
            26.785584
        ],
        "odometer": null,
        "latitude": 26.785584,
        "course": 269,
        "imei": "937066741860",
        "decoder": "elock",
        "time": 1679289153000,
        "vehicleId": null,
        "speed": 184,
        "longitude": 83.01259999999999
    },
    "alerts": [],
    "equipments": null,
    "tripType": "Shipment",
    "lastDelayCalculationTime": null,
    "delayReasonUpdateDueTime": null,
    "locationTrackingStatus": "UP TO DATE",
    "poLineItemId": null,
    "consignments": [],
    "customContacts": null,
    "shipmentStages": [
        {
            "departureTime": 1679286680000,
            "gateInTime": 1679222368988,
            "actualActivityStartTime": 1679223911000,
            "actualActivityEndTime": 1679273783111,
            "uuid": "5a4354ba-6d27-4f4f-a886-abef200b33ff",
            "consignmentDelivered": null,
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": null,
            "hub": null,
            "arrivalTime": 1679207988000,
            "expectedActivityStartTime": null,
            "secondaryStatus": "WaitingForFinalize",
            "consignmentPickUps": null,
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": 1679208359607,
                "purpose": "Pickup",
                "plannedArrival": null,
                "currentGpsState": {
                    "numberOfRecord": 23,
                    "totalTime": 299000,
                    "averageSpeeds": 15.832351953532983,
                    "eventType": "StateUpdated",
                    "uuid": "8a205e7f-7a40-4e67-a871-f34c8bbd76b6",
                    "isDisconnected": false,
                    "startLocation": {
                        "isFillingEnabled": false,
                        "address": "Gorakhpur Rd, Sahjanwa, Uttar Pradesh 273209, India",
                        "lngLat": [
                            83.224992,
                            26.747501999999997
                        ],
                        "odometer": null,
                        "latitude": 26.747501999999997,
                        "course": 0,
                        "imei": "937066741860",
                        "decoder": "elock",
                        "time": 1679286381000,
                        "vehicleId": null,
                        "speed": 1,
                        "longitude": 83.224992
                    },
                    "isNoGpsZone": false,
                    "mean": {
                        "isFillingEnabled": false,
                        "address": "",
                        "lngLat": [
                            83.22356034782611,
                            26.749081304347822
                        ],
                        "odometer": null,
                        "latitude": 26.749081304347822,
                        "course": null,
                        "imei": "",
                        "decoder": null,
                        "time": 1679286530299,
                        "vehicleId": "",
                        "speed": 0,
                        "longitude": 83.22356034782611
                    },
                    "imei": "937066741860",
                    "startTime": 1679286381000,
                    "endTime": 1679286680000,
                    "vehicleId": null,
                    "state": "Moving",
                    "totalDistance": 1314.9647872517671,
                    "endLocation": {
                        "isFillingEnabled": false,
                        "address": null,
                        "lngLat": [
                            83.21577599999999,
                            26.753104
                        ],
                        "odometer": null,
                        "latitude": 26.753104,
                        "course": 286,
                        "imei": "937066741860",
                        "decoder": "elock",
                        "time": 1679286680000,
                        "vehicleId": null,
                        "speed": 347,
                        "longitude": 83.21577599999999
                    }
                },
                "updates": {
                    "traceID": "b1e11c3b-8b82-4dd7-bf12-1440322376b0",
                    "resourceId": "5a4354ba-6d27-4f4f-a886-abef200b33ff",
                    "updatedBy": "SYSTEM",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": null,
                    "forwardReasons": [
                        "trippoint.deleted"
                    ],
                    "userId": null,
                    "uuid": "2392caba-6ab3-4ae5-ad96-aa0601fba952",
                    "revision": 276,
                    "time": 1679287052746,
                    "forwardedFrom": null,
                    "resourceType": "TripPoint",
                    "updateType": null
                },
                "uuid": "5a4354ba-6d27-4f4f-a886-abef200b33ff",
                "sequenceId": null,
                "isDisconnected": false,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": 5000,
                "eta": null,
                "routeId": null,
                "expectedActivityStartTime": null,
                "actualDeparture": 1679286680000,
                "vehicleId": "4110fc2b-20a7-4d86-81af-3150415bce65",
                "place": {
                    "hubId": null,
                    "boundary": null,
                    "address": "Gorakhpur Rd, Sahjanwa, Uttar Pradesh 273209, India",
                    "accessibility": "public",
                    "addedBy": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
                    "center": {
                        "latitude": 26.74759979968044,
                        "longitude": 83.22455528169571
                    },
                    "suggestedRadius": 0,
                    "isOwned": false,
                    "centerCoordinates": [
                        83.22455528169571,
                        26.74759979968044
                    ],
                    "placeId": "86927051-a4d0-42dd-b875-78755290ed56",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "FRETRON",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "IGL Gorakhpur",
                    "state": null,
                    "category": "Manufacturing Plant/Factory/Yard",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "remainingDistance": 0,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "5a4354ba-6d27-4f4f-a886-abef200b33ff"
                ],
                "actualActivityEndTime": 1679286680000,
                "actualArrival": 1679207988000,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": {
                    "isFillingEnabled": false,
                    "address": null,
                    "lngLat": [
                        83.21577599999999,
                        26.753104
                    ],
                    "odometer": null,
                    "latitude": 26.753104,
                    "course": 286,
                    "imei": "937066741860",
                    "decoder": "elock",
                    "time": 1679286680000,
                    "vehicleId": null,
                    "speed": 347,
                    "longitude": 83.21577599999999
                },
                "isAutoCompleted": true,
                "coveredDistance": null,
                "hub": {
                    "hubId": null,
                    "boundary": null,
                    "address": "Gorakhpur Rd, Sahjanwa, Uttar Pradesh 273209, India",
                    "accessibility": "public",
                    "addedBy": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
                    "center": {
                        "latitude": 26.74759979968044,
                        "longitude": 83.22455528169571
                    },
                    "suggestedRadius": 0,
                    "isOwned": false,
                    "centerCoordinates": [
                        83.22455528169571,
                        26.74759979968044
                    ],
                    "placeId": "86927051-a4d0-42dd-b875-78755290ed56",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "FRETRON",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "IGL Gorakhpur",
                    "state": null,
                    "category": "Manufacturing Plant/Factory/Yard",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "imei": "937066741860",
                "assosiatedShipmentsId": [
                    "f19560d3-a633-46b4-9946-0b5d35398816"
                ],
                "status": "DELETED"
            },
            "place": {
                "hubId": null,
                "boundary": null,
                "address": "Gorakhpur Rd, Sahjanwa, Uttar Pradesh 273209, India",
                "accessibility": "public",
                "addedBy": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
                "center": {
                    "latitude": 26.74759979968044,
                    "longitude": 83.22455528169571
                },
                "suggestedRadius": 0,
                "isOwned": false,
                "centerCoordinates": [
                    83.22455528169571,
                    26.74759979968044
                ],
                "placeId": "86927051-a4d0-42dd-b875-78755290ed56",
                "geoJsonBoundry": {
                    "coordinates": [
                        [
                            [
                                83.22308760196363,
                                26.74911704713041
                            ],
                            [
                                83.22332371592744,
                                26.751378605166447
                            ],
                            [
                                83.22424645871926,
                                26.751435477694546
                            ],
                            [
                                83.22512614472458,
                                26.751205545373193
                            ],
                            [
                                83.22489018888284,
                                26.750898968221204
                            ],
                            [
                                83.22563077543376,
                                26.74958586173847
                            ],
                            [
                                83.2264997628385,
                                26.74934658437746
                            ],
                            [
                                83.22692885588577,
                                26.74919337061778
                            ],
                            [
                                83.22748675536086,
                                26.749193262510012
                            ],
                            [
                                83.22907456874208,
                                26.74896332565311
                            ],
                            [
                                83.22971823247104,
                                26.748905795034208
                            ],
                            [
                                83.23012593428084,
                                26.748810003268762
                            ],
                            [
                                83.23083412805342,
                                26.748790764597064
                            ],
                            [
                                83.23156374930059,
                                26.748426974396413
                            ],
                            [
                                83.23152057029186,
                                26.747967282447192
                            ],
                            [
                                83.2315208581144,
                                26.746884979395567
                            ],
                            [
                                83.2314135878723,
                                26.74663564439037
                            ],
                            [
                                83.23116682766272,
                                26.745831022861516
                            ],
                            [
                                83.23086639005548,
                                26.745246628154764
                            ],
                            [
                                83.23061941483168,
                                26.74392411463977
                            ],
                            [
                                83.23019027709962,
                                26.74400076370775
                            ],
                            [
                                83.22973966598512,
                                26.744096574970044
                            ],
                            [
                                83.22680000418057,
                                26.744843900045126
                            ],
                            [
                                83.22523363731925,
                                26.74520797971251
                            ],
                            [
                                83.22394616913694,
                                26.745495410205336
                            ],
                            [
                                83.22343123999221,
                                26.745610382199022
                            ],
                            [
                                83.22319521738163,
                                26.745897811674553
                            ],
                            [
                                83.22321663970551,
                                26.745667868152253
                            ],
                            [
                                83.22306641243522,
                                26.746012783261307
                            ],
                            [
                                83.22276580982148,
                                26.746415161477053
                            ],
                            [
                                83.22308760196363,
                                26.74911704713041
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
                "name": "IGL Gorakhpur",
                "state": null,
                "category": "Manufacturing Plant/Factory/Yard",
                "subDistrict": null,
                "controllingBranchId": null
            },
            "controllingBranchId": null,
            "gateOutTime": 1679286561000,
            "status": "COMPLETED"
        },
        {
            "departureTime": null,
            "gateInTime": null,
            "actualActivityStartTime": null,
            "actualActivityEndTime": null,
            "uuid": "9a81aa37-1d37-41dd-ac39-b5469a6bcc35",
            "consignmentDelivered": null,
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": null,
            "hub": null,
            "arrivalTime": null,
            "expectedActivityStartTime": null,
            "secondaryStatus": null,
            "consignmentPickUps": null,
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": 1679287857345,
                "purpose": "Delivery",
                "plannedArrival": null,
                "currentGpsState": {
                    "numberOfRecord": 109,
                    "totalTime": 2772000,
                    "averageSpeeds": 30.048067248907614,
                    "eventType": "StateUpdated",
                    "uuid": "8a205e7f-7a40-4e67-a871-f34c8bbd76b6",
                    "isDisconnected": false,
                    "startLocation": {
                        "isFillingEnabled": false,
                        "address": "Gorakhpur Rd, Sahjanwa, Uttar Pradesh 273209, India",
                        "lngLat": [
                            83.224992,
                            26.747501999999997
                        ],
                        "odometer": null,
                        "latitude": 26.747501999999997,
                        "course": 0,
                        "imei": "937066741860",
                        "decoder": "elock",
                        "time": 1679286381000,
                        "vehicleId": null,
                        "speed": 1,
                        "longitude": 83.224992
                    },
                    "isNoGpsZone": false,
                    "mean": {
                        "isFillingEnabled": false,
                        "address": "",
                        "lngLat": [
                            83.1396063119266,
                            26.76172735779817
                        ],
                        "odometer": null,
                        "latitude": 26.76172735779817,
                        "course": null,
                        "imei": "",
                        "decoder": null,
                        "time": 1679287645562,
                        "vehicleId": "",
                        "speed": 0,
                        "longitude": 83.1396063119266
                    },
                    "imei": "937066741860",
                    "startTime": 1679286381000,
                    "endTime": 1679289153000,
                    "vehicleId": null,
                    "state": "Moving",
                    "totalDistance": 23137.011781658864,
                    "endLocation": {
                        "isFillingEnabled": false,
                        "address": null,
                        "lngLat": [
                            83.01259999999999,
                            26.785584
                        ],
                        "odometer": null,
                        "latitude": 26.785584,
                        "course": 269,
                        "imei": "937066741860",
                        "decoder": "elock",
                        "time": 1679289153000,
                        "vehicleId": null,
                        "speed": 184,
                        "longitude": 83.01259999999999
                    }
                },
                "updates": {
                    "traceID": "vehiclegpsstatetopic_5_10085975",
                    "resourceId": "9a81aa37-1d37-41dd-ac39-b5469a6bcc35",
                    "updatedBy": "SYSTEM",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": "From UPCOMING to UPCOMING",
                    "forwardReasons": [
                        "trippoint.current.location.updated",
                        "gps.state.updated",
                        "trippoint.updated"
                    ],
                    "userId": null,
                    "uuid": "b06a7c69-c07a-4718-8f01-4e79470ba37a",
                    "revision": 27,
                    "time": 1679289519165,
                    "forwardedFrom": null,
                    "resourceType": "TripPoint",
                    "updateType": null
                },
                "uuid": "9a81aa37-1d37-41dd-ac39-b5469a6bcc35",
                "sequenceId": null,
                "isDisconnected": false,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": 5000,
                "eta": null,
                "routeId": "890c2e68-4eda-4d87-8d88-e194f66d41e2",
                "expectedActivityStartTime": null,
                "actualDeparture": null,
                "vehicleId": "937066741860",
                "place": {
                    "hubId": null,
                    "boundary": null,
                    "address": "NH27, Patel nagar, Basti, Uttar Pradesh 272002, India",
                    "accessibility": "public",
                    "addedBy": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
                    "center": {
                        "latitude": 26.80837033168565,
                        "longitude": 82.74421888168504
                    },
                    "suggestedRadius": 500,
                    "isOwned": false,
                    "centerCoordinates": [
                        82.74421888168504,
                        26.80837033168565
                    ],
                    "placeId": "0d579258-fc9b-49ac-b794-5b66cdb80480",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "FRETRON",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "BASTI-AJAY SINGH",
                    "state": null,
                    "category": "Unloading Point",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "remainingDistance": 61961.13610791413,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "9a81aa37-1d37-41dd-ac39-b5469a6bcc35"
                ],
                "actualActivityEndTime": null,
                "actualArrival": null,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": {
                    "isFillingEnabled": false,
                    "address": null,
                    "lngLat": [
                        83.01259999999999,
                        26.785584
                    ],
                    "odometer": null,
                    "latitude": 26.785584,
                    "course": 269,
                    "imei": "937066741860",
                    "decoder": "elock",
                    "time": 1679289153000,
                    "vehicleId": null,
                    "speed": 184,
                    "longitude": 83.01259999999999
                },
                "isAutoCompleted": false,
                "coveredDistance": 2241.297068551834,
                "hub": null,
                "imei": "937066741860",
                "assosiatedShipmentsId": [
                    "f19560d3-a633-46b4-9946-0b5d35398816"
                ],
                "status": "UPCOMING"
            },
            "place": {
                "hubId": null,
                "boundary": null,
                "address": "NH27, Patel nagar, Basti, Uttar Pradesh 272002, India",
                "accessibility": "public",
                "addedBy": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
                "center": {
                    "latitude": 26.80837033168565,
                    "longitude": 82.74421888168504
                },
                "suggestedRadius": 500,
                "isOwned": false,
                "centerCoordinates": [
                    82.74421888168504,
                    26.80837033168565
                ],
                "placeId": "0d579258-fc9b-49ac-b794-5b66cdb80480",
                "geoJsonBoundry": null,
                "externalId": null,
                "source": "FRETRON",
                "places": null,
                "viewport": null,
                "district": null,
                "name": "BASTI-AJAY SINGH",
                "state": null,
                "category": "Unloading Point",
                "subDistrict": null,
                "controllingBranchId": null
            },
            "controllingBranchId": null,
            "gateOutTime": null,
            "status": "UPCOMING"
        },
        {
            "departureTime": null,
            "gateInTime": null,
            "actualActivityStartTime": null,
            "actualActivityEndTime": null,
            "uuid": "4de125b7-e1be-4452-a6df-1974513c7084",
            "consignmentDelivered": null,
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": null,
            "hub": null,
            "arrivalTime": null,
            "expectedActivityStartTime": null,
            "secondaryStatus": null,
            "consignmentPickUps": null,
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": null,
                "purpose": "Delivery",
                "plannedArrival": null,
                "currentGpsState": null,
                "updates": null,
                "uuid": null,
                "sequenceId": null,
                "isDisconnected": false,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": null,
                "eta": null,
                "routeId": null,
                "expectedActivityStartTime": null,
                "actualDeparture": null,
                "vehicleId": null,
                "place": null,
                "remainingDistance": null,
                "actualActivityStartTime": null,
                "forShipmentStages": null,
                "actualActivityEndTime": null,
                "actualArrival": null,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": null,
                "isAutoCompleted": false,
                "coveredDistance": null,
                "hub": null,
                "imei": null,
                "assosiatedShipmentsId": null,
                "status": "NEXT"
            },
            "place": {
                "hubId": null,
                "boundary": null,
                "address": "Gorakhpur Rd, Sahjanwa, Uttar Pradesh 273209, India",
                "accessibility": "public",
                "addedBy": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
                "center": {
                    "latitude": 26.74759979968044,
                    "longitude": 83.22455528169571
                },
                "suggestedRadius": 0,
                "isOwned": false,
                "centerCoordinates": [
                    83.22455528169571,
                    26.74759979968044
                ],
                "placeId": "86927051-a4d0-42dd-b875-78755290ed56",
                "geoJsonBoundry": {
                    "coordinates": [
                        [
                            [
                                83.22308760196363,
                                26.74911704713041
                            ],
                            [
                                83.22332371592744,
                                26.751378605166447
                            ],
                            [
                                83.22424645871926,
                                26.751435477694546
                            ],
                            [
                                83.22512614472458,
                                26.751205545373193
                            ],
                            [
                                83.22489018888284,
                                26.750898968221204
                            ],
                            [
                                83.22563077543376,
                                26.74958586173847
                            ],
                            [
                                83.2264997628385,
                                26.74934658437746
                            ],
                            [
                                83.22692885588577,
                                26.74919337061778
                            ],
                            [
                                83.22748675536086,
                                26.749193262510012
                            ],
                            [
                                83.22907456874208,
                                26.74896332565311
                            ],
                            [
                                83.22971823247104,
                                26.748905795034208
                            ],
                            [
                                83.23012593428084,
                                26.748810003268762
                            ],
                            [
                                83.23083412805342,
                                26.748790764597064
                            ],
                            [
                                83.23156374930059,
                                26.748426974396413
                            ],
                            [
                                83.23152057029186,
                                26.747967282447192
                            ],
                            [
                                83.2315208581144,
                                26.746884979395567
                            ],
                            [
                                83.2314135878723,
                                26.74663564439037
                            ],
                            [
                                83.23116682766272,
                                26.745831022861516
                            ],
                            [
                                83.23086639005548,
                                26.745246628154764
                            ],
                            [
                                83.23061941483168,
                                26.74392411463977
                            ],
                            [
                                83.23019027709962,
                                26.74400076370775
                            ],
                            [
                                83.22973966598512,
                                26.744096574970044
                            ],
                            [
                                83.22680000418057,
                                26.744843900045126
                            ],
                            [
                                83.22523363731925,
                                26.74520797971251
                            ],
                            [
                                83.22394616913694,
                                26.745495410205336
                            ],
                            [
                                83.22343123999221,
                                26.745610382199022
                            ],
                            [
                                83.22319521738163,
                                26.745897811674553
                            ],
                            [
                                83.22321663970551,
                                26.745667868152253
                            ],
                            [
                                83.22306641243522,
                                26.746012783261307
                            ],
                            [
                                83.22276580982148,
                                26.746415161477053
                            ],
                            [
                                83.22308760196363,
                                26.74911704713041
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
                "name": "IGL Gorakhpur",
                "state": null,
                "category": "Manufacturing Plant/Factory/Yard",
                "subDistrict": null,
                "controllingBranchId": null
            },
            "controllingBranchId": null,
            "gateOutTime": null,
            "status": "NEXT"
        }
    ],
    "remarks": null,
    "syncUpExpiryTime": null,
    "shipmentStatus": "Planned"
}

function getFromCf(cfs, key) {
    if (cfs == null) {
        return null
    } else {
        let found = cfs.find(_ => _.fieldKey == key)
        return found ? found.value : null
    }
}

function epochToTime(epoch) {
    const dateObj = new Date(epoch);
    const formattedTime = dateObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    let value = formattedTime.split(":")
    let time = value[0]
    let ampmValue = value[1].split(" ")[1]
    let timeAndAMPM = [time, ampmValue]
    return timeAndAMPM
}

const districtNightDayTimeMap = {
    "GORAKHPUR": {
        dayHrs: 4,
        nightHrs: 15
    },
    "DEORIA": {
        dayHrs: 6,
        nightHrs: 15
    },
    "KUSHINAGAR": {
        dayHrs: 6,
        nightHrs: 15
    },
    "BASTI": {
        dayHrs: 6,
        nightHrs: 15
    },
    "AZAMGARH": {
        dayHrs: 8,
        nightHrs: 15
    },
    "MAU": {
        dayHrs: 6,
        nightHrs: 15
    },
    "BALLIA": {
        dayHrs: 8,
        nightHrs: 15
    },
    "FATEHPUR": {
        dayHrs: 20,
        nightHrs: 20
    },
    "JAUNPUR": {
        dayHrs: 9,
        nightHrs: 15
    },
    "AMETHI": {
        dayHrs: 9,
        nightHrs: 15
    },
    "SULTANPUR": {
        dayHrs: 20,
        nightHrs: 20
    },
    "MAHARAJGANJ": {
        dayHrs: 6,
        nightHrs: 15
    },
    "SIDDARTHNAGAR": {
        dayHrs: 7,
        nightHrs: 15
    },
    "FAIZABAD": {
        dayHrs: 8,
        nightHrs: 15
    },
    "VARANASI": {
        dayHrs: 0,
        nightHrs: 17
    },
    "AGRA": {
        dayHrs: 0,
        nightHrs: 44
    },
    "MATHURA": {
        dayHrs: 0,
        nightHrs: 44
    },
    "LUCKNOW": {
        dayHrs: 0,
        nightHrs: 20
    },
    "SITAPUR": {
        dayHrs: 0,
        nightHrs: 20
    },
    "KHIRI": {
        dayHrs: 2,
        nightHrs: 20
    },
    "IGL GORAKHPUR": {
        dayHrs: 2,
        nightHrs: 20
    }
}




async function main() {
    try {
        let shObj = $event
        let cfs = (shObj?.customFields?.length) ? shObj.customFields : null
        let type_cf = getFromCf(cfs, "Type")
        let vehicleType_cf = getFromCf(cfs, "Vehicle Type")
        let stageLength = shObj.shipmentStages?.length
        console.log(stageLength);
        if (type_cf == "Outbound" && vehicleType_cf == "Dedicated" && stageLength == 3) {
            let districtName = shObj.shipmentStages[1]?.place?.name ? shObj.shipmentStages[1].place.name : shObj.shipmentStages[1]?.hub?.name
            if (!districtName) {
                console.log("District name not found for this shipment :", shObj.shipmentNumber);
                return
            }
            districtName = (districtName.split("-")[0]).toUpperCase()
            console.log(districtName);

            let districtNameFromMap = districtNightDayTimeMap[districtName] ? true : false

            if (districtNameFromMap) {
                let eta = 0
                let dayHrs = districtNightDayTimeMap[districtName].dayHrs * 60 * 60 * 1000;

                let nightHrs = districtNightDayTimeMap[districtName].nightHrs * 60 * 60 * 1000;
                let departureTime = shObj.shipmentStages[0]?.departureTime
                let time = epochToTime(departureTime)
                console.log(time.length);
                if ((time[0] > 4 && time[1] == "PM") || (time[0] < 6 && time[1] == "AM")) {
                    console.log("night")
                    eta = departureTime + nightHrs
                }
                else if ((time[0] > 6 && time[1] == "AM") || (time[0] < 4 && time[1] == "PM")) {
                    console.log("day");
                    eta = departureTime + dayHrs
                }
                if (eta) {

                    shObj.shipmentStages[1].eta = eta
                    console.log("eta: " + eta);
                }

                return { "data": shObj, "status": 200, "updatedKey": ["eta_1"], "error": null }

            }
            else {
                console.log("district not found in districtMap for this shipment", shObj.shipmentNumber);
            }
        }
        else {
            console.log("not outbound case or not dedicated vehicle or not stages length 3 for this shipment", shObj.shipmentNumber);
        }
        return { "data": shObj, "status": 200, "updatedKey": [], "error": null }
    }
    catch (e) {
        console.log("error executing while updating eta:", e.message);
        return { "data": null, "status": 400, "updatedKey": [], "error": e.message }
    }
}


main().then((v) => {
    console.log(v);
})


