


console.log($event.uuid)


const TOKEN =
    "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTgyOTQ5MDMsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiZTkwNWE2NTEtM2IxNS00NzkxLWFhZDYtNjNiM2ZkNzg0ZDBlIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.yDTNTxCSQI-6IitDuUF4tpIjdVjzoxjhRGoMRafbfgM";
const SHIPMENT_ID = $event.uuid;
const SHIPMENT_NUMBER = $event.shipmentNumber;
const BASE_URL = `${FRT_PUB_BASE_URL}`;

let sh = $event;

async function addCfsOnShipment(cfs) {
    let anyUpdates = [];
    let updt = {
        keyToUpdate: "customfields",
        updatedValue: cfs,
    };
    anyUpdates.push(updt);
    let anyUpdate = {
        shipmentId: SHIPMENT_ID,
        updates: anyUpdates,
    };
    try {
        let res = await rp({
            method: "POST",
            uri: `${BASE_URL}/shipment/v1/shipment/bulk/sync`,
            headers: {
                Authorization: TOKEN,
            },
            body: anyUpdate,
            json: true,
        });
        console.log(`Add Cf on sh create, Status : ${res.status}`);
        if (res.status == 200) {
            return res.data;
        } else {
            console.log(`Add Cf on sh create, error : ${res.error}`);
        }
    } catch (err) {
        console.log(`Catched Error in bulk Sync api:-  Add cf : ${err.message}`);
    }
    return null;
}

try {
    if (sh) {
        let fleetInfo = sh.fleetInfo ? sh.fleetInfo : null;
        let forwardingAgent =
            fleetInfo && fleetInfo.forwardingAgent
                ? fleetInfo.forwardingAgent
                : null;
        let forwardingAgentName =
            forwardingAgent && forwardingAgent.name ? forwardingAgent.name : null;
        if (forwardingAgentName) {
            let field = {
                fieldKey: "Transporter Name",
                input: "string",
                valueType: "string",
                fieldType: "text",
                value: forwardingAgentName,
            };
            let cfs = [field];
            await addCfsOnShipment(cfs);
        } else {
            console.log(
                `Forwarding agent name is not present in shipment number : ${SHIPMENT_NUMBER}`
            );
        }
    }
} catch (e) {
    console.log(
        `Catched Error in add forwarding Agent in sh Cf for shipment ${SHIPMENT_NUMBER}`
    );
}

