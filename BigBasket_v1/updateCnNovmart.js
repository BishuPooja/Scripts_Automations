const rp = require("request-promise")
const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODMwMjY2NzIsInVzZXJJZCI6ImJvdHVzZXItLTgxNDM2OWMzLTgwYzMtNGJmZC1iMjcyLTA0ZDA5YzBkMDllOCIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTgxNDM2OWMzLTgwYzMtNGJmZC1iMjcyLTA0ZDA5YzBkMDllOCIsIm9yZ0lkIjoiZmM1ZTczNGEtMjg3OC00NWU1LTg3MmEtMTQzMzhkNTU3OGM2IiwibmFtZSI6ImNuIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.qZqjzEncIQ1DAtov25u0109womIDJjdbSz6wBOcE_wA"

async function CnNo(cnNo) {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/shipment-view/consignments/enriched?search=${cnNo}`,
            method: "GET",
            json: true,
            headers: {
                Authorization: token
            }
        })

        if (res && res.length) {
            return res.find(v => v.consignment.consignmentNo == cnNo)
        }
        else {
            return null
        }
    }
    catch (e) {
        console.log(`error getting consignments  ${e.message}`)
    }
}

async function main() {
    let wrongCn = ["1682773864285", "1682773864284", "1682773864283", "1682773864282", "1682773864281", "1682773864280"]
    let correctCn = ["1900044504211", "1900044504202", "1900044504302", "1900044504184", "1900044504205", "1900044504298"]

    for (let item of wrongCn) {
        let res = await getCnByCnNo(item)
        let uuid = res.consignment.uuid
        console.log(uuid)

        break
    }
}
main()