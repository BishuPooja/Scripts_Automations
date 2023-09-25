const rp = require("request-promise")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"
const _ = require("lodash")



const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTA3OTc0MzIsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiODIzOTQ3YTMtMDJjMC00ZTY1LThmNGUtMjFkYTM3MGVhNmNkIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.L7E7sb5uop2tT8iBUZQQUPMQNO-Fk1KVLHvLCI7BF8g"

const gps_assigned_by = "GPS Assigned by"
const gps_assign_time = "GPS Assign Time"   
const created_by = "Shipment Created By"

async function bulkSyncApi(payload) {
    let url = `${FRT_PUB_BASE_URL}/shipment/v1/shipment/bulk/sync`;
    try {
        let res = await rp({
            method: "POST",
            uri: url,
            body: payload,
            headers: {
                Authorization: TOKEN,
            },
            json: true,
        });
        console.log(`Bulk Sync api response status : ${res.status}`);
        if (res.status == 200) {
            return res.data;
        } else {
            console.log(`Bulk Sync api response error : ${res.error}`);
        }
    } catch (e) {
        console.log(`Catched Error in Bulk Sync api : ${e.message}`);
    }
    return null;
}
function getFromCf(cfs, key) {
    return cfs?.find((v) => v.fieldKey == key)?.value ?? null
}

async function getActivityLogs(shId) {
    try {
        let url = `${FRT_PUB_BASE_URL}/shipment/v1/shipment/${shId}/update-trail/v2?limit=200&offset=0`
        let res = await rp({
            method: "GET",
            uri: url,
            headers: {
                Authorization: TOKEN,
            },
            json: true,
        });

        return res?.data?.length ? res.data : []

    } catch (e) {
        console.log(`error in getting ActivityLogs ${e.message}`)
    }
}

function getCfPayload(key, value, fieldType, input) {
    return {
        "fieldKey": key,
        "multiple": false,
        "remark": "",
        "required": false,
        "accessType": null,
        "input": input,
        "unit": "",
        "valueType": "string",
        "options": [],
        "fieldType": fieldType,
        "value": value,
        "isRemark": false
    }
}
async function main(sh) {
    try {
        let shId = sh?.uuid
        let shNo = sh?.shipmentNumber
        console.log(`shNo ${shNo}`)
        let cfs = sh?.customFields ?? []
        let updatedCf = []
        let isUpdatedCf = false
        let sh_created_by = getFromCf(cfs, created_by)
        let gpsAssignedBy = getFromCf(cfs, gps_assigned_by)
        let gpsAssignTime = getFromCf(cfs, gps_assign_time)
        let activityLogs = null

        if (!sh_created_by || !gpsAssignedBy || !gpsAssignTime) {
            activityLogs = await getActivityLogs(shId)
            console.log(`activitylogs ${activityLogs.length}`)
        }
        if (!sh_created_by && activityLogs) {
            sh_created_by = activityLogs.find((v) => v?.description?.includes("Created Shipment"))?.updatedBy
            console.log(`shCreate By activity log ${sh_created_by}`)
            updatedCf.push(getCfPayload(created_by, sh_created_by, "text", "string"))
            isUpdatedCf = true
        }
        if ((!gpsAssignedBy || !gpsAssignTime) && activityLogs) {
            let switchTrackingModeLogs = activityLogs.find((v) => v?.description?.includes("Switched Tracking-Mode from"))
            if (switchTrackingModeLogs?.description?.includes("to VTS") && !switchTrackingModeLogs?.description?.includes("to VTS-LBS")) {
                gpsAssignedBy = switchTrackingModeLogs?.updatedBy
                gpsAssignTime = switchTrackingModeLogs?.time
            } else {
                gpsAssignedBy = activityLogs.find((v) => v?.description?.includes("Created Shipment"))?.updatedBy
                gpsAssignTime = activityLogs.find((v) => v?.description?.includes("Created Shipment"))?.time
            }
            if (gpsAssignedBy && gpsAssignTime) {
                updatedCf.push(getCfPayload(gps_assigned_by, gpsAssignedBy, "text", "string"))
                updatedCf.push(getCfPayload(gps_assign_time, gpsAssignTime, "dateTime", "date"))
                isUpdatedCf = true
            }

        }

        if (isUpdatedCf) {
            let payload = {
                shipmentId: shId,
                updates: [
                    {
                        keyToUpdate: "customfields",
                        updatedValue: updatedCf,
                    },
                ],
            };
            console.log(updatedCf.map(_ => {
                return `${_.fieldKey}___${_.value}`

            }))
            // await bulkSyncApi(payload)
        } else {
            console.log(`All CFS already Exists ${shNo}`)
        }
    } catch (e) {
        console.log(`error in main ${e.message}`)
    }
}

