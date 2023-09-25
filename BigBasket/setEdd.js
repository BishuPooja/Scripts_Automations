const rp = require("request-promise")
const fs = require("fs")
const { log } = require("console")
const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODE4MjA0ODAsInVzZXJJZCI6ImJvdHVzZXItLWFkMDFiOTlmLWU3YTYtNGZjNS04ZmZmLWYxNmFmMzQzYjFlYyIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLWFkMDFiOTlmLWU3YTYtNGZjNS04ZmZmLWYxNmFmMzQzYjFlYyIsIm9yZ0lkIjoiM2FlZGE1MjctZWIzZS00MTNiLWFiNzgtY2FlNzdlMTE5N2QwIiwibmFtZSI6InNoIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.7IlVfVUERp0-oYxEWwSOog3Fg8VEGh9GSDGE4gwH580"

async function setEddApiMaker(shId) {
    try {
        let url = `https://apis.fretron.com/automate/autoapi/run/323db323-a309-4229-b8ac-7b2a72e22b06?shipmentId=${shId}`
        console.log(url)
        let res = await rp({
            url: url,
            method: "GET",
            json: true,
            headers: {
                authorization: token
            }

        })
        if (res.status == 200) {
            return res
        }
        else {
            return res.error
        }
    } catch (e) {
        console.log(`error executing while updating edd ${e.message}`)
    }
}

async function main() {
    let readData = JSON.parse(fs.readFileSync("shDataEddNo.json", "utf-8"))
    console.log(readData.length)
    for (let item of readData) {
        let id = item._source.uuid
        console.log(id)
        let updatedEddRes = await setEddApiMaker(id)
        console.log(item._source.shipmentNumber)

    }
}

main()