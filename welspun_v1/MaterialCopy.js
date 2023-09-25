const rp = require("request-promise")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"

const Wel_Token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTM1NDc5NTMsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNmY4MGVmZjUtZmFkMS00ZmJmLTk3NmItYjViZmI1OTVkNDU0IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.c6uiK1f9NLPrhGHCaUFHihCx0ECTZbgavrKNOSdFq9I"
const WelDemo_Token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTIyNzM0NTQsInVzZXJJZCI6ImJvdHVzZXItLTQzNjA2MzE2LTc0Y2EtNDRkZC1iOWYyLTQzYTlmYzMxNTlkYiIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTQzNjA2MzE2LTc0Y2EtNDRkZC1iOWYyLTQzYTlmYzMxNTlkYiIsIm9yZ0lkIjoiMGE1MzM0NDUtMWI5OS00MmY5LTliMmYtZDYyMWRlZTUxMjllIiwibmFtZSI6InN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.h3zePhYxFJsPjj1BTbcVEoirfNmYGrCS5Megg-S8cHY"

async function getMaterials() {
    try {
        let url = `https://apis.fretron.com/shipment-view/materials/materials?&filters={"type":["Material"]}`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: Wel_Token
            }
        })
        return res?.length ? res : []

    } catch (e) {
        console.log(`Caught Error getting Materials ${e.message}`)
    }
}

async function createMaterial(payload) {
    try {
        let url = `https://apis.fretron.com/materials/v1/material/v2`
        let res = await rp({
            uri: url,
            method: "POST",
            body: payload,
            json: true,
            headers: {
                authorization: WelDemo_Token
            }
        })

        console.log(`Created Materila Res Status ${res.status}`)
        if (res?.status != 200) {
            console.log(`Error create Material ${res.error}`)
        }
    } catch (e) {
        console.log(`Caught Error creating material ${e.message}`)
    }
}

async function main() {
    try {
        let materials = await getMaterials()
        console.log(materials?.length)
        for (let material of materials) {
            delete material["updates"]
            delete material["orgId"]
            delete material["uuid"]
            delete material["materialGroupId"]
            let payload = material
            console.log(payload)
            await createMaterial(payload)
            // break
        }
    } catch (e) {
        console.log(`Caught Error Main ${e.message}`)
    }
}
main()

async function deleteMaterial(id) {
    try {
        let url = `https://apis.fretron.com/materials/v1/material/${id}`
        let res = await rp({
            uri: url,
            method: "DELETE",
            json: true,
            headers: {
                authorization: WelDemo_Token
            }
        })
        if (res?.status == 200) {
            console.log(`Material Deleted successfully ${id}`)
        } else {
            console.log(`error material Deletion ${JSON.stringify(res)}`)
        }
    } catch (e) {
        console.log(`Caught Error Delete Material ${e.message}`)
    }
}
async function deleteMaterial_main() {
    try {
        let welDemoMat = await getMaterials()
        console.log(welDemoMat?.length)
        for (let material of welDemoMat) {
            let matId = material?.uuid
            await deleteMaterial(matId)
        }
    } catch (e) {
        console.log(`Caught Error Delete Material ${e.message}`)
    }
}
// deleteMaterial_main()