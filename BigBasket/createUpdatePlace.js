const rp = require("request-promise")
const fs = require("fs")
const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzgwOTY4MzIsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiJiZThkOTFmYy00MjBiLTRkZDEtOWFlMi0zNmYyOTE4OTQ2OWIiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.QGbgnAl6nt1MEptEOaPuBWHQt3SQPtzvhEz87PJnXWs"

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

async function updateBp(payload, bpUuid) {
    try {

        let res = await rp({
            url: `http://apis.fretron.com/business-partners/v2/partner/update/places?partnerId=${bpUuid}`,
            json: true,
            body: payload,
            method: "PUT",
            headers: {
                authorization: token
            }
        })
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
        var placesData = []
        var resultCreatedPlace = []
        let count = 0
        // console.log(resCustomer);
        for (let i of resCustomer) {
            let uuid = i.uuid
            console.log(uuid);
            let resCustomerMaster = await getBpMaster(uuid)
            let placeName = null
            if (resCustomerMaster.data && resCustomerMaster.data.places.length) {
                placeName = resCustomerMaster.data.places[0].name + "-" + resCustomerMaster.data.name
                console.log(placeName);
            } else {
                console.log(resCustomerMaster)
                continue
            }

            let masterPlaceData = JSON.parse(fs.readFileSync("placeData", "utf-8"))
            // console.log(masterPlaceData);
            // console.log(resCustomerMaster.data.uuid);
            // console.log(placeName);


            for (let i = 0; i < masterPlaceData.length - 1; i++) {
                let value = masterPlaceData[i]
                if (value && value.data) {
                    // console.log(value.data.name);
                    // console.log(placeName, "placeName");
                    if (value.data.name == placeName) {
                        // console.log("resCustomerMaster.data.uuid: ", resCustomerMaster.data.uuid)
                        // console.log(value.data, "value");
                    }
                    else {
                        // console.log("value.data", value.data);
                        // console.log(placeName);
                    }
                }
                else {
                    console.log("not match", resCustomerMaster.data.uuid)
                }
            }
            // console.log(value);
            // resCustomerMaster['places'] = [value]



            // console.log(resCustomerMaster.data.places);
            // let place = resCustomerMaster.data.places ? resCustomerMaster.data.places : ""
            // // if (place) {
            //     place[0].name = place[0].name + "-" + resCustomerMaster.data.name
            //     let payloadForCreatePlace = place[0]
            //     console.log(payloadForCreatePlace);
            //     let placeCreatedRes = await createPlace(payloadForCreatePlace, token)
            //     if (placeCreatedRes) {
            //         console.log("Place created");
            //     }
            //     count++;
            //     console.log(count);
            //     resultCreatedPlace.push(placeCreatedRes);
            // }
            // break
        }
        // fs.writeFileSync("placeData", JSON.stringify(resultCreatedPlace))


    }
    catch (e) {
        console.log(e.message);
    }

}
main()