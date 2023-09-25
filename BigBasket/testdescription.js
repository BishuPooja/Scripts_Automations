const rp = require("request-promise")
const fs = require("fs")
const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzUxNjQ5MjYsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiI0OTViODcyOC1jNzYxLTRmYTctODNmZS1kYjc1YTdkNjMyMjEiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.OiBxXrHSnzbDO5HoVe96SKHL4oVnfSc86gbq-Q1B5BI"

async function apimaker_des(payload) {
    var res = await rp({
        url: "https://apis.fretron.com/automate/autoapi",
        json: true,
        method: "PUT",
        body: payload,
        headers: {
            Authorization: token
        }
    })
    return res
}
async function getApiMaker() {
    var res = await rp({
        url: "https://apis.fretron.com/automate/autoapis",
        json: true,
        method: "GET",
        headers: {
            Authorization: token
        }
    })
    return res
}
async function getAutomation() {
    var res = await rp({
        url: " https://apis.fretron.com/automate/rules",
        json: true,
        method: "GET",
        headers: {
            Authorization: token
        }
    })
    return res

}
async function mainForApiMaker() {
    var resApiMaker = await getApiMaker()
    console.log("apimaker", resApiMaker.length);
    for (var item of resApiMaker) {
        var api_maker_name = "api_maker_demo"
        var folderOrg = api_maker_name + "/" + item.orgId;
        var folderApi = `${folderOrg}/` + item.uuid
        var fileData = folderApi + `/` + `data.json`
        var scriptFile = folderApi + `/` + `script.js`
        var description = folderApi + `/` + `description.txt`
        var apiInfo = {
            name: item.name,
            orgId: item.orgId,
            uuid: item.uuid,
        }
        var scriptInfo = item.script
        // console.log(item.name);
        try {
            if (!fs.existsSync(api_maker_name)) {
                fs.mkdirSync(api_maker_name);
            }
            if (!fs.existsSync(folderOrg)) {
                fs.mkdirSync(folderOrg);
            }

            if (!fs.existsSync(folderApi)) {
                fs.mkdirSync(folderApi)
            }
            if (!fs.existsSync(fileData)) {
                fs.writeFileSync(fileData, JSON.stringify(apiInfo))
            }
            if (!fs.existsSync(scriptFile)) {
                fs.writeFileSync(scriptFile, scriptInfo)
            }
            if (!fs.existsSync(description)) {
                fs.writeFileSync(description, JSON.stringify("description"))
            }

        } catch (e) {
            console.log(e.message)
        }
        break
    }
}
// mainForApiMaker()

async function mainForAutomation() {
    var resAutomation = await getAutomation()
    console.log("automation", resAutomation.length);
    for (var item of resAutomation) {
        // console.log(item)
        var automation = "automation"
        var folderOrg = automation + "/" + item.orgId;
        var folderAutomation = `${folderOrg}/` + item.uuid
        var fileData = folderAutomation + `/` + `data.json`
        var scriptFile = folderAutomation + `/` + `script.js`
        var description = folderAutomation + `/` + `description.txt`
        var automationInfo = {
            name: item.displayEventsName[0],
            orgId: item.orgId,
            uuid: item.uuid,
        }
        var scriptInfo = item.actions[0].script
        // console.log(scriptInfo);
        try {
            if (!fs.existsSync(automation)) {
                fs.mkdirSync(automation);
            }
            if (!fs.existsSync(folderOrg)) {
                fs.mkdirSync(folderOrg);
            }

            if (!fs.existsSync(folderAutomation)) {
                fs.mkdirSync(folderAutomation)
            }
            if (!fs.existsSync(fileData)) {
                fs.writeFileSync(fileData, JSON.stringify(automationInfo))
                console.log("file data: " + JSON.stringify(automationInfo));
            }
            if (!fs.existsSync(scriptFile)) {
                fs.writeFileSync(scriptFile, scriptInfo)
                console.log("script file created successfully");
            }
            if (!fs.existsSync(description)) {
                fs.writeFileSync(description, JSON.stringify("description"))
                console.log("description");
            }

        } catch (e) {
            console.log(e.message)
        }
    }

}
// mainForAutomation()
async function main() {
    try {
        var uuid = "253e377e-cc73-48c8-95d6-2d0bb8b35f70"
        var payload = {
            "name": "test tpi",
            "description": "test description",
            "uuid": uuid
        }
        // var res = await apimaker_des(payload)
        // console.log(res);

    }
    catch (e) {
        console.log(e.message);
    }

}
main()