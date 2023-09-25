const rp = require("request-promise")
const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Nzg3OTE3MzMsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiI0OTViODcyOC1jNzYxLTRmYTctODNmZS1kYjc1YTdkNjMyMjEiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.V9PEeBWVqsSsH0op3mYi7vaB8URiTB11SOF3R-HVqA8"


const consigneeEId = [1090000231, 1090000212, 1090000178, 1090000113, 1090000118, 1090000116, 1030000168, 1030000020, 1030000010, 1030000073, 1030000016, 1030000015, 1030000248, 1030000077]

const $event = {
    "creationTime": 1678441925874,
    "customFields": [
        {
            "indexedValue": [
                "Distance_In_KMs_00000"
            ],
            "fieldKey": "Distance_In_KMs",
            "multiple": true,
            "description": "Distance in KMs",
            "remark": "",
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": "00000",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Type_LAST MILE"
            ],
            "fieldKey": "Type",
            "multiple": true,
            "description": "Type",
            "remark": "",
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": "LAST MILE",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Status_PLANNED"
            ],
            "fieldKey": "Status",
            "multiple": true,
            "description": "Status",
            "remark": "",
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": "PLANNED",
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
    "lastSyncUpTime": 1678682212229,
    "updates": {
        "traceID": "shservicescheduletask_3_1259",
        "resourceId": "db64c5f6-f2af-4dc5-a278-d1b9e17ff0f3",
        "updatedBy": "SYSTEM",
        "changes": null,
        "sourceOfInformation": null,
        "description": null,
        "forwardReasons": [
            "HEART-BEAT"
        ],
        "userId": null,
        "uuid": "5eb7408c-7553-4176-94e0-fcfbaade1f8c",
        "revision": 239,
        "time": 1678787838602,
        "forwardedFrom": null,
        "resourceType": "ShipmentObject",
        "updateType": null
    },
    "isActive": false,
    "uuid": "db64c5f6-f2af-4dc5-a278-d1b9e17ff0f3",
    "issues": null,
    "branch": null,
    "orgId": "495b8728-c761-4fa7-83fe-db75a7d63221",
    "shipmentType": "DirectLeg",
    "completionTime": null,
    "routeId": null,
    "shipmentTrackingStatus": "At Delivery Point",
    "lastForwardTime": 1678787838630,
    "runningStatus": "Delayed",
    "delayTrackingStatus": "UP TO DATE",
    "delayReasonLastUpdateTime": null,
    "links": null,
    "shipmentDate": 1678330920000,
    "delayReason": null,
    "shipmentNumber": "00000000006100001564",
    "originalEdd": 1678629600000,
    "edd": 1678629600000,
    "delayReasonUpdateExpiryTime": null,
    "externalShipmentId": "00000000006100001564",
    "fleetInfo": {
        "isTrackingEnable": null,
        "forwardingAgent": null,
        "verificationStatus": null,
        "trackingMode": "MANUAL",
        "broker": {
            "geoFence": null,
            "documents": null,
            "customFields": null,
            "isPortalEnabled": true,
            "type": "vendor",
            "updates": null,
            "uuid": "c7acb921-2562-494d-bc1e-67d1d312e754",
            "orgId": "495b8728-c761-4fa7-83fe-db75a7d63221",
            "firmType": null,
            "gstn": null,
            "voterId": null,
            "verificationTicketId": null,
            "group": {
                "name": "Broker",
                "partnerType": null,
                "uuid": null,
                "orgId": null
            },
            "address": "{\"pincode\":\"\",\"address\":\"CHITTOOR. DIST,\",\"city\":\"\",\"state\":\"\"}",
            "verificationStatus": "unverified",
            "externalId": "0000101777",
            "panNumber": null,
            "aadharNo": null,
            "parentId": null,
            "places": null,
            "route": null,
            "name": "SREE KEERTHI TRANSPORT 17-28-14/1",
            "location": null,
            "fretronId": null,
            "contacts": [
                {
                    "emails": [],
                    "address": null,
                    "mobileNumbers": [
                        "9781362120"
                    ],
                    "mobileNumber": null,
                    "name": null,
                    "type": null
                }
            ],
            "status": "ACTIVE"
        },
        "uuid": "40572ba4-7f97-4523-bbc8-2e0ccd7a39b3",
        "orgId": "495b8728-c761-4fa7-83fe-db75a7d63221",
        "vehicle": {
            "vtsDeviceId": null,
            "kmDriven": null,
            "secondaryDriverId": null,
            "attachedDocs": null,
            "customFields": null,
            "floorType": null,
            "description": null,
            "source": null,
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
            "vehicleType": null,
            "groups": null,
            "externalId": null,
            "updateTime": null,
            "sharedWith": null,
            "baseLocationId": null,
            "vehicleMake": null,
            "vehicleRegistrationNumber": "UP15AB1234",
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
            "mobileNumber": "9588540695",
            "customFields": null,
            "externalId": null,
            "updates": null,
            "aadharNo": null,
            "type": null,
            "uuid": null,
            "branch": null,
            "orgId": null,
            "vehicleRegistrationNumber": null,
            "name": "JV",
            "vehicleId": null,
            "associatedUserId": null,
            "status": null
        },
        "fleetType": "Market",
        "fleetOwner": {
            "geoFence": null,
            "documents": null,
            "customFields": null,
            "isPortalEnabled": true,
            "type": "vendor",
            "updates": null,
            "uuid": "c7acb921-2562-494d-bc1e-67d1d312e754",
            "orgId": "495b8728-c761-4fa7-83fe-db75a7d63221",
            "firmType": null,
            "gstn": null,
            "voterId": null,
            "verificationTicketId": null,
            "group": {
                "name": "Broker",
                "partnerType": null,
                "uuid": null,
                "orgId": null
            },
            "address": "{\"pincode\":\"\",\"address\":\"CHITTOOR. DIST,\",\"city\":\"\",\"state\":\"\"}",
            "verificationStatus": "unverified",
            "externalId": "0000101777",
            "panNumber": null,
            "aadharNo": null,
            "parentId": null,
            "places": null,
            "route": null,
            "name": "SREE KEERTHI TRANSPORT 17-28-14/1",
            "location": null,
            "fretronId": null,
            "contacts": [
                {
                    "emails": [],
                    "address": null,
                    "mobileNumbers": [
                        "9781362120"
                    ],
                    "mobileNumber": null,
                    "name": null,
                    "type": null
                }
            ],
            "status": "ACTIVE"
        },
        "trainInfo": null,
        "lbsNumber": null,
        "secondaryDriver": null,
        "device": null,
        "status": null
    },
    "syncUpDueTime": 1678699800000,
    "billingStatus": null,
    "currentLocation": null,
    "alerts": [
        {
            "closedBy": null,
            "createdAt": 1678682205015,
            "issueId": null,
            "createdBy": null,
            "snoozTime": null,
            "description": "Location Tracking Policy Expired",
            "type": "shipment.tracking.policy.breached",
            "uuid": "434f0fd3-acaf-4cb9-a978-d2f2c47910d7",
            "status": "OPEN",
            "updatedAt": 1678682212242
        }
    ],
    "equipments": null,
    "tripType": "Shipment",
    "delayReasonUpdateDueTime": null,
    "locationTrackingStatus": "OVERDUE",
    "poLineItemId": null,
    "consignments": [],
    "customContacts": null,
    "shipmentStages": [
        {
            "departureTime": 1678595790000,
            "gateInTime": null,
            "actualActivityStartTime": 1678595790000,
            "actualActivityEndTime": 1678595790000,
            "uuid": "3c22ac06-c4cc-4d2a-a1c0-9b5a8fa68c72",
            "consignmentDelivered": null,
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": null,
            "hub": null,
            "arrivalTime": 1678327320000,
            "expectedActivityStartTime": null,
            "secondaryStatus": "WaitingForFinalize",
            "consignmentPickUps": [
                "c7e59184-6373-4c2f-9369-1daa1ec14598",
                "8d79b0c1-acc0-4354-9b45-c819e5483272"
            ],
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": null,
                "purpose": "Pickup",
                "plannedArrival": null,
                "currentGpsState": null,
                "updates": null,
                "uuid": "3c22ac06-c4cc-4d2a-a1c0-9b5a8fa68c72",
                "sequenceId": null,
                "isDisconnected": false,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": null,
                "eta": null,
                "routeId": null,
                "expectedActivityStartTime": null,
                "actualDeparture": 1678595790000,
                "vehicleId": null,
                "place": {
                    "hubId": null,
                    "boundary": null,
                    "address": "Bagnan - I, West Bengal, 711303, India",
                    "accessibility": null,
                    "addedBy": null,
                    "center": {
                        "latitude": 22.4930602,
                        "longitude": 87.95076913504252
                    },
                    "suggestedRadius": 0,
                    "isOwned": null,
                    "centerCoordinates": null,
                    "placeId": "R10371820",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "GOOGLE",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": " HOWRAH, WEST BENGAL",
                    "state": null,
                    "category": null,
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "remainingDistance": null,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "3c22ac06-c4cc-4d2a-a1c0-9b5a8fa68c72"
                ],
                "actualActivityEndTime": null,
                "actualArrival": 1678327320000,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": null,
                "isAutoCompleted": false,
                "coveredDistance": null,
                "hub": null,
                "imei": null,
                "assosiatedShipmentsId": [
                    "db64c5f6-f2af-4dc5-a278-d1b9e17ff0f3"
                ],
                "status": "COMPLETED"
            },
            "place": {
                "hubId": null,
                "boundary": null,
                "address": "Bagnan - I, West Bengal, 711303, India",
                "accessibility": null,
                "addedBy": null,
                "center": {
                    "latitude": 22.4930602,
                    "longitude": 87.95076913504252
                },
                "suggestedRadius": 0,
                "isOwned": null,
                "centerCoordinates": null,
                "placeId": "R10371820",
                "geoJsonBoundry": null,
                "externalId": null,
                "source": "GOOGLE",
                "places": null,
                "viewport": null,
                "district": null,
                "name": " HOWRAH, WEST BENGAL",
                "state": null,
                "category": null,
                "subDistrict": null,
                "controllingBranchId": null
            },
            "controllingBranchId": null,
            "gateOutTime": null,
            "status": "COMPLETED"
        },
        {
            "departureTime": null,
            "gateInTime": null,
            "actualActivityStartTime": null,
            "actualActivityEndTime": null,
            "uuid": "939a977e-8da7-4b90-92b1-de99347ceb0c",
            "consignmentDelivered": [
                "c7e59184-6373-4c2f-9369-1daa1ec14598"
            ],
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": null,
            "hub": null,
            "arrivalTime": 1678599404000,
            "expectedActivityStartTime": null,
            "secondaryStatus": "WaitingForGateIn",
            "consignmentPickUps": null,
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": null,
                "purpose": "Delivery",
                "plannedArrival": null,
                "currentGpsState": null,
                "updates": null,
                "uuid": "939a977e-8da7-4b90-92b1-de99347ceb0c",
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
                    "address": "Mandirtala Mondir, Ward no 32, Near Mandirtala Bus Stop, Shibpur Rd, Shibpur, Howrah, West Bengal 711102, Howrah, West Bengal, 711102, India",
                    "accessibility": null,
                    "addedBy": null,
                    "center": {
                        "latitude": 22.5699577,
                        "longitude": 88.3174226
                    },
                    "suggestedRadius": 0,
                    "isOwned": null,
                    "centerCoordinates": null,
                    "placeId": "N4410844091",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "GOOGLE",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "BIDHANNAGAR",
                    "state": null,
                    "category": null,
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "remainingDistance": null,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "939a977e-8da7-4b90-92b1-de99347ceb0c"
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
                    "db64c5f6-f2af-4dc5-a278-d1b9e17ff0f3"
                ],
                "status": "AT"
            },
            "place": {
                "hubId": null,
                "boundary": null,
                "address": "Mandirtala Mondir, Ward no 32, Near Mandirtala Bus Stop, Shibpur Rd, Shibpur, Howrah, West Bengal 711102, Howrah, West Bengal, 711102, India",
                "accessibility": null,
                "addedBy": null,
                "center": {
                    "latitude": 22.5699577,
                    "longitude": 88.3174226
                },
                "suggestedRadius": 0,
                "isOwned": null,
                "centerCoordinates": null,
                "placeId": "N4410844091",
                "geoJsonBoundry": null,
                "externalId": null,
                "source": "GOOGLE",
                "places": null,
                "viewport": null,
                "district": null,
                "name": "BIDHANNAGAR",
                "state": null,
                "category": null,
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
            "uuid": "4f9d28b3-a3ec-47f2-85d0-53cf9dee8637",
            "consignmentDelivered": [
                "8d79b0c1-acc0-4354-9b45-c819e5483272"
            ],
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
                "uuid": "4f9d28b3-a3ec-47f2-85d0-53cf9dee8637",
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
                    "address": "Panchla, West Bengal, 711322, India",
                    "accessibility": null,
                    "addedBy": null,
                    "center": {
                        "latitude": 22.56984205,
                        "longitude": 88.13057700863706
                    },
                    "suggestedRadius": 0,
                    "isOwned": null,
                    "centerCoordinates": null,
                    "placeId": "R10371819",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "GOOGLE",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "RANIHATI",
                    "state": null,
                    "category": null,
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "remainingDistance": 0,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "4f9d28b3-a3ec-47f2-85d0-53cf9dee8637"
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
                    "db64c5f6-f2af-4dc5-a278-d1b9e17ff0f3"
                ],
                "status": "NEXT"
            },
            "place": {
                "hubId": null,
                "boundary": null,
                "address": "Panchla, West Bengal, 711322, India",
                "accessibility": null,
                "addedBy": null,
                "center": {
                    "latitude": 22.56984205,
                    "longitude": 88.13057700863706
                },
                "suggestedRadius": 0,
                "isOwned": null,
                "centerCoordinates": null,
                "placeId": "R10371819",
                "geoJsonBoundry": null,
                "externalId": null,
                "source": "GOOGLE",
                "places": null,
                "viewport": null,
                "district": null,
                "name": "RANIHATI",
                "state": null,
                "category": null,
                "subDistrict": null,
                "controllingBranchId": null
            },
            "controllingBranchId": null,
            "gateOutTime": null,
            "status": "NEXT"
        }
    ],
    "remarks": null,
    "syncUpExpiryTime": 1678761000000,
    "shipmentStatus": "Planned"
}

