const fs = require("fs");
const rp = require("request-promise")
const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzY5NjE4NTcsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiJkMjU1YTAwMC1mMjcxLTQ4OWUtOTQwOC1iOWZiN2Q1OTJiNDQiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.W_O6ou0uVYuoFFb8dpPRBYce7Y4wfbO2D9ihJeOHSL0"


async function issueGet() {
    var res = await rp({
        url: "https://apis.fretron.com/shipment-view/issues/issues?filters=%7B%22issueType.keyword%22%3A%5B%22SPD%20Vehicle%20Requirement%22%2C%22MINT%20Vehicle%20Requirement%22%5D%2C%22tags.keyword%22%3A%5B%5D%2C%22status.keyword%22%3A%5B%5D%2C%22escalationLevel.keyword%22%3A%5B%5D%2C%22escalationName.keyword%22%3A%5B%5D%2C%22escalationPerson.email.keyword%22%3A%5B%5D%2C%22userFollowers.email.keyword%22%3A%5B%5D%2C%22assignee.email.keyword%22%3A%5B%5D%2C%22reporter.email.keyword%22%3A%5B%5D%2C%22createdAt%22%3A%7B%22from%22%3A1667241004000%2C%22till%22%3A1676399404000%7D%2C%22resourceType.keyword%22%3A%5B%5D%2C%22priority.keyword%22%3A%5B%5D%7D&sortBy=%7B%22createdAt%22%3A%22desc%22%7D",
        method: "GET",
        'json': true,
        headers: {
            authorization: token
        }
    })
    return res
}


async function produceNullForIssueId(payload) {
    try {
        var res = await rp({
            url: "http://apis.fretron.com/issue/v1/admin/bulk/forward/null",
            method: "POST",
            'json': true,
            body: payload
        })
        return res
    }
    catch (e) {
        console.log(e.message);
    }

}


async function main() {
    let response = await issueGet()
    let id = []
    let issues = []
    for (var item of response) {
        id.push(item.uuid)
        let issueObj = {}
        issueObj["id"] = item.uuid
        issueObj["issueNumber"] = item.issueNo

        issues.push(issueObj)
    }
    fs.writeFileSync("IssueNullProduceData.json", JSON.stringify(issues))
    let readData = fs.readFileSync("IssueNullProduceData.json", "utf8")
    readData = JSON.parse(readData)

    console.log(readData.length);
    // await produceNullForIssueId(id)
}
main()