const rp = require("request-promise")
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODkxNDUyNDMsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiI2ZjgwZWZmNS1mYWQxLTRmYmYtOTc2Yi1iNWJmYjU5NWQ0NTQiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.15Ls4nnXBxn1oEk4undu2cAZ-xZo-prxAEDnUFhBYfY"

async function createPO(payload) {
    try {
        let url = `https://apis.fretron.com/order-manager-v2/freight-purchase/v1/order`
        let res = await rp({
            uri: url,
            method: "POST",
            json: true,
            body: payload,
            headers: {
                Authorization: TOKEN
            }
        })
        if (res?.status == 200) {
            console.log(`Purchase order created Successfully status ${res.status}`)
        } else {
            console.log(`error in creating PO ${res.error}`)
            console.log(JSON.stringify(res))
        }

    } catch (e) {
        console.log(`Error creating PO: ${e.message}`)
    }
}

async function createSh(payload) {
    try {
        let url = `https://apis.fretron.com/shipment/v1/shipment/with/consignments`
        let res = await rp({
            uri: url,
            method: "POST",
            json: true,
            body: payload,
            headers: {
                Authorization: TOKEN
            }
        })
        if (res?.status == 200) {
            console.log(`shipment created Successfully status ${res.status}`)

            return res
        } else {
            console.log(`error in creating sh ${res.error}`)
            console.log(JSON.stringify(res))
            return null
        }


    } catch (e) {
        console.log(`Error creating sh: ${e.message}`)
    }
}

