const rp = require("request-promise")
const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTM1Njk5NDAsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiI2ZjgwZWZmNS1mYWQxLTRmYmYtOTc2Yi1iNWJmYjU5NWQ0NTQiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.y0GJ7HKxrvGNHPZPiFwhQYAuQoQMuoRAbnO5kp04pc4"
async function createIssue(payload) {
    try {
        let url = `https://apis.fretron.com/issue/v1/issue-type`
        let res = await rp({
            uri: url,
            method: "POST",
            json: true,
            body: payload,
            headers: {
                Authorization: TOKEN
            }
        })
        if (res?.error) {
            console.log(`Issue creation ${payload.issueType} Error ${res.error}`)
        }
        if (res.status == 200) {
            console.log(`${payload.issueType} issue Created Successfully`)

        }
        return res
    } catch (e) {
        console.log(`Caught Error Issue Creation ${e.message}`)
    }
    return null
}

async function create_anyDifferenceInNetWeight_issue(sh) {
    try {
        let shNo = sh?.shipmmentNumber
        let shId = sh?.uuid
        let vehicleNumber = sh?.fleetInfo?.vehicle?.vehcileRegistrationNumber
        let driverId = sh?.fleetInfo?.driver?.uuid
        let imei = sh?.fleetInfo?.device?.imei
        let issueType = "Route deviation"
        let cfsPayload = [{

            "fieldKey": "Shipment_ID",
            "multiple": true,
            "description": "Shipment Id",
            "remark": "",
            "uuid": "Shipment_ID",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": shId,
            "isRemark": false
        },
        {

            "fieldKey": "Driver_ID",
            "multiple": true,
            "description": "Driver Id",
            "remark": "",
            "uuid": "Driver_ID",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": driverId,
            "isRemark": false
        },
        {

            "fieldKey": "IMEI",
            "multiple": true,
            "description": "IMEI",
            "remark": "",
            "uuid": "IMEI",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": imei,
            "isRemark": false
        },
        {

            "fieldKey": "Vehicle Number",
            "multiple": true,
            "description": "Vehicle Number",
            "remark": "",
            "uuid": "Vehicle Number",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": vehicleNumber,
            "isRemark": false
        },
        {

            "fieldKey": "Shipment Number",
            "multiple": true,
            "description": "Shipment Number",
            "remark": "",
            "uuid": "Shipment Number",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": shNo,
            "isRemark": false
        }
        ]
        let payload = {
            "issueType": "Any difference in the net weight (loading and unloading)",
            "isSystemIssue": false,
            "isHidden": false,
            "relatedTo": ["Logisitcs"],
            "extensionReasons": [],
            "standardResolutionTime": 10800000,
            "isInternal": false,
            "customFields": cfsPayload,
            "defaultAssignee": {
                "email": "vijay.khanore@welspun.com",
                "mobileNumber": "9879618652",
                "name": "Vijay Khanore",
                "uuid": "5c745688-fe83-455b-bb90-1b1fcb0e8ced"
            },
            "defaultFollowers": [{
                "email": "anmol.kumar@fretron.com",
                "mobileNumber": "9799011349",
                "name": "Ashok Kumar",
                "uuid": "f054619b-34c3-4a97-af7b-4189e627bf81"
            }, {
                "email": "vijay.khanore@welspun.com",
                "mobileNumber": "9879618652",
                "name": "Vijay Khanore",
                "uuid": "5c745688-fe83-455b-bb90-1b1fcb0e8ced"
            }],
            "status": "ACTIVE",
            "escalationLevels": [],
            "showIn": [],
            "sharedDepartments": [],
            "category": "Ticket",
            "linkedIssue": [],
            "assigneeRuleType": "SPECIFIED",
            "assigneeRuleId": null,
            "followerRuleType": "SPECIFIED",
            "followerRuleId": null,
            "dueTimeRuleType": "SPECIFIED",
            "dueTimeRuleId": null
        }

    } catch (e) {
        console.log(`Caught Error ${e.message}`)
    }
}

