const rp = require("request-promise")
const fs = require("fs")
const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODA4NTAwODIsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiJiZThkOTFmYy00MjBiLTRkZDEtOWFlMi0zNmYyOTE4OTQ2OWIiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.aUyJ0bqjCD_S56p1VWOcNPQvapFBriuY_v7tNlDQiVY"
async function getSh() {
    let res = await rp({
        url: `https://apis.fretron.com/shipment/v1/shipment/cb7e7a14-cda6-4e4d-83b0-617fe06bbd6b?skipCn=true`,
        method: "GET",
        json: true,
        headers: {
            authorization: token
        }
    })

    if (res.status == 200) {
        return res.data
    }
    else {
        return res
    }
}

async function syncSh(shId) {
    let res = await rp({
        url: `http://apis.fretron.com/lbs-manager/v1/lbs/admin/session/ensure/frequency-meta?shId=${shId}`,
        method: "GET",
        json: true
    })

    if (res.status == 200) {
        return res.status
    }
    else {
        return res
    }

}

async function main() {
    let readData = JSON.parse(fs.readFileSync("sh_auto_lbs (1).json", "utf-8"))
    console.log(readData.length)
    let count = 0
    for (let item of readData) {
        count += 1
        console.log("count " + count);

        let shId = item._source.uuid
        console.log(shId);
        let syncShRes = await syncSh(shId)
        console.log(syncShRes)

    }
    console.log("total count", count);
}

main()