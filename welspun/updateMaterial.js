const rp = require("request-promise")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"

const WelDemo_Token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTM4MzA3MDAsInVzZXJJZCI6ImJvdHVzZXItLWZiODY4ZWRlLWVjODItNDc5Yi04MjA4LTM0ZTdkYTI2YWYzOCIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLWZiODY4ZWRlLWVjODItNDc5Yi04MjA4LTM0ZTdkYTI2YWYzOCIsIm9yZ0lkIjoiNmY4MGVmZjUtZmFkMS00ZmJmLTk3NmItYjViZmI1OTVkNDU0IiwibmFtZSI6InN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.Ef-6dRONs1FpOO5U3EZcrOhOPTkQpHGH41RRRm9gfKM"

async function getMaterials() {
    try {
        let url = `https://apis.fretron.com/shipment-view/materials/materials?&filters={"type":["Material"]}`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: WelDemo_Token
            }
        })
        return res?.length ? res : []

    } catch (e) {
        console.log(`Caught Error getting Materials ${e.message}`)
    }
}

async function materialUpdate(payload) {
    try {
        let url = `https://apis.fretron.com/materials/v1/material/v2`
        let res = await rp({
            uri: url,
            method: "PUT",
            json: true,
            body: payload,
            headers: {
                authorization: WelDemo_Token
            }
        })

        if (res?.status != 200) {
            console.log(`Update Material catch Error ${res.error}`)
        } else {
            console.log(`material Update status ${res.status}`)
        }
    } catch (e) {
        console.log(`Caught Error updating Material ${e.message}`)
    }
}
function addLeadingZeros(number, desiredLength) {
    let numberString = number.toString();
    while (numberString.length != 18) {
        numberString = '0' + numberString;
    }
    return numberString;
}


async function main() {
    try {
        let materials = await getMaterials()
        console.log(`Total Materials ${materials?.length}`)
        for (let material of materials) {
            console.log(`Material ${material.name}`)
            let materialExtId = material.externalId
            console.log(`materialExtId ${materialExtId} len ${materialExtId?.length}`)

            if (materialExtId) {
                let extIdLen = materialExtId.length

                if (extIdLen < 18) {
                    let addingZeros = 18 - extIdLen
                    materialExtId = addLeadingZeros(materialExtId, addingZeros)
                }
                if (materialExtId?.length >= 18) {
                    material.externalId = materialExtId
                    await materialUpdate(material)
                }
                console.log(`after Material Extid ${materialExtId} and len ${materialExtId?.length}`)
            } else {
                console.log(`Material External Id Not Found for ${material?.name}`)
            }

            // break
        }

    } catch (e) {
        console.log(`caught Error ${e.message}`)
    }
}
main()