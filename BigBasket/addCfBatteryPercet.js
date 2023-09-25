const rp = require("request-promise")
const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODIzMzEwNTMsInVzZXJJZCI6ImJvdHVzZXItLWI5ZDRjYjQ1LTBjZWMtNDYxZS1iNThjLTdlOGNlYTMwOTFjZSIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLWI5ZDRjYjQ1LTBjZWMtNDYxZS1iNThjLTdlOGNlYTMwOTFjZSIsIm9yZ0lkIjoiZTkwNWE2NTEtM2IxNS00NzkxLWFhZDYtNjNiM2ZkNzg0ZDBlIiwibmFtZSI6InNoIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.A55jQ9OUaj2DFl8htsygakJZQORH9XBnNVLYyACMCeI"
const _ = require("lodash");

var FRT_PUB_BASE_URL = "https://apis.fretron.com"

async function getShs() {
    try {
        let res = await rp({
            uri: `https://apis.fretron.com/shipment-view/shipments/v1?filters=%7B%22shipmentDate%22%3A%7B%22isTillExpression%22%3Afalse%2C%22isFromExpression%22%3Afalse%2C%22from%22%3A1681756200000%2C%22till%22%3A1682317765000%7D%2C%22__version%22%3A2%7D&size=100`,
            method: "GET",
            headers: {
                Authorization: token,
            },
            json: true,
        });

        return res

    } catch (e) {
        console.log(`error getting shs : ${e.message}`);
    }

}

async function getBatteryPercentage(imei) {
    const response = await rp({
        uri: `${FRT_PUB_BASE_URL}/device-manager/admin/session/${imei}`,
        method: "GET",
        json: true,
    });
    if (response.error) {
        console.log(`Error in getting battery % : ${response.error}`)
        return null
    } else {
        return response.data.attributes.battery;
    }
}

async function bulkSyncApi(payload) {
    let url = `${FRT_PUB_BASE_URL}/shipment/v1/shipment/bulk/sync`;
    try {
        let res = await rp({
            method: "POST",
            uri: url,
            body: payload,
            headers: {
                Authorization: token,
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


async function main() {
    try {
        let shipments = await getShs()
        for (let sh of shipments) {

            let shId = sh.uuid
            let vehicle = sh.fleetInfo && sh.fleetInfo.vehicle ? sh.fleetInfo.vehicle : null
            let device = sh.fleetInfo && sh.fleetInfo.device ? sh.fleetInfo.device : null
            let imei = device && device.imei ? device.imei : (vehicle && vehicle.vtsDeviceId ? vehicle.vtsDeviceId : null)
            console.log(`Imei for shipment number : ${sh.shipmentNumber} is ${imei}`)
            if (imei) {
                let battery = await getBatteryPercentage(imei)
                battery = Number(battery)
                console.log(typeof (battery))
                console.log(`Battery for imei : ${imei} on shipment Number : ${sh.shipmentNumber} is ${battery}`)
                if (battery && parseInt(battery) >= 0) {
                    let fixedBatteryPercnt = battery.toFixed()
                    console.log(fixedBatteryPercnt)
                    let payload = {
                        shipmentId: shId,
                        updates: [
                            {
                                keyToUpdate: "customfields",
                                updatedValue: [
                                    {
                                        "accessType": null,
                                        "fieldType": "text",
                                        "fieldKey": "Battery Percent",
                                        "value": fixedBatteryPercnt,
                                        "multiple": false,
                                        "unit": "",
                                        "isRemark": false,
                                        "remark": "",
                                        "required": false,
                                        "description": "",
                                        "options": [],
                                        "indexedValue": [],
                                        "valueType": "string",
                                        "input": "string"
                                    }
                                ],
                            },
                        ],
                    };
                    await bulkSyncApi(payload)
                } else {
                    console.log(`Some error in getting battery %`)
                }
            } else {
                console.log(`Imei doesn't exist on shipment Number : ${sh.shipmentNumber}`)
            }
            // break
        }
    } catch (e) {
        console.log(`Catched error in adding/Updating battery percentage : ${e.message}`)
    }
}

main()