async function create_RouteDeviation_issue(sh) {
    let shNo = sh?.shipmmentNumber
    let shId = sh?.uuid
    let vehicleNumber = sh?.fleetInfo?.vehicle?.vehcileRegistrationNumber
    let driverId = sh?.fleetInfo?.driver?.uuid
    let imei = sh?.fleetInfo?.device?.imei
    let issueType = "Route deviation"
    let cfsPayload = [{

        "fieldKey": "Shipment_ID",
        "multiple": true,
        "description": "Shipment Id",
        "remark": "",
        "uuid": "Shipment_ID",
        "required": false,
        "accessType": "internal",
        "input": "",
        "unit": "",
        "valueType": "string",
        "options": null,
        "fieldType": "string",
        "value": shId,
        "isRemark": false
    },
    {

        "fieldKey": "Driver_ID",
        "multiple": true,
        "description": "Driver Id",
        "remark": "",
        "uuid": "Driver_ID",
        "required": false,
        "accessType": "internal",
        "input": "",
        "unit": "",
        "valueType": "string",
        "options": null,
        "fieldType": "string",
        "value": driverId,
        "isRemark": false
    },
    {

        "fieldKey": "IMEI",
        "multiple": true,
        "description": "IMEI",
        "remark": "",
        "uuid": "IMEI",
        "required": false,
        "accessType": "internal",
        "input": "",
        "unit": "",
        "valueType": "string",
        "options": null,
        "fieldType": "string",
        "value": imei,
        "isRemark": false
    },
    {

        "fieldKey": "Vehicle Number",
        "multiple": true,
        "description": "Vehicle Number",
        "remark": "",
        "uuid": "Vehicle Number",
        "required": false,
        "accessType": "internal",
        "input": "",
        "unit": "",
        "valueType": "string",
        "options": null,
        "fieldType": "string",
        "value": vehicleNumber,
        "isRemark": false
    },
    {

        "fieldKey": "Shipment Number",
        "multiple": true,
        "description": "Shipment Number",
        "remark": "",
        "uuid": "Shipment Number",
        "required": false,
        "accessType": "internal",
        "input": "",
        "unit": "",
        "valueType": "string",
        "options": null,
        "fieldType": "string",
        "value": shNo,
        "isRemark": false
    }
    ]
    let payload = {
        "issueType": "Route deviation",
        "isSystemIssue": false,
        "isHidden": false,
        "relatedTo": ["Logisitcs"],
        "extensionReasons": [],
        "standardResolutionTime": 10800000,
        "isInternal": false,
        "customFields": cfsPayload,
        "defaultAssignee": {
            "email": "soc@welspun.com",
            "mobileNumber": "9638900011",
            "name": "Welspun Anjar SOC",
            "uuid": "92f33ff6-e3e0-411c-88c8-b1edfbcb4d4c"
        },
        "defaultFollowers": [{
            "email": "deepak_thakur@welspun.com",
            "mobileNumber": "7043076390",
            "name": "Deepak Thakur",
            "uuid": "cf27ac35-57cc-4aed-9b5d-20a415ac9b3a"
        }],
        "status": "ACTIVE",
        "escalationLevels": [],
        "showIn": [],
        "sharedDepartments": [],
        "category": "Ticket",
        "linkedIssue": [],
        "assigneeRuleType": "SPECIFIED",
        "assigneeRuleId": null,
        "followerRuleType": "SPECIFIED",
        "followerRuleId": null,
        "dueTimeRuleType": "SPECIFIED",
        "dueTimeRuleId": null
    }
    await createIssue(payload)
}
// create_RouteDeviation_issue()