async function createCn(paylaod) {
    try {
        let url = `https://apis.fretron.com/consignment/v1/consignment`
        let res = await rp({
            uri: url,
            method: "POST",
            json: true,
            body: paylaod,
            headers: {
                Authorization: TOKEN
            }
        })
        if (res?.status == 200) {
            console.log(`Consignment created Successfully status ${res.status}`)
            console.log(res)
        } else {
            console.log(`error in creating cn ${res.error}`)
            console.log(JSON.stringify(res))
        }

    } catch (e) {
        console.log(`Error creating cn: ${e.message}`)
    }
}
let vehicleMaster = {
    "vtsDeviceId": null,
    "kmDriven": null,
    "secondaryDriverId": null,
    "attachedDocs": [],
    "customFields": [],
    "floorType": null,
    "description": null,
    "source": "FRETRON",
    "isTrackingEnabled": false,
    "updates": {
        "traceID": "e6200212-07cc-4ea1-adee-25024dbde3e0",
        "resourceId": "a55a74a2-1f82-42fe-8e47-18a2300c044a",
        "updatedBy": "USER",
        "changes": null,
        "sourceOfInformation": null,
        "description": "created partner fleet",
        "forwardReasons": [
            "partner.fleet.created"
        ],
        "userId": "97122da8-f5e1-45cf-9ba8-abbf6943aa2c",
        "uuid": "8983f0b8-3cea-4ce4-aef7-fa344792ef9e",
        "revision": null,
        "time": 1689079366478,
        "forwardedFrom": null,
        "resourceType": "PartnerFleet",
        "updateType": null
    },
    "uuid": "a55a74a2-1f82-42fe-8e47-18a2300c044a",
    "branch": null,
    "orgId": "6f80eff5-fad1-4fbf-976b-b5bfb595d454",
    "vehicleLoadType": null,
    "associatedWith": null,
    "isDeleted": null,
    "customerId": null,
    "vehicleModel": null,
    "mileageEmpty": null,
    "mileageLoaded": null,
    "vehicleType": "hire",
    "groups": [],
    "externalId": null,
    "updateTime": null,
    "sharedWith": [],
    "baseLocationId": null,
    "vehicleMake": null,
    "vehicleRegistrationNumber": "GJ234U7891",
    "chassisNumber": null,
    "driverId": null,
    "createTime": null,
    "loadCapacity": null,
    "truckLength": null,
    "category": null,
    "groupsExtended": null
}
let driverMaster = {
    "pincode": null,
    "dlExpiryTime": 1892485800000,
    "attachedDocs": [],
    "isEmployee": false,
    "pfNumber": null,
    "address": null,
    "mobileNumbers": null,
    "dlNumber": "2359044543",
    "mobileNumber": null,
    "customFields": [],
    "externalId": null,
    "updates": {
        "traceID": "279c5d39-ea8e-4edf-8390-36a3c5479b75",
        "resourceId": "a1ddefcc-fc55-47ce-9385-3cf891b33044",
        "updatedBy": "USER",
        "changes": null,
        "sourceOfInformation": null,
        "description": "added new Driver Ram",
        "forwardReasons": [
            "driver.add.event"
        ],
        "userId": "97122da8-f5e1-45cf-9ba8-abbf6943aa2c",
        "uuid": "5111c498-0e97-4f93-aead-2a036ad23f48",
        "revision": null,
        "time": 1689147927183,
        "forwardedFrom": null,
        "resourceType": "Driver",
        "updateType": null
    },
    "aadharNo": null,
    "type": null,
    "uuid": "a1ddefcc-fc55-47ce-9385-3cf891b33044",
    "branch": null,
    "orgId": "6f80eff5-fad1-4fbf-976b-b5bfb595d454",
    "vehicleRegistrationNumber": null,
    "dob": null,
    "name": "Ram",
    "vehicleId": null,
    "associatedUserId": null,
    "status": "Active"
}
async function main() {
    let shStage = {}
    let shStage1 = {}
    shStage["tripPoint"] = null;
    shStage["uuid"] = null;
    shStage["consignmentDelivered"] = [];
    shStage["consignmentPickUps"] = [];
    shStage["status"] = "UPCOMING";
    shStage["arrivalTime"] = null;
    shStage["actualActivityStartTime"] = null;
    shStage["actualActivityEndTime"] = null;
    shStage["departureTime"] = null;
    shStage["place"] = {
        "hubId": null,
        "boundary": null,
        "address": ". Welspun City,Village Versamedi, Tal. Anjar, District Kutch, Gujarat 370 110, India",
        "accessibility": "public",
        "addedBy": "6f80eff5-fad1-4fbf-976b-b5bfb595d454",
        "center": {
            "latitude": 23.1297928256575,
            "longitude": 70.0889536358172
        },
        "suggestedRadius": 500,
        "isOwned": false,
        "centerCoordinates": [
            70.0889536358172,
            23.1297928256575
        ],
        "placeId": "412e8d19-4fa5-44df-932a-174f352260ae",
        "geoJsonBoundry": null,
        "externalId": "WL5431",
        "source": "FRETRON",
        "places": null,
        "viewport": null,
        "district": null,
        "name": "Welspun",
        "state": null,
        "category": "N2",
        "subDistrict": null,
        "controllingBranchId": null
    }

    shStage1["tripPoint"] = null;
    shStage1["uuid"] = null;
    shStage1["consignmentDelivered"] = [];
    shStage1["consignmentPickUps"] = [];
    shStage1["status"] = "UPCOMING";
    shStage1["arrivalTime"] = null;
    shStage1["actualActivityStartTime"] = null;
    shStage1["actualActivityEndTime"] = null;
    shStage1["departureTime"] = null;
    shStage1["place"] = {
        "hubId": null,
        "boundary": null,
        "address": "Shantigram, Near Vaishnodevi Circle, S G Highway, Ahmedabad-382421, Gujarat, India",
        "accessibility": "Unloading Point",
        "addedBy": "6f80eff5-fad1-4fbf-976b-b5bfb595d454",
        "center": {
            "latitude": 23.1529333493694,
            "longitude": 72.5448946419856
        },
        "suggestedRadius": 500,
        "isOwned": false,
        "centerCoordinates": [
            72.5448946419856,
            23.1529333493694
        ],
        "placeId": "d73c94d7-d58a-4ac3-b145-79ee1db4d0dc",
        "geoJsonBoundry": null,
        "externalId": "AD1345",
        "source": "FRETRON",
        "places": null,
        "viewport": null,
        "district": null,
        "name": "Adani Port",
        "state": null,
        "category": "N1",
        "subDistrict": null,
        "controllingBranchId": null
    }

    let shipmentCreatPayload = {
        shipment: {
            shipmentNumber: null,
            consignments: [],
            shipmentDate: Date.now(),
            shipmentStages: [shStage1, shStage],
            fleetInfo: {
                device: null,
                lbsNumber: null,
                trackingMode: "MANUAL",
                vehicle: vehicleMaster,
                driver: driverMaster,
                fleetOwner: null,
                fleetType: "Owned",
                forwardingAgent: null,
            },
            edd: null,
            shipmentStatus: "Planned",
            transportationMode: "ByRoad",
            shipmentType: "PreLeg",
            customFields: [],
            uuid: null,
            branch: null,
            originalEdd: null,
        },
        consignments: [],
    };

    let shCreatedRes = await createSh(shipmentCreatPayload)
    console.log("New Created Sh:", shCreatedRes?.data?.shipmentNumber)
}

