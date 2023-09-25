const { log } = require("console")
const rp = require("request-promise")

const tokenFena = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzkzOTE4NTQsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiIzZTRjZGVlOS0wYjNiLTQ2ZGQtOWI5OC1kZjBlMzhhMDI3MWMiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.GT4RvWfZsL__dzxKVUtJPhd1FUyj5_XnrpMC9oFYVu0"

const tokenFenaTest = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzkzOTI4NDQsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiJjZjI4MDYxNy0wM2M2LTQ0ZDQtYjU2YS0yNjdhMmYyOTUwNTgiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.YTTNt8pwRIhdwA61OfbI7hXsjEOPeivXIDQhitPAp_4"

const consignee = ["C.G.E.C.COOP.SOCIETY-DELHI", "M.K. KITCHEN SOLUTIONS", "TALWAR SALES CORPORATION", "AGGARWAL STORE", "MANGLAM ENTERPRISES", "PAWAN KUMAR RAVINDER KUMAR", "R.P AGENCIES", "RADHEY SHYAM ENTERPRISES", "SHRI SHYAM TRADING CO", "TAPAS TRADING CO."]

const vendor = ["ANGAD TRANSPORT", "ANIL RAM", "BALBIR SINGH", "SHRI MOHAN"]

async function getBpFromFena(bpName) {
    try {
        let res = await rp({
            url: "https://apis.fretron.com/shipment-view/bpartners/partners?size=50&from=0&filters=%7B%22type%22%3A%5B%5D%2C%22isPortalEnabled%22%3A%5B%5D%2C%22group%22%3A%5B%5D%2C%22city%22%3A%5B%5D%2C%22status%22%3A%5B%5D%2C%22verificationStatus%22%3A%5B%5D%2C%22_customeField%22%3Anull%7D&search=" + bpName,
            method: "GET",
            json: true,
            headers: {
                authorization: tokenFena
            }
        })

        return res
    } catch (e) {
        console.log(`error executing while fetching bp: ${bpName}`)
    }

}

async function createPlace(payload) {
    try {

        let res = await rp({
            url: "https://apis.fretron.com/hubs/v1/hub",
            json: true,
            body: payload,
            method: "POST",
            headers: {
                authorization: tokenFenaTest
            },
            timeout: 10000
        })
        console.log(`error creating place: ${res.error}`)
        return res && res.status == 200 ? res.data : null
    }
    catch (e) {
        console.log("Error creating place", e.message);
    }
    return
}

async function createBp(payload) {
    try {

        let res = await rp({
            url: `https://apis.fretron.com/business-partners/v2/partner`,
            json: true,
            body: payload,
            method: "POST",
            headers: {
                authorization: tokenFenaTest
            }
        })
        console.log(`error while creating bp${res.error}`)
        return res ? res.data : null
    }
    catch (e) {
        console.log("Error while creating bp", e.message);
    }


}

async function getBpMaster(uuid) {
    try {
        let res = await rp({
            url: "https://apis.fretron.com/business-partners/v2/partner/" + uuid,
            json: true,
            method: "GET",
            headers: {
                authorization: tokenFena
            }
        })
        return res ? res.data : null
    }
    catch (e) {
        console.log(`error executing while getting bp master`)
    }


}



async function main() {
    let count = 0;
    for (let name of vendor) {
        console.log(`consignee name ${name}`);
        let bpDataFena = await getBpFromFena(name)
        let bpId = bpDataFena[0].uuid
        let bpMasterData = await getBpMaster(bpId)
        bpMasterData.uuid = null
        bpMasterData.orgId = null
        let placeMaster = bpMasterData.places
        console.log(placeMaster)
        if (placeMaster.length > 0) {
            for (let i = 0; i < 1; i++) {
                placeMaster[i].placeId = null
                placeMaster[i].addedBy = null
                let payloadPlaceCreate = placeMaster[i]
                console.log(payloadPlaceCreate);
                let createdPlaceRes = await createPlace(payloadPlaceCreate)

                if (createdPlaceRes) {
                    bpMasterData.places = [createdPlaceRes]
                    let payloadCreateBp = bpMasterData
                    let createdBpres = await createBp(payloadCreateBp)
                    count = count + 1
                }
                else {
                    console.log(`place  not created `);
                }
            }
        } else {

            bpMasterData.places = []
            let payloadCreateBp = bpMasterData
            let createdBpres = await createBp(payloadCreateBp)
            count = count + 1

        }


    }
    console.log(`bp created on fena test ${count}`)
}

main().then(_ => { }).catch(e => { })