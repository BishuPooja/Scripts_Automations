const rp = require("request-promise")
const TOKEN = ""
const _ = require("lodash")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"

async function getShByImei(imei) {
    try {
        let filters = {
            "vtsDeviceId": [imei],
            "__version": 2,
            "_not": {
                "_shipmentStatus_": {
                    "shipmentStatus": ["Completed"]
                }
            }
        }
        let url = `${FRT_PUB_BASE_URL}/shipment-view/shipments/v1?filters=${encodeURIComponent(JSON.stringify(filters))}`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })
        return res?.length ? res : []
    } catch (e) {
        console.log(`Caught Error shipment Get By Imei ${e.message}`)
    }
    return []
}

async function main(sh) {
    try {
        let imei = sh?.fleetInfo?.device?.imei
        if (!imei) {
            console.log(`No Imei Found for ${sh?.shipmentNumber}`)
            return
        }
        let shRes = await getShByImei(imei)
        if (!shRes) {
            console.log(`No active shipment Not Found for Imei ${imei}`)
            return { "status": 200, "data": sh, "error": null }
        }
        else {
            let shNos = shRes.map((sh) => sh.shipmentNumber)?.join(",")
            return { data: null, error: `First Completed All Shipments ${shNos} With imei ${imei}`, status: 400 }
        }

    } catch (e) {
        console.log(`Caught Error ${e.message}`)
    }
}

