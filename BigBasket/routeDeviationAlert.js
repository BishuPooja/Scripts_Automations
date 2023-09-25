const rp = require("request-promise")
const _ = require("lodash")
const moment = require("moment")
var FRT_PUB_BASE_URL = "https://apis.fretron.com"
const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODI2NzcyOTAsInVzZXJJZCI6ImJvdHVzZXItLWI5Y2YyMmZiLThhNWMtNDM5MS1iYjk4LWJiZjYzNDlhNDE0MyIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLWI5Y2YyMmZiLThhNWMtNDM5MS1iYjk4LWJiZjYzNDlhNDE0MyIsIm9yZ0lkIjoiNGIwMzVmYzgtZDlmMC00ZmUzLWI3ZDUtMWZkMTg3NDQzNTA0IiwibmFtZSI6InNoIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.l4dtpC9OVYFPFiC36tkoRkFG7b63ICNUx_73L7HRTCA"

const $event = {
    "creationTime": 1682916219497,
    "customFields": [
        {
            "indexedValue": [
                "Deisel Price On Trip Start_"
            ],
            "fieldKey": "Deisel Price On Trip Start",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "number",
            "unit": "",
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Deisel Price On Trip End_"
            ],
            "fieldKey": "Deisel Price On Trip End",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "number",
            "unit": "",
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "",
            "isRemark": false
        },
        {
            "indexedValue": [
                "FreightCost_0.0"
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
            "value": "0.0",
            "isRemark": false
        },
        {
            "indexedValue": [
                "FreightType_perMT"
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
            "value": "perMT",
            "isRemark": false
        },
        {
            "indexedValue": [
                "PONo_7130f532-d2f4-46ad-88c9-71212fe308ac"
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
            "value": "7130f532-d2f4-46ad-88c9-71212fe308ac",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Lead Distance_1287"
            ],
            "fieldKey": "Lead Distance",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "1287",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Material_WR_EN8D-B_8.0DIA"
            ],
            "fieldKey": "Material",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "text",
            "options": null,
            "fieldType": "text",
            "value": "WR_EN8D-B_8.0DIA",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Customer Name_Suyash Kumar"
            ],
            "fieldKey": "Customer Name",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "text",
            "options": null,
            "fieldType": "text",
            "value": "Suyash Kumar",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Quantity_42"
            ],
            "fieldKey": "Quantity",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "text",
            "options": null,
            "fieldType": "text",
            "value": "42",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Material Type_CUT BEND"
            ],
            "fieldKey": "Material Type",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "text",
            "options": null,
            "fieldType": "text",
            "value": "CUT BEND",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Transportation Type_CT"
            ],
            "fieldKey": "Transportation Type",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": true,
            "accessType": "mandatory_on_create",
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [
                "PT",
                "PTD",
                "CT"
            ],
            "fieldType": "select",
            "value": "CT",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Vehicle Stage_External Parking"
            ],
            "fieldKey": "Vehicle Stage",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "jshl_patratu_vehicle_stage",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [
                "External Parking",
                "Waiting for Gate In",
                "Waiting for Tare Weight",
                "Waiting for Loading In",
                "Waiting for Loading Out",
                "Waiting for Gross Weight",
                "Waiting for PGI",
                "Waiting for TC",
                "Waiting for Invoice",
                "Waiting for Gate Out",
                "In Transit"
            ],
            "fieldType": "select",
            "value": "External Parking",
            "isRemark": false
        },
        {
            "indexedValue": [
                "DO ISSUED_Not Issued"
            ],
            "fieldKey": "DO ISSUED",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": "f31b50cc-3363-45ac-b8a6-a92d1233e3ea",
            "required": false,
            "accessType": null,
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": [
                "D.O. Issued",
                "Not Issued"
            ],
            "fieldType": "radio-button",
            "value": "Not Issued",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Driver GPS Advance_450"
            ],
            "fieldKey": "Driver GPS Advance",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": "f31b50cc-3363-45ac-b8a6-a92d1233e3ea",
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "450",
            "isRemark": false
        },
        {
            "indexedValue": [],
            "fieldKey": "Route Assigned By",
            "multiple": true,
            "description": "",
            "remark": "",
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "",
            "unit": "",
            "valueType": "arrayOfString",
            "options": [
                "System",
                "User"
            ],
            "fieldType": "select",
            "value": "User",
            "isRemark": false
        }
    ],
    "transportationMode": "ByRoad",
    "freightUnitLineItemId": "e3a88006-601e-4482-86fe-0f30dbe34211",
    "lastSyncUpTime": 1682916220964,
    "updates": {
        "traceID": "consignmentTopic_8_1168602",
        "resourceId": "2ef7f04e-8c4a-46f6-9352-49e4b1440328",
        "updatedBy": "SYSTEM",
        "changes": null,
        "sourceOfInformation": null,
        "description": null,
        "forwardReasons": [
            "shipment.consignment.updated"
        ],
        "userId": null,
        "uuid": "bf0b6c42-0d30-4c9a-9b6b-579e1428573f",
        "revision": 12,
        "time": 1682919990581,
        "forwardedFrom": null,
        "resourceType": "ShipmentObject",
        "updateType": "At Pickup Point"
    },
    "isActive": false,
    "uuid": "2ef7f04e-8c4a-46f6-9352-49e4b1440328",
    "issues": null,
    "branch": null,
    "orgId": "4b035fc8-d9f0-4fe3-b7d5-1fd187443504",
    "shipmentType": "DirectLeg",
    "completionTime": null,
    "routeId": "External Parking",
    "shipmentTrackingStatus": "At Pickup Point",
    "lastForwardTime": 1682919990648,
    "runningStatus": null,
    "delayTrackingStatus": "UP TO DATE",
    "delayReasonLastUpdateTime": null,
    "links": null,
    "shipmentDate": 1682916219196,
    "delayReason": null,
    "shipmentNumber": "FRETSH000000096",
    "originalEdd": null,
    "edd": null,
    "delayReasonUpdateExpiryTime": null,
    "externalShipmentId": null,
    "fleetInfo": {
        "isTrackingEnable": null,
        "forwardingAgent": null,
        "verificationStatus": null,
        "trackingMode": "MANUAL",
        "broker": {
            "geoFence": null,
            "documents": [],
            "customFields": null,
            "isPortalEnabled": true,
            "type": "vendor",
            "updates": null,
            "uuid": "cafe45d0-44b4-41cc-9e11-745071ca942d",
            "orgId": "4b035fc8-d9f0-4fe3-b7d5-1fd187443504",
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
            "name": "RV LOG",
            "location": null,
            "fretronId": null,
            "contacts": [
                {
                    "emails": [],
                    "address": null,
                    "mobileNumbers": [],
                    "mobileNumber": null,
                    "name": "RV LOG",
                    "type": null
                }
            ],
            "status": "ACTIVE"
        },
        "uuid": null,
        "orgId": null,
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
            "orgId": null,
            "vehicleLoadType": {
                "bodyType": "OPEN",
                "passingCapacityMT": 42,
                "minLength": 0,
                "updates": {
                    "traceID": null,
                    "resourceId": "cb54ae1b-fcdd-418a-8299-b5d4e718cea1",
                    "updatedBy": "USER",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": "Created Load Type.",
                    "forwardReasons": [
                        "load.type.created.event"
                    ],
                    "userId": "fc6a1d6e-cf18-4bf8-9489-58d56aab16ec",
                    "uuid": "cc7fda01-9459-4d78-b3f7-5664935e7e69",
                    "revision": null,
                    "time": 1657866137456,
                    "forwardedFrom": null,
                    "resourceType": "LoadTypes",
                    "updateType": null
                },
                "vehicleCategories": null,
                "uuid": "cb54ae1b-fcdd-418a-8299-b5d4e718cea1",
                "orgId": "4b035fc8-d9f0-4fe3-b7d5-1fd187443504",
                "vehicleCategory": "TRAILOR",
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
                "numberOfWheels": null,
                "chassisType": "OPEN",
                "includeMinHeight": false,
                "name": "TRAILER",
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
            "vehicleType": "TRAILER",
            "groups": null,
            "externalId": null,
            "updateTime": null,
            "sharedWith": null,
            "baseLocationId": null,
            "vehicleMake": null,
            "vehicleRegistrationNumber": "HR454545",
            "chassisNumber": null,
            "driverId": null,
            "createTime": null,
            "loadCapacity": 42,
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
            "name": "Ankur",
            "vehicleId": null,
            "associatedUserId": null,
            "status": null
        },
        "fleetType": "Owned",
        "fleetOwner": {
            "geoFence": null,
            "documents": [],
            "customFields": null,
            "isPortalEnabled": true,
            "type": "vendor",
            "updates": null,
            "uuid": "cafe45d0-44b4-41cc-9e11-745071ca942d",
            "orgId": "4b035fc8-d9f0-4fe3-b7d5-1fd187443504",
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
            "name": "RV LOG",
            "location": null,
            "fretronId": null,
            "contacts": [
                {
                    "emails": [],
                    "address": null,
                    "mobileNumbers": [],
                    "mobileNumber": null,
                    "name": "RV LOG",
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
            "type": null,
            "updates": null,
            "uuid": null,
            "orgId": "4b035fc8-d9f0-4fe3-b7d5-1fd187443504",
            "attachedResourceId": null,
            "isDeleted": null,
            "createTime": null,
            "serviceProvider": null,
            "imei": null,
            "usedBy": null,
            "status": null
        },
        "status": null
    },
    "syncUpDueTime": 1683023400000,
    "billingStatus": null,
    "currentLocation": {
        "isFillingEnabled": false,
        "address": "Kolkata",
        "lngLat": [
            74.98156657306639,
            29.329843926924543
        ],
        "odometer": null,
        "latitude": 29.329843926924543,
        "course": 99,
        "imei": "355172105469660",
        "decoder": "Concox",
        "time": 1682919795000,
        "vehicleId": null,
        "speed": 28,
        "longitude": 74.98156657306639
    },
    "alerts": [],
    "equipments": null,
    "tripType": "Shipment",
    "lastDelayCalculationTime": null,
    "delayReasonUpdateDueTime": null,
    "locationTrackingStatus": "UP TO DATE",
    "poLineItemId": "13ddf9d2-f4ed-4333-9583-96907ad8e81e",
    "consignments": [],
    "customContacts": null,
    "shipmentStages": [
        {
            "departureTime": null,
            "gateInTime": null,
            "actualActivityStartTime": null,
            "actualActivityEndTime": null,
            "uuid": "fe4b6d96-eafa-4d4e-aeef-80d4e6a5b062",
            "consignmentDelivered": null,
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": "JSPL Patratu, JSPL Patratu",
            "hub": null,
            "arrivalTime": 1682916220473,
            "expectedActivityStartTime": null,
            "secondaryStatus": "WaitingForGateIn",
            "consignmentPickUps": [
                "b1fdd4ce-2adf-46c2-85c7-28b64ea83a38",
                "d542e82f-5ee4-4c67-9967-44c02ec8766d",
                "3caff64f-021d-4b7b-9135-83d8df493265"
            ],
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": null,
                "purpose": "Pickup",
                "plannedArrival": null,
                "currentGpsState": null,
                "updates": null,
                "uuid": "fe4b6d96-eafa-4d4e-aeef-80d4e6a5b062",
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
                    "address": "Unnamed Road, Patratu, Jharkhand 829143, India",
                    "accessibility": "public",
                    "addedBy": "823947a3-02c0-4e65-8f4e-21da370ea6cd",
                    "center": {
                        "latitude": 29.534368661599864,
                        "longitude": 75.03375162843444
                    },
                    "suggestedRadius": 502,
                    "isOwned": false,
                    "centerCoordinates": [
                        75.03375162843444,
                        29.534368661599864
                    ],
                    "placeId": "50630ff4-0f01-4935-8580-c155c7a93c4b",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "FRETRON",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "JSPL Patratu",
                    "state": null,
                    "category": "Manufacturing Plant/Factory/Yard",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "remainingDistance": null,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "fe4b6d96-eafa-4d4e-aeef-80d4e6a5b062"
                ],
                "actualActivityEndTime": null,
                "actualArrival": 1682916220473,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": null,
                "isAutoCompleted": false,
                "coveredDistance": null,
                "hub": null,
                "imei": null,
                "assosiatedShipmentsId": [
                    "2ef7f04e-8c4a-46f6-9352-49e4b1440328"
                ],
                "status": "AT"
            },
            "place": {
                "hubId": null,
                "boundary": null,
                "address": "Unnamed Road, Patratu, Jharkhand 829143, India",
                "accessibility": "public",
                "addedBy": "823947a3-02c0-4e65-8f4e-21da370ea6cd",
                "center": {
                    "latitude": 23.633114,
                    "longitude": 85.322884
                },
                "suggestedRadius": 502,
                "isOwned": false,
                "centerCoordinates": [
                    85.322884,
                    23.633114
                ],
                "placeId": "50630ff4-0f01-4935-8580-c155c7a93c4b",
                "geoJsonBoundry": null,
                "externalId": null,
                "source": "FRETRON",
                "places": null,
                "viewport": null,
                "district": null,
                "name": "JSPL Patratu",
                "state": null,
                "category": "Manufacturing Plant/Factory/Yard",
                "subDistrict": null,
                "controllingBranchId": null
            },
            "controllingBranchId": null,
            "gateOutTime": null,
            "status": "AT"
        },
        {
            "departureTime": null,
            "gateInTime": null,
            "actualActivityStartTime": null,
            "actualActivityEndTime": null,
            "uuid": "acea268a-ae59-48f8-a64c-2538cb59ab09",
            "consignmentDelivered": [
                "b1fdd4ce-2adf-46c2-85c7-28b64ea83a38",
                "d542e82f-5ee4-4c67-9967-44c02ec8766d",
                "3caff64f-021d-4b7b-9135-83d8df493265"
            ],
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": "Suyash Kumar, New Delhi-Suyash Kumar",
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
                "uuid": "acea268a-ae59-48f8-a64c-2538cb59ab09",
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
                    "address": "",
                    "accessibility": "public",
                    "addedBy": "",
                    "center": {
                        "latitude": 29.984097903448273,
                        "longitude": 76.58373343103449
                    },
                    "suggestedRadius": 0,
                    "isOwned": false,
                    "centerCoordinates": [
                        76.58373343103449,
                        29.984097903448273
                    ],
                    "placeId": "1e329d50-3d7e-4630-8121-8ca6e8b63585",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "FRETRON",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "PEHOWA-Suyash Kumar",
                    "state": null,
                    "category": "Fleet Office",
                    "subDistrict": "136128",
                    "controllingBranchId": null
                },
                "remainingDistance": 0,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "acea268a-ae59-48f8-a64c-2538cb59ab09"
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
                    "2ef7f04e-8c4a-46f6-9352-49e4b1440328"
                ],
                "status": "NEXT"
            },
            "place": {
                "hubId": null,
                "boundary": null,
                "address": "",
                "accessibility": "public",
                "addedBy": "",
                "center": {
                    "latitude": 29.984097903448273,
                    "longitude": 76.58373343103449
                },
                "suggestedRadius": 0,
                "isOwned": false,
                "centerCoordinates": [
                    76.58373343103449,
                    29.984097903448273
                ],
                "placeId": "1e329d50-3d7e-4630-8121-8ca6e8b63585",
                "geoJsonBoundry": null,
                "externalId": null,
                "source": "FRETRON",
                "places": null,
                "viewport": null,
                "district": null,
                "name": "PEHOWA-Suyash Kumar",
                "state": null,
                "category": "Fleet Office",
                "subDistrict": "136128",
                "controllingBranchId": null
            },
            "controllingBranchId": null,
            "gateOutTime": null,
            "status": "NEXT"
        }
    ],
    "remarks": null,
    "syncUpExpiryTime": 1683084600000,
    "shipmentStatus": "Created"
}

