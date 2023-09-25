const rp = require("request-promise")
const { Client } = require('@elastic/elasticsearch');
const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODQzMTYwMjEsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiMDZhY2FjN2YtNTY5Ny00ZmVmLTlhNjEtZWVmNDdmNzUzNjdhIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.Ab5HYDnHBwh0KMuYzeOfX39-dKcLvvOSWDxDsHEG3OQ"

const BASE_URL = "https://apis.fretron.com"
async function queryToElastic(payload) {

    try {

        var url = `${BASE_URL}/shipment-view/proxy/to/elastic`;
        var options = {

            uri: url,

            method: "post",

            body: payload,

            json: true,

            timeout: 5000,

        };

        const response = await rp(options);
        return response["aggregations"]["REQUIRED_SHS"]["buckets"]

    } catch (error) {

        console.log(`Some error  ${error.message}`);

    }

    return null;

}

async function getVehicleByVehNo(vehNo) {
    let res = await rp({
        url: `https://apis.fretron.com/shipment-view/shipments/v1?filters=%7B%22__version%22%3A2%2C%22_not%22%3A%7B%22_shipmentStatus_%22%3A%7B%22shipmentStatus%22%3A%5B%22Completed%22%5D%7D%7D%7D&search=${vehNo}`,
        method: "GET",
        json: true,
        headers: {
            authorization: token
        }
    })
    let shIds = []
    if (res && res.length) {
        for (let item of res) {
            shIds.push({
                shId: item.uuid,
                shNo: item.shipmentNumber
            })
        }
        console.log(shIds)
        return shIds
    }
    return shIds
}

async function deletesh(shId) {
    let res = await rp({
        url: `https://apis.fretron.com/shipment/v1/shipment/${shId}`,
        method: "DELETE",
        json: true,
        headers: {
            authorization: token
        }
    })

    console.log(`sh Deleted status ${res.status}`)
    return res
}

async function main() {
    let payloadTofetchData = {
        "index": "shipments_v2",
        "query": {
            "size": 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "term": {
                                "orgId.keyword": {
                                    "value": "06acac7f-5697-4fef-9a61-eef47f75367a"
                                }
                            }
                        },
                        {
                            "bool": {
                                "should": [
                                    {
                                        "term": {
                                            "shipmentTrackingStatus.keyword": {
                                                "value": "At Pickup Point"
                                            }
                                        }
                                    },
                                    {
                                        "term": {
                                            "shipmentTrackingStatus.keyword": {
                                                "value": "Enroute For Pickup"
                                            }
                                        }
                                    },
                                    {
                                        "term": {
                                            "shipmentTrackingStatus.keyword": {
                                                "value": "Departed From Pickup Point"
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    ],
                    "must_not": [
                        {
                            "term": {
                                "shipmentStatus.keyword": {
                                    "value": "DELETED"
                                }
                            }
                        }
                    ]
                }
            },
            "aggs": {
                "REQUIRED_SHS": {
                    "terms": {
                        "field": "fleetInfo.vehicle.vehicleRegistrationNumber.keyword",
                        "size": 100
                    }
                }
            }
        }
    }
    let data = await queryToElastic(payloadTofetchData)
    console.log(data)
    let shIds = []
    var count = 0
    for (let item of data) {
        let vehNo = item.key
        let doc_count = item.doc_count
        if (doc_count > 1) {
            let vehicles = await getVehicleByVehNo(vehNo)
            console.log(`vehicles Length ${vehicles.length}`)
            if (vehicles && vehicles.length > 1) {
                vehicles.pop()
                console.log(`vehicle after remove ${vehicles.length}`)
                console.log(`vehicle More than One ${vehNo} and doc count ${doc_count}`)
                for (let sh of vehicles) {
                    console.log(`shNumber ${sh.shNo}`)
                    // await deletesh(sh.shId)
                    count += 1
                    console.log(`vehicle deleted ${count}`)

                }

            }
        }
    }

}

main() 