let $event = {
    body: {
        actionData: {
            "creationTime": 1692872623901,
            "customFields": [
                {
                    "indexedValue": [
                        "FreightCost_1.0"
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
                    "value": "1.0",
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
                        "PONo_23d6abef-58b3-43dc-ba5a-d24e168cfc08"
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
                    "value": "23d6abef-58b3-43dc-ba5a-d24e168cfc08",
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
                        "Plant Tracking Last Update_1692940164706"
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
                    "value": "1692958545267",
                    "isRemark": false
                },
                {
                    "indexedValue": [
                        "Type_Inbound"
                    ],
                    "fieldKey": "Type",
                    "multiple": false,
                    "description": "",
                    "remark": "",
                    "uuid": null,
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
                    "value": "Inbound",
                    "isRemark": false
                },
                {
                    "indexedValue": [
                        "Category_Others"
                    ],
                    "fieldKey": "Category",
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
                    "value": "Others",
                    "isRemark": false
                },
                {
                    "indexedValue": [
                        "Allocation Type_Manual"
                    ],
                    "fieldKey": "Allocation Type",
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
                    "value": "Manual",
                    "isRemark": false
                },
                {
                    "indexedValue": [
                        "Indent Submitted To_ashish.shrivastava@jubl.com"
                    ],
                    "fieldKey": "Indent Submitted To",
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
                    "value": "ashish.shrivastava@jubl.com",
                    "isRemark": false
                },
                {
                    "indexedValue": [
                        "Indentor_saurabh.bajaj@jubl.com"
                    ],
                    "fieldKey": "Indentor",
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
                    "value": "saurabh.bajaj@jubl.com",
                    "isRemark": false
                },
                {
                    "indexedValue": [
                        "Site_4LS001"
                    ],
                    "fieldKey": "Site",
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
                    "value": "4LS001",
                    "isRemark": false
                },
                {
                    "indexedValue": [
                        "Business_Acetyls"
                    ],
                    "fieldKey": "Business",
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
                    "value": "Acetyls",
                    "isRemark": false
                },
                {
                    "indexedValue": [
                        "Company_600"
                    ],
                    "fieldKey": "Company",
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
                    "value": "600",
                    "isRemark": false
                },
                {
                    "indexedValue": [
                        "Reporting No - Unloading_160008193"
                    ],
                    "fieldKey": "Reporting No - Unloading",
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
                    "value": "160008193",
                    "isRemark": false
                },
                {
                    "indexedValue": [
                        "Gate Entry No - Unloading_160005849"
                    ],
                    "fieldKey": "Gate Entry No - Unloading",
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
                    "value": "160005849",
                    "isRemark": false
                },
                {
                    "indexedValue": [
                        "VehicleAtSamePosition_1692940695932"
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
                    "value": "1692940695932",
                    "isRemark": false
                }
            ],
            "transportationMode": "ByRoad",
            "freightUnitLineItemId": "8bbe2f9f-3ef3-4637-9605-8dd664ed41d7",
            "lastSyncUpTime": 1692940695932,
            "updates": {
                "traceID": "tripPointEventsTopicByImei_0_23834780",
                "resourceId": "5c008dcf-83bc-4437-ad13-9b9f53a0f536",
                "updatedBy": "USER",
                "changes": null,
                "sourceOfInformation": null,
                "description": null,
                "forwardReasons": [
                    "shipment.custom.fields.updated",
                    "gps.state.updated"
                ],
                "userId": "868ac373-ed4f-407d-9a26-b6b0e17fae1f",
                "uuid": "caab41fa-7014-4e37-befd-cebe2b20dd39",
                "revision": 281,
                "time": 1692958545265,
                "forwardedFrom": null,
                "resourceType": "ShipmentObject",
                "updateType": "At Delivery Point"
            },
            "isActive": true,
            "uuid": "5c008dcf-83bc-4437-ad13-9b9f53a0f536",
            "issues": null,
            "branch": {
                "companyCode": null,
                "address": "Jubilant Ingrevia Limited (Unit-1), , , Plot No. P1-L1, Within Jubilant SEZ Plot-5, Vilayat,Taluk Vagra, Dist.Bharuch,Gujarat-392012, ",
                "updatedBy": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "addressCode_OM000004,COM000004,COM000005,COM000006,COM000007,COM00000"
                        ],
                        "fieldKey": "addressCode",
                        "valueType": "string",
                        "fieldType": "text",
                        "value": "OM000004,COM000004,COM000005,COM000006,COM000007,COM00000",
                        "definitionId": null
                    },
                    {
                        "indexedValue": [
                            "address_Plot No. P1-L1, Within Jubilant SEZ Plot-5, Vilayat,Taluk Vagra, Dist.Bharuch,Gujarat-392012"
                        ],
                        "fieldKey": "address",
                        "valueType": "string",
                        "fieldType": "text",
                        "value": "Plot No. P1-L1, Within Jubilant SEZ Plot-5, Vilayat,Taluk Vagra, Dist.Bharuch,Gujarat-392012",
                        "definitionId": null
                    }
                ],
                "regionName": null,
                "externalId": null,
                "branchName": null,
                "type": [
                    "IT",
                    "Operation",
                    "Sales"
                ],
                "updates": null,
                "orgId": "464d4e6a-4d62-429f-a660-86a48839c7af",
                "areaId": null,
                "geoLocation": null,
                "regionId": null,
                "areaName": null,
                "name": "Bharuch",
                "zoneId": null,
                "_id": "1d6aa91e-d820-48e1-b69b-d13aab06b2e4",
                "zoneName": null,
                "contacts": [],
                "officeType": null,
                "materialServices": null
            },
            "orgId": "464d4e6a-4d62-429f-a660-86a48839c7af",
            "shipmentType": "DirectLeg",
            "completionTime": null,
            "orderNumbers": [
                "FRPO0000090"
            ],
            "routeId": null,
            "shipmentTrackingStatus": "At Delivery Point",
            "lastForwardTime": 1692955153354,
            "runningStatus": null,
            "delayTrackingStatus": "UP TO DATE",
            "delayReasonLastUpdateTime": null,
            "links": null,
            "shipmentDate": 1692872623714,
            "delayReason": null,
            "shipmentNumber": "FRETSH000000906",
            "originalEdd": null,
            "edd": null,
            "delayReasonUpdateExpiryTime": null,
            "externalShipmentId": null,
            "fleetInfo": {
                "isTrackingEnable": null,
                "forwardingAgent": null,
                "verificationStatus": null,
                "trackingMode": "VTS",
                "broker": {
                    "geoFence": null,
                    "documents": [],
                    "customFields": null,
                    "isPortalEnabled": true,
                    "type": "vendor",
                    "updates": null,
                    "uuid": "54496fe2-2226-4d8a-9b2c-184e51416702",
                    "orgId": "464d4e6a-4d62-429f-a660-86a48839c7af",
                    "firmType": "COMPANY",
                    "gstn": "09AAGFV2659G1ZU",
                    "voterId": null,
                    "verificationTicketId": null,
                    "companyCodes": null,
                    "group": {
                        "name": "Transporter",
                        "partnerType": null,
                        "uuid": null,
                        "orgId": null
                    },
                    "address": "{\"address\":\"\",\"state\":\"Uttar Pradesh\",\"city\":\"Meerut\",\"pincode\":null}",
                    "verificationStatus": "unverified",
                    "externalId": "119",
                    "panNumber": "AAGFV2659G",
                    "aadharNo": null,
                    "parentId": null,
                    "places": null,
                    "route": null,
                    "name": "V N EXPRESS",
                    "location": null,
                    "fretronId": null,
                    "contacts": [
                        {
                            "emails": [
                                "nitinallen@yahoo.com"
                            ],
                            "address": "{\"address\":\"\",\"state\":\"Uttar Pradesh\",\"city\":\"Meerut\",\"pincode\":null}",
                            "mobileNumbers": [
                                "9837783639"
                            ],
                            "mobileNumber": null,
                            "name": "Nitin Allen",
                            "type": null
                        }
                    ],
                    "status": "ACTIVE"
                },
                "uuid": "ca8d00d1-00ff-42eb-bfb5-31026b307da1",
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
                    "orgId": "464d4e6a-4d62-429f-a660-86a48839c7af",
                    "vehicleLoadType": {
                        "bodyType": "Tanker",
                        "passingCapacityMT": 32,
                        "minLength": 0,
                        "updates": {
                            "traceID": null,
                            "resourceId": "5a4b0fd6-1013-4995-a488-f9efa67ac768",
                            "updatedBy": "USER",
                            "changes": null,
                            "sourceOfInformation": null,
                            "description": "Created Load Type.",
                            "forwardReasons": [
                                "load.type.created.event"
                            ],
                            "userId": "a42e539c-88f3-42cf-a1e7-d13e0b60833d",
                            "uuid": "805e2cda-c0c3-48e1-82f8-72f797edba3a",
                            "revision": null,
                            "time": 1682428124160,
                            "forwardedFrom": null,
                            "resourceType": "LoadTypes",
                            "updateType": null
                        },
                        "vehicleCategories": [],
                        "uuid": "5a4b0fd6-1013-4995-a488-f9efa67ac768",
                        "orgId": "464d4e6a-4d62-429f-a660-86a48839c7af",
                        "vehicleCategory": "Tanker",
                        "includeMaxLength": false,
                        "minHeight": 0,
                        "maxHeight": -1,
                        "passingCapacityCFT": 32,
                        "bodyTypes": [],
                        "partnerName": null,
                        "includeMinLength": false,
                        "partnerExternalId": null,
                        "externalId": "TNB032",
                        "chassisTypes": [],
                        "numberOfWheels": 18,
                        "chassisType": "Tanker-Bulk",
                        "includeMinHeight": false,
                        "name": "Tanker Bulk - 32mt",
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
                    "updateTime": 1691984166471,
                    "sharedWith": [],
                    "baseLocationId": null,
                    "vehicleMake": null,
                    "vehicleRegistrationNumber": "UP15ET3209",
                    "chassisNumber": "",
                    "driverId": "5ee6e6d0-bffb-4315-a6da-b33ec0d8d623",
                    "createTime": null,
                    "loadCapacity": 32,
                    "truckLength": null,
                    "category": "Tanker Bulk - 32mt",
                    "groupsExtended": []
                },
                "driver": {
                    "pincode": null,
                    "dlExpiryTime": null,
                    "attachedDocs": null,
                    "isEmployee": false,
                    "pfNumber": null,
                    "address": null,
                    "mobileNumbers": null,
                    "dlNumber": "UP2320080048442",
                    "mobileNumber": "9012660569",
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
                    "name": "RATAN SINGH",
                    "vehicleId": null,
                    "associatedUserId": null,
                    "status": null
                },
                "fleetType": "Market",
                "fleetOwner": {
                    "geoFence": null,
                    "documents": [],
                    "customFields": null,
                    "isPortalEnabled": true,
                    "type": "vendor",
                    "updates": null,
                    "uuid": "54496fe2-2226-4d8a-9b2c-184e51416702",
                    "orgId": "464d4e6a-4d62-429f-a660-86a48839c7af",
                    "firmType": "COMPANY",
                    "gstn": "09AAGFV2659G1ZU",
                    "voterId": null,
                    "verificationTicketId": null,
                    "companyCodes": null,
                    "group": {
                        "name": "Transporter",
                        "partnerType": null,
                        "uuid": null,
                        "orgId": null
                    },
                    "address": "{\"address\":\"\",\"state\":\"Uttar Pradesh\",\"city\":\"Meerut\",\"pincode\":null}",
                    "verificationStatus": "unverified",
                    "externalId": "119",
                    "panNumber": "AAGFV2659G",
                    "aadharNo": null,
                    "parentId": null,
                    "places": null,
                    "route": null,
                    "name": "V N EXPRESS",
                    "location": null,
                    "fretronId": null,
                    "contacts": [
                        {
                            "emails": [
                                "nitinallen@yahoo.com"
                            ],
                            "address": "{\"address\":\"\",\"state\":\"Uttar Pradesh\",\"city\":\"Meerut\",\"pincode\":null}",
                            "mobileNumbers": [
                                "9837783639"
                            ],
                            "mobileNumber": null,
                            "name": "Nitin Allen",
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
                "device": {
                    "branchId": null,
                    "isSuspended": null,
                    "mobileNumber": null,
                    "manufacturerName": null,
                    "groups": null,
                    "attachedResourceNumber": "UP15ET3209",
                    "externalId": null,
                    "updateTime": null,
                    "isAssociated": null,
                    "sharedWith": null,
                    "type": null,
                    "updates": null,
                    "uuid": null,
                    "orgId": "464d4e6a-4d62-429f-a660-86a48839c7af",
                    "attachedResourceId": "ca8d00d1-00ff-42eb-bfb5-31026b307da1",
                    "isDeleted": null,
                    "createTime": 1692872623962,
                    "serviceProvider": null,
                    "imei": "866968031032486_aditi_tracking",
                    "usedBy": "VEHICLE",
                    "status": null
                },
                "status": null
            },
            "syncUpDueTime": null,
            "billingStatus": null,
            "currentLocation": {
                "isFillingEnabled": false,
                "address": "",
                "lngLat": [
                    72.890335,
                    21.7927867
                ],
                "odometer": null,
                "latitude": 21.7927867,
                "course": 335.7858732124436,
                "imei": "866968031032486_aditi_tracking",
                "decoder": "manual",
                "time": 1692889025000,
                "vehicleId": null,
                "speed": 20,
                "longitude": 72.890335
            },
            "alerts": [],
            "equipments": null,
            "tripType": "Shipment",
            "lastDelayCalculationTime": null,
            "delayReasonUpdateDueTime": null,
            "locationTrackingStatus": "UP TO DATE",
            "poLineItemId": "580ba347-9fb4-4c8f-9d52-323ba522978f",
            "consignments": [],
            "customContacts": null,
            "shipmentStages": [
                {
                    "departureTime": 1692873080000,
                    "gateInTime": null,
                    "actualActivityStartTime": null,
                    "actualActivityEndTime": null,
                    "preActWtTime": null,
                    "uuid": "1e42066b-b02e-4409-8241-3e8ac86e3c4f",
                    "consignmentDelivered": null,
                    "resourceDropOff": null,
                    "resourcePickup": null,
                    "eta": null,
                    "stageName": "undefined, Hazira",
                    "hub": {
                        "hubId": null,
                        "boundary": null,
                        "address": null,
                        "accessibility": "private",
                        "addedBy": "464d4e6a-4d62-429f-a660-86a48839c7af",
                        "center": {
                            "latitude": 21.1784184,
                            "longitude": 72.6587856
                        },
                        "suggestedRadius": 5000,
                        "isOwned": null,
                        "centerCoordinates": [
                            72.6587856,
                            21.1784184
                        ],
                        "placeId": "d7467aee-4f43-4e0c-9a6f-f2c4221ee76e",
                        "geoJsonBoundry": null,
                        "externalId": "IN240017",
                        "source": "GOOGLE",
                        "places": [],
                        "viewport": null,
                        "district": null,
                        "name": "Hazira",
                        "state": "Gujarat",
                        "category": "Hub",
                        "subDistrict": "West",
                        "controllingBranchId": null
                    },
                    "arrivalTime": 1692872720000,
                    "expectedActivityStartTime": null,
                    "secondaryStatus": "WaitingForFinalize",
                    "consignmentPickUps": null,
                    "postActWtTime": null,
                    "tripPoint": {
                        "outOfTrackSince": null,
                        "creationTime": 1692872624065,
                        "purpose": "Pickup",
                        "plannedArrival": null,
                        "currentGpsState": {
                            "numberOfRecord": 26,
                            "totalTime": 2530000,
                            "averageSpeeds": 25.389232237516367,
                            "eventType": "StateUpdated",
                            "uuid": "a0f8f773-fb14-46c4-9cbc-73175cf54b76",
                            "isDisconnected": false,
                            "startLocation": {
                                "isFillingEnabled": false,
                                "address": "Unnamed Road, Hazira, Gujarat 394270, India",
                                "lngLat": [
                                    72.6461678,
                                    21.0864378
                                ],
                                "odometer": null,
                                "latitude": 21.0864378,
                                "course": 0,
                                "imei": "866968031032486_aditi_tracking",
                                "decoder": "manual",
                                "time": 1692870550000,
                                "vehicleId": null,
                                "speed": 0,
                                "longitude": 72.6461678
                            },
                            "isNoGpsZone": false,
                            "mean": {
                                "isFillingEnabled": false,
                                "address": "",
                                "lngLat": [
                                    72.65542342307694,
                                    21.12828164230769
                                ],
                                "odometer": null,
                                "latitude": 21.12828164230769,
                                "course": null,
                                "imei": "",
                                "decoder": null,
                                "time": 1692871636840,
                                "vehicleId": "",
                                "speed": 0,
                                "longitude": 72.65542342307694
                            },
                            "imei": "866968031032486_aditi_tracking",
                            "startTime": 1692870550000,
                            "endTime": 1692873080000,
                            "vehicleId": null,
                            "state": "Moving",
                            "totalDistance": 17842.988211365668,
                            "endLocation": {
                                "isFillingEnabled": false,
                                "address": "",
                                "lngLat": [
                                    72.7102517,
                                    21.1871583
                                ],
                                "odometer": null,
                                "latitude": 21.1871583,
                                "course": 63.13576655048831,
                                "imei": "866968031032486_aditi_tracking",
                                "decoder": "manual",
                                "time": 1692873080000,
                                "vehicleId": null,
                                "speed": 4,
                                "longitude": 72.7102517
                            }
                        },
                        "updates": {
                            "traceID": "vehiclegpsstatetopic_0_25228946",
                            "resourceId": "1e42066b-b02e-4409-8241-3e8ac86e3c4f",
                            "updatedBy": "SYSTEM",
                            "changes": null,
                            "sourceOfInformation": null,
                            "description": "From AT to COMPLETED",
                            "forwardReasons": [
                                "trippoint.current.location.updated",
                                "gps.state.updated"
                            ],
                            "userId": null,
                            "uuid": "d0ca17ad-8e88-4022-9b75-4e7c506fdda7",
                            "revision": 4,
                            "time": 1692873568733,
                            "forwardedFrom": null,
                            "resourceType": "TripPoint",
                            "updateType": null
                        },
                        "uuid": "1e42066b-b02e-4409-8241-3e8ac86e3c4f",
                        "sequenceId": null,
                        "isDisconnected": false,
                        "isOutOfTrack": false,
                        "routeDeviationMinimumDistanceConstraint": 5000,
                        "eta": null,
                        "routeId": null,
                        "expectedActivityStartTime": null,
                        "actualDeparture": 1692873080000,
                        "vehicleId": "ca8d00d1-00ff-42eb-bfb5-31026b307da1",
                        "place": null,
                        "remainingDistance": 0,
                        "actualActivityStartTime": 1692872720000,
                        "forShipmentStages": [
                            "1e42066b-b02e-4409-8241-3e8ac86e3c4f"
                        ],
                        "actualActivityEndTime": 1692873080000,
                        "actualArrival": 1692872720000,
                        "purposedDistance": null,
                        "plannedDeparture": null,
                        "currentLocation": {
                            "isFillingEnabled": false,
                            "address": "",
                            "lngLat": [
                                72.7102517,
                                21.1871583
                            ],
                            "odometer": null,
                            "latitude": 21.1871583,
                            "course": 63.13576655048831,
                            "imei": "866968031032486_aditi_tracking",
                            "decoder": "manual",
                            "time": 1692873080000,
                            "vehicleId": null,
                            "speed": 4,
                            "longitude": 72.7102517
                        },
                        "isAutoCompleted": true,
                        "coveredDistance": null,
                        "hub": {
                            "hubId": null,
                            "boundary": null,
                            "address": null,
                            "accessibility": "private",
                            "addedBy": "464d4e6a-4d62-429f-a660-86a48839c7af",
                            "center": {
                                "latitude": 21.1784184,
                                "longitude": 72.6587856
                            },
                            "suggestedRadius": 5000,
                            "isOwned": null,
                            "centerCoordinates": [
                                72.6587856,
                                21.1784184
                            ],
                            "placeId": "d7467aee-4f43-4e0c-9a6f-f2c4221ee76e",
                            "geoJsonBoundry": null,
                            "externalId": "IN240017",
                            "source": "GOOGLE",
                            "places": null,
                            "viewport": null,
                            "district": null,
                            "name": "Hazira",
                            "state": "Gujarat",
                            "category": "Hub",
                            "subDistrict": "West",
                            "controllingBranchId": null
                        },
                        "imei": "866968031032486_aditi_tracking",
                        "assosiatedShipmentsId": [
                            "5c008dcf-83bc-4437-ad13-9b9f53a0f536"
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
                    "gateInTime": 1692927903000,
                    "actualActivityStartTime": null,
                    "actualActivityEndTime": null,
                    "preActWtTime": null,
                    "uuid": "14c5a363-93f8-4d47-b898-69816a953b8e",
                    "consignmentDelivered": null,
                    "resourceDropOff": null,
                    "resourcePickup": null,
                    "eta": null,
                    "stageName": "JUBILANT INGREVIA LIMITED (UNIT-4)",
                    "hub": null,
                    "arrivalTime": 1692889025000,
                    "expectedActivityStartTime": null,
                    "secondaryStatus": "WaitingForLoading",
                    "consignmentPickUps": null,
                    "postActWtTime": null,
                    "tripPoint": {
                        "outOfTrackSince": null,
                        "creationTime": 1692873569230,
                        "purpose": "Delivery",
                        "plannedArrival": null,
                        "currentGpsState": {
                            "numberOfRecord": 525,
                            "totalTime": 68734000,
                            "averageSpeeds": 0.013502695793232196,
                            "eventType": "StateUpdated",
                            "uuid": "c3290a14-e06f-468c-b4c9-96b904002372",
                            "isDisconnected": false,
                            "startLocation": {
                                "isFillingEnabled": false,
                                "address": "Unnamed Road, Aragama, Gujarat 392012, India",
                                "lngLat": [
                                    72.8850378,
                                    21.7919217
                                ],
                                "odometer": null,
                                "latitude": 21.7919217,
                                "course": 0,
                                "imei": "866968031032486_aditi_tracking",
                                "decoder": "manual",
                                "time": 1692889413000,
                                "vehicleId": null,
                                "speed": 0,
                                "longitude": 72.8850378
                            },
                            "isNoGpsZone": false,
                            "mean": {
                                "isFillingEnabled": false,
                                "address": "",
                                "lngLat": [
                                    72.88502466000033,
                                    21.791460372380907
                                ],
                                "odometer": null,
                                "latitude": 21.791460372380907,
                                "course": null,
                                "imei": "",
                                "decoder": null,
                                "time": 1692923932524,
                                "vehicleId": "",
                                "speed": 0,
                                "longitude": 72.88502466000033
                            },
                            "imei": "866968031032486_aditi_tracking",
                            "startTime": 1692889413000,
                            "endTime": 1692958147000,
                            "vehicleId": null,
                            "state": "Stopped",
                            "totalDistance": 257.8039701811171,
                            "endLocation": {
                                "isFillingEnabled": false,
                                "address": "",
                                "lngLat": [
                                    72.8850717,
                                    21.791445
                                ],
                                "odometer": null,
                                "latitude": 21.791445,
                                "course": 0,
                                "imei": "866968031032486_aditi_tracking",
                                "decoder": "manual",
                                "time": 1692958147000,
                                "vehicleId": null,
                                "speed": 0,
                                "longitude": 72.8850717
                            }
                        },
                        "updates": {
                            "traceID": "vehiclegpsstatetopic_0_25354104",
                            "resourceId": "14c5a363-93f8-4d47-b898-69816a953b8e",
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
                            "uuid": "c54c05a0-bfd1-461f-92d5-509249fc104e",
                            "revision": 259,
                            "time": 1692958545201,
                            "forwardedFrom": null,
                            "resourceType": "TripPoint",
                            "updateType": null
                        },
                        "uuid": "14c5a363-93f8-4d47-b898-69816a953b8e",
                        "sequenceId": null,
                        "isDisconnected": false,
                        "isOutOfTrack": false,
                        "routeDeviationMinimumDistanceConstraint": 5000,
                        "eta": null,
                        "routeId": null,
                        "expectedActivityStartTime": null,
                        "actualDeparture": null,
                        "vehicleId": "866968031032486_aditi_tracking",
                        "place": {
                            "hubId": "23743d4d-a488-42c6-9bd0-b4548e0aa49c",
                            "boundary": null,
                            "address": "JUBILANT INGREVIA LIMITED (UNIT-4), , , Plot No.P1-L19, within Jubilant SEZ, Plot-5, Vilayat GIDC,Vagra, Bharuch, Gujarat - 392012, ",
                            "accessibility": null,
                            "addedBy": "464d4e6a-4d62-429f-a660-86a48839c7af",
                            "center": {
                                "latitude": 21.79152457,
                                "longitude": 72.88478782
                            },
                            "suggestedRadius": 1000,
                            "isOwned": null,
                            "centerCoordinates": [
                                72.88478782,
                                21.79152457
                            ],
                            "placeId": "8a5ccb28-b983-430a-ab8c-a96bfe535702",
                            "geoJsonBoundry": null,
                            "externalId": "COM000007",
                            "source": "FRETRON",
                            "places": null,
                            "viewport": null,
                            "district": "Bharuch",
                            "name": "Bharuch-JUBILANT INGREVIA LIMITED (UNIT-4)",
                            "state": "Gujarat",
                            "category": "Loading & Unloading",
                            "subDistrict": "West",
                            "controllingBranchId": null
                        },
                        "remainingDistance": 0,
                        "actualActivityStartTime": 1692889025000,
                        "forShipmentStages": [
                            "14c5a363-93f8-4d47-b898-69816a953b8e"
                        ],
                        "actualActivityEndTime": null,
                        "actualArrival": 1692889025000,
                        "purposedDistance": null,
                        "plannedDeparture": null,
                        "currentLocation": {
                            "isFillingEnabled": false,
                            "address": "",
                            "lngLat": [
                                72.8850717,
                                21.791445
                            ],
                            "odometer": null,
                            "latitude": 21.791445,
                            "course": 0,
                            "imei": "866968031032486_aditi_tracking",
                            "decoder": "manual",
                            "time": 1692958147000,
                            "vehicleId": null,
                            "speed": 0,
                            "longitude": 72.8850717
                        },
                        "isAutoCompleted": false,
                        "coveredDistance": 112963.13941483396,
                        "hub": {
                            "hubId": "23743d4d-a488-42c6-9bd0-b4548e0aa49c",
                            "boundary": null,
                            "address": "JUBILANT INGREVIA LIMITED (UNIT-4), , , Plot No.P1-L19, within Jubilant SEZ, Plot-5, Vilayat GIDC,Vagra, Bharuch, Gujarat - 392012, ",
                            "accessibility": null,
                            "addedBy": "464d4e6a-4d62-429f-a660-86a48839c7af",
                            "center": {
                                "latitude": 21.79152457,
                                "longitude": 72.88478782
                            },
                            "suggestedRadius": 1000,
                            "isOwned": null,
                            "centerCoordinates": [
                                72.88478782,
                                21.79152457
                            ],
                            "placeId": "8a5ccb28-b983-430a-ab8c-a96bfe535702",
                            "geoJsonBoundry": null,
                            "externalId": "COM000007",
                            "source": "FRETRON",
                            "places": null,
                            "viewport": null,
                            "district": "Bharuch",
                            "name": "West",
                            "state": "Gujarat",
                            "category": "Loading & Unloading",
                            "subDistrict": "West",
                            "controllingBranchId": null
                        },
                        "imei": "866968031032486_aditi_tracking",
                        "assosiatedShipmentsId": [
                            "5c008dcf-83bc-4437-ad13-9b9f53a0f536"
                        ],
                        "status": "AT"
                    },
                    "place": {
                        "hubId": "23743d4d-a488-42c6-9bd0-b4548e0aa49c",
                        "boundary": null,
                        "address": "JUBILANT INGREVIA LIMITED (UNIT-4), , , Plot No.P1-L19, within Jubilant SEZ, Plot-5, Vilayat GIDC,Vagra, Bharuch, Gujarat - 392012, ",
                        "accessibility": null,
                        "addedBy": "464d4e6a-4d62-429f-a660-86a48839c7af",
                        "center": {
                            "latitude": 21.79152457,
                            "longitude": 72.88478782
                        },
                        "suggestedRadius": 1000,
                        "isOwned": null,
                        "centerCoordinates": [
                            72.88478782,
                            21.79152457
                        ],
                        "placeId": "8a5ccb28-b983-430a-ab8c-a96bfe535702",
                        "geoJsonBoundry": null,
                        "externalId": "COM000007",
                        "source": "FRETRON",
                        "places": null,
                        "viewport": null,
                        "district": "Bharuch",
                        "name": "Bharuch-JUBILANT INGREVIA LIMITED (UNIT-4)",
                        "state": "Gujarat",
                        "category": "Loading & Unloading",
                        "subDistrict": "West",
                        "controllingBranchId": null
                    },
                    "controllingBranchId": null,
                    "gateOutTime": null,
                    "status": "AT"
                }
            ],
            "remarks": null,
            "syncUpExpiryTime": null,
            "shipmentStatus": "Planned"
        }
    }
}
let sh = $event.body.actionData
return await main(sh)