const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTcwMDkzOTQsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNDA1MmFiMjQtMDU0My00Y2Q0LWI1MTctOWU3OGVmZWU0ZmVkIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.1VLaorv7LMSJ5evObQgli-zvFooaWRbeJq6JAHHiUzg"
const FRT_PUB_BASE_URL = "https://apis.fretron.com"
const rp = require("request-promise")
const moment = require("moment")

async function getFreightUnitByItemId(lineItemId) {
    try {
        let res = await rp({
            uri: `${FRT_PUB_BASE_URL}/order-manager-v2/freight-units/v1/freight-units/by/linItemIds`,
            method: "POST",
            headers: {
                Authorization: TOKEN,
                "Content-Type": "application/json",
            },
            body: [lineItemId],
            json: true,
        });
        console.log(
            `Get freightUnit by freightUnitLineItemId api res status : ${res.status}`
        );
        if (res.status == 200 && res.data.length > 0) {
            return res.data[0];
        } else {
            console.log(
                `Get freightUnit by freightUnitLineItemId api res error : ${res.error}`
            );
        }
    } catch (e) {
        console.log(
            `Get freightUnit by freightUnitLineItemId catched error : ${e.message}`
        );
    }
    return null;
}

async function getSalesOrder(orderId) {
    try {
        let res = await rp({
            uri: `${FRT_PUB_BASE_URL}/order-manager-v2/v1/admin/order/by_uuid?uuid=${orderId}`,
            method: "GET",
            json: true,
        });
        console.log(`Get sales order by orderId api res status : ${res.status}`);
        if (res.status == 200) {
            return res.data;
        } else {
            console.log(`Get sales order by orderId api res error : ${res.error}`);
        }
    } catch (e) {
        console.log(`Get sales order by orderId catched error : ${e.message}`);
    }
    return null;
}

async function getUserById(userId) {
    let url = `${FRT_PUB_BASE_URL}/users/v1/user?key=uuid&value=${userId}`;
    try {
        let res = await rp({
            method: "GET",
            uri: url,
            headers: {
                Authorization: TOKEN,
            },
            json: true,
        });
        console.log(`Get user by id api res status : ${res.status}`);
        if (res.status == 200) {
            return res.data;
        } else {
            console.log(`Get user by id api res error : ${res.error}`);
        }
    } catch (e) {
        console.log(`Get user by id catched error : ${e.message}`);
    }
    return null;
}

function addZero(i) {
    if (i < 10) i = "0" + i;
    return i;
}

function getCreationTime(dateOfCreation) {
    let date = new Date(dateOfCreation);
    let hrs = addZero(date.getHours());
    let mins = addZero(date.getMinutes());
    return `${hrs}:${mins}`;
}

async function getVehicleById(vehicleId) {
    let url = `${FRT_PUB_BASE_URL}/partner-fleet/v2/fleet/resource/${vehicleId}`;
    try {
        let res = await rp({
            method: "GET",
            uri: url,
            headers: {
                Authorization: TOKEN,
            },
            json: true,
        });
        console.log(`Get vehicle by id api res status: ${res.status}`);
        if (res.status == 200) {
            return res.data;
        } else {
            console.log(`Get vehicle by id api res error: ${res.error}`);
        }
    } catch (e) {
        console.log(`Get vehicle by id catched error : ${e.message}`);
    }
    return null;
}

async function getVehicleDocsByDocIds(docIds) {
    let url = `${FRT_PUB_BASE_URL}/documents/v2/document-byUids?uuids=${docIds.join()}`;
    try {
        let res = await rp({
            method: "GET",
            uri: url,
            headers: {
                Authorization: TOKEN,
            },
            json: true,
        });
        console.log(`Get vehicle docs by docIds api res status : ${res.status}`);
        if (res.status == 200) {
            return res.data;
        } else {
            console.log(`Get vehicle docs by docIds api res error : ${res.error}`);
        }
    } catch (e) {
        console.log(`Get vehicle docs by docIds catched error : ${e.message}`);
    }
    return [];
}

async function registerMappedJson(payload) {
    let url = `http://vipcipo.jspl.com:50000/RESTAdapter/Fretron_Vehicle_Registration`

    //   let url = `http://210.212.152.203:50000/RESTAdapter/Fretron_Vehicle_Registration`;
    try {
        let res = await rp({
            method: "POST",
            uri: url,
            headers: {
                Authorization: "Basic anNwbHBpMTM6YWJjZDEyMzQ=",
            },
            body: payload,
            json: true,
        });
        console.log(JSON.stringify(res));
        return res
    } catch (error) {
        console.log(`Catched error in send mapped json to api : ${error.message}`);
    }
    return null
}


