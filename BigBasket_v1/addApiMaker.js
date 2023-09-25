const fs = require("fs");
const requestPromise = require("request-promise");
const _ = require('lodash');
const fsPromises = require('fs').promises;
async function add_des(payload) {
    try {
        var res = await requestPromise({
            url: "http://apis.fretron.com/automate/rule/description",
            method: "PUT",
            body: payload,
            'json': true
        })
        return res.status == 200 ? "Description updated successfully" : res.error
    }
    catch (err) {
        console.log("error executing while adding description on api maker" + err.message);
    }
}
var dirName = "./automation"
async function main() {
    var data = []
    var apiMaker = await fs.promises.opendir(dirName)
    for await (folder of apiMaker) {
        if (folder.isDirectory()) {
            var folder1 = await fs.promises.opendir(`${dirName}/${folder.name}`)
            for await (val of folder1) {
                var folder2 = await fs.promises.opendir(`${dirName}/${folder.name}/${val.name}`)
                for await (val2 of folder2) {
                    if (val2.name == "description.txt") {
                        var descFile = fs.readFileSync(`${dirName}/${folder.name}/${val.name}/${val2.name}`, 'utf-8')
                    }
                    if (val2.name == "data.json") {
                        var dataFile = fs.readFileSync(`${dirName}/${folder.name}/${val.name}/${val2.name}`, 'utf-8')
                        dataFile = JSON.parse(dataFile)
                        var uuid = dataFile.uuid
                        var name = dataFile.name
                    }
                    var payload = {
                        "uuid": uuid,
                        "description": descFile
                    }
                }
                data.push(payload)
            }
        }
    }
    fs.writeFileSync("dataAutomation", JSON.stringify(data), 'utf-8')
    var readData = JSON.parse(fs.readFileSync("dataAutomation", "utf8"))
    for (var i = 0; i < readData.length; i++) {
        console.log(readData[i])
        if (!readData[i].description) {
            readData[i].description = 'Some Description'
        }
        // let result = await add_des(readData[i])
        // console.log(result)
        // break
    }
}
main()