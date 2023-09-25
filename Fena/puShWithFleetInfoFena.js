const rp = require("request-promise")
const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODUxMDQ1NjIsInVzZXJJZCI6ImJvdHVzZXItLTIwYzEwNzBiLWMwNzQtNDcxYS05NzA4LWU1MmZhZmEwNTdhZCIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTIwYzEwNzBiLWMwNzQtNDcxYS05NzA4LWU1MmZhZmEwNTdhZCIsIm9yZ0lkIjoiM2U0Y2RlZTktMGIzYi00NmRkLTliOTgtZGYwZTM4YTAyNzFjIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.Y3Lg4tmDXELG920JoEvAwUQQNva9H2fPvPbw5iXvfYY"

const bpMasterBaseUrl = "https://apis.fretron.com"


const shNos = ["FRETSH000001205", "FRETSH000001299", "FRETSH000001298", "FRETSH000001491", "FRETSH000001586", "FRETSH000001868", "FRETSH000001867"]

async function getShbyshNo(shNo) {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/shipment-view/shipments/v1?filters=%7B%7D&search=${shNo}`,
            method: 'GET',
            json: true,
            headers: {
                authorization: TOKEN
            }
        })
        return res.length ? res[0] : null
    }
    catch (e) {
        console.log(`Error getting shbyshNo ${e.message}`)
    }
    return null
}


async function getBusinessPartnerByKeyValue(key, value, partnerType = null) {
    let ORGID = "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
    let url = `${bpMasterBaseUrl}/business-partners/v2/admin/partner?key=${key}&value=${value}&orgId=${ORGID}`
    if (partnerType) url = url + `&type=${partnerType}`
    try {
        let res = await rp({
            method: "GET",
            uri: url,
            json: true
        })
        console.log(`Get bp by ${key} ${value} api res status : ${res.status}`)
        if (res.status == 200) {
            return res.data
        } else {
            console.log(`Get bp by ${key} ${value} api res error : ${res.error}`)
        }
    } catch (e) {
        console.log(`Catched error in getting bp by ${key} ${value}  : ${e.message}`)
    }
    return null
}

async function putSh(payload) {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/shipment/v1/admin/shipment`,
            method: "PUT",
            json: true,
            body: payload,
        })
        console.log(`shipment put status ${res.status}`)

        return res
    }
    catch (e) {
        console.log(`error in put sh ${e.message}`)
    }

}
async function getShWithCn(shId) {
    try {
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
async function main() {
    let key = "externalId"  
    let partnerType = "vendor"
    let value = "7500484"
    let partnerRubani = await getBusinessPartnerByKeyValue(key, value, partnerType)
    for (let ShNo of shNos) {
        console.log(` shipment executing ${ShNo}`)
        let shRes = await getShbyshNo(ShNo)
        let shId = shRes?.uuid

        let shMaster = await getShWithCn(shId)
        if (shMaster) {
            let fleetInfo = shMaster?.fleetInfo
            fleetInfo.broker = partnerRubani
            fleetInfo.fleetOwner = partnerRubani
            fleetInfo.forwardingAgent = null
            shMaster.fleetInfo = fleetInfo
            console.log(shMaster?.shipmentStatus)
            console.log(shMaster?.fleetInfo?.fleetOwner?.name, " ", shMaster?.fleetInfo?.broker?.name, " ", shMaster?.fleetInfo?.forwardingAgent?.name)
            // await putSh(shMaster)
        }
        else {
            console.log(`Shipment Master not found ${ShNo}`)
        }
    }
}
main()