async function getShipmentById(shId) {
    try {
        let res = await rp({
            'uri': `${FRT_PUB_BASE_URL}/shipment/v1/admin/shipment/${shId}?skipCn=true`,
            'method': 'GET',
            'json': true
        })

        if (res.status == 200) {
            return res.data
        }
        else {
            console.log(`Error in shipment get ${res}`)
            return null
        }
    }
    catch (e) {
        console.log(`Error in shipment get ${e}`)
    }
    return null
}


async function main(shId) {
    try {

        let sh = await getShipmentById(shId)
        console.log(`Event for  ${sh ? sh.fleetInfo.vehicle.vehicleRegistrationNumber : ''} , ${sh ? sh.shipmentNumber : ''} , ${shId}`)
        if (sh) {
            //date of sh creation
            let dateOfCreation = sh.creationTime ? sh.creationTime : null;

            //time of sh creation
            let creationTime = getCreationTime(dateOfCreation);

            dateOfCreation = dateOfCreation
                ? moment(dateOfCreation).format("YYYY-MM-DD")
                : null;

            //vehicle Number
            let vehicleNum =
                sh.fleetInfo &&
                    sh.fleetInfo.vehicle &&
                    sh.fleetInfo.vehicle.vehicleRegistrationNumber
                    ? sh.fleetInfo.vehicle.vehicleRegistrationNumber
                    : null;

            let driver =
                sh.fleetInfo && sh.fleetInfo.driver ? sh.fleetInfo.driver : null;
            let driverName = driver && driver.name ? driver.name : null;
            let dlNumber = driver && driver.dlNumber ? driver.dlNumber : null;
            let driverMobNum =
                driver && driver.mobileNumber ? driver.mobileNumber : null;

            //comma seprated destinations from sh delivery stages
            let destinations = [];
            let shStages = sh.shipmentStages ? sh.shipmentStages : [];
            let deliveryStages = shStages.filter(
                (it) => it.tripPoint.purpose === "Delivery"
            );
            deliveryStages.forEach((it) => {
                let hubName = it.hub && it.hub && it.hub.name ? it.hub.name : null;
                let placeName =
                    it.place && it.place && it.place.name ? it.place.name : null;
                let destination = hubName ? hubName : placeName;
                if (destination) destinations.push(destination);
            });
            destinations = destinations.join();

            let address = null;
            let city = null;
            let state = null;
            let pincode = null;
            let loadQuantity = null;
            let freightUnitLineItemId = sh.freightUnitLineItemId
                ? sh.freightUnitLineItemId
                : null;
            if (freightUnitLineItemId) {
                let freightUnit = await getFreightUnitByItemId(freightUnitLineItemId);
                //   console.log(`Freight Unit : ${JSON.stringify(freightUnit)}`);
                if (freightUnit) {
                    //load quantity from freight unit if freightUnitLineItemId is not null
                    loadQuantity =
                        freightUnit.totalQuantity &&
                            freightUnit.totalQuantity.weight &&
                            freightUnit.totalQuantity.weight.netQuantity
                            ? freightUnit.totalQuantity.weight.netQuantity
                            : null;

                    let salesOrderMappings =
                        freightUnit.lineItems &&
                            freightUnit.lineItems.length > 0 &&
                            freightUnit.lineItems[0].salesOrderMappings
                            ? freightUnit.lineItems[0].salesOrderMappings
                            : [];
                    let orderIdItemIdMap = {};
                    salesOrderMappings.forEach((it) => {
                        orderIdItemIdMap[it.orderId] = it.itemId;
                    });
                    console.log(`After mapping orderIds with lineItemId`);
                    let orderIds = Object.keys(orderIdItemIdMap);
                    console.log(`OrderIds : ${orderIds}`);
                    for (let i = 0; i < orderIds.length; i++) {
                        let orderId = orderIds[i];
                        let order = await getSalesOrder(orderId);
                        let lineItems = order && order.lineItems ? order.lineItems : [];
                        let reqlineItem = lineItems.find(
                            (it) => it.uuid === orderIdItemIdMap[it.orderId]
                        );
                        let consignee =
                            reqlineItem && reqlineItem.consignee
                                ? reqlineItem.consignee
                                : null;
                        if (consignee) {
                            let addressJson = consignee.address ? consignee.address : null;
                            if (addressJson) {
                                try {
                                    addressJson = JSON.parse(addressJson);
                                    address = addressJson.address;
                                    city = addressJson.city;
                                    state = addressJson.state;
                                    pincode = addressJson.pincode;
                                    break;
                                } catch (error) {
                                    console.log(`JSON.parse error in parsing consignee address`);
                                }
                            }
                        }
                    }
                }
            } else {
                let shCfs = sh.customFields ? sh.customFields : [];
                let quantityCf = shCfs.find((it) => it.fieldKey == "Quantity");
                loadQuantity = quantityCf ? quantityCf.value : "";
            }

            let changedBy = null;
            if (
                sh.updates &&
                sh.updates.forwardReasons &&
                sh.updates.forwardReasons.length > 0
            ) {
                let userId = sh.updates.forwardReasons.includes("shipment.created")
                    ? sh.updates.userId
                    : null;
                console.log(`userId : ${userId}`);
                if (userId) {
                    let user = await getUserById(userId);
                    changedBy = user && user.name ? user.name : null;
                } else {
                    console.log(
                        `Shipment updates does not contain shipment create event`
                    );
                }
            }

            let vehicleId =
                sh.fleetInfo && sh.fleetInfo.uuid ? sh.fleetInfo.uuid : null;
            // console.log(`vehicleId :${vehicleId}`);
            if (!vehicleId) {
                vehicleId =
                    sh.fleetInfo && sh.fleetInfo.vehicle && sh.fleetInfo.vehicle.uuid
                        ? sh.fleetInfo.vehicle.uuid
                        : null;
            }
            console.log(`vehicleId :${vehicleId}`);

            let permitNo = null;
            let vehiclePassingCapacity = null;
            if (vehicleId) {
                let partnerFleet = await getVehicleById(vehicleId);
                let vehicle =
                    partnerFleet && partnerFleet.vehicle ? partnerFleet.vehicle : null;
                // console.log(`Vehicle : ${JSON.stringify(vehicle)}`);
                if (vehicle) {
                    let attachedDocUuids = vehicle.attachedDocs
                        ? vehicle.attachedDocs
                        : [];
                    if (attachedDocUuids.length > 0) {
                        let docs = await getVehicleDocsByDocIds(attachedDocUuids);
                        let vehiclePermitDoc = docs.find(
                            (it) => it.name === "VEHICLE_PERMITT"
                        );
                        let cfs =
                            vehiclePermitDoc && vehiclePermitDoc.customFields
                                ? vehiclePermitDoc.customFields
                                : [];
                        // console.log(`vehicle permit doc cfs ${JSON.stringify(cfs)}`)
                        let permitNoCf = cfs.find((it) => it.fieldKey == "Permit No.");
                        permitNo = permitNoCf ? permitNoCf.value : "";
                    } else {
                        console.log(`vehicle doesn't contain any docs`);
                    }
                    let vehicleCfs =
                        vehicle && vehicle.customFields ? vehicle.customFields : [];
                    let passingCapacitycf = vehicleCfs.find(
                        (it) => it.fieldKey == "PassingCapacity"
                    );
                    vehiclePassingCapacity = passingCapacitycf
                        ? passingCapacitycf.value
                        : null;
                    if (!vehiclePassingCapacity) {
                        vehiclePassingCapacity = vehicle.loadCapacity
                            ? vehicle.loadCapacity
                            : "";
                    }
                }
            }

            //now map in json
            let reqJson = {
                VehicleRegistrations: {
                    TripID_No: shId,
                    Vehicle_Number: vehicleNum ? vehicleNum : "",
                    Location: "07",
                    Driver_Name: driverName ? driverName : "",
                    License_Number: dlNumber ? dlNumber : "",
                    Vehicle_Labour: 1,
                    Vehicle_Accessories: "TOOLS",
                    Plant: "NALW",
                    Vehicle_Status: "N",
                    Destination: destinations ? destinations : "",
                    Changed_by: changedBy ? changedBy : "",
                    Host_Name: "",
                    Mobile_No: driverMobNum ? driverMobNum : "",
                    Load_Quantity: loadQuantity ? loadQuantity : "",
                    Created_Date: dateOfCreation ? dateOfCreation : "",
                    Created_Time: creationTime ? creationTime : "",
                    Vehicle_Passing_Quantity: vehiclePassingCapacity
                        ? vehiclePassingCapacity
                        : "",
                    Address: address ? address : "",
                    City: city ? city : "",
                    State: state ? state : "",
                    Pin_Code: pincode ? pincode : "",
                    National_Permit: permitNo ? permitNo : "",
                    VTS_GateIn_received: "",
                },
            };

            console.log(JSON.stringify(reqJson));
            await registerMappedJson(reqJson)
        }
    } catch (e) {
        console.log(e.message);
    }

}

try {
    let $event = {
        body: {
            shipmentId: "70cf9b48-776e-4fcb-84e6-e70878755268"
        }
    }
    let shId = $event.body.shipmentId
    main(shId)
} catch (e) {
    console.log(`error in calling main ${e.message}`)
}