async function mailer(to, cc, subject, html) {
    try {
        let url = `${FRT_PUB_BASE_URL}/notifications/emails/email`

        let options = {
            uri: url,
            method: "POST",
            json: true,
            headers: {
                Authorization: token
            },
            body: {
                to: to,
                cc: cc,
                subject: subject,
                html: html
            }
        }

        return await rp(options)
    } catch (error) {
        console.log(`Some error sending mail ${error.message}`)
    }
}
function getFromCf(cf, key) {
    if (cf) {
        let value = cf.find((v) => v.fieldKey == key)
        if (value) {
            return value.value
        }
    }
    else {
        return null
    }

}

async function calculateDistanceByCordinates(origin, destination) {
    let url =
        `${FRT_PUB_BASE_URL}/itinerary/admin/calculateDistance?originLat=${origin[1]}&originLng=${origin[0]}&destinationLat=${destination[1]}&destinationLng=${destination[0]}`
    console.log(`URL : ${url}`)
    let res = await rp({
        method: "GET",
        uri: url,
        json: true,
    });
    console.log(`CalKm by shipment Stage status : ${res.status}`);
    if (res.status == 200) {
        return res.data
    } else {
        console.log(`Error calculating distance- ${res.error}`)
        return 0
    }
}
// async function main(sh) {
//     let shNo = sh.shipmentNumber
//     let cf = sh.customFields
//     let vehicleNo = sh?.fleetInfo?.vehicle?.vehicleRegistrationNumber
//     let driverName = sh?.fleetInfo?.driver?.name
//     let driverNo = sh?.fleetInfo?.driver?.mobileNumber
//     let currentAddress = sh?.currentLocation?.address
//     let flag = false
//     let Route_Assigned_By = getFromCf(cf, "Route Assigned By")
//     console.log(`Route_Assigned_By  ${Route_Assigned_By}`)
//     let html = `
//         <html>
//         <head>
//         <body>
//         <p>Dear sir</p>
//         <p>Please find the below shipment details which is found to have route deviation alert at ${moment(Date.now()).format("DD-MM-YY")} ${moment(Date.now()).format("h:mm:ss")} </p>
//         <p>shipmentNumber- : ${shNo}</p>
//         <p>vehicleNumber- : ${vehicleNo ?? "N/A"}</p>
//         <p>Driver Name- : ${driverName ?? "N/A"}</p>
//         <p>Driver Number- : ${driverNo ?? "N/A"}</p>
//         <p>Current Location- : ${currentAddress ?? "N/A"}</p>        
//         </body>
//         </head>
//         </html>
// `

