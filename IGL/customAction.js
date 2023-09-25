const { log } = require("console")
const rp = require("request-promise")
const TOKEN = ""


async function sendEpodReport(payload) {
    try {
        let url = `http://34.93.148.238:8081/igl/reports/outbound/e-pod/email`
        let res = await rp({
            uri: url,
            method: "POST",
            body: payload,
            json: true,
            headers: {
                authorization: TOKEN
            }
        })
        return res
    } catch (e) {
        console.log(`Caught Error Sending Epod Report From Integration ${e.message}`)
    }
}
async function main() {
    try {
        let to = []
        let cc = []
        let payload = {
            from: Date.now() - 24 * 60 * 60 * 1000,
            till: Date.now(),
            to: "pooja.bishu@fretron.com",
            cc: ""
        }
        console.log(payload);


    } catch (e) {
        console.log(`Caught Error In main ${e.message}`)
    }
}
main()
