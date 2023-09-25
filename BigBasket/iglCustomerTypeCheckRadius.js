const rp = require("request-promise")
const fs = require("fs")
const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODQxNDkwOTQsInVzZXJJZCI6ImJvdHVzZXItLTQ5ZmQxM2M2LTVlNzQtNDhhNS1iN2EwLTgyMjBlN2FmZDIzNyIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTQ5ZmQxM2M2LTVlNzQtNDhhNS1iN2EwLTgyMjBlN2FmZDIzNyIsIm9yZ0lkIjoiNDcyYjNjNTEtZDhlOS00Mjk0LThhN2YtYTY5MDkzYjUwNWI3IiwibmFtZSI6ImJwIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.wr9gQ5loNI4VyXRGx8MFFEd3iqFrM27b50DFR47dtKM"

async function getCustomer() {
    let res = await rp({
        url: `https://apis.fretron.com/shipment-view/bpartners/partners?size=1200&filters={"type":["customer"]}`,
        method: "GET",
        json: true,
        headers: {
            authorization: TOKEN
        }
    })
    return res
}

async function getBpByMaster(id) {
    let res = await rp({
        url: `https://apis.fretron.com/business-partners/v2/partner/${id}`,
        method: "GET",
        json: true,
        headers: {
            authorization: TOKEN
        }
    })
    if (res.status == 200) {

        return res.data
    }
    else {
        return null
    }
}
async function getPlaceById(placeId) {
    try {
        let url = `https://apis.fretron.com/place-manager/v2/place/detail?source=FRETRON&placeId=${placeId}`
        let res = await rp({
            method: "GET",
            uri: url,
            json: true,
            headers: {
                authorization: TOKEN
            }
        });
        if (res.status == 200) {
            return res.data
        }
        return null
    } catch (e) {
        console.log(`Catched error in get sh by id : ${e.message}`)
    }
    return null
}

async function updatePartner(partner) {

    let url = `http://apis.fretron.com/business-partners/v2/partner`

    let response = await rp({

        'uri': url,

        'method': 'PUT',

        "json": true,

        body: partner,

        "headers": {

            "Content-Type": "Application/json",

            Authorization: TOKEN,

        }

    })

    if (response.status == 200) {

        return response.data

    } else {

        return null

    }

}
async function main() {
    // let customersRES = await getCustomer()
    // console.log(customersRES.length)

    // fs.writeFileSync(`customerTypeIgl.json`, JSON.stringify(customersRES))
    let customers = JSON.parse(fs.readFileSync('customerTypeIgl.json', `utf-8`))
    console.log(customers.length)
    let notPlaceId = []
    let differentRadius = []
    let zeroRadius = []
    let count = 0
    for (let i = 0; i < customers.length; i++) {
        let item = customers[i]
        count += 1
        console.log(`count ${count} customers`)
        let bpId = item.uuid
        let bpMasterRes = await getBpByMaster(bpId)
        for (let value of bpMasterRes.places) {
            let placeId = value.placeId
            if (!placeId) {
                notPlaceId.push({
                    externalId: item.externalId ?? item.name,
                    name: item.name
                })
            }
            else {
                let suggestedRadius = value.suggestedRadius
                if (!suggestedRadius) {
                    let placeRes = await getPlaceById(placeId)
                    if (placeRes && placeRes.suggestedRadius) {
                        differentRadius.push({
                            externalId: item.externalId ?? item.name,
                            radius: placeRes.suggestedRadius,
                            name: item.name
                        })
                        bpMasterRes.places = [placeRes]
                        let payload = bpMasterRes
                        // let updatedPlaceRes = await updatePartner(payload)
                        // console.log(`updatedPlaceRes ${JSON.stringify(updatedPlaceRes)}`)
                        break
                    }
                    else if (placeRes && !placeRes.suggestedRadius) {
                        zeroRadius.push({
                            externalId: item.externalId ?? item.name,
                            name: item.name
                        })
                    }
                }
            }
        }
        // break
    }

    console.log(`notPlaceId -->${notPlaceId.length} --> ${JSON.stringify(notPlaceId)}`)
    console.log(`differentRadius -->${differentRadius.length} --> ${JSON.stringify(differentRadius)}`)
    console.log(`zeroRadius-->${zeroRadius.length} --> ${JSON.stringify(zeroRadius)}`)
}
main()