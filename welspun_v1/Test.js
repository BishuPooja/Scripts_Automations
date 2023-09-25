const _ = require('lodash')
var _f = function (record) {
    function extractFromCf(cfs, key) {
        return cfs?.find(({ fieldKey }) => fieldKey === key)?.value ?? ""
    }

    function convertMilliseconds(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));

        const remainingHours = hours % 24;
        const remainingMinutes = minutes % 60;
        return `${String(days).padStart(2, "0")} days ${String(remainingHours).padStart(2, "0")} hours ${String(remainingMinutes).padStart(2, "0")} minutes`
    }

    function calculateTAT(issue) {
        try {
            let cfs = issue.customFields

            let liftingDate = extractFromCf(cfs, "Material Lifting Date")

            if (!liftingDate) {
                return ""
            }
            // let currentTime = Date.now()
            let lastEpochOfDay = (liftingDate).setHours(23, 59, 0, 0);


            let extraTimeForLifting = lastEpochOfDay - liftingDate
            extraTimeForLifting = extraTimeForLifting + 8.64e+7
            // console.log(extraTimeForLifting)
            //Adding 1 day as per logic
            let liftingDate_buffer = Number(liftingDate) + Number(extraTimeForLifting)

            let creationTime = issue.createdAt

            let issueStatus = issue.status

            let resolutionDate = issue.resolutionDate


            //Resolved on time condition
            if (issueStatus == "Resolved" && resolutionDate && liftingDate_buffer > resolutionDate) {
                return "Resolved on Time"
            }

            //Delayed condition
            if (resolutionDate && liftingDate_buffer < resolutionDate) {
                let timeDiff = resolutionDate - liftingDate_buffer
                let delayStr = convertMilliseconds(timeDiff)
                return `Delayed By ${delayStr}`
            }

            if (!resolutionDate && liftingDate_buffer < Date.now()) {
                let timeDiff = Date.now() - liftingDate_buffer
                let delayStr = convertMilliseconds(timeDiff)
                return `Delayed By ${delayStr}`
            }

            //Due in condition
            if (!resolutionDate && liftingDate_buffer > Date.now()) {
                let timeDiff = liftingDate_buffer - creationTime
                // return `${timeDiff} lift ${liftingDate_buffer} creat ${creationTime} `
                let delayStr = convertMilliseconds(timeDiff)
                return `Due In ${delayStr}`
            }


        } catch (err) {
        }
        return ""
    }

    let issue = record
    let formattedTime = calculateTAT(issue)
    console.log(formattedTime)
    return calculateTAT(issue)
}
let issue = {
    "resourceId": null,
    "attachments": [],
    "customeFields": null,
    "customFields": [
        {
            "indexedValue": [
                "Supplier Code_PLSL1510"
            ],
            "fieldKey": "Supplier Code",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "75a5ff8e-1dac-4329-8f3c-33460f9a4f1a",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "PLSL1510",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Supplier Name_JINDAL STAINLESS LIMITED-KOTHAVALASA"
            ],
            "fieldKey": "Supplier Name",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "e57e6eae-8a8b-4d07-ad47-e9f1a59db4da",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "JINDAL STAINLESS LIMITED-KOTHAVALASA",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Supplier Contact Person Name_B.RAMU NAIDU"
            ],
            "fieldKey": "Supplier Contact Person Name",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "eb11258b-775d-4ae9-9368-ba5561576b9c",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "B.RAMU NAIDU",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Supplier Contact Person Number_9398079375"
            ],
            "fieldKey": "Supplier Contact Person Number",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "8b6e33eb-6a2d-4aab-b17c-922ad1fa4f23",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "9398079375",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Supplier Alternate No._null"
            ],
            "fieldKey": "Supplier Alternate No.",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "7b61dd84-4820-41cf-b3ba-c578161658e9",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": null,
            "isRemark": false
        },
        {
            "indexedValue": [
                "Supplier Billing Address_JINDAL STAINLESS LIMITED-KOTHAVALSA"
            ],
            "fieldKey": "Supplier Billing Address",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "3adcec66-092e-4a00-9605-e22fbec0b481",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "JINDAL STAINLESS LIMITED-KOTHAVALSA",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Inco Term_EXW"
            ],
            "fieldKey": "Inco Term",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "92404f09-2e55-4457-a61f-2791053df538",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [
                "EXW"
            ],
            "fieldType": "select",
            "value": "EXW",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Material Value Approx._null"
            ],
            "fieldKey": "Material Value Approx.",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "912452d8-942c-4d28-a550-e66454683ace",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": null,
            "isRemark": false
        },
        {
            "indexedValue": [
                "L/C Consignment_Yes"
            ],
            "fieldKey": "L/C Consignment",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "ece4c416-d78b-4064-a39f-5897f656182b",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [
                "Yes",
                "No"
            ],
            "fieldType": "select",
            "value": "Yes",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Unloading Plant_1100-HRD"
            ],
            "fieldKey": "Unloading Plant",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "d01c62ed-04f0-4e43-925d-deb30ef8ff31",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [
                "1100-HRD",
                "1200-CRD"
            ],
            "fieldType": "select",
            "value": "1100-HRD",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Unloading Area_JINDAL STAINLESS LIMITED - HISAR"
            ],
            "fieldKey": "Unloading Area",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "aef36d65-0514-43b2-bb5d-9e76523d3cad",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "JINDAL STAINLESS LIMITED - HISAR",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Supplier Lifting Address_JINDAL STAINLESS LIMITED-KOTHAVALASA"
            ],
            "fieldKey": "Supplier Lifting Address",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "82c434c5-fda2-4a4d-9554-b9f0d04a4da7",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "JINDAL STAINLESS LIMITED-KOTHAVALASA",
            "isRemark": false
        },
        {
            "indexedValue": [
                "FTL/LTL_FTL"
            ],
            "fieldKey": "FTL/LTL",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "a8eacf36-9eb3-43c8-99c3-3f139975e217",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [
                "FTL",
                "LTL"
            ],
            "fieldType": "select",
            "value": "FTL",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Material dimension (mm^3) (L*W*H)_null"
            ],
            "fieldKey": "Material dimension (mm^3) (L*W*H)",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "f3ede34c-fea4-493d-9f54-9bd7dc38e51e",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": null,
            "isRemark": false
        },
        {
            "indexedValue": [
                "PO Number_3500044437"
            ],
            "fieldKey": "PO Number",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "ab3e1c40-ad4a-44cc-bad1-520be473e2b0",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "3500044437",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Material Description_0-3 MRP"
            ],
            "fieldKey": "Material Description",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "a0f06455-3d69-41aa-b92a-5eadea54cc67",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "0-3 MRP",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Remarks_"
            ],
            "fieldKey": "Remarks",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "f3a8e364-1194-4683-8215-ef385c2879d7",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Qty (MT)_42"
            ],
            "fieldKey": "Qty (MT)",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "c9370517-6548-484f-bed5-b2ccee9d8192",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "42",
            "isRemark": false
        },
        {
            "indexedValue": [
                "No of Pieces_null"
            ],
            "fieldKey": "No of Pieces",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "6fb8d765-6d97-47c5-8b10-b96cfc6a2862",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": null,
            "isRemark": false
        },
        {
            "indexedValue": [
                "Vehicle Type Required_TRUCK"
            ],
            "fieldKey": "Vehicle Type Required",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "339a1eb9-5a3b-498a-80af-e8f51fa8f4ce",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "TRUCK",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Material Lifting Date_1693420200000"
            ],
            "fieldKey": "Material Lifting Date",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "80f06447-6926-47b3-b00b-c1c371507134",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [],
            "fieldType": "date",
            "value": "1693420200000",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Plant User Name_b.ramu naidu"
            ],
            "fieldKey": "Plant User Name",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "2fc9ffa0-d56b-4125-8ee8-ac8b7e0050d1",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "b.ramu naidu",
            "isRemark": false
        },
        {
            "indexedValue": [
                "FO Number_6700027281"
            ],
            "fieldKey": "FO Number",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": "637c50f4-1a0c-4e37-af94-ab107fc4d941",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": "",
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "6700027281",
            "isRemark": false
        },
        {
            "indexedValue": [],
            "fieldKey": "Photos of Material",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "042a1436-8348-402f-baca-eb8c1be4ce88",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "arrayOfJson",
            "options": [],
            "fieldType": "file",
            "value": null,
            "isRemark": false
        },
        {
            "indexedValue": [
                "Vehicle Requisition Datetime_1693480918275"
            ],
            "fieldKey": "Vehicle Requisition Datetime",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": "3fec473a-7417-4b26-bc22-a87a6543e00d",
            "required": false,
            "accessType": null,
            "input": "date",
            "unit": "",
            "valueType": "string",
            "options": [],
            "fieldType": "dateTime",
            "value": "1693480918275",
            "isRemark": false
        }
    ],
    "resolutionDate": 1693545692600,
    "source": null,
    "updates": {
        "traceID": "54ab9560-e7c1-4ab0-b723-150408e2ded5",
        "resourceId": "68ac6931-515d-4bab-bd4f-0a53d596e379",
        "updatedBy": "USER",
        "changes": null,
        "sourceOfInformation": null,
        "description": "marked issue Resolved",
        "forwardReasons": [
            "issue.status.updated"
        ],
        "userId": "a42e539c-88f3-42cf-a1e7-d13e0b60833d",
        "uuid": "db988d84-cd59-4a8f-a3d1-add4ffb86ac9",
        "revision": 0,
        "time": 1693545693053,
        "forwardedFrom": null,
        "resourceType": "Issue",
        "updateType": null
    },
    "issueNo": "FRET0014009",
    "uuid": "68ac6931-515d-4bab-bd4f-0a53d596e379",
    "branch": null,
    "orgId": "613f9f42-b5e4-4779-97e1-40a8dc59d0e9",
    "createdAt": 1693480918011,
    "issueTypeId": "c64cd074-6a6e-41ee-b551-c7fffcd29da2",
    "escalationPerson": null,
    "userWatchers": null,
    "descriptionHTML": "<div>0-3 MRP</div>",
    "filterTags": null,
    "escalationDueDate": null,
    "updatedAt": 1693545693053,
    "holdOnTime": null,
    "dueDateExtensions": null,
    "issueSummery": "Raise Vehicle Requirement - Manual PO",
    "creator": null,
    "resolutionDuration": null,
    "updatedBy": null,
    "comments": null,
    "onHoldDueTo": null,
    "showIn": [],
    "reporter": {
        "address": null,
        "profileThumbnailString": null,
        "mobileNumber": "9398079375",
        "authToken": null,
        "updates": null,
        "uuid": "8c364b99-11c4-4eee-aa3f-1227c943f35c",
        "mergedUserIds": null,
        "isGod": null,
        "profileDocumentId": null,
        "otpEnabled": null,
        "onBoardingType": null,
        "alternateEmails": null,
        "name": "BR Naidu",
        "tokens": null,
        "alternateMobileNumbers": null,
        "email": "br.naidu@jindalstainless.com"
    },
    "priority": "LOW",
    "escalationLevel": null,
    "parentId": null,
    "tags": [],
    "issueType": "Raise Vehicle Requirement - Manual PO",
    "dueAt": 1693567259474,
    "estimatedResolutionDate": null,
    "bpartnerFollowers": null,
    "resourceIdentifier": null,
    "escalationName": null,
    "secondaryStatus": "Approved",
    "bpartnerWatchers": null,
    "assignee": {
        "address": null,
        "profileThumbnailString": null,
        "mobileNumber": "9938250593",
        "authToken": null,
        "updates": null,
        "uuid": "913b1db2-3a04-4235-ada1-8c10c31a0ae5",
        "mergedUserIds": null,
        "isGod": null,
        "profileDocumentId": null,
        "otpEnabled": null,
        "onBoardingType": null,
        "alternateEmails": null,
        "name": "Rinkesh Khosla",
        "tokens": null,
        "alternateMobileNumbers": null,
        "email": "rinkesh.khosla@jindalstainless.com"
    },
    "category": "Approval",
    "subIssues": null,
    "userFollowers": [
        {
            "address": null,
            "profileThumbnailString": null,
            "mobileNumber": "9938250593",
            "authToken": null,
            "updates": null,
            "uuid": "913b1db2-3a04-4235-ada1-8c10c31a0ae5",
            "mergedUserIds": null,
            "isGod": null,
            "profileDocumentId": null,
            "otpEnabled": null,
            "onBoardingType": null,
            "alternateEmails": null,
            "name": "Rinkesh Khosla",
            "tokens": null,
            "alternateMobileNumbers": null,
            "email": "rinkesh.khosla@jindalstainless.com"
        },
        {
            "address": null,
            "profileThumbnailString": null,
            "mobileNumber": "9896437820",
            "authToken": null,
            "updates": null,
            "uuid": "613713e6-c174-442f-bfb7-0660a40eb0a0",
            "mergedUserIds": null,
            "isGod": null,
            "profileDocumentId": null,
            "otpEnabled": null,
            "onBoardingType": null,
            "alternateEmails": null,
            "name": "Yashpal Dhiman",
            "tokens": null,
            "alternateMobileNumbers": null,
            "email": "yashpal.dhiman@jshl.in"
        },
        {
            "address": null,
            "profileThumbnailString": null,
            "mobileNumber": "8802846946",
            "authToken": null,
            "updates": null,
            "uuid": "760fb5f2-8c6c-4982-bc0a-c699ef22b7e3",
            "mergedUserIds": null,
            "isGod": null,
            "profileDocumentId": null,
            "otpEnabled": null,
            "onBoardingType": null,
            "alternateEmails": null,
            "name": "Ravi Verma",
            "tokens": null,
            "alternateMobileNumbers": null,
            "email": "ravi.verma1@jshl.in"
        },
        {
            "address": null,
            "profileThumbnailString": null,
            "mobileNumber": "8053910270",
            "authToken": null,
            "updates": null,
            "uuid": "0a90bb37-724b-4e0f-98fa-1928561f8116",
            "mergedUserIds": null,
            "isGod": null,
            "profileDocumentId": null,
            "otpEnabled": null,
            "onBoardingType": null,
            "alternateEmails": null,
            "name": "Bhavneet Arora",
            "tokens": null,
            "alternateMobileNumbers": null,
            "email": "bhavneet.arora@jshl.in"
        },
        {
            "address": null,
            "profileThumbnailString": null,
            "mobileNumber": "9996028883",
            "authToken": null,
            "updates": null,
            "uuid": "a179393d-e51a-47a8-a805-61b7d3fa5135",
            "mergedUserIds": null,
            "isGod": null,
            "profileDocumentId": null,
            "otpEnabled": null,
            "onBoardingType": null,
            "alternateEmails": null,
            "name": "Parveen Verma",
            "tokens": null,
            "alternateMobileNumbers": null,
            "email": "parveen.verma@jshl.in"
        },
        {
            "address": null,
            "profileThumbnailString": null,
            "mobileNumber": "8966 263254",
            "authToken": null,
            "updates": null,
            "uuid": "39bc254b-34b2-4f07-98b8-3e5e06fce125",
            "mergedUserIds": null,
            "isGod": null,
            "profileDocumentId": null,
            "otpEnabled": null,
            "onBoardingType": null,
            "alternateEmails": null,
            "name": "Dinesh Sharma",
            "tokens": null,
            "alternateMobileNumbers": null,
            "email": "dinesh.sharma@jindalstainless.com"
        },
        {
            "address": null,
            "profileThumbnailString": null,
            "mobileNumber": "9398079375",
            "authToken": null,
            "updates": null,
            "uuid": "8c364b99-11c4-4eee-aa3f-1227c943f35c",
            "mergedUserIds": null,
            "isGod": null,
            "profileDocumentId": null,
            "otpEnabled": null,
            "onBoardingType": null,
            "alternateEmails": null,
            "name": "BR Naidu",
            "tokens": null,
            "alternateMobileNumbers": null,
            "email": "br.naidu@jindalstainless.com"
        }
    ],
    "issueDescription": "0-3 MRP",
    "resourceType": "Ex. Works (Raise New Vehicle Request)",
    "status": "Resolved"
}
_f(issue)


function convertMilliseconds(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    return `${String(days).padStart(2, "0")} days ${String(remainingHours).padStart(2, "0")} hours ${String(remainingMinutes).padStart(2, "0")} minutes`
}

// let currentTime = Date.now()
// let lastEpochOfDay = new Date(currentTime).setHours(23, 59, 0, 0);
// console.log(currentTime, lastEpochOfDay)

// let extraTimeForLifting = lastEpochOfDay - currentTime
// extraTimeForLifting = extraTimeForLifting + Number(1 * 24 * 60 * 60 * 1000)
// let dateFormat = convertMilliseconds(112157610)
// console.log(dateFormat)

