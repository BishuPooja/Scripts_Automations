const moment = require("moment")
const rp = require("request-promise")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"
const _ = require("lodash")
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTQ3NTgwMDYsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiI0OTViODcyOC1jNzYxLTRmYTctODNmZS1kYjc1YTdkNjMyMjEiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.7POh4DKBx-FmOlS_6yckKcCU1mHRdHF-11koC01QRYg"
const removeCfsKey = ["Physical Bill Satus For Logistics Received At", "Physical Bill Satus For Account Unit Received At", "Physical Bill Status Received At"]
const updateCfsKey = ["Physical Bill Satus For Logistics", "Physical Bill Satus For Account Unit"]
const bill = {
    "approvalDate": null,
    "documents": null,
    "customFields": [
      {
        "indexedValue": [
          "Physical Bill Satus For Logistics_Recieved"
        ],
        "fieldKey": "Physical Bill Satus For Logistics",
        "multiple": false,
        "description": "",
        "remark": "",
        "uuid": "3bd31695-f9fe-47cf-a8e1-5b8c45c04fe9",
        "required": false,
        "accessType": null,
        "input": "",
        "unit": "",
        "valueType": "string",
        "options": [
          "Recieved",
          "Pending"
        ],
        "fieldType": "radio-button",
        "value": "Recieved",
        "isRemark": false
      },
      {
        "indexedValue": [
          "Physical Bill Satus For Account Unit_Recieved"
        ],
        "fieldKey": "Physical Bill Satus For Account Unit",
        "multiple": false,
        "description": "",
        "remark": "",
        "uuid": "199cf71a-3543-4e3c-bbe3-64db416b3d5f",
        "required": false,
        "accessType": null,
        "input": "",
        "unit": "",
        "valueType": "string",
        "options": [
          "Recieved",
          "Pending"
        ],
        "fieldType": "radio-button",
        "value": "Recieved",
        "isRemark": false
      },
      {
        "indexedValue": [
          "Reject Reason_jjl"
        ],
        "fieldKey": "Reject Reason",
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
        "value": "jjl",
        "isRemark": false
      },
      {
        "indexedValue": [
          "Physical Bill Status Recieved At_1695035722834"
        ],
        "fieldKey": "Physical Bill Status Recieved At",
        "multiple": false,
        "description": "",
        "remark": "",
        "uuid": null,
        "required": false,
        "accessType": null,
        "input": "date",
        "unit": "",
        "valueType": "string",
        "options": [],
        "fieldType": "dateTime",
        "value": "1695035722834",
        "isRemark": false
      },
      {
        "indexedValue": [
          "Physical Bill Satus For Logistics Received At_1695036840349"
        ],
        "fieldKey": "Physical Bill Satus For Logistics Received At",
        "multiple": false,
        "description": "",
        "remark": "",
        "uuid": null,
        "required": false,
        "accessType": null,
        "input": "date",
        "unit": "",
        "valueType": "string",
        "options": [],
        "fieldType": "dateTime",
        "value": "1695036840349",
        "isRemark": false
      },
      {
        "indexedValue": [
          "Physical Bill Satus For Account Unit Received At_1695036841639"
        ],
        "fieldKey": "Physical Bill Satus For Account Unit Received At",
        "multiple": false,
        "description": "",
        "remark": "",
        "uuid": null,
        "required": false,
        "accessType": null,
        "input": "date",
        "unit": "",
        "valueType": "string",
        "options": [],
        "fieldType": "dateTime",
        "value": "1695036841639",
        "isRemark": false
      }
    ],
    "physicalBillStatus": "RECIEVED",
    "totalAdvancePaid": null,
    "billFeedingType": "PerConsignment",
    "updates": {
      "traceID": "a39a2ff3-bf1f-4141-b2dd-2ad2243c0e72",
      "resourceId": "1d423108-a984-4d1c-b1ac-9f348fba5b15",
      "updatedBy": "USER",
      "changes": null,
      "sourceOfInformation": null,
      "description": "Added Physical Bill Satus For Account Unit Received At : 18/09/2023 05:04:01",
      "forwardReasons": [
        "vendor.bill.cfs.updated.event"
      ],
      "userId": "botuser--38c44684-b107-42df-bca3-9569fbe2e072",
      "uuid": "a3b95b1e-6925-4702-a974-bd0b7306f2b9",
      "revision": 41,
      "time": 1695036841710,
      "forwardedFrom": "Physical Bill Satus For Account Unit Received At",
      "resourceType": "Vendor Bill",
      "updateType": null
    },
    "uuid": "1d423108-a984-4d1c-b1ac-9f348fba5b15",
    "orgId": "495b8728-c761-4fa7-83fe-db75a7d63221",
    "lineItems": [
      {
        "costs": [
          {
            "amount": 14400,
            "charge": {
              "amount": 14400,
              "amountByVendor": null,
              "rate": 1200,
              "billingType": [
                "VendorBill",
                "Invoice",
                "DebitNote",
                "CreditNote"
              ],
              "chartsOfAccount": {
                "name": "Cost of Goods Sold",
                "accountGroup": "Expense",
                "type": "Cost Of Goods Sold",
                "accountPath": [
                  "Expense",
                  "Cost Of Goods Sold",
                  "costofgoodssold"
                ],
                "uuid": "costofgoodssold"
              },
              "name": "Freight",
              "rateUnit": "perMT",
              "uuid": "783a82be-0f44-40f2-8549-ac5e7e582318_495b8728-c761-4fa7-83fe-db75a7d63221",
              "base": 12,
              "applicableFor": null
            },
            "billItemId": null,
            "billFeedingType": null,
            "updates": {
              "traceID": "3afc31c1-5e77-41ed-afd2-ae1b6133c6e3",
              "resourceId": "22ca44e9-f002-44dd-8735-1be3a3a52e07",
              "updatedBy": "USER",
              "changes": [],
              "sourceOfInformation": null,
              "description": "Added Charge Freight With Amount 14400.0",
              "forwardReasons": [],
              "userId": "1d9a79bc-9747-435e-a265-b0552a880d2d",
              "uuid": "5b6ecc33-2c16-4084-8351-f2a50a02e77f",
              "revision": 0,
              "time": 1692116544457,
              "forwardedFrom": null,
              "resourceType": "ShipmentCost",
              "updateType": null
            },
            "uuid": "cf8d7948-c095-45c4-8085-ccdd97969941",
            "orgId": "495b8728-c761-4fa7-83fe-db75a7d63221",
            "lineItems": [
              {
                "amount": 14400,
                "charge": {
                  "amount": 7200,
                  "amountByVendor": null,
                  "rate": null,
                  "billingType": [],
                  "chartsOfAccount": null,
                  "name": "Freight",
                  "rateUnit": "perMT",
                  "uuid": "783a82be-0f44-40f2-8549-ac5e7e582318_495b8728-c761-4fa7-83fe-db75a7d63221",
                  "base": null,
                  "applicableFor": null
                },
                "billId": null,
                "billItemId": null,
                "consignmentId": "69d69293-81dc-46a2-8ac6-f9b666e9ded5",
                "billStatus": null
              }
            ],
            "distributionBasis": "Weight",
            "shipmentId": "22ca44e9-f002-44dd-8735-1be3a3a52e07",
            "vendor": {
              "gstn": "123456789009876",
              "name": "karan mishra ",
              "externalId": null,
              "type": "vendor",
              "uuid": "928a78b7-6063-4b2f-81fe-2dd315540247",
              "group": {
                "name": "lorryOwner",
                "partnerType": null,
                "uuid": null,
                "orgId": null
              }
            },
            "billId": null,
            "billStatus": null,
            "applicability": "Shipment"
          },
          {
            "amount": 1000,
            "charge": {
              "amount": 1000,
              "amountByVendor": null,
              "rate": null,
              "billingType": [
                "VendorBill",
                "Invoice",
                "DebitNote",
                "CreditNote"
              ],
              "chartsOfAccount": {
                "name": "Cost of Goods Sold",
                "accountGroup": "Expense",
                "type": "Cost Of Goods Sold",
                "accountPath": [
                  "Expense",
                  "Cost Of Goods Sold",
                  "costofgoodssold"
                ],
                "uuid": "costofgoodssold"
              },
              "name": "Engine failure",
              "rateUnit": "Fixed",
              "uuid": "b5f2d382-c593-4a6a-86d1-4f9f226bc3ac",
              "base": null,
              "applicableFor": null
            },
            "billItemId": null,
            "billFeedingType": null,
            "updates": {
              "traceID": "7f5769d9-0003-4f11-a3f3-cb95af1fc22b",
              "resourceId": "22ca44e9-f002-44dd-8735-1be3a3a52e07",
              "updatedBy": "USER",
              "changes": [],
              "sourceOfInformation": null,
              "description": "Added Charge Engine failure With Amount 1000.0",
              "forwardReasons": [],
              "userId": "1d9a79bc-9747-435e-a265-b0552a880d2d",
              "uuid": "eb8ccfd8-c872-46ed-b9f8-2de52addafd7",
              "revision": 0,
              "time": 1692116556259,
              "forwardedFrom": null,
              "resourceType": "ShipmentCost",
              "updateType": null
            },
            "uuid": "670675d3-c172-4173-9c3e-939c1f300e3d",
            "orgId": "495b8728-c761-4fa7-83fe-db75a7d63221",
            "lineItems": [
              {
                "amount": 1000,
                "charge": {
                  "amount": 500,
                  "amountByVendor": null,
                  "rate": null,
                  "billingType": [],
                  "chartsOfAccount": null,
                  "name": "Engine failure",
                  "rateUnit": "Fixed",
                  "uuid": "b5f2d382-c593-4a6a-86d1-4f9f226bc3ac",
                  "base": null,
                  "applicableFor": null
                },
                "billId": null,
                "billItemId": null,
                "consignmentId": "69d69293-81dc-46a2-8ac6-f9b666e9ded5",
                "billStatus": null
              }
            ],
            "distributionBasis": "Weight",
            "shipmentId": "22ca44e9-f002-44dd-8735-1be3a3a52e07",
            "vendor": {
              "gstn": "123456789009876",
              "name": "karan mishra ",
              "externalId": null,
              "type": "vendor",
              "uuid": "928a78b7-6063-4b2f-81fe-2dd315540247",
              "group": {
                "name": "lorryOwner",
                "partnerType": null,
                "uuid": null,
                "orgId": null
              }
            },
            "billId": null,
            "billStatus": null,
            "applicability": "Shipment"
          }
        ],
        "cfs": [],
        "amount": 7700,
        "gstInfo": [
          {
            "isExempted": false,
            "amount": 462,
            "type": "SGST",
            "percent": 6,
            "payableAmount": 462,
            "isPayable": true
          },
          {
            "isExempted": false,
            "amount": 462,
            "type": "CGST",
            "percent": 6,
            "payableAmount": 462,
            "isPayable": true
          }
        ],
        "amountByVendor": 3624,
        "entityCfs": null,
        "entityInfo": {
          "resourceId": "69d69293-81dc-46a2-8ac6-f9b666e9ded5",
          "resourceIdentifier": "1010101010000001076",
          "resourceExternalId": null,
          "resourceType": null
        },
        "shDetail": {
          "creationTime": null,
          "customFields": [
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
          "transportationMode": null,
          "freightUnitLineItemId": null,
          "lastSyncUpTime": null,
          "updates": null,
          "isActive": false,
          "uuid": "22ca44e9-f002-44dd-8735-1be3a3a52e07",
          "issues": null,
          "branch": null,
          "orgId": null,
          "shipmentType": null,
          "completionTime": null,
          "routeId": null,
          "shipmentTrackingStatus": "At Delivery Point",
          "lastForwardTime": null,
          "runningStatus": null,
          "delayTrackingStatus": null,
          "delayReasonLastUpdateTime": null,
          "links": null,
          "shipmentDate": 1692116373813,
          "delayReason": null,
          "shipmentNumber": "FRETAB000000088",
          "originalEdd": null,
          "edd": 1692116373813,
          "delayReasonUpdateExpiryTime": null,
          "externalShipmentId": null,
          "fleetInfo": {
            "isTrackingEnable": null,
            "forwardingAgent": null,
            "verificationStatus": null,
            "trackingMode": null,
            "broker": null,
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
                "bodyType": "Open",
                "passingCapacityMT": 24,
                "minLength": 0,
                "updates": {
                  "traceID": null,
                  "resourceId": "1cafbff6-ec78-49d2-9630-0d7ee4dd2611",
                  "updatedBy": "USER",
                  "changes": null,
                  "sourceOfInformation": null,
                  "description": "Created Load Type.",
                  "forwardReasons": [
                    "load.type.created.event"
                  ],
                  "userId": "ebe5751a-a05b-46b6-91b4-1c112a90f638",
                  "uuid": "930c308c-e7db-4296-9317-40993aba79b9",
                  "revision": null,
                  "time": 1641960780578,
                  "forwardedFrom": null,
                  "resourceType": "LoadTypes",
                  "updateType": null
                },
                "vehicleCategories": [],
                "uuid": "1cafbff6-ec78-49d2-9630-0d7ee4dd2611",
                "orgId": "495b8728-c761-4fa7-83fe-db75a7d63221",
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
                "name": "Truck-24MT",
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
              "vehicleType": null,
              "groups": null,
              "externalId": null,
              "updateTime": null,
              "sharedWith": null,
              "baseLocationId": null,
              "vehicleMake": null,
              "vehicleRegistrationNumber": "UN765876",
              "chassisNumber": null,
              "driverId": null,
              "createTime": null,
              "loadCapacity": null,
              "truckLength": null,
              "category": null,
              "groupsExtended": null
            },
            "driver": null,
            "fleetType": null,
            "fleetOwner": null,
            "trainInfo": null,
            "lbsNumber": null,
            "secondaryDriver": null,
            "device": null,
            "status": null
          },
          "syncUpDueTime": null,
          "billingStatus": null,
          "currentLocation": null,
          "alerts": null,
          "equipments": null,
          "tripType": null,
          "lastDelayCalculationTime": null,
          "delayReasonUpdateDueTime": null,
          "locationTrackingStatus": null,
          "poLineItemId": null,
          "consignments": [
            {
              "salesOrderId": null,
              "fuLineItemIds": null,
              "pod": null,
              "customFields": null,
              "loadInfo": null,
              "customerPsnNo": null,
              "invoiceValue": null,
              "updates": null,
              "uuid": "76ed308c-c206-490f-a775-4ced15f95814",
              "orgId": null,
              "consigner": null,
              "lineItems": null,
              "pssNo": null,
              "eWayBillNumber": null,
              "billingType": null,
              "podDocument": null,
              "invoiceNo": null,
              "deliveryDate": null,
              "associatedShipments": null,
              "originalEdd": null,
              "consignee": null,
              "address": null,
              "edd": null,
              "salesOffice": null,
              "consignmentDate": null,
              "externalId": null,
              "eWayBillExpiryDate": null,
              "activeShipment": null,
              "consignmentNo": null,
              "currentLocation": null,
              "billToParty": null,
              "equipments": null,
              "orderMappings": null,
              "contractId": null,
              "workOrderNumber": null,
              "trackingStatus": null,
              "eWayBillRegistrationDate": null,
              "contractToParty": null,
              "invoiceStatus": null,
              "poNumber": null,
              "status": null
            },
            {
              "salesOrderId": null,
              "fuLineItemIds": null,
              "pod": null,
              "customFields": null,
              "loadInfo": null,
              "customerPsnNo": null,
              "invoiceValue": null,
              "updates": null,
              "uuid": "69d69293-81dc-46a2-8ac6-f9b666e9ded5",
              "orgId": null,
              "consigner": null,
              "lineItems": null,
              "pssNo": null,
              "eWayBillNumber": null,
              "billingType": null,
              "podDocument": null,
              "invoiceNo": null,
              "deliveryDate": null,
              "associatedShipments": null,
              "originalEdd": null,
              "consignee": null,
              "address": null,
              "edd": null,
              "salesOffice": null,
              "consignmentDate": null,
              "externalId": null,
              "eWayBillExpiryDate": null,
              "activeShipment": null,
              "consignmentNo": null,
              "currentLocation": null,
              "billToParty": null,
              "equipments": null,
              "orderMappings": null,
              "contractId": null,
              "workOrderNumber": null,
              "trackingStatus": null,
              "eWayBillRegistrationDate": null,
              "contractToParty": null,
              "invoiceStatus": null,
              "poNumber": null,
              "status": null
            }
          ],
          "customContacts": null,
          "shipmentStages": [
            {
              "departureTime": 1692116557000,
              "gateInTime": null,
              "actualActivityStartTime": null,
              "actualActivityEndTime": null,
              "uuid": null,
              "consignmentDelivered": null,
              "resourceDropOff": null,
              "resourcePickup": null,
              "eta": null,
              "stageName": null,
              "hub": {
                "hubId": null,
                "boundary": null,
                "address": null,
                "accessibility": null,
                "addedBy": null,
                "center": null,
                "suggestedRadius": 0,
                "isOwned": null,
                "centerCoordinates": null,
                "placeId": null,
                "geoJsonBoundry": null,
                "externalId": null,
                "source": null,
                "places": null,
                "viewport": null,
                "district": null,
                "name": "Banswadi",
                "state": null,
                "category": null,
                "subDistrict": null,
                "controllingBranchId": null
              },
              "arrivalTime": 1692116399000,
              "expectedActivityStartTime": null,
              "secondaryStatus": null,
              "consignmentPickUps": [
                "76ed308c-c206-490f-a775-4ced15f95814",
                "69d69293-81dc-46a2-8ac6-f9b666e9ded5"
              ],
              "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": null,
                "purpose": "Pickup",
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
                "status": null
              },
              "place": null,
              "controllingBranchId": null,
              "gateOutTime": null,
              "status": "COMPLETED"
            },
            {
              "departureTime": null,
              "gateInTime": 1692948163435,
              "actualActivityStartTime": null,
              "actualActivityEndTime": null,
              "uuid": null,
              "consignmentDelivered": [
                "76ed308c-c206-490f-a775-4ced15f95814",
                "69d69293-81dc-46a2-8ac6-f9b666e9ded5"
              ],
              "resourceDropOff": null,
              "resourcePickup": null,
              "eta": 1692116373813,
              "stageName": null,
              "hub": {
                "hubId": null,
                "boundary": null,
                "address": null,
                "accessibility": null,
                "addedBy": null,
                "center": null,
                "suggestedRadius": 0,
                "isOwned": null,
                "centerCoordinates": null,
                "placeId": null,
                "geoJsonBoundry": null,
                "externalId": null,
                "source": null,
                "places": null,
                "viewport": null,
                "district": null,
                "name": "K R Puram",
                "state": null,
                "category": null,
                "subDistrict": null,
                "controllingBranchId": null
              },
              "arrivalTime": 1692116562000,
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
                "status": null
              },
              "place": null,
              "controllingBranchId": null,
              "gateOutTime": null,
              "status": "AT"
            }
          ],
          "remarks": null,
          "syncUpExpiryTime": null,
          "shipmentStatus": "Created"
        },
        "uuid": "635863f3-64f8-4dfa-9b99-988b487bfd9b",
        "remarks": null,
        "externalRemarks": null,
        "cnDetails": [
          {
            "salesOrderId": null,
            "fuLineItemIds": null,
            "pod": {
              "receivedBy": null,
              "unloadingFinishDate": 1692116689000,
              "documents": [
                {
                  "resourceId": "5d1083ba-8b31-4d97-8427-207cc1131d58",
                  "customFields": null,
                  "downloadUrl": "https://storage.googleapis.com/fretron-document-bucket/uploads/c24f7c91-30ba-4533-b86d-9eca644e6605/295ecfab-cce5-4aeb-a6a6-1cc9098442e2@AM.png?GoogleAccessId=cloud-storage-service@fretron-206223.iam.gserviceaccount.com&Expires=2556948126&Signature=pmlTRZ%2FPZlQ0cUO3YZlwcHxA7u%2Fr3xwQURBm6rucf618QxtoJ50STkJrl7KIDESTOOhAbpKnveUPuLJhHCCe6CtoBQmBxfGAlKPqX3QYtXtNDh7qjhJgGgIVfKN80uwnmKlwnzzVpL%2BUmu5naMDRTipG1mCFkaj5iV0yPh7f2IQil%2F%2B5RiT%2BAkunuDteQX2Y9TbzloL4h5Il7iPLYKhPup3%2Bpl3nhEuAM7cKVcT0KpxCZJD146x%2F3fz4YbruJBZciFhJ%2B8PmoGnqbZ58PiyzX3QNIh3Uu8lnbG0KcpMWikKnyNeD4T9%2BUnRifE7n7%2FXRcCMiljMaCeMCsckFNo86MA%3D%3D",
                  "updates": {
                    "traceID": "bbae2bd4-641d-42f8-9162-8b2f64c2267d",
                    "resourceId": "295ecfab-cce5-4aeb-a6a6-1cc9098442e2",
                    "updatedBy": "USER",
                    "changes": null,
                    "sourceOfInformation": "created",
                    "description": "document created",
                    "forwardReasons": [
                      "document.added"
                    ],
                    "userId": "a42e539c-88f3-42cf-a1e7-d13e0b60833d",
                    "uuid": "ad77c79c-7be1-4d06-972c-d98275e5d6e7",
                    "revision": null,
                    "time": 1692948126728,
                    "forwardedFrom": null,
                    "resourceType": "Document",
                    "updateType": null
                  },
                  "uuid": "295ecfab-cce5-4aeb-a6a6-1cc9098442e2",
                  "orgId": "c24f7c91-30ba-4533-b86d-9eca644e6605",
                  "docPath": "/uploads/c24f7c91-30ba-4533-b86d-9eca644e6605/295ecfab-cce5-4aeb-a6a6-1cc9098442e2@AM.png",
                  "createdAt": 1692948126728,
                  "isExpirable": false,
                  "previewString": null,
                  "createdBy": "a42e539c-88f3-42cf-a1e7-d13e0b60833d",
                  "name": "Front_Screenshot 2023-06-13 at 9.36.35 AM.png",
                  "expireDate": null,
                  "resourceType": "SHIPMENT_POD"
                }
              ],
              "trackingDetail": null,
              "consignmentId": "69d69293-81dc-46a2-8ac6-f9b666e9ded5",
              "receiveDate": null,
              "externalId": null,
              "submissionDate": 1692874020839,
              "expectedSubmissionDate": null,
              "feedingStatus": "IN_PROGRESS",
              "updates": null,
              "type": "POD",
              "issues": [
                ""
              ],
              "uuid": "5d1083ba-8b31-4d97-8427-207cc1131d58",
              "customField": [
                {
                  "indexedValue": [],
                  "fieldKey": "UnloadingCharge",
                  "valueType": "string",
                  "fieldType": "string",
                  "value": "test",
                  "definitionId": null
                }
              ],
              "deliveryItems": null,
              "unloadingStartDate": 1692116569000,
              "vehicleReleaseDate": 1692874198000,
              "shipmentId": null,
              "reportingDate": 1692116562000,
              "submissionPlace": null,
              "remarks": "",
              "status": "SUBMITTED"
            },
            "customFields": [
              {
                "indexedValue": [
                  "TEST_1999_2342342342342342343243242343246832476r3248932849327483294772384723432784923746832479384902372374uyf234yy23t47632867tx234x6329462342387423"
                ],
                "fieldKey": "TEST_1999",
                "multiple": false,
                "description": "",
                "remark": "",
                "uuid": "a2d9a4fe-8abc-4020-9ee3-4d849a183d03",
                "required": true,
                "accessType": "mandatory_on_create",
                "input": "string",
                "unit": "",
                "valueType": "string",
                "options": [],
                "fieldType": "text",
                "value": "2342342342342342343243242343246832476r3248932849327483294772384723432784923746832479384902372374uyf234yy23t47632867tx234x6329462342387423",
                "isRemark": false
              },
              {
                "indexedValue": [
                  "GPS Location_234234"
                ],
                "fieldKey": "GPS Location",
                "multiple": false,
                "description": "",
                "remark": "",
                "uuid": "16ca165e-843c-4450-8a15-f0c703719915",
                "required": true,
                "accessType": "mandatory_on_create",
                "input": "string",
                "unit": "",
                "valueType": "string",
                "options": [],
                "fieldType": "text",
                "value": "234234",
                "isRemark": false
              },
              {
                "indexedValue": [
                  "DriverVerificationStatus_UNVERIFIED"
                ],
                "fieldKey": "DriverVerificationStatus",
                "multiple": false,
                "description": "Driver Verification Status",
                "remark": null,
                "uuid": null,
                "required": false,
                "accessType": null,
                "input": null,
                "unit": null,
                "valueType": "string",
                "options": [
                  "VERIFIED",
                  "UNVERIFIED"
                ],
                "fieldType": "select",
                "value": "UNVERIFIED",
                "isRemark": false
              }
            ],
            "loadInfo": {
              "material": "",
              "valueOfGoods": -25,
              "standardMeasurement": {
                "volume": null,
                "packageMeasurement": null,
                "weight": null,
                "containers": null,
                "trucks": null
              },
              "currency": null,
              "measurements": [
                {
                  "actualDeliveredQuantity": null,
                  "density": null,
                  "netQuantity": null,
                  "moisture": null,
                  "claimQuantity": null,
                  "unitOfMeasurment": null,
                  "standardQuantity": null,
                  "actualLoadedQuantity": null,
                  "measurmentType": "Weight",
                  "grossQuantity": null,
                  "shortage": null,
                  "temperature": null,
                  "plannedLoadQuantity": null,
                  "frieghtDeductableQuantity": null
                }
              ]
            },
            "customerPsnNo": null,
            "invoiceValue": null,
            "updates": null,
            "uuid": "69d69293-81dc-46a2-8ac6-f9b666e9ded5",
            "orgId": null,
            "consigner": {
              "geoFence": null,
              "documents": null,
              "customFields": null,
              "isPortalEnabled": false,
              "type": null,
              "updates": null,
              "uuid": null,
              "orgId": null,
              "firmType": null,
              "gstn": null,
              "voterId": null,
              "verificationTicketId": null,
              "companyCodes": null,
              "group": null,
              "address": null,
              "verificationStatus": null,
              "externalId": null,
              "panNumber": null,
              "aadharNo": null,
              "parentId": null,
              "places": null,
              "route": null,
              "name": "Haldia Fac",
              "location": null,
              "fretronId": null,
              "contacts": null,
              "status": null
            },
            "lineItems": null,
            "pssNo": null,
            "eWayBillNumber": null,
            "billingType": null,
            "podDocument": null,
            "invoiceNo": null,
            "deliveryDate": null,
            "associatedShipments": [
              "22ca44e9-f002-44dd-8735-1be3a3a52e07"
            ],
            "originalEdd": null,
            "consignee": {
              "geoFence": null,
              "documents": null,
              "customFields": null,
              "isPortalEnabled": false,
              "type": null,
              "updates": null,
              "uuid": null,
              "orgId": null,
              "firmType": null,
              "gstn": null,
              "voterId": null,
              "verificationTicketId": null,
              "companyCodes": null,
              "group": null,
              "address": null,
              "verificationStatus": null,
              "externalId": null,
              "panNumber": null,
              "aadharNo": null,
              "parentId": null,
              "places": null,
              "route": null,
              "name": "Exide",
              "location": null,
              "fretronId": null,
              "contacts": null,
              "status": null
            },
            "address": null,
            "edd": null,
            "salesOffice": null,
            "consignmentDate": 1693474627000,
            "externalId": null,
            "eWayBillExpiryDate": null,
            "activeShipment": "22ca44e9-f002-44dd-8735-1be3a3a52e07",
            "consignmentNo": "1010101010000001076",
            "currentLocation": null,
            "billToParty": null,
            "equipments": null,
            "orderMappings": null,
            "contractId": null,
            "workOrderNumber": null,
            "trackingStatus": "In Transit to K R Puram",
            "eWayBillRegistrationDate": null,
            "contractToParty": {
              "geoFence": null,
              "documents": null,
              "customFields": null,
              "isPortalEnabled": false,
              "type": null,
              "updates": null,
              "uuid": null,
              "orgId": null,
              "firmType": null,
              "gstn": null,
              "voterId": null,
              "verificationTicketId": null,
              "companyCodes": null,
              "group": null,
              "address": null,
              "verificationStatus": null,
              "externalId": null,
              "panNumber": null,
              "aadharNo": null,
              "parentId": null,
              "places": null,
              "route": null,
              "name": "Haldia Fac",
              "location": null,
              "fretronId": null,
              "contacts": null,
              "status": null
            },
            "invoiceStatus": null,
            "poNumber": null,
            "status": "In Transit"
          }
        ]
      }
    ],
    "accountStatus": "OPEN",
    "isOverDue": null,
    "vendor": {
      "gstn": "123456789009876",
      "name": "karan mishra ",
      "externalId": null,
      "type": "vendor",
      "uuid": "928a78b7-6063-4b2f-81fe-2dd315540247",
      "group": {
        "name": "lorryOwner",
        "partnerType": "vendor",
        "uuid": "1ed416bf-7c60-43e9-89d2-5570e941de4d",
        "orgId": "495b8728-c761-4fa7-83fe-db75a7d63221"
      }
    },
    "overDueAt": null,
    "onHoldReason": null,
    "amount": 7700,
    "amountByVendor": 3624,
    "totalPaid": null,
    "billDate": 1694683991770,
    "tax": null,
    "currentAssignee": {
      "address": null,
      "profileThumbnailString": null,
      "mobileNumber": "7082015582",
      "authToken": null,
      "updates": null,
      "uuid": "f134ad32-7cca-4741-a306-c4127acc23aa",
      "mergedUserIds": null,
      "isGod": null,
      "profileDocumentId": null,
      "otpEnabled": null,
      "onBoardingType": null,
      "alternateEmails": null,
      "name": "SAURAV GUPTA (KEY ACCOUNT OFFICER-LUDHIANA)",
      "tokens": null,
      "alternateMobileNumbers": null,
      "email": "saurav.gupta@m.darcl.com"
    },
    "billingStatus": "APPROVAL_PENDING",
    "chargeMechanism": "RCM",
    "gstInfo": [
      {
        "isExempted": false,
        "amount": 462,
        "type": "SGST",
        "percent": null,
        "payableAmount": 462,
        "isPayable": true
      },
      {
        "isExempted": false,
        "amount": 462,
        "type": "CGST",
        "percent": null,
        "payableAmount": 462,
        "isPayable": true
      }
    ],
    "billCreationTime": 1694683991770,
    "totalPayable": 8624,
    "billingBranch": null,
    "billNumber": "FRETVB0000015",
    "ticketId": "7a103634-e411-4268-b691-123283425f38",
    "status": "PENDING"
  }

