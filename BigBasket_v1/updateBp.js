const rp = require("request-promise")
const fs = require("fs")
const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzgwOTY4MzIsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiJiZThkOTFmYy00MjBiLTRkZDEtOWFlMi0zNmYyOTE4OTQ2OWIiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.QGbgnAl6nt1MEptEOaPuBWHQt3SQPtzvhEz87PJnXWs"

async function getBp() {
    let res = await rp({
        url: "https://apis.fretron.com/shipment-view/bpartners/partners?size=350&filters=%7B%22type%22%3A%5B%22customer%22%5D%2C%22isPortalEnabled%22%3A%5B%5D%2C%22group%22%3A%5B%5D%2C%22city%22%3A%5B%5D%2C%22status%22%3A%5B%5D%2C%22verificationStatus%22%3A%5B%5D%2C%22_customeField%22%3Anull%7D",
        json: true,
        method: "GET",
        headers: {
            authorization: token
        }
    })
    return res

}

async function getBpMaster(uuid) {
    let res = await rp({
        url: "https://apis.fretron.com/business-partners/v2/partner/" + uuid,
        json: true,
        method: "GET",
        headers: {
            authorization: token
        }
    })
    return res

}

async function createPlace(payload, token) {
    try {

        let res = await rp({
            url: "https://apis.fretron.com/place-manager/v2/place",
            json: true,
            body: payload,
            method: "POST",
            headers: {
                authorization: token
            }
        })
        return res
    }
    catch (e) {
        console.log("Error creating place");
    }
}

async function updateBp(payload) {
    try {

        let res = await rp({
            url: `https://apis.fretron.com/business-partners/v2/partner`,
            json: true,
            body: payload,
            method: "PUT",
            headers: {
                authorization: token
            }
        })
        console.log(`update partner res ${res.status} ; error ${res.error}`)
        return res
    }
    catch (e) {
        console.log("Error update place");
    }


}

async function getPlace(placeName, token) {
    let res = await rp({
        url: "https://apis.fretron.com/shipment-view/places/page/places&search=" + placeName,
        json: true,
        method: "get",
        headers: {
            authorization: token
        }
    })
    return res
}

async function main() {
    try {

        let resCustomer = await getBp()
        // console.log(resCustomer);
        for (let item of resCustomer) {
            // console.log(item.uuid, item.name);
            var masterBpData = await getBpMaster(item.uuid)
            var bp = masterBpData.data
            var placeName = bp.places[0].name
            // console.log(placeName);
            var fileData = JSON.parse(fs.readFileSync("newPlaceData", "utf-8"))
            // console.log(fileData);
            var placeMaster = fileData.filter((v) => {
                if (v && v.data && v.data.name == placeName) {
                    return true
                }
            })
            if (!placeMaster.length) {
                console.log("place not found in file", bp.name, bp.uuid);

            }
            else {
                // console.log(placeMaster);
                var payload = bp
                masterBpData.data.places = [placeMaster[0].data]
                console.log(payload);
                await updateBp(payload)
            }

            // break
        }


    }
    catch (e) {
        console.log(e.message);
    }

}
main()