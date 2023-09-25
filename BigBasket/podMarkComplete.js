const { log } = require("console");
const rp = require("request-promise");
const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Nzk5ODA3ODAsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiIzZTRjZGVlOS0wYjNiLTQ2ZGQtOWI5OC1kZjBlMzhhMDI3MWMiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.wL2IadXp81fYQCckClxVseh1WLTXbyz08s-oHQvuGBA"
async function getShMaster(shId) {
    let res = await rp({
        url: "https://apis.fretron.com/shipment/v1/shipment/" + shId + "?skipCn=true",
        method: "GET",
        json: true,
        headers: {
            authorization: token
        }
    })
    return res.data
}
const cnObj = {}
async function completeSh(payload) {
    try {
        let res = await rp({
            url: "https://apis.fretron.com/shipment/v1/shipment/bulk/sync",
            method: "POST",
            payload: JSON.stringify(payload),
            headers: {
                Authorization: token,
            }
        })
        if (res.status == 200) {
            return res
        }
        else {
            console.log(res.error);
        }
    } catch (e) {
        console.log(`error executing while mark complete ${e.message}`);
    }

}

async function main(cnObj) {
    let shId = cnObj.activeShipment
    if (shId) {
        let currTime = Date.now()
        let shRes = await getShMaster(shId)
        console.log(shRes);
        let shStages = (shRes?.shipmentStages?.length) ? shRes.shipmentStages : []
        shStages.forEach((item, idx) => {
            console.log(idx);
            let conDelivered = item?.consignmentDelivered ?? []
            if (conDelivered.includes(cnObj.uuid)) {
                console.log(`delivered for this consignment ${cnObj.consignmentNo} and this shipment ${shRes.shipmentNumber}`);
                let pod = cnObj?.pod
                if (pod) {
                    let departureTime = item.departureTime
                    if (departureTime == null) {
                        let stageId = item.uuid
                        let payload = {
                            "shipmentId": shId,
                            "updates": [
                                {
                                    "keyToUpdate": "departureTime",
                                    "updatedValue": currTime + 5000,
                                    "stageId": String(stageId),
                                    "markComplete": true
                                }
                            ]
                        }
                        if (idx == shStages.length - 1) {
                            payload.updates.push({
                                "keyToUpdate": "markcomplete",
                                "updatedValue": currTime + 10000,
                                "stageId": String(stageId),
                                "markComplete": true
                            })
                        }
                        console.log(payload);

                        // let completedSh = await completeSh(payload)
                    }
                }
            }
        })
    }
}

main(cnObj)
