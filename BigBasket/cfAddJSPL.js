const rp = require("request-promise")

const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODExMTkxNzEsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNDk1Yjg3MjgtYzc2MS00ZmE3LTgzZmUtZGI3NWE3ZDYzMjIxIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.ccHGaLAovq1jQ1EYCO8IlhprVfixviAdJxEXynvzeFs"


const $event = {
    "creationTime": 1680780339962,
    "customFields": [
        {
            "indexedValue": [
                "EDD_1685100315094"
            ],
            "fieldKey": "EDD",
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
            "value": "1685100315094",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Pickup Date_4/6/2023, 4:55:39 PM"
            ],
            "fieldKey": "Pickup Date",
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
            "value": "4/6/2023, 4:55:39 PM",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Shipment Date_4/6/2023, 4:55:15 PM"
            ],
            "fieldKey": "Shipment Date",
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
            "value": "4/6/2023, 4:55:15 PM",
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
            "uuid": "f23b53b4-6431-4239-80af-6a16a6a5629f",
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
        }
    ],
    "transportationMode": "ByRoad",
    "freightUnitLineItemId": null,
    "lastSyncUpTime": 1681126701392,
    "updates": {
        "traceID": "tripPointEventsTopicByImei_6_11803933",
        "resourceId": "8d825467-f40d-4a5c-8c05-8daa62dd1e88",
        "updatedBy": "USER",
        "changes": null,
        "sourceOfInformation": null,
        "description": null,
        "forwardReasons": [
            "gps.state.updated"
        ],
        "userId": "868ac373-ed4f-407d-9a26-b6b0e17fae1f",
        "uuid": "974af2d1-9704-4356-8005-1d768a30cefe",
        "revision": 99,
        "time": 1681196924023,
        "forwardedFrom": null,
        "resourceType": "ShipmentObject",
        "updateType": "Enroute For Delivery"
    },
    "isActive": true,
    "uuid": "8d825467-f40d-4a5c-8c05-8daa62dd1e88",
    "issues": null,
    "branch": null,
    "orgId": "495b8728-c761-4fa7-83fe-db75a7d63221",
    "shipmentType": "DirectLeg",
    "completionTime": null,
    "routeId": null,
    "shipmentTrackingStatus": "Enroute For Delivery",
    "lastForwardTime": 1681193907964,
    "runningStatus": null,
    "delayTrackingStatus": "UP TO DATE",
    "delayReasonLastUpdateTime": null,
    "links": null,
    "shipmentDate": 1680780315094,
    "delayReason": null,
    "shipmentNumber": "FRETSH000000250",
    "originalEdd": 1685100315094,
    "edd": 1685100315094,
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
            "isPortalEnabled": false,
            "type": null,
            "updates": null,
            "uuid": "b54df125-4579-4c19-b721-eede7cbd40d2",
            "orgId": null,
            "firmType": null,
            "gstn": null,
            "voterId": null,
            "verificationTicketId": null,
            "group": {
                "name": "branch",
                "partnerType": null,
                "uuid": null,
                "orgId": null
            },
            "address": null,
            "verificationStatus": null,
            "externalId": null,
            "panNumber": null,
            "aadharNo": null,
            "parentId": null,
            "places": null,
            "route": null,
            "name": "frt branch",
            "location": null,
            "fretronId": null,
            "contacts": [
                {
                    "emails": [],
                    "address": null,
                    "mobileNumbers": [],
                    "mobileNumber": null,
                    "name": "frt branch",
                    "type": null
                }
            ],
            "status": null
        },
        "uuid": "b5fa1084-f0f2-4af4-bb98-67726ae9df55",
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
            "isTrackingEnabled": null,
            "updates": null,
            "uuid": null,
            "branch": null,
            "orgId": "495b8728-c761-4fa7-83fe-db75a7d63221",
            "vehicleLoadType": null,
            "associatedWith": null,
            "isDeleted": null,
            "customerId": null,
            "vehicleModel": null,
            "mileageEmpty": null,
            "mileageLoaded": null,
            "vehicleType": "truck 10w",
            "groups": null,
            "externalId": null,
            "updateTime": null,
            "sharedWith": [
                "FRETRON_GOD_FO"
            ],
            "baseLocationId": null,
            "vehicleMake": null,
            "vehicleRegistrationNumber": "UP94D8403",
            "chassisNumber": "2222222222222222222",
            "driverId": null,
            "createTime": null,
            "loadCapacity": 25,
            "truckLength": null,
            "category": null,
            "groupsExtended": null
        },
        "driver": null,
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
            "orgId": "495b8728-c761-4fa7-83fe-db75a7d63221",
            "attachedResourceId": null,
            "isDeleted": null,
            "createTime": null,
            "serviceProvider": null,
            "imei": "355172104808884",
            "usedBy": null,
            "status": null
        },
        "status": null
    },
    "syncUpDueTime": 1681205400000,
    "billingStatus": "UnSettled",
    "currentLocation": {
        "isFillingEnabled": false,
        "address": "Unnamed Road, Patratu, Jharkhand 829143, India",
        "lngLat": [
            85.32563555555556,
            23.631844444444447
        ],
        "odometer": null,
        "latitude": 23.631844444444447,
        "course": 144,
        "imei": "355172104808884",
        "decoder": "Concox",
        "time": 1681196923596,
        "vehicleId": null,
        "speed": 0,
        "longitude": 85.32563555555556
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
            "departureTime": 1681126968345,
            "gateInTime": null,
            "actualActivityStartTime": null,
            "actualActivityEndTime": null,
            "uuid": "4c5be759-6093-46f1-a046-ca1cf8876244",
            "consignmentDelivered": [],
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": null,
            "hub": {
                "hubId": null,
                "boundary": null,
                "address": "Patiala, Punjab, India",
                "accessibility": "private",
                "addedBy": "495b8728-c761-4fa7-83fe-db75a7d63221",
                "center": {
                    "latitude": 30.3397809,
                    "longitude": 76.3868797
                },
                "suggestedRadius": 13556.384638592523,
                "isOwned": null,
                "centerCoordinates": [
                    76.3868797,
                    30.3397809
                ],
                "placeId": "c642b4e5-fae5-4c94-8db4-5d15a7e9417d",
                "geoJsonBoundry": null,
                "externalId": null,
                "source": "GOOGLE",
                "places": null,
                "viewport": null,
                "district": null,
                "name": "PATIALA",
                "state": null,
                "category": "Hub",
                "subDistrict": null,
                "controllingBranchId": null
            },
            "arrivalTime": 1681126701311,
            "expectedActivityStartTime": null,
            "secondaryStatus": "WaitingForFinalize",
            "consignmentPickUps": [
                "0169398e-939d-4d4c-811e-0435cb7ca888"
            ],
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": 1680785047990,
                "purpose": "Pickup",
                "plannedArrival": null,
                "currentGpsState": {
                    "numberOfRecord": 11,
                    "totalTime": 1011345,
                    "averageSpeeds": 0.11559801756600108,
                    "eventType": "StateUpdated",
                    "uuid": "e6d8b217-0301-41c9-b33a-36aaff2243e3",
                    "isDisconnected": false,
                    "startLocation": {
                        "isFillingEnabled": false,
                        "address": "Ranchi Patratu Ramgarh Rd, Patratu, Jharkhand 829143, India",
                        "lngLat": [
                            85.32656,
                            23.643988888888888
                        ],
                        "odometer": null,
                        "latitude": 23.643988888888888,
                        "course": 109,
                        "imei": "355172104808884",
                        "decoder": "Concox",
                        "time": 1681125957000,
                        "vehicleId": null,
                        "speed": 9,
                        "longitude": 85.32656
                    },
                    "isNoGpsZone": false,
                    "mean": {
                        "isFillingEnabled": false,
                        "address": "",
                        "lngLat": [
                            85.32664080808082,
                            23.64393030303031
                        ],
                        "odometer": null,
                        "latitude": 23.64393030303031,
                        "course": null,
                        "imei": "",
                        "decoder": null,
                        "time": 1681126284271,
                        "vehicleId": "",
                        "speed": 0,
                        "longitude": 85.32664080808082
                    },
                    "imei": "355172104808884",
                    "startTime": 1681125957000,
                    "endTime": 1681126968345,
                    "vehicleId": null,
                    "state": "Stopped",
                    "totalDistance": 11.559801756600109,
                    "endLocation": {
                        "isFillingEnabled": false,
                        "address": "Ranchi Patratu Ramgarh Rd, Patratu, Jharkhand 829143, India",
                        "lngLat": [
                            85.3266488888889,
                            23.643924444444444
                        ],
                        "odometer": null,
                        "latitude": 23.643924444444444,
                        "course": 111,
                        "imei": "355172104808884",
                        "decoder": "Concox",
                        "time": 1681126317000,
                        "vehicleId": null,
                        "speed": 7,
                        "longitude": 85.3266488888889
                    }
                },
                "updates": {
                    "traceID": "vehiclegpsstatetopic_16_12491417",
                    "resourceId": "4c5be759-6093-46f1-a046-ca1cf8876244",
                    "updatedBy": "SYSTEM",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": "From AT to COMPLETED",
                    "forwardReasons": [
                        "trippoint.current.location.updated",
                        "gps.state.updated"
                    ],
                    "userId": null,
                    "uuid": "b504b1da-5e41-44a0-a6d3-4aaa855a9a68",
                    "revision": 1717,
                    "time": 1681126970659,
                    "forwardedFrom": null,
                    "resourceType": "TripPoint",
                    "updateType": null
                },
                "uuid": "4c5be759-6093-46f1-a046-ca1cf8876244",
                "sequenceId": null,
                "isDisconnected": false,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": null,
                "eta": null,
                "routeId": null,
                "expectedActivityStartTime": null,
                "actualDeparture": 1681126968345,
                "vehicleId": "355172104808884",
                "place": null,
                "remainingDistance": 1459481.675,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "4c5be759-6093-46f1-a046-ca1cf8876244"
                ],
                "actualActivityEndTime": 1681126968345,
                "actualArrival": 1681126701311,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": {
                    "isFillingEnabled": false,
                    "address": "Ranchi Patratu Ramgarh Rd, Patratu, Jharkhand 829143, India",
                    "lngLat": [
                        85.3266488888889,
                        23.643924444444444
                    ],
                    "odometer": null,
                    "latitude": 23.643924444444444,
                    "course": 111,
                    "imei": "355172104808884",
                    "decoder": "Concox",
                    "time": 1681126317000,
                    "vehicleId": null,
                    "speed": 7,
                    "longitude": 85.3266488888889
                },
                "isAutoCompleted": true,
                "coveredDistance": 388320.1422902354,
                "hub": {
                    "hubId": null,
                    "boundary": null,
                    "address": "Patiala, Punjab, India",
                    "accessibility": "private",
                    "addedBy": "495b8728-c761-4fa7-83fe-db75a7d63221",
                    "center": {
                        "latitude": 30.3397809,
                        "longitude": 76.3868797
                    },
                    "suggestedRadius": 13556.384638592523,
                    "isOwned": null,
                    "centerCoordinates": [
                        76.3868797,
                        30.3397809
                    ],
                    "placeId": "c642b4e5-fae5-4c94-8db4-5d15a7e9417d",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "GOOGLE",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "PATIALA",
                    "state": null,
                    "category": "Hub",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "imei": "355172104808884",
                "assosiatedShipmentsId": [
                    "8d825467-f40d-4a5c-8c05-8daa62dd1e88"
                ],
                "status": "COMPLETED"
            },
            "place": null,
            "controllingBranchId": null,
            "gateOutTime": null,
            "status": "COMPLETED"
        },
        {
            "departureTime": null,
            "gateInTime": null,
            "actualActivityStartTime": null,
            "actualActivityEndTime": null,
            "uuid": "b37a5228-65df-41ef-8c0a-f0e3484777ca",
            "consignmentDelivered": [
                "0169398e-939d-4d4c-811e-0435cb7ca888"
            ],
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": 1685100315094,
            "stageName": null,
            "hub": {
                "hubId": null,
                "boundary": null,
                "address": null,
                "accessibility": "private",
                "addedBy": "495b8728-c761-4fa7-83fe-db75a7d63221",
                "center": {
                    "latitude": 0,
                    "longitude": 0
                },
                "suggestedRadius": 0,
                "isOwned": null,
                "centerCoordinates": [
                    0,
                    0
                ],
                "placeId": "5acddd2c-abbf-430b-af97-a4db39894548",
                "geoJsonBoundry": null,
                "externalId": null,
                "source": "GOOGLE",
                "places": null,
                "viewport": null,
                "district": "District Name",
                "name": "CHAITANYA LOGISTICS PVT LTD.",
                "state": "State",
                "category": "Hub",
                "subDistrict": null,
                "controllingBranchId": null
            },
            "arrivalTime": null,
            "expectedActivityStartTime": null,
            "secondaryStatus": null,
            "consignmentPickUps": [],
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": 1681126970881,
                "purpose": "Delivery",
                "plannedArrival": 1685100315094,
                "currentGpsState": {
                    "numberOfRecord": 3,
                    "totalTime": 2143596,
                    "averageSpeeds": 0.32116287339648675,
                    "eventType": "StateUpdated",
                    "uuid": "713bcbb5-b6ab-45f1-ae6f-742b6c0b74ef",
                    "isDisconnected": false,
                    "startLocation": {
                        "isFillingEnabled": false,
                        "address": "Unnamed Road, Patratu, Jharkhand 829143, India",
                        "lngLat": [
                            85.32539555555556,
                            23.631697777777777
                        ],
                        "odometer": null,
                        "latitude": 23.631697777777777,
                        "course": 9,
                        "imei": "355172104808884",
                        "decoder": "Concox",
                        "time": 1681194780000,
                        "vehicleId": null,
                        "speed": 8,
                        "longitude": 85.32539555555556
                    },
                    "isNoGpsZone": false,
                    "mean": {
                        "isFillingEnabled": false,
                        "address": "Unnamed Road, Patratu, Jharkhand 829143, India",
                        "lngLat": [
                            85.32553777777777,
                            23.631792592592593
                        ],
                        "odometer": null,
                        "latitude": 23.631792592592593,
                        "course": null,
                        "imei": "",
                        "decoder": null,
                        "time": 1681194909333,
                        "vehicleId": "",
                        "speed": 0,
                        "longitude": 85.32553777777777
                    },
                    "imei": "355172104808884",
                    "startTime": 1681194780000,
                    "endTime": 1681196923596,
                    "vehicleId": null,
                    "state": "Stopped",
                    "totalDistance": 29.97520151700543,
                    "endLocation": {
                        "isFillingEnabled": false,
                        "address": "Unnamed Road, Patratu, Jharkhand 829143, India",
                        "lngLat": [
                            85.32563555555556,
                            23.631844444444447
                        ],
                        "odometer": null,
                        "latitude": 23.631844444444447,
                        "course": 144,
                        "imei": "355172104808884",
                        "decoder": "Concox",
                        "time": 1681195116000,
                        "vehicleId": null,
                        "speed": 0,
                        "longitude": 85.32563555555556
                    }
                },
                "updates": {
                    "traceID": "vehiclegpsstatetopic_16_12578984",
                    "resourceId": "b37a5228-65df-41ef-8c0a-f0e3484777ca",
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
                    "uuid": "12174e5b-aff7-437f-aa89-13ac00682fe1",
                    "revision": 242,
                    "time": 1681196924007,
                    "forwardedFrom": null,
                    "resourceType": "TripPoint",
                    "updateType": null
                },
                "uuid": "b37a5228-65df-41ef-8c0a-f0e3484777ca",
                "sequenceId": null,
                "isDisconnected": false,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": null,
                "eta": 1685100315094,
                "routeId": null,
                "expectedActivityStartTime": null,
                "actualDeparture": null,
                "vehicleId": "355172104808884",
                "place": null,
                "remainingDistance": 9542127.793179434,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "b37a5228-65df-41ef-8c0a-f0e3484777ca"
                ],
                "actualActivityEndTime": null,
                "actualArrival": null,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": {
                    "isFillingEnabled": false,
                    "address": "Unnamed Road, Patratu, Jharkhand 829143, India",
                    "lngLat": [
                        85.32563555555556,
                        23.631844444444447
                    ],
                    "odometer": null,
                    "latitude": 23.631844444444447,
                    "course": 144,
                    "imei": "355172104808884",
                    "decoder": "Concox",
                    "time": 1681195116000,
                    "vehicleId": null,
                    "speed": 0,
                    "longitude": 85.32563555555556
                },
                "isAutoCompleted": false,
                "coveredDistance": 3954.41348962443,
                "hub": {
                    "hubId": null,
                    "boundary": null,
                    "address": null,
                    "accessibility": "private",
                    "addedBy": "495b8728-c761-4fa7-83fe-db75a7d63221",
                    "center": {
                        "latitude": 0,
                        "longitude": 0
                    },
                    "suggestedRadius": 0,
                    "isOwned": null,
                    "centerCoordinates": [
                        0,
                        0
                    ],
                    "placeId": "5acddd2c-abbf-430b-af97-a4db39894548",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "GOOGLE",
                    "places": null,
                    "viewport": null,
                    "district": "District Name",
                    "name": "CHAITANYA LOGISTICS PVT LTD.",
                    "state": "State",
                    "category": "Hub",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "imei": "355172104808884",
                "assosiatedShipmentsId": [
                    "8d825467-f40d-4a5c-8c05-8daa62dd1e88"
                ],
                "status": "UPCOMING"
            },
            "place": null,
            "controllingBranchId": null,
            "gateOutTime": null,
            "status": "UPCOMING"
        }
    ],
    "remarks": null,
    "syncUpExpiryTime": null,
    "shipmentStatus": "Planned"
}