let sh = {
    "creationTime": 1690514816428,
    "customFields": [
        {
            "indexedValue": [
                "FreightCost_0.0"
            ],
            "fieldKey": "FreightCost",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "0.0",
            "isRemark": false
        },
        {
            "indexedValue": [
                "FreightType_perMT"
            ],
            "fieldKey": "FreightType",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "perMT",
            "isRemark": false
        },
        {
            "indexedValue": [
                "PONo_0f261371-9c29-4243-9057-b2e088be4032"
            ],
            "fieldKey": "PONo",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "0f261371-9c29-4243-9057-b2e088be4032",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Insurance No._"
            ],
            "fieldKey": "Insurance No.",
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
            "value": "",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Insurance Valid From_null"
            ],
            "fieldKey": "Insurance Valid From",
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
            "fieldType": "date",
            "value": null,
            "isRemark": false
        },
        {
            "indexedValue": [
                "Insurance Expiry Date_null"
            ],
            "fieldKey": "Insurance Expiry Date",
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
            "fieldType": "date",
            "value": null,
            "isRemark": false
        },
        {
            "indexedValue": [
                "Pollution No._"
            ],
            "fieldKey": "Pollution No.",
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
            "value": "",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Pollution Valid From_null"
            ],
            "fieldKey": "Pollution Valid From",
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
            "fieldType": "date",
            "value": null,
            "isRemark": false
        },
        {
            "indexedValue": [
                "Pollution Expiry Date_null"
            ],
            "fieldKey": "Pollution Expiry Date",
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
            "fieldType": "date",
            "value": null,
            "isRemark": false
        },
        {
            "indexedValue": [
                "RC ID_"
            ],
            "fieldKey": "RC ID",
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
            "value": "",
            "isRemark": false
        },
        {
            "indexedValue": [
                "RC Valid From_null"
            ],
            "fieldKey": "RC Valid From",
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
            "fieldType": "date",
            "value": null,
            "isRemark": false
        },
        {
            "indexedValue": [
                "RC Expire Date_null"
            ],
            "fieldKey": "RC Expire Date",
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
            "fieldType": "date",
            "value": null,
            "isRemark": false
        },
        {
            "indexedValue": [
                "Color_#324aa8"
            ],
            "fieldKey": "Color",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": "",
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "#324aa8",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Lead Distance_427"
            ],
            "fieldKey": "Lead Distance",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "66ad97c5-2eca-42ec-9840-16f9b28ff66c",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "427",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Material_RB_FE550D_8.0DIA_12"
            ],
            "fieldKey": "Material",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": "6d0afe9d-f7c1-4093-9195-58b87f72b745",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "text",
            "options": null,
            "fieldType": "text",
            "value": "RB_FE550D_8.0DIA_12",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Customer Name_JINDAL STEEL & POWER LIMITED."
            ],
            "fieldKey": "Customer Name",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": "6ff7f20c-be7d-40e8-80b4-00ac5ba2565f",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": "JINDAL STEEL & POWER LIMITED.",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Customer City_ANGUL-JINDAL STEEL & POWER LIMITED."
            ],
            "fieldKey": "Customer City",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": "b5653c89-251b-408b-8fd4-7ee803379ba2",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "text",
            "options": null,
            "fieldType": "text",
            "value": "ANGUL-JINDAL STEEL & POWER LIMITED.",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Quantity_40"
            ],
            "fieldKey": "Quantity",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": "404a34f0-284e-4f5f-8e53-bb181f751125",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "text",
            "options": null,
            "fieldType": "text",
            "value": "40",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Material Type_TMT"
            ],
            "fieldKey": "Material Type",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": "78aa10fd-ad54-4a7f-88c2-627e9852ad79",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "text",
            "options": null,
            "fieldType": "text",
            "value": "TMT",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Route Km_354"
            ],
            "fieldKey": "Route Km",
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
            "value": "354",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Driver GPS Advance_350"
            ],
            "fieldKey": "Driver GPS Advance",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": "1e177911-7120-4ca6-9fd8-ef31d13428d7",
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "350",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Transportation Type_CT"
            ],
            "fieldKey": "Transportation Type",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": "1c8ac8ca-1340-4b2c-bbd9-d6fe22143777",
            "required": true,
            "accessType": "mandatory_on_create",
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [
                "PT",
                "PTD",
                "CT"
            ],
            "fieldType": "select",
            "value": "CT",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Driver Remark_"
            ],
            "fieldKey": "Driver Remark",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": "66ec1fb9-70c9-44e6-8506-fb3ace5dbb1a",
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": "",
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "",
            "isRemark": false
        },
        {
            "indexedValue": [
                "In Plant Remark_null"
            ],
            "fieldKey": "In Plant Remark",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": "8e0069eb-b20b-4645-a92b-eaa342b2a7a3",
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": "",
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": null,
            "isRemark": false
        },
        {
            "indexedValue": [
                "Vehicle Stage_In Transit"
            ],
            "fieldKey": "Vehicle Stage",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": "85930cbf-3eb2-48e9-8609-ec574dca56e0",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "In Transit",
            "isRemark": false
        },
        {
            "indexedValue": [],
            "fieldKey": "Driver Image",
            "multiple": true,
            "description": "",
            "remark": "",
            "uuid": "6ecf7031-f259-48c5-81ce-ded0e755fee9",
            "required": false,
            "accessType": null,
            "input": "",
            "unit": "",
            "valueType": "arrayOfJson",
            "options": [],
            "fieldType": "camera",
            "value": "[{\"resourceId\":null,\"customFields\":null,\"downloadUrl\":\"https://storage.googleapis.com/fretron-document-bucket/uploads/823947a3-02c0-4e65-8f4e-21da370ea6cd/6d974985-9f07-4ca2-a0c4-93083f3aee38@Image.jpg?GoogleAccessId=cloud-storage-service@fretron-206223.iam.gserviceaccount.com&Expires=2554515074&Signature=mVcZnFE%2FTeJFBB%2B9h0NvC9ZtYWpNX%2BT%2Bf1hNeqCNM9%2BhoyXZp0mBN0KX1BxMTR6V0bLXzkGevr1KtjZLX%2FasGkt4pkYRideMM53bHZHHKgXLL%2F7V%2FUt7kcfJupakmDYDHIh9R96S515NoASh330oAuQoqzksYcM1MpN3WiJkBK9x1doZvKkmQU6MuSOW3NIgXSkRlPuyx%2F2wlgtDnN97x3r3b2xn3pBNs21m2oAP6Hw5XnbI8jahI4gMd1q5Mt6nJzDuCt%2Fgh%2BraJ%2FHk%2F7dL4sfOk42zUr5W5n69%2B1h8pbs1PRU92x6zl2Msjs65N6eB8oY05Xs%2F6Fg%2FGLJjVT76UQ%3D%3D\",\"updates\":{\"traceID\":\"21cd9cfd-41dc-4b4a-8381-0606138574b6\",\"resourceId\":\"6d974985-9f07-4ca2-a0c4-93083f3aee38\",\"updatedBy\":\"USER\",\"changes\":null,\"sourceOfInformation\":\"created\",\"description\":\"document created\",\"forwardReasons\":[\"document.added\"],\"userId\":\"509364de-437d-4c83-ba2b-1906e879538a\",\"uuid\":\"f2086a55-4b1d-41da-9cea-7ca3c64334d5\",\"revision\":null,\"time\":1690515074004,\"forwardedFrom\":null,\"resourceType\":\"Document\",\"updateType\":null},\"uuid\":\"6d974985-9f07-4ca2-a0c4-93083f3aee38\",\"orgId\":\"823947a3-02c0-4e65-8f4e-21da370ea6cd\",\"docPath\":\"/uploads/823947a3-02c0-4e65-8f4e-21da370ea6cd/6d974985-9f07-4ca2-a0c4-93083f3aee38@Image.jpg\",\"createdAt\":1690515074004,\"isExpirable\":false,\"previewString\":null,\"createdBy\":\"509364de-437d-4c83-ba2b-1906e879538a\",\"name\":\"Image.jpg\",\"expireDate\":null,\"resourceType\":\"FILE\"}]",
            "isRemark": false
        },
        {
            "indexedValue": [],
            "fieldKey": "GPS Installation",
            "multiple": true,
            "description": "",
            "remark": "",
            "uuid": "89bf77e2-3f01-423f-a38e-06d19c6550bc",
            "required": false,
            "accessType": null,
            "input": "",
            "unit": "",
            "valueType": "arrayOfJson",
            "options": [],
            "fieldType": "camera",
            "value": null,
            "isRemark": false
        },
        {
            "indexedValue": [
                "Device Connection_null"
            ],
            "fieldKey": "Device Connection",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": "2e4b9ef3-33a1-4f88-9ab9-0f19e0b9a071",
            "required": false,
            "accessType": null,
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": [
                "Fuse Box/Battery",
                "Others",
                "Installed (Fuse Box/Battery)",
                "Installed (Others)"
            ],
            "fieldType": "select",
            "value": null,
            "isRemark": false
        },
        {
            "indexedValue": [
                "Disconnection Remark _In khemar, Odisha, Driver trying to on Gps ."
            ],
            "fieldKey": "Disconnection Remark ",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": "c9319ab4-fedd-4f51-8491-dd9056214433",
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": "",
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "In khemar, Odisha, Driver trying to on Gps .",
            "isRemark": false
        },
        {
            "indexedValue": [
                "DO ISSUED_D.O. Issued"
            ],
            "fieldKey": "DO ISSUED",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": "f31b50cc-3363-45ac-b8a6-a92d1233e3ea",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": null,
            "options": [
                "D.O. Issued",
                "Not Issued"
            ],
            "fieldType": "radio-button",
            "value": "D.O. Issued",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Do Numbers_0072114878"
            ],
            "fieldKey": "Do Numbers",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": "bbcfb69c-4da9-401b-8249-a825203b3fe7",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "0072114878",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Do Creation Time SAP_1690564940000"
            ],
            "fieldKey": "Do Creation Time SAP",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "d5db4856-4add-45b2-924e-00570590d436",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "dateTime",
            "value": "1690564940000",
            "isRemark": false
        },
        {
            "indexedValue": [
                "GateInDone_Yes"
            ],
            "fieldKey": "GateInDone",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": "4f052728-d3f0-49e2-a4ce-3b32cb4b1765",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [
                "Yes",
                "No"
            ],
            "fieldType": "yes-no",
            "value": "Yes",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Tracking Mode Updated By_ANJAN KUMAR"
            ],
            "fieldKey": "Tracking Mode Updated By",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "ANJAN KUMAR",
            "isRemark": false
        },
        {
            "indexedValue": [
                "GPS Assign Time_1690565511904"
            ],
            "fieldKey": "GPS Assign Time",
            "multiple": true,
            "description": "GPS Assign Time",
            "remark": "",
            "uuid": "c5026bd7-d23a-4b83-a052-6e41f8876554",
            "required": false,
            "accessType": null,
            "input": "date",
            "unit": "",
            "valueType": "string",
            "options": [],
            "fieldType": "dateTime",
            "value": "1690565511904",
            "isRemark": false
        },
        {
            "indexedValue": [
                "GPS Assigned by_ANJAN KUMAR"
            ],
            "fieldKey": "GPS Assigned by",
            "multiple": false,
            "description": "GPS Assigned by",
            "remark": "",
            "uuid": "71a00204-bd5b-4dd6-a56e-22017336b6d4",
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": "",
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "ANJAN KUMAR",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Gate In Time SAP_1690570189000"
            ],
            "fieldKey": "Gate In Time SAP",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "7ebd919b-c4ac-4b2c-8e92-df4151efc466",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "dateTime",
            "value": "1690570189000",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Gate Entry Number_7110173347"
            ],
            "fieldKey": "Gate Entry Number",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": "a25f8a4f-c70d-486b-b447-b810b8e8bff3",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "7110173347",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Tare Weight Time SAP_1690570773000"
            ],
            "fieldKey": "Tare Weight Time SAP",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "77f2e771-3304-41f2-90de-30482bee88da",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "dateTime",
            "value": "1690570773000",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Tare Weight_14.82 "
            ],
            "fieldKey": "Tare Weight",
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
            "value": "14.82 ",
            "isRemark": false
        },
        {
            "indexedValue": [
                "LoadingStartTime_1690571233000"
            ],
            "fieldKey": "LoadingStartTime",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "b9778ca9-838f-4938-a0ab-30d466a611d2",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "dateTime",
            "value": "1690571233000",
            "isRemark": false
        },
        {
            "indexedValue": [
                "LoadingSinceFourHour_Yes"
            ],
            "fieldKey": "LoadingSinceFourHour",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "88b124dc-795c-40d4-8919-5fa4680f4863",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": [
                "Yes"
            ],
            "fieldType": "yes-no",
            "value": "Yes",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Gross Weight_41.500 "
            ],
            "fieldKey": "Gross Weight",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "dfbf9de9-0658-4878-93a7-79c7ccca3708",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "41.500 ",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Gross Weight Time_1690605470000"
            ],
            "fieldKey": "Gross Weight Time",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "dateTime",
            "value": "1690605470000",
            "isRemark": false
        },
        {
            "indexedValue": [
                "LoadingEndTime_1690593009000"
            ],
            "fieldKey": "LoadingEndTime",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "e5acefd0-f623-4da0-90e5-6a79f6474cef",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "dateTime",
            "value": "1690593009000",
            "isRemark": false
        },
        {
            "indexedValue": [
                "PGI Time DO Item 0072114878_1690618586000"
            ],
            "fieldKey": "PGI Time DO Item 0072114878",
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
            "fieldType": "dateTime",
            "value": "1690618586000",
            "isRemark": false
        },
        {
            "indexedValue": [
                "TC Time DO Item 000010_1690618629000"
            ],
            "fieldKey": "TC Time DO Item 000010",
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
            "fieldType": "dateTime",
            "value": "1690618629000",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Invoice 1107282216 Time_1690618915000"
            ],
            "fieldKey": "Invoice 1107282216 Time",
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
            "fieldType": "dateTime",
            "value": "1690618915000",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Net Wt Order 0700700521 : 000010_41.040 "
            ],
            "fieldKey": "Net Wt Order 0700700521 : 000010",
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
            "value": "41.040 ",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Freight PerMt Order 0700700521 : 000010_0"
            ],
            "fieldKey": "Freight PerMt Order 0700700521 : 000010",
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
            "value": "0",
            "isRemark": false
        },
        {
            "indexedValue": [
                "LR Number_345"
            ],
            "fieldKey": "LR Number",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "41241c4f-b464-423b-b8fe-65d42b6a7a73",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "345",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Gate Out Time SAP_1690621972000"
            ],
            "fieldKey": "Gate Out Time SAP",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": "d31d3fe8-faa9-436e-ab34-1bd4f144bfe8",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "dateTime",
            "value": "1690621972000",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Invoice Numbers_1107282216"
            ],
            "fieldKey": "Invoice Numbers",
            "multiple": false,
            "description": "",
            "remark": null,
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "text",
            "value": "1107282216",
            "isRemark": false
        },
        {
            "indexedValue": [
                "SAP Total Weight_41.04"
            ],
            "fieldKey": "SAP Total Weight",
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
            "fieldType": "string",
            "value": "41.04",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Applicable MGT Via Vehicle capacity_41.04"
            ],
            "fieldKey": "Applicable MGT Via Vehicle capacity",
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
            "fieldType": "string",
            "value": "41.04",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Plant LoadingEndTime_1690593034000"
            ],
            "fieldKey": "Plant LoadingEndTime",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": "366df6c9-6754-498f-b3c2-a09db37b2ae0",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "dateTime",
            "value": "1690593034000",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Plant LoadingStartTime_1690571483000"
            ],
            "fieldKey": "Plant LoadingStartTime",
            "multiple": false,
            "description": null,
            "remark": null,
            "uuid": "dcfa7a28-4964-4e72-ac30-f647232ec76f",
            "required": false,
            "accessType": null,
            "input": null,
            "unit": null,
            "valueType": "string",
            "options": null,
            "fieldType": "dateTime",
            "value": "1690571483000",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Disconnection Time_63694000"
            ],
            "fieldKey": "Disconnection Time",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": "",
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "63694000",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Disconnection KM_152.007"
            ],
            "fieldKey": "Disconnection KM",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": "",
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "152.007",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Power Cut Count_4"
            ],
            "fieldKey": "Power Cut Count",
            "multiple": false,
            "description": "",
            "remark": "",
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": "",
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": "4",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Last GPS Disconnection Time_1690763867785"
            ],
            "fieldKey": "Last GPS Disconnection Time",
            "multiple": true,
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
            "value": "1690763867785",
            "isRemark": false
        },
        {
            "indexedValue": [
                "LONG_DISCONNECTED_NO"
            ],
            "fieldKey": "LONG_DISCONNECTED",
            "multiple": true,
            "description": "LONG_DISCONNECTED",
            "remark": "",
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "",
            "unit": "",
            "valueType": "string",
            "options": null,
            "fieldType": "string",
            "value": "NO",
            "isRemark": false
        },
        {
            "indexedValue": [
                "Shipment Created By_null"
            ],
            "fieldKey": "Shipment Created By",
            "multiple": false,
            "description": null,
            "remark": "",
            "uuid": null,
            "required": false,
            "accessType": null,
            "input": "string",
            "unit": "",
            "valueType": "string",
            "options": [],
            "fieldType": "text",
            "value": null,
            "isRemark": false
        }
    ],
    "transportationMode": "ByRoad",
    "freightUnitLineItemId": "2124e280-e4e0-470f-b3ca-c94c2d4672ed",
    "lastSyncUpTime": 1690799570822,
    "updates": {
        "traceID": "fa4b0573-0849-410b-9865-b1ee757bc124",
        "resourceId": "84ce2390-02d6-41ea-b639-b7f166640c13",
        "updatedBy": "USER",
        "changes": null,
        "sourceOfInformation": null,
        "description": null,
        "forwardReasons": [
            "shipment.custom.fields.updated"
        ],
        "userId": "a42e539c-88f3-42cf-a1e7-d13e0b60833d",
        "uuid": "6f0d733b-afd6-4975-bb0d-590079239860",
        "revision": 785,
        "time": 1690800381458,
        "forwardedFrom": "",
        "resourceType": "ShipmentObject",
        "updateType": null
    },
    "isActive": true,
    "uuid": "84ce2390-02d6-41ea-b639-b7f166640c13",
    "issues": null,
    "branch": null,
    "orgId": "823947a3-02c0-4e65-8f4e-21da370ea6cd",
    "shipmentType": "DirectLeg",
    "completionTime": null,
    "orderNumbers": [
        "FRVR0019243"
    ],
    "routeId": null,
    "shipmentTrackingStatus": "Enroute For Delivery",
    "lastForwardTime": 1690797798400,
    "runningStatus": null,
    "delayTrackingStatus": "UP TO DATE",
    "delayReasonLastUpdateTime": null,
    "links": null,
    "shipmentDate": 1690514815896,
    "delayReason": null,
    "shipmentNumber": "FRETSH000035144",
    "originalEdd": 1690855943200,
    "edd": 1690855943200,
    "delayReasonUpdateExpiryTime": null,
    "externalShipmentId": null,
    "fleetInfo": {
        "isTrackingEnable": null,
        "forwardingAgent": null,
        "verificationStatus": null,
        "trackingMode": "VTS",
        "broker": {
            "geoFence": null,
            "documents": [],
            "customFields": null,
            "isPortalEnabled": false,
            "type": "vendor",
            "updates": null,
            "uuid": "5f72b240-bf0e-4e2a-acbd-27c412f34a18",
            "orgId": "823947a3-02c0-4e65-8f4e-21da370ea6cd",
            "firmType": "INDIVISUAL",
            "gstn": null,
            "voterId": null,
            "verificationTicketId": null,
            "companyCodes": null,
            "group": {
                "name": "lorryOwner",
                "partnerType": null,
                "uuid": null,
                "orgId": null
            },
            "address": "{\"address\":null,\"city\":null,\"state\":null,\"pincode\":null}",
            "verificationStatus": "unverified",
            "externalId": null,
            "panNumber": null,
            "aadharNo": null,
            "parentId": null,
            "places": null,
            "route": null,
            "name": "SANDHU LOGISTICS",
            "location": null,
            "fretronId": null,
            "contacts": null,
            "status": "ACTIVE"
        },
        "uuid": "14364be7-27d6-4363-b374-41f6d5efa0f9",
        "orgId": null,
        "vehicle": {
            "vtsDeviceId": null,
            "kmDriven": null,
            "secondaryDriverId": null,
            "attachedDocs": [],
            "customFields": [
                {
                    "indexedValue": [
                        "Vehicle Status_Active"
                    ],
                    "fieldKey": "Vehicle Status",
                    "valueType": "string",
                    "fieldType": "select",
                    "value": "Active",
                    "definitionId": "1dc11c2b-1d17-46e4-b309-82f3f45769e4"
                }
            ],
            "floorType": null,
            "description": null,
            "source": "FRETRON",
            "isTrackingEnabled": false,
            "updates": null,
            "uuid": null,
            "branch": null,
            "orgId": "823947a3-02c0-4e65-8f4e-21da370ea6cd",
            "vehicleLoadType": {
                "bodyType": "Flat",
                "passingCapacityMT": 2,
                "minLength": 0,
                "updates": {
                    "traceID": null,
                    "resourceId": "005de6fa-f29a-4443-872c-175d10baa2db",
                    "updatedBy": "USER",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": "Updated Load Type .",
                    "forwardReasons": [
                        "load.type.updated.event"
                    ],
                    "userId": "69a70ee3-34b1-4d82-9318-2eefea484214",
                    "uuid": "6ece3310-3f22-43d1-88ea-1e5d4e191acf",
                    "revision": null,
                    "time": 1661618638525,
                    "forwardedFrom": null,
                    "resourceType": "LoadTypes",
                    "updateType": null
                },
                "vehicleCategories": [],
                "uuid": "005de6fa-f29a-4443-872c-175d10baa2db",
                "orgId": "823947a3-02c0-4e65-8f4e-21da370ea6cd",
                "vehicleCategory": "TRAILER",
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
                "numberOfWheels": 18,
                "chassisType": "8 FT Width Flat",
                "includeMinHeight": false,
                "name": "TRAILER",
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
            "vehicleType": "TRAILER",
            "groups": null,
            "externalId": null,
            "updateTime": 1690514255999,
            "sharedWith": null,
            "baseLocationId": null,
            "vehicleMake": null,
            "vehicleRegistrationNumber": "OD04R7946",
            "chassisNumber": null,
            "driverId": null,
            "createTime": null,
            "loadCapacity": 2,
            "truckLength": null,
            "category": null,
            "groupsExtended": null
        },
        "driver": {
            "pincode": null,
            "dlExpiryTime": 1759516200000,
            "attachedDocs": [],
            "isEmployee": false,
            "pfNumber": null,
            "address": null,
            "mobileNumbers": null,
            "dlNumber": "UP60 20130011279",
            "mobileNumber": "6360588616",
            "customFields": [
                {
                    "indexedValue": [
                        "Smart Phone_NO"
                    ],
                    "fieldKey": "Smart Phone",
                    "valueType": "string",
                    "fieldType": "yes-no",
                    "value": "NO",
                    "definitionId": null
                }
            ],
            "externalId": null,
            "updates": {
                "traceID": "26908821-d57a-4db0-8d7a-49ba4a30697f",
                "resourceId": "76fa7571-25d8-419a-812b-d8db958b96fe",
                "updatedBy": "USER",
                "changes": null,
                "sourceOfInformation": null,
                "description": "added new Driver KRISHNA MOHAN YADAV",
                "forwardReasons": [
                    "driver.add.event"
                ],
                "userId": "9388767b-7bd2-432c-8316-b45ed7c835b0",
                "uuid": "ea10d988-1ffd-4f16-ba0b-f23289acd6fa",
                "revision": null,
                "time": 1676460749318,
                "forwardedFrom": null,
                "resourceType": "Driver",
                "updateType": null
            },
            "aadharNo": null,
            "type": null,
            "uuid": "76fa7571-25d8-419a-812b-d8db958b96fe",
            "branch": null,
            "orgId": "823947a3-02c0-4e65-8f4e-21da370ea6cd",
            "vehicleRegistrationNumber": null,
            "dob": null,
            "name": "KRISHNA MOHAN YADAV",
            "vehicleId": null,
            "associatedUserId": null,
            "status": "Active"
        },
        "fleetType": "Owned",
        "fleetOwner": {
            "geoFence": null,
            "documents": [],
            "customFields": null,
            "isPortalEnabled": false,
            "type": "vendor",
            "updates": null,
            "uuid": "5f72b240-bf0e-4e2a-acbd-27c412f34a18",
            "orgId": "823947a3-02c0-4e65-8f4e-21da370ea6cd",
            "firmType": "INDIVISUAL",
            "gstn": null,
            "voterId": null,
            "verificationTicketId": null,
            "companyCodes": null,
            "group": {
                "name": "lorryOwner",
                "partnerType": null,
                "uuid": null,
                "orgId": null
            },
            "address": "{\"address\":null,\"city\":null,\"state\":null,\"pincode\":null}",
            "verificationStatus": "unverified",
            "externalId": null,
            "panNumber": null,
            "aadharNo": null,
            "parentId": null,
            "places": null,
            "route": null,
            "name": "SANDHU LOGISTICS",
            "location": null,
            "fretronId": null,
            "contacts": [
                {
                    "emails": [],
                    "address": null,
                    "mobileNumbers": [],
                    "mobileNumber": null,
                    "name": "SANDHU LOGISTICS",
                    "type": null
                }
            ],
            "status": "ACTIVE"
        },
        "trainInfo": null,
        "lbsNumber": "7763873593",
        "secondaryDriver": {
            "pincode": null,
            "dlExpiryTime": null,
            "attachedDocs": null,
            "isEmployee": false,
            "pfNumber": null,
            "address": null,
            "mobileNumbers": null,
            "dlNumber": null,
            "mobileNumber": null,
            "customFields": null,
            "externalId": null,
            "updates": null,
            "aadharNo": null,
            "type": null,
            "uuid": null,
            "branch": null,
            "orgId": null,
            "vehicleRegistrationNumber": null,
            "dob": null,
            "name": null,
            "vehicleId": null,
            "associatedUserId": null,
            "status": null
        },
        "device": {
            "branchId": null,
            "isSuspended": null,
            "mobileNumber": null,
            "manufacturerName": null,
            "groups": null,
            "attachedResourceNumber": null,
            "externalId": null,
            "updateTime": 1690797798250,
            "isAssociated": null,
            "sharedWith": null,
            "type": "lbs",
            "updates": null,
            "uuid": "359edffc-03d7-4659-b8a6-edbcaa106cfe",
            "orgId": "823947a3-02c0-4e65-8f4e-21da370ea6cd",
            "attachedResourceId": null,
            "isDeleted": null,
            "createTime": null,
            "serviceProvider": null,
            "imei": "355172109425247",
            "usedBy": null,
            "status": "ALLOWED"
        },
        "status": null
    },
    "syncUpDueTime": 1690885800000,
    "billingStatus": "UnSettled",
    "currentLocation": {
        "isFillingEnabled": false,
        "address": "Rourkela - Deogarh Road, Juniani, Odisha 770040, India",
        "lngLat": [
            84.90536777777777,
            21.90802111111111
        ],
        "odometer": null,
        "latitude": 21.90802111111111,
        "course": 182,
        "imei": "355172109425247",
        "decoder": "Concox",
        "time": 1690800355000,
        "vehicleId": null,
        "speed": 18,
        "longitude": 84.90536777777777
    },
    "alerts": [
        {
            "closedBy": null,
            "createdAt": 1690625793355,
            "issueId": null,
            "createdBy": null,
            "snoozTime": null,
            "description": "GPS device is disconnected",
            "type": "shipment.disconnected.notification",
            "uuid": "5bd2b9a7-d00d-49a9-9f5c-9fcc703dcb1c",
            "status": "CLOSED",
            "updatedAt": 1690630444567
        },
        {
            "closedBy": null,
            "createdAt": 1690655829230,
            "issueId": null,
            "createdBy": null,
            "snoozTime": null,
            "description": "GPS device is disconnected",
            "type": "shipment.disconnected.notification",
            "uuid": "0ec2e7ff-1bd3-402f-9346-41e37c55d118",
            "status": "CLOSED",
            "updatedAt": 1690664427518
        },
        {
            "closedBy": null,
            "createdAt": 1690682139670,
            "issueId": null,
            "createdBy": null,
            "snoozTime": null,
            "description": "GPS device is disconnected",
            "type": "shipment.disconnected.notification",
            "uuid": "a4518561-c204-4ef7-971a-46dc6bfe2f53",
            "status": "CLOSED",
            "updatedAt": 1690689791158
        },
        {
            "closedBy": "a42e539c-88f3-42cf-a1e7-d13e0b60833d",
            "createdAt": 1690749064357,
            "issueId": null,
            "createdBy": null,
            "snoozTime": 1690792259063,
            "description": "Potential Delay",
            "type": "shipment.potential.delay.notification",
            "uuid": "aa56c455-c409-492f-a768-4596e744c87a",
            "status": "CLOSED",
            "updatedAt": 1690792259079
        },
        {
            "closedBy": null,
            "createdAt": 1690695648658,
            "issueId": null,
            "createdBy": null,
            "snoozTime": null,
            "description": "GPS device is disconnected",
            "type": "shipment.disconnected.notification",
            "uuid": "db592e9b-3d2f-4728-a13a-df0adf1fe8c6",
            "status": "CLOSED",
            "updatedAt": 1690711393664
        },
        {
            "closedBy": null,
            "createdAt": 1690715431127,
            "issueId": null,
            "createdBy": null,
            "snoozTime": null,
            "description": "GPS device is disconnected",
            "type": "shipment.disconnected.notification",
            "uuid": "05f7f1a5-ab23-4726-bf2f-868e9b040844",
            "status": "CLOSED",
            "updatedAt": 1690719188176
        },
        {
            "closedBy": null,
            "createdAt": 1690724178864,
            "issueId": null,
            "createdBy": null,
            "snoozTime": null,
            "description": "GPS device is disconnected",
            "type": "shipment.disconnected.notification",
            "uuid": "4bb57b0a-7a27-41f8-bd17-86f8a4e29fc9",
            "status": "CLOSED",
            "updatedAt": 1690733306289
        },
        {
            "closedBy": null,
            "createdAt": 1690765882663,
            "issueId": null,
            "createdBy": null,
            "snoozTime": null,
            "description": "GPS device is disconnected",
            "type": "shipment.disconnected.notification",
            "uuid": "2f9c00a0-ef29-44c2-9b27-c97a4e80a007",
            "status": "CLOSED",
            "updatedAt": 1690776197682
        },
        {
            "closedBy": null,
            "createdAt": 1690780787415,
            "issueId": null,
            "createdBy": null,
            "snoozTime": null,
            "description": "GPS device is disconnected",
            "type": "shipment.disconnected.notification",
            "uuid": "f6d62c7a-bcc2-4d0a-b760-0fa0a1257ba0",
            "status": "CLOSED",
            "updatedAt": 1690784601609
        },
        {
            "closedBy": null,
            "createdAt": 1690791305278,
            "issueId": null,
            "createdBy": null,
            "snoozTime": null,
            "description": "GPS device is disconnected",
            "type": "shipment.disconnected.notification",
            "uuid": "5d96bd9a-cc7b-4a93-9092-8741c067eec3",
            "status": "CLOSED",
            "updatedAt": 1690797798271
        }
    ],
    "equipments": null,
    "tripType": "Shipment",
    "lastDelayCalculationTime": null,
    "delayReasonUpdateDueTime": null,
    "locationTrackingStatus": "UP TO DATE",
    "poLineItemId": "c8fc0d26-ff48-4295-ae71-d3d7c90cddcc",
    "consignments": [],
    "customContacts": null,
    "shipmentStages": [
        {
            "departureTime": 1690621972000,
            "gateInTime": 1690570189000,
            "actualActivityStartTime": 1690571233000,
            "actualActivityEndTime": 1690593009000,
            "uuid": "6170a1f6-618f-4969-b842-3bf3dce6e357",
            "consignmentDelivered": null,
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": "JSPL Patratu, JSPL Patratu",
            "hub": null,
            "arrivalTime": 1690514816428,
            "expectedActivityStartTime": null,
            "secondaryStatus": null,
            "consignmentPickUps": [
                "07ebdd3e-6bef-4310-97c9-98e282b4623b"
            ],
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": 1690565511994,
                "purpose": "Pickup",
                "plannedArrival": null,
                "currentGpsState": {
                    "numberOfRecord": 15,
                    "totalTime": 14980927,
                    "averageSpeeds": 0.0017759701489095598,
                    "eventType": "StateUpdated",
                    "uuid": "f2f3ec37-5738-4e7a-965a-b5365cfc1b22",
                    "isDisconnected": false,
                    "startLocation": {
                        "isFillingEnabled": false,
                        "address": "Jharkhand State Highway 2, Patratu, Jharkhand 829143, India",
                        "lngLat": [
                            85.31728,
                            23.631243333333334
                        ],
                        "odometer": null,
                        "latitude": 23.631243333333334,
                        "course": 162,
                        "imei": "355172109425247",
                        "decoder": "Concox",
                        "time": 1690606873000,
                        "vehicleId": null,
                        "speed": 0,
                        "longitude": 85.31728
                    },
                    "isNoGpsZone": false,
                    "mean": {
                        "isFillingEnabled": false,
                        "address": "",
                        "lngLat": [
                            85.31727955555557,
                            23.631255518518522
                        ],
                        "odometer": null,
                        "latitude": 23.631255518518522,
                        "course": null,
                        "imei": "",
                        "decoder": null,
                        "time": 1690617589598,
                        "vehicleId": "",
                        "speed": 0,
                        "longitude": 85.31727955555557
                    },
                    "imei": "355172109425247",
                    "startTime": 1690606873000,
                    "endTime": 1690621853927,
                    "vehicleId": null,
                    "state": "Stopped",
                    "totalDistance": 7.151239799609161,
                    "endLocation": {
                        "isFillingEnabled": false,
                        "address": null,
                        "lngLat": [
                            85.31728,
                            23.631275
                        ],
                        "odometer": null,
                        "latitude": 23.631275,
                        "course": 350.3710947733972,
                        "imei": "355172109425247",
                        "decoder": "Concox",
                        "time": 1690621369000,
                        "vehicleId": null,
                        "speed": 0,
                        "longitude": 85.31728
                    }
                },
                "updates": {
                    "traceID": "vehiclegpsstatetopic_1_22668115",
                    "resourceId": "6170a1f6-618f-4969-b842-3bf3dce6e357",
                    "updatedBy": "SYSTEM",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": "From AT to AT",
                    "forwardReasons": [
                        "trippoint.current.location.updated",
                        "gps.state.updated",
                        "trippoint.updated"
                    ],
                    "userId": null,
                    "uuid": "f59b0019-45da-482e-889e-5b674228bbd0",
                    "revision": 182,
                    "time": 1690621854691,
                    "forwardedFrom": null,
                    "resourceType": "TripPoint",
                    "updateType": null
                },
                "uuid": "6170a1f6-618f-4969-b842-3bf3dce6e357",
                "sequenceId": null,
                "isDisconnected": false,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": 5000,
                "eta": null,
                "routeId": "Waiting For Gate In",
                "expectedActivityStartTime": null,
                "actualDeparture": null,
                "vehicleId": "355172109425247",
                "place": {
                    "hubId": null,
                    "boundary": null,
                    "address": "Unnamed Road, Patratu, Jharkhand 829143, India",
                    "accessibility": "public",
                    "addedBy": "823947a3-02c0-4e65-8f4e-21da370ea6cd",
                    "center": {
                        "latitude": 23.633114,
                        "longitude": 85.322884
                    },
                    "suggestedRadius": 502,
                    "isOwned": false,
                    "centerCoordinates": [
                        85.322884,
                        23.633114
                    ],
                    "placeId": "50630ff4-0f01-4935-8580-c155c7a93c4b",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "FRETRON",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "JSPL Patratu",
                    "state": null,
                    "category": "Manufacturing Plant/Factory/Yard",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "remainingDistance": 0,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "6170a1f6-618f-4969-b842-3bf3dce6e357"
                ],
                "actualActivityEndTime": null,
                "actualArrival": 1690514816428,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": {
                    "isFillingEnabled": false,
                    "address": null,
                    "lngLat": [
                        85.31728,
                        23.631275
                    ],
                    "odometer": null,
                    "latitude": 23.631275,
                    "course": 350.3710947733972,
                    "imei": "355172109425247",
                    "decoder": "Concox",
                    "time": 1690621369000,
                    "vehicleId": null,
                    "speed": 0,
                    "longitude": 85.31728
                },
                "isAutoCompleted": false,
                "coveredDistance": 12434.273007693513,
                "hub": {
                    "hubId": null,
                    "boundary": null,
                    "address": "Unnamed Road, Patratu, Jharkhand 829143, India",
                    "accessibility": "public",
                    "addedBy": "823947a3-02c0-4e65-8f4e-21da370ea6cd",
                    "center": {
                        "latitude": 23.633114,
                        "longitude": 85.322884
                    },
                    "suggestedRadius": 502,
                    "isOwned": false,
                    "centerCoordinates": [
                        85.322884,
                        23.633114
                    ],
                    "placeId": "50630ff4-0f01-4935-8580-c155c7a93c4b",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "FRETRON",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "JSPL Patratu",
                    "state": null,
                    "category": "Manufacturing Plant/Factory/Yard",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "imei": "355172109425247",
                "assosiatedShipmentsId": [
                    "84ce2390-02d6-41ea-b639-b7f166640c13"
                ],
                "status": "COMPLETED"
            },
            "place": {
                "hubId": null,
                "boundary": null,
                "address": "Unnamed Road, Patratu, Jharkhand 829143, India",
                "accessibility": "public",
                "addedBy": "823947a3-02c0-4e65-8f4e-21da370ea6cd",
                "center": {
                    "latitude": 23.633114,
                    "longitude": 85.322884
                },
                "suggestedRadius": 502,
                "isOwned": false,
                "centerCoordinates": [
                    85.322884,
                    23.633114
                ],
                "placeId": "50630ff4-0f01-4935-8580-c155c7a93c4b",
                "geoJsonBoundry": null,
                "externalId": null,
                "source": "FRETRON",
                "places": null,
                "viewport": null,
                "district": null,
                "name": "JSPL Patratu",
                "state": null,
                "category": "Manufacturing Plant/Factory/Yard",
                "subDistrict": null,
                "controllingBranchId": null
            },
            "controllingBranchId": null,
            "gateOutTime": null,
            "status": "COMPLETED"
        },
        {
            "departureTime": null,
            "gateInTime": null,
            "actualActivityStartTime": null,
            "actualActivityEndTime": null,
            "uuid": "3c202bca-8575-4934-a6db-b98ed9b87aa9",
            "consignmentDelivered": [
                "07ebdd3e-6bef-4310-97c9-98e282b4623b"
            ],
            "resourceDropOff": null,
            "resourcePickup": null,
            "eta": null,
            "stageName": null,
            "hub": null,
            "arrivalTime": null,
            "expectedActivityStartTime": null,
            "secondaryStatus": null,
            "consignmentPickUps": null,
            "tripPoint": {
                "outOfTrackSince": null,
                "creationTime": 1690621975468,
                "purpose": "Delivery",
                "plannedArrival": null,
                "currentGpsState": {
                    "numberOfRecord": 7,
                    "totalTime": 134000,
                    "averageSpeeds": 2.7473565213599382,
                    "eventType": "StateDetected",
                    "uuid": "0b95e34c-5faa-4e42-b94c-0ea392a5e764",
                    "isDisconnected": false,
                    "startLocation": {
                        "isFillingEnabled": false,
                        "address": "Rourkela - Deogarh Road, Juniani, Odisha 770040, India",
                        "lngLat": [
                            84.90542555555555,
                            21.908936666666666
                        ],
                        "odometer": null,
                        "latitude": 21.908936666666666,
                        "course": 241.6787974683122,
                        "imei": "355172109425247",
                        "decoder": "Concox",
                        "time": 1690800221000,
                        "vehicleId": null,
                        "speed": 0,
                        "longitude": 84.90542555555555
                    },
                    "isNoGpsZone": false,
                    "mean": {
                        "isFillingEnabled": false,
                        "address": "Rourkela - Deogarh Road, Juniani, Odisha 770040, India",
                        "lngLat": [
                            84.90538714285715,
                            21.90851
                        ],
                        "odometer": null,
                        "latitude": 21.90851,
                        "course": null,
                        "imei": "",
                        "decoder": null,
                        "time": 1690800325000,
                        "vehicleId": "",
                        "speed": 0,
                        "longitude": 84.90538714285715
                    },
                    "imei": "355172109425247",
                    "startTime": 1690800221000,
                    "endTime": 1690800355000,
                    "vehicleId": null,
                    "state": "Moving",
                    "totalDistance": 102.26271496173102,
                    "endLocation": {
                        "isFillingEnabled": false,
                        "address": "Rourkela - Deogarh Road, Juniani, Odisha 770040, India",
                        "lngLat": [
                            84.90536777777777,
                            21.90802111111111
                        ],
                        "odometer": null,
                        "latitude": 21.90802111111111,
                        "course": 182,
                        "imei": "355172109425247",
                        "decoder": "Concox",
                        "time": 1690800355000,
                        "vehicleId": null,
                        "speed": 18,
                        "longitude": 84.90536777777777
                    }
                },
                "updates": {
                    "traceID": "vehiclegpsstatetopic_1_22892518",
                    "resourceId": "3c202bca-8575-4934-a6db-b98ed9b87aa9",
                    "updatedBy": "SYSTEM",
                    "changes": null,
                    "sourceOfInformation": null,
                    "description": "From UPCOMING to UPCOMING",
                    "forwardReasons": [
                        "trippoint.current.location.updated",
                        "gps.state.detected",
                        "trippoint.updated"
                    ],
                    "userId": null,
                    "uuid": "3d4e4d1f-5f46-4b60-8e23-66a941cf97a0",
                    "revision": 302,
                    "time": 1690800363002,
                    "forwardedFrom": null,
                    "resourceType": "TripPoint",
                    "updateType": null
                },
                "uuid": "3c202bca-8575-4934-a6db-b98ed9b87aa9",
                "sequenceId": null,
                "isDisconnected": false,
                "isOutOfTrack": false,
                "routeDeviationMinimumDistanceConstraint": 5000,
                "eta": null,
                "routeId": null,
                "expectedActivityStartTime": null,
                "actualDeparture": null,
                "vehicleId": "355172109425247",
                "place": {
                    "hubId": null,
                    "boundary": null,
                    "address": "ANGUL",
                    "accessibility": "public",
                    "addedBy": "823947a3-02c0-4e65-8f4e-21da370ea6cd",
                    "center": {
                        "latitude": 20.891152,
                        "longitude": 84.988358
                    },
                    "suggestedRadius": 3000,
                    "isOwned": false,
                    "centerCoordinates": [
                        84.988358,
                        20.891152
                    ],
                    "placeId": "ecfa27b4-1ad7-4662-8820-b6fd3088f430",
                    "geoJsonBoundry": null,
                    "externalId": null,
                    "source": "GOOGLE",
                    "places": null,
                    "viewport": null,
                    "district": null,
                    "name": "ANGUL-JINDAL STEEL & POWER LIMITED.",
                    "state": null,
                    "category": "Unloading Point",
                    "subDistrict": null,
                    "controllingBranchId": null
                },
                "remainingDistance": 185691.081,
                "actualActivityStartTime": null,
                "forShipmentStages": [
                    "3c202bca-8575-4934-a6db-b98ed9b87aa9"
                ],
                "actualActivityEndTime": null,
                "actualArrival": null,
                "purposedDistance": null,
                "plannedDeparture": null,
                "currentLocation": {
                    "isFillingEnabled": false,
                    "address": "Rourkela - Deogarh Road, Juniani, Odisha 770040, India",
                    "lngLat": [
                        84.90536777777777,
                        21.90802111111111
                    ],
                    "odometer": null,
                    "latitude": 21.90802111111111,
                    "course": 182,
                    "imei": "355172109425247",
                    "decoder": "Concox",
                    "time": 1690800355000,
                    "vehicleId": null,
                    "speed": 18,
                    "longitude": 84.90536777777777
                },
                "isAutoCompleted": false,
                "coveredDistance": 159523.01012536287,
                "hub": null,
                "imei": "355172109425247",
                "assosiatedShipmentsId": [
                    "84ce2390-02d6-41ea-b639-b7f166640c13"
                ],
                "status": "UPCOMING"
            },
            "place": {
                "hubId": null,
                "boundary": null,
                "address": "ANGUL",
                "accessibility": "public",
                "addedBy": "823947a3-02c0-4e65-8f4e-21da370ea6cd",
                "center": {
                    "latitude": 20.891152,
                    "longitude": 84.988358
                },
                "suggestedRadius": 3000,
                "isOwned": false,
                "centerCoordinates": [
                    84.988358,
                    20.891152
                ],
                "placeId": "ecfa27b4-1ad7-4662-8820-b6fd3088f430",
                "geoJsonBoundry": null,
                "externalId": null,
                "source": "GOOGLE",
                "places": null,
                "viewport": null,
                "district": null,
                "name": "ANGUL-JINDAL STEEL & POWER LIMITED.",
                "state": null,
                "category": "Unloading Point",
                "subDistrict": null,
                "controllingBranchId": null
            },
            "controllingBranchId": null,
            "gateOutTime": null,
            "status": "UPCOMING"
        }
    ],
    "remarks": null,
    "syncUpExpiryTime": null,
    "shipmentStatus": "Created"
}
main(sh)