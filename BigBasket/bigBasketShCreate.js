const rp = require("request-promise");
const TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODQxNDY5OTMsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNDk1Yjg3MjgtYzc2MS00ZmE3LTgzZmUtZGI3NWE3ZDYzMjIxIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.KBlXET2BUpW3GAD8vb5oTU8xh_lORItsj5Ab7kWSSvg";

const $event = {
    creationTime: 1683869551505,
    customFields: [
        {
            indexedValue: ["EDD_N/A"],
            fieldKey: "EDD",
            multiple: false,
            description: "",
            remark: "",
            uuid: null,
            required: false,
            accessType: null,
            input: "string",
            unit: "",
            valueType: "string",
            options: [],
            fieldType: "text",
            value: "N/A",
            isRemark: false,
        },
        {
            indexedValue: ["Pickup Date_5/12/2023, 11:02:31 AM"],
            fieldKey: "Pickup Date",
            multiple: false,
            description: "",
            remark: "",
            uuid: null,
            required: false,
            accessType: null,
            input: "string",
            unit: "",
            valueType: "string",
            options: [],
            fieldType: "text",
            value: "5/12/2023, 11:02:31 AM",
            isRemark: false,
        },
        {
            indexedValue: ["Shipment Date_5/12/2023, 11:02:31 AM"],
            fieldKey: "Shipment Date",
            multiple: false,
            description: "",
            remark: "",
            uuid: null,
            required: false,
            accessType: null,
            input: "string",
            unit: "",
            valueType: "string",
            options: [],
            fieldType: "text",
            value: "5/12/2023, 11:02:31 AM",
            isRemark: false,
        },
        {
            indexedValue: ["Device Submitted_NO"],
            fieldKey: "Device Submitted",
            multiple: false,
            description: "Device Submitted?",
            remark: "",
            uuid: "f23b53b4-6431-4239-80af-6a16a6a5629f",
            required: false,
            accessType: null,
            input: "",
            unit: "",
            valueType: "string",
            options: ["Yes", "No"],
            fieldType: "yes-no",
            value: "NO",
            isRemark: false,
        },
        {
            indexedValue: ["Device Submit Date_null"],
            fieldKey: "Device Submit Date",
            multiple: true,
            description: "Device Submit Date",
            remark: "",
            uuid: "378509c4-97f3-4c3f-a312-4f03ece7e1d5",
            required: false,
            accessType: null,
            input: "date",
            unit: "",
            valueType: "string",
            options: [],
            fieldType: "dateTime",
            value: null,
            isRemark: false,
        },
        {
            indexedValue: ["VR Date_1684175400000"],
            fieldKey: "VR Date",
            multiple: false,
            description: "",
            remark: "",
            uuid: "2547a569-26bf-41d3-b3da-4763b5260659",
            required: false,
            accessType: null,
            input: "date",
            unit: "",
            valueType: "string",
            options: [],
            fieldType: "date",
            value: "1684175400000",
            isRemark: false,
        },
        {
            indexedValue: ["Trip Type_2391441"],
            fieldKey: "Trip Type",
            multiple: false,
            description: null,
            remark: null,
            uuid: null,
            required: false,
            accessType: null,
            input: "string",
            unit: null,
            valueType: "string",
            options: null,
            fieldType: "text",
            value: "2391441",
            isRemark: false,
        },
        {
            indexedValue: ["Vehicle Type_Canter"],
            fieldKey: "Vehicle Type",
            multiple: false,
            description: null,
            remark: null,
            uuid: null,
            required: false,
            accessType: null,
            input: "string",
            unit: null,
            valueType: "string",
            options: null,
            fieldType: "text",
            value: "Canter",
            isRemark: false,
        },
        {
            indexedValue: ["Vendor Name_Vikas sharma transport"],
            fieldKey: "Vendor Name",
            multiple: false,
            description: null,
            remark: null,
            uuid: null,
            required: false,
            accessType: null,
            input: "string",
            unit: null,
            valueType: "string",
            options: null,
            fieldType: "text",
            value: "Vikas sharma transport",
            isRemark: false,
        },
        {
            indexedValue: ["Mode_Dedicated"],
            fieldKey: "Mode",
            multiple: false,
            description: null,
            remark: null,
            uuid: null,
            required: false,
            accessType: null,
            input: "string",
            unit: null,
            valueType: "string",
            options: null,
            fieldType: "text",
            value: "Dedicated",
            isRemark: false,
        },
        {
            indexedValue: ["Stock Type_Other"],
            fieldKey: "Stock Type",
            multiple: false,
            description: null,
            remark: null,
            uuid: null,
            required: false,
            accessType: null,
            input: "string",
            unit: null,
            valueType: "string",
            options: null,
            fieldType: "text",
            value: "Other",
            isRemark: false,
        },
    ],
    transportationMode: "ByRoad",
    freightUnitLineItemId: null,
    lastSyncUpTime: 1683869551505,
    updates: {
        traceID: "shservicescheduletask_0_2280",
        resourceId: "8cdc1da1-36fd-4a4c-8f51-a3938739a045",
        updatedBy: "SYSTEM",
        changes: null,
        sourceOfInformation: null,
        description: null,
        forwardReasons: ["HEART-BEAT"],
        userId: null,
        uuid: "5c56e835-eeaf-44ce-88a3-cc4190c82861",
        revision: 28,
        time: 1684205860392,
        forwardedFrom: null,
        resourceType: "ShipmentObject",
        updateType: null,
    },
    isActive: false,
    uuid: "8cdc1da1-36fd-4a4c-8f51-a3938739a045",
    issues: null,
    branch: null,
    orgId: "495b8728-c761-4fa7-83fe-db75a7d63221",
    shipmentType: "PreLeg",
    completionTime: null,
    routeId: null,
    shipmentTrackingStatus: "Enroute For Pickup",
    lastForwardTime: 1684205860400,
    runningStatus: null,
    delayTrackingStatus: "UP TO DATE",
    delayReasonLastUpdateTime: null,
    links: null,
    shipmentDate: 1683869551254,
    delayReason: null,
    shipmentNumber: "FRETSH000000350",
    originalEdd: null,
    edd: null,
    delayReasonUpdateExpiryTime: null,
    externalShipmentId: null,
    fleetInfo: {
        isTrackingEnable: null,
        forwardingAgent: null,
        verificationStatus: null,
        trackingMode: "MANUAL",
        broker: null,
        uuid: "e62e470e-d851-433a-8df5-eb51d1c945d3",
        orgId: null,
        vehicle: {
            vtsDeviceId: "11111111111111111111",
            kmDriven: null,
            secondaryDriverId: null,
            attachedDocs: [],
            customFields: null,
            floorType: null,
            description: null,
            source: "FRETRON",
            isTrackingEnabled: false,
            updates: null,
            uuid: null,
            branch: null,
            orgId: "495b8728-c761-4fa7-83fe-db75a7d63221",
            vehicleLoadType: null,
            associatedWith: null,
            isDeleted: null,
            customerId: "e33cc614-6f72-43e3-9faf-dd244e64909a",
            vehicleModel: "",
            mileageEmpty: null,
            mileageLoaded: null,
            vehicleType: "",
            groups: null,
            externalId: null,
            updateTime: 1656398856734,
            sharedWith: [
                "FRETRON_GOD_FO",
                "0a4b63ac-db81-49ef-a110-d6df5c9e7c9c",
                "495b8728-c761-4fa7-83fe-db75a7d63221",
            ],
            baseLocationId: null,
            vehicleMake: "",
            vehicleRegistrationNumber: "DL8CU4684",
            chassisNumber: null,
            driverId: "83bff2e3-f927-48a5-b033-78aca644f707",
            createTime: null,
            loadCapacity: null,
            truckLength: null,
            category: null,
            groupsExtended: [
                {
                    groupName: "Sravani",
                    groupType: "vehicle",
                    sharedWith: [],
                    uuid: "6460f189-f1b1-4b56-9653-cefa2f66b186",
                    orgId: null,
                },
                {
                    groupName: "Random",
                    groupType: "vehicle",
                    sharedWith: [],
                    uuid: "d692f34a-94ef-4828-a6f7-6772563a3ca2",
                    orgId: null,
                },
                {
                    groupName: "AAA",
                    groupType: "vehicle",
                    sharedWith: ["d1ab729f-7db6-47de-ad80-5a7260c762c1"],
                    uuid: "57264719-c1af-4213-8d47-bb5b66ced72f",
                    orgId: null,
                },
            ],
        },
        driver: {
            pincode: null,
            dlExpiryTime: 1892873210000,
            attachedDocs: [],
            isEmployee: false,
            pfNumber: null,
            address: null,
            mobileNumbers: null,
            dlNumber: "test1234",
            mobileNumber: "9555107700",
            customFields: [],
            externalId: null,
            updates: {
                traceID: "e7617d91-c83c-4bd7-9c67-d490737e789f",
                resourceId: "f5afe8eb-46b2-4148-b0e7-564db776da03",
                updatedBy: "USER",
                changes: null,
                sourceOfInformation: null,
                description: "VGWVWYEW is added to Suyash ",
                forwardReasons: ["vehicle.assigned.event"],
                userId: "ab877322-0088-48ed-9761-9f7e5f21193e",
                uuid: "8b954d3d-f88c-45b0-ac4d-bee2fa2728eb",
                revision: null,
                time: 1676545329860,
                forwardedFrom: null,
                resourceType: "Driver",
                updateType: null,
            },
            aadharNo: null,
            type: "secondary",
            uuid: "f5afe8eb-46b2-4148-b0e7-564db776da03",
            branch: {
                address: "Gurugram, Haryana, India",
                updatedBy: null,
                customFields: null,
                regionName: "Region",
                externalId: null,
                branchName: null,
                type: ["Sales"],
                updates: null,
                orgId: "495b8728-c761-4fa7-83fe-db75a7d63221",
                areaId: null,
                geoLocation: [77.0266383, 28.4594965],
                regionId: null,
                areaName: null,
                name: "Random Office",
                zoneId: null,
                _id: "2473538a-4f66-4a59-a275-535e9714063b",
                zoneName: "Zone",
                contacts: [],
                officeType: null,
                materialServices: null,
            },
            orgId: "495b8728-c761-4fa7-83fe-db75a7d63221",
            vehicleRegistrationNumber: "VGWVWYEW",
            name: "Suyash Kumar",
            vehicleId: "dcd19b22-e140-4950-adcf-222576c71bae",
            associatedUserId: "534483ea-9b40-40a6-a7fe-7e6d6689f6be",
            status: "Active",
        },
        fleetType: "Owned",
        fleetOwner: null,
        trainInfo: null,
        lbsNumber: null,
        secondaryDriver: null,
        device: null,
        status: null,
    },
    syncUpDueTime: 9223372036854775807,
    billingStatus: null,
    currentLocation: null,
    alerts: [],
    equipments: null,
    tripType: "Shipment",
    lastDelayCalculationTime: null,
    delayReasonUpdateDueTime: null,
    locationTrackingStatus: "DUE",
    poLineItemId: null,
    consignments: [],
    customContacts: null,
    shipmentStages: [
        {
            departureTime: null,
            gateInTime: null,
            actualActivityStartTime: null,
            actualActivityEndTime: null,
            uuid: "43f1aad0-a6b5-4e4d-b430-535942ea9904",
            consignmentDelivered: ["d8702896-ebb1-4346-b34c-b8f1bba97e88"],
            resourceDropOff: null,
            resourcePickup: null,
            eta: null,
            stageName: null,
            hub: null,
            arrivalTime: null,
            expectedActivityStartTime: null,
            secondaryStatus: null,
            consignmentPickUps: null,
            tripPoint: {
                outOfTrackSince: null,
                creationTime: null,
                purpose: "Delivery",
                plannedArrival: null,
                currentGpsState: null,
                updates: null,
                uuid: null,
                sequenceId: null,
                isDisconnected: false,
                isOutOfTrack: false,
                routeDeviationMinimumDistanceConstraint: null,
                eta: null,
                routeId: null,
                expectedActivityStartTime: null,
                actualDeparture: null,
                vehicleId: null,
                place: null,
                remainingDistance: null,
                actualActivityStartTime: null,
                forShipmentStages: null,
                actualActivityEndTime: null,
                actualArrival: null,
                purposedDistance: null,
                plannedDeparture: null,
                currentLocation: null,
                isAutoCompleted: false,
                coveredDistance: null,
                hub: null,
                imei: null,
                assosiatedShipmentsId: null,
                status: "NEXT",
            },
            place: {
                hubId: null,
                boundary: null,
                address:
                    ",Noida,Dadri,Gautam Buddha Nagar,Uttar Pradesh,201301,India,in",
                accessibility: "public",
                addedBy: "495b8728-c761-4fa7-83fe-db75a7d63221",
                center: {
                    latitude: 28.5707841,
                    longitude: 77.3271074,
                },
                suggestedRadius: 500,
                isOwned: false,
                centerCoordinates: [77.3271074, 28.5707841],
                placeId: "4379cd6a-3683-42d4-873b-1af14713d9d3",
                geoJsonBoundry: null,
                externalId: null,
                source: "FRETRON",
                places: null,
                viewport: null,
                district: null,
                name: "Noida DC",
                state: null,
                category: "Unloading Point",
                subDistrict: null,
                controllingBranchId: null,
            },
            controllingBranchId: null,
            gateOutTime: null,
            status: "NEXT",
        },
        {
            departureTime: null,
            gateInTime: null,
            actualActivityStartTime: null,
            actualActivityEndTime: null,
            uuid: "43f1aad0-a6b5-4e4d-b430-535942ea9904",
            consignmentDelivered: ["d8702896-ebb1-4346-b34c-b8f1bba97e88"],
            resourceDropOff: null,
            resourcePickup: null,
            eta: null,
            stageName: null,
            hub: null,
            arrivalTime: null,
            expectedActivityStartTime: null,
            secondaryStatus: null,
            consignmentPickUps: null,
            tripPoint: {
                outOfTrackSince: null,
                creationTime: null,
                purpose: "Delivery",
                plannedArrival: null,
                currentGpsState: null,
                updates: null,
                uuid: null,
                sequenceId: null,
                isDisconnected: false,
                isOutOfTrack: false,
                routeDeviationMinimumDistanceConstraint: null,
                eta: null,
                routeId: null,
                expectedActivityStartTime: null,
                actualDeparture: null,
                vehicleId: null,
                place: null,
                remainingDistance: null,
                actualActivityStartTime: null,
                forShipmentStages: null,
                actualActivityEndTime: null,
                actualArrival: null,
                purposedDistance: null,
                plannedDeparture: null,
                currentLocation: null,
                isAutoCompleted: false,
                coveredDistance: null,
                hub: null,
                imei: null,
                assosiatedShipmentsId: null,
                status: "NEXT",
            },
            place: {
                hubId: null,
                boundary: null,
                address:
                    ",Noida,Dadri,Gautam Buddha Nagar,Uttar Pradesh,201301,India,in",
                accessibility: "public",
                addedBy: "495b8728-c761-4fa7-83fe-db75a7d63221",
                center: {
                    latitude: 28.5707841,
                    longitude: 77.3271074,
                },
                suggestedRadius: 500,
                isOwned: false,
                centerCoordinates: [77.3271074, 28.5707841],
                placeId: "4379cd6a-3683-42d4-873b-1af14713d9d3",
                geoJsonBoundry: null,
                externalId: null,
                source: "FRETRON",
                places: null,
                viewport: null,
                district: null,
                name: "Noida DC",
                state: null,
                category: "Unloading Point",
                subDistrict: null,
                controllingBranchId: null,
            },
            controllingBranchId: null,
            gateOutTime: null,
            status: "NEXT",
        },
        {
            departureTime: null,
            gateInTime: null,
            actualActivityStartTime: null,
            actualActivityEndTime: null,
            uuid: "43f1aad0-a6b5-4e4d-b430-535942ea9904",
            consignmentDelivered: ["d8702896-ebb1-4346-b34c-b8f1bba97e88"],
            resourceDropOff: null,
            resourcePickup: null,
            eta: null,
            stageName: null,
            hub: null,
            arrivalTime: null,
            expectedActivityStartTime: null,
            secondaryStatus: null,
            consignmentPickUps: null,
            tripPoint: {
                outOfTrackSince: null,
                creationTime: null,
                purpose: "Delivery",
                plannedArrival: null,
                currentGpsState: null,
                updates: null,
                uuid: null,
                sequenceId: null,
                isDisconnected: false,
                isOutOfTrack: false,
                routeDeviationMinimumDistanceConstraint: null,
                eta: null,
                routeId: null,
                expectedActivityStartTime: null,
                actualDeparture: null,
                vehicleId: null,
                place: null,
                remainingDistance: null,
                actualActivityStartTime: null,
                forShipmentStages: null,
                actualActivityEndTime: null,
                actualArrival: null,
                purposedDistance: null,
                plannedDeparture: null,
                currentLocation: null,
                isAutoCompleted: false,
                coveredDistance: null,
                hub: null,
                imei: null,
                assosiatedShipmentsId: null,
                status: "NEXT",
            },
            place: {
                hubId: null,
                boundary: null,
                address:
                    ",Noida,Dadri,Gautam Buddha Nagar,Uttar Pradesh,201301,India,in",
                accessibility: "public",
                addedBy: "495b8728-c761-4fa7-83fe-db75a7d63221",
                center: {
                    latitude: 28.5707841,
                    longitude: 77.3271074,
                },
                suggestedRadius: 500,
                isOwned: false,
                centerCoordinates: [77.3271074, 28.5707841],
                placeId: "4379cd6a-3683-42d4-873b-1af14713d9d3",
                geoJsonBoundry: null,
                externalId: null,
                source: "FRETRON",
                places: null,
                viewport: null,
                district: null,
                name: "Noida DC",
                state: null,
                category: "Unloading Point",
                subDistrict: null,
                controllingBranchId: null,
            },
            controllingBranchId: null,
            gateOutTime: null,
            status: "NEXT",
        },
    ],
    remarks: null,
    syncUpExpiryTime: null,
    shipmentStatus: "Planned",
};

