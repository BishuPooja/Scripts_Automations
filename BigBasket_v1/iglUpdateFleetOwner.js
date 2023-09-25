const rp = require("request-promise")
const token = ""

async function getShByshNo() {
    try {

        let res = await rp({
            uri: ``,
            method: "GET",
            json: true,
            headers: {
                authorization: token
            }
        })
    }
    catch (E) {
        console.log(`getShByshNo catch error ${E.message}`)
    }
}