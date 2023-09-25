const rp = require("request-promise")
const TOKEN = ""
const $event = {
    body: {
        shipmentId: "50fac806-811c-4404-9d70-57177620e1cf",
        cfs: [],
        token: "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTE2NjQ1NTgsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiI2ZjgwZWZmNS1mYWQxLTRmYmYtOTc2Yi1iNWJmYjU5NWQ0NTQiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.0PCESufaTrSToAyVNRx0QqMAU-XgPU7YvXcoxxqlKGU"
    }
}


async function generateEwayBill(payload) {
    try {
        let url = `https://api.mastergst.com/ewaybillapi/v1.03/ewayapi/genewaybill?email=accounts@fretron.com`
        let res = await rp({
            uri: url,
            method: "POST",
            json: true,
            body: payload,
            headers: {
                "client_id": "a3f33226-33b4-4525-b4fa-57962536cdd6",
                "client_secret": "a3674903-68b8-454e-b978-9b022f26cf62",
                "ip_address": "4th Floor - 55P Institutional Area",
                "gstin": "06AAECF0547N1Z",
                "Authorization": "16cadbb7-83fe-4dc2-875c-25e2144f84ee"
            }
        })
        return res
    } catch (e) {
        console.log(`Error generating Eway Bill ${e.message}`)
    }
}
async function getShWithCn(shId, token) {
    try {
        let url = `https://apis.fretron.com/shipment/v1/shipment/${shId}?skipCn=false`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: token
            }
        })
        if (res?.error) {
            console.log(`Error Sh-Cn Get ${JSON.stringify(res.error)}`)
        }
        return res.status == 200 ? res.data : null
    } catch (e) {
        console.log(`Caught Error Getting Shipment ${e.message}`)
    }
}

async function getCn(cnId, token) {
    try {
        let url = ``
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: token
            }
        })
        if (res?.error) {
            console.log(`Error cnGet ${JSON.stringify(res)}`)
        }
        return res?.status == 200 ? res.data : null
    } catch (e) {
        console.log(`Caught Error getCn ${e.message}`)
    }
}
async function main(body) {
    try {
        let shipmentId = body.shipmentId
        let cfs = body?.cfs
        let token = "Bearer " + body?.token
        let sh = await getShWithCn(shipmentId, token)

        console.log(sh)
    } catch (e) {
        console.log(`error in main ${e.message}`)
    }
}

main($event.body)

