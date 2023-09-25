const { del } = require("request");

let sh = {
    "creationTime": 1689346296598,
    "customFields": [
        {
            "indexedValue": [
                "FreightCost_1453.2"
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
            "value": "1453.2",
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
                "PONo_4455042a-b1e5-4013-99c7-18a574ceee0e"
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
            "value": "4455042a-b1e5-4013-99c7-18a574ceee0e",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Invoice No's_2312311284,2312311285"
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
            "value": "2312311284,2312311285",
            "isRemark": false
        }
    ],
    "transportationMode": "ByRoad",
    "freightUnitLineItemId": "9224db51-b140-4a6c-b025-c7f3ac804e88",
    "lastSyncUpTime": 1689681218437,
    "updates": {
        "traceID": "consignmentTopic_0_1367054",
        "resourceId": "b31ac9e5-41b2-4726-865a-6906bf519c68",
        "updatedBy": "SYSTEM",
        "changes": null,
        "sourceOfInformation": null,
        "description": null,
        "forwardReasons": [
            "shipment.consignment.updated"
        ],
        "userId": null,
        "uuid": "17cd0294-90bc-4a0a-bb60-47b6cc24b801",
        "revision": 158,
        "time": 1689681218754,
        "forwardedFrom": null,
        "resourceType": "ShipmentObject",
        "updateType": null
    },
    "isActive": false,
    "uuid": "b31ac9e5-41b2-4726-865a-6906bf519c68",
    "issues": null,
    "branch": {
        "companyCode": null,
        "address": "Plot no. 6, Godown No. 3, Gali No. 1, Near sector 10 crossing, Saraswati Enclave, Main Patudi Road, Gurgaon 122001",
        "updatedBy": null,
        "customFields": [
            {
                "indexedValue": [
                    "FCM_GSTN_null"
                ],
                "fieldKey": "FCM_GSTN",
                "valueType": "string",
                "fieldType": "text",
                "value": null,
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
                    "STATE_NAME_null"
                ],
                "fieldKey": "STATE_NAME",
                "valueType": "string",
                "fieldType": "text",
                "value": null,
                "definitionId": null
            }
        ],
        "regionName": null,
        "externalId": "231",
        "branchName": null,
        "type": [
            "Sales"
        ],
        "updates": null,
        "orgId": "0bbdc122-f963-452f-9af1-28715f5e36b2",
        "areaId": null,
        "geoLocation": null,
        "regionId": null,
        "areaName": null,
        "name": "Gurgaon",
        "zoneId": "f01a93d8-cbb3-4c64-b532-5c08aaf14573",
        "_id": "d5f08b0d-3a23-4a2c-8eac-6f0f85b4ba46",
        "zoneName": "North",
        "contacts": [
            {
                "emails": [
                    "anil.kumar@shalimarpaints.com"
                ],
                "address": null,
                "mobileNumbers": [
                    "8287266509"
                ],
                "mobileNumber": null,
                "name": "Anil Kumar",
                "type": null
            }
        ],
        "officeType": null,
        "materialServices": null
    },
    "orgId": "0bbdc122-f963-452f-9af1-28715f5e36b2",
    "shipmentType": "DirectLeg",
    "completionTime": 1689594811000,
    "routeId": null,
    "shipmentTrackingStatus": null,
    "lastForwardTime": 1689681218825,
    "runningStatus": null,
    "delayTrackingStatus": null,
    "delayReasonLastUpdateTime": null,
    "links": null,
    "shipmentDate": 1689346296411,
    "delayReason": null,
    "shipmentNumber": "FRETSH000000846",
    "originalEdd": null,
    "edd": null,
    "delayReasonUpdateExpiryTime": null,
    "externalShipmentId": null,
    "fleetInfo": {
        "isTrackingEnable": false,
        "forwardingAgent": null,
        "verificationStatus": "UnVerified",
        "trackingMode": "MANUAL",
        "broker": {
            "geoFence": null,
            "documents": null,
            "customFields": null,
            "isPortalEnabled": true,
            "type": "vendor",
            "updates": null,
            "uuid": "ab5a03b4-0177-4851-afb3-8bed4a7275b8",
            "orgId": "0bbdc122-f963-452f-9af1-28715f5e36b2",
            "firmType": null,
            "gstn": "06ABGPY5812P1ZY",
            "voterId": null,
            "verificationTicketId": null,
            "companyCodes": null,
            "group": {
                "name": "Broker",
                "partnerType": null,
                "uuid": null,
                "orgId": null
            },
            "address": "{\"pincode\":null,\"address\":null,\"city\":\"Gurugram\",\"state\":null}",
            "verificationStatus": "unverified",
            "externalId": "T231N00158",
            "panNumber": null,
            "aadharNo": null,
            "parentId": null,
            "places": null,
            "route": null,
            "name": "NITU ORIENT ROADLINE",
            "location": null,
            "fretronId": null,
            "contacts": [
                {
                    "emails": [
                        "nituorientroadline@gmail.com"
                    ],
                    "address": null,
                    "mobileNumbers": [
                        "9891490566"
                    ],
                    "mobileNumber": null,
                    "name": "Sunil Yadav",
                    "type": null
                }
            ],
            "status": "ACTIVE"
        },
        "uuid": "9cd423b7-38b5-4d32-af5f-6aafdf4c9dd1",
        "orgId": "0bbdc122-f963-452f-9af1-28715f5e36b2",
        "vehicle": {
            "vtsDeviceId": null,
            "kmDriven": null,
            "secondaryDriverId": null,
            "attachedDocs": [],
            "customFields": [],
            "floorType": null,
            "description": null,
            "source": null,
            "isTrackingEnabled": false,
            "updates": null,
            "uuid": null,
            "branch": null,
            "orgId": "0bbdc122-f963-452f-9af1-28715f5e36b2",
            "vehicleLoadType": {
                "bodyType": "Open Body",
                "passingCapacityMT": 1.5,
                "minLength": 0,
                "updates": {
                    "traceID": null,
                    "resourceId": "c8891c23-62dc-44cf-a8e5-4e5268451245",
                    "updatedBy": "USER",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": "Created Load Type.",
                    "forwardReasons": [
                        "load.type.created.event"
                    ],
                    "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                    "uuid": "d551a423-1c3b-491d-a020-9c039f5f898c",
                    "revision": null,
                    "time": 1683521667691,
                    "forwardedFrom": null,
                    "resourceType": "LoadTypes",
                    "updateType": null
                },
                "vehicleCategories": null,
                "uuid": "c8891c23-62dc-44cf-a8e5-4e5268451245",
                "orgId": "0bbdc122-f963-452f-9af1-28715f5e36b2",
                "vehicleCategory": "Torus",
                "includeMaxLength": false,
                "minHeight": 0,
                "maxHeight": -1,
                "passingCapacityCFT": null,
                "bodyTypes": null,
                "partnerName": null,
                "includeMinLength": false,
                "partnerExternalId": null,
                "externalId": null,
                "chassisTypes": null,
                "numberOfWheels": 4,
                "chassisType": "4 Wheel",
                "includeMinHeight": false,
                "name": "Torus 1.5MT",
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
            "vehicleType": "Torus 1.5MT",
            "groups": null,
            "externalId": null,
            "updateTime": null,
            "sharedWith": [
                "FRETRON_GOD_FO"
            ],
            "baseLocationId": null,
            "vehicleMake": null,
            "vehicleRegistrationNumber": "HR55AL2940",
            "chassisNumber": null,
            "driverId": null,
            "createTime": null,
            "loadCapacity": 1,
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
            "name": "Mukesh",
            "vehicleId": null,
            "associatedUserId": null,
            "status": null
        },
        "fleetType": "Owned",
        "fleetOwner": {
            "geoFence": null,
            "documents": null,
            "customFields": null,
            "isPortalEnabled": true,
            "type": "vendor",
            "updates": null,
            "uuid": "69a73d70-7f21-4876-9e96-4693addb93da",
            "orgId": "0bbdc122-f963-452f-9af1-28715f5e36b2",
            "firmType": null,
            "gstn": "06BYPPK3637R1ZK",
            "voterId": null,
            "verificationTicketId": null,
            "companyCodes": null,
            "group": {
                "name": "Broker",
                "partnerType": null,
                "uuid": null,
                "orgId": null
            },
            "address": "{\"pincode\":null,\"address\":null,\"city\":\"Gurugram\",\"state\":null}",
            "verificationStatus": "verified",
            "externalId": "T231A01122",
            "panNumber": null,
            "aadharNo": null,
            "parentId": null,
            "places": null,
            "route": null,
            "name": "ANNU ROADLINES",
            "location": null,
            "fretronId": null,
            "contacts": [
                {
                    "emails": [
                        "annuroadlines@yahoo.com"
                    ],
                    "address": null,
                    "mobileNumbers": [
                        "9990885277"
                    ],
                    "mobileNumber": null,
                    "name": "Naveen Kumar",
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
        "device": null,
        "status": "ACTIVE"
    },
    "syncUpDueTime": null,
    "billingStatus": null,
    "currentLocation": null,
    "alerts": [
        {
            "closedBy": null,
            "createdAt": 1689626835057,
            "issueId": null,
            "createdBy": null,
            "snoozTime": null,
            "description": "4082312057 E-Way bill will expire today",
            "type": "shipment.eway.bill.expiry.notification",
            "uuid": "a4b7a1cf-3766-48d0-99ee-ef19bbfad1ef",
            "status": "OPEN",
            "updatedAt": 1689773837723
        }
    ],
    "equipments": null,
    "tripType": "Shipment",
    "lastDelayCalculationTime": null,
    "delayReasonUpdateDueTime": null,
    "locationTrackingStatus": null,
    "poLineItemId": "e60dcd15-7af3-47cf-93a5-69832ab8004e",
    "consignments": [],
    "customContacts": null,
    "shipmentStages": [
        {
            "departureTime": 1689346337092,
            "gateInTime": 1689346332644,
            "actualActivityStartTime": 1689346334209,
            "actualActivityEndTime": 1689346337092,
            "uuid": "865a1e8b-6184-47bd-ad72-1835d0d166fc",
            "consignmentDelivered": null,
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": "Gurgaon, Gurgaon-231",
            "hub": {
                "hubId": null,
                "boundary": null,
                "address": null,
                "accessibility": "private",
                "addedBy": "0bbdc122-f963-452f-9af1-28715f5e36b2",
                "center": {
                    "latitude": 28.4472808,
                    "longitude": 76.995915
                },
                "suggestedRadius": 2000,
                "isOwned": null,
                "centerCoordinates": [
                    76.995915,
                    28.4472808
                ],
                "placeId": "c40ef1e4-9c65-4eb1-9249-952906b22114",
                "geoJsonBoundry": null,
                "externalId": "231",
                "source": "GOOGLE",
                "places": [],
                "viewport": null,
                "district": "Gurgaon",
                "name": "Gurgaon-231",
                "state": "Gurgaon",
                "category": "Hub",
                "subDistrict": null,
                "controllingBranchId": null
            },
            "arrivalTime": 1689346322657,
            "expectedActivityStartTime": null,
            "secondaryStatus": null,
            "consignmentPickUps": [
                "bd31c73c-d4a5-404d-bd1c-f0b3615732da",
                "6e2ab494-feea-40cb-9f86-bef765670d92"
            ],
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": null,
                "purpose": "Pickup",
                "plannedArrival": null,
                "currentGpsState": null,
                "updates": null,
                "uuid": "865a1e8b-6184-47bd-ad72-1835d0d166fc",
                "sequenceId": null,
                "isDisconnected": false,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": null,
                "eta": null,
                "routeId": null,
                "expectedActivityStartTime": null,
                "actualDeparture": 1689346337092,
                "vehicleId": null,
                "place": null,
                "remainingDistance": null,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "865a1e8b-6184-47bd-ad72-1835d0d166fc"
                ],
                "actualActivityEndTime": null,
                "actualArrival": 1689346322657,
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
                    "addedBy": "0bbdc122-f963-452f-9af1-28715f5e36b2",
                    "center": {
                        "latitude": 28.4472808,
                        "longitude": 76.995915
                    },
                    "suggestedRadius": 2000,
                    "isOwned": null,
                    "centerCoordinates": [
                        76.995915,
                        28.4472808
                    ],
                    "placeId": "c40ef1e4-9c65-4eb1-9249-952906b22114",
                    "geoJsonBoundry": null,
                    "externalId": "231",
                    "source": "GOOGLE",
                    "places": null,
                    "viewport": null,
                    "district": "Gurgaon",
                    "name": "Gurgaon-231",
                    "state": "Gurgaon",
                    "category": "Hub",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "imei": null,
                "assosiatedShipmentsId": [
                    "b31ac9e5-41b2-4726-865a-6906bf519c68"
                ],
                "status": "COMPLETED"
            },
            "place": null,
            "controllingBranchId": null,
            "gateOutTime": null,
            "status": "COMPLETED"
        },
        {
            "departureTime": 1689594807000,
            "gateInTime": null,
            "actualActivityStartTime": 1689594807000,
            "actualActivityEndTime": 1689594807000,
            "uuid": "9675bfe8-011a-4dea-b011-328d16d58ecc",
            "consignmentDelivered": [
                "bd31c73c-d4a5-404d-bd1c-f0b3615732da",
                "6e2ab494-feea-40cb-9f86-bef765670d92"
            ],
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": null,
            "hub": {
                "hubId": null,
                "boundary": null,
                "address": null,
                "accessibility": "private",
                "addedBy": "0bbdc122-f963-452f-9af1-28715f5e36b2",
                "center": {
                    "latitude": 28.394250092951918,
                    "longitude": 77.30270193257658
                },
                "suggestedRadius": 0,
                "isOwned": null,
                "centerCoordinates": [
                    77.30270193257658,
                    28.394250092951918
                ],
                "placeId": "b13dbf52-7d24-4fec-b4f7-6e7a70b328a7",
                "geoJsonBoundry": null,
                "externalId": null,
                "source": "GOOGLE",
                "places": [],
                "viewport": null,
                "district": "Haryana",
                "name": "FARIDABAD-RAINBOW PAINTS & CHEMICALS RAINBOW PAINTS & CHEMICALS",
                "state": "Haryana",
                "category": "Hub",
                "subDistrict": null,
                "controllingBranchId": null
            },
            "arrivalTime": 1689594798000,
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
                "uuid": "9675bfe8-011a-4dea-b011-328d16d58ecc",
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
                "forShipmentStages": [
                    "9675bfe8-011a-4dea-b011-328d16d58ecc"
                ],
                "actualActivityEndTime": null,
                "actualArrival": null,
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
                    "addedBy": "0bbdc122-f963-452f-9af1-28715f5e36b2",
                    "center": {
                        "latitude": 28.394250092951918,
                        "longitude": 77.30270193257658
                    },
                    "suggestedRadius": 0,
                    "isOwned": null,
                    "centerCoordinates": [
                        77.30270193257658,
                        28.394250092951918
                    ],
                    "placeId": "b13dbf52-7d24-4fec-b4f7-6e7a70b328a7",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "GOOGLE",
                    "places": null,
                    "viewport": null,
                    "district": "Haryana",
                    "name": "FARIDABAD-RAINBOW PAINTS & CHEMICALS RAINBOW PAINTS & CHEMICALS",
                    "state": "Haryana",
                    "category": "Hub",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "imei": null,
                "assosiatedShipmentsId": [
                    "b31ac9e5-41b2-4726-865a-6906bf519c68"
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


// var alertNames = sh?.alerts?.map(function (alert) {
//     return alert?.description ?? "";
// }) ?? [];

// var alertNamesString = alertNames.join(" | ");
// console.log(alertNamesString)

let alerts = sh?.alerts
let issueCount = ""
if (alerts?.length) {
    for (let item of alerts) {
        let status = item?.status
        if (status == "OPEN") {
            issueCount += 1
        }

    }
}
console.log(`issueCount ${issueCount}`)




function countUniqueValues(input) {
    const values = input.split(" | ");
    const countMap = {};

    for (const value of values) {
        if (countMap[value]) {
            countMap[value]++;
        } else {
            countMap[value] = 1;
        }
    }

    const counts = Object.values(countMap);
    return counts;
}










let inTransitstring = []
let shStage = sh?.shipmentStages
let originDepartureTime = shStage?.[0]?.departureTime
let destinationArrivalTime = shStage?.[shStage.length - 1]?.arrivalTime
console.log(destinationArrivalTime, originDepartureTime)
if (originDepartureTime && destinationArrivalTime) {
    let inTransitTime = (destinationArrivalTime - originDepartureTime)
    console.log((inTransitTime))

    let days = Math.floor(inTransitTime / (24 * 60 * 60 * 1000));
    let remainingTimeAfterDays = inTransitTime % (24 * 60 * 60 * 1000);
    let hrs = Math.floor(remainingTimeAfterDays / (60 * 60 * 1000));
    let remainingTimeAfterHours = remainingTimeAfterDays % (60 * 60 * 1000);
    let min = Math.floor(remainingTimeAfterHours / (60 * 1000));

    console.log(`Days: ${days}, Hours: ${hrs}, Minutes: ${min}`);

    if (days) {
        inTransitstring.push(`${days} Days `)
    }
    if (hrs) {
        inTransitstring.push(`${hrs} Hrs `)
    }
    if (min) {
        inTransitstring.push(`${min} Mintus `)
    }
    inTransitstring = inTransitstring.join(', ')
    console.log(inTransitstring)
}