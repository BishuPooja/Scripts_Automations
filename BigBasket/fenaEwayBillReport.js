const rp = require("request-promise")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"
const moment = require("moment")
const _ = require("lodash")
const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODUxMDQ1NjIsInVzZXJJZCI6ImJvdHVzZXItLTIwYzEwNzBiLWMwNzQtNDcxYS05NzA4LWU1MmZhZmEwNTdhZCIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTIwYzEwNzBiLWMwNzQtNDcxYS05NzA4LWU1MmZhZmEwNTdhZCIsIm9yZ0lkIjoiM2U0Y2RlZTktMGIzYi00NmRkLTliOTgtZGYwZTM4YTAyNzFjIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.Y3Lg4tmDXELG920JoEvAwUQQNva9H2fPvPbw5iXvfYY"
const $event = {
    "uuid": "9ff9892d-1308-4a93-92d5-4988d7a80260",
    "consignments": [
        {
            "uuid": "5bb9fe9e-c578-4744-b26e-ea6893402bb4",
            "associatedShipments": [
                "9ff9892d-1308-4a93-92d5-4988d7a80260"
            ],
            "activeShipment": null,
            "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
            "status": "Delivered",
            "consigner": {
                "uuid": "4673dd81-48bb-4425-9d42-e3ccf29f8c26",
                "name": "FENA (P) LIMITED",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                "fretronId": null,
                "geoFence": null,
                "places": [
                    {
                        "name": "OKHLA",
                        "address": null,
                        "category": "Hub",
                        "center": {
                            "latitude": 28.5625518,
                            "longitude": 77.2913729
                        },
                        "centerCoordinates": [
                            77.2913729,
                            28.5625518
                        ],
                        "suggestedRadius": 5000,
                        "viewport": null,
                        "source": "GOOGLE",
                        "addedBy": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                        "placeId": "8abcd0ee-6ed6-48af-ac1c-fc24627e0fb2",
                        "externalId": null,
                        "hubId": null,
                        "state": "DELHI",
                        "district": "NEW DELHI",
                        "subDistrict": null,
                        "boundary": null,
                        "places": null,
                        "accessibility": "private",
                        "isOwned": null,
                        "geoJsonBoundry": null,
                        "controllingBranchId": null
                    }
                ],
                "contacts": [
                    {
                        "name": "--",
                        "mobileNumber": null,
                        "address": null,
                        "emails": [
                            "okhlaunit@fena.com"
                        ],
                        "mobileNumbers": [
                            "910000000000"
                        ],
                        "type": null
                    }
                ],
                "location": null,
                "type": "customer",
                "isPortalEnabled": false,
                "address": "{\"pincode\":110020,\"address\":\"146-148 & 166,167,DSIDC INDL.\",\"city\":\"OKHLA\",\"state\":\"NEW DELHI\"}",
                "externalId": "THAR",
                "updates": null,
                "status": "ACTIVE",
                "panNumber": null,
                "group": {
                    "partnerType": null,
                    "name": "Sold-to-party",
                    "uuid": null,
                    "orgId": null
                },
                "route": null,
                "customFields": null,
                "parentId": null,
                "gstn": "07AAACS0326G2ZS",
                "aadharNo": null,
                "voterId": null,
                "documents": [],
                "verificationStatus": "unverified",
                "firmType": "INDIVISUAL",
                "verificationTicketId": null
            },
            "consignee": {
                "uuid": "30645bca-f19b-41cc-88f3-ac33e235bbcd",
                "name": "KAPOOR CHAND RATTI RAM",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                "fretronId": null,
                "geoFence": null,
                "places": [
                    {
                        "name": "GOVINDPURI EXTN.",
                        "address": null,
                        "category": "Hub",
                        "center": {
                            "latitude": 28.5354803,
                            "longitude": 77.2576512
                        },
                        "centerCoordinates": [
                            77.2576512,
                            28.5354803
                        ],
                        "suggestedRadius": 5000,
                        "viewport": null,
                        "source": "GOOGLE",
                        "addedBy": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                        "placeId": "8347f542-a592-45a0-86f1-1383c53214b6",
                        "externalId": null,
                        "hubId": null,
                        "state": "DELHI",
                        "district": "SOUTH DELHI",
                        "subDistrict": null,
                        "boundary": null,
                        "places": null,
                        "accessibility": "private",
                        "isOwned": null,
                        "geoJsonBoundry": null,
                        "controllingBranchId": null
                    }
                ],
                "contacts": [
                    {
                        "name": "KAPOOR CHAND RATTI RAM",
                        "mobileNumber": null,
                        "address": null,
                        "emails": [
                            "kapoorchandrattiram@gmail.com"
                        ],
                        "mobileNumbers": [
                            "9313051882"
                        ],
                        "type": null
                    },
                    {
                        "name": "YASH SINGHAL",
                        "mobileNumber": null,
                        "address": null,
                        "emails": [],
                        "mobileNumbers": [
                            "9313051882"
                        ],
                        "type": null
                    }
                ],
                "location": null,
                "type": "customer",
                "isPortalEnabled": true,
                "address": "{\"pincode\":110019,\"address\":\"KH NO-1911, GROUND FLOOR, KALKAJI,\",\"city\":\"GOVINDPURI EXTN.\",\"state\":\"SOUTH DELHI\"}",
                "externalId": "2007337",
                "updates": null,
                "status": "ACTIVE",
                "panNumber": "LJMPS5380R",
                "group": {
                    "partnerType": null,
                    "name": "Sold-to-party",
                    "uuid": null,
                    "orgId": null
                },
                "route": null,
                "customFields": null,
                "parentId": null,
                "gstn": "07LJMPS5380R1ZT",
                "aadharNo": null,
                "voterId": null,
                "documents": [],
                "verificationStatus": "unverified",
                "firmType": "INDIVISUAL",
                "verificationTicketId": null
            },
            "salesOffice": {
                "_id": "61d7a25a-2ef3-4615-9d02-ac8f3fa3017f",
                "geoLocation": null,
                "type": [
                    "Operation",
                    "Sales"
                ],
                "contacts": [
                    {
                        "name": "",
                        "mobileNumber": null,
                        "address": null,
                        "emails": [
                            ""
                        ],
                        "mobileNumbers": [
                            ""
                        ],
                        "type": null
                    }
                ],
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                "address": "DELHI",
                "updatedBy": null,
                "name": "FENA (P) LIMITED-OKHLA",
                "externalId": "THAR",
                "branchName": null,
                "regionName": "OKHLA",
                "zoneName": null,
                "updates": null,
                "regionId": null,
                "zoneId": null,
                "officeType": null,
                "materialServices": null,
                "customFields": [
                    {
                        "fieldType": "text",
                        "fieldKey": "FCM_GSTN",
                        "value": "07AAACS0326G2ZS",
                        "indexedValue": [
                            "FCM_GSTN_07AAACS0326G2ZS"
                        ],
                        "valueType": "string",
                        "definitionId": null
                    },
                    {
                        "fieldType": "text",
                        "fieldKey": "RCM_GSTN",
                        "value": null,
                        "indexedValue": [
                            "RCM_GSTN_null"
                        ],
                        "valueType": "string",
                        "definitionId": null
                    },
                    {
                        "fieldType": "text",
                        "fieldKey": "STATE_NAME",
                        "value": "DELHI",
                        "indexedValue": [
                            "STATE_NAME_DELHI"
                        ],
                        "valueType": "string",
                        "definitionId": null
                    }
                ],
                "areaName": null,
                "areaId": null
            },
            "billingType": null,
            "billToParty": null,
            "loadInfo": {
                "material": "FDPSWGC-1KG(27KG)Rs.71 (25+2PC),FDPSWGC-1KG(27KG)Rs.71 (25+2PC),FDPSWGC-110G(8.80KG)Rs.10 CANVAS",
                "measurements": [
                    {
                        "measurmentType": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "plannedLoadQuantity": null,
                        "actualLoadedQuantity": null,
                        "netQuantity": 7.8816,
                        "grossQuantity": 0,
                        "standardQuantity": 0,
                        "actualDeliveredQuantity": null,
                        "shortage": null,
                        "frieghtDeductableQuantity": null,
                        "claimQuantity": null,
                        "temperature": null,
                        "density": null,
                        "moisture": null
                    },
                    {
                        "measurmentType": "Bag",
                        "unitOfMeasurment": "Units",
                        "plannedLoadQuantity": null,
                        "actualLoadedQuantity": null,
                        "netQuantity": 300,
                        "grossQuantity": 0,
                        "standardQuantity": 0,
                        "actualDeliveredQuantity": null,
                        "shortage": null,
                        "frieghtDeductableQuantity": null,
                        "claimQuantity": null,
                        "temperature": null,
                        "density": null,
                        "moisture": null
                    }
                ],
                "valueOfGoods": 426981.81,
                "currency": null,
                "standardMeasurement": {
                    "weight": {
                        "measurmentType": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "plannedLoadQuantity": 7.128,
                        "actualLoadedQuantity": null,
                        "netQuantity": 7.8816,
                        "grossQuantity": 0,
                        "standardQuantity": 0,
                        "actualDeliveredQuantity": null,
                        "shortage": null,
                        "frieghtDeductableQuantity": null,
                        "claimQuantity": null,
                        "temperature": null,
                        "density": null,
                        "moisture": null
                    },
                    "volume": null,
                    "packageMeasurement": {
                        "measurmentType": "Bag",
                        "unitOfMeasurment": "Units",
                        "plannedLoadQuantity": 264,
                        "actualLoadedQuantity": null,
                        "netQuantity": 300,
                        "grossQuantity": 0,
                        "standardQuantity": 0,
                        "actualDeliveredQuantity": null,
                        "shortage": null,
                        "frieghtDeductableQuantity": null,
                        "claimQuantity": null,
                        "temperature": null,
                        "density": null,
                        "moisture": null
                    },
                    "trucks": null,
                    "containers": null
                }
            },
            "invoiceNo": "7722309160",
            "consignmentNo": "7722309160",
            "poNumber": null,
            "workOrderNumber": null,
            "currentLocation": null,
            "address": null,
            "consignmentDate": 1683743400000,
            "eWayBillNumber": "771338409244",
            "eWayBillExpiryDate": 1683829800000,
            "podDocument": null,
            "pod": {
                "status": "PENDING",
                "documents": [
                    {
                        "uuid": "7b47f372-046e-4d42-a995-c338d720ccd2",
                        "isExpirable": false,
                        "expireDate": null,
                        "resourceType": "SHIPMENT_POD",
                        "resourceId": "2db6a5c9-d95a-4802-b73a-7936ada8917c",
                        "docPath": "/uploads/22c0f740-e9a7-43d8-b2fc-0280494cfed6/7b47f372-046e-4d42-a995-c338d720ccd2@16845769796573575439760337411409.jpg",
                        "downloadUrl": "https://storage.googleapis.com/fretron-document-bucket/uploads/22c0f740-e9a7-43d8-b2fc-0280494cfed6/7b47f372-046e-4d42-a995-c338d720ccd2@16845769796573575439760337411409.jpg?GoogleAccessId=cloud-storage-service@fretron-206223.iam.gserviceaccount.com&Expires=2548577020&Signature=FEBCOo%2FX4K%2F%2BmBpWdEdbe4Shba6kAPaxHBFiXGXJINDu2AV%2FoFhp1zNWdt8Eot6KZ8P8jFCcElJjmmF5j0BQHMRuPR3z4SBUnraSZIMZbucRFwqaOWB1EivS1%2B1QLrAwaj6nxMEGwf5KiaF7IA2f%2FaTm6BPB5QMuAdByv%2BJmXz2BtLKkqI0WfaFkSpO1nNndNNesOTizwjRnY2fTdZUmGHTkfTgeMGKFEj9RXxBekfvCb5TqUnbf94ZLUP7hYBN12PMwn541oH8u%2B5%2BYTDdpoxFSqfT3XMSqjSA2ODOco4Z5kO%2FsxDvUm%2BHMmUd7dXJMUMXdA1zCzNAjPBrXtSqYOg%3D%3D",
                        "orgId": "22c0f740-e9a7-43d8-b2fc-0280494cfed6",
                        "name": "Front_16845769796573575439760337411409.jpg",
                        "previewString": null,
                        "customFields": null,
                        "createdAt": 1684577020691,
                        "createdBy": "0160ee8b-c9ef-478b-9ea3-5c1c22b2ab80",
                        "updates": {
                            "forwardReasons": [
                                "document.added"
                            ],
                            "updatedBy": "USER",
                            "userId": "0160ee8b-c9ef-478b-9ea3-5c1c22b2ab80",
                            "time": 1684577020691,
                            "resourceType": "Document",
                            "resourceId": "7b47f372-046e-4d42-a995-c338d720ccd2",
                            "sourceOfInformation": "created",
                            "updateType": null,
                            "description": "document created",
                            "forwardedFrom": null,
                            "uuid": "89c1a79e-a47d-444b-9bcb-ddd24c46f1f5",
                            "revision": null,
                            "traceID": "880be0b6-ac83-47c6-b7f8-2e5a9d68541a",
                            "changes": null
                        }
                    }
                ],
                "receiveDate": null,
                "submissionDate": null,
                "expectedSubmissionDate": null,
                "issues": [
                    ""
                ],
                "receivedBy": null,
                "remarks": "",
                "submissionPlace": null,
                "uuid": "2db6a5c9-d95a-4802-b73a-7936ada8917c",
                "externalId": null,
                "consignmentId": "5bb9fe9e-c578-4744-b26e-ea6893402bb4",
                "deliveryItems": null,
                "updates": null,
                "feedingStatus": null,
                "trackingDetail": null,
                "reportingDate": null,
                "unloadingStartDate": null,
                "unloadingFinishDate": null,
                "vehicleReleaseDate": null,
                "type": "POD",
                "shipmentId": null,
                "customField": null
            },
            "equipments": null,
            "eWayBillRegistrationDate": 1683743400000,
            "invoiceValue": "426981.81",
            "pssNo": null,
            "customerPsnNo": null,
            "contractToParty": null,
            "customFields": [
                {
                    "fieldType": "text",
                    "fieldKey": "LR Number",
                    "value": "0000003890",
                    "multiple": false,
                    "isRemark": false,
                    "remark": null,
                    "required": false,
                    "description": null,
                    "options": null,
                    "indexedValue": [
                        "LR Number_0000003890"
                    ],
                    "valueType": "string",
                    "input": null,
                    "unit": null,
                    "accessType": null,
                    "uuid": null
                },
                {
                    "fieldType": "text",
                    "fieldKey": "LR Date",
                    "value": "11.05.2023",
                    "multiple": false,
                    "isRemark": false,
                    "remark": null,
                    "required": false,
                    "description": null,
                    "options": null,
                    "indexedValue": [
                        "LR Date_11.05.2023"
                    ],
                    "valueType": "string",
                    "input": null,
                    "unit": null,
                    "accessType": null,
                    "uuid": null
                },
                {
                    "fieldType": "text",
                    "fieldKey": "IRN Number",
                    "value": "ee2ad904cb1046ca85ef45a23f3cc7e90cc60fe4e9377e6f70aafddefa04d1e1",
                    "multiple": false,
                    "isRemark": false,
                    "remark": null,
                    "required": false,
                    "description": null,
                    "options": null,
                    "indexedValue": [
                        "IRN Number_ee2ad904cb1046ca85ef45a23f3cc7e90cc60fe4e9377e6f70aafddefa04d1e1"
                    ],
                    "valueType": "string",
                    "input": null,
                    "unit": null,
                    "accessType": null,
                    "uuid": null
                },
                {
                    "fieldType": "text",
                    "fieldKey": "Invoice Status",
                    "value": "UNPAID",
                    "multiple": false,
                    "isRemark": false,
                    "remark": null,
                    "required": false,
                    "description": null,
                    "options": null,
                    "indexedValue": [
                        "Invoice Status_UNPAID"
                    ],
                    "valueType": "string",
                    "input": null,
                    "unit": null,
                    "accessType": null,
                    "uuid": null
                }
            ],
            "externalId": "7722309160",
            "deliveryDate": 1684200480000,
            "salesOrderId": null,
            "updates": {
                "forwardReasons": [
                    "consignment.pod.updated.event",
                    "pod.documents.uploaded"
                ],
                "updatedBy": "USER",
                "userId": "0160ee8b-c9ef-478b-9ea3-5c1c22b2ab80",
                "time": 1684577029489,
                "resourceType": "Consignment",
                "resourceId": "5bb9fe9e-c578-4744-b26e-ea6893402bb4",
                "sourceOfInformation": null,
                "updateType": null,
                "description": "Updated Pod Details",
                "forwardedFrom": null,
                "uuid": "8adfa481-d802-48e9-8513-cfd3e279ddb0",
                "revision": 9,
                "traceID": "cnpod_0_1150092",
                "changes": null
            },
            "trackingStatus": "Delivered at GOVINDPURI EXTN.",
            "edd": null,
            "originalEdd": null,
            "fuLineItemIds": null,
            "orderMappings": [
                {
                    "uuid": "095e12ee-92a0-42f6-a63a-747f9df7ace3",
                    "orderId": "421adafa-5a27-436c-a57c-189f03b9744d",
                    "lineItemId": "69975136-23a5-41bc-9c6f-897ae54cb429",
                    "legType": "DirectLeg",
                    "consignmentId": "5bb9fe9e-c578-4744-b26e-ea6893402bb4",
                    "quantity": {
                        "weight": {
                            "measurmentType": null,
                            "unitOfMeasurment": "Metric Tonnes",
                            "plannedLoadQuantity": 7.128,
                            "actualLoadedQuantity": null,
                            "netQuantity": 7.128,
                            "grossQuantity": null,
                            "standardQuantity": null,
                            "actualDeliveredQuantity": null,
                            "shortage": null,
                            "frieghtDeductableQuantity": null,
                            "claimQuantity": null,
                            "temperature": null,
                            "density": null,
                            "moisture": null
                        },
                        "volume": null,
                        "packageMeasurement": {
                            "measurmentType": "Bag",
                            "unitOfMeasurment": "Units",
                            "plannedLoadQuantity": 264,
                            "actualLoadedQuantity": null,
                            "netQuantity": 264,
                            "grossQuantity": null,
                            "standardQuantity": null,
                            "actualDeliveredQuantity": null,
                            "shortage": null,
                            "frieghtDeductableQuantity": null,
                            "claimQuantity": null,
                            "temperature": null,
                            "density": null,
                            "moisture": null
                        },
                        "trucks": null,
                        "containers": null
                    },
                    "fuMappings": [
                        {
                            "legId": "DirectLeg#1.0",
                            "legType": "DirectLeg",
                            "fuLineItemId": "7b680409-809a-4a0e-9de3-d07b4318fb78",
                            "executionPlanId": null,
                            "legStatus": "FINALIZED",
                            "shipmentId": null
                        }
                    ],
                    "consignmentLineItemId": "dae29c07-2574-4522-a356-c0f07c8bfe06",
                    "source": "Order",
                    "originLegId": null,
                    "isFullyUtilized": null,
                    "containerId": null
                },
                {
                    "uuid": "644d783f-9a28-4683-81c3-8f4650af2a44",
                    "orderId": "421adafa-5a27-436c-a57c-189f03b9744d",
                    "lineItemId": "c0d67314-b3a0-4ab8-b83e-3165f4f2e07f",
                    "legType": "DirectLeg",
                    "consignmentId": "5bb9fe9e-c578-4744-b26e-ea6893402bb4",
                    "quantity": {
                        "weight": {
                            "measurmentType": null,
                            "unitOfMeasurment": "Metric Tonnes",
                            "plannedLoadQuantity": 0.648,
                            "actualLoadedQuantity": null,
                            "netQuantity": 0.648,
                            "grossQuantity": null,
                            "standardQuantity": null,
                            "actualDeliveredQuantity": null,
                            "shortage": null,
                            "frieghtDeductableQuantity": null,
                            "claimQuantity": null,
                            "temperature": null,
                            "density": null,
                            "moisture": null
                        },
                        "volume": null,
                        "packageMeasurement": {
                            "measurmentType": "Bag",
                            "unitOfMeasurment": "Units",
                            "plannedLoadQuantity": 24,
                            "actualLoadedQuantity": null,
                            "netQuantity": 24,
                            "grossQuantity": null,
                            "standardQuantity": null,
                            "actualDeliveredQuantity": null,
                            "shortage": null,
                            "frieghtDeductableQuantity": null,
                            "claimQuantity": null,
                            "temperature": null,
                            "density": null,
                            "moisture": null
                        },
                        "trucks": null,
                        "containers": null
                    },
                    "fuMappings": [
                        {
                            "legId": "DirectLeg#1.0",
                            "legType": "DirectLeg",
                            "fuLineItemId": "7b680409-809a-4a0e-9de3-d07b4318fb78",
                            "executionPlanId": null,
                            "legStatus": "FINALIZED",
                            "shipmentId": null
                        }
                    ],
                    "consignmentLineItemId": "3cbd5475-9756-446d-b557-d2ad7fb6815a",
                    "source": "Order",
                    "originLegId": null,
                    "isFullyUtilized": null,
                    "containerId": null
                },
                {
                    "uuid": "3f21bfbc-c37d-4c81-a7a5-131d1caa1308",
                    "orderId": "421adafa-5a27-436c-a57c-189f03b9744d",
                    "lineItemId": "3294853d-3d3b-45ed-815e-013e274da9e6",
                    "legType": "DirectLeg",
                    "consignmentId": "5bb9fe9e-c578-4744-b26e-ea6893402bb4",
                    "quantity": {
                        "weight": {
                            "measurmentType": null,
                            "unitOfMeasurment": "Metric Tonnes",
                            "plannedLoadQuantity": 0.1056,
                            "actualLoadedQuantity": null,
                            "netQuantity": 0.1056,
                            "grossQuantity": null,
                            "standardQuantity": null,
                            "actualDeliveredQuantity": null,
                            "shortage": null,
                            "frieghtDeductableQuantity": null,
                            "claimQuantity": null,
                            "temperature": null,
                            "density": null,
                            "moisture": null
                        },
                        "volume": null,
                        "packageMeasurement": {
                            "measurmentType": "Bag",
                            "unitOfMeasurment": "Units",
                            "plannedLoadQuantity": 12,
                            "actualLoadedQuantity": null,
                            "netQuantity": 12,
                            "grossQuantity": null,
                            "standardQuantity": null,
                            "actualDeliveredQuantity": null,
                            "shortage": null,
                            "frieghtDeductableQuantity": null,
                            "claimQuantity": null,
                            "temperature": null,
                            "density": null,
                            "moisture": null
                        },
                        "trucks": null,
                        "containers": null
                    },
                    "fuMappings": [
                        {
                            "legId": "DirectLeg#1.0",
                            "legType": "DirectLeg",
                            "fuLineItemId": "7b680409-809a-4a0e-9de3-d07b4318fb78",
                            "executionPlanId": null,
                            "legStatus": "FINALIZED",
                            "shipmentId": null
                        }
                    ],
                    "consignmentLineItemId": "cd783cb8-5886-421f-b1e5-0ab6b2dfc706",
                    "source": "Order",
                    "originLegId": null,
                    "isFullyUtilized": null,
                    "containerId": null
                }
            ],
            "lineItems": [
                {
                    "material": {
                        "uuid": "aace717c-36c0-4060-a6d7-ce70111cc13a",
                        "externalId": "3144",
                        "name": "FDPSWGC-1KG(27KG)Rs.71 (25+2PC)",
                        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                        "measurementType": "Package",
                        "unitOfMeasurement": "Bag",
                        "pricePerUnit": null,
                        "updates": {
                            "forwardReasons": [
                                "material.created.event"
                            ],
                            "updatedBy": "USER",
                            "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                            "time": 1671697797309,
                            "resourceType": "Material",
                            "resourceId": "aace717c-36c0-4060-a6d7-ce70111cc13a",
                            "sourceOfInformation": null,
                            "updateType": null,
                            "description": "Added material FDPSWGC-1KG(27KG)Rs.71 (25+2PC) ",
                            "forwardedFrom": null,
                            "uuid": "fc6555a6-2350-4989-a7fd-ca32660881a8",
                            "revision": null,
                            "traceID": "93ce86b5-cb37-4828-9bd7-09d0d65147aa",
                            "changes": null
                        },
                        "materialType": "Material",
                        "materialGroup": "FENA DETERGENT PWDR",
                        "controlCode": null,
                        "division": null,
                        "taxCode": null,
                        "partnerId": null,
                        "linkedMaterialId": "ZFIN",
                        "materialGroupId": "fe74c012-033b-4094-80c7-af661b593943",
                        "materialDescription": "27",
                        "partnerName": null,
                        "measuredQuantity": null
                    },
                    "customerMaterial": null,
                    "uuid": "dae29c07-2574-4522-a356-c0f07c8bfe06",
                    "valueOfGoods": null,
                    "externalId": "000010",
                    "customFields": [
                        {
                            "fieldType": "string",
                            "fieldKey": "Item Category",
                            "value": "TAN",
                            "indexedValue": [
                                "Item Category_TAN"
                            ],
                            "valueType": "string",
                            "definitionId": null
                        }
                    ],
                    "itemNumber": "1",
                    "invoiceNo": null,
                    "transportationServiceId": null
                },
                {
                    "material": {
                        "uuid": "aace717c-36c0-4060-a6d7-ce70111cc13a",
                        "externalId": "3144",
                        "name": "FDPSWGC-1KG(27KG)Rs.71 (25+2PC)",
                        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                        "measurementType": "Package",
                        "unitOfMeasurement": "Bag",
                        "pricePerUnit": null,
                        "updates": {
                            "forwardReasons": [
                                "material.created.event"
                            ],
                            "updatedBy": "USER",
                            "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                            "time": 1671697797309,
                            "resourceType": "Material",
                            "resourceId": "aace717c-36c0-4060-a6d7-ce70111cc13a",
                            "sourceOfInformation": null,
                            "updateType": null,
                            "description": "Added material FDPSWGC-1KG(27KG)Rs.71 (25+2PC) ",
                            "forwardedFrom": null,
                            "uuid": "fc6555a6-2350-4989-a7fd-ca32660881a8",
                            "revision": null,
                            "traceID": "93ce86b5-cb37-4828-9bd7-09d0d65147aa",
                            "changes": null
                        },
                        "materialType": "Material",
                        "materialGroup": "FENA DETERGENT PWDR",
                        "controlCode": null,
                        "division": null,
                        "taxCode": null,
                        "partnerId": null,
                        "linkedMaterialId": "ZFIN",
                        "materialGroupId": "fe74c012-033b-4094-80c7-af661b593943",
                        "materialDescription": "27",
                        "partnerName": null,
                        "measuredQuantity": null
                    },
                    "customerMaterial": null,
                    "uuid": "3cbd5475-9756-446d-b557-d2ad7fb6815a",
                    "valueOfGoods": null,
                    "externalId": "000020",
                    "customFields": [
                        {
                            "fieldType": "string",
                            "fieldKey": "Item Category",
                            "value": "ZTRA",
                            "indexedValue": [
                                "Item Category_ZTRA"
                            ],
                            "valueType": "string",
                            "definitionId": null
                        }
                    ],
                    "itemNumber": "2",
                    "invoiceNo": null,
                    "transportationServiceId": null
                },
                {
                    "material": {
                        "uuid": "e1eb538c-93c4-4bbe-888f-716d300e6cba",
                        "externalId": "3064",
                        "name": "FDPSWGC-110G(8.80KG)Rs.10 CANVAS",
                        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                        "measurementType": "Package",
                        "unitOfMeasurement": "Bag",
                        "pricePerUnit": null,
                        "updates": {
                            "forwardReasons": [
                                "material.created.event"
                            ],
                            "updatedBy": "USER",
                            "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                            "time": 1671697774153,
                            "resourceType": "Material",
                            "resourceId": "e1eb538c-93c4-4bbe-888f-716d300e6cba",
                            "sourceOfInformation": null,
                            "updateType": null,
                            "description": "Added material FDPSWGC-110G(8.80KG)Rs.10 CANVAS ",
                            "forwardedFrom": null,
                            "uuid": "e5c6e90b-9dfe-4e07-9fcb-ade0859e1bcc",
                            "revision": null,
                            "traceID": "63aff9d6-55c1-4b7f-981a-aaad4ad68b9a",
                            "changes": null
                        },
                        "materialType": "Material",
                        "materialGroup": "FENA DETERGENT PWDR",
                        "controlCode": null,
                        "division": null,
                        "taxCode": null,
                        "partnerId": null,
                        "linkedMaterialId": "ZFIN",
                        "materialGroupId": "fe74c012-033b-4094-80c7-af661b593943",
                        "materialDescription": "8.8",
                        "partnerName": null,
                        "measuredQuantity": null
                    },
                    "customerMaterial": null,
                    "uuid": "cd783cb8-5886-421f-b1e5-0ab6b2dfc706",
                    "valueOfGoods": null,
                    "externalId": "000030",
                    "customFields": [
                        {
                            "fieldType": "string",
                            "fieldKey": "Item Category",
                            "value": "ZADD",
                            "indexedValue": [
                                "Item Category_ZADD"
                            ],
                            "valueType": "string",
                            "definitionId": null
                        }
                    ],
                    "itemNumber": "3",
                    "invoiceNo": null,
                    "transportationServiceId": null
                }
            ],
            "contractId": null,
            "invoiceStatus": null
        }
    ],
    "equipments": null,
    "shipmentStages": [
        {
            "uuid": "26702970-0979-4965-8fd0-ebf0f0241ce1",
            "arrivalTime": 1683794995099,
            "departureTime": 1683799126962,
            "tripPoint": {
                "uuid": "26702970-0979-4965-8fd0-ebf0f0241ce1",
                "vehicleId": "9718866526",
                "imei": "9718866526",
                "purpose": "Pickup",
                "sequenceId": null,
                "place": null,
                "status": "COMPLETED",
                "eta": null,
                "remainingDistance": null,
                "plannedArrival": null,
                "plannedDeparture": null,
                "actualArrival": 1683794995099,
                "actualDeparture": null,
                "assosiatedShipmentsId": [
                    "9ff9892d-1308-4a93-92d5-4988d7a80260"
                ],
                "creationTime": 1683794999349,
                "outOfTrackSince": null,
                "isOutOfTrack": false,
                "isAutoCompleted": false,
                "coveredDistance": null,
                "purposedDistance": null,
                "forShipmentStages": [
                    "26702970-0979-4965-8fd0-ebf0f0241ce1"
                ],
                "currentLocation": null,
                "hub": {
                    "name": "OKHLA",
                    "address": null,
                    "category": "Hub",
                    "center": {
                        "latitude": 28.5625518,
                        "longitude": 77.2913729
                    },
                    "centerCoordinates": [
                        77.2913729,
                        28.5625518
                    ],
                    "suggestedRadius": 5000,
                    "viewport": null,
                    "source": "GOOGLE",
                    "addedBy": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "placeId": "8abcd0ee-6ed6-48af-ac1c-fc24627e0fb2",
                    "externalId": null,
                    "hubId": null,
                    "state": "DELHI",
                    "district": "NEW DELHI",
                    "subDistrict": null,
                    "boundary": null,
                    "places": null,
                    "accessibility": "private",
                    "isOwned": null,
                    "geoJsonBoundry": null,
                    "controllingBranchId": null
                },
                "expectedActivityStartTime": null,
                "actualActivityStartTime": null,
                "actualActivityEndTime": null,
                "updates": {
                    "forwardReasons": [
                        "trippoint.created"
                    ],
                    "updatedBy": "SYSTEM",
                    "userId": null,
                    "time": 1683794999349,
                    "resourceType": "TripPoint",
                    "resourceId": "26702970-0979-4965-8fd0-ebf0f0241ce1",
                    "sourceOfInformation": null,
                    "updateType": null,
                    "description": null,
                    "forwardedFrom": null,
                    "uuid": "14e9cc09-4d97-45ed-979f-f1be5ca05005",
                    "revision": 0,
                    "traceID": "0565f85a-c570-4a4b-961b-bb19d19fe253",
                    "changes": null
                },
                "currentGpsState": null,
                "isDisconnected": false,
                "routeId": null,
                "routeDeviationMinimumDistanceConstraint": null
            },
            "place": null,
            "resourcePickup": null,
            "resourceDropOff": null,
            "consignmentPickUps": [
                "5bb9fe9e-c578-4744-b26e-ea6893402bb4"
            ],
            "consignmentDelivered": null,
            "status": "COMPLETED",
            "expectedActivityStartTime": null,
            "actualActivityStartTime": 1683797658019,
            "actualActivityEndTime": 1683799125953,
            "eta": null,
            "hub": {
                "name": "OKHLA",
                "address": null,
                "category": "Hub",
                "center": {
                    "latitude": 28.5625518,
                    "longitude": 77.2913729
                },
                "centerCoordinates": [
                    77.2913729,
                    28.5625518
                ],
                "suggestedRadius": 5000,
                "viewport": null,
                "source": "GOOGLE",
                "addedBy": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                "placeId": "8abcd0ee-6ed6-48af-ac1c-fc24627e0fb2",
                "externalId": null,
                "hubId": null,
                "state": "DELHI",
                "district": "NEW DELHI",
                "subDistrict": null,
                "boundary": [],
                "places": [
                    {
                        "name": "OKHLA",
                        "address": "146-148 & 166,167,DSIDC INDL.",
                        "category": "Unloading Point",
                        "center": {
                            "latitude": 28.5625518,
                            "longitude": 77.2913729
                        },
                        "centerCoordinates": [
                            77.2913729,
                            28.5625518
                        ],
                        "suggestedRadius": 5000,
                        "viewport": null,
                        "source": "FRETRON",
                        "addedBy": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "placeId": "b356cea3-a545-4b0d-b9db-1bf75378d08e",
                        "externalId": null,
                        "hubId": "8abcd0ee-6ed6-48af-ac1c-fc24627e0fb2",
                        "state": null,
                        "district": null,
                        "subDistrict": null,
                        "boundary": null,
                        "places": null,
                        "accessibility": "public",
                        "isOwned": false,
                        "geoJsonBoundry": null,
                        "controllingBranchId": null
                    }
                ],
                "accessibility": "private",
                "isOwned": null,
                "geoJsonBoundry": null,
                "controllingBranchId": null
            },
            "gateInTime": 1683795014067,
            "secondaryStatus": null,
            "stageName": "FENA (P) LIMITED, OKHLA",
            "controllingBranchId": null,
            "gateOutTime": null
        },
        {
            "uuid": "ba37b8b2-2998-4a4a-bc52-0d563d336fa1",
            "arrivalTime": 1683806906000,
            "departureTime": 1684200480000,
            "tripPoint": {
                "uuid": "ba37b8b2-2998-4a4a-bc52-0d563d336fa1",
                "vehicleId": "9718866526",
                "imei": "9718866526",
                "purpose": "Delivery",
                "sequenceId": null,
                "place": null,
                "status": "COMPLETED",
                "eta": null,
                "remainingDistance": 0,
                "plannedArrival": null,
                "plannedDeparture": null,
                "actualArrival": 1683806906000,
                "actualDeparture": 1684200480000,
                "assosiatedShipmentsId": [
                    "9ff9892d-1308-4a93-92d5-4988d7a80260"
                ],
                "creationTime": 1683799130652,
                "outOfTrackSince": null,
                "isOutOfTrack": false,
                "isAutoCompleted": true,
                "coveredDistance": 1543.7560353830665,
                "purposedDistance": null,
                "forShipmentStages": [
                    "ba37b8b2-2998-4a4a-bc52-0d563d336fa1"
                ],
                "currentLocation": {
                    "latitude": 28.73472,
                    "longitude": 77.16639,
                    "speed": 0,
                    "course": null,
                    "decoder": "lbs",
                    "time": 1684200480000,
                    "imei": "9718866526",
                    "vehicleId": null,
                    "address": "48, SSI Industrial Area, Jahangirpuri Industrial Area, Jahangirpuri, Delhi, 110033, India",
                    "lngLat": [
                        77.16639,
                        28.73472
                    ],
                    "isFillingEnabled": false,
                    "odometer": null
                },
                "hub": {
                    "name": "GOVINDPURI EXTN.",
                    "address": null,
                    "category": "Hub",
                    "center": {
                        "latitude": 28.5354803,
                        "longitude": 77.2576512
                    },
                    "centerCoordinates": [
                        77.2576512,
                        28.5354803
                    ],
                    "suggestedRadius": 5000,
                    "viewport": null,
                    "source": "GOOGLE",
                    "addedBy": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "placeId": "8347f542-a592-45a0-86f1-1383c53214b6",
                    "externalId": null,
                    "hubId": null,
                    "state": "DELHI",
                    "district": "SOUTH DELHI",
                    "subDistrict": null,
                    "boundary": null,
                    "places": null,
                    "accessibility": "private",
                    "isOwned": null,
                    "geoJsonBoundry": null,
                    "controllingBranchId": null
                },
                "expectedActivityStartTime": null,
                "actualActivityStartTime": 1683806906000,
                "actualActivityEndTime": 1684200480000,
                "updates": {
                    "forwardReasons": [
                        "trippoint.current.location.updated",
                        "gps.state.completed"
                    ],
                    "updatedBy": "SYSTEM",
                    "userId": null,
                    "time": 1684200481916,
                    "resourceType": "TripPoint",
                    "resourceId": "ba37b8b2-2998-4a4a-bc52-0d563d336fa1",
                    "sourceOfInformation": null,
                    "updateType": null,
                    "description": "From AT to COMPLETED",
                    "forwardedFrom": null,
                    "uuid": "6175f964-8a0e-4ada-8995-922453595a1f",
                    "revision": 31,
                    "traceID": "vehiclegpsstatetopic_5_16409196",
                    "changes": null
                },
                "currentGpsState": {
                    "startTime": 1684193880000,
                    "endTime": 1684200480000,
                    "startLocation": {
                        "latitude": 28.52472,
                        "longitude": 77.27917,
                        "speed": 0,
                        "course": null,
                        "decoder": "lbs",
                        "time": 1684193880000,
                        "imei": "9718866526",
                        "vehicleId": null,
                        "address": "F-92 Ranjan, village, Tekhand, Okhla Phase I, Okhla Industrial Area, New Delhi, Delhi 110020, India",
                        "lngLat": [
                            77.27917,
                            28.52472
                        ],
                        "isFillingEnabled": false,
                        "odometer": null
                    },
                    "endLocation": {
                        "latitude": 28.73472,
                        "longitude": 77.16639,
                        "speed": 0,
                        "course": null,
                        "decoder": "lbs",
                        "time": 1684200480000,
                        "imei": "9718866526",
                        "vehicleId": null,
                        "address": "48, SSI Industrial Area, Jahangirpuri Industrial Area, Jahangirpuri, Delhi, 110033, India",
                        "lngLat": [
                            77.16639,
                            28.73472
                        ],
                        "isFillingEnabled": false,
                        "odometer": null
                    },
                    "mean": {
                        "latitude": 28.62972,
                        "longitude": 77.22278,
                        "speed": 0,
                        "course": null,
                        "decoder": null,
                        "time": 1684197180000,
                        "imei": "",
                        "vehicleId": "",
                        "address": "Connaught Lane, New Delhi, Delhi, 110001, India",
                        "lngLat": [
                            77.22278,
                            28.62972
                        ],
                        "isFillingEnabled": false,
                        "odometer": null
                    },
                    "totalDistance": 25844.151577899058,
                    "totalTime": 6600000,
                    "averageSpeeds": 14.096809951581305,
                    "numberOfRecord": 2,
                    "imei": "9718866526",
                    "vehicleId": null,
                    "uuid": "afccabe5-726a-4cf6-abbb-86b060a6cfbd",
                    "state": "Moving",
                    "isDisconnected": true,
                    "eventType": "StateCompleted",
                    "isNoGpsZone": false
                },
                "isDisconnected": false,
                "routeId": null,
                "routeDeviationMinimumDistanceConstraint": null
            },
            "place": null,
            "resourcePickup": null,
            "resourceDropOff": null,
            "consignmentPickUps": null,
            "consignmentDelivered": [
                "5bb9fe9e-c578-4744-b26e-ea6893402bb4"
            ],
            "status": "COMPLETED",
            "expectedActivityStartTime": null,
            "actualActivityStartTime": null,
            "actualActivityEndTime": null,
            "eta": null,
            "hub": {
                "name": "GOVINDPURI EXTN.",
                "address": null,
                "category": "Hub",
                "center": {
                    "latitude": 28.5354803,
                    "longitude": 77.2576512
                },
                "centerCoordinates": [
                    77.2576512,
                    28.5354803
                ],
                "suggestedRadius": 5000,
                "viewport": null,
                "source": "GOOGLE",
                "addedBy": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                "placeId": "8347f542-a592-45a0-86f1-1383c53214b6",
                "externalId": null,
                "hubId": null,
                "state": "DELHI",
                "district": "SOUTH DELHI",
                "subDistrict": null,
                "boundary": [],
                "places": [
                    {
                        "name": "GOVINDPURI EXTN.",
                        "address": "KH NO-1911, GROUND FLOOR, KALKAJI,",
                        "category": "Unloading Point",
                        "center": {
                            "latitude": 28.5354803,
                            "longitude": 77.2576512
                        },
                        "centerCoordinates": [
                            77.2576512,
                            28.5354803
                        ],
                        "suggestedRadius": 5000,
                        "viewport": null,
                        "source": "FRETRON",
                        "addedBy": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "placeId": "6e21e234-2dd2-4b19-bc72-513b6011083e",
                        "externalId": null,
                        "hubId": "8347f542-a592-45a0-86f1-1383c53214b6",
                        "state": null,
                        "district": null,
                        "subDistrict": null,
                        "boundary": null,
                        "places": null,
                        "accessibility": "public",
                        "isOwned": false,
                        "geoJsonBoundry": null,
                        "controllingBranchId": null
                    }
                ],
                "accessibility": "private",
                "isOwned": null,
                "geoJsonBoundry": null,
                "controllingBranchId": null
            },
            "gateInTime": null,
            "secondaryStatus": null,
            "stageName": null,
            "controllingBranchId": null,
            "gateOutTime": null
        }
    ],
    "shipmentType": "DirectLeg",
    "transportationMode": "ByRoad",
    "shipmentStatus": "Completed",
    "shipmentTrackingStatus": null,
    "fleetInfo": {
        "vehicle": {
            "customerId": null,
            "vehicleType": "Truck 9MT",
            "vehicleModel": null,
            "vehicleMake": null,
            "vtsDeviceId": null,
            "vehicleRegistrationNumber": "DL1LAD1095",
            "uuid": null,
            "associatedWith": null,
            "isDeleted": null,
            "createTime": null,
            "updateTime": null,
            "groups": null,
            "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
            "sharedWith": [
                "FRETRON_GOD_FO"
            ],
            "driverId": null,
            "attachedDocs": [
                "9f59dd88-77ce-406c-b0b9-b0593c68c090",
                "aee11829-5be8-4565-bf38-36ccdd2be44b"
            ],
            "source": null,
            "isTrackingEnabled": false,
            "groupsExtended": null,
            "truckLength": null,
            "loadCapacity": 25,
            "floorType": null,
            "kmDriven": null,
            "mileageLoaded": null,
            "mileageEmpty": null,
            "category": null,
            "externalId": null,
            "updates": null,
            "branch": null,
            "chassisNumber": "MAT506414K0E07360",
            "vehicleLoadType": {
                "name": "Taurus-12W",
                "uuid": "342c8fa7-7953-41c1-85e6-cf3140691b67",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                "partnerId": null,
                "partnerName": null,
                "partnerExternalId": null,
                "vehicleCategory": "Taurus",
                "numberOfWheels": 12,
                "passingCapacityMT": 25,
                "passingCapacityCFT": null,
                "bodyType": "Open Body",
                "chassisType": "Taurus-12W",
                "dimensionString": null,
                "minLength": 0,
                "includeMinLength": false,
                "maxLength": -1,
                "includeMaxLength": false,
                "minHeight": 0,
                "includeMinHeight": false,
                "maxHeight": -1,
                "includeMaxHeight": false,
                "bodyTypes": null,
                "chassisTypes": null,
                "updates": {
                    "forwardReasons": [
                        "load.type.updated.event"
                    ],
                    "updatedBy": "USER",
                    "userId": "fc6a1d6e-cf18-4bf8-9489-58d56aab16ec",
                    "time": 1678952041402,
                    "resourceType": "LoadTypes",
                    "resourceId": "342c8fa7-7953-41c1-85e6-cf3140691b67",
                    "sourceOfInformation": null,
                    "updateType": null,
                    "description": "Updated Load Type .",
                    "forwardedFrom": null,
                    "uuid": "73927fb5-8d9d-4f69-ba28-9df006d6ad16",
                    "revision": null,
                    "traceID": null,
                    "changes": null
                },
                "externalId": null,
                "vehicleCategories": null
            },
            "customFields": [
                {
                    "fieldType": "text",
                    "fieldKey": "EngineNumber",
                    "value": "3.8SGI72EPY816253",
                    "indexedValue": [
                        "EngineNumber_3.8SGI72EPY816253"
                    ],
                    "valueType": "string",
                    "definitionId": null
                }
            ],
            "baseLocationId": null,
            "description": null,
            "secondaryDriverId": null
        },
        "driver": {
            "name": "Ashok kumar",
            "mobileNumber": "9718866526",
            "uuid": null,
            "orgId": null,
            "dlNumber": null,
            "dlExpiryTime": null,
            "attachedDocs": [],
            "address": null,
            "pincode": null,
            "vehicleId": null,
            "vehicleRegistrationNumber": null,
            "externalId": null,
            "mobileNumbers": null,
            "updates": null,
            "associatedUserId": null,
            "aadharNo": null,
            "customFields": null,
            "branch": null,
            "isEmployee": false,
            "pfNumber": null,
            "type": null,
            "status": null
        },
        "device": {
            "imei": "9718866526",
            "mobileNumber": null,
            "manufacturerName": null,
            "uuid": null,
            "isAssociated": null,
            "isDeleted": null,
            "createTime": null,
            "updateTime": 1683814991257,
            "groups": null,
            "orgId": "48259b1e-2c6e-4d47-a206-680aa2a9970d",
            "status": "ALLOWED",
            "sharedWith": null,
            "isSuspended": null,
            "type": "lbs",
            "usedBy": null,
            "attachedResourceId": null,
            "attachedResourceNumber": null,
            "externalId": null,
            "updates": null,
            "branchId": null,
            "serviceProvider": null
        },
        "fleetType": "Owned",
        "fleetOwner": {
            "uuid": "4044fc7c-8a4d-4cfb-9726-e47de3eb25e3",
            "name": "ANGAD TRANSPORT",
            "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
            "fretronId": null,
            "geoFence": null,
            "places": null,
            "contacts": [
                {
                    "name": "ANGAD TRANSPORT",
                    "mobileNumber": null,
                    "address": null,
                    "emails": [
                        "love_forme_007@yahoo.co.in"
                    ],
                    "mobileNumbers": [
                        "9899502150"
                    ],
                    "type": null
                }
            ],
            "location": null,
            "type": "vendor",
            "isPortalEnabled": true,
            "address": "{\"pincode\":110014,\"address\":\"KH.NO 652, ALI GANJ EASTATE BHOGAL\",\"city\":\"NEW DELHI\",\"state\":\"\"}",
            "externalId": "7500646",
            "updates": null,
            "status": "ACTIVE",
            "panNumber": "BAJPS1950D",
            "group": {
                "partnerType": null,
                "name": "Broker",
                "uuid": null,
                "orgId": null
            },
            "route": null,
            "customFields": null,
            "parentId": null,
            "gstn": "07BAJPS1950D4ZN",
            "aadharNo": null,
            "voterId": null,
            "documents": [],
            "verificationStatus": "unverified",
            "firmType": "INDIVISUAL",
            "verificationTicketId": null
        },
        "trackingMode": "VTS-LBS",
        "trainInfo": null,
        "lbsNumber": null,
        "forwardingAgent": null,
        "broker": {
            "uuid": "4044fc7c-8a4d-4cfb-9726-e47de3eb25e3",
            "name": "ANGAD TRANSPORT",
            "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
            "fretronId": null,
            "geoFence": null,
            "places": null,
            "contacts": [
                {
                    "name": "ANGAD TRANSPORT",
                    "mobileNumber": null,
                    "address": null,
                    "emails": [
                        "love_forme_007@yahoo.co.in"
                    ],
                    "mobileNumbers": [
                        "9899502150"
                    ],
                    "type": null
                }
            ],
            "location": null,
            "type": "vendor",
            "isPortalEnabled": true,
            "address": "{\"pincode\":110014,\"address\":\"KH.NO 652, ALI GANJ EASTATE BHOGAL\",\"city\":\"NEW DELHI\",\"state\":\"\"}",
            "externalId": "7500646",
            "updates": null,
            "status": "ACTIVE",
            "panNumber": "BAJPS1950D",
            "group": {
                "partnerType": null,
                "name": "Broker",
                "uuid": null,
                "orgId": null
            },
            "route": null,
            "customFields": null,
            "parentId": null,
            "gstn": "07BAJPS1950D4ZN",
            "aadharNo": null,
            "voterId": null,
            "documents": [],
            "verificationStatus": "unverified",
            "firmType": "INDIVISUAL",
            "verificationTicketId": null
        },
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
        "uuid": "39d8ff01-326a-4b1f-856f-4b64cfb196e3",
        "status": "ACTIVE",
        "secondaryDriver": {
            "name": null,
            "mobileNumber": null,
            "uuid": null,
            "orgId": null,
            "dlNumber": null,
            "dlExpiryTime": null,
            "attachedDocs": null,
            "address": null,
            "pincode": null,
            "vehicleId": null,
            "vehicleRegistrationNumber": null,
            "externalId": null,
            "mobileNumbers": null,
            "updates": null,
            "associatedUserId": null,
            "aadharNo": null,
            "customFields": null,
            "branch": null,
            "isEmployee": false,
            "pfNumber": null,
            "type": null,
            "status": null
        },
        "verificationStatus": "UnVerified",
        "isTrackingEnable": false
    },
    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
    "currentLocation": {
        "latitude": 28.52472,
        "longitude": 77.27917,
        "speed": 0,
        "course": null,
        "decoder": "lbs",
        "time": 1683806906000,
        "imei": "9718866526",
        "vehicleId": null,
        "address": "F-92 Ranjan, village, Tekhand, Okhla Phase I, Okhla Industrial Area, New Delhi, Delhi 110020, India",
        "lngLat": [
            77.27917,
            28.52472
        ],
        "isFillingEnabled": false,
        "odometer": null
    },
    "shipmentDate": 1683793909822,
    "shipmentNumber": "FRETSH000000431",
    "creationTime": 1683793909863,
    "lastSyncUpTime": 1683814991253,
    "syncUpDueTime": null,
    "remarks": null,
    "updates": {
        "forwardReasons": [
            "shipment.billing.status.updated"
        ],
        "updatedBy": "USER",
        "userId": "868ac373-ed4f-407d-9a26-b6b0e17fae1f",
        "time": 1684836271927,
        "resourceType": "ShipmentObject",
        "resourceId": "9ff9892d-1308-4a93-92d5-4988d7a80260",
        "sourceOfInformation": null,
        "updateType": null,
        "description": null,
        "forwardedFrom": null,
        "uuid": "5ef312f9-a763-45b4-bd27-a59d7edc2949",
        "revision": 184,
        "traceID": "vendorBill_4_9370",
        "changes": null
    },
    "alerts": [
        {
            "description": "7722309160 E-Way bill will expire today",
            "type": "shipment.eway.bill.expiry.notification",
            "status": "OPEN",
            "uuid": "e90e3c41-f364-4d86-9c32-489b6a26c215",
            "closedBy": null,
            "snoozTime": null,
            "createdAt": 1683799133833,
            "updatedAt": 1683814991819,
            "issueId": null,
            "createdBy": null
        }
    ],
    "edd": null,
    "originalEdd": null,
    "issues": null,
    "customContacts": null,
    "lastForwardTime": 1684836271971,
    "completionTime": 1684200480000,
    "links": null,
    "tripType": "Shipment",
    "externalShipmentId": null,
    "customFields": [
        {
            "fieldType": "text",
            "fieldKey": "FreightCost",
            "value": "3000.0",
            "multiple": false,
            "isRemark": false,
            "remark": null,
            "required": false,
            "description": null,
            "options": null,
            "indexedValue": [
                "FreightCost_3000.0"
            ],
            "valueType": "string",
            "input": "string",
            "unit": null,
            "accessType": null,
            "uuid": null
        },
        {
            "fieldType": "text",
            "fieldKey": "FreightType",
            "value": "perVehicle",
            "multiple": false,
            "isRemark": false,
            "remark": null,
            "required": false,
            "description": null,
            "options": null,
            "indexedValue": [
                "FreightType_perVehicle"
            ],
            "valueType": "string",
            "input": "string",
            "unit": null,
            "accessType": null,
            "uuid": null
        },
        {
            "fieldType": "text",
            "fieldKey": "PONo",
            "value": "42e04abd-8ef4-4bee-9b73-1bfd124f34f0",
            "multiple": false,
            "isRemark": false,
            "remark": null,
            "required": false,
            "description": null,
            "options": null,
            "indexedValue": [
                "PONo_42e04abd-8ef4-4bee-9b73-1bfd124f34f0"
            ],
            "valueType": "string",
            "input": "string",
            "unit": null,
            "accessType": null,
            "uuid": null
        },
        {
            "fieldType": "text",
            "fieldKey": "Invoice No's",
            "value": "7722309160",
            "multiple": false,
            "isRemark": false,
            "remark": null,
            "required": false,
            "description": null,
            "options": null,
            "indexedValue": [
                "Invoice No's_7722309160"
            ],
            "valueType": "string",
            "input": null,
            "unit": null,
            "accessType": null,
            "uuid": null
        }
    ],
    "branch": {
        "_id": "61d7a25a-2ef3-4615-9d02-ac8f3fa3017f",
        "geoLocation": null,
        "type": [
            "Operation",
            "Sales"
        ],
        "contacts": [
            {
                "name": "",
                "mobileNumber": null,
                "address": null,
                "emails": [
                    ""
                ],
                "mobileNumbers": [
                    ""
                ],
                "type": null
            }
        ],
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
        "address": "DELHI",
        "updatedBy": null,
        "name": "FENA (P) LIMITED-OKHLA",
        "externalId": "THAR",
        "branchName": null,
        "regionName": "OKHLA",
        "zoneName": null,
        "updates": null,
        "regionId": null,
        "zoneId": null,
        "officeType": null,
        "materialServices": null,
        "customFields": [
            {
                "fieldType": "text",
                "fieldKey": "FCM_GSTN",
                "value": "07AAACS0326G2ZS",
                "indexedValue": [
                    "FCM_GSTN_07AAACS0326G2ZS"
                ],
                "valueType": "string",
                "definitionId": null
            },
            {
                "fieldType": "text",
                "fieldKey": "RCM_GSTN",
                "value": null,
                "indexedValue": [
                    "RCM_GSTN_null"
                ],
                "valueType": "string",
                "definitionId": null
            },
            {
                "fieldType": "text",
                "fieldKey": "STATE_NAME",
                "value": "DELHI",
                "indexedValue": [
                    "STATE_NAME_DELHI"
                ],
                "valueType": "string",
                "definitionId": null
            }
        ],
        "areaName": null,
        "areaId": null
    },
    "poLineItemId": "cf95e5ae-7c9d-4a7d-9a5b-7ad60f8dd3a3",
    "isActive": false,
    "routeId": null,
    "freightUnitLineItemId": "7b680409-809a-4a0e-9de3-d07b4318fb78",
    "runningStatus": null,
    "delayReason": null,
    "billingStatus": "Billed",
    "delayReasonLastUpdateTime": null,
    "delayReasonUpdateDueTime": null,
    "delayReasonUpdateExpiryTime": null,
    "syncUpExpiryTime": null,
    "locationTrackingStatus": null,
    "delayTrackingStatus": null,
    "lastDelayCalculationTime": null
}
/**
 * Written By Harshit
*/
async function getOrderById(ORDER_ID) {
    let res = await rp({
        url: `https://apis.fretron.com/order-manager-v2/sales-orders/v1/order/${ORDER_ID}`,
        method: 'GET',
        json: true,
        headers: {
            authorization: token
        }
    })
    if (res.status == 200) {

        return res.data
    } else {
        return null
    }
}
console.log($event.shipmentNumber)
async function forwardEmail(subject, to, cc, html) {
    await rp({
        uri: `${FRT_PUB_BASE_URL}/notifications/emails/email`,
        method: "POST",
        body: {
            cc: cc,
            to: to,
            subject: subject,
            html: html,
        },
        timeout: 2000,
        json: true,
    });
    return "mail sent successfully"
}
async function sendSmsToTransporter(mobileNumbers, content) {
    let res = await rp({
        method: "post",
        uri: `${FRT_PUB_BASE_URL}/notifications/smsing/sms`,
        body: {
            to: mobileNumbers,
            content: content,
        },
        json: true,
    });
    return res;
}
async function main() {
    try {
        var consignments = $event.consignments
        if (!consignments) {
            return
        }
        let shALerts = $event.alerts
        let ewayBillAlert = shALerts.find(_ => _.type == "shipment.eway.bill.expiry.notification" && _.status == "OPEN")
        for (var data of $event.consignments) {
            var ewaybillNo = data.eWayBillNumber ?? "N/A"
            var invoice = data.consignmentNo ?? "N/A"
            var consignee = data.consignee?.name
            let tptName = $event.fleetInfo?.fleetOwner?.name ?? $event.fleetInfo?.broker?.name
            console.log(`tptName: ${tptName}`)
            var state = data.consignee.places[0].state
            let shDate = $event.shipmentDate
            let origin = $event.shipmentStages[0]?.place?.name ?? $event.shipmentStages[0]?.hub?.name
            let destination = _.last($event.shipmentStages)
            destination = destination?.place?.name ?? destination?.hub?.name
            let vehicleNo = $event.fleetInfo?.vehicle?.vehicleRegistrationNumber
            let ewayBillExpiryTime = data.eWayBillExpiryDate
            let ewayBillExpiryFormat = moment(ewayBillExpiryTime + 19800000).format("DD/MM/YY")
            let plantName = "N/A"
            if (data?.consigner?.address) {
                if (JSON.parse(data?.consigner?.address)?.city) {
                    plantName = JSON.parse(data?.consigner?.address)?.city
                }
            }
            let remainingHtml = ""
            if (data.orderMappings && data.orderMappings.length) {
                let uniqueOrders = _.uniqBy(data?.orderMappings, function (e) {
                    return e.orderId;
                });
                for (let order of uniqueOrders) {
                    let orderId = order.orderId
                    let orderRes = await getOrderById(orderId)
                    let orderNo = orderRes.orderNumber
                    let orderDate = orderRes?.orderDate
                    orderDate = moment(orderDate + 19800000).format("DD/MM/YY");
                    remainingHtml += `                  
                            <tr>
                                <td>${orderDate ?? "N/A"}</td>
                                <td>${orderNo ?? "N/A"}</td>
                                <td>${invoice ?? "N/A"}</td>
                                <td>${consignee ?? "N/A"}</td>
                                <td>${origin ?? "N/A"}</td>
                                <td>${destination ?? "N/A"}</td>
                                <td>${state ?? "N/A"}</td>
                                <td>${vehicleNo ?? "N/A"}</td>
                                <td>${tptName ?? "N/A"}</td>
                                <td>${ewaybillNo ?? "N/A"}</td>
                                <td>${ewayBillExpiryFormat ?? "N/A"}</td>
                            </tr>                
                    `
                }
            }

            var htmlString = `<html> 
            <head>
            <style>
                table,
                td,
                th,
                tr {
                    border: 1.5px solid #000000;
                    border-collapse: collapse;
                    padding: auto;
                    margin: 10px;
                }                
                th {
                    font-weight: bold;
                    background-color: rgb(10, 226, 10);
                }
            </style>           
        </head>
        <body>
        <p>Dear Team,</p>
        <p>E-way bill ${ewaybillNo} for invoice no. ${invoice} is going to expire in next 24 hours.
        Please extend using the link below -https://alpha.fretron.com
        </p><br>
        <table>
            <tr>
                <th>Order Date</th>
                <th>Order Number</th>
                <th>Invoice Number</th>
                <th>Consignee</th>
                <th>Dispatch From Location</th>
                <th>Dispatch To Town</th>
                <th>State</th>
                <th>Vehicle Number</th>
                <th>TPT Name</th>
                <th>Eway Bill No.</th>
                <th>Eway Bill Expiry Date</th>
            </tr>
            ${remainingHtml}
            </table><br>        
             <p>Fena</p>
            </body>
                </html>`
            let needToSendMail = !(shDate && ewayBillExpiryTime && ewayBillExpiryTime - shDate < 25 * 60 * 60 * 1000)
            console.log(`Sh : ${$event.shipmentNumber} , cn ${invoice} & needToSendEmail : ${needToSendMail}`)
            if (ewayBillAlert && true) {
                if (ewayBillAlert.description.includes(invoice)) {
                    let mailSubject = `E-way bill Near Expiry Of ${plantName}`
                    let toArr = ["skjha@fena.com", "sagar.soni@fretron.com"]
                    let ccArr = []
                    var emailRes = await forwardEmail(mailSubject, toArr, ccArr, htmlString)
                    console.log(emailRes);

                    // Sending SMS --->
                    let contacts = ["9711442362", "8527438074"]
                    let content = `Dear Team,\nE-way bill ${ewaybillNo} for invoice no. ${invoice} is going to expire in the next 24 hrs. Please extend using the link below -https://alpha.fretron.com\nFena`
                    console.log(`Sending SMS to ${contacts}`)
                    console.log(`Content - ${content} `)
                    let smsSentRes = await sendSmsToTransporter(contacts, content)
                    console.log(`SMS sent - ${JSON.stringify(smsSentRes)} `)

                } else {
                    console.log("Not expire for " + invoice)
                }
            } else {
                console.log("no open eway bill alert")
            }
        }
    } catch (e) {
        console.log("Error executing automation- " + e.message)
    }
}
// try {
//     await main()
// } catch (e) {
//     console.log(e)
// }

main()