const rp = require("request-promise")
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
        }
    ],
    "transportationMode": "ByRoad",
    "freightUnitLineItemId": "e3a88006-601e-4482-86fe-0f30dbe34211",
    "lastSyncUpTime": 1682916220964,
    "updates": {
        "traceID": "9ab0db11-dea8-4b33-b714-ac1f7c065e02",
        "resourceId": "2ef7f04e-8c4a-46f6-9352-49e4b1440328",
        "updatedBy": "USER",
        "changes": null,
        "sourceOfInformation": null,
        "description": "Added DO ISSUED : N/A\nAdded Driver GPS Advance : 450",
        "forwardReasons": [
            "shipment.custom.fields.updated"
        ],
        "userId": "d1b5a45c-9005-4061-a5f4-411dec2bef88",
        "uuid": "40288e99-0318-4a79-a0ee-6e6a1c78f5d7",
        "revision": 3,
        "time": 1682916224042,
        "forwardedFrom": "DO ISSUED,Driver GPS Advance",
        "resourceType": "ShipmentObject",
        "updateType": null
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
    "lastForwardTime": 1682916221082,
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
            "customFields": [
                {
                    "indexedValue": [
                        "totalPlacementPendingV2_1"
                    ],
                    "fieldKey": "totalPlacementPendingV2",
                    "multiple": false,
                    "description": null,
                    "remark": null,
                    "uuid": null,
                    "required": false,
                    "accessType": null,
                    "input": "String",
                    "unit": null,
                    "valueType": "String",
                    "options": null,
                    "fieldType": "text",
                    "value": "1",
                    "isRemark": false
                }
            ],
            "isPortalEnabled": true,
            "type": "vendor",
            "updates": {
                "traceID": "530eea40-3cda-4cb0-9598-97fd89eeae7a",
                "resourceId": "cafe45d0-44b4-41cc-9e11-745071ca942d",
                "updatedBy": "SYSTEM",
                "changes": [
                    {
                        "lastValue": "2",
                        "fieldName": "totalPlacementPendingV2",
                        "fieldType": "String",
                        "currentValue": "1"
                    }
                ],
                "sourceOfInformation": null,
                "description": "updated field totalPlacementPendingV2",
                "forwardReasons": [
                    "business.partner.update.event",
                    "business.partner.custom.field"
                ],
                "userId": null,
                "uuid": "1eeb3df1-2690-4fc3-ab05-eea5688f6343",
                "revision": null,
                "time": 1682679513446,
                "forwardedFrom": null,
                "resourceType": "Business-Partner",
                "updateType": null
            },
            "uuid": "cafe45d0-44b4-41cc-9e11-745071ca942d",
            "orgId": "4b035fc8-d9f0-4fe3-b7d5-1fd187443504",
            "firmType": "INDIVISUAL",
            "gstn": null,
            "voterId": null,
            "verificationTicketId": null,
            "group": {
                "name": "lorryOwner",
                "partnerType": "vendor",
                "uuid": "9aee565c-798f-4bcb-930e-4c0a79a1bea2",
                "orgId": "4b035fc8-d9f0-4fe3-b7d5-1fd187443504"
            },
            "address": "{\"address\":null,\"city\":null,\"state\":null,\"pincode\":null}",
            "verificationStatus": "unverified",
            "externalId": null,
            "panNumber": null,
            "aadharNo": null,
            "parentId": null,
            "places": [],
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
            "name": null,
            "vehicleId": null,
            "associatedUserId": null,
            "status": null
        },
        "fleetType": "Owned",
        "fleetOwner": {
            "geoFence": null,
            "documents": [],
            "customFields": [
                {
                    "indexedValue": [
                        "totalPlacementPendingV2_1"
                    ],
                    "fieldKey": "totalPlacementPendingV2",
                    "multiple": false,
                    "description": null,
                    "remark": null,
                    "uuid": null,
                    "required": false,
                    "accessType": null,
                    "input": "String",
                    "unit": null,
                    "valueType": "String",
                    "options": null,
                    "fieldType": "text",
                    "value": "1",
                    "isRemark": false
                }
            ],
            "isPortalEnabled": true,
            "type": "vendor",
            "updates": {
                "traceID": "530eea40-3cda-4cb0-9598-97fd89eeae7a",
                "resourceId": "cafe45d0-44b4-41cc-9e11-745071ca942d",
                "updatedBy": "SYSTEM",
                "changes": [
                    {
                        "lastValue": "2",
                        "fieldName": "totalPlacementPendingV2",
                        "fieldType": "String",
                        "currentValue": "1"
                    }
                ],
                "sourceOfInformation": null,
                "description": "updated field totalPlacementPendingV2",
                "forwardReasons": [
                    "business.partner.update.event",
                    "business.partner.custom.field"
                ],
                "userId": null,
                "uuid": "1eeb3df1-2690-4fc3-ab05-eea5688f6343",
                "revision": null,
                "time": 1682679513446,
                "forwardedFrom": null,
                "resourceType": "Business-Partner",
                "updateType": null
            },
            "uuid": "cafe45d0-44b4-41cc-9e11-745071ca942d",
            "orgId": "4b035fc8-d9f0-4fe3-b7d5-1fd187443504",
            "firmType": "INDIVISUAL",
            "gstn": null,
            "voterId": null,
            "verificationTicketId": null,
            "group": {
                "name": "lorryOwner",
                "partnerType": "vendor",
                "uuid": "9aee565c-798f-4bcb-930e-4c0a79a1bea2",
                "orgId": "4b035fc8-d9f0-4fe3-b7d5-1fd187443504"
            },
            "address": "{\"address\":null,\"city\":null,\"state\":null,\"pincode\":null}",
            "verificationStatus": "unverified",
            "externalId": null,
            "panNumber": null,
            "aadharNo": null,
            "parentId": null,
            "places": [],
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
    "currentLocation": null,
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
            "consignmentPickUps": null,
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
                "remainingDistance": null,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "fe4b6d96-eafa-4d4e-aeef-80d4e6a5b062"
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
            "consignmentDelivered": null,
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
    "shipmentStatus": "Planned"
}


