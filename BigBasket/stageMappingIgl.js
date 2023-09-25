const rp = require("request-promise")

const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Nzk2NTA5MjEsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNDcyYjNjNTEtZDhlOS00Mjk0LThhN2YtYTY5MDkzYjUwNWI3IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.FXmhuL5XXH8TFu4uznsIAzDPSK3Nlsxeet7jzWmOXnk"

const $event = {
    "creationTime": 1679577006771,
    "customFields": [
        {
            "indexedValue": [
                "Category_Rice Husk"
            ],
            "fieldKey": "Category",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": null,
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
                "Grain",
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
            "value": "Rice Husk",
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
            "description": "",
            "remark": "",
            "uuid": "3137c4d3-816e-442a-8aea-685aeb98a9cb",
            "required": false,
            "accessType": null,
            "input": "",
            "unit": "",
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
                "Plant Tracking Last Update_1679580809384"
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
            "value": "1679580809384",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Device Battery %_100"
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
            "value": "100",
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
                "ProcessingStateName_Rice Husk Yard"
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
            "value": "Rice Husk Yard",
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
    "lastSyncUpTime": 1679583698490,
    "updates": {
        "traceID": "PATRATU_EVENT_1679583698936",
        "resourceId": "ce40b77c-a2e8-4f54-b74a-06846f49c0b7",
        "updatedBy": "USER",
        "changes": null,
        "sourceOfInformation": null,
        "description": "Added InPlantTATCalculated : Yes",
        "forwardReasons": [
            "shipment.custom.fields.updated"
        ],
        "userId": "a42e539c-88f3-42cf-a1e7-d13e0b60833d",
        "uuid": "8debf708-08eb-4d38-a453-5aab7ef54ed1",
        "revision": 23,
        "time": 1679583699324,
        "forwardedFrom": "InPlantTATCalculated",
        "resourceType": "ShipmentObject",
        "updateType": null
    },
    "isActive": false,
    "uuid": "ce40b77c-a2e8-4f54-b74a-06846f49c0b7",
    "issues": null,
    "branch": null,
    "orgId": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
    "shipmentType": "DirectLeg",
    "completionTime": 1679583700914,
    "routeId": null,
    "shipmentTrackingStatus": null,
    "lastForwardTime": 1679583698510,
    "runningStatus": null,
    "delayTrackingStatus": null,
    "delayReasonLastUpdateTime": null,
    "links": null,
    "shipmentDate": 1679577006340,
    "delayReason": null,
    "shipmentNumber": "FRETSH0017513",
    "originalEdd": 1679792722389,
    "edd": 1679792722389,
    "delayReasonUpdateExpiryTime": null,
    "externalShipmentId": null,
    "fleetInfo": {
        "isTrackingEnable": null,
        "forwardingAgent": null,
        "verificationStatus": null,
        "trackingMode": "VTS",
        "broker": {
            "geoFence": null,
            "documents": null,
            "customFields": null,
            "isPortalEnabled": true,
            "type": "vendor",
            "updates": null,
            "uuid": null,
            "orgId": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
            "firmType": "INDIVISUAL",
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
            "verificationStatus": "unverified",
            "externalId": null,
            "panNumber": null,
            "aadharNo": null,
            "parentId": null,
            "places": null,
            "route": null,
            "name": "MAHADEV",
            "location": null,
            "fretronId": null,
            "contacts": null,
            "status": "ACTIVE"
        },
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
            "vehicleLoadType": null,
            "associatedWith": null,
            "isDeleted": null,
            "customerId": null,
            "vehicleModel": null,
            "mileageEmpty": null,
            "mileageLoaded": null,
            "vehicleType": null,
            "groups": null,
            "externalId": null,
            "updateTime": null,
            "sharedWith": [],
            "baseLocationId": null,
            "vehicleMake": null,
            "vehicleRegistrationNumber": "UP53CS7912",
            "chassisNumber": null,
            "driverId": null,
            "createTime": null,
            "loadCapacity": null,
            "truckLength": null,
            "category": null,
            "groupsExtended": null
        },
        "driver": {
            "pincode": null,
            "dlExpiryTime": null,
            "attachedDocs": null,
            "isEmployee": false,
            "pfNumber": null,
            "address": null,
            "mobileNumbers": null,
            "dlNumber": null,
            "mobileNumber": "9936335009",
            "customFields": [],
            "externalId": null,
            "updates": null,
            "aadharNo": null,
            "type": null,
            "uuid": null,
            "branch": null,
            "orgId": null,
            "vehicleRegistrationNumber": null,
            "name": "RAMANAND",
            "vehicleId": null,
            "associatedUserId": null,
            "status": null
        },
        "fleetType": "Owned",
        "fleetOwner": null,
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
            "imei": "869689042844209",
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
            83.22436444444443,
            26.7476
        ],
        "odometer": null,
        "latitude": 26.7476,
        "course": 20,
        "imei": "869689042844209",
        "decoder": "Concox",
        "time": 1679577005050,
        "vehicleId": null,
        "speed": 0,
        "longitude": 83.22436444444443
    },
    "alerts": [
        {
            "closedBy": null,
            "createdAt": 1679577006996,
            "issueId": null,
            "createdBy": null,
            "snoozTime": null,
            "description": "Unplanned Enroute stoppage at 8:25 AM | 22-03-23",
            "type": "shipment.unplanned.stoppage.notification",
            "uuid": "ad5712ec-1463-45da-a261-b22244bbb3e1",
            "status": "CLOSED",
            "updatedAt": 1679577007046
        }
    ],
    "equipments": null,
    "tripType": "Shipment",
    "lastDelayCalculationTime": 1679582660790,
    "delayReasonUpdateDueTime": null,
    "locationTrackingStatus": null,
    "poLineItemId": null,
    "consignments": [],
    "customContacts": null,
    "shipmentStages": [
        {
            "departureTime": 1679577006313,
            "gateInTime": null,
            "actualActivityStartTime": 1679577006313,
            "actualActivityEndTime": 1679577006313,
            "uuid": "9d67f948-2dd8-47f4-b682-3151398702e5",
            "consignmentDelivered": null,
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": null,
            "hub": null,
            "arrivalTime": 1679577005813,
            "expectedActivityStartTime": null,
            "secondaryStatus": "WaitingForFinalize",
            "consignmentPickUps": null,
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": 1679577006802,
                "purpose": "Pickup",
                "plannedArrival": null,
                "currentGpsState": {
                    "numberOfRecord": 188,
                    "totalTime": 123302050,
                    "averageSpeeds": 0.017449199309269775,
                    "eventType": "StateUpdated",
                    "uuid": "0576d61b-3502-499f-9705-51447efa2b87",
                    "isDisconnected": false,
                    "startLocation": {
                        "isFillingEnabled": false,
                        "address": "Gorakhpur Rd, Sahjanwa, Uttar Pradesh 273209, India",
                        "lngLat": [
                            83.22438333333334,
                            26.7476
                        ],
                        "odometer": {
                            "isSoftwareMeterManuallyCalibrated": null,
                            "softwareMeter": null,
                            "hardwareDistance": null,
                            "lastUpdateTime": null,
                            "lastCalibrationTime": null,
                            "hardwareReading": null
                        },
                        "latitude": 26.7476,
                        "course": 302,
                        "imei": "869689042844209",
                        "decoder": "Concox",
                        "time": 1679453703000,
                        "vehicleId": null,
                        "speed": 5,
                        "longitude": 83.22438333333334
                    },
                    "isNoGpsZone": false,
                    "mean": {
                        "isFillingEnabled": false,
                        "address": "",
                        "lngLat": [
                            83.22438582151297,
                            26.747641335697423
                        ],
                        "odometer": null,
                        "latitude": 26.747641335697423,
                        "course": null,
                        "imei": "",
                        "decoder": null,
                        "time": 1679522184765,
                        "vehicleId": "",
                        "speed": 0,
                        "longitude": 83.22438582151297
                    },
                    "imei": "869689042844209",
                    "startTime": 1679453703000,
                    "endTime": 1679577005050,
                    "vehicleId": null,
                    "state": "Stopped",
                    "totalDistance": 597.6450126920964,
                    "endLocation": {
                        "isFillingEnabled": false,
                        "address": null,
                        "lngLat": [
                            83.22436444444443,
                            26.7476
                        ],
                        "odometer": {
                            "isSoftwareMeterManuallyCalibrated": null,
                            "softwareMeter": null,
                            "hardwareDistance": null,
                            "lastUpdateTime": null,
                            "lastCalibrationTime": null,
                            "hardwareReading": null
                        },
                        "latitude": 26.7476,
                        "course": 20,
                        "imei": "869689042844209",
                        "decoder": "Concox",
                        "time": 1679577005050,
                        "vehicleId": null,
                        "speed": 0,
                        "longitude": 83.22436444444443
                    }
                },
                "updates": {
                    "traceID": "46e240bd-dc01-4380-b287-5d6d8ffb03c9",
                    "resourceId": "9d67f948-2dd8-47f4-b682-3151398702e5",
                    "updatedBy": "SYSTEM",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": null,
                    "forwardReasons": [
                        "trippoint.created",
                        "gps.state.updated"
                    ],
                    "userId": null,
                    "uuid": "f255a9c1-1d8e-4dd2-914a-c3f7c00d0e34",
                    "revision": 0,
                    "time": 1679577006802,
                    "forwardedFrom": null,
                    "resourceType": "TripPoint",
                    "updateType": null
                },
                "uuid": "9d67f948-2dd8-47f4-b682-3151398702e5",
                "sequenceId": null,
                "isDisconnected": false,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": null,
                "eta": null,
                "routeId": null,
                "expectedActivityStartTime": null,
                "actualDeparture": null,
                "vehicleId": "869689042844209",
                "place": {
                    "hubId": null,
                    "boundary": null,
                    "address": "26-8, Mahatma Gandhi Marg, Narpatkhera, Hazratganj, Lucknow, Uttar Pradesh 226001, India",
                    "accessibility": "public",
                    "addedBy": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
                    "center": {
                        "latitude": 26.848692,
                        "longitude": 80.9425127
                    },
                    "suggestedRadius": 359,
                    "isOwned": false,
                    "centerCoordinates": [
                        80.9425127,
                        26.848692
                    ],
                    "placeId": "378c8a72-00ba-461a-9846-6bc6909703fe",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "FRETRON",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "lucknow - Gorakhpur road ( Dummy)",
                    "state": null,
                    "category": "Others",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "remainingDistance": 227009.52036655092,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "9d67f948-2dd8-47f4-b682-3151398702e5"
                ],
                "actualActivityEndTime": null,
                "actualArrival": null,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": {
                    "isFillingEnabled": false,
                    "address": null,
                    "lngLat": [
                        83.22436444444443,
                        26.7476
                    ],
                    "odometer": {
                        "isSoftwareMeterManuallyCalibrated": null,
                        "softwareMeter": null,
                        "hardwareDistance": null,
                        "lastUpdateTime": null,
                        "lastCalibrationTime": null,
                        "hardwareReading": null
                    },
                    "latitude": 26.7476,
                    "course": 20,
                    "imei": "869689042844209",
                    "decoder": "Concox",
                    "time": 1679577005050,
                    "vehicleId": null,
                    "speed": 0,
                    "longitude": 83.22436444444443
                },
                "isAutoCompleted": false,
                "coveredDistance": 15.283392898057667,
                "hub": {
                    "hubId": null,
                    "boundary": null,
                    "address": "26-8, Mahatma Gandhi Marg, Narpatkhera, Hazratganj, Lucknow, Uttar Pradesh 226001, India",
                    "accessibility": "public",
                    "addedBy": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
                    "center": {
                        "latitude": 26.848692,
                        "longitude": 80.9425127
                    },
                    "suggestedRadius": 359,
                    "isOwned": false,
                    "centerCoordinates": [
                        80.9425127,
                        26.848692
                    ],
                    "placeId": "378c8a72-00ba-461a-9846-6bc6909703fe",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "FRETRON",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "lucknow - Gorakhpur road ( Dummy)",
                    "state": null,
                    "category": "Others",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "imei": "869689042844209",
                "assosiatedShipmentsId": [
                    "ce40b77c-a2e8-4f54-b74a-06846f49c0b7"
                ],
                "status": "COMPLETED"
            },
            "place": {
                "hubId": null,
                "boundary": null,
                "address": "26-8, Mahatma Gandhi Marg, Narpatkhera, Hazratganj, Lucknow, Uttar Pradesh 226001, India",
                "accessibility": "public",
                "addedBy": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
                "center": {
                    "latitude": 26.848692,
                    "longitude": 80.9425127
                },
                "suggestedRadius": 359,
                "isOwned": false,
                "centerCoordinates": [
                    80.9425127,
                    26.848692
                ],
                "placeId": "378c8a72-00ba-461a-9846-6bc6909703fe",
                "geoJsonBoundry": {
                    "coordinates": [
                        [
                            [
                                83.22445789203847,
                                26.751585268801524
                            ],
                            [
                                83.22148382663728,
                                26.7521396425353
                            ],
                            [
                                83.22142481803895,
                                26.751727682681814
                            ],
                            [
                                83.22349548339845,
                                26.751473784259225
                            ],
                            [
                                83.22555541992189,
                                26.751186276219542
                            ],
                            [
                                83.2296645641327,
                                26.7503241338325
                            ],
                            [
                                83.22976112365724,
                                26.750721727927996
                            ],
                            [
                                83.22522523243379,
                                26.75145602955809
                            ],
                            [
                                83.22445789203847,
                                26.751585268801524
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
                "name": "lucknow - Gorakhpur road ( Dummy)",
                "state": null,
                "category": "Others",
                "subDistrict": null,
                "controllingBranchId": null
            },
            "controllingBranchId": null,
            "gateOutTime": null,
            "status": "COMPLETED"
        },
        {
            "departureTime": 1679583698706,
            "gateInTime": 1679577229000,
            "actualActivityStartTime": 1679580059000,
            "actualActivityEndTime": 1679582297000,
            "uuid": "5a283217-5598-4159-8b64-3dba2523bfbf",
            "consignmentDelivered": null,
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": null,
            "hub": null,
            "arrivalTime": 1679577006813,
            "expectedActivityStartTime": null,
            "secondaryStatus": null,
            "consignmentPickUps": null,
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": 1679577007147,
                "purpose": "Delivery",
                "plannedArrival": null,
                "currentGpsState": {
                    "numberOfRecord": 12,
                    "totalTime": 1338903,
                    "averageSpeeds": 2.410971631507972,
                    "eventType": "StateUpdated",
                    "uuid": "3eaa3b28-c3ec-4358-a519-12fee0c66c9a",
                    "isDisconnected": false,
                    "startLocation": {
                        "isFillingEnabled": false,
                        "address": "Unnamed Road, GIDA Industrial Area Phase 1, Sahjanwa, Uttar Pradesh 273209, India",
                        "lngLat": [
                            83.22778333333333,
                            26.7455
                        ],
                        "odometer": null,
                        "latitude": 26.7455,
                        "course": 207,
                        "imei": "869689042844209",
                        "decoder": "Concox",
                        "time": 1679582297000,
                        "vehicleId": null,
                        "speed": 7,
                        "longitude": 83.22778333333333
                    },
                    "isNoGpsZone": false,
                    "mean": {
                        "isFillingEnabled": false,
                        "address": "",
                        "lngLat": [
                            83.2258527777778,
                            26.746037500000003
                        ],
                        "odometer": null,
                        "latitude": 26.746037500000003,
                        "course": null,
                        "imei": "",
                        "decoder": null,
                        "time": 1679582642165,
                        "vehicleId": "",
                        "speed": 0,
                        "longitude": 83.2258527777778
                    },
                    "imei": "869689042844209",
                    "startTime": 1679582297000,
                    "endTime": 1679583635903,
                    "vehicleId": null,
                    "state": "Moving",
                    "totalDistance": 261.85830775544923,
                    "endLocation": {
                        "isFillingEnabled": false,
                        "address": "Gorakhpur Rd, Sahjanwa, Uttar Pradesh 273209, India",
                        "lngLat": [
                            83.2253,
                            26.746216666666665
                        ],
                        "odometer": null,
                        "latitude": 26.746216666666665,
                        "course": 287,
                        "imei": "869689042844209",
                        "decoder": "Concox",
                        "time": 1679582688000,
                        "vehicleId": null,
                        "speed": 11,
                        "longitude": 83.2253
                    }
                },
                "updates": {
                    "traceID": "eef1c871-7680-4321-8544-7171c47d82bd",
                    "resourceId": "5a283217-5598-4159-8b64-3dba2523bfbf",
                    "updatedBy": "SYSTEM",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": null,
                    "forwardReasons": [
                        "trippoint.deleted"
                    ],
                    "userId": null,
                    "uuid": "ab1621bd-85e9-4b20-8777-35725bd49320",
                    "revision": 32,
                    "time": 1679583689571,
                    "forwardedFrom": null,
                    "resourceType": "TripPoint",
                    "updateType": null
                },
                "uuid": "5a283217-5598-4159-8b64-3dba2523bfbf",
                "sequenceId": null,
                "isDisconnected": false,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": 5000,
                "eta": null,
                "routeId": null,
                "expectedActivityStartTime": null,
                "actualDeparture": null,
                "vehicleId": "869689042844209",
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
                    "5a283217-5598-4159-8b64-3dba2523bfbf"
                ],
                "actualActivityEndTime": null,
                "actualArrival": 1679577006813,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": {
                    "isFillingEnabled": false,
                    "address": "Gorakhpur Rd, Sahjanwa, Uttar Pradesh 273209, India",
                    "lngLat": [
                        83.2253,
                        26.746216666666665
                    ],
                    "odometer": null,
                    "latitude": 26.746216666666665,
                    "course": 287,
                    "imei": "869689042844209",
                    "decoder": "Concox",
                    "time": 1679582688000,
                    "vehicleId": null,
                    "speed": 11,
                    "longitude": 83.2253
                },
                "isAutoCompleted": false,
                "coveredDistance": 15.283558245744548,
                "hub": null,
                "imei": "869689042844209",
                "assosiatedShipmentsId": [
                    "ce40b77c-a2e8-4f54-b74a-06846f49c0b7"
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
            "gateOutTime": 1679583691645,
            "status": "UPCOMING"
        }
    ],
    "remarks": null,
    "syncUpExpiryTime": null,
    "shipmentStatus": "Completed"
}

async function ensureEddEta(shId) {
    try {
        let uri = "https://apis.fretron.com/shipment/v1/shipment/ensure/edd-eta?shId=" + shId
        let res = await rp({
            url: uri,
            method: "get",
            json: true,
            headers: {
                authorization: token
            }
        })
        console.log(uri)

        return res.status == 200 ? "ok" : res.error
    }
    catch (e) {
        console.log(`error executing while ensure edd_eta ${e.message}`)
    }
}


function getFromCf(cfs, key) {
    if (cfs == null) {
        return null
    } else {
        let found = cfs.find(_ => _.fieldKey == key)
        return found ? found.value : null
    }
}

async function main($event) {
    let shObj = $event
    let cfs = (shObj?.customFields?.length) ? shObj.customFields : null
    let type_cf = getFromCf(cfs, "Type")
    let vehicleType_cf = getFromCf(cfs, "Vehicle Type")
    let stageLength = shObj.shipmentStages?.length

    if (type_cf == "Outbound" && vehicleType_cf == "Dedicated" && stageLength > 1 && shObj.shipmentStages[0].status == "COMPLETED" && shObj.shipmentStages[1].status == "UPCOMING") {
        console.log("Complete")
        let shId = shObj.uuid
        // let updated = await ensureEddEta(shId)
        // console.log(updated)

    }
    else {
        console.log(`shipment type ${type_cf} vehicle type ${vehicleType_cf} and stage length ${stageLength}`)
    }

}

try {
    main($event).then((v) => {
        console.log(v)
    })
} catch (e) {
    console.log(`Catched error : ${e.message}`)
}
