const { log } = require("console");
const { off } = require("process");
const fs = require("fs");
const rp = require("request-promise")
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODM3MDM4OTgsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiIzZTRjZGVlOS0wYjNiLTQ2ZGQtOWI5OC1kZjBlMzhhMDI3MWMiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.3Ik8ahpWMYqyuooMIx77W6fqqQ72_U2-HzreF1l7xug"

const dbData = require("./fenaSurajpur.json")
const sheetJson = require("./JsonSurajpur.json")


async function getConditionRecords(limit, offset) {
    let res = await rp({
        url: `https://apis.fretron.com/freight-pricing/v1/price/conditions?limit=${limit}&offset=${offset}&freightId=d4dcbe17-01b3-4e06-a5b8-925b1a5693d3`,
        method: "GET",
        json: true,
        headers: {
            authorization: token
        }
    })
    // console.log(res)
    if (res.status == 200) {
        return res.data
    } else {
        return null
    }
}

async function deleteSurajPurData(uuid) {
    let res = await rp({
        url: `https://apis.fretron.com/freight-pricing/v1/condition/${uuid}`,
        method: "DELETE",
        json: true,
        headers: {
            authorization: token
        }
    })
    if (res.status == 200) {
        return res.data
    } else {
        return null
    }
}

async function main() {

    let limit = 100
    let offset = 0
    let response = await getConditionRecords(limit, offset)
    let records = response


    while (response.length) {
        offset += 1
        response = await getConditionRecords(limit, offset);
        records = [...records, ...response];

    }
    console.log(`total records --->${records.length}`)

    // let foundRes = records.filter((v) => {
    //     let found = v.fixedRanges.find(it => it.min == "1680287400000" && it.max == "1711866540000")
    //     if (found) {
    //         return true
    //     }
    // })
    let foundRes1 = records.filter(_ => _.fixedRanges.find(it => it.min == "1680287400000" && it.max == "1711866540000"))

    console.log("Found Res : " + foundRes1.length)
    // fs.writeFileSync("surajpur.json", JSON.stringify(foundRes))


    // let readData = JSON.parse(fs.readFileSync("surajpur.json", "utf8"))
    // console.log(`readData.length  = ${readData.length}`)
    // let count = 0
    // let deletedCount = 0
    // let errorIndeleteingRecords = []
    // for (let item of readData) {
    //     count += 1
    //     console.log(`Process Start:  ${count}`)
    //     let uuid = item.uuid
    //     let deletedDataRes = await deleteSurajPurData(uuid)
    //     if (deletedDataRes && deletedDataRes == uuid) {
    //         deletedCount += 1
    //     }else{
    //         errorIndeleteingRecords.push(uuid)
    //     }
    // }


    // console.log(`deletedCount ----->${deletedCount}`)
    // console.log(`count ---->${count}`)
    // console.log(`Error In Deleted Record ---->${JSON.stringify(errorIndeleteingRecords)}`)
}

// main()
async function main1() {
    // let limit = 100
    // let offset = 0
    // let response = await getConditionRecords(limit, offset)
    // let records = response


    // while (response.length) {
    //     offset += 1
    //     response = await getConditionRecords(limit, offset);
    //     records = [...records, ...response];

    // }
    // console.log(`total records --->${records.length}`)


    // let foundRes1 = records.filter(_ => _.fixedRanges.find(it => it.min == "1680287400000"))

    // console.log("Found Res : " + foundRes1.length)
    // fs.writeFileSync("fenaSurajpur.txt", JSON.stringify(foundRes1))
    let readData = JSON.parse(fs.readFileSync("fenaSurajpur.txt", "utf-8"))
    console.log(readData.length)

}

// main1()


async function updatePriceTable(payload) {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/freight-pricing/v1/price/condition`,
            method: "PUT",
            json: true,
            body: payload,
            headers: {
                authorization: TOKEN
            }
        })
        if (res.status == 200) {
            return data
        }
        else {
            return null
        }
    }
    catch (e) {
        console.log(`Failed to update price table ${e.message}`)
    }


}