async function updateBill(payload) {
    try {
        let url = `${FRT_PUB_BASE_URL}/shipment-cost/v1/vendor/bill`
        let res = await rp({
            uri: url,
            method: "PUT",
            json: true,
            body: payload,
            headers: {
                authorization: TOKEN
            }
        })
        if (res?.status != 200) {
            console.log(`Bill Updation Error ${res.error}`)
        } else {
            console.log(`Bill ${payload?.billNumber} Updated Successfully BillUpdated Status: ${res?.status} `)
        }
    } catch (e) {
        console.log(`Caught Error while updating Bill ${e.message}`)
    }
}
async function main(bill) {
    try {
        let billNo = bill?.billNumber
        console.log(`BillNumber ${billNo}`)
        let cfs = bill?.customFields
        let updatedCfs = []
        bill.physicalBillStatus = "PENDING"
        for (cf of cfs) {
            if (!removeCfsKey.find((it) => it == cf.fieldKey) && !updateCfsKey.find((it) => it == cf.fieldKey)) {
                updatedCfs.push(cf)
            }
            if (updateCfsKey.find((it) => it == cf.fieldKey)) {
                cf.value = "Recieved"
                updatedCfs.push(cf)
            }
        }
        bill.customFields = updatedCfs
        console.log(JSON.stringify(bill.customFields))
        await updateBill(bill)
    } catch (e) {
        console.log(`Catched Error in Main ${e.message}`)
    }
}
main(bill)