async function create_EddPassed_issue(sh) {
    let shNo = sh?.shipmmentNumber
    let shId = sh?.uuid
    let vehicleNumber = sh?.fleetInfo?.vehicle?.vehcileRegistrationNumber
    let driverId = sh?.fleetInfo?.driver?.uuid
    let imei = sh?.fleetInfo?.device?.imei
    let issueType = "Route deviation"
    let cfsPayload = [{

        "fieldKey": "Shipment_ID",
        "multiple": true,
        "description": "Shipment Id",
        "remark": "",
        "uuid": "Shipment_ID",
        "required": false,
        "accessType": "internal",
        "input": "",
        "unit": "",
        "valueType": "string",
        "options": null,
        "fieldType": "string",
        "value": shId,
        "isRemark": false
    },
    {

        "fieldKey": "Driver_ID",
        "multiple": true,
        "description": "Driver Id",
        "remark": "",
        "uuid": "Driver_ID",
        "required": false,
        "accessType": "internal",
        "input": "",
        "unit": "",
        "valueType": "string",
        "options": null,
        "fieldType": "string",
        "value": driverId,
        "isRemark": false
    },
    {

        "fieldKey": "IMEI",
        "multiple": true,
        "description": "IMEI",
        "remark": "",
        "uuid": "IMEI",
        "required": false,
        "accessType": "internal",
        "input": "",
        "unit": "",
        "valueType": "string",
        "options": null,
        "fieldType": "string",
        "value": imei,
        "isRemark": false
    },
    {

        "fieldKey": "Vehicle Number",
        "multiple": true,
        "description": "Vehicle Number",
        "remark": "",
        "uuid": "Vehicle Number",
        "required": false,
        "accessType": "internal",
        "input": "",
        "unit": "",
        "valueType": "string",
        "options": null,
        "fieldType": "string",
        "value": vehicleNumber,
        "isRemark": false
    },
    {

        "fieldKey": "Shipment Number",
        "multiple": true,
        "description": "Shipment Number",
        "remark": "",
        "uuid": "Shipment Number",
        "required": false,
        "accessType": "internal",
        "input": "",
        "unit": "",
        "valueType": "string",
        "options": null,
        "fieldType": "string",
        "value": shNo,
        "isRemark": false
    }
    ]
    let payload = {
        "issueType": "EDD Passed",
        "isSystemIssue": false,
        "isHidden": false,
        "relatedTo": ["Logisitcs"],
        "extensionReasons": [],
        "standardResolutionTime": 10800000,
        "isInternal": false,
        "customFields": cfsPayload,
        "defaultAssignee": null,
        "defaultFollowers": [],
        "status": "ACTIVE",
        "escalationLevels": [],
        "showIn": [],
        "sharedDepartments": [],
        "category": "Ticket",
        "linkedIssue": [],
        "assigneeRuleType": "SPECIFIED",
        "assigneeRuleId": null,
        "followerRuleType": "SPECIFIED",
        "followerRuleId": null,
        "dueTimeRuleType": "SPECIFIED",
        "dueTimeRuleId": null
    }
}

async function create_redZone_issue(sh) {
    let shNo = sh?.shipmmentNumber
    let shId = sh?.uuid
    let vehicleNumber = sh?.fleetInfo?.vehicle?.vehcileRegistrationNumber
    let driverId = sh?.fleetInfo?.driver?.uuid
    let imei = sh?.fleetInfo?.device?.imei
    let issueType = "Route deviation"
    let cfsPayload = [{

        "fieldKey": "Shipment_ID",
        "multiple": true,
        "description": "Shipment Id",
        "remark": "",
        "uuid": "Shipment_ID",
        "required": false,
        "accessType": "internal",
        "input": "",
        "unit": "",
        "valueType": "string",
        "options": null,
        "fieldType": "string",
        "value": shId,
        "isRemark": false
    },
    {

        "fieldKey": "Driver_ID",
        "multiple": true,
        "description": "Driver Id",
        "remark": "",
        "uuid": "Driver_ID",
        "required": false,
        "accessType": "internal",
        "input": "",
        "unit": "",
        "valueType": "string",
        "options": null,
        "fieldType": "string",
        "value": driverId,
        "isRemark": false
    },
    {

        "fieldKey": "IMEI",
        "multiple": true,
        "description": "IMEI",
        "remark": "",
        "uuid": "IMEI",
        "required": false,
        "accessType": "internal",
        "input": "",
        "unit": "",
        "valueType": "string",
        "options": null,
        "fieldType": "string",
        "value": imei,
        "isRemark": false
    },
    {

        "fieldKey": "Vehicle Number",
        "multiple": true,
        "description": "Vehicle Number",
        "remark": "",
        "uuid": "Vehicle Number",
        "required": false,
        "accessType": "internal",
        "input": "",
        "unit": "",
        "valueType": "string",
        "options": null,
        "fieldType": "string",
        "value": vehicleNumber,
        "isRemark": false
    },
    {

        "fieldKey": "Shipment Number",
        "multiple": true,
        "description": "Shipment Number",
        "remark": "",
        "uuid": "Shipment Number",
        "required": false,
        "accessType": "internal",
        "input": "",
        "unit": "",
        "valueType": "string",
        "options": null,
        "fieldType": "string",
        "value": shNo,
        "isRemark": false
    }
    ]
    let payload = {
        "issueType": "Red Zones",
        "isSystemIssue": false,
        "isHidden": false,
        "relatedTo": ["Logisitcs"],
        "extensionReasons": [],
        "standardResolutionTime": 10800000,
        "isInternal": false,
        "customFields": cfsPayload,
        "defaultAssignee": {
            "email": "soc@welspun.com",
            "mobileNumber": "9638900011",
            "name": "Welspun Anjar SOC",
            "uuid": "92f33ff6-e3e0-411c-88c8-b1edfbcb4d4c"
        },
        "defaultFollowers": [{
            "email": "deepak_thakur@welspun.com",
            "mobileNumber": "7043076390",
            "name": "Deepak Thakur",
            "uuid": "cf27ac35-57cc-4aed-9b5d-20a415ac9b3a"
        }],
        "status": "ACTIVE",
        "escalationLevels": [],
        "showIn": [],
        "sharedDepartments": [],
        "category": "Ticket",
        "linkedIssue": [],
        "assigneeRuleType": "SPECIFIED",
        "assigneeRuleId": null,
        "followerRuleType": "SPECIFIED",
        "followerRuleId": null,
        "dueTimeRuleType": "SPECIFIED",
        "dueTimeRuleId": null
    }
}