async function getShipmentById(shId) {
    let url = `https://apis.fretron.com/shipment/v1/shipment/${shId}?skipCn=false`
    try {
        let res = await rp({
            method: 'GET',
            uri: url,
            json: true,
            headers: {
                Authorization: token
            }
        })
        console.log(`Get shipment by id status : ${res.status}`)
        if (res.status == 200) {
            return res.data
        } else {
            console.log(`Get shipment by id error: ${res.error}`)
            return null
        }
    } catch (e) {
        console.log(`Get shipment by id catched err : ${e.message}`)
        return null
    }
}

async function getConsignmentTrackingLink(cnNO) {
    var payload = {
        "consignmentId": cnNO,
        "uiRestrictions": {
            "cnInfo": {
                "consignmentNo": true,
                "vehicleInfo": true,
                "materialInfo": true,
                "consignor": true,
                "consignee": true,
                "origin": true,
                "destination": true,
                "customer": true,
                "valuOfGoods": false,
                "currentStatus": true,
                "currentAddress": true
            },
            "epod": {
                "upload": true,
                "timing": true,
                "feeding": true,
                "otpToDriver": true,
                "unloadingStart": false,
                "unloadingEnd": true,
                "reportingTime": true,
                "vehicleReleaseTime": false,
                "unloadingCharge": true,
                "isMandateTiming": true,
                "isMandateFeeding": true,
                "markManually": true
            },
            "map": true,
            "liveTracking": true,
            "updateTracking": true,
            "miscFields": false,
            "customFields": []
        }
    };
    var res = await rp({
        method: "POST",
        uri: "https://apis.fretron.com/sharing-utils/v1/share-cn",
        body: payload,
        json: true,
        headers: { "Authorization": "Beaer " + token, "Content-Type": "application/json" }
    });
    if (res.data != null) {
        return "https://alpha.fretron.com/trip-share/vehicleLocation/consignment?code=" + res.data
    } else {
        console.log("Issue while fetching the consignment tracking link: " + res.error)
        return ""
    }
}

