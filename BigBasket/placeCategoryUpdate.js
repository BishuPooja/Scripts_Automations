const rp = require("request-promise")
const _ = require("lodash")
const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODQ0NzU4MjksInVzZXJJZCI6ImJvdHVzZXItLTZlM2M5MGU4LWMwZTItNDhlYS1iNjc4LTlmNzZhOGRhZTk2YyIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTZlM2M5MGU4LWMwZTItNDhlYS1iNjc4LTlmNzZhOGRhZTk2YyIsIm9yZ0lkIjoiMDZhY2FjN2YtNTY5Ny00ZmVmLTlhNjEtZWVmNDdmNzUzNjdhIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.0Kk62vXUuI2VBWAwauBiluOAGrNX1DH93mhC45xklmI"

const allCategory = [
    'T4',
    'BBN',
    'CC',
    '5K',
    'DC',
]



async function getShipments() {

    let url = `https://apis.fretron.com/shipment-view/shipments/v1?filters=%7B%22shipmentDate%22%3A%7B%22isTillExpression%22%3Afalse%2C%22isFromExpression%22%3Afalse%2C%22from%22%3A1684953000000%2C%22till%22%3A1687372242000%7D%2C%22__version%22%3A2%7D&size=400&allFields=["uuid"]`
    try {
        let res = await rp({
            uri: url,
            method: 'GET',
            json: true,
            headers: {
                authorization: TOKEN
            }
        })

        return res?.length ? res : []
    }
    catch (e) {
        console.log(`error in shipment get ${e.message}`)
    }
    return []
}

async function getPlaceByName(name) {
    try {
        let url = `https://apis.fretron.com/shipment-view/places/page/places?filters=%7B%22category.keyword%22%3A%5B%5D%2C%22isOwned%22%3Afalse%7D&search=${encodeURIComponent(name)}`
        let res = await rp({
            method: "GET",
            uri: url,
            json: true,
            headers: {
                authorization: TOKEN
            }
        });
        console.log(`place api call ${res.length}`)

        return res.find((v) => v.name == name) ?? []

    } catch (e) {
        console.log(`Catched error in get sh by id : ${e.message}`)
    }
    return []
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
        console.log(`place api call ${res.error}`)
        if (res.status == 200) {
            return res.data
        }
        else {
            console.log(`Error getting place Master ${res?.error}`)
        }
    } catch (e) {
        console.log(`Catched error in get sh by id : ${e.message}`)
    }
    return null
}