async function create_gpsDisconnectionAlert_issue(sh) {
    try {
        let shNo = sh?.shipmmentNumber
        let shId = sh?.uuid
        let vehicleNumber = sh?.fleetInfo?.vehicle?.vehcileRegistrationNumber
        let driverId = sh?.fleetInfo?.driver?.uuid
        let imei = sh?.fleetInfo?.device?.imei
        let issueType = "Route deviation"
        let cfsPayload = [{
            "fieldKey": "Shipment_ID",
            "multiple": true,
            "description": "Shipment Id",
            "remark": "",
            "uuid": "Shipment_ID",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": shId,
            "isRemark": false
        },
        {
            "fieldKey": "Driver_ID",
            "multiple": true,
            "description": "Driver Id",
            "remark": "",
            "uuid": "Driver_ID",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": driverId,
            "isRemark": false
        },
        {
            "fieldKey": "IMEI",
            "multiple": true,
            "description": "IMEI",
            "remark": "",
            "uuid": "IMEI",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": imei,
            "isRemark": false
        },
        {
            "fieldKey": "Vehicle Number",
            "multiple": true,
            "description": "Vehicle Number",
            "remark": "",
            "uuid": "Vehicle Number",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": vehicleNumber,
            "isRemark": false
        },
        {
            "fieldKey": "Shipment Number",
            "multiple": true,
            "description": "Shipment Number",
            "remark": "",
            "uuid": "Shipment Number",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": shNo,
            "isRemark": false
        }
        ]
        let payload = {
            "issueType": "GPS Disconnection Alert",
            "isSystemIssue": false,
            "isHidden": false,
            "relatedTo": ["Logisitcs"],
            "extensionReasons": [],
            "standardResolutionTime": 10800000,
            "isInternal": false,
            "customFields": cfsPayload,
            "defaultAssignee": {
                "email": "soc@welspun.com",
                "mobileNumber": "9638900011",
                "name": "Welspun Anjar SOC",
                "uuid": "92f33ff6-e3e0-411c-88c8-b1edfbcb4d4c"
            },
            "defaultFollowers": [{
                "email": "deepak_thakur@welspun.com",
                "mobileNumber": "7043076390",
                "name": "Deepak Thakur",
                "uuid": "cf27ac35-57cc-4aed-9b5d-20a415ac9b3a"
            }],
            "status": "ACTIVE",
            "escalationLevels": [],
            "showIn": [],
            "sharedDepartments": [],
            "category": "Ticket",
            "linkedIssue": [],
            "assigneeRuleType": "SPECIFIED",
            "assigneeRuleId": null,
            "followerRuleType": "SPECIFIED",
            "followerRuleId": null,
            "dueTimeRuleType": "SPECIFIED",
            "dueTimeRuleId": null
        }
    } catch (e) {
        console.log(`Caught Error creation Gps Disconnection Alert ${e.message}`)
    }

}

