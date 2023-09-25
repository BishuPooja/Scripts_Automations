const rp = require("request-promise")
const token = ""

let $event = {
    "consignment": {
        "salesOrderId": null,
        "fuLineItemIds": null,
        "pod": null,
        "customFields": [
            {
                "indexedValue": [
                    "LR Number_0000000088"
                ],
                "fieldKey": "LR Number",
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
                "value": "0000000088",
                "isRemark": false
            },
            {
                "indexedValue": [
                    "LR Date_02.06.2023"
                ],
                "fieldKey": "LR Date",
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
                "value": "02.06.2023",
                "isRemark": false
            },
            {
                "indexedValue": [
                    "IRN Number_d24f1498dc6b781bb4ffb0398e87d87fdd3aded0405b2fe628c1c8b1ce2c2dec"
                ],
                "fieldKey": "IRN Number",
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
                "value": "d24f1498dc6b781bb4ffb0398e87d87fdd3aded0405b2fe628c1c8b1ce2c2dec",
                "isRemark": false
            },
            {
                "indexedValue": [
                    "Invoice Status_UNPAID"
                ],
                "fieldKey": "Invoice Status",
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
                "value": "UNPAID",
                "isRemark": false
            }
        ],
        "loadInfo": {
            "material": "FDCMB-180G(9.00KG)Rs.10,FDCMB-180G(9.00KG)Rs.10,FDCSW-70G(7.00KG)Rs.5,FDCSW-70G(7.00KG)Rs.5,FDPSWGC-1KG(25KG)Rs.77 CONS OFR FDC Rs10,FDCSW-145G(8.70KG)Rs.10,FDPSWGC-1KG(25KG)Rs.77 CONS OFR FDC Rs10,FDPSWGC-110G(8.80KG)Rs.10 CANVAS,NSB-260GX3(15.60KG)Rs.65 SCRUBBER FREE,NSB-260GX3(15.60KG)Rs.65 SCRUBBER FREE,NSB-135G(9.45KG)Rs.10,NSB-135G(9.45KG)Rs.10,NSB-135G(9.45KG)Rs.10,NSB-65G(13KG)Rs.5,NSB-65G(13KG)Rs.5,NSB-65G(13KG)Rs.5,PLASTIC RECTNGLAR CONTAINR.2 LTR-FIWP(P),FDCMBP STP 9.5X19.5(50PC) -TELEGU,FENA RS STICKER 4.553X9.333 ENGLISH (A),FDCSWP RS. 20 STRIP POSTER TELUGU,FDCMBP RS. 15 STRIP POSTER TELUGU,FIWP-1KG(12KG)RS165CONS.OFR2LTR.CNTNR,FIWP-500G(13KG)Rs.65 (TP-24+2PC),NSB-100GX4(9.60KG)Rs.30",
            "valueOfGoods": 65401.53,
            "standardMeasurement": {
                "volume": null,
                "packageMeasurement": {
                    "actualDeliveredQuantity": null,
                    "density": null,
                    "netQuantity": 385,
                    "moisture": null,
                    "claimQuantity": null,
                    "unitOfMeasurment": "Units",
                    "standardQuantity": 0,
                    "actualLoadedQuantity": null,
                    "measurmentType": "Box",
                    "grossQuantity": 0,
                    "shortage": null,
                    "temperature": null,
                    "plannedLoadQuantity": null,
                    "frieghtDeductableQuantity": null
                },
                "weight": {
                    "actualDeliveredQuantity": null,
                    "density": null,
                    "netQuantity": 1.1148980000000004,
                    "moisture": null,
                    "claimQuantity": null,
                    "unitOfMeasurment": "Metric Tonnes",
                    "standardQuantity": 0,
                    "actualLoadedQuantity": null,
                    "measurmentType": null,
                    "grossQuantity": 0,
                    "shortage": null,
                    "temperature": null,
                    "plannedLoadQuantity": null,
                    "frieghtDeductableQuantity": null
                },
                "containers": null,
                "trucks": null
            },
            "currency": null,
            "measurements": [
                {
                    "actualDeliveredQuantity": null,
                    "density": null,
                    "netQuantity": 1.1148980000000004,
                    "moisture": null,
                    "claimQuantity": null,
                    "unitOfMeasurment": "Metric Tonnes",
                    "standardQuantity": 0,
                    "actualLoadedQuantity": null,
                    "measurmentType": null,
                    "grossQuantity": 0,
                    "shortage": null,
                    "temperature": null,
                    "plannedLoadQuantity": null,
                    "frieghtDeductableQuantity": null
                },
                {
                    "actualDeliveredQuantity": null,
                    "density": null,
                    "netQuantity": 385,
                    "moisture": null,
                    "claimQuantity": null,
                    "unitOfMeasurment": "Units",
                    "standardQuantity": 0,
                    "actualLoadedQuantity": null,
                    "measurmentType": "Box",
                    "grossQuantity": 0,
                    "shortage": null,
                    "temperature": null,
                    "plannedLoadQuantity": null,
                    "frieghtDeductableQuantity": null
                }
            ]
        },
        "customerPsnNo": null,
        "invoiceValue": "65401.53",
        "updates": {
            "traceID": "84f90944-2a71-4388-b9cf-f93030e97537",
            "resourceId": "13e62765-195e-4440-a8ee-833c5ed76b95",
            "updatedBy": "USER",
            "changes": null,
            "sourceOfInformation": null,
            "description": " created Consignment 7092205107",
            "forwardReasons": [
                "consignment.created.event"
            ],
            "userId": "a42e539c-88f3-42cf-a1e7-d13e0b60833d",
            "uuid": "c589fe93-d10f-4c15-ad83-01d67ddb079f",
            "revision": 0,
            "time": 1685689736097,
            "forwardedFrom": null,
            "resourceType": "Consignment",
            "updateType": null
        },
        "uuid": "13e62765-195e-4440-a8ee-833c5ed76b95",
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
        "consigner": {
            "geoFence": null,
            "documents": [],
            "customFields": null,
            "isPortalEnabled": false,
            "type": "customer",
            "updates": null,
            "uuid": "7bce25c9-d0fb-429c-8452-885bfcff0f42",
            "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
            "firmType": "INDIVISUAL",
            "gstn": "37AAACS0326G2ZP",
            "voterId": null,
            "verificationTicketId": null,
            "group": {
                "name": "Sold-to-party",
                "partnerType": null,
                "uuid": null,
                "orgId": null
            },
            "address": "{\"address\":\"RS NO 10D.NO 75-5-7,MAIN ROAD\",\"city\":\"BHAVANIPURAM VIJAYWADA\",\"state\":\"ANDHRA PRADESH\",\"pincode\":\"520012\"}",
            "verificationStatus": "unverified",
            "externalId": "DVIJ",
            "panNumber": null,
            "aadharNo": null,
            "parentId": null,
            "places": [
                {
                    "hubId": null,
                    "boundary": [],
                    "address": null,
                    "accessibility": "private",
                    "addedBy": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "center": {
                        "latitude": 16.5061743,
                        "longitude": 80.6480153
                    },
                    "suggestedRadius": 5000,
                    "isOwned": null,
                    "centerCoordinates": [
                        80.6480153,
                        16.5061743
                    ],
                    "placeId": "103c282d-3bca-4535-8bba-b6a441a562b7",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "GOOGLE",
                    "places": [],
                    "viewport": null,
                    "district": "KRISHNA",
                    "name": "VIJAYAWADA",
                    "state": "ANDHRA PRADESH",
                    "category": "Hub",
                    "subDistrict": null,
                    "controllingBranchId": null
                }
            ],
            "route": null,
            "name": "FENA (P) LIMITED (VIJAYAWADA)",
            "location": null,
            "fretronId": null,
            "contacts": [
                {
                    "emails": [
                        "fena@vcorp.co.in"
                    ],
                    "address": null,
                    "mobileNumbers": [
                        "91000000000"
                    ],
                    "mobileNumber": null,
                    "name": "FENA (P) LIMITED (VIJAYWADA)",
                    "type": null
                }
            ],
            "status": "ACTIVE"
        },
        "lineItems": [
            {
                "itemNumber": "1",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "Box",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "3083",
                    "updates": {
                        "traceID": "c59ea2ed-aff6-4098-9654-87efbe030d74",
                        "resourceId": "bb86bc75-5125-45a0-b1a2-51ece1f4c8e2",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material FDCMB-180G(9.00KG)Rs.10 ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "773f909c-88b1-4320-af6d-f6affe615cfe",
                        "revision": null,
                        "time": 1671696172742,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "bb86bc75-5125-45a0-b1a2-51ece1f4c8e2",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "9",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "FENA DETERGENT CAKE",
                    "materialGroupId": "525ce07e-e451-41b3-8ad1-07544f6f942f",
                    "name": "FDCMB-180G(9.00KG)Rs.10",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZFIN"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_TAN"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "TAN",
                        "definitionId": null
                    }
                ],
                "externalId": "000010",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "5ddeb5bc-a3eb-4dad-b65e-c95eb680c219"
            },
            {
                "itemNumber": "2",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "Box",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "3083",
                    "updates": {
                        "traceID": "c59ea2ed-aff6-4098-9654-87efbe030d74",
                        "resourceId": "bb86bc75-5125-45a0-b1a2-51ece1f4c8e2",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material FDCMB-180G(9.00KG)Rs.10 ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "773f909c-88b1-4320-af6d-f6affe615cfe",
                        "revision": null,
                        "time": 1671696172742,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "bb86bc75-5125-45a0-b1a2-51ece1f4c8e2",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "9",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "FENA DETERGENT CAKE",
                    "materialGroupId": "525ce07e-e451-41b3-8ad1-07544f6f942f",
                    "name": "FDCMB-180G(9.00KG)Rs.10",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZFIN"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_ZTRA"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "ZTRA",
                        "definitionId": null
                    }
                ],
                "externalId": "000020",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "5a5ae2c7-be1f-42ac-a9cd-358dda7e5e61"
            },
            {
                "itemNumber": "3",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "Box",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "2710",
                    "updates": {
                        "traceID": "8c26de3a-c0e5-4c4e-a7eb-667b9f8b5796",
                        "resourceId": "ae3b5572-73b9-4b89-b9f9-c96d95b3e211",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material FDCSW-70G(7.00KG)Rs.5 ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "ca04c2b5-4bcd-418b-8c5c-a9bd4704495f",
                        "revision": null,
                        "time": 1671696129847,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "ae3b5572-73b9-4b89-b9f9-c96d95b3e211",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "7",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "FENA DETERGENT CAKE",
                    "materialGroupId": "525ce07e-e451-41b3-8ad1-07544f6f942f",
                    "name": "FDCSW-70G(7.00KG)Rs.5",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZFIN"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_TAN"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "TAN",
                        "definitionId": null
                    }
                ],
                "externalId": "000030",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "35bfabc3-14ad-45d7-85e4-bd5e5bc4535e"
            },
            {
                "itemNumber": "4",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "Box",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "2710",
                    "updates": {
                        "traceID": "8c26de3a-c0e5-4c4e-a7eb-667b9f8b5796",
                        "resourceId": "ae3b5572-73b9-4b89-b9f9-c96d95b3e211",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material FDCSW-70G(7.00KG)Rs.5 ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "ca04c2b5-4bcd-418b-8c5c-a9bd4704495f",
                        "revision": null,
                        "time": 1671696129847,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "ae3b5572-73b9-4b89-b9f9-c96d95b3e211",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "7",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "FENA DETERGENT CAKE",
                    "materialGroupId": "525ce07e-e451-41b3-8ad1-07544f6f942f",
                    "name": "FDCSW-70G(7.00KG)Rs.5",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZFIN"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_ZTRA"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "ZTRA",
                        "definitionId": null
                    }
                ],
                "externalId": "000040",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "0dbbbb1a-72fa-4748-afea-7f5d0c8a00e7"
            },
            {
                "itemNumber": "5",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "Bag",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "3282",
                    "updates": {
                        "traceID": "74ea0a76-81da-47f4-9178-99861fb9e9b3",
                        "resourceId": "5cb95834-5e11-4176-8f24-22904a82d16c",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material FDPSWGC-1KG(25KG)Rs.77 CONS OFR FDC Rs10 ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "ad5c3fb0-2d2b-48ec-a84e-f1812179ae43",
                        "revision": null,
                        "time": 1671697826479,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "5cb95834-5e11-4176-8f24-22904a82d16c",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "25",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "FENA DETERGENT PWDR",
                    "materialGroupId": "fe74c012-033b-4094-80c7-af661b593943",
                    "name": "FDPSWGC-1KG(25KG)Rs.77 CONS OFR FDC Rs10",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZFIN"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_TAN"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "TAN",
                        "definitionId": null
                    }
                ],
                "externalId": "000050",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "6fa89049-ccf2-40b5-bacc-3efb1d313033"
            },
            {
                "itemNumber": "6",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "Box",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "3077",
                    "updates": {
                        "traceID": "16ec5415-8939-4e4f-9966-b5b0f0e35960",
                        "resourceId": "be0d5450-e67b-465d-aeee-abcf79904e8e",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material FDCSW-145G(8.70KG)Rs.10 ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "fa57cee6-fcb2-411f-9048-bd68d45d1d4d",
                        "revision": null,
                        "time": 1671696168828,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "be0d5450-e67b-465d-aeee-abcf79904e8e",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "8.7",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "FENA DETERGENT CAKE",
                    "materialGroupId": "525ce07e-e451-41b3-8ad1-07544f6f942f",
                    "name": "FDCSW-145G(8.70KG)Rs.10",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZFIN"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_ZTRA"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "ZTRA",
                        "definitionId": null
                    }
                ],
                "externalId": "000060",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "c3471fd8-e855-4109-998f-56fb190e0550"
            },
            {
                "itemNumber": "7",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "Bag",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "3282",
                    "updates": {
                        "traceID": "74ea0a76-81da-47f4-9178-99861fb9e9b3",
                        "resourceId": "5cb95834-5e11-4176-8f24-22904a82d16c",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material FDPSWGC-1KG(25KG)Rs.77 CONS OFR FDC Rs10 ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "ad5c3fb0-2d2b-48ec-a84e-f1812179ae43",
                        "revision": null,
                        "time": 1671697826479,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "5cb95834-5e11-4176-8f24-22904a82d16c",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "25",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "FENA DETERGENT PWDR",
                    "materialGroupId": "fe74c012-033b-4094-80c7-af661b593943",
                    "name": "FDPSWGC-1KG(25KG)Rs.77 CONS OFR FDC Rs10",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZFIN"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_ZTRA"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "ZTRA",
                        "definitionId": null
                    }
                ],
                "externalId": "000070",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "e1e21a02-daf6-44cb-9048-183c50356bc0"
            },
            {
                "itemNumber": "8",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "Bag",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "3064",
                    "updates": {
                        "traceID": "63aff9d6-55c1-4b7f-981a-aaad4ad68b9a",
                        "resourceId": "e1eb538c-93c4-4bbe-888f-716d300e6cba",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material FDPSWGC-110G(8.80KG)Rs.10 CANVAS ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "e5c6e90b-9dfe-4e07-9fcb-ade0859e1bcc",
                        "revision": null,
                        "time": 1671697774153,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "e1eb538c-93c4-4bbe-888f-716d300e6cba",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "8.8",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "FENA DETERGENT PWDR",
                    "materialGroupId": "fe74c012-033b-4094-80c7-af661b593943",
                    "name": "FDPSWGC-110G(8.80KG)Rs.10 CANVAS",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZFIN"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_ZADD"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "ZADD",
                        "definitionId": null
                    }
                ],
                "externalId": "000080",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "35484001-3a9e-4b14-83b4-111f37c409eb"
            },
            {
                "itemNumber": "9",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "Box",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "3183",
                    "updates": {
                        "traceID": "8539f32e-e50b-420c-a6b4-91f21a378bcd",
                        "resourceId": "f8619968-cea0-4157-94b3-5cd46917e024",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material NSB-260GX3(15.60KG)Rs.65 SCRUBBER FREE ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "c36e8a12-6b7f-460d-8343-169973553410",
                        "revision": null,
                        "time": 1671698273238,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "f8619968-cea0-4157-94b3-5cd46917e024",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "15.6",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "NIP SCOURING BAR",
                    "materialGroupId": "695f8565-77a0-4918-b240-30f639f2e305",
                    "name": "NSB-260GX3(15.60KG)Rs.65 SCRUBBER FREE",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZFIN"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_TAN"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "TAN",
                        "definitionId": null
                    }
                ],
                "externalId": "000090",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "a4809b36-d59e-4955-86a5-eed24f5bde0c"
            },
            {
                "itemNumber": "10",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "Box",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "3183",
                    "updates": {
                        "traceID": "8539f32e-e50b-420c-a6b4-91f21a378bcd",
                        "resourceId": "f8619968-cea0-4157-94b3-5cd46917e024",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material NSB-260GX3(15.60KG)Rs.65 SCRUBBER FREE ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "c36e8a12-6b7f-460d-8343-169973553410",
                        "revision": null,
                        "time": 1671698273238,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "f8619968-cea0-4157-94b3-5cd46917e024",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "15.6",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "NIP SCOURING BAR",
                    "materialGroupId": "695f8565-77a0-4918-b240-30f639f2e305",
                    "name": "NSB-260GX3(15.60KG)Rs.65 SCRUBBER FREE",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZFIN"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_ZTRA"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "ZTRA",
                        "definitionId": null
                    }
                ],
                "externalId": "000100",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "6359d51a-780e-48f8-9370-47a6323fa0ee"
            },
            {
                "itemNumber": "11",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "Box",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "3185",
                    "updates": {
                        "traceID": "3c6978bc-d6c3-4fb4-8f5b-a85036868894",
                        "resourceId": "645cad9f-c5b6-4b00-96af-1c334a231e8f",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material NSB-135G(9.45KG)Rs.10 ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "5a9872eb-a0ab-4ed0-90b6-eec988324aac",
                        "revision": null,
                        "time": 1671698274568,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "645cad9f-c5b6-4b00-96af-1c334a231e8f",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "9.45",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "NIP SCOURING BAR",
                    "materialGroupId": "695f8565-77a0-4918-b240-30f639f2e305",
                    "name": "NSB-135G(9.45KG)Rs.10",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZFIN"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_TAN"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "TAN",
                        "definitionId": null
                    }
                ],
                "externalId": "000110",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "56a7d21c-57a9-4c6c-8887-bb06679fe6e4"
            },
            {
                "itemNumber": "12",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "Box",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "3185",
                    "updates": {
                        "traceID": "3c6978bc-d6c3-4fb4-8f5b-a85036868894",
                        "resourceId": "645cad9f-c5b6-4b00-96af-1c334a231e8f",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material NSB-135G(9.45KG)Rs.10 ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "5a9872eb-a0ab-4ed0-90b6-eec988324aac",
                        "revision": null,
                        "time": 1671698274568,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "645cad9f-c5b6-4b00-96af-1c334a231e8f",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "9.45",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "NIP SCOURING BAR",
                    "materialGroupId": "695f8565-77a0-4918-b240-30f639f2e305",
                    "name": "NSB-135G(9.45KG)Rs.10",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZFIN"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_ZTRA"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "ZTRA",
                        "definitionId": null
                    }
                ],
                "externalId": "000120",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "a54c1579-fc88-4a3b-9c50-202faa43f663"
            },
            {
                "itemNumber": "13",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "Box",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "3185",
                    "updates": {
                        "traceID": "3c6978bc-d6c3-4fb4-8f5b-a85036868894",
                        "resourceId": "645cad9f-c5b6-4b00-96af-1c334a231e8f",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material NSB-135G(9.45KG)Rs.10 ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "5a9872eb-a0ab-4ed0-90b6-eec988324aac",
                        "revision": null,
                        "time": 1671698274568,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "645cad9f-c5b6-4b00-96af-1c334a231e8f",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "9.45",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "NIP SCOURING BAR",
                    "materialGroupId": "695f8565-77a0-4918-b240-30f639f2e305",
                    "name": "NSB-135G(9.45KG)Rs.10",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZFIN"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_ZADD"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "ZADD",
                        "definitionId": null
                    }
                ],
                "externalId": "000130",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "6d04a535-eb2e-4670-80eb-201837ab4d3a"
            },
            {
                "itemNumber": "14",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "Box",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "3271",
                    "updates": {
                        "traceID": "e8a0f1ca-0e35-4446-be1e-3167b1fa1bec",
                        "resourceId": "1eb5f7eb-4baf-4935-a022-a6a64a6d72e4",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material NSB-65G(13KG)Rs.5 ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "5dc17f62-8ac6-4961-825c-e7f792abb373",
                        "revision": null,
                        "time": 1671698277546,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "1eb5f7eb-4baf-4935-a022-a6a64a6d72e4",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "13",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "NIP SCOURING BAR",
                    "materialGroupId": "695f8565-77a0-4918-b240-30f639f2e305",
                    "name": "NSB-65G(13KG)Rs.5",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZFIN"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_TAN"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "TAN",
                        "definitionId": null
                    }
                ],
                "externalId": "000140",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "4f6bca96-6a45-4891-9c55-b598766e8259"
            },
            {
                "itemNumber": "15",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "Box",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "3271",
                    "updates": {
                        "traceID": "e8a0f1ca-0e35-4446-be1e-3167b1fa1bec",
                        "resourceId": "1eb5f7eb-4baf-4935-a022-a6a64a6d72e4",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material NSB-65G(13KG)Rs.5 ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "5dc17f62-8ac6-4961-825c-e7f792abb373",
                        "revision": null,
                        "time": 1671698277546,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "1eb5f7eb-4baf-4935-a022-a6a64a6d72e4",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "13",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "NIP SCOURING BAR",
                    "materialGroupId": "695f8565-77a0-4918-b240-30f639f2e305",
                    "name": "NSB-65G(13KG)Rs.5",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZFIN"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_ZTRA"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "ZTRA",
                        "definitionId": null
                    }
                ],
                "externalId": "000150",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "b50fe1ce-61a8-443b-8633-7b147d9e9a30"
            },
            {
                "itemNumber": "16",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "Box",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "3271",
                    "updates": {
                        "traceID": "e8a0f1ca-0e35-4446-be1e-3167b1fa1bec",
                        "resourceId": "1eb5f7eb-4baf-4935-a022-a6a64a6d72e4",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material NSB-65G(13KG)Rs.5 ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "5dc17f62-8ac6-4961-825c-e7f792abb373",
                        "revision": null,
                        "time": 1671698277546,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "1eb5f7eb-4baf-4935-a022-a6a64a6d72e4",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "13",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "NIP SCOURING BAR",
                    "materialGroupId": "695f8565-77a0-4918-b240-30f639f2e305",
                    "name": "NSB-65G(13KG)Rs.5",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZFIN"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_ZADD"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "ZADD",
                        "definitionId": null
                    }
                ],
                "externalId": "000160",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "1f152aaf-155c-4fb7-9a37-0493d2dc9b31"
            },
            {
                "itemNumber": "17",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "items",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "406580",
                    "updates": {
                        "traceID": "c1330bb0-c29b-48c1-8865-7fdbdf9a13f9",
                        "resourceId": "1e36773b-fc1b-44bf-b095-d3b4193efa44",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material PLASTIC RECTNGLAR CONTAINR.2 LTR-FIWP(P) ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "8f523127-64dd-46de-9cc5-10dabd22bd05",
                        "revision": null,
                        "time": 1671693844968,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "1e36773b-fc1b-44bf-b095-d3b4193efa44",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "0.001",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "IMPACT DETERGENT PDR",
                    "materialGroupId": "4f3ec348-f8eb-4571-9911-4806df0b1f55",
                    "name": "PLASTIC RECTNGLAR CONTAINR.2 LTR-FIWP(P)",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZASP"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_ZADD"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "ZADD",
                        "definitionId": null
                    }
                ],
                "externalId": "000170",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "c06c812d-44b2-4631-a84f-647474889b7b"
            },
            {
                "itemNumber": "18",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "items",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "406068",
                    "updates": {
                        "traceID": "9117f8e0-c19f-40de-8e7b-e54574a7fade",
                        "resourceId": "722f57cd-118d-4d41-aede-210a4bab4bc6",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material FDCMBP STP 9.5X19.5(50PC) -TELEGU ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "b6b35363-55d5-49a6-aea2-77e95708f52a",
                        "revision": null,
                        "time": 1671692406245,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "722f57cd-118d-4d41-aede-210a4bab4bc6",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "0.001",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "FENA DETERGENT CAKE",
                    "materialGroupId": "525ce07e-e451-41b3-8ad1-07544f6f942f",
                    "name": "FDCMBP STP 9.5X19.5(50PC) -TELEGU",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZASP"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_ZTNN"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "ZTNN",
                        "definitionId": null
                    }
                ],
                "externalId": "000180",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "31cb8bab-89c4-40e0-9572-35613080d932"
            },
            {
                "itemNumber": "19",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "items",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "406715",
                    "updates": {
                        "traceID": "02e2e98e-ba9c-48c7-baf8-91fb560b3bbb",
                        "resourceId": "0056cb11-b1dc-4225-a747-cce65805b779",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material FENA RS STICKER 4.553X9.333 ENGLISH (A) ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "6d7852e8-6a3b-4821-bce7-82256eb393ba",
                        "revision": null,
                        "time": 1671692272915,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "0056cb11-b1dc-4225-a747-cce65805b779",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "0.001",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "FENA COMBINED",
                    "materialGroupId": "3961d9e1-e041-4892-90d0-8525bc79b82e",
                    "name": "FENA RS STICKER 4.553X9.333 ENGLISH (A)",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZASP"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_ZTNN"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "ZTNN",
                        "definitionId": null
                    }
                ],
                "externalId": "000210",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "6ead93f7-8ca1-4afd-a195-6eb9dfdbc406"
            },
            {
                "itemNumber": "20",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "Units",
                    "measuredQuantity": 0.001,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "406864",
                    "updates": {
                        "traceID": "5f79cb94-1915-420f-aac7-133e3eaeaaea",
                        "resourceId": "936f2436-6960-4c59-8cec-fc32c8abf9bc",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material FDCSWP RS. 20 STRIP POSTER TELUGU ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "a42e539c-88f3-42cf-a1e7-d13e0b60833d",
                        "uuid": "9035eb7d-6249-42c3-9a6e-d1b90515c35e",
                        "revision": null,
                        "time": 1677841999457,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "936f2436-6960-4c59-8cec-fc32c8abf9bc",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": null,
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "FENA DETERGENT CAKE",
                    "materialGroupId": "525ce07e-e451-41b3-8ad1-07544f6f942f",
                    "name": "FDCSWP RS. 20 STRIP POSTER TELUGU",
                    "measurementType": "package",
                    "partnerId": null,
                    "linkedMaterialId": "ZASP"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_ZTNN"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "ZTNN",
                        "definitionId": null
                    }
                ],
                "externalId": "000230",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "258e7974-6b33-4894-bf9c-577fee9dc961"
            },
            {
                "itemNumber": "21",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "Units",
                    "measuredQuantity": 0.001,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "406867",
                    "updates": {
                        "traceID": "86815741-411f-43ad-919e-cf4a6c6363f5",
                        "resourceId": "198f17d2-8c8f-4641-a320-a859e3670d0f",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material FDCMBP RS. 15 STRIP POSTER TELUGU ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "a42e539c-88f3-42cf-a1e7-d13e0b60833d",
                        "uuid": "d62c2a75-9f60-43cb-ac4d-ba9558fef596",
                        "revision": null,
                        "time": 1677842008943,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "198f17d2-8c8f-4641-a320-a859e3670d0f",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": null,
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "FENA DETERGENT CAKE",
                    "materialGroupId": "525ce07e-e451-41b3-8ad1-07544f6f942f",
                    "name": "FDCMBP RS. 15 STRIP POSTER TELUGU",
                    "measurementType": "package",
                    "partnerId": null,
                    "linkedMaterialId": "ZASP"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_ZTNN"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "ZTNN",
                        "definitionId": null
                    }
                ],
                "externalId": "000240",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "73f3f0c5-ce58-434e-a02c-9af17ca0c853"
            },
            {
                "itemNumber": "22",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "Bag",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "3251",
                    "updates": {
                        "traceID": "3c7c9c0a-60bb-428b-823d-08de2e077c86",
                        "resourceId": "1bdf493d-9c35-4e80-a87e-e2dd6cdd8a4f",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material FIWP-1KG(12KG)RS165CONS.OFR2LTR.CNTNR ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "7f828c67-27e4-464b-bae9-0cff438ed22c",
                        "revision": null,
                        "time": 1671698083799,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "1bdf493d-9c35-4e80-a87e-e2dd6cdd8a4f",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "12",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "Impact Dtrgnt Pwdr",
                    "materialGroupId": "6008ed1f-874d-4545-96e5-04b3e8719a65",
                    "name": "FIWP-1KG(12KG)RS165CONS.OFR2LTR.CNTNR",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZFIN"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_TAN"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "TAN",
                        "definitionId": null
                    }
                ],
                "externalId": "000250",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "c3cf4a84-55e2-41fd-8a40-d3e8f02b048b"
            },
            {
                "itemNumber": "23",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "Bag",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "2825",
                    "updates": {
                        "traceID": "79d4ca27-5563-4fcf-af06-49fe5a014e36",
                        "resourceId": "f56f7695-2e02-4eb6-8681-48c1670c3c80",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material FIWP-500G(13KG)Rs.65 (TP-24+2PC) ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "4a1e1a20-6ae2-4084-ad00-16e0acb57599",
                        "revision": null,
                        "time": 1671698044215,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "f56f7695-2e02-4eb6-8681-48c1670c3c80",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "13",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "Impact Dtrgnt Pwdr",
                    "materialGroupId": "6008ed1f-874d-4545-96e5-04b3e8719a65",
                    "name": "FIWP-500G(13KG)Rs.65 (TP-24+2PC)",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZFIN"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_TAN"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "TAN",
                        "definitionId": null
                    }
                ],
                "externalId": "000260",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "9a8c8161-83f9-46ff-ab44-13aa4a710cb2"
            },
            {
                "itemNumber": "24",
                "transportationServiceId": null,
                "material": {
                    "unitOfMeasurement": "Box",
                    "measuredQuantity": null,
                    "partnerName": null,
                    "materialType": "Material",
                    "externalId": "3018",
                    "updates": {
                        "traceID": "5a345c37-b736-40c8-b70f-fccdf68a162f",
                        "resourceId": "9b062624-ae80-4124-b0e3-d18d0627037e",
                        "updatedBy": "USER",
                        "changes": null,
                        "sourceOfInformation": null,
                        "description": "Added material NSB-100GX4(9.60KG)Rs.30 ",
                        "forwardReasons": [
                            "material.created.event"
                        ],
                        "userId": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                        "uuid": "715f32f6-2e5c-43c5-92a2-00b268d08e70",
                        "revision": null,
                        "time": 1671698266523,
                        "forwardedFrom": null,
                        "resourceType": "Material",
                        "updateType": null
                    },
                    "taxCode": null,
                    "uuid": "9b062624-ae80-4124-b0e3-d18d0627037e",
                    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "pricePerUnit": null,
                    "materialDescription": "9.6",
                    "division": null,
                    "controlCode": null,
                    "materialGroup": "NIP SCOURING BAR",
                    "materialGroupId": "695f8565-77a0-4918-b240-30f639f2e305",
                    "name": "NSB-100GX4(9.60KG)Rs.30",
                    "measurementType": "Package",
                    "partnerId": null,
                    "linkedMaterialId": "ZFIN"
                },
                "valueOfGoods": null,
                "customFields": [
                    {
                        "indexedValue": [
                            "Item Category_TANN"
                        ],
                        "fieldKey": "Item Category",
                        "valueType": "string",
                        "fieldType": "string",
                        "value": "TANN",
                        "definitionId": null
                    }
                ],
                "externalId": "000280",
                "invoiceNo": null,
                "customerMaterial": null,
                "uuid": "3d96fc5b-3bb8-4a6e-9c9d-c3d9e1a7d073"
            }
        ],
        "pssNo": null,
        "eWayBillNumber": "101652697955",
        "billingType": null,
        "podDocument": null,
        "invoiceNo": "7092205107",
        "deliveryDate": null,
        "associatedShipments": [],
        "originalEdd": null,
        "consignee": {
            "geoFence": null,
            "documents": [],
            "customFields": [],
            "isPortalEnabled": false,
            "type": "customer",
            "updates": {
                "traceID": "82a5bef3-7e0f-4fbf-b5c5-c3b2c2f78a1a",
                "resourceId": "4e9dedd7-5b8e-405b-89e0-65a6d6f68524",
                "updatedBy": "USER",
                "changes": [
                    {
                        "lastValue": "",
                        "fieldName": "Contact",
                        "fieldType": "String",
                        "currentValue": "Name: SRI VIJAYA DURGA AGENCIES| Mobile Numbers: 8555804189| Emails: null"
                    }
                ],
                "sourceOfInformation": null,
                "description": "contact added",
                "forwardReasons": [
                    "business.partner.update.event",
                    "business.partner.contacts.update"
                ],
                "userId": "7d6539ac-5dd0-48d4-80d7-251fbdb86158",
                "uuid": "6d6702b7-3eb2-4707-80b5-64f17befe983",
                "revision": null,
                "time": 1671733083295,
                "forwardedFrom": null,
                "resourceType": "Business-Partner",
                "updateType": null
            },
            "uuid": "4e9dedd7-5b8e-405b-89e0-65a6d6f68524",
            "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
            "firmType": "INDIVISUAL",
            "gstn": "37FEUPS6923D1ZT",
            "voterId": null,
            "verificationTicketId": null,
            "group": {
                "name": "Sold-to-party",
                "partnerType": "customer",
                "uuid": "125e674b-69e1-4c01-bb7b-ddf84f9ff883",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            },
            "address": "{\"pincode\":521001,\"address\":\"18/237, SUKARLABAD\",\"city\":\"MACHILIPATNAM\",\"state\":\"KRISHNA\"}",
            "verificationStatus": "unverified",
            "externalId": "2007271",
            "panNumber": "FEUPS6923D",
            "aadharNo": null,
            "parentId": null,
            "places": [
                {
                    "hubId": null,
                    "boundary": [],
                    "address": null,
                    "accessibility": "private",
                    "addedBy": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
                    "center": {
                        "latitude": 16.1808917,
                        "longitude": 81.1302716
                    },
                    "suggestedRadius": 5000,
                    "isOwned": null,
                    "centerCoordinates": [
                        81.1302716,
                        16.1808917
                    ],
                    "placeId": "22a15b31-bed5-497a-88d8-1c7962acd7f4",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "GOOGLE",
                    "places": [
                        {
                            "hubId": "22a15b31-bed5-497a-88d8-1c7962acd7f4",
                            "boundary": null,
                            "address": "18/237, SUKARLABAD",
                            "accessibility": "public",
                            "addedBy": "e6cbf9d6-3249-450d-a36f-235e2d6d9a0a",
                            "center": {
                                "latitude": 16.1808917,
                                "longitude": 81.1302716
                            },
                            "suggestedRadius": 5000,
                            "isOwned": false,
                            "centerCoordinates": [
                                81.1302716,
                                16.1808917
                            ],
                            "placeId": "f454693b-c7c1-48bd-baa1-4efdc6b94465",
                            "geoJsonBoundry": null,
                            "externalId": null,
                            "source": "FRETRON",
                            "places": null,
                            "viewport": null,
                            "district": null,
                            "name": "MACHILIPATNAM",
                            "state": null,
                            "category": "Unloading Point",
                            "subDistrict": null,
                            "controllingBranchId": null
                        }
                    ],
                    "viewport": null,
                    "district": "KRISHNA",
                    "name": "MACHILIPATNAM",
                    "state": "ANDHRA PRADESH",
                    "category": "Hub",
                    "subDistrict": null,
                    "controllingBranchId": null
                }
            ],
            "route": null,
            "name": "SRI VIJAYA DURGA AGENCIES",
            "location": null,
            "fretronId": null,
            "contacts": [
                {
                    "emails": [
                        "null"
                    ],
                    "address": null,
                    "mobileNumbers": [
                        "8555804189"
                    ],
                    "mobileNumber": null,
                    "name": "SRI VIJAYA DURGA AGENCIES",
                    "type": null
                }
            ],
            "status": "ACTIVE"
        },
        "address": null,
        "edd": null,
        "salesOffice": {
            "address": "BHAVANIPURAM VIJAYWADA",
            "updatedBy": null,
            "customFields": [
                {
                    "indexedValue": [
                        "FCM_GSTN_37AAACS0326G2ZP"
                    ],
                    "fieldKey": "FCM_GSTN",
                    "valueType": "string",
                    "fieldType": "text",
                    "value": "37AAACS0326G2ZP",
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
                        "STATE_NAME_ANDHRA PRADESH"
                    ],
                    "fieldKey": "STATE_NAME",
                    "valueType": "string",
                    "fieldType": "text",
                    "value": "ANDHRA PRADESH",
                    "definitionId": null
                }
            ],
            "regionName": "BHAVANIPURAM VIJAYWADA",
            "externalId": "DVIJ",
            "branchName": null,
            "type": [
                "Operation",
                "Sales"
            ],
            "updates": null,
            "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c",
            "areaId": null,
            "geoLocation": null,
            "regionId": null,
            "areaName": null,
            "name": "FENA (P) LIMITED-VIJAYAWADA",
            "zoneId": null,
            "_id": "afd63577-dc3d-4030-8f4f-c02868736ddc",
            "zoneName": null,
            "contacts": [
                {
                    "emails": [
                        ""
                    ],
                    "address": null,
                    "mobileNumbers": [
                        ""
                    ],
                    "mobileNumber": null,
                    "name": "",
                    "type": null
                }
            ],
            "officeType": null,
            "materialServices": null
        },
        "consignmentDate": 1685644200000,
        "externalId": "7092205107",
        "eWayBillExpiryDate": 1685730600000,
        "activeShipment": null,
        "consignmentNo": "7092205107",
        "currentLocation": null,
        "billToParty": null,
        "equipments": null,
        "orderMappings": [
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 6,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Box",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.054,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "12337dca-bbe2-4e41-a979-8d5bd26e96a2",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "5ddeb5bc-a3eb-4dad-b65e-c95eb680c219",
                "source": null,
                "containerId": null,
                "uuid": "1f2972e7-f35c-44de-aa05-2ab733a3030f",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 1,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Box",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.009,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "bf45843d-2f04-44b5-b821-aadc6e537546",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "5a5ae2c7-be1f-42ac-a9cd-358dda7e5e61",
                "source": null,
                "containerId": null,
                "uuid": "3ceb697c-c102-4a40-990c-49eedff0eeb6",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 12,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Box",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.084,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "bf13cf37-b753-41a4-ad05-b5043a15474f",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "35bfabc3-14ad-45d7-85e4-bd5e5bc4535e",
                "source": null,
                "containerId": null,
                "uuid": "2b989642-ee8f-439f-93f5-2cde2c14dd01",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 2,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Box",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.014,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "1c188cb6-6b22-4b6f-9d3b-53807fc703ef",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "0dbbbb1a-72fa-4748-afea-7f5d0c8a00e7",
                "source": null,
                "containerId": null,
                "uuid": "30f47967-ab14-4b81-a49f-dc5b5132197b",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 11,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Bag",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.275,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "44707068-b71d-40d5-876c-b8eb7a071f84",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "6fa89049-ccf2-40b5-bacc-3efb1d313033",
                "source": null,
                "containerId": null,
                "uuid": "8f03c041-acd0-4d13-9fd4-3ce1af32a5a8",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 5,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Box",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.0435,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "cd157e0c-976f-4473-991a-83b644e98e70",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "c3471fd8-e855-4109-998f-56fb190e0550",
                "source": null,
                "containerId": null,
                "uuid": "b52c8325-82ff-4016-8479-c580098c684e",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 1,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Bag",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.025,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "3cd29d5e-5a96-4fe6-843f-ef8f2d0adeb9",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "e1e21a02-daf6-44cb-9048-183c50356bc0",
                "source": null,
                "containerId": null,
                "uuid": "6c804f97-9377-471d-9759-66392a0fea93",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 1,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Bag",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.0088,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "af2195f0-ade3-47e5-a926-562ff014f522",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "35484001-3a9e-4b14-83b4-111f37c409eb",
                "source": null,
                "containerId": null,
                "uuid": "41ca722a-34b9-47fe-ad7d-5fc3c1517ad1",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 8,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Box",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.1248,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "d92a21fb-e7f0-4146-ae57-504981258b06",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "a4809b36-d59e-4955-86a5-eed24f5bde0c",
                "source": null,
                "containerId": null,
                "uuid": "d58def93-ca4d-4453-b8b7-044314ea1662",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 2,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Box",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.0312,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "1324ef08-8c03-4ee7-813c-19e533448385",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "6359d51a-780e-48f8-9370-47a6323fa0ee",
                "source": null,
                "containerId": null,
                "uuid": "0b86a654-b528-4768-9ee9-cedc74cf9f02",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 8,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Box",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.0756,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "13b6f9a5-3682-4b30-ae94-8bebda1a67c5",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "56a7d21c-57a9-4c6c-8887-bb06679fe6e4",
                "source": null,
                "containerId": null,
                "uuid": "da99317f-3ce9-4f12-8eff-1aeba4d657b3",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 1,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Box",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.00945,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "dd62c0d1-c225-4007-b435-257f1683cc01",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "a54c1579-fc88-4a3b-9c50-202faa43f663",
                "source": null,
                "containerId": null,
                "uuid": "00289581-f3d0-4bfb-ab62-c63a80dfc5af",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 1,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Box",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.00945,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "a690b162-5eaf-4862-8be6-b43da6a022b1",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "6d04a535-eb2e-4670-80eb-201837ab4d3a",
                "source": null,
                "containerId": null,
                "uuid": "a22666eb-3e9a-46fb-b7e4-5a8300a81fa9",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 16,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Box",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.208,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "b81aedcf-742e-44d9-bd6d-872fc8c8b3d7",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "4f6bca96-6a45-4891-9c55-b598766e8259",
                "source": null,
                "containerId": null,
                "uuid": "97ed03eb-7fea-4dce-a1a5-0689599a149d",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 2,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Box",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.026,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "ee8c46d7-79f9-435e-85d9-fa0844659aa5",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "b50fe1ce-61a8-443b-8633-7b147d9e9a30",
                "source": null,
                "containerId": null,
                "uuid": "9e291c4d-a777-4bfc-a856-58c12988d3f7",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 2,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Box",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.026,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "a7473e14-09f0-4a25-9848-2efcafe22afc",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "1f152aaf-155c-4fb7-9a37-0493d2dc9b31",
                "source": null,
                "containerId": null,
                "uuid": "12eed0fc-4939-4b53-bda5-8b41da3dad55",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 48,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Units",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.000048,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "daeb3f72-fc53-413e-87b0-845fccb6d33f",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "c06c812d-44b2-4631-a84f-647474889b7b",
                "source": null,
                "containerId": null,
                "uuid": "ef53b8ca-afcb-481c-b089-dfc92922d9ab",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 100,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Units",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.0001,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "9a821e7f-11e9-403c-b85a-42624fd1df62",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "31cb8bab-89c4-40e0-9572-35613080d932",
                "source": null,
                "containerId": null,
                "uuid": "83883f52-6431-4600-aa16-2e4f124df8d4",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 50,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Units",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.00005,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "3458301f-39ac-433c-9da8-43f78236b520",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "6ead93f7-8ca1-4afd-a195-6eb9dfdbc406",
                "source": null,
                "containerId": null,
                "uuid": "9cb62d25-f4d5-477b-9f93-10b1c0ec4b93",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 50,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Units",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.00005,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "c1f8383e-fdb8-4862-94fc-5744131e1288",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "258e7974-6b33-4894-bf9c-577fee9dc961",
                "source": null,
                "containerId": null,
                "uuid": "82362e62-a328-48d7-a24a-8a3af35226b6",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 50,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Units",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.00005,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "a329f820-3bd6-497d-8035-3c76586fb0c5",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "73f3f0c5-ce58-434e-a02c-9af17ca0c853",
                "source": null,
                "containerId": null,
                "uuid": "7cf6d055-094f-49c5-b9f3-ce79f9343adb",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 3,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Bag",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.036,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "eb4e92f2-edd9-4930-aab3-8bc63a5995b7",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "c3cf4a84-55e2-41fd-8a40-d3e8f02b048b",
                "source": null,
                "containerId": null,
                "uuid": "9ce77a50-0789-4855-b505-de821ee500c9",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 2,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Bag",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.026,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "4024a10b-a56d-4751-9825-b8d238861028",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "9a8c8161-83f9-46ff-ab44-13aa4a710cb2",
                "source": null,
                "containerId": null,
                "uuid": "21bd5b5c-35e6-44b6-a1de-8eb903c70742",
                "fuMappings": null
            },
            {
                "quantity": {
                    "volume": null,
                    "packageMeasurement": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 3,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Units",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": "Box",
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "density": null,
                        "netQuantity": 0.0288,
                        "moisture": null,
                        "claimQuantity": null,
                        "unitOfMeasurment": "Metric Tonnes",
                        "standardQuantity": null,
                        "actualLoadedQuantity": null,
                        "measurmentType": null,
                        "grossQuantity": null,
                        "shortage": null,
                        "temperature": null,
                        "plannedLoadQuantity": null,
                        "frieghtDeductableQuantity": null
                    },
                    "containers": null,
                    "trucks": null
                },
                "orderId": "d7811740-9b2c-402d-9be1-a05db45fa80b",
                "lineItemId": "2d7a07d9-7591-4c78-aee9-907a41f3f771",
                "legType": null,
                "consignmentId": null,
                "originLegId": null,
                "isFullyUtilized": null,
                "consignmentLineItemId": "3d96fc5b-3bb8-4a6e-9c9d-c3d9e1a7d073",
                "source": null,
                "containerId": null,
                "uuid": "9e991ec4-4595-4587-97ce-4b819af7e0c3",
                "fuMappings": null
            }
        ],
        "contractId": null,
        "workOrderNumber": null,
        "trackingStatus": "Planned",
        "eWayBillRegistrationDate": 1685644200000,
        "contractToParty": null,
        "invoiceStatus": null,
        "poNumber": null,
        "status": "Planned"
    },
    "shipments": []
}

async function getPlantName() {
    let cosignment = $event?.consginee
    var plantNameFound = false
    let plantName = ""
    if (cosignment?.consignee?.address?.city) {
        plantName = consginee?.consignee?.address?.city
        plantNameFound = true
    }
    else if (!plantNameFound && !plantName) {


    }
}