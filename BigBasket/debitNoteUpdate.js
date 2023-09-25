const rp = require("request-promise")


async function putDebitNote(payload) {
    try {
        let url = ``
        let res = await rp({
            url: url,
            method: "PUT",
            json: true,
            body: payload
        })
    }
    catch (e) {
        console.log(`error in putDebitNote ${e.message}`)
    }
}

async function main() {
    let data = [
        {
            "_id": "a10865bd-7a8b-4e30-a029-ebec4dbbaaae",
            "uuid": "a10865bd-7a8b-4e30-a029-ebec4dbbaaae",
            "vendor": {
                "uuid": "33bc97d8-2daf-43a3-965c-152612791b25",
                "name": "RV LOG",
                "orgId": "823947a3-02c0-4e65-8f4e-21da370ea6cd",
                "fretronId": null,
                "geoFence": null,
                "places": [
                    {
                        "name": "VISAKHAPATNAM",
                        "address": null,
                        "category": "Hub",
                        "center": {
                            "latitude": 18.005493415455902,
                            "longitude": 82.58898921105212
                        },
                        "centerCoordinates": [
                            82.58898921105212,
                            18.005493415455902
                        ],
                        "suggestedRadius": 0,
                        "viewport": null,
                        "source": "GOOGLE",
                        "addedBy": "823947a3-02c0-4e65-8f4e-21da370ea6cd",
                        "placeId": "8e2b3abc-235c-4960-9669-d869a19f21a0",
                        "externalId": null,
                        "hubId": null,
                        "state": "Andhra Pradesh",
                        "district": "Vishakhapatnam",
                        "subDistrict": null,
                        "boundary": [
                            [
                                [
                                    82.33287133931647,
                                    18.1497984112857
                                ],
                                [
                                    82.3823361643298,
                                    17.731633253327285
                                ],
                                [
                                    83.0693476228482,
                                    17.726399957341695
                                ],
                                [
                                    82.82751958944972,
                                    18.269837044039118
                                ],
                                [
                                    82.33287133931647,
                                    18.1497984112857
                                ]
                            ]
                        ],
                        "places": [
                            {
                                "name": "Visakhapatnam",
                                "address": ",Visakhapatnam,Andhra Pradesh,India,in",
                                "category": null,
                                "center": {
                                    "latitude": 17.89937045,
                                    "longitude": 82.56422005952356
                                },
                                "centerCoordinates": [
                                    82.56422005952356,
                                    17.89937045
                                ],
                                "suggestedRadius": 1000,
                                "viewport": null,
                                "source": "GOOGLE",
                                "addedBy": null,
                                "placeId": "R2022111",
                                "externalId": null,
                                "hubId": null,
                                "state": null,
                                "district": null,
                                "subDistrict": null,
                                "boundary": null,
                                "places": null,
                                "accessibility": null,
                                "isOwned": null,
                                "geoJsonBoundry": null,
                                "controllingBranchId": null
                            }
                        ],
                        "accessibility": "private",
                        "isOwned": null,
                        "geoJsonBoundry": null,
                        "controllingBranchId": null
                    }
                ],
                "contacts": [
                    {
                        "name": "SANDEEP TURI",
                        "mobileNumber": null,
                        "address": null,
                        "emails": [
                            "sandeepkumar81367@gmail.com"
                        ],
                        "mobileNumbers": [
                            "9162799016"
                        ],
                        "type": null
                    },
                    {
                        "name": "UTTAM KUMAR ",
                        "mobileNumber": null,
                        "address": null,
                        "emails": [
                            "globalpatratu@gmail.com"
                        ],
                        "mobileNumbers": [
                            "7858986909"
                        ],
                        "type": null
                    },
                    {
                        "name": "VIKASH KUMAR",
                        "mobileNumber": null,
                        "address": null,
                        "emails": [
                            "vikashkumar271002@gmail.com"
                        ],
                        "mobileNumbers": [
                            "6209456337"
                        ],
                        "type": null
                    },
                    {
                        "name": "RIZVI ALAM",
                        "mobileNumber": null,
                        "address": null,
                        "emails": [
                            "rickykhanrizvi584@gmail.com"
                        ],
                        "mobileNumbers": [
                            "9931937947"
                        ],
                        "type": null
                    },
                    {
                        "name": "SANTOSH KUMAR",
                        "mobileNumber": null,
                        "address": null,
                        "emails": [],
                        "mobileNumbers": [
                            "8603459581"
                        ],
                        "type": null
                    },
                    {
                        "name": "SANDEEP TURI",
                        "mobileNumber": null,
                        "address": null,
                        "emails": [
                            "sandeepkumar81367@gmail.com"
                        ],
                        "mobileNumbers": [
                            "9162799016"
                        ],
                        "type": null
                    },
                    {
                        "name": "ROSHAN",
                        "mobileNumber": null,
                        "address": null,
                        "emails": [
                            "roshan77640@gmail.com"
                        ],
                        "mobileNumbers": [
                            "7764024700"
                        ],
                        "type": null
                    }
                ],
                "location": null,
                "type": "vendor",
                "isPortalEnabled": true,
                "address": "{\"address\":\"NEAR IOC PETROL PUMP\",\"pincode\":\"829143\",\"state\":\"JHARKHAND\",\"city\":\"BALKUDARA, RAMGARH\"}",
                "externalId": "63359",
                "updates": {
                    "forwardReasons": [
                        "business.partner.update.event",
                        "business.partner.custom.field"
                    ],
                    "updatedBy": "SYSTEM",
                    "userId": null,
                    "time": 1689314295564,
                    "resourceType": "Business-Partner",
                    "resourceId": "33bc97d8-2daf-43a3-965c-152612791b25",
                    "sourceOfInformation": null,
                    "updateType": null,
                    "description": "updated field totalPlacementPendingV2",
                    "forwardedFrom": null,
                    "uuid": "ab000969-c6ba-4e15-a530-2f37fddacbdf",
                    "revision": null,
                    "traceID": "308096ce-fb45-470d-86fd-c3d2b04ac944",
                    "changes": [
                        {
                            "currentValue": "236",
                            "fieldName": "totalPlacementPendingV2",
                            "lastValue": "237",
                            "fieldType": "String"
                        }
                    ]
                },
                "status": "ACTIVE",
                "panNumber": null,
                "group": {
                    "partnerType": "vendor",
                    "name": "lorryOwner",
                    "uuid": "41a6080f-6a86-4f64-82aa-5fa48e7e670b",
                    "orgId": "823947a3-02c0-4e65-8f4e-21da370ea6cd"
                },
                "route": null,
                "customFields": [
                    {
                        "fieldType": "text",
                        "fieldKey": "totalPlacementPendingV2",
                        "value": "236",
                        "multiple": false,
                        "isRemark": false,
                        "remark": null,
                        "required": false,
                        "description": null,
                        "options": null,
                        "indexedValue": [
                            "totalPlacementPendingV2_236"
                        ],
                        "valueType": "String",
                        "input": "String",
                        "unit": null,
                        "accessType": null,
                        "uuid": null
                    }
                ],
                "parentId": null,
                "gstn": null,
                "aadharNo": null,
                "voterId": null,
                "documents": [],
                "verificationStatus": "verified",
                "firmType": "INDIVISUAL",
                "verificationTicketId": null,
                "companyCodes": null
            },
            "debitNoteNumber": "JSPL/PATRATU/CN000007",
            "reference": null,
            "date": 1689316398415,
            "lineItems": [
                {
                    "documentType": "SHIPMENT",
                    "documentId": "165a52d9-e26e-4308-bce6-e32209a9b202",
                    "documentName": "FRETSH000005870",
                    "account": {
                        "uuid": "ae6e58b3-473b-4f63-aa72-11ba4c1d49bd",
                        "name": "Other Expense",
                        "accountGroup": "Expense",
                        "type": "Other Expense",
                        "accountPath": [
                            "Expense",
                            "Other Expense",
                            "ae6e58b3-473b-4f63-aa72-11ba4c1d49bd"
                        ]
                    },
                    "rate": 1,
                    "amount": 1,
                    "quantity": 1,
                    "rateUnit": "perVehicle",
                    "chargeName": "ODC RTO Fine",
                    "chargeId": "7ec04049-a025-4a79-a8eb-66763641c52c",
                    "shipmentCostId": "702dfc29-71b2-4133-a181-31f19d52dec3",
                    "uuid": "9f3bd486-36ef-435b-8f91-0f4442e3a1ce",
                    "customFields": []
                }
            ],
            "status": "Open",
            "documents": [],
            "orgId": "eaee759f-4992-4283-9c3c-9cf5efab3802",
            "subject": null,
            "remarks": null,
            "amount": 1,
            "unusedAmount": 1,
            "appliedTo": [
                {
                    "amount": 27778.9823,
                    "documentType": "Bill",
                    "documentId": "426c20ae-b149-479a-afa7-6ae062cc090f",
                    "remark": "",
                    "documentNumber": "RVL-22-23-0979",
                    "taxAmount": 0
                }
            ],
            "discount": {
                "type": "Fixed",
                "percentage": null,
                "discountAmount": 0
            },
            "adjustment": 0,
            "accountStatus": "OPEN",
            "ticketId": null,
            "type": "Transactional",
            "customFields": [
                {
                    "fieldType": "text",
                    "fieldKey": "Logistic Approval Remark",
                    "value": null,
                    "indexedValue": [],
                    "valueType": "string",
                    "definitionId": null
                }
            ],
            "updates": {
                "forwardReasons": [
                    "debit.note.created.event"
                ],
                "updatedBy": "USER",
                "userId": "a28f0daa-0b97-4013-ad79-7ec0cc8fa97b",
                "time": 1689316529755,
                "resourceType": "Vendor Bill",
                "resourceId": "a10865bd-7a8b-4e30-a029-ebec4dbbaaae",
                "sourceOfInformation": null,
                "updateType": null,
                "description": "Created Debit note",
                "forwardedFrom": null,
                "uuid": "07805853-c384-411f-9513-dced385f3f42",
                "revision": 0,
                "traceID": "f82a7196-e195-48fb-b323-664358fd3977",
                "changes": null
            }
        },
        {
            "_id": "65504a01-4929-4a9a-8186-796eff92667f",
            "uuid": "65504a01-4929-4a9a-8186-796eff92667f",
            "vendor": {
                "uuid": "33bc97d8-2daf-43a3-965c-152612791b25",
                "name": "RV LOG",
                "orgId": "823947a3-02c0-4e65-8f4e-21da370ea6cd",
                "fretronId": null,
                "geoFence": null,
                "places": [
                    {
                        "name": "VISAKHAPATNAM",
                        "address": null,
                        "category": "Hub",
                        "center": {
                            "latitude": 18.005493415455902,
                            "longitude": 82.58898921105212
                        },
                        "centerCoordinates": [
                            82.58898921105212,
                            18.005493415455902
                        ],
                        "suggestedRadius": 0,
                        "viewport": null,
                        "source": "GOOGLE",
                        "addedBy": "823947a3-02c0-4e65-8f4e-21da370ea6cd",
                        "placeId": "8e2b3abc-235c-4960-9669-d869a19f21a0",
                        "externalId": null,
                        "hubId": null,
                        "state": "Andhra Pradesh",
                        "district": "Vishakhapatnam",
                        "subDistrict": null,
                        "boundary": [
                            [
                                [
                                    82.33287133931647,
                                    18.1497984112857
                                ],
                                [
                                    82.3823361643298,
                                    17.731633253327285
                                ],
                                [
                                    83.0693476228482,
                                    17.726399957341695
                                ],
                                [
                                    82.82751958944972,
                                    18.269837044039118
                                ],
                                [
                                    82.33287133931647,
                                    18.1497984112857
                                ]
                            ]
                        ],
                        "places": [
                            {
                                "name": "Visakhapatnam",
                                "address": ",Visakhapatnam,Andhra Pradesh,India,in",
                                "category": null,
                                "center": {
                                    "latitude": 17.89937045,
                                    "longitude": 82.56422005952356
                                },
                                "centerCoordinates": [
                                    82.56422005952356,
                                    17.89937045
                                ],
                                "suggestedRadius": 1000,
                                "viewport": null,
                                "source": "GOOGLE",
                                "addedBy": null,
                                "placeId": "R2022111",
                                "externalId": null,
                                "hubId": null,
                                "state": null,
                                "district": null,
                                "subDistrict": null,
                                "boundary": null,
                                "places": null,
                                "accessibility": null,
                                "isOwned": null,
                                "geoJsonBoundry": null,
                                "controllingBranchId": null
                            }
                        ],
                        "accessibility": "private",
                        "isOwned": null,
                        "geoJsonBoundry": null,
                        "controllingBranchId": null
                    }
                ],
                "contacts": [
                    {
                        "name": "SANDEEP TURI",
                        "mobileNumber": null,
                        "address": null,
                        "emails": [
                            "sandeepkumar81367@gmail.com"
                        ],
                        "mobileNumbers": [
                            "9162799016"
                        ],
                        "type": null
                    },
                    {
                        "name": "UTTAM KUMAR ",
                        "mobileNumber": null,
                        "address": null,
                        "emails": [
                            "globalpatratu@gmail.com"
                        ],
                        "mobileNumbers": [
                            "7858986909"
                        ],
                        "type": null
                    },
                    {
                        "name": "VIKASH KUMAR",
                        "mobileNumber": null,
                        "address": null,
                        "emails": [
                            "vikashkumar271002@gmail.com"
                        ],
                        "mobileNumbers": [
                            "6209456337"
                        ],
                        "type": null
                    },
                    {
                        "name": "RIZVI ALAM",
                        "mobileNumber": null,
                        "address": null,
                        "emails": [
                            "rickykhanrizvi584@gmail.com"
                        ],
                        "mobileNumbers": [
                            "9931937947"
                        ],
                        "type": null
                    },
                    {
                        "name": "SANTOSH KUMAR",
                        "mobileNumber": null,
                        "address": null,
                        "emails": [],
                        "mobileNumbers": [
                            "8603459581"
                        ],
                        "type": null
                    },
                    {
                        "name": "SANDEEP TURI",
                        "mobileNumber": null,
                        "address": null,
                        "emails": [
                            "sandeepkumar81367@gmail.com"
                        ],
                        "mobileNumbers": [
                            "9162799016"
                        ],
                        "type": null
                    },
                    {
                        "name": "ROSHAN",
                        "mobileNumber": null,
                        "address": null,
                        "emails": [
                            "roshan77640@gmail.com"
                        ],
                        "mobileNumbers": [
                            "7764024700"
                        ],
                        "type": null
                    }
                ],
                "location": null,
                "type": "vendor",
                "isPortalEnabled": true,
                "address": "{\"address\":\"NEAR IOC PETROL PUMP\",\"pincode\":\"829143\",\"state\":\"JHARKHAND\",\"city\":\"BALKUDARA, RAMGARH\"}",
                "externalId": "63359",
                "updates": {
                    "forwardReasons": [
                        "business.partner.update.event",
                        "business.partner.custom.field"
                    ],
                    "updatedBy": "SYSTEM",
                    "userId": null,
                    "time": 1689645658063,
                    "resourceType": "Business-Partner",
                    "resourceId": "33bc97d8-2daf-43a3-965c-152612791b25",
                    "sourceOfInformation": null,
                    "updateType": null,
                    "description": "updated field totalPlacementPendingV2",
                    "forwardedFrom": null,
                    "uuid": "e526aac0-6013-4e3a-8a6b-931f4644f20f",
                    "revision": null,
                    "traceID": "d42f8c6d-8141-4f0f-b337-f017376c0acd",
                    "changes": [
                        {
                            "currentValue": "237",
                            "fieldName": "totalPlacementPendingV2",
                            "lastValue": "238",
                            "fieldType": "String"
                        }
                    ]
                },
                "status": "ACTIVE",
                "panNumber": null,
                "group": {
                    "partnerType": "vendor",
                    "name": "lorryOwner",
                    "uuid": "41a6080f-6a86-4f64-82aa-5fa48e7e670b",
                    "orgId": "823947a3-02c0-4e65-8f4e-21da370ea6cd"
                },
                "route": null,
                "customFields": [
                    {
                        "fieldType": "text",
                        "fieldKey": "totalPlacementPendingV2",
                        "value": "237",
                        "multiple": false,
                        "isRemark": false,
                        "remark": null,
                        "required": false,
                        "description": null,
                        "options": null,
                        "indexedValue": [
                            "totalPlacementPendingV2_237"
                        ],
                        "valueType": "String",
                        "input": "String",
                        "unit": null,
                        "accessType": null,
                        "uuid": null
                    }
                ],
                "parentId": null,
                "gstn": null,
                "aadharNo": null,
                "voterId": null,
                "documents": [],
                "verificationStatus": "verified",
                "firmType": "INDIVISUAL",
                "verificationTicketId": null,
                "companyCodes": null
            },
            "debitNoteNumber": "JSPL/PATRATU/CN000008",
            "reference": null,
            "date": 1689656254738,
            "lineItems": [
                {
                    "documentType": "SHIPMENT",
                    "documentId": "d239e8c6-34d3-4194-abef-df111c626d04",
                    "documentName": "FRETSH000029681",
                    "account": {
                        "uuid": "ae6e58b3-473b-4f63-aa72-11ba4c1d49bd",
                        "name": "Other Expense",
                        "accountGroup": "Expense",
                        "type": "Other Expense",
                        "accountPath": [
                            "Expense",
                            "Other Expense",
                            "ae6e58b3-473b-4f63-aa72-11ba4c1d49bd"
                        ]
                    },
                    "rate": 1,
                    "amount": 1,
                    "quantity": 1,
                    "rateUnit": "perMT",
                    "chargeName": "Risk Purchases Freight",
                    "chargeId": "c9f69c06-6ce8-460d-87b8-5284c78dd34c",
                    "shipmentCostId": "561dea5b-8818-415b-a180-6552ddb6ead3",
                    "uuid": "377ed473-c95e-4cb7-b827-8f6e4ac08556",
                    "customFields": []
                }
            ],
            "status": "Open",
            "documents": [],
            "orgId": "eaee759f-4992-4283-9c3c-9cf5efab3802",
            "subject": null,
            "remarks": null,
            "amount": 1,
            "unusedAmount": 1,
            "appliedTo": [
                {
                    "amount": 8218.42,
                    "documentType": "Bill",
                    "documentId": "e173c6a8-26c4-4500-89a0-b78a5164fb30",
                    "remark": "",
                    "documentNumber": "RVL-23-24-0137",
                    "taxAmount": 0
                }
            ],
            "discount": {
                "type": "Fixed",
                "percentage": null,
                "discountAmount": 0
            },
            "adjustment": 0,
            "accountStatus": "OPEN",
            "ticketId": null,
            "type": "Transactional",
            "customFields": [
                {
                    "fieldType": "text",
                    "fieldKey": "Logistic Approval Remark",
                    "value": null,
                    "indexedValue": [],
                    "valueType": "string",
                    "definitionId": null
                }
            ],
            "updates": {
                "forwardReasons": [
                    "debit.note.created.event"
                ],
                "updatedBy": "USER",
                "userId": "a28f0daa-0b97-4013-ad79-7ec0cc8fa97b",
                "time": 1689656583818,
                "resourceType": "Vendor Bill",
                "resourceId": "65504a01-4929-4a9a-8186-796eff92667f",
                "sourceOfInformation": null,
                "updateType": null,
                "description": "Created Debit note",
                "forwardedFrom": null,
                "uuid": "368dc0f9-0335-4852-a2e4-2321c9a270d4",
                "revision": 0,
                "traceID": "d2dada73-b362-46cf-8a9a-8b7d45e4a90b",
                "changes": null
            }
        }
    ]
    for (let item of data) {
        let parentId = item.orgId
        let payload = item
        payload.vendor["parentId"] = parentId
        console.log(payload)
        break
    }
}
main()