//     if (Route_Assigned_By && Route_Assigned_By == "User") {
//         let origin = _.first(sh.shipmentStages).place
//             ? _.first(sh.shipmentStages).place.centerCoordinates
//             : _.first(sh.shipmentStages).hub
//                 ? _.first(sh.shipmentStages).hub.centerCoordinates
//                 : null
//         let currentLocation = sh?.currentLocation?.lngLat

//         if (origin && currentLocation) {
//             console.log(origin, currentLocation)
//             let calculatedDistance = await calculateDistanceByCordinates(origin, currentLocation)
//             calculatedDistance = calculatedDistance ? (calculatedDistance / 1000).toFixed(2) : null
//             console.log(`calculatedDistance  = ${calculatedDistance}`)
//             if (calculatedDistance && calculatedDistance > 20) {
//                 flag = true
//             }
//             else {
//                 console.log(`Route Assigned By User ${shNo} Total Distance: ${calculatedDistance}`)

//             }
//         }


//     }
//     else if (Route_Assigned_By && Route_Assigned_By == "System") {
//         flag = true
//     }
//     else {
//         console.log(`Route_Assigned_By customfield not found ${shNo}`)
//     }
//     if (flag) {

//         let to = ["pooja.bishu@fretron.com"]
//         let cc = ["suyash.kumar@fretron.com"]
//         let subject = `Route Deviation Alert for shipment -${shNo} ${moment(Date.now()).format("DD-MM-YY")} `
//         let mailRes = await mailer(to, cc, subject, html)