async function getHubById(placeId) {
    try {
        let url = `https://apis.fretron.com/hubs/v1/hub/${placeId}`
        let res = await rp({
            method: "GET",
            uri: url,
            json: true,
            headers: {
                authorization: TOKEN
            }
        });
        console.log(`hub api call`)

        if (res.status == 200) {
            return res.data
        }
        else {
            console.log(`Error getting hub Master ${res?.error}`)
        }
    } catch (e) {
        console.log(`Catched error in get sh by id : ${e.message}`)
    }
    return null
}
async function getShWithCn(shId) {
    try {
        let url = `https://apis.fretron.com/shipment/v1/shipment/${shId}?skipCn=false`
        let res = await rp({
            url: `https://apis.fretron.com/shipment/v1/shipment/${shId}?skipCn=false`,
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
            console.log(`error in get sh ${res.error}`)
            return null
        }

    } catch (e) {
        console.log(`error executing while fetching shipment ${e.message}`)
    }
    return null

}

async function mailer(to, cc, subject, html) {
    try {
        console.log(`Mail Sent with Subject ${subject}`)
        await rp({
            url: `${FRT_PUB_BASE_URL}/notifications/emails/email`,
            json: true,
            body: {
                cc: cc,
                to: to,
                subject: subject,
                html: html,
            },
            method: "POST"
        })
        return "Mail Sent successfully"
    } catch (err) {
        return "Error sending mail- " + err.message
    }
}

async function sendMailForCategory(shNo, stage, placeName) {

    let html = ` <html>
            <body>
                <p>Dear Sir</p>
                <p>Please find the below details</p>
             <p>shNo: ${shNo}</p>
             <p>shipmentStage :${stage}</p>
             <p>Place Name :${placeName}</p>

            </body>
        </html>
        `
    let subject = "FRETRON | Category Not Found In Master"
    let mailRes = await mailer(["pooja.bishu@fretron.com"], [], subject, html)
    console.log(mailRes)

}

async function main() {
    try {
        let shs = await getShipments()
        console.log(shs.length)
        let placeNotInMaster = []
        let placeMasterMap = {

        }
        if (shs?.length) {
            for (id of shs) {
                try {
                    let flag = false
                    let uuid = id.uuid
                    let shMaster = await getShWithCn(uuid)
                    let stages = shMaster?.shipmentStages
                    let shNo = shMaster?.shipmentNumber
                    console.log(`Executing for ${shNo}`)
                    if (stages?.length) {
                        for (let i = 0; i < stages.length; i++) {
                            let item = stages[i]
                            let place = item?.place ?? null
                            let hub = item?.hub ?? null
                            let category = place?.category ?? hub.category
                            let placeId = place?.placeId ?? hub?.placeId
                            let placeName = place?.name
                            let placeMaster = null
                            let masterCategory = null
                            if (placeId) {
                                if (placeMasterMap[placeId]) {
                                    placeMaster = placeMasterMap[placeId]
                                    console.log(`place master map found  `)
                                } else {
                                    placeMaster = await getPlaceById(placeId)
                                    if (!placeMaster) {
                                        let placeByNameRes = await getPlaceByName(placeName)
                                        let newPlaceId = placeByNameRes?.placeId
                                        placeMaster = await getPlaceById(newPlaceId)
                                        placeMasterMap[newPlaceId] = placeMaster
                                        if (!placeMaster) {
                                            placeNotInMaster.push({
                                                placeName: placeName,
                                                placeId: placeId,
                                                shNo: shNo
                                            })
                                        } else {
                                            console.log(`placeId different in shipment ${shNo}`)
                                            flag = true
                                            shMaster.shipmentStages[i] = placeMaster
                                        }
                                    }
                                    placeMasterMap[placeId] = placeMaster
                                }
                            } else {
                                console.log(`placeId and HubId not found for shipment ${shNo}`)
                            }
                            if (placeMaster) {
                                masterCategory = placeMaster?.category
                                if (category != masterCategory) {
                                    flag = true
                                    console.log(`different category ${category} for shipment ${shNo} stage ${i}`)
                                    console.log(`${shMaster.shipmentStages[i].place.name} stage Index ${i} stageId ${shMaster.shipmentStages[i].uuid}`)
                                    shMaster.shipmentStages[i].place = placeMaster
                                    shMaster.shipmentStages[i].hub = placeMaster
                                }
                            }
                        }
                        if (flag) {
                            // put sh
                            console.log("shipmentStage update case ")
                            // await putSh(shMaster)
                        }
                        else {
                            console.log(`OK Case  ${shNo}`)
                        }
                    }
                    else {
                        console.log(`stages not found for ${shNo}`)
                    }
                } catch (e) {
                    console.log(`error in shipment id ${id}  ${e.message}`)
                }
            }
            console.log(placeMasterMap)
            console.log(placeNotInMaster)
        }
        else {
            console.log(`shipments not found`)
        }
    }
    catch (e) {
        console.log(`error in main ${e.message}`)
    }

}

main()

async function getAllPlaces() {
    let url = `https://apis.fretron.com/shipment-view/places/page/places?filters=%7B%22category.keyword%22%3A%5B%5D%2C%22isOwned%22%3Afalse%7D&search=%20&size=600&allFields=["name"]`
    let res = await rp({
        uri: url,
        method: 'GET',
        json: true,
        headers: {
            authorization: TOKEN
        }
    })

    console.log(`res length ${res.length}`)

    return res
}

async function test() {
    let res = await getPlaceByName("Noida DC")
    console.log(res)
    // let data = []
    // for (let item of res) {
    //     data.push(item.category)
    //     // console.log(data)
    // }
    // data = _.uniq(data)
    // console.log(data)
}
// test()