async function forwardEmail(subject, to, cc, html) {
    try {
        console.log("Sending email with SUB: " + subject);
        await rp({
            uri: "http://apis.fretron.com/notifications/emails/email",
            method: "POST",
            body: {
                cc: cc,
                to: to,
                subject: subject,
                html: html,
            },
            timeout: 15000,
            json: true,
        });
        return "Mail Sent"

    } catch (e) {
        console.log("Error while forwarding email");
    }
}

async function updateCfs(cfPayload) {
    try {
        // console.log(JSON.stringify(cfPayload))
        var res = await rp({
            url: `https://apis.fretron.com/shipment/v1/consignment/actions/sync`,
            method: "POST",
            json: true,
            body: cfPayload,
            headers: {
                Authorization: token
            }
        });
        if (res.status == 200) {
            // console.log(`Added CFS consignment!, Status- ${res.status} ${JSON.stringify(res)}`);
            return "Done"
        } else {
            console.log(`Error while adding cfsconsignment- ${res.error}`)
            return "Issue"
        }

    } catch (e) {
        console.log("updateCN : " + e.toString())
    }
}

async function getCnsBycnId(cnId) {
    try {
        let url = `https://apis.fretron.com/shipment/v1/consignment/${cnId}/shipments`
        let res = await rp({
            method: 'GET',
            uri: url,
            'headers': {
                "Authorization": token
            },
            json: true
        })
        return res
    } catch (e) {
        console.log(`error while getting consignment- ${cnId}`);
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

async function sendSms(consingeeMobile, content) {
    try {
        let smsRes = await rp({
            uri: "http://apis.fretron.com/notifications/smsing/sms",
            method: "POST",
            body: {
                to: consingeeMobile,
                content: content
            },
            json: true,
            headers: {
                Authorization: token
            }
        })
        return smsRes
    }
    catch (e) {
        console.log("error while sending sms ", e.message);
    }
}

async function main($event) {
    try {
        // console.log($event.shipmentStages[0].status, $event.shipmentStages[1].status);
        if ($event.shipmentStages[0].status == "COMPLETED" && $event.shipmentStages[1].status == "UPCOMING") {
            let shId = $event.uuid
            let shData = await getShipmentById(shId)
            let vehicleNo = shData?.fleetInfo?.vehicle?.vehicleRegistrationNumber

            let consignmentsInSh = shData?.consignments?.length

            if (consignmentsInSh) {
                console.log(consignmentsInSh);
                for (let item = 0; item < shData.consignments.length; item++) {
                    let cnId = shData.consignments[item].uuid

                    console.log(cnId);
                    let cnData = await getCnsBycnId(cnId)

                    console.log(cnData.data.consignment.consignmentNo, "cnNo");
                    // let consigneeExternalId = cnData.data.consignment?.consignee?.externalId`
                    console.log(cnData.data.consignment?.consignee?.externalId);
                    let consigneeExternalId = 1090000212

                    if (consigneeExternalId) {
                        let filterConsignee = consigneeEId.filter((eid) => {
                            if (eid == consigneeExternalId) {
                                return true
                            }
                        })

                        if (filterConsignee.length) {
                            // console.log(cnData.data.consignment?.consignee);
                            let cn = cnData.data.consignment
                            let cfConsigneeMobileNo = getFromCf(cn.customFields, "Consignee Phone No")
                            let cfConsigneeEmail = getFromCf(cn.customFields, "Consignee Email")


                            // let consigneeMail = cn.consignee?.contacts?.[0].emails && cn.consignee.contacts[0].emails.length > 0
                            //     ? cn.consignee.contacts[0].emails : (cfConsigneeEmail ? [cfConsigneeEmail] : null)

                            let consigneeMail = ["pooja.bishu@fretron.com"]
                            // let consingeeMobile = cn.consignee.contacts[0].mobileNumbers && cn.consignee.contacts[0].mobileNumbers.length > 0
                            //     ? cn.consignee.contacts[0].mobileNumbers : (cfConsigneeMobileNo ? [cfConsigneeMobileNo] : null)
                            let consingeeMobile = [8569977915]
                            let consignmentTrackingLink = await getConsignmentTrackingLink(cnId);
                            console.log(consigneeMail, consingeeMobile);
                            if (consignmentTrackingLink != "") {

                                if (consingeeMobile != null && consingeeMobile.length > 0) {
                                    try {
                                        console.log("Tracking link: " + consignmentTrackingLink)
                                        // consingeeMobile = consingeeMobile[0].value;
                                        var content = "Exide Indu shared consignment ePOD Link with you for vehicle no. " + vehicleNo + ". Click the link below to track " + consignmentTrackingLink + " FRETRON"

                                        let smsRes = await sendSms(consingeeMobile, content)
                                        console.log(`SMS Response - ${smsRes}`)
                                        if (smsRes) {

                                            if (smsRes.status == 200) {
                                                // Set CF SMS Sent -> Yes
                                                let smsSentPayload = {
                                                    "cnUuid": cnId,
                                                    "updates": [{
                                                        "keyToUpdate": "cfs",
                                                        "updatedValue": [{
                                                            "indexedValue": [],
                                                            "fieldKey": "SMS Sent",
                                                            "multiple": false,
                                                            "valueType": "string",
                                                            "options": ["Yes", "No"],
                                                            "fieldType": "yes-no",
                                                            "value": "Yes",
                                                        }]
                                                    }]
                                                }
                                                await updateCfs(smsSentPayload)
                                            }
                                        }

                                        else {
                                            console.log("No mobile no found!")
                                            // Set CF SMS Sent -> No
                                            let smsSentPayload = {
                                                "cnUuid": cnId,
                                                "updates": [{
                                                    "keyToUpdate": "cfs",
                                                    "updatedValue": [{
                                                        "indexedValue": [],
                                                        "fieldKey": "SMS Sent",
                                                        "multiple": false,
                                                        "valueType": "string",
                                                        "options": ["Yes", "No"],
                                                        "fieldType": "yes-no",
                                                        "value": "No",
                                                    }]
                                                }]
                                            }
                                            await updateCfs(smsSentPayload)
                                        }
                                    }
                                    catch (e) {
                                        console.log('Error while Sending SMS ', e.message);
                                    }


                                }


                                if (consigneeMail != null && consigneeMail.length > 0) {

                                    var htmlString = `
                                        <html>
                                        <head>
                                        <body>
                                        <p>Dear Sir,
                                        Please use the below link to upload the photo of POD along with reporting,unloading date after successful completion of delivery at Ship to party location-1010013788 (Shri Kanha Stainless Pvt Ltd), Sikar
                                        for Vehicle No. ${vehicleNo} and FO-6100001425
                                        </p>
                                        <p><a href="${consignmentTrackingLink}">Consignment Tracking Link</a></p>
                                        </body>
                                        </head>
                                        </html>`
                                    var subject = "Tracking Link for Invoice - " + cn.consignmentNo + " / " + vehicleNo
                                    let mailer = await forwardEmail(subject, consigneeMail, [""], htmlString)
                                    console.log(mailer)

                                    // Set CF Email Sent -> Yes
                                    let cfEmailSentPayload = {
                                        "cnUuid": cnId,
                                        "updates": [{
                                            "keyToUpdate": "cfs",
                                            "updatedValue": [{
                                                "indexedValue": [],
                                                "fieldKey": "Email Sent",
                                                "multiple": false,
                                                "valueType": "string",
                                                "options": ["Yes", "No"],
                                                "fieldType": "yes-no",
                                                "value": "Yes",
                                            }]
                                        }]
                                    }
                                    await updateCfs(cfEmailSentPayload)
                                } else {
                                    console.log("No Mail info found!")
                                    // Set CF Email Sent -> No
                                    let cfEmailSentPayload = {
                                        "cnUuid": cnId,
                                        "updates": [{
                                            "keyToUpdate": "cfs",
                                            "updatedValue": [{
                                                "indexedValue": [],
                                                "fieldKey": "Email Sent",
                                                "multiple": false,
                                                "valueType": "string",
                                                "options": ["Yes", "No"],
                                                "fieldType": "yes-no",
                                                "value": "No",
                                            }]
                                        }]
                                    }
                                    await updateCfs(cfEmailSentPayload)
                                }
                            }
                            else {
                                console.log("Tracking Link Not generated")

                            }


                        }
                    }
                }
            }
            else {
                console.log("consignments not found for shipment :", $event.shipmentNumber);
            }

        }
    }
    catch (e) {
        console.log("error in main function ", e.message)
    }

}

main($event)

