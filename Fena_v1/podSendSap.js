const rp = require("request-promise")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"
const base_url = "http://34.93.148.238"
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTEwNjI5OTksInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiI0OTViODcyOC1jNzYxLTRmYTctODNmZS1kYjc1YTdkNjMyMjEiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.dcdMT_-mN2BpAuhdGiAMpxqwQLoQC91nvsfuY9jwROA"

async function ensurePod(cnUuid) {
    try {
        let res = await rp({
            url:
                `${FRT_PUB_BASE_URL}/pod/v1/action/ensure-pod?consignmentId=` +
                cnUuid,
            json: true,
            headers: {
                Authorization: TOKEN,
            },
        });
        if (res.status == 200) {
            return res.data
        } else {
            console.log(`EnsurePod api res error : ${res.error}`)
        }
    } catch (e) {
        console.log(`Catched error in ensurePod : ${e.message}`)
    }
    return null
}

async function produceAndSendPodData(cnExtId) {
    let url = `${base_url}:8084/fena/pod-data?cnExtId=${cnExtId}`
    try {
        let res = await rp({
            method: "GET",
            uri: url,
            json: true
        });
        console.log(`Produce and Send Pod Data from integration manager to SAP : ${JSON.stringify(res)}`)
    } catch (e) {
        console.log(`Catched error in Producing and Sending Pod Data from integration manager to SAP : ${e.message}`)
    }
}

async function cnGet(cnId) {
    try {
        let url = `${FRT_PUB_BASE_URL}/shipment/v1/consignment/${cnId}/shipments`;

        let options = {
            uri: url,
            method: "get",
            json: true,
            headers: {
                Authorization: TOKEN,
            },
        };

        let res = await rp(options);

        if (res.error) {
            console.log(`Error in fetch ${res.error}`);
            return null;
        }

        return res.data;
    } catch (err) {
        console.log(`Some error fetching cn ${err.message}`);
        return null;
    }
}

// Send pod data to SAP
async function main(cnIds) {
    try {
        for (let cnId of cnIds) {
            let cnRes = await cnGet(cnId)
            cnRes = cnRes?.consignment
            let cnExtId = cnRes?.externalId ?? null
            let pod = await ensurePod(cnId)
            let status = pod?.status
            let isCurrptedCase = (pod?.deliveryItems ?? []).filter(item => item?.status == "PENDING")?.length > 0
            console.log(`Pod Status : ${status}, isCurrptedCase : ${isCurrptedCase}, cnExtId : ${cnExtId}`)
            if (cnExtId && (status == "SUBMITTED" || isCurrptedCase == false)) {
                // await produceAndSendPodData(cnExtId)
            } else {
                console.log(`CnExtId ${cnExtId}`)
            }
        }

    } catch (e) {
        console.log(e.message)
    }
}


// try {
//     let $event = {
//         body: {
//             cnIds: ["5a86772a-e874-490d-84a9-02e18f3fd302", "7b16b09c-5b46-4230-aec1-cdc9077c3580"]
//         }
//     }
//     let cnIds = $event.body.cnIds
//     if (cnIds?.length) {
//         main(cnIds)
//     }

// } catch (e) {
//     console.log(`error ${e.message}`)
// }


async function sendPodData(data) {
    let url = `https://49.249.154.146:50002/sap/bc/zfretron_pod?sap-client=800`
    try {
        let res = await rp({
            method: "POST",
            uri: url,
            headers: {
                Authorization: "Basic aXQwMDA3OlByZEBNYXIyMw=="
            },
            body: data,
            json: true,
            rejectUnauthorized: false
        })
        console.log(`Send Pod data to SAP res : ${JSON.stringify(res)}`)
        return res
    } catch (e) {
        console.log(`Catched error in sending pod data to SAP res: ${e.message}`)
    }
    return "Some error in sending Data"
}

async function main2() {
    try {
        for (let payload of data) {
            try {
                await sendPodData(payload)

            } catch (e) {
                console.log(`error in payload ${JSON.stringify(payload)} ${e.message}`)
            }
        }
    } catch (e) {
        console.log(`error ${e.message}`)
    }
}

