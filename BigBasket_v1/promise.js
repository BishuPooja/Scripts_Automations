const { version } = require("moment")
const rp = require("request-promise")

async function p1() {

    let data = [{
        name: "pooja",
        address: "sirsa"
    }]
    // console.log(data)

    return data

}

function p2(result) {
    let dataUpdate = [{
        name: "leena",
        address: "Hisar"
    }]
    return dataUpdate
}

const myPromise = new Promise(function (resolve, reject) {
    let result = p1()
    if (result) {
        resolve(result)
    } else {
        reject("result is not ")
    }
})

myPromise().then((v) => {
    console.log(v)
}).catch((e) => console.log(e.message))