// main()


async function mainForCreateCn() {

    let consignee = {
        "geoFence": null,
        "documents": [],
        "customFields": [],
        "isPortalEnabled": false,
        "type": "customer",
        "updates": {
            "traceID": "48ad8af7-5e32-4df9-94ea-8b8aa3cbe107",
            "resourceId": "db2c3d99-d990-4759-b855-ea12333749b8",
            "updatedBy": "USER",
            "changes": [
                {
                    "lastValue": null,
                    "fieldName": "Partner",
                    "fieldType": "String",
                    "currentValue": "Welspun Pvt Ltd"
                }
            ],
            "sourceOfInformation": null,
            "description": "added new partner  Welspun Pvt Ltd.",
            "forwardReasons": [
                "business.partner.add.event"
            ],
            "userId": "97122da8-f5e1-45cf-9ba8-abbf6943aa2c",
            "uuid": "c14ca8ea-3d95-44b2-93b6-76aed048928e",
            "revision": null,
            "time": 1689075797292,
            "forwardedFrom": null,
            "resourceType": "Business-Partner",
            "updateType": null
        },
        "uuid": "db2c3d99-d990-4759-b855-ea12333749b8",
        "orgId": "6f80eff5-fad1-4fbf-976b-b5bfb595d454",
        "firmType": "INDIVISUAL",
        "gstn": null,
        "voterId": null,
        "verificationTicketId": null,
        "companyCodes": null,
        "group": {
            "name": "Consignee",
            "partnerType": "customer",
            "uuid": "0b962513-f8df-44ff-8bc1-5042a3092471",
            "orgId": "6f80eff5-fad1-4fbf-976b-b5bfb595d454"
        },
        "address": "{\"pincode\":\"\",\"address\":\"Shantigram, Near Vaishnodevi Circle, S G Highway, Ahmedabad-382421, Gujarat, India\",\"city\":\"Welspun\",\"state\":\"Kutch\"}",
        "verificationStatus": "unverified",
        "externalId": "3200722",
        "panNumber": null,
        "aadharNo": null,
        "parentId": null,
        "places": [
            {
                "hubId": null,
                "boundary": null,
                "address": ". Welspun City,Village Versamedi, Tal. Anjar, District Kutch, Gujarat 370 110, India",
                "accessibility": "public",
                "addedBy": "6f80eff5-fad1-4fbf-976b-b5bfb595d454",
                "center": {
                    "latitude": 23.1297928256575,
                    "longitude": 70.0889536358172
                },
                "suggestedRadius": 500,
                "isOwned": false,
                "centerCoordinates": [
                    70.0889536358172,
                    23.1297928256575
                ],
                "placeId": "412e8d19-4fa5-44df-932a-174f352260ae",
                "geoJsonBoundry": null,
                "externalId": "WL5431",
                "source": "FRETRON",
                "places": null,
                "viewport": null,
                "district": null,
                "name": "Welspun",
                "state": null,
                "category": "N2",
                "subDistrict": null,
                "controllingBranchId": null
            }
        ],
        "route": null,
        "name": "Welspun Pvt Ltd",
        "location": null,
        "fretronId": null,
        "contacts": null,
        "status": "ACTIVE"
    }
    let consigner = {
        "geoFence": null,
        "documents": [],
        "customFields": [],
        "isPortalEnabled": false,
        "type": "customer",
        "updates": {
            "traceID": "dc01897e-a2d6-49ae-9134-eb87fb71128e",
            "resourceId": "a1a54ad2-4063-4503-ac00-bec57af9e6b8",
            "updatedBy": "USER",
            "changes": [
                {
                    "lastValue": null,
                    "fieldName": "Partner",
                    "fieldType": "String",
                    "currentValue": "IPOS Adani Port"
                }
            ],
            "sourceOfInformation": null,
            "description": "added new partner  IPOS Adani Port.",
            "forwardReasons": [
                "business.partner.add.event"
            ],
            "userId": "97122da8-f5e1-45cf-9ba8-abbf6943aa2c",
            "uuid": "847c83b4-994b-4ce2-b68b-ce924664e63c",
            "revision": null,
            "time": 1689075711636,
            "forwardedFrom": null,
            "resourceType": "Business-Partner",
            "updateType": null
        },
        "uuid": "a1a54ad2-4063-4503-ac00-bec57af9e6b8",
        "orgId": "6f80eff5-fad1-4fbf-976b-b5bfb595d454",
        "firmType": "INDIVISUAL",
        "gstn": null,
        "voterId": null,
        "verificationTicketId": null,
        "companyCodes": null,
        "group": {
            "name": "Consigner",
            "partnerType": "customer",
            "uuid": "bb8e2b91-9a81-4e4d-a8f4-371acd885b3e",
            "orgId": "6f80eff5-fad1-4fbf-976b-b5bfb595d454"
        },
        "address": "{\"pincode\":\"\",\"address\":\"Shantigram, Near Vaishnodevi Circle, S G Highway, Ahmedabad-382421, Gujarat, India\",\"city\":\"Adani Port\",\"state\":\"Ahmedabad\"}",
        "verificationStatus": "unverified",
        "externalId": "3200721",
        "panNumber": null,
        "aadharNo": null,
        "parentId": null,
        "places": [
            {
                "hubId": null,
                "boundary": null,
                "address": "Shantigram, Near Vaishnodevi Circle, S G Highway, Ahmedabad-382421, Gujarat, India",
                "accessibility": "Unloading Point",
                "addedBy": "6f80eff5-fad1-4fbf-976b-b5bfb595d454",
                "center": {
                    "latitude": 23.1529333493694,
                    "longitude": 72.5448946419856
                },
                "suggestedRadius": 500,
                "isOwned": false,
                "centerCoordinates": [
                    72.5448946419856,
                    23.1529333493694
                ],
                "placeId": "d73c94d7-d58a-4ac3-b145-79ee1db4d0dc",
                "geoJsonBoundry": null,
                "externalId": "AD1345",
                "source": "FRETRON",
                "places": null,
                "viewport": null,
                "district": null,
                "name": "Adani Port",
                "state": null,
                "category": "N1",
                "subDistrict": null,
                "controllingBranchId": null
            }
        ],
        "route": null,
        "name": "IPOS Adani Port",
        "location": null,
        "fretronId": null,
        "contacts": null,
        "status": "ACTIVE"
    }

    let contractToParty = {
        "aadharNo": null,
        "address": "{\"pincode\":\"\",\"address\":\"Shantigram, Near Vaishnodevi Circle, S G Highway, Ahmedabad-382421, Gujarat, India\",\"city\":\"Welspun\",\"state\":\"Kutch\"}",
        "contacts": null,
        "customFields": null,
        "documents": null,
        "externalId": "3200722",
        "firmType": null,
        "fretronId": null,
        "geoFence": null,
        "group": {
            "name": "Consignee",
            "orgId": null,
            "partnerType": null,
            "uuid": null
        },
        "gstn": null,
        "isPortalEnabled": false,
        "location": null,
        "name": "Welspun Pvt Ltd",
        "orgId": null,
        "panNumber": null,
        "parentId": null,
        "places": null,
        "route": null,
        "status": "ACTIVE",
        "type": "customer",
        "updates": null,
        "uuid": "db2c3d99-d990-4759-b855-ea12333749b8",
        "verificationStatus": null,
        "verificationTicketId": null,
        "voterId": null
    }
    let invoiceValue = 65000

    let externalId = 8899674
    let cnPayload = {
        consignmentDate: Date.now(),
        consigner: consigner,
        consignee: consignee,
        externalId: externalId,
        loadInfo: {
            "material": " liquid cargo",
            "valueOfGoods": null,
            "standardMeasurement": {
                "volume": null,
                "packageMeasurement": null,
                "weight": {
                    "actualDeliveredQuantity": null,
                    "density": null,
                    "netQuantity": 30,
                    "moisture": null,
                    "claimQuantity": null,
                    "unitOfMeasurment": "Metric Tonnes",
                    "standardQuantity": 30,
                    "actualLoadedQuantity": null,
                    "measurmentType": "weight",
                    "grossQuantity": 30,
                    "shortage": null,
                    "temperature": null,
                    "plannedLoadQuantity": null,
                    "frieghtDeductableQuantity": null
                },
                "containers": null,
                "trucks": null
            },
            "currency": null,
            "measurements": []
        },
        invoiceNo: null,
        consignmentNo: externalId,
        orderMappings: null,
        associatedShipments: [],
        contractToParty: null,
        lineItems: [],
        customFields: [],
    };

    let cnPayloadNew = {
        "consignee": consignee,
        "consigner": consigner,
        "contractToParty": contractToParty,
        "invoiceValue": invoiceValue,
        "lineItems": [{
            "customerMaterial": null,
            "customFields": null,
            "externalId": null,
            "invoiceNo": null,
            "itemNumber": "1",
            "material": {
                "controlCode": null,
                "division": null,
                "externalId": null,
                "linkedMaterialId": null,
                "materialDescription": null,
                "materialGroup": null,
                "materialGroupId": null,
                "materialType": "Material",
                "measuredQuantity": null,
                "measurementType": null,
                "name": " liquid cargo",
                "orgId": null,
                "partnerId": null,
                "partnerName": null,
                "pricePerUnit": null,
                "taxCode": null,
                "unitOfMeasurement": null,
                "updates": {
                    "changes": null,
                    "description": "Added material  liquid cargo ",
                    "forwardedFrom": null,
                    "forwardReasons": [
                        "material.created.event"
                    ],
                    "resourceId": null,
                    "resourceType": "Material",
                    "revision": null,
                    "sourceOfInformation": null,
                    "time": 1689079239339,
                    "traceID": null,
                    "updatedBy": "USER",
                    "updateType": null,
                    "userId": null,
                    "uuid": null
                },
                "uuid": null
            },
            "transportationServiceId": null,
            "uuid": null,
            "valueOfGoods": 669975
        }],
        "loadInfo": {
            "currency": null,
            "material": " liquid cargo",
            "measurements": [
                {
                    "actualDeliveredQuantity": null,
                    "actualLoadedQuantity": null,
                    "claimQuantity": null,
                    "density": null,
                    "frieghtDeductableQuantity": null,
                    "grossQuantity": null,
                    "measurmentType": "Weight",
                    "moisture": null,
                    "netQuantity": null,
                    "plannedLoadQuantity": null,
                    "shortage": null,
                    "standardQuantity": null,
                    "temperature": null,
                    "unitOfMeasurment": null
                }
            ],
            "standardMeasurement": {
                "containers": null,
                "packageMeasurement": null,
                "trucks": null,
                "volume": null,
                "weight": {
                    "actualDeliveredQuantity": null,
                    "actualLoadedQuantity": null,
                    "claimQuantity": null,
                    "density": null,
                    "frieghtDeductableQuantity": null,
                    "grossQuantity": null,
                    "measurmentType": null,
                    "moisture": null,
                    "netQuantity": 20,
                    "plannedLoadQuantity": null,
                    "shortage": null,
                    "standardQuantity": null,
                    "temperature": null,
                    "unitOfMeasurment": "Metric Tonnes"
                }
            },
            "valueOfGoods": 669975
        },
        "orderMappings": [
            {
                "quantity": {
                    "containers": null,
                    "packageMeasurement": null,
                    "trucks": null,
                    "volume": null,
                    "weight": {
                        "actualDeliveredQuantity": null,
                        "actualLoadedQuantity": null,
                        "claimQuantity": null,
                        "density": null,
                        "frieghtDeductableQuantity": null,
                        "grossQuantity": null,
                        "measurmentType": null,
                        "moisture": null,
                        "netQuantity": 20,
                        "plannedLoadQuantity": null,
                        "shortage": null,
                        "standardQuantity": null,
                        "temperature": null,
                        "unitOfMeasurment": "Metric Tonnes"
                    }
                },
            }
        ],
        "status": "Planned",
        "trackingStatus": "Planned",
    }
    console.log(JSON.stringify(cnPayloadNew))
    await createCn(cnPayload)
}

mainForCreateCn()

async function mainForcreatePo() {

}

// let cnPayload = {
//     "consignee": consignee,
//     "consigner": consigner,
//     "contractToParty": contractToParty,
//     "invoiceValue": invoiceValue,
//     "lineItems": [lineItems],
//     "loadInfo": { loadInfo },
//     "orderMappings": [
//         orderMappings
//     ],
//     "status": "Planned",
//     "trackingStatus": "Planned",
// }
