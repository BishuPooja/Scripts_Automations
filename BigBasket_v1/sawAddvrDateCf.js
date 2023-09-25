const rp = require("request-promise")
const _ = require("lodash")
const moment = require("moment")
const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODE4MjA0ODQsInVzZXJJZCI6ImJvdHVzZXItLTExOGE5NjFkLWU3OTUtNGJiNS1iMzlhLTA1YjlkZTI0NjA5MyIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTExOGE5NjFkLWU3OTUtNGJiNS1iMzlhLTA1YjlkZTI0NjA5MyIsIm9yZ0lkIjoiM2FlZGE1MjctZWIzZS00MTNiLWFiNzgtY2FlNzdlMTE5N2QwIiwibmFtZSI6InNoIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.VrkOSAv0xUe7D_E_I_RQhl8mqFes43eSDbymAyb9aOk"


async function getSh() {
    try {
        let url = `https://apis.fretron.com/shipment-view/shipments/v1?filters=%7B%22_shipmentStatus_%22%3A%7B%22shipmentStatus%22%3A%5B%22Completed%22%5D%7D%2C%22__version%22%3A2%2C%22shipmentDate%22%3A%7B%22isTillExpression%22%3Afalse%2C%22isFromExpression%22%3Afalse%2C%22from%22%3A1675257240000%2C%22till%22%3A1681821030000%7D%7D&size=200&allFields=["uuid","customFields","shipmentNumber","shipmentDate"]`


        var options = {
            uri: url,
            method: "GET",
            headers: {
                Authorization: token,
            },
            json: true,
        };

        let response = await rp(options)
        let shipments = response;
        await main(shipments)
        while (response.length) {
            let uri = `https://apis.fretron.com/shipment-view/shipments/v1?filters=%7B%22_shipmentStatus_%22%3A%7B%22shipmentStatus%22%3A%5B%22Completed%22%5D%7D%2C%22__version%22%3A2%2C%22shipmentDate%22%3A%7B%22isTillExpression%22%3Afalse%2C%22isFromExpression%22%3Afalse%2C%22from%22%3A1675257240000%2C%22till%22%3A1681821030000%7D%7D&allFields=["uuid","customFields","shipmentNumber","shipmentDate"]&from=${encodeURIComponent(
                JSON.stringify([
                    response[response.length - 1].shipmentDate,
                    response[response.length - 1].uuid,
                ])
            )}&size=200`

            options.uri = uri;
            response = await rp(options);
            // shipments = [...shipments, ...response];
            await main(response)

        }
        console.log(shipments.length);

        return shipments;

    } catch (e) {
        console.log(`error executing while fetching shipment ${e.message}`)
    }

}

getSh()




async function getOrderDateFromVrNo(vrNo) {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/shipment-view/sales/v2/orders?limit=1&search=${vrNo}`,
            method: "GET",
            json: true,
            headers: {
                authorization: token
            }

        })

        return res.find(v => v.orderNumber == vrNo)?.orderDate

    } catch (e) {
        console.log(`error executing while  getting order ${e.message}`)
    }

}

async function cfUpdateVRdate(payload) {
    try {
        let res = await rp({
            url: "https://apis.fretron.com/shipment/v1/shipment/bulk/sync",
            method: "POST",
            json: true,
            body: payload,
            headers: {
                authorization: token
            }

        })
        if (res.status == 200) {
            return res.status
        }
        else {
            return res.error
        }
    } catch (e) {
        console.log(`error executing while updating VR date ${e.message}`)
    }

}

function getFromCf(cfs, key) {
    if (cfs == null) {
        return null
    } else {
        let found = cfs.find(v => v.fieldKey == key)
        return found ? found.value : null
    }
}

async function main(shipments) {
    let shRes = shipments
    console.log(shRes.length)
    for (let item of shRes) {
        let shUUID = item.uuid
        let shNo = item.shipmentNumber
        let cf = item?.customFields
        let vrNo = getFromCf(cf, "VR Number")
        console.log(vrNo)

        if (!vrNo) {
            continue
        }
        let orderDate = await getOrderDateFromVrNo(vrNo)

        if (orderDate) {
            let payload = {
                shipmentId: shUUID,
                updates: [
                    {
                        keyToUpdate: "customfields",
                        updatedValue: [
                            {
                                "accessType": null,
                                "fieldType": "date",
                                "fieldKey": "VR Date",
                                "value": orderDate,
                                "multiple": false,
                                "unit": "",
                                "isRemark": false,
                                "remark": "",
                                "required": false,
                                "description": "",
                                "options": [],
                                "indexedValue": [],
                                "valueType": "string",
                                "input": "date",
                            }
                        ],
                    },
                ],
            }

            // let updatedCfRes = await cfUpdateVRdate(payload)
            // console.log(`updatedCfRes---->${updatedCfRes} shNo---->${shNo}`)
        }
        else {
            console.log(`orderDate not found ShNo --->${shNo} order no -->${vrNo}`)
        }

    }

}
