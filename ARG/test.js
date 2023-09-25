// var _f = function (record) {
//     let pendingDays = "N/A"
//     let cn = record?.consignments
//     if (cn) {

//         let deliveryDate = cn[0]?.deliveryDate
//         if (deliveryDate) {
//             let inTransitTime = Date.now() - deliveryDate
//             let days = Math.floor(inTransitTime / (24 * 60 * 60 * 1000));
//             console.log(days)
//             if (days) {
//                 pendingDays = (`${days} Days `)
//             }
//             return pendingDays ?? "N/A"
//         } else {
//             return pendingDays
//         }

//     }
// }
var _f = function (record) {
    let pendingDays = "N/A"
    let cn = record?.consignments
    if (cn) {

        let deliveryDate = cn[0]?.deliveryDate
        if (deliveryDate) {
            let inTransitTime = Date.now() - deliveryDate
            let days = Math.floor(inTransitTime / (24 * 60 * 60 * 1000));
            if (days) {
                pendingDays = (`${days} Days `)
            }
            return pendingDays ?? "N/A"
        } else {
            return pendingDays
        }

    }
}

let sh = {
    "uuid": "e060ad45-8551-458a-b8fb-cf7ff0137999",
    "consignments": [
        {
            "uuid": "08feebca-1f91-4e77-9fc3-b9142be9be85",
            "associatedShipments": [
                "e060ad45-8551-458a-b8fb-cf7ff0137999"
            ],
            "activeShipment": null,
            "orgId": "0bbdc122-f963-452f-9af1-28715f5e36b2",
            "status": "Delivered",
            "consigner": {
                "uuid": "af5790c2-144f-4abf-afc4-6a8a359224e3",
                "name": "Bangalore",
                "orgId": "0bbdc122-f963-452f-9af1-28715f5e36b2",
                "fretronId": null,
                "geoFence": null,
                "places": [
                    {
                        "name": "Bangalore-811",
                        "address": null,
                        "category": "Hub",
                        "center": {
                            "latitude": 12.9391538,
                            "longitude": 77.5249514
                        },
                        "centerCoordinates": [
                            77.5249514,
                            12.9391538
                        ],
                        "suggestedRadius": 2000,
                        "viewport": null,
                        "source": "GOOGLE",
                        "addedBy": "0bbdc122-f963-452f-9af1-28715f5e36b2",
                        "placeId": "7c934f94-700a-4385-a8e2-5ca9fe1b28f4",
                        "externalId": "811",
                        "hubId": null,
                        "state": "Bangalore",
                        "district": "Bangalore",
                        "subDistrict": null,
                        "boundary": null,
                        "places": null,
                        "accessibility": "private",
                        "isOwned": null,
                        "geoJsonBoundry": null,
                        "controllingBranchId": null
                    }
                ],
                "contacts": null,
                "location": null,
                "type": "customer",
                "isPortalEnabled": false,
                "address": "{\"address\":\"Shalimar Paints Limited, \\n117/1,118/1, PANTHARAPALYA, NAYANDAHALLI POST, OFF MYSORE ROAD,  BANGALORE -560039 (KARNATAKA)\",\"city\":\"Bangalore\",\"state\":\"Karnataka\",\"pincode\":560039}",
                "externalId": "811",
                "updates": null,
                "status": "ACTIVE",
                "panNumber": null,
                "group": {
                    "partnerType": null,
                    "name": "Consignor",
                    "uuid": null,
                    "orgId": null
                },
                "route": null,
                "customFields": null,
                "parentId": null,
                "gstn": null,
                "aadharNo": null,
                "voterId": null,
                "documents": [],
                "verificationStatus": "unverified",
                "firmType": "INDIVISUAL",
                "verificationTicketId": null
            },
            "consignee": {
                "uuid": "7220d1c0-74bd-4847-8826-2a7a4f5ceaf1",
                "name": "NOUVEAU STRUCTURES",
                "orgId": "0bbdc122-f963-452f-9af1-28715f5e36b2",
                "fretronId": null,
                "geoFence": null,
                "places": [
                    {
                        "name": "BANGALORE-NOUVEAU STRUCTURES",
                        "address": null,
                        "category": "Hub",
                        "center": {
                            "latitude": 12.996854704408157,
                            "longitude": 77.64675427881474
                        },
                        "centerCoordinates": [
                            77.64675427881474,
                            12.996854704408157
                        ],
                        "suggestedRadius": 2000,
                        "viewport": null,
                        "source": "GOOGLE",
                        "addedBy": "0bbdc122-f963-452f-9af1-28715f5e36b2",
                        "placeId": "335c5f67-39af-4091-919e-e6144f24c12c",
                        "externalId": null,
                        "hubId": null,
                        "state": "Karnataka",
                        "district": "BANGALORE",
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
                        "name": "NOUVEAU STRUCTURES",
                        "mobileNumber": null,
                        "address": null,
                        "emails": null,
                        "mobileNumbers": [
                            "9886065351"
                        ],
                        "type": null
                    }
                ],
                "location": null,
                "type": "customer",
                "isPortalEnabled": false,
                "address": "{\"address\":\"422 GROUND FLOOR ELEGENCE APPARTMENT,21ST CROSS SECTOR 2 HSR LAYOUT\",\"city\":\"BANGALORE\",\"state\":\"Karnataka\",\"pincode\":560102}",
                "externalId": "S811000197",
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
                "gstn": "29ADSPG3048D1ZH",
                "aadharNo": null,
                "voterId": null,
                "documents": [],
                "verificationStatus": "unverified",
                "firmType": "INDIVISUAL",
                "verificationTicketId": null
            },
            "salesOffice": {
                "_id": "53b4dc95-ff13-493c-87f0-0f09f3b9a705",
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
                        "emails": [],
                        "mobileNumbers": [
                            "7411292689"
                        ],
                        "type": null
                    }
                ],
                "orgId": "0bbdc122-f963-452f-9af1-28715f5e36b2",
                "address": "117/1,118/1, PANTHARAPALYA, NAYANDAHALLI POST, OFF MYSORE ROAD,  BANGALORE -560039 (KARNATAKA)",
                "updatedBy": null,
                "name": "Bangalore",
                "externalId": "811",
                "branchName": null,
                "regionName": null,
                "zoneName": "South",
                "updates": null,
                "regionId": null,
                "zoneId": "08d56f61-8b47-41b8-a176-4049be2975ee",
                "officeType": null,
                "materialServices": null,
                "customFields": [
                    {
                        "fieldType": "text",
                        "fieldKey": "FCM_GSTN",
                        "value": null,
                        "indexedValue": [
                            "FCM_GSTN_null"
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
                        "value": null,
                        "indexedValue": [
                            "STATE_NAME_null"
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
                "material": "AL.PT.TO IS 2339   PERF.,SPL ROZC PRIMER IS 2074- PQ",
                "measurements": [
                    {
                        "measurmentType": null,
                        "unitOfMeasurment": "Kilograms",
                        "plannedLoadQuantity": null,
                        "actualLoadedQuantity": null,
                        "netQuantity": 98.55199999999999,
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
                        "measurmentType": "Kilograms",
                        "unitOfMeasurment": "Units",
                        "plannedLoadQuantity": null,
                        "actualLoadedQuantity": null,
                        "netQuantity": 4,
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
                "valueOfGoods": 0,
                "currency": null,
                "standardMeasurement": {
                    "weight": {
                        "measurmentType": null,
                        "unitOfMeasurment": "Kilograms",
                        "plannedLoadQuantity": 41.22,
                        "actualLoadedQuantity": null,
                        "netQuantity": 98.55199999999999,
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
                        "measurmentType": "Kilograms",
                        "unitOfMeasurment": "Units",
                        "plannedLoadQuantity": 2,
                        "actualLoadedQuantity": null,
                        "netQuantity": 4,
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
            "invoiceNo": "8112310496",
            "consignmentNo": "8112310496",
            "poNumber": null,
            "workOrderNumber": null,
            "currentLocation": null,
            "address": null,
            "consignmentDate": 1685471400000,
            "eWayBillNumber": "181651796525",
            "eWayBillExpiryDate": 1685644140000,
            "podDocument": null,
            "pod": {
                "status": "PENDING",
                "documents": null,
                "receiveDate": null,
                "submissionDate": null,
                "expectedSubmissionDate": null,
                "issues": null,
                "receivedBy": null,
                "remarks": null,
                "submissionPlace": null,
                "uuid": "ddc9ee28-9862-4c94-a7a8-24cd0fea90bf",
                "externalId": null,
                "consignmentId": "08feebca-1f91-4e77-9fc3-b9142be9be85",
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
            "eWayBillRegistrationDate": 1685535180000,
            "invoiceValue": "0.0",
            "pssNo": null,
            "customerPsnNo": null,
            "contractToParty": null,
            "customFields": [
                {
                    "fieldType": "text",
                    "fieldKey": "LR Number",
                    "value": "112316374048888",
                    "multiple": false,
                    "isRemark": false,
                    "remark": null,
                    "required": false,
                    "description": null,
                    "options": null,
                    "indexedValue": [
                        "LR Number_112316374048888"
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
                    "value": "2023-05-31 17:27:00",
                    "multiple": false,
                    "isRemark": false,
                    "remark": null,
                    "required": false,
                    "description": null,
                    "options": null,
                    "indexedValue": [
                        "LR Date_2023-05-31 17:27:00"
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
                    "value": "3eca108385bbf336ccc11f8d8fda57be32c818f9b4fdff87486a1aef40101105",
                    "multiple": false,
                    "isRemark": false,
                    "remark": null,
                    "required": false,
                    "description": null,
                    "options": null,
                    "indexedValue": [
                        "IRN Number_3eca108385bbf336ccc11f8d8fda57be32c818f9b4fdff87486a1aef40101105"
                    ],
                    "valueType": "string",
                    "input": null,
                    "unit": null,
                    "accessType": null,
                    "uuid": null
                }
            ],
            "externalId": "8112310496",
            "deliveryDate": 1685780902227,
            "salesOrderId": null,
            "updates": {
                "forwardReasons": [
                    "consignment.tracking.status.updated.event"
                ],
                "updatedBy": "SYSTEM",
                "userId": null,
                "time": 1686029865478,
                "resourceType": "Consignment",
                "resourceId": "08feebca-1f91-4e77-9fc3-b9142be9be85",
                "sourceOfInformation": null,
                "updateType": null,
                "description": null,
                "forwardedFrom": null,
                "uuid": "322ac67e-abc1-4d7c-bb66-8b259543487e",
                "revision": 9,
                "traceID": null,
                "changes": null
            },
            "trackingStatus": "Delivered at BANGALORE-NOUVEAU STRUCTURES",
            "edd": null,
            "originalEdd": null,
            "fuLineItemIds": null,
            "orderMappings": [
                {
                    "uuid": "4c601e90-0229-4d03-b122-94dcd32e6eb1",
                    "orderId": "208a8ecc-5c88-475a-9b07-498ae9df3eae",
                    "lineItemId": "126a4258-6fd5-4bbe-8336-cc0643b7a1f7",
                    "legType": "DirectLeg",
                    "consignmentId": "08feebca-1f91-4e77-9fc3-b9142be9be85",
                    "quantity": {
                        "weight": {
                            "measurmentType": null,
                            "unitOfMeasurment": "Kilograms",
                            "plannedLoadQuantity": 41.22,
                            "actualLoadedQuantity": null,
                            "netQuantity": 41.22,
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
                            "measurmentType": "Kilograms",
                            "unitOfMeasurment": "Units",
                            "plannedLoadQuantity": 2,
                            "actualLoadedQuantity": null,
                            "netQuantity": 2,
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
                            "fuLineItemId": "3c2da0e7-5d6c-4342-886c-4d566e8ed1c3",
                            "executionPlanId": null,
                            "legStatus": "FINALIZED",
                            "shipmentId": null
                        }
                    ],
                    "consignmentLineItemId": "1034f053-4fc4-48cb-a9b8-8ef26ea4df17",
                    "source": "Order",
                    "originLegId": null,
                    "isFullyUtilized": null,
                    "containerId": null
                },
                {
                    "uuid": "4a5c6722-3098-4413-b6bc-4dade84c1cd2",
                    "orderId": "208a8ecc-5c88-475a-9b07-498ae9df3eae",
                    "lineItemId": "b9d0c833-d002-4b16-85e0-5a7b6396bfa8",
                    "legType": "DirectLeg",
                    "consignmentId": "08feebca-1f91-4e77-9fc3-b9142be9be85",
                    "quantity": {
                        "weight": {
                            "measurmentType": null,
                            "unitOfMeasurment": "Kilograms",
                            "plannedLoadQuantity": 57.332,
                            "actualLoadedQuantity": null,
                            "netQuantity": 57.332,
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
                            "measurmentType": "Kilograms",
                            "unitOfMeasurment": "Units",
                            "plannedLoadQuantity": 2,
                            "actualLoadedQuantity": null,
                            "netQuantity": 2,
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
                            "fuLineItemId": "3c2da0e7-5d6c-4342-886c-4d566e8ed1c3",
                            "executionPlanId": null,
                            "legStatus": "FINALIZED",
                            "shipmentId": null
                        }
                    ],
                    "consignmentLineItemId": "631c571b-5d75-4b20-a3f5-98411e508e05",
                    "source": "Order",
                    "originLegId": null,
                    "isFullyUtilized": null,
                    "containerId": null
                }
            ],
            "lineItems": [
                {
                    "material": {
                        "uuid": "5d9ab078-3ac3-46ed-bcfb-9b83c147800a",
                        "externalId": "15132942020000",
                        "name": "AL.PT.TO IS 2339   PERF.",
                        "orgId": "0bbdc122-f963-452f-9af1-28715f5e36b2",
                        "measurementType": "volume",
                        "unitOfMeasurement": "Litres",
                        "pricePerUnit": null,
                        "updates": {
                            "forwardReasons": [
                                "material.created.event"
                            ],
                            "updatedBy": "USER",
                            "userId": "7d6539ac-5dd0-48d4-80d7-251fbdb86158",
                            "time": 1677644447201,
                            "resourceType": "Material",
                            "resourceId": "5d9ab078-3ac3-46ed-bcfb-9b83c147800a",
                            "sourceOfInformation": null,
                            "updateType": null,
                            "description": "Added material AL.PT.TO IS 2339   PERF. ",
                            "forwardedFrom": null,
                            "uuid": "4e53e319-70fa-4bdd-b58e-0ee3618fbb42",
                            "revision": null,
                            "traceID": "44faa750-b40b-4827-9768-fd7a1631af78",
                            "changes": null
                        },
                        "materialType": "Material",
                        "materialGroup": "ALUMINIUM IS SPECIFICATIO",
                        "controlCode": null,
                        "division": null,
                        "taxCode": "",
                        "partnerId": null,
                        "linkedMaterialId": "",
                        "materialGroupId": "46857eec-9c8b-48ce-90c6-cbaa4d8d4a1f",
                        "materialDescription": "Aluminium Paints",
                        "partnerName": null,
                        "measuredQuantity": 20
                    },
                    "customerMaterial": null,
                    "uuid": "1034f053-4fc4-48cb-a9b8-8ef26ea4df17",
                    "valueOfGoods": null,
                    "externalId": "000010",
                    "customFields": [],
                    "itemNumber": "1",
                    "invoiceNo": null,
                    "transportationServiceId": null
                },
                {
                    "material": {
                        "uuid": "5c874c34-e3a8-481b-be5c-0c1fedfe9c9c",
                        "externalId": "21192474020000",
                        "name": "SPL ROZC PRIMER IS 2074- PQ",
                        "orgId": "0bbdc122-f963-452f-9af1-28715f5e36b2",
                        "measurementType": "volume",
                        "unitOfMeasurement": "Litres",
                        "pricePerUnit": null,
                        "updates": {
                            "forwardReasons": [
                                "material.created.event"
                            ],
                            "updatedBy": "USER",
                            "userId": "7d6539ac-5dd0-48d4-80d7-251fbdb86158",
                            "time": 1677647907650,
                            "resourceType": "Material",
                            "resourceId": "5c874c34-e3a8-481b-be5c-0c1fedfe9c9c",
                            "sourceOfInformation": null,
                            "updateType": null,
                            "description": "Added material SPL ROZC PRIMER IS 2074- PQ ",
                            "forwardedFrom": null,
                            "uuid": "36d83e9a-9974-46a2-8338-266ff4623159",
                            "revision": null,
                            "traceID": "63476c95-4c59-405e-9b13-036236361579",
                            "changes": null
                        },
                        "materialType": "Material",
                        "materialGroup": "METAL PRIMER",
                        "controlCode": null,
                        "division": null,
                        "taxCode": "",
                        "partnerId": null,
                        "linkedMaterialId": "",
                        "materialGroupId": "3c2ce5e6-b762-4e78-aaca-1fa88abf4455",
                        "materialDescription": "Primers",
                        "partnerName": null,
                        "measuredQuantity": 20
                    },
                    "customerMaterial": null,
                    "uuid": "631c571b-5d75-4b20-a3f5-98411e508e05",
                    "valueOfGoods": null,
                    "externalId": "000020",
                    "customFields": [],
                    "itemNumber": "2",
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
            "uuid": "161607e4-191d-4340-9765-2f6508b4bb8f",
            "arrivalTime": 1685535054495,
            "departureTime": 1685776544584,
            "tripPoint": {
                "uuid": "161607e4-191d-4340-9765-2f6508b4bb8f",
                "vehicleId": null,
                "imei": null,
                "purpose": "Pickup",
                "sequenceId": null,
                "place": null,
                "status": "COMPLETED",
                "eta": null,
                "remainingDistance": null,
                "plannedArrival": null,
                "plannedDeparture": null,
                "actualArrival": 1685535054495,
                "actualDeparture": 1685776544584,
                "assosiatedShipmentsId": [
                    "e060ad45-8551-458a-b8fb-cf7ff0137999"
                ],
                "creationTime": null,
                "outOfTrackSince": null,
                "isOutOfTrack": false,
                "isAutoCompleted": false,
                "coveredDistance": null,
                "purposedDistance": null,
                "forShipmentStages": [
                    "161607e4-191d-4340-9765-2f6508b4bb8f"
                ],
                "currentLocation": null,
                "hub": {
                    "name": "Bangalore-811",
                    "address": null,
                    "category": "Hub",
                    "center": {
                        "latitude": 12.9391538,
                        "longitude": 77.5249514
                    },
                    "centerCoordinates": [
                        77.5249514,
                        12.9391538
                    ],
                    "suggestedRadius": 2000,
                    "viewport": null,
                    "source": "GOOGLE",
                    "addedBy": "0bbdc122-f963-452f-9af1-28715f5e36b2",
                    "placeId": "7c934f94-700a-4385-a8e2-5ca9fe1b28f4",
                    "externalId": "811",
                    "hubId": null,
                    "state": "Bangalore",
                    "district": "Bangalore",
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
                "updates": null,
                "currentGpsState": null,
                "isDisconnected": false,
                "routeId": null,
                "routeDeviationMinimumDistanceConstraint": null
            },
            "place": null,
            "resourcePickup": null,
            "resourceDropOff": null,
            "consignmentPickUps": [
                "08feebca-1f91-4e77-9fc3-b9142be9be85"
            ],
            "consignmentDelivered": null,
            "status": "COMPLETED",
            "expectedActivityStartTime": null,
            "actualActivityStartTime": 1685535056367,
            "actualActivityEndTime": 1685535065031,
            "eta": null,
            "hub": {
                "name": "Bangalore-811",
                "address": null,
                "category": "Hub",
                "center": {
                    "latitude": 12.9391538,
                    "longitude": 77.5249514
                },
                "centerCoordinates": [
                    77.5249514,
                    12.9391538
                ],
                "suggestedRadius": 2000,
                "viewport": null,
                "source": "GOOGLE",
                "addedBy": "0bbdc122-f963-452f-9af1-28715f5e36b2",
                "placeId": "7c934f94-700a-4385-a8e2-5ca9fe1b28f4",
                "externalId": "811",
                "hubId": null,
                "state": "Bangalore",
                "district": "Bangalore",
                "subDistrict": null,
                "boundary": null,
                "places": [],
                "accessibility": "private",
                "isOwned": null,
                "geoJsonBoundry": null,
                "controllingBranchId": null
            },
            "gateInTime": 1685535055351,
            "secondaryStatus": null,
            "stageName": "Bangalore, Bangalore-811",
            "controllingBranchId": null,
            "gateOutTime": null
        },
        {
            "uuid": "1e2515ae-db2f-4c58-93f0-a02c729c3c92",
            "arrivalTime": 1685780899114,
            "departureTime": 1685780902227,
            "tripPoint": {
                "uuid": "1e2515ae-db2f-4c58-93f0-a02c729c3c92",
                "vehicleId": null,
                "imei": null,
                "purpose": "Delivery",
                "sequenceId": null,
                "place": null,
                "status": "COMPLETED",
                "eta": null,
                "remainingDistance": null,
                "plannedArrival": null,
                "plannedDeparture": null,
                "actualArrival": null,
                "actualDeparture": null,
                "assosiatedShipmentsId": [
                    "e060ad45-8551-458a-b8fb-cf7ff0137999"
                ],
                "creationTime": null,
                "outOfTrackSince": null,
                "isOutOfTrack": false,
                "isAutoCompleted": false,
                "coveredDistance": null,
                "purposedDistance": null,
                "forShipmentStages": [
                    "1e2515ae-db2f-4c58-93f0-a02c729c3c92"
                ],
                "currentLocation": null,
                "hub": {
                    "name": "BANGALORE-NOUVEAU STRUCTURES",
                    "address": null,
                    "category": "Hub",
                    "center": {
                        "latitude": 12.996854704408157,
                        "longitude": 77.64675427881474
                    },
                    "centerCoordinates": [
                        77.64675427881474,
                        12.996854704408157
                    ],
                    "suggestedRadius": 2000,
                    "viewport": null,
                    "source": "GOOGLE",
                    "addedBy": "0bbdc122-f963-452f-9af1-28715f5e36b2",
                    "placeId": "335c5f67-39af-4091-919e-e6144f24c12c",
                    "externalId": null,
                    "hubId": null,
                    "state": "Karnataka",
                    "district": "BANGALORE",
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
                "updates": null,
                "currentGpsState": null,
                "isDisconnected": false,
                "routeId": null,
                "routeDeviationMinimumDistanceConstraint": null
            },
            "place": null,
            "resourcePickup": null,
            "resourceDropOff": null,
            "consignmentPickUps": null,
            "consignmentDelivered": [
                "08feebca-1f91-4e77-9fc3-b9142be9be85"
            ],
            "status": "COMPLETED",
            "expectedActivityStartTime": null,
            "actualActivityStartTime": 1685780902227,
            "actualActivityEndTime": 1685780902227,
            "eta": null,
            "hub": {
                "name": "BANGALORE-NOUVEAU STRUCTURES",
                "address": null,
                "category": "Hub",
                "center": {
                    "latitude": 12.996854704408157,
                    "longitude": 77.64675427881474
                },
                "centerCoordinates": [
                    77.64675427881474,
                    12.996854704408157
                ],
                "suggestedRadius": 2000,
                "viewport": null,
                "source": "GOOGLE",
                "addedBy": "0bbdc122-f963-452f-9af1-28715f5e36b2",
                "placeId": "335c5f67-39af-4091-919e-e6144f24c12c",
                "externalId": null,
                "hubId": null,
                "state": "Karnataka",
                "district": "BANGALORE",
                "subDistrict": null,
                "boundary": null,
                "places": [],
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
            "vehicleType": "Torus 0.5MT",
            "vehicleModel": null,
            "vehicleMake": null,
            "vtsDeviceId": null,
            "vehicleRegistrationNumber": "KA03NC7287",
            "uuid": null,
            "associatedWith": null,
            "isDeleted": null,
            "createTime": null,
            "updateTime": null,
            "groups": null,
            "orgId": "0bbdc122-f963-452f-9af1-28715f5e36b2",
            "sharedWith": null,
            "driverId": null,
            "attachedDocs": [],
            "source": null,
            "isTrackingEnabled": false,
            "groupsExtended": null,
            "truckLength": null,
            "loadCapacity": 0,
            "floorType": null,
            "kmDriven": null,
            "mileageLoaded": null,
            "mileageEmpty": null,
            "category": null,
            "externalId": null,
            "updates": null,
            "branch": null,
            "chassisNumber": null,
            "vehicleLoadType": null,
            "customFields": [],
            "baseLocationId": null,
            "description": null,
            "secondaryDriverId": null
        },
        "driver": {
            "name": null,
            "mobileNumber": "7997891241",
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
            "imei": null,
            "mobileNumber": null,
            "manufacturerName": null,
            "uuid": null,
            "isAssociated": null,
            "isDeleted": null,
            "createTime": null,
            "updateTime": null,
            "groups": null,
            "orgId": null,
            "status": null,
            "sharedWith": null,
            "isSuspended": null,
            "type": null,
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
            "uuid": "c86cc652-73bc-4efb-a146-57cf0e27f91e",
            "name": "By Hand (Misc)",
            "orgId": "0bbdc122-f963-452f-9af1-28715f5e36b2",
            "fretronId": null,
            "geoFence": null,
            "places": null,
            "contacts": null,
            "location": null,
            "type": "vendor",
            "isPortalEnabled": true,
            "address": "{\"address\":null,\"city\":null,\"state\":null,\"pincode\":null}",
            "externalId": null,
            "updates": null,
            "status": "ACTIVE",
            "panNumber": null,
            "group": {
                "partnerType": null,
                "name": "Broker",
                "uuid": null,
                "orgId": null
            },
            "route": null,
            "customFields": null,
            "parentId": null,
            "gstn": null,
            "aadharNo": null,
            "voterId": null,
            "documents": [],
            "verificationStatus": "unverified",
            "firmType": "INDIVISUAL",
            "verificationTicketId": null
        },
        "trackingMode": "MANUAL",
        "trainInfo": null,
        "lbsNumber": null,
        "forwardingAgent": null,
        "broker": {
            "uuid": "c86cc652-73bc-4efb-a146-57cf0e27f91e",
            "name": "By Hand (Misc)",
            "orgId": "0bbdc122-f963-452f-9af1-28715f5e36b2",
            "fretronId": null,
            "geoFence": null,
            "places": null,
            "contacts": null,
            "location": null,
            "type": "vendor",
            "isPortalEnabled": true,
            "address": "{\"address\":null,\"city\":null,\"state\":null,\"pincode\":null}",
            "externalId": null,
            "updates": null,
            "status": "ACTIVE",
            "panNumber": null,
            "group": {
                "partnerType": null,
                "name": "Broker",
                "uuid": null,
                "orgId": null
            },
            "route": null,
            "customFields": null,
            "parentId": null,
            "gstn": null,
            "aadharNo": null,
            "voterId": null,
            "documents": [],
            "verificationStatus": "unverified",
            "firmType": "INDIVISUAL",
            "verificationTicketId": null
        },
        "orgId": "0bbdc122-f963-452f-9af1-28715f5e36b2",
        "uuid": "b582ed40-fa1a-49ce-96d6-ebc7c413c4d6",
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
    "orgId": "0bbdc122-f963-452f-9af1-28715f5e36b2",
    "currentLocation": null,
    "shipmentDate": 1685535042329,
    "shipmentNumber": "FRETSH000000429",
    "creationTime": 1685535043173,
    "lastSyncUpTime": 1686029865346,
    "syncUpDueTime": null,
    "remarks": null,
    "updates": {
        "forwardReasons": [
            "shipment.consignment.updated"
        ],
        "updatedBy": "SYSTEM",
        "userId": null,
        "time": 1686029865512,
        "resourceType": "ShipmentObject",
        "resourceId": "e060ad45-8551-458a-b8fb-cf7ff0137999",
        "sourceOfInformation": null,
        "updateType": null,
        "description": null,
        "forwardedFrom": null,
        "uuid": "b31e936d-e47c-4ba4-bf41-b6866e7c55a5",
        "revision": 161,
        "traceID": "consignmentTopic_4_1275219",
        "changes": null
    },
    "alerts": [],
    "edd": null,
    "originalEdd": null,
    "issues": null,
    "customContacts": null,
    "lastForwardTime": 1686029865529,
    "completionTime": 1686029864623,
    "links": null,
    "tripType": "Shipment",
    "externalShipmentId": null,
    "customFields": [
        {
            "fieldType": "text",
            "fieldKey": "FreightCost",
            "value": "1.0",
            "multiple": false,
            "isRemark": false,
            "remark": null,
            "required": false,
            "description": null,
            "options": null,
            "indexedValue": [
                "FreightCost_1.0"
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
            "value": "643e0f3f-d3b1-4bfe-bde9-a45dafa29cd6",
            "multiple": false,
            "isRemark": false,
            "remark": null,
            "required": false,
            "description": null,
            "options": null,
            "indexedValue": [
                "PONo_643e0f3f-d3b1-4bfe-bde9-a45dafa29cd6"
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
            "value": "8112310496",
            "multiple": false,
            "isRemark": false,
            "remark": null,
            "required": false,
            "description": null,
            "options": null,
            "indexedValue": [
                "Invoice No's_8112310496"
            ],
            "valueType": "string",
            "input": null,
            "unit": null,
            "accessType": null,
            "uuid": null
        }
    ],
    "branch": {
        "_id": "53b4dc95-ff13-493c-87f0-0f09f3b9a705",
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
                "emails": [],
                "mobileNumbers": [
                    "7411292689"
                ],
                "type": null
            }
        ],
        "orgId": "0bbdc122-f963-452f-9af1-28715f5e36b2",
        "address": "117/1,118/1, PANTHARAPALYA, NAYANDAHALLI POST, OFF MYSORE ROAD,  BANGALORE -560039 (KARNATAKA)",
        "updatedBy": null,
        "name": "Bangalore",
        "externalId": "811",
        "branchName": null,
        "regionName": null,
        "zoneName": "South",
        "updates": null,
        "regionId": null,
        "zoneId": "08d56f61-8b47-41b8-a176-4049be2975ee",
        "officeType": null,
        "materialServices": null,
        "customFields": [
            {
                "fieldType": "text",
                "fieldKey": "FCM_GSTN",
                "value": null,
                "indexedValue": [
                    "FCM_GSTN_null"
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
                "value": null,
                "indexedValue": [
                    "STATE_NAME_null"
                ],
                "valueType": "string",
                "definitionId": null
            }
        ],
        "areaName": null,
        "areaId": null
    },
    "poLineItemId": "254252a5-b2d5-4a8f-88d4-d3b157f5b6c3",
    "isActive": false,
    "routeId": null,
    "freightUnitLineItemId": "3c2da0e7-5d6c-4342-886c-4d566e8ed1c3",
    "runningStatus": null,
    "delayReason": null,
    "billingStatus": null,
    "delayReasonLastUpdateTime": null,
    "delayReasonUpdateDueTime": null,
    "delayReasonUpdateExpiryTime": null,
    "syncUpExpiryTime": null,
    "locationTrackingStatus": null,
    "delayTrackingStatus": null,
    "lastDelayCalculationTime": null
}

_f(sh)
