const { log } = require("console")

let payload1 = {
    "charges": [],
    "priceTableId": "4c39b2b6-bf9f-46f8-8488-7d2fbc7e3769",
    "fixedRanges": [{
        "min": 0.25,
        "max": 0.49,
        "uuid": "0fc058a8-5c8b-4d1a-b42d-92b54546d0cf"
    }],
    "conditionValues": [{
        "displayValue": ["ANY_EXCEPT"],
        "ranges": [],
        "fieldPath": "Consignor Ext Id",
        "allowMissing": false,
        "type": "field",
        "uuid": "c01b2e9b-10c2-4e51-a94f-48c1007c31cd",
        "value": ["ANY_EXCEPT"]
    }, {
        "displayValue": null,
        "ranges": [],
        "fieldPath": "_cf_fixedRange_FU Total Weight",
        "allowMissing": false,
        "type": "FixedRange",
        "uuid": "0fc058a8-5c8b-4d1a-b42d-92b54546d0cf",
        "value": []
    }],
    "fieldValueIndex": ["c01b2e9b-10c2-4e51-a94f-48c1007c31cd_ANY_EXCEPT", "c01b2e9b-10c2-4e51-a94f-48c1007c31cd"],
    "chargeTypes": [{
        "amount": 0.49,
        "baseValue": 0,
        "isDeleted": false,
        "rate": null,
        "isCalculated": false,
        "baseValueRule": null,
        "chartsOfAccount": null,
        "name": "ApplicableWeight",
        "rateUnit": "Fixed",
        "uuid": "29d377c5-2df4-4632-abf9-9cde94d211c5",
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
    }, {
        "amount": null,
        "baseValue": 0,
        "isDeleted": false,
        "rate": 0,
        "isCalculated": true,
        "baseValueRule": null,
        "chartsOfAccount": null,
        "name": "ApplicableWeight_Calculated",
        "rateUnit": "perMT",
        "uuid": "75e1cb49-d275-4aa9-b258-820c82a4eb0d",
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
    }, {
        "amount": null,
        "baseValue": 0,
        "isDeleted": false,
        "rate": 0,
        "isCalculated": true,
        "baseValueRule": null,
        "chartsOfAccount": null,
        "name": "SecondaryWeight",
        "rateUnit": "perMT",
        "uuid": "f1b3c1c5-0a11-469f-a545-fa8d7acd9f42",
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
    }],
    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
}


let payload2 = {
    "charges": [],
    "priceTableId": "4c39b2b6-bf9f-46f8-8488-7d2fbc7e3769",
    "fixedRanges": [{
        "min": 0.50,
        "max": 0.69,
        "uuid": "0fc058a8-5c8b-4d1a-b42d-92b54546d0cf"
    }],
    "conditionValues": [{
        "displayValue": ["ANY_EXCEPT"],
        "ranges": [],
        "fieldPath": "Consignor Ext Id",
        "allowMissing": false,
        "type": "field",
        "uuid": "c01b2e9b-10c2-4e51-a94f-48c1007c31cd",
        "value": ["ANY_EXCEPT"]
    }, {
        "displayValue": null,
        "ranges": [],
        "fieldPath": "_cf_fixedRange_FU Total Weight",
        "allowMissing": false,
        "type": "FixedRange",
        "uuid": "0fc058a8-5c8b-4d1a-b42d-92b54546d0cf",
        "value": []
    }],
    "fieldValueIndex": ["c01b2e9b-10c2-4e51-a94f-48c1007c31cd_ANY_EXCEPT", "c01b2e9b-10c2-4e51-a94f-48c1007c31cd"],
    "chargeTypes": [{
        "amount": 0.69,
        "baseValue": 0,
        "isDeleted": false,
        "rate": null,
        "isCalculated": false,
        "baseValueRule": null,
        "chartsOfAccount": null,
        "name": "ApplicableWeight",
        "rateUnit": "Fixed",
        "uuid": "29d377c5-2df4-4632-abf9-9cde94d211c5",
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
    }, {
        "amount": null,
        "baseValue": 0,
        "isDeleted": false,
        "rate": 0,
        "isCalculated": true,
        "baseValueRule": null,
        "chartsOfAccount": null,
        "name": "ApplicableWeight_Calculated",
        "rateUnit": "perMT",
        "uuid": "75e1cb49-d275-4aa9-b258-820c82a4eb0d",
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
    }, {
        "amount": null,
        "baseValue": 0,
        "isDeleted": false,
        "rate": 0,
        "isCalculated": true,
        "baseValueRule": null,
        "chartsOfAccount": null,
        "name": "SecondaryWeight",
        "rateUnit": "perMT",
        "uuid": "f1b3c1c5-0a11-469f-a545-fa8d7acd9f42",
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
    }],
    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
}

