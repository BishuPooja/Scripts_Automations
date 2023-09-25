const rp = require("request-promise")
const TOKEN = ""

async function createSh(payload) {
    try {
        let res = await rp({
            url: "https://apis.fretron.com/shipment/v1/shipment/with/consignments",
            method: "POST",
            body: payload,
            json: true,
            headers: {
                Authorization: TOKEN,
                "traceID": "pooja123"
            },
        });
        // console.log(res)
        console.log(`Shipment Creation res ${res.status}`);

        if (res.error) {
            console.log(`Some error in response ${res.error}`);
        }

        return res
    } catch (e) {
        console.log(`error executing while creating shipment: ${e.message}`);
    }
    return null;
}

async function bulkSyncApi(payload) {
    let url = `https://apis.fretron.com/shipment/v1/shipment/bulk/sync`;
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

function swapFirstAndLast(array) {
    if (array.length < 2) {
        return array;
    }
    const lastIndex = array.length - 1;
    const temp = array[0];
    array[0] = array[lastIndex];
    array[lastIndex] = temp;

    return array;
}
function getFromCf(cfs, key) {
    if (cfs == null) {
        return null
    } else {
        let found = cfs.find(_ => _.fieldKey == key)
        return found ? found.value : null
    }
}

const RoundTripCf = {
    fieldKey: "Trip Type",
    multiple: false,
    description: "",
    remark: "",
    required: false,
    accessType: null,
    input: "text",
    unit: "",
    valueType: "string",
    options: [],
    fieldType: "text",
    value: "Round Trip",
    isRemark: false,
};

async function main(sh) {
    try {
        let shNo = sh.shipmentNumber
        console.log(`Old shNo ${shNo}`)
        let shId = sh.uuid
        let vehNo = sh?.fleetInfo?.vehicle?.vehicleRegistrationNumber
        let cf = sh?.customFields ?? []
        let shipmentStatus = sh.shipmentTrackingStatus
        console.log(cf.length)
        let roundTrip = getFromCf(cf, "Trip Type")
        console.log(`roundTrip ${roundTrip}`)
        if ((vehNo == "NL01AG3129" || vehNo == "NL01AD0083") && shipmentStatus == "Departed From Delivery Point" && roundTrip != "Round Trip") {
            let lastStageStatus = sh?.shipmentStages[sh?.shipmentStages?.length - 1]?.status
            if (lastStageStatus == "COMPLETED") {
                let stage = sh?.shipmentStages
                stage = swapFirstAndLast(stage)
                let newStage = []
                for (let item of stage) {
                    item.uuid = null
                    newStage.push(item)
                }
                let newSh = {}
                newStage[0].departureTime = newStage[0].departureTime + 1
                newStage[newStage.length - 1].departureTime = newStage[newStage.length - 1].departureTime + 1
                newStage[newStage.length - 1].arrivalTime = newStage[newStage.length - 1].arrivalTime + 2
                newSh["shipmentStages"] = newStage
                newSh["customFields"] = cf
                newSh["fleetInfo"] = sh.fleetInfo
                newSh["branch"] = sh.branch
                newSh["transportationMode"] = sh.transportationMode
                newSh["shipmentType"] = sh.shipmentType
                newSh["shipmentStatus"] = sh.shipmentStatus
                let shCreatePayload = {
                    shipment: newSh,
                    consignments: []
                }
                let shCreatedRes = await createSh(shCreatePayload)
                if (shCreatedRes?.status == 200) {
                    console.log(`new created Sh ${shCreatedRes.data?.shipmentNumber}`)
                    let payload = {
                        shipmentId: shId,
                        updates: [
                            {
                                keyToUpdate: "customfields",
                                updatedValue: [RoundTripCf],
                            },
                        ],
                    };
                    // console.log(JSON.stringify(payload))
                    await bulkSyncApi(payload)
                } else {
                    console.log(`shipment Not created for sh ${shNo}`)
                }
            }
        }
        else {
            console.log(`shipment VehNo ${vehNo} shipmentStatus ${shipmentStatus} roundTrip ${roundTrip}`)
        }
    } catch (e) {
        console.log(`Error in main ${e.message}`)
    }
}


try {
    main(sh)
} catch (e) {
    console.log(`error in main ${e.message}`)
}