const rp = require("request-promise");
const _ = require("lodash");
const FRT_PUB_BASE_URL = "http://apis.fretron.com";
const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTMzMDk0NjAsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiZmM1ZTczNGEtMjg3OC00NWU1LTg3MmEtMTQzMzhkNTU3OGM2IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.BNNuP0vfk7dleJYAm-2nBfx-PCzWc9q37dBBJITr9r4";

const fieldMapping = {
    LoadingPointAssignment: ["Dock"],
    ParkingAssignment: ["Parking Zone"],
    PreLoadingChecklist: ["Fire Extinguisher present"],
    PostLoadingChecklist: ["Docked in time", "Docked out time"],
};

async function main(shipmentId) {
    try {
        let shipment_master = await getShipmentById_ADMIN(shipmentId, true, false);

        if (!shipment_master) {
            return null;
        }

        let originId = _.first(shipment_master.shipmentStages).uuid;

        let lsmTasks = await getLSMTasksForShipment(shipmentId, originId, token);

        if (!lsmTasks.length) {
            return null;
        }

        for (let task of lsmTasks) {
            let taskName = task?.["taskName"];
            let taskObject = await getLSMTaskObject(taskName, shipmentId, token);

            if (!taskObject) continue;

            let cfsArray = ensureCfs(taskName, taskObject, shipment_master);

            if (cfsArray.length) {
                // await addCfsOnShipment(shipmentId, cfsArray, token);
            }
        }
    } catch (error) {
        console.log(`Some error executing main - ${error.message}`);
    }
}

function ensureCfs(taskName, taskObject, shipment) {
    let toAddCfs = [];
    try {
        //Checking Parking In Time && Loading start CFs
        let shipmentId = shipment?.uuid
        let shCustomFields = shipment.customFields;
        let isParkInPresent = extractValueFromCf(shCustomFields, "Parking In Time");

        let isLoadingStartPresent = extractValueFromCf(
            shCustomFields,
            "Loading start"
        );

        let origin = _.first(shipment.shipmentStages);

        if (!isParkInPresent) {
            toAddCfs.push({
                indexedValue: [],
                fieldKey: "Parking In Time",
                multiple: true,
                description: "",
                remark: "",
                required: false,
                accessType: null,
                input: "date",
                unit: "",
                valueType: "string",
                options: [],
                fieldType: "dateTime",
                value: origin.arrivalTime + "",
                isRemark: false,
            });
        }

        if (!isLoadingStartPresent) {
            toAddCfs.push({
                indexedValue: [],
                fieldKey: "Parking In Time",
                multiple: true,
                description: "",
                remark: "",
                required: false,
                accessType: null,
                input: "date",
                unit: "",
                valueType: "string",
                options: [],
                fieldType: "dateTime",
                value: origin.arrivalTime + "",
                isRemark: false,
            });
        }
        let lSMTaskObject = getLSMTaskObject(taskName, shipmentId, token)

        console.log(lSMTaskObject)
        if (taskName === "LoadingPointAssignment") {

        } else if (taskName === "ParkingAssignment") {
        } else if (taskName === "PreLoadingChecklist") {
        } else if (taskName === "PostLoadingChecklist") {
        }
    } catch (error) {
        console.log(`Some error in ensuring CFs on shipment - ${error.message}`);
    }

    return toAddCfs;
}

function extractValueFromCf(cfs, key) {
    return cfs?.find(({ fieldKey }) => fieldKey === key)?.value ?? "";
}

async function addCfsOnShipment(shipmentId, cfArray, token) {
    try {
        let payload = {
            shipmentId: shipmentId,
            updates: [
                {
                    keyToUpdate: "customfields",
                    updatedValue: cfArray,
                },
            ],
        };

        let sh = await bulkSync(payload, token);

        if (sh) {
            return "Done";
        }
    } catch (error) {
        console.log(`Some error in adding cfs on shipment - ${error.message}`);
    }

    return "Not Done";
}

async function bulkSync(payload, token) {
    try {
        let res = await rp({
            url: `${FRT_PUB_BASE_URL}/shipment/v1/shipment/bulk/sync`,
            json: true,
            method: "POST",
            body: payload,
            headers: {
                Authorization: token,
            },
        });

        console.log(`Any error in calling bulk sync - ${res.error}`);

        return res.status == 200 ? res.data : null;
    } catch (error) {
        console.log(`Some error in Bulk sync- ${error.message}`);
    }

    return null;
}

async function getShipmentById_ADMIN(shId, skipCn, includeDeleted) {
    try {
        let res = await rp({
            url: `${FRT_PUB_BASE_URL}/shipment/v1/admin/shipment/${shId}?skipCn=${skipCn}&includeDeleted=${includeDeleted}`,
            json: true,
            method: "GET",
        });

        console.log(`Some error in getting shipment via ADMIN API - ${res.error}`);

        return res.status == 200 ? res.data : null;
    } catch (error) {
        console.log(`Some error in getting shipment via ADMIN - ${error.message}`);
    }

    return null;
}

async function getLSMTasksForShipment(shipmentId, shStageId) {
    try {
        let res = await rp({
            url: `${FRT_PUB_BASE_URL}/shipment/qa/v1/lsm/v1/admin/metadata/by-shipment?shipmentId=${shipmentId}&loadingPointId=${shStageId}`,
            json: true,
            method: "GET",
        });

        console.log(`Some error in getting LSM Tasks - ${res.error}`);

        return res.status == 200 ? res.data : [];
    } catch (error) {
        console.log(
            `Some error in getting LSM Tasks for shipment - ${error.message}`
        );
    }

    return [];
}

async function getLSMTaskObject(taskName, shipmentId, token) {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/shipment/qa/v1/lsm/v1/task/${taskName}/details/${shipmentId}`,
            json: true,
            headers: {
                Authorization: token,
            },
            method: "GET",
        });

        console.log(`Any error in getting lsm task field - ${res.error}`);

        return res.status == 200 ? res.data : null;
    } catch (error) {
        console.log(`Some error in getting lsm task object - ${error.message}`);
    }

    return null;
}
main("86d44984-bce9-41cb-b355-2e6ea69f1372")