let payload3 = {
    "charges": [],
    "priceTableId": "4c39b2b6-bf9f-46f8-8488-7d2fbc7e3769",
    "fixedRanges": [{
        "min": 0.70,
        "max": 1.50,
        "uuid": "0fc058a8-5c8b-4d1a-b42d-92b54546d0cf"
    }],
    "conditionValues": [{
        "displayValue": ["ANY_EXCEPT"],
        "ranges": [],
        "fieldPath": "Consignor Ext Id",
        "allowMissing": false,
        "type": "field",
        "uuid": "c01b2e9b-10c2-4e51-a94f-48c1007c31cd",
        "value": ["ANY_EXCEPT"]
    }, {
        "displayValue": null,
        "ranges": [],
        "fieldPath": "_cf_fixedRange_FU Total Weight",
        "allowMissing": false,
        "type": "FixedRange",
        "uuid": "0fc058a8-5c8b-4d1a-b42d-92b54546d0cf",
        "value": []
    }],
    "fieldValueIndex": ["c01b2e9b-10c2-4e51-a94f-48c1007c31cd_ANY_EXCEPT", "c01b2e9b-10c2-4e51-a94f-48c1007c31cd"],
    "chargeTypes": [{
        "amount": 1.50,
        "baseValue": 0,
        "isDeleted": false,
        "rate": null,
        "isCalculated": false,
        "baseValueRule": null,
        "chartsOfAccount": null,
        "name": "ApplicableWeight",
        "rateUnit": "Fixed",
        "uuid": "29d377c5-2df4-4632-abf9-9cde94d211c5",
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
    }, {
        "amount": null,
        "baseValue": 0,
        "isDeleted": false,
        "rate": 0,
        "isCalculated": true,
        "baseValueRule": null,
        "chartsOfAccount": null,
        "name": "ApplicableWeight_Calculated",
        "rateUnit": "perMT",
        "uuid": "75e1cb49-d275-4aa9-b258-820c82a4eb0d",
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
    }, {
        "amount": null,
        "baseValue": 0,
        "isDeleted": false,
        "rate": 0,
        "isCalculated": true,
        "baseValueRule": null,
        "chartsOfAccount": null,
        "name": "SecondaryWeight",
        "rateUnit": "perMT",
        "uuid": "f1b3c1c5-0a11-469f-a545-fa8d7acd9f42",
        "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
    }],
    "orgId": "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
}

// 2nd freigth update 



let payload11 = {
    "fixedRanges": [{
        "min": 1680287460000,
        "max": 1711909740000,
        "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39"
    }],
    "chargeTypes": [{
        "amount": "200",
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
    }, {
        "amount": "300",
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
    }, {
        "amount": "0",
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
    }],
    "priceTableId": "d4dcbe17-01b3-4e06-a5b8-925b1a5693d3",
    "fieldValueIndex": [],
    "conditionValues": [{
        "displayValue": [],
        "ranges": [],
        "fieldPath": "FU Creation Date",
        "allowMissing": false,
        "type": "FixedRange",
        "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39",
        "value": []
    }, {
        "displayValue": ["THAR"],
        "ranges": [],
        "fieldPath": "Consignor Ext Id",
        "allowMissing": false,
        "type": "field",
        "uuid": "bdca621b-e6f9-4923-8fed-cc9c68416627",
        "value": ["THAR"]
    }, {
        "displayValue": ["OKHLA"],
        "ranges": [],
        "fieldPath": "originHub",
        "allowMissing": false,
        "type": "field",
        "uuid": "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f",
        "value": ["OKHLA"]
    }, {
        "displayValue": ["OKHLA PHASE-1"],
        "ranges": [],
        "fieldPath": "destinationHub",
        "allowMissing": false,
        "type": "field",
        "uuid": "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d",
        "value": ["OKHLA PHASE-1"]
    }, {
        "displayValue": ["NOT_EXIST"],
        "ranges": [],
        "fieldPath": "_cf_fixed_ApprovedWeight",
        "allowMissing": false,
        "type": "field",
        "uuid": "17d3c99b-8bc3-42ff-8708-06ff5264e897",
        "value": ["0.49MT"]
    }],
    "uuid": null,
    "orgId": null
}

