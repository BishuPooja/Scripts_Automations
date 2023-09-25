const rp = require("request-promise")
const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODE5OTQxOTcsInVzZXJJZCI6ImJvdHVzZXItLWM2NDgzNjRlLWIwYmUtNDljOC05ZjQ1LTkyYjUyOWY4OTNlYyIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLWM2NDgzNjRlLWIwYmUtNDljOC05ZjQ1LTkyYjUyOWY4OTNlYyIsIm9yZ0lkIjoiM2U0Y2RlZTktMGIzYi00NmRkLTliOTgtZGYwZTM4YTAyNzFjIiwibmFtZSI6InByaWNpbmciLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6ZmFsc2UsInBvcnRhbFR5cGUiOiJiYXNpYyJ9.boP-MUL2yfZnW37N7ZsbadiKTirNAJ_kz6zDf1mmobI"

async function getPriceTableData() {
    let res = await rp({
        url: `https://apis.fretron.com/freight-pricing/v1/price/conditions?limit=100&offset=0&freightId=d4dcbe17-01b3-4e06-a5b8-925b1a5693d3&filters=[{"key":"originHub","values":["USUR"]},{"key":"Consignor Ext Id","values":["SURAJPUR"]}]`,
        method: "GET",
        json: true,
        headers: {
            authorization: token
        }

    })
    // console.log(res)
    return res.data
}

async function deletePriceTableCondition(uuid) {
    let res = await rp({
        url: `https://apis.fretron.com/freight-pricing/v1/condition/${uuid}`,
        method: "DELETE",
        json: true,
        headers: {
            authorization: token
        }
    })
    if (res.status == 200) {
        return res
    } else {
        return null
    }
}

async function main() {
    let data = await getPriceTableData()
    console.log(data.length)
    for (let item of data) {
        let uuid = item.uuid
        console.log(uuid)
        let deleteDataRes = await deletePriceTableCondition(uuid)
        console.log(deleteDataRes)
    }
}
// main()