//     }
// }
async function main(sh) {
    let shNo = sh.shipmentNumber
    let cf = sh.customFields
    let vehicleNo = sh?.fleetInfo?.vehicle?.vehicleRegistrationNumber
    let driverName = sh?.fleetInfo?.driver?.name
    let driverNo = sh?.fleetInfo?.driver?.mobileNumber
    let currentAddress = sh?.currentLocation?.address
    let flag = false
    let Route_Assigned_By = getFromCf(cf, "Route Assigned By")
    console.log(`Route_Assigned_By  ${Route_Assigned_By}`)
    let html = `
    <html>
    <head>
    <body>
    <p>Dear sir</p>
    <p>Please find the below shipment details which is found to have route deviation alert at ${moment(Date.now()).format("DD-MM-YY")} ,${moment(Date.now()).format("h:mm:ss")} </p>
    <p>Shipment Number- : ${shNo}</p>
    <p>Vehicle Number- : ${vehicleNo ?? "N/A"}</p>
    <p>Driver Name- : ${driverName ?? "N/A"}</p>
    <p>Driver Number- : ${driverNo ?? "N/A"}</p>
    <p>Current Location- : ${currentAddress ?? "N/A"}</p>        
    </body>
    </head>
    </html>`


    if (Route_Assigned_By && Route_Assigned_By == "User") {
        let origin = _.first(sh.shipmentStages).place
            ? _.first(sh.shipmentStages).place.centerCoordinates
            : _.first(sh.shipmentStages).hub
                ? _.first(sh.shipmentStages).hub.centerCoordinates
                : null
        let currentLocation = sh?.currentLocation?.lngLat

        if (origin && currentLocation) {
            console.log(origin, currentLocation)
            let calculatedDistance = await calculateDistanceByCordinates(origin, currentLocation)
            calculatedDistance = calculatedDistance ? (calculatedDistance / 1000).toFixed(2) : null
            console.log(`calculatedDistance  = ${calculatedDistance}`)
            if (calculatedDistance && calculatedDistance > 20) {
                flag = true
            }
            else {
                console.log(`Route Assigned By User ${shNo} Total Distance: ${calculatedDistance}`)

            }
        }


    }
    else if (Route_Assigned_By && Route_Assigned_By == "System") {
        flag = true
    }
    else {
        console.log(`Route_Assigned_By customfield not found ${shNo}`)
    }
    if (flag) {

        let to = ["pooja.bishu@fretron.com"]
        let cc = ["suyash.kumar@fretron.com"]
        let subject = `Route Deviation Alert for shipment -${shNo}, ${moment(Date.now()).format("DD-MM-YY")} `
        let mailRes = await mailer(to, cc, subject, html)

    }
}
main($event)

async function main2() {
    let originLatLng = [77.07435721388904, 28.458852944069925]
    let currentLatLng = [77.06577414557194, 28.446552432948923]
    let totalDistace = await calculateDistanceByCordinates(originLatLng, currentLatLng)
    console.log(totalDistace / 1000)
}
// main2()