main($event);
async function main(sh) {
    let shNo = null;
    let cfs = sh.customFields;
    let shipmentType = getFromCf(cfs, "Shipment Type");
    let vehicleType = getFromCf(cfs, "Vehicle Type");

    if (
        (shipmentType === "Round Trip" || shipmentType === "MultiCity") &&
        vehicleType == "Dedicated"
    ) {
    } else {
        console.log(
            `shipment not created ${shNo} shipmentType ${shipmentType} vehicleType ${vehicleType}`
        );
    }

    console.log("condtion found for shipment create");

    let shStage = sh.shipmentStages[0];

    shStage.tripPoint = null;
    shStage.uuid = null;
    shStage.consignmentDelivered = [];
    shStage.consignmentPickUps = [];
    shStage.status = "UPCOMING";
    shStage.arrivalTime = null;
    shStage.actualActivityStartTime = null;
    shStage.actualActivityEndTime = null;
    shStage.departureTime = null;

    let vehicleNo = sh.fleetInfo.vehicle.vehicleRegistrationNumber;

    console.log(`vehicleNo ${vehicleNo}`);

    let vehicleMasterRes = sh.fleetInfo.vehicle;

    /*
    if (vehicleNo) {
      let vehicleGetRes = await vehGET(vehicleNo);
      console.log(`vehicleGetRes  ${vehicleGetRes}`);
      if (vehicleGetRes) {
        let vehicleId = vehicleGetRes.uuid;
        console.log(`vehicleId ${vehicleId}`);
        vehicleMasterRes = await vehGetMaster(vehicleId);
        vehicleMasterRes = vehicleMasterRes.vehicle;
        console.log(`vehicleMasterRes ${vehicleMasterRes}`);
      }
    }
    */

    let driverMasterRes = sh.fleetInfo.driver;

    /*
    let driverMobileNo = sh?.fleetInfo?.driver;
    if (driverMobileNo) {
      let driverGetRes = await driverGET(driverMobileNo);
      console.log(`driverGetRes ${driverGetRes}`);
      if (driverGetRes) {
        let driverId = driverGetRes.uuid;
        driverMasterRes = await driverGetMaster(driverId);
      }
    }
    */

    let shipmentCreatPayload = {
        shipment: {
            shipmentNumber: null,
            consignments: [],
            shipmentDate: Date.now(),
            shipmentStages: [shStage],
            fleetInfo: {
                device: null,
                lbsNumber: null,
                trackingMode: "MANUAL",
                vehicle: vehicleMasterRes,
                driver: driverMasterRes,
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

    console.log(JSON.stringify(shipmentCreatPayload));

    let creationRes = await createSh(shipmentCreatPayload);

    if (creationRes) {
        console.log(`Created new sh ${creationRes.shipmentNumber}`);
    }
}

async function driverGetMaster(uuid) {
    try {
        let url =
            "https://apis.fretron.com/drivers/v1/driver/" + encodeURIComponent(uuid);

        let res = await rp({
            url: url,
            method: "GET",
            json: true,
            headers: {
                Authorization: TOKEN,
            },
        });
        if (res) {
            return res.data;
        } else {
            return null;
        }
    } catch (e) {
        console.log(`error getting driver master ${e.message}`);
    }
}

async function driverGET(driverMobileNo) {
    try {
        let url =
            "https://apis.fretron.com/shipment-view/drivers/drivers?limit=50&search=" +
            encodeURIComponent(driverMobileNo);

        let res = await rp({
            url: url,
            method: "GET",
            json: true,
            headers: {
                Authorization: TOKEN,
            },
        });
        if (res && res.status == 200 && res.data.length) {
            if (res.data[0].name) {
                console.log("driverGET");
                return res.data[0];
            } else {
                return false;
            }
        } else {
            return null;
        }
    } catch (e) {
        console.log(`Failed to get driver ${e.message}`);
    }
}

async function vehGET(vehNo) {
    try {
        let url =
            "https://apis.fretron.com/shipment-view/partner-fleet/fleets/v2?size=500&sharedOnly=false&search=" +
            encodeURIComponent(vehNo);
        let res = await rp({
            url: url,
            method: "GET",
            json: true,
            headers: {
                Authorization: TOKEN,
            },
        });

        if (res && res.status == 200 && res.data.length) {
            if (res.data[0].driver == null || res.data[0].driver.length == 0) {
                return "Driver Not Found";
            }
            if (res.data[0].driver) {
                console.log("vehGET");
                return res.data[0];
            } else {
                return false;
            }
        }
    } catch (e) {
        console.log(`Failed to get vehicle ${e.message}`);
    }
}

async function vehGetMaster(uuid) {
    try {
        let url =
            "https://apis.fretron.com/partner-fleet/v2/fleet/resource/" +
            encodeURIComponent(uuid);
        let res = await rp({
            url: url,
            method: "GET",
            json: true,
            headers: {
                Authorization: TOKEN,
            },
        });
        return res.data;
    } catch (e) {
        console.log(`error fetching vehicle master: ${e.message}`);
    }
}

async function createSh(payload) {
    try {
        let res = await rp({
            url: "https://apis.fretron.com/shipment/v1/shipment/with/consignments",
            method: "POST",
            body: payload,
            json: true,
            headers: {
                Authorization: TOKEN,
            },
        });
        console.log(`Shipment Creation res ${res.status}`);

        if (res.error) {
            console.log(`Some error in response ${res.error}`);
        }

        return res.data;
    } catch (e) {
        console.log(`error executing while creating shipment: ${e.message}`);
    }
    return null;
}

function getFromCf(cfs, key) {
    if (cfs) {
        let found = cfs.find((v) => v.fieldKey === key);
        if (found) {
            return found.value;
        }
    }
    return null;
}