async function addCfGPSDisconnectionTime(payload) {
    try {
        let res = await rp({
            url: "https://apis.fretron.com/shipment/v1/shipment/bulk/sync",
            json: true,
            method: "POST",
            body: payload,
            headers: {
                authorization: token
            }
        })
        if (res.status == 200) {
            return res.status
        }
        else {
            return null
        }

    } catch (e) {
        console.log(`error executing while adding cf :${e.message}`);
    }
}

async function main(sh) {
    let shNo = sh.shipmentNumber
    console.log(`shipmentNumber ${shNo}`);
    let shId = sh.uuid
    let gpsEndTime = ""
    let stages = sh?.shipmentStages
    if (stages && stages.length) {
        for (let item of stages) {
            if (item.status == "AT" || item.status == "UPCOMING") {
                console.log(`shipment stage status ${item.status}`);
                let endTime = item?.tripPoint?.currentGpsState?.endTime
                if (endTime) {
                    gpsEndTime = endTime
                    console.log(`gpsEndTime ${gpsEndTime}`);
                }
                else {
                    let currentTime = Date.now()
                    gpsEndTime = currentTime
                    console.log(`currentTime ${currentTime}`);
                }

                let cf = [
                    {
                        indexedValue: [],
                        fieldKey: "Last GPS Disconnection Time",
                        multiple: true,
                        description: "",
                        remark: "",
                        uuid: null,
                        required: false,
                        accessType: null,
                        input: "date",
                        unit: "",
                        valueType: "string",
                        options: [],
                        fieldType: "dateTime",
                        value: gpsEndTime,
                        isRemark: false,
                    },
                ];

                let payload = {
                    "shipmentId": shId,
                    "updates": [{
                        "keyToUpdate": "customfields",
                        "updatedValue": cf
                    }]
                }
                console.log(payload);

                let updatedGpsTime = await addCfGPSDisconnectionTime(payload)
                console.log(updatedGpsTime);
            }
        }
    }
}

main($event)