let data1 = [
    {
        "charges": [],
        "priceTableId": "d4dcbe17-01b3-4e06-a5b8-925b1a5693d3",
        "fixedRanges": [
            {
                "min": 1.648755E12,
                "max": 1.68028734E12,
                "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39"
            }
        ],
        "conditionValues": [
            {
                "displayValue": [],
                "ranges": [],
                "fieldPath": "FU Creation Date",
                "allowMissing": false,
                "type": "FixedRange",
                "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39",
                "value": []
            },
            {
                "displayValue": [
                    "DWAD"
                ],
                "ranges": [],
                "fieldPath": "Consignor Ext Id",
                "allowMissing": false,
                "type": "field",
                "uuid": "bdca621b-e6f9-4923-8fed-cc9c68416627",
                "value": [
                    "DWAD"
                ]
            },
            {
                "displayValue": [
                    "WADI"
                ],
                "ranges": [],
                "fieldPath": "originHub",
                "allowMissing": false,
                "type": "field",
                "uuid": "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f",
                "value": [
                    "WADI"
                ]
            },
            {
                "displayValue": [
                    "WARDHA"
                ],
                "ranges": [],
                "fieldPath": "destinationHub",
                "allowMissing": false,
                "type": "field",
                "uuid": "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d",
                "value": [
                    "WARDHA"
                ]
            },
            {
                "displayValue": [
                    "03MT"
                ],
                "ranges": [],
                "fieldPath": "_cf_fixed_ApprovedWeight",
                "allowMissing": false,
                "type": "field",
                "uuid": "17d3c99b-8bc3-42ff-8708-06ff5264e897",
                "value": [
                    "03MT"
                ]
            }
        ],
        "fieldValueIndex": [
            "bdca621b-e6f9-4923-8fed-cc9c68416627_DWAD",
            "bdca621b-e6f9-4923-8fed-cc9c68416627",
            "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f_WADI",
            "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f",
            "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d_WARDHA",
            "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d",
            "17d3c99b-8bc3-42ff-8708-06ff5264e897_03MT",
            "17d3c99b-8bc3-42ff-8708-06ff5264e897"
        ],
        "chargeTypes": [
            {
                "amount": 4200,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Approved Freight_1",
                "rateUnit": "Fixed",
                "uuid": "88b9e774-b498-49c0-b956-51116aa7dcf0",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            },
            {
                "amount": 6250,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Approved Freight_2",
                "rateUnit": "Fixed",
                "uuid": "511cdf96-ba64-4337-9d4b-f6caa9973c02",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            },
            {
                "amount": 0,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Distance(KM)",
                "rateUnit": "Fixed",
                "uuid": "6dff38dc-cc01-412f-b8ac-010068d208e2",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            }
        ],
        "uuid": "e4cade02-3664-4d8e-876e-f7e9c55f7a8f",
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
    },
    {
        "charges": [],
        "priceTableId": "d4dcbe17-01b3-4e06-a5b8-925b1a5693d3",
        "fixedRanges": [
            {
                "min": 1.648755E12,
                "max": 1.68028734E12,
                "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39"
            }
        ],
        "conditionValues": [
            {
                "displayValue": [],
                "ranges": [],
                "fieldPath": "FU Creation Date",
                "allowMissing": false,
                "type": "FixedRange",
                "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39",
                "value": []
            },
            {
                "displayValue": [
                    "DWAD"
                ],
                "ranges": [],
                "fieldPath": "Consignor Ext Id",
                "allowMissing": false,
                "type": "field",
                "uuid": "bdca621b-e6f9-4923-8fed-cc9c68416627",
                "value": [
                    "DWAD"
                ]
            },
            {
                "displayValue": [
                    "WADI"
                ],
                "ranges": [],
                "fieldPath": "originHub",
                "allowMissing": false,
                "type": "field",
                "uuid": "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f",
                "value": [
                    "WADI"
                ]
            },
            {
                "displayValue": [
                    "WARDHA"
                ],
                "ranges": [],
                "fieldPath": "destinationHub",
                "allowMissing": false,
                "type": "field",
                "uuid": "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d",
                "value": [
                    "WARDHA"
                ]
            },
            {
                "displayValue": [
                    "05MT"
                ],
                "ranges": [],
                "fieldPath": "_cf_fixed_ApprovedWeight",
                "allowMissing": false,
                "type": "field",
                "uuid": "17d3c99b-8bc3-42ff-8708-06ff5264e897",
                "value": [
                    "05MT"
                ]
            }
        ],
        "fieldValueIndex": [
            "bdca621b-e6f9-4923-8fed-cc9c68416627_DWAD",
            "bdca621b-e6f9-4923-8fed-cc9c68416627",
            "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f_WADI",
            "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f",
            "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d_WARDHA",
            "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d",
            "17d3c99b-8bc3-42ff-8708-06ff5264e897_05MT",
            "17d3c99b-8bc3-42ff-8708-06ff5264e897"
        ],
        "chargeTypes": [
            {
                "amount": 6250,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Approved Freight_1",
                "rateUnit": "Fixed",
                "uuid": "88b9e774-b498-49c0-b956-51116aa7dcf0",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            },
            {
                "amount": 9750,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Approved Freight_2",
                "rateUnit": "Fixed",
                "uuid": "511cdf96-ba64-4337-9d4b-f6caa9973c02",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            },
            {
                "amount": 0,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Distance(KM)",
                "rateUnit": "Fixed",
                "uuid": "6dff38dc-cc01-412f-b8ac-010068d208e2",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            }
        ],
        "uuid": "18188d57-613f-49ad-b332-3a0b6e55f49d",
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
    },
    {
        "charges": [],
        "priceTableId": "d4dcbe17-01b3-4e06-a5b8-925b1a5693d3",
        "fixedRanges": [
            {
                "min": 1.648755E12,
                "max": 1.68028734E12,
                "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39"
            }
        ],
        "conditionValues": [
            {
                "displayValue": [],
                "ranges": [],
                "fieldPath": "FU Creation Date",
                "allowMissing": false,
                "type": "FixedRange",
                "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39",
                "value": []
            },
            {
                "displayValue": [
                    "DWAD"
                ],
                "ranges": [],
                "fieldPath": "Consignor Ext Id",
                "allowMissing": false,
                "type": "field",
                "uuid": "bdca621b-e6f9-4923-8fed-cc9c68416627",
                "value": [
                    "DWAD"
                ]
            },
            {
                "displayValue": [
                    "WADI"
                ],
                "ranges": [],
                "fieldPath": "originHub",
                "allowMissing": false,
                "type": "field",
                "uuid": "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f",
                "value": [
                    "WADI"
                ]
            },
            {
                "displayValue": [
                    "WARDHA"
                ],
                "ranges": [],
                "fieldPath": "destinationHub",
                "allowMissing": false,
                "type": "field",
                "uuid": "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d",
                "value": [
                    "WARDHA"
                ]
            },
            {
                "displayValue": [
                    "09MT"
                ],
                "ranges": [],
                "fieldPath": "_cf_fixed_ApprovedWeight",
                "allowMissing": false,
                "type": "field",
                "uuid": "17d3c99b-8bc3-42ff-8708-06ff5264e897",
                "value": [
                    "09MT"
                ]
            }
        ],
        "fieldValueIndex": [
            "bdca621b-e6f9-4923-8fed-cc9c68416627_DWAD",
            "bdca621b-e6f9-4923-8fed-cc9c68416627",
            "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f_WADI",
            "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f",
            "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d_WARDHA",
            "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d",
            "17d3c99b-8bc3-42ff-8708-06ff5264e897_09MT",
            "17d3c99b-8bc3-42ff-8708-06ff5264e897"
        ],
        "chargeTypes": [
            {
                "amount": 9750,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Approved Freight_1",
                "rateUnit": "Fixed",
                "uuid": "88b9e774-b498-49c0-b956-51116aa7dcf0",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            },
            {
                "amount": 9750,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Approved Freight_2",
                "rateUnit": "Fixed",
                "uuid": "511cdf96-ba64-4337-9d4b-f6caa9973c02",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            },
            {
                "amount": 0,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Distance(KM)",
                "rateUnit": "Fixed",
                "uuid": "6dff38dc-cc01-412f-b8ac-010068d208e2",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            }
        ],
        "uuid": "0f1a481d-ae1c-4231-aa9c-8ce1915022bf",
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
    },
    {
        "charges": [],
        "priceTableId": "d4dcbe17-01b3-4e06-a5b8-925b1a5693d3",
        "fixedRanges": [
            {
                "min": 1.6802874E12,
                "max": 1.71186654E12,
                "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39"
            }
        ],
        "conditionValues": [
            {
                "displayValue": [],
                "ranges": [],
                "fieldPath": "FU Creation Date",
                "allowMissing": false,
                "type": "FixedRange",
                "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39",
                "value": []
            },
            {
                "displayValue": [
                    "DWAD"
                ],
                "ranges": [],
                "fieldPath": "Consignor Ext Id",
                "allowMissing": false,
                "type": "field",
                "uuid": "bdca621b-e6f9-4923-8fed-cc9c68416627",
                "value": [
                    "DWAD"
                ]
            },
            {
                "displayValue": [
                    "WADI"
                ],
                "ranges": [],
                "fieldPath": "originHub",
                "allowMissing": false,
                "type": "field",
                "uuid": "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f",
                "value": [
                    "WADI"
                ]
            },
            {
                "displayValue": [
                    "WARDHA"
                ],
                "ranges": [],
                "fieldPath": "destinationHub",
                "allowMissing": false,
                "type": "field",
                "uuid": "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d",
                "value": [
                    "WARDHA"
                ]
            },
            {
                "displayValue": [
                    "03MT"
                ],
                "ranges": [],
                "fieldPath": "_cf_fixed_ApprovedWeight",
                "allowMissing": false,
                "type": "field",
                "uuid": "17d3c99b-8bc3-42ff-8708-06ff5264e897",
                "value": [
                    "03MT"
                ]
            }
        ],
        "fieldValueIndex": [
            "bdca621b-e6f9-4923-8fed-cc9c68416627_DWAD",
            "bdca621b-e6f9-4923-8fed-cc9c68416627",
            "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f_WADI",
            "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f",
            "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d_WARDHA",
            "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d",
            "17d3c99b-8bc3-42ff-8708-06ff5264e897_03MT",
            "17d3c99b-8bc3-42ff-8708-06ff5264e897"
        ],
        "chargeTypes": [
            {
                "amount": 4200,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Approved Freight_1",
                "rateUnit": "Fixed",
                "uuid": "88b9e774-b498-49c0-b956-51116aa7dcf0",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            },
            {
                "amount": 6250,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Approved Freight_2",
                "rateUnit": "Fixed",
                "uuid": "511cdf96-ba64-4337-9d4b-f6caa9973c02",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            },
            {
                "amount": 90,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Distance(KM)",
                "rateUnit": "Fixed",
                "uuid": "6dff38dc-cc01-412f-b8ac-010068d208e2",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            }
        ],
        "uuid": "92e2d8f2-ff64-4def-acb1-818744aa57c5",
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
    },
    {
        "charges": [],
        "priceTableId": "d4dcbe17-01b3-4e06-a5b8-925b1a5693d3",
        "fixedRanges": [
            {
                "min": 1.6802874E12,
                "max": 1.71186654E12,
                "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39"
            }
        ],
        "conditionValues": [
            {
                "displayValue": [],
                "ranges": [],
                "fieldPath": "FU Creation Date",
                "allowMissing": false,
                "type": "FixedRange",
                "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39",
                "value": []
            },
            {
                "displayValue": [
                    "DWAD"
                ],
                "ranges": [],
                "fieldPath": "Consignor Ext Id",
                "allowMissing": false,
                "type": "field",
                "uuid": "bdca621b-e6f9-4923-8fed-cc9c68416627",
                "value": [
                    "DWAD"
                ]
            },
            {
                "displayValue": [
                    "WADI"
                ],
                "ranges": [],
                "fieldPath": "originHub",
                "allowMissing": false,
                "type": "field",
                "uuid": "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f",
                "value": [
                    "WADI"
                ]
            },
            {
                "displayValue": [
                    "WARDHA"
                ],
                "ranges": [],
                "fieldPath": "destinationHub",
                "allowMissing": false,
                "type": "field",
                "uuid": "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d",
                "value": [
                    "WARDHA"
                ]
            },
            {
                "displayValue": [
                    "05MT"
                ],
                "ranges": [],
                "fieldPath": "_cf_fixed_ApprovedWeight",
                "allowMissing": false,
                "type": "field",
                "uuid": "17d3c99b-8bc3-42ff-8708-06ff5264e897",
                "value": [
                    "05MT"
                ]
            }
        ],
        "fieldValueIndex": [
            "bdca621b-e6f9-4923-8fed-cc9c68416627_DWAD",
            "bdca621b-e6f9-4923-8fed-cc9c68416627",
            "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f_WADI",
            "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f",
            "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d_WARDHA",
            "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d",
            "17d3c99b-8bc3-42ff-8708-06ff5264e897_05MT",
            "17d3c99b-8bc3-42ff-8708-06ff5264e897"
        ],
        "chargeTypes": [
            {
                "amount": 6250,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Approved Freight_1",
                "rateUnit": "Fixed",
                "uuid": "88b9e774-b498-49c0-b956-51116aa7dcf0",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            },
            {
                "amount": 9750,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Approved Freight_2",
                "rateUnit": "Fixed",
                "uuid": "511cdf96-ba64-4337-9d4b-f6caa9973c02",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            },
            {
                "amount": 90,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Distance(KM)",
                "rateUnit": "Fixed",
                "uuid": "6dff38dc-cc01-412f-b8ac-010068d208e2",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            }
        ],
        "uuid": "ce79acb3-63d2-4b37-95d2-ec8ab686131c",
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
    },
    {
        "charges": [],
        "priceTableId": "d4dcbe17-01b3-4e06-a5b8-925b1a5693d3",
        "fixedRanges": [
            {
                "min": 1.6802874E12,
                "max": 1.71186654E12,
                "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39"
            }
        ],
        "conditionValues": [
            {
                "displayValue": [],
                "ranges": [],
                "fieldPath": "FU Creation Date",
                "allowMissing": false,
                "type": "FixedRange",
                "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39",
                "value": []
            },
            {
                "displayValue": [
                    "DWAD"
                ],
                "ranges": [],
                "fieldPath": "Consignor Ext Id",
                "allowMissing": false,
                "type": "field",
                "uuid": "bdca621b-e6f9-4923-8fed-cc9c68416627",
                "value": [
                    "DWAD"
                ]
            },
            {
                "displayValue": [
                    "WADI"
                ],
                "ranges": [],
                "fieldPath": "originHub",
                "allowMissing": false,
                "type": "field",
                "uuid": "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f",
                "value": [
                    "WADI"
                ]
            },
            {
                "displayValue": [
                    "WARDHA"
                ],
                "ranges": [],
                "fieldPath": "destinationHub",
                "allowMissing": false,
                "type": "field",
                "uuid": "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d",
                "value": [
                    "WARDHA"
                ]
            },
            {
                "displayValue": [
                    "09MT"
                ],
                "ranges": [],
                "fieldPath": "_cf_fixed_ApprovedWeight",
                "allowMissing": false,
                "type": "field",
                "uuid": "17d3c99b-8bc3-42ff-8708-06ff5264e897",
                "value": [
                    "09MT"
                ]
            }
        ],
        "fieldValueIndex": [
            "bdca621b-e6f9-4923-8fed-cc9c68416627_DWAD",
            "bdca621b-e6f9-4923-8fed-cc9c68416627",
            "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f_WADI",
            "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f",
            "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d_WARDHA",
            "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d",
            "17d3c99b-8bc3-42ff-8708-06ff5264e897_09MT",
            "17d3c99b-8bc3-42ff-8708-06ff5264e897"
        ],
        "chargeTypes": [
            {
                "amount": 9750,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Approved Freight_1",
                "rateUnit": "Fixed",
                "uuid": "88b9e774-b498-49c0-b956-51116aa7dcf0",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            },
            {
                "amount": 9750,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Approved Freight_2",
                "rateUnit": "Fixed",
                "uuid": "511cdf96-ba64-4337-9d4b-f6caa9973c02",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            },
            {
                "amount": 90,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Distance(KM)",
                "rateUnit": "Fixed",
                "uuid": "6dff38dc-cc01-412f-b8ac-010068d208e2",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            }
        ],
        "uuid": "81cb15e4-b206-4455-953a-eb15b5ed0fff",
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
    },
    {
        "charges": [],
        "priceTableId": "d4dcbe17-01b3-4e06-a5b8-925b1a5693d3",
        "fixedRanges": [
            {
                "min": 1.6802874E12,
                "max": 1.71186654E12,
                "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39"
            }
        ],
        "conditionValues": [
            {
                "displayValue": [],
                "ranges": [],
                "fieldPath": "FU Creation Date",
                "allowMissing": false,
                "type": "FixedRange",
                "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39",
                "value": []
            },
            {
                "displayValue": [
                    "DWAD"
                ],
                "ranges": [],
                "fieldPath": "Consignor Ext Id",
                "allowMissing": false,
                "type": "field",
                "uuid": "bdca621b-e6f9-4923-8fed-cc9c68416627",
                "value": [
                    "DWAD"
                ]
            },
            {
                "displayValue": [
                    "WADI"
                ],
                "ranges": [],
                "fieldPath": "originHub",
                "allowMissing": false,
                "type": "field",
                "uuid": "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f",
                "value": [
                    "WADI"
                ]
            },
            {
                "displayValue": [
                    "WARDHA"
                ],
                "ranges": [],
                "fieldPath": "destinationHub",
                "allowMissing": false,
                "type": "field",
                "uuid": "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d",
                "value": [
                    "WARDHA"
                ]
            },
            {
                "displayValue": [
                    "15MT"
                ],
                "ranges": [],
                "fieldPath": "_cf_fixed_ApprovedWeight",
                "allowMissing": false,
                "type": "field",
                "uuid": "17d3c99b-8bc3-42ff-8708-06ff5264e897",
                "value": [
                    "15MT"
                ]
            }
        ],
        "fieldValueIndex": [
            "bdca621b-e6f9-4923-8fed-cc9c68416627_DWAD",
            "bdca621b-e6f9-4923-8fed-cc9c68416627",
            "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f_WADI",
            "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f",
            "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d_WARDHA",
            "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d",
            "17d3c99b-8bc3-42ff-8708-06ff5264e897_15MT",
            "17d3c99b-8bc3-42ff-8708-06ff5264e897"
        ],
        "chargeTypes": [
            {
                "amount": 0,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Approved Freight_1",
                "rateUnit": "Fixed",
                "uuid": "88b9e774-b498-49c0-b956-51116aa7dcf0",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            },
            {
                "amount": 0,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Approved Freight_2",
                "rateUnit": "Fixed",
                "uuid": "511cdf96-ba64-4337-9d4b-f6caa9973c02",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            },
            {
                "amount": 90,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Distance(KM)",
                "rateUnit": "Fixed",
                "uuid": "6dff38dc-cc01-412f-b8ac-010068d208e2",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            }
        ],
        "uuid": "91ba1b78-f345-4226-8f36-088d496fef53",
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
    },
    {
        "charges": [],
        "priceTableId": "d4dcbe17-01b3-4e06-a5b8-925b1a5693d3",
        "fixedRanges": [
            {
                "min": 1.6802874E12,
                "max": 1.71186654E12,
                "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39"
            }
        ],
        "conditionValues": [
            {
                "displayValue": [],
                "ranges": [],
                "fieldPath": "FU Creation Date",
                "allowMissing": false,
                "type": "FixedRange",
                "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39",
                "value": []
            },
            {
                "displayValue": [
                    "DWAD"
                ],
                "ranges": [],
                "fieldPath": "Consignor Ext Id",
                "allowMissing": false,
                "type": "field",
                "uuid": "bdca621b-e6f9-4923-8fed-cc9c68416627",
                "value": [
                    "DWAD"
                ]
            },
            {
                "displayValue": [
                    "WADI"
                ],
                "ranges": [],
                "fieldPath": "originHub",
                "allowMissing": false,
                "type": "field",
                "uuid": "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f",
                "value": [
                    "WADI"
                ]
            },
            {
                "displayValue": [
                    "WARDHA"
                ],
                "ranges": [],
                "fieldPath": "destinationHub",
                "allowMissing": false,
                "type": "field",
                "uuid": "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d",
                "value": [
                    "WARDHA"
                ]
            },
            {
                "displayValue": [
                    "20MT"
                ],
                "ranges": [],
                "fieldPath": "_cf_fixed_ApprovedWeight",
                "allowMissing": false,
                "type": "field",
                "uuid": "17d3c99b-8bc3-42ff-8708-06ff5264e897",
                "value": [
                    "20MT"
                ]
            }
        ],
        "fieldValueIndex": [
            "bdca621b-e6f9-4923-8fed-cc9c68416627_DWAD",
            "bdca621b-e6f9-4923-8fed-cc9c68416627",
            "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f_WADI",
            "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f",
            "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d_WARDHA",
            "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d",
            "17d3c99b-8bc3-42ff-8708-06ff5264e897_20MT",
            "17d3c99b-8bc3-42ff-8708-06ff5264e897"
        ],
        "chargeTypes": [
            {
                "amount": 0,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Approved Freight_1",
                "rateUnit": "Fixed",
                "uuid": "88b9e774-b498-49c0-b956-51116aa7dcf0",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            },
            {
                "amount": 0,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Approved Freight_2",
                "rateUnit": "Fixed",
                "uuid": "511cdf96-ba64-4337-9d4b-f6caa9973c02",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            },
            {
                "amount": 90,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Distance(KM)",
                "rateUnit": "Fixed",
                "uuid": "6dff38dc-cc01-412f-b8ac-010068d208e2",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            }
        ],
        "uuid": "eeb48365-6e73-4fde-9088-bdc5f09d6ba5",
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
    },
    {
        "charges": [],
        "priceTableId": "d4dcbe17-01b3-4e06-a5b8-925b1a5693d3",
        "fixedRanges": [
            {
                "min": 1.6802874E12,
                "max": 1.71186654E12,
                "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39"
            }
        ],
        "conditionValues": [
            {
                "displayValue": [],
                "ranges": [],
                "fieldPath": "FU Creation Date",
                "allowMissing": false,
                "type": "FixedRange",
                "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39",
                "value": []
            },
            {
                "displayValue": [
                    "DWAD"
                ],
                "ranges": [],
                "fieldPath": "Consignor Ext Id",
                "allowMissing": false,
                "type": "field",
                "uuid": "bdca621b-e6f9-4923-8fed-cc9c68416627",
                "value": [
                    "DWAD"
                ]
            },
            {
                "displayValue": [
                    "WADI"
                ],
                "ranges": [],
                "fieldPath": "originHub",
                "allowMissing": false,
                "type": "field",
                "uuid": "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f",
                "value": [
                    "WADI"
                ]
            },
            {
                "displayValue": [
                    "WARDHA"
                ],
                "ranges": [],
                "fieldPath": "destinationHub",
                "allowMissing": false,
                "type": "field",
                "uuid": "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d",
                "value": [
                    "WARDHA"
                ]
            },
            {
                "displayValue": [
                    "24MT"
                ],
                "ranges": [],
                "fieldPath": "_cf_fixed_ApprovedWeight",
                "allowMissing": false,
                "type": "field",
                "uuid": "17d3c99b-8bc3-42ff-8708-06ff5264e897",
                "value": [
                    "24MT"
                ]
            }
        ],
        "fieldValueIndex": [
            "bdca621b-e6f9-4923-8fed-cc9c68416627_DWAD",
            "bdca621b-e6f9-4923-8fed-cc9c68416627",
            "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f_WADI",
            "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f",
            "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d_WARDHA",
            "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d",
            "17d3c99b-8bc3-42ff-8708-06ff5264e897_24MT",
            "17d3c99b-8bc3-42ff-8708-06ff5264e897"
        ],
        "chargeTypes": [
            {
                "amount": 0,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Approved Freight_1",
                "rateUnit": "Fixed",
                "uuid": "88b9e774-b498-49c0-b956-51116aa7dcf0",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            },
            {
                "amount": 0,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Approved Freight_2",
                "rateUnit": "Fixed",
                "uuid": "511cdf96-ba64-4337-9d4b-f6caa9973c02",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            },
            {
                "amount": 90,
                "baseValue": 0,
                "isDeleted": false,
                "rate": null,
                "isCalculated": false,
                "baseValueRule": null,
                "chartsOfAccount": null,
                "name": "Distance(KM)",
                "rateUnit": "Fixed",
                "uuid": "6dff38dc-cc01-412f-b8ac-010068d208e2",
                "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
            }
        ],
        "uuid": "f342cc8b-0083-407a-a3bc-6781f6bcf8f2",
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
    }
]
console.log(data1.length)