let payload22 = {
    "fixedRanges": [{
        "min": 1680287460000,
        "max": 1711909740000,
        "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39"
    }],
    "chargeTypes": [{
        "amount": "300",
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
    }, {
        "amount": "400",
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
    }, {
        "amount": "0",
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
    }],
    "priceTableId": "d4dcbe17-01b3-4e06-a5b8-925b1a5693d3",
    "fieldValueIndex": [],
    "conditionValues": [{
        "displayValue": [],
        "ranges": [],
        "fieldPath": "FU Creation Date",
        "allowMissing": false,
        "type": "FixedRange",
        "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39",
        "value": []
    }, {
        "displayValue": ["THAR"],
        "ranges": [],
        "fieldPath": "Consignor Ext Id",
        "allowMissing": false,
        "type": "field",
        "uuid": "bdca621b-e6f9-4923-8fed-cc9c68416627",
        "value": ["THAR"]
    }, {
        "displayValue": ["OKHLA"],
        "ranges": [],
        "fieldPath": "originHub",
        "allowMissing": false,
        "type": "field",
        "uuid": "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f",
        "value": ["OKHLA"]
    }, {
        "displayValue": ["OKHLA PHASE-1"],
        "ranges": [],
        "fieldPath": "destinationHub",
        "allowMissing": false,
        "type": "field",
        "uuid": "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d",
        "value": ["OKHLA PHASE-1"]
    }, {
        "displayValue": ["NOT_EXIST"],
        "ranges": [],
        "fieldPath": "_cf_fixed_ApprovedWeight",
        "allowMissing": false,
        "type": "field",
        "uuid": "17d3c99b-8bc3-42ff-8708-06ff5264e897",
        "value": ["0.69MT"]
    }],
    "uuid": null,
    "orgId": null
}


let payload33 = {
    "fixedRanges": [{
        "min": 1680287460000,
        "max": 1711909740000,
        "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39"
    }],
    "chargeTypes": [{
        "amount": "400",
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
    }, {
        "amount": "400",
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
    }, {
        "amount": "0",
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
    }],
    "priceTableId": "d4dcbe17-01b3-4e06-a5b8-925b1a5693d3",
    "fieldValueIndex": [],
    "conditionValues": [{
        "displayValue": [],
        "ranges": [],
        "fieldPath": "FU Creation Date",
        "allowMissing": false,
        "type": "FixedRange",
        "uuid": "a08acef4-60aa-4dde-9a3f-1c5ebf841e39",
        "value": []
    }, {
        "displayValue": ["THAR"],
        "ranges": [],
        "fieldPath": "Consignor Ext Id",
        "allowMissing": false,
        "type": "field",
        "uuid": "bdca621b-e6f9-4923-8fed-cc9c68416627",
        "value": ["THAR"]
    }, {
        "displayValue": ["OKHLA"],
        "ranges": [],
        "fieldPath": "originHub",
        "allowMissing": false,
        "type": "field",
        "uuid": "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f",
        "value": ["OKHLA"]
    }, {
        "displayValue": ["OKHLA PHASE-1"],
        "ranges": [],
        "fieldPath": "destinationHub",
        "allowMissing": false,
        "type": "field",
        "uuid": "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d",
        "value": ["OKHLA PHASE-1"]
    }, {
        "displayValue": ["NOT_EXIST"],
        "ranges": [],
        "fieldPath": "_cf_fixed_ApprovedWeight",
        "allowMissing": false,
        "type": "field",
        "uuid": "17d3c99b-8bc3-42ff-8708-06ff5264e897",
        "value": ["1.50MT"]
    }],
    "uuid": null,
    "orgId": null
}

let destination = "hih elo jdfj"
let ranchiDestination = destination.toLowerCase().includes("ranchi")
if (ranchiDestination) {
    // let res = await mailer(subject, to, cc, html)
    // console.log(res)

    // return JSON.stringify({
    //     data: res,
    //     error: null,
    //     status: 200
    // })
    console.log("Success")
}
else {
    console.log(`Destination Not ranchi ${destination}`);
}