async function bulkSyncApi(payload) {
    try {
        let res = await rp({
            url: "https://apis.fretron.com/shipment/v1/shipment/bulk/sync",
            method: "POST",
            json: true,
            body: payload,
            headers: {
                authorization: token
            }

        })
        if (res.status == 200) {
            return res.status
        }
        else {
            return res.error
        }
    } catch (e) {
        console.log(`error executing while updating Route added by ${e.message}`)
    }
}

async function getRouteByCustomerExtId(extId) {
    try {
        let res = await rp({
            url: `http://apis.fretron.com/routes/v1/routes?${extId}`,
            method: "GET",
            json: true,
            headers: {
                authorization: token
            }
        })
        if (res.status == 200) {
            return res.data
        }
        else {
            return null
        }
    } catch (e) {
        console.log(`error executing while getting route ${e.message}`)
    }
}

async function assignRoute(shId, routeId) {
    try {
        let url = `http://apis.fretron.com/shipment/v1/admin/shipment/${shId}/assign/route?routeId=${routeId}`
        console.log(url)
        let res = await rp({
            url: url,
            method: "GET",
            json: true,
            headers: {
                authorization: token
            }
        })
        console.log(`assign route status ${res.status}`)
        return res
    } catch (e) {
        console.log(`error executing while assigning route ${e.message}`)
    }
}

async function main(sh) {
    let routeId = sh.routeId
    console.log(sh.shipmentNumber, sh.uuid)

    let shId = sh.uuid
    let input = ""

    if (routeId) {
        input = "User"
    }
    else {
        let cn = sh?.consignments
        if (cn.length) {
            let customerExtId = ""
            for (let item of cn) {
                let exteranlId = item.consignee.externalId
                console.log(exteranlId)
                if (exteranlId) {
                    customerExtId = exteranlId
                    break
                }
            }
            if (customerExtId) {
                console.log(customerExtId)
                let routeRes = await getRouteByCustomerExtId(customerExtId)
                if (routeRes) {
                    let routeUuid = routeRes[0].uuid
                    console.log(`routeUuid  ${routeUuid}`)
                    let routeAssignedRes = await assignRoute(shId, routeUuid)
                    if (routeAssignedRes) {
                        input = "System"
                    }
                    // console.log(routeAssignedRes)
                }
            }
        }
    }

    console.log(`route status -->${input}`)

    let payload = {
        shipmentId: shId,
        updates: [
            {
                keyToUpdate: "customfields",
                updatedValue: [
                    {
                        "accessType": null,
                        "fieldType": "select",
                        "fieldKey": "Route Assigned By",
                        "value": null,
                        "multiple": true,
                        "unit": "",
                        "isRemark": false,
                        "remark": "",
                        "required": false,
                        "description": "",
                        "options": ["System", "User"],
                        "indexedValue": [],
                        "valueType": "arrayOfString",
                        "input": input
                    }
                ],
            },
        ],
    }

    let updatedCfRes = await bulkSyncApi(payload)
    console.log(updatedCfRes)

}

// main($event)

async function main2(sh) {
    let routeId = sh?.routeId
    let shId = sh.uuid
    let input = null
    if (routeId) {
        input = "User"
    }
    else {
        let cn = sh?.consignments
        if (cn.length) {
            let customerExtId = null
            for (let item of cn) {
                customerExtId = item?.consignee?.externalId
                console.log(`externalId  ${customerExtId}`)
                if (customerExtId) {
                    break
                }
            }
            if (customerExtId) {
                console.log(customerExtId)
                let routeRes = await getRouteByCustomerExtId(customerExtId)
                if (routeRes) {
                    let routeUuid = routeRes[0].uuid
                    console.log(`routeUuid  ${routeUuid}`)
                    let routeAssignedRes = await assignRoute(shId, routeUuid)
                    if (routeAssignedRes) {
                        input = "System"
                    }
                }
            }
        }
    }

    console.log(`customfield Type Route Assigned By --> ${input}`)
    if (input) {
        let payload = {
            shipmentId: shId,
            updates: [
                {
                    keyToUpdate: "customfields",
                    updatedValue: [
                        {
                            "accessType": null,
                            "fieldType": "select",
                            "fieldKey": "Route Assigned By",
                            "value": input,
                            "multiple": true,
                            "unit": "",
                            "isRemark": false,
                            "remark": "",
                            "required": false,
                            "description": "",
                            "options": ["System", "User"],
                            "indexedValue": [],
                            "valueType": "arrayOfString",
                            "input": ""
                        }
                    ],
                },
            ],
        }

        let updatedCfRes = await bulkSyncApi(payload)
        console.log(updatedCfRes)
    } else {
        console.log(`Route Assigned By Not get any input for this ${sh.shipmentNumber}`)
    }


}
main2($event)