async function create_portLoadingTat_issue(sh) {
    try {
        let shNo = sh?.shipmmentNumber
        let shId = sh?.uuid
        let vehicleNumber = sh?.fleetInfo?.vehicle?.vehcileRegistrationNumber
        let driverId = sh?.fleetInfo?.driver?.uuid
        let imei = sh?.fleetInfo?.device?.imei
        let issueType = "Route deviation"
        let cfsPayload = [{
            "fieldKey": "Shipment_ID",
            "multiple": true,
            "description": "Shipment Id",
            "remark": "",
            "uuid": "Shipment_ID",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": shId,
            "isRemark": false
        },
        {

            "fieldKey": "Driver_ID",
            "multiple": true,
            "description": "Driver Id",
            "remark": "",
            "uuid": "Driver_ID",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": driverId,
            "isRemark": false
        },
        {

            "fieldKey": "IMEI",
            "multiple": true,
            "description": "IMEI",
            "remark": "",
            "uuid": "IMEI",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": imei,
            "isRemark": false
        },
        {

            "fieldKey": "Vehicle Number",
            "multiple": true,
            "description": "Vehicle Number",
            "remark": "",
            "uuid": "Vehicle Number",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": vehicleNumber,
            "isRemark": false
        },
        {

            "fieldKey": "Shipment Number",
            "multiple": true,
            "description": "Shipment Number",
            "remark": "",
            "uuid": "Shipment Number",
            "required": false,
            "accessType": "internal",
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": shNo,
            "isRemark": false
        }
        ]
        let payload = {
            "issueType": "Port Loading TAT",
            "isSystemIssue": false,
            "isHidden": false,
            "relatedTo": ["Logisitcs"],
            "extensionReasons": [],
            "standardResolutionTime": 10800000,
            "isInternal": false,
            "customFields": cfsPayload,
            "defaultAssignee": null,
            "defaultFollowers": [{
                "email": "deepak_thakur@welspun.com",
                "mobileNumber": "7043076390",
                "name": "Deepak Thakur",
                "uuid": "cf27ac35-57cc-4aed-9b5d-20a415ac9b3a"
            }],
            "status": "ACTIVE",
            "escalationLevels": [],
            "showIn": [],
            "sharedDepartments": [],
            "category": "Ticket",
            "linkedIssue": [],
            "assigneeRuleType": "SPECIFIED",
            "assigneeRuleId": null,
            "followerRuleType": "SPECIFIED",
            "followerRuleId": null,
            "dueTimeRuleType": "SPECIFIED",
            "dueTimeRuleId": null
        }
    } catch (e) {
        console.log(`Caught Error Creation Port Loading Tat Issue ${e.message}`)
    }

}

async function ensureIssueExists(issueType, shipmentNo) {
    try {

        let filters = { "issueType.keyword": [`${issueType}`], "tags.keyword": [], "status.keyword": ["Open"], "escalationLevel.keyword": [], "escalationName.keyword": [], "escalationPerson.email.keyword": [], "userFollowers.email.keyword": [], "assignee.email.keyword": [], "reporter.email.keyword": [], "_customeField": { "Shipment Number": [`${shipmentNo}`] }, "resourceType.keyword": [], "priority.keyword": [] }


        let url = `https://apis.fretron.com/shipment-view/issues/issues?filters=${encodeURIComponent(JSON.stringify(filters))}`

        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                Authorization: TOKEN
            }
        })
        console.log(res)
        if (res?.length) {
            return false
        }
    } catch (e) {
        console.log(`Caught Error Ensure Issue Exitsts ${e.message}`)
    }
    return true
}

async function main(sh) {
    let shNo = sh?.shipmmentNumber
    let issueExists = await ensureIssueExists(issueType, shNo)
    console.log(issueExists)
    if (issueExists) {
        // create Issue
    } else {
        console.log(`issue already created for this shipment`)
    }
}
main()

