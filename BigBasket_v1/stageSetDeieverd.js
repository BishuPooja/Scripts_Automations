const rp = require("request-promise")
const _ = require("lodash")
const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODExMTQyMDksInVzZXJJZCI6ImJvdHVzZXItLTE1M2NjMjJkLWUxZWEtNDA5OS1hZjI2LTQxYzk5MjRiYzM0MSIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTE1M2NjMjJkLWUxZWEtNDA5OS1hZjI2LTQxYzk5MjRiYzM0MSIsIm9yZ0lkIjoiZDI1NWEwMDAtZjI3MS00ODllLTk0MDgtYjlmYjdkNTkyYjQ0IiwibmFtZSI6IlNISVBNRU5UX1RPS0VOIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.A670vkA6xiDSpUccpocUL56SqftiB8P_X8DDUJihFW4"

const foNos = ['6100052855', '6100052831', '6100052772', '6100052747', '6100052778', '6100052781', '6100052780', '6100052794', '6100052802', '6100052792', '6100052807', '6100052756', '6100052798', '6100052779', '6100052796', '6100052758', '6100052712',
    '6100052717',
    '6100052606',
    '6100052710',
    '6100052663',
    '6100052661',
    '6100052681',
    '6100052679',
    '6100052675',
    '6100052666',
    '6100052595',
    '6100052689',
    '6100052690',
    '6100052676',
    '6100052680',
    '6100052670',
    '6100052662',
    '6100052525',
    '6100052668',
    '6100052660',
    '6100052657',
    '6100052641',
    '6100052602',
    '6100052656',
    '6100052613',
    '6100052608',
    '6100052581',
    '6100052582',
    '6100052592',
    '6100052594',
    '6100052607',
    '6100052549',
    '6100052589',
    '6100052492',
    '6100052493',
    '6100052254',
    '6100052459',
    '6100052455',
    '6100052460',
    '6100052429',
    '6100052417',
    '6100052402',
    '6100052403',
    '6100052376',
    '6100052299',
    '6100052144',
    '6100052903',
    '6100052809',
    '6100052883',
    '6100052876',
    '6100052797',
    '6100052854', '6100052754',
    '6100052767', '6100052765', '6100052685', '6100052678', '6100052801', '6100052806', '6100052718', '6100052803', '6100052470']
console.log(foNos.length)
async function putSh(payload) {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/shipment/v1/admin/shipment`,
            method: "PUT",
            json: true,
            body: payload,
            headers: {
                authorization: token
            }
        })
        console.log(`shipment put status ${res.status}`)
        return res
    }
    catch (e) {
        console.log(`error in put sh ${e.message}`)
    }

}
async function getShcnById(uuid) {
    let res = await rp({
        url: `https://apis.fretron.com/shipment/v1/shipment/${uuid}?skipCn=false`,
        method: 'GET',
        json: true,
        headers: {
            authorization: token
        }
    })
    if (res.status === 200) {
        return res.data
    }
    else {
        return null
    }
}
async function getShByFoNumber(foNumber) {
    try {

        let res = await rp({
            url: `https://apis.fretron.com/shipment-view/shipments/v1?filters={"_shcf_FO Number":[${foNumber}],"__version":2}`,
            method: 'GET',
            json: true,
            headers: {
                authorization: token
            }
        })
        console.log(`get sh by foNumber status ${res}`)
        return res
    } catch (e) {
        console.log(`error in getShByFoNumber ${e.message}`)
    }
}
async function main() {
    let count = 0
    for (let item of foNos) {
        count += 1
        console.log(`count ${count}`)
        let shData = await getShByFoNumber(item)
        if (shData && shData.length) {
            let uuid = shData[0].uuid
            console.log(`Shipment Number- ${shData[0].shipmentNumber}, uuid- ${uuid}`)
            let shMaster = await getShcnById(uuid)
            if (shMaster && shMaster.shipmentStages && shMaster.shipmentStages.length) {
                _.last(shMaster.shipmentStages).tripPoint.purpose = "Delivery"
                // console.log(shMaster.shipmentStages)
                // console.log(JSON.stringify(shMaster))
                console.log(shMaster.shipmentStatus)
                if (shMaster.shipmentStatus != "Completed") {

                    await putSh(shMaster)
                }
                else {
                    console.log(`shipment status  ${shMaster.shipmentStatus}`)
                }
            }
            else {
                console.log(`error in shMaster ${shMaster}`)
            }
        }
        else {
            console.log(`sh Not found for foNumber${item}`)
        }
        // break
    }
}

// main()