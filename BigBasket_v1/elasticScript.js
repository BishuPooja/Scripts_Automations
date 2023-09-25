const rp = require("request-promise")
const elasticData = require("./elasticsearch_mappings_v2.json")
async function createIndex(key) {
    try {
        let url = `http://122.180.251.100:2601/api/console/proxy?path=${key}&method=PUT`
        let res = await rp({
            uri: url,
            method: "POST",
            json: true,
            body: {},

        })
        return res
    } catch (e) {
        console.log(`error creating Index ${key} ${e.message}`)
    }
}

async function deleteIndex(key) {
    try {
        let url = `http://122.180.251.100:2601/api/console/proxy?path=${key}&method=DELETE`
        let res = await rp({
            uri: url,
            method: "POST",
            json: true,
            body: {},

        })
        return res
    } catch (e) {
        console.log(`error in deleting Index ${key} ${e.message}`)
    }
}

async function createMappings(type, mappings) {
    try {
        let url = ``
        if (type == "kafka_connect") {
            url = `http://122.180.251.100:2601/api/console/proxy?path=organisation/_mapping/kafka_connect?include_type_name=true&method=PUT`
        } else if (type == "kafka-connect") {
            url = `http://122.180.251.100:2601/api/console/proxy?path=organisation/_mapping/kafka-connect?include_type_name=true&method=PUT`
        } else if (type == "_doc") {
            url = `http://122.180.251.100:2601/api/console/proxy?path=organisation/_mapping/_doc?method=PUT`
        }
        let res = await rp({
            uri: url,
            method: "POST",
            json: true,
            body: mappings,

        })
        console.log(res)
        return res

    } catch (e) {
        console.log(`error creating Mappings ${type} ${e.message}`)
    }
}


async function main() {
    try {
        for (let key in elasticData) {
            if (key) {
                // let deleteIndexRes = await deleteIndex(key)
                let deleteIndexRes = {
                    "acknowledged": true
                }
                if (deleteIndexRes?.acknowledged == true) {
                    // let createIndexRes = await createIndex(key)
                    let createIndexRes = {
                        "acknowledged": true,
                        "shards_acknowledged": true,
                        "index": key
                    }
                    if (createIndexRes?.acknowledged == true && createIndexRes?.shards_acknowledged == true && createIndexRes?.index == `${key}`) {
                        let mappingsType = Object.keys(elasticData[key][key]["mappings"])
                        mappingsType.map((type) => {
                            console.log(`mappingsType ${type}`)
                            let mappingsValue = elasticData[key][key]["mappings"][type]
                            console.log(mappingsValue)
                            // await(type, mappingsValue)
                        })
                    }
                    else {
                        console.log(`createIndexRes ${createIndexRes}`)
                    }
                } else {
                    console.log(`deleteIndexRes ${deleteIndexRes}`)
                }
            }
            // break
        }
    } catch (e) {
        console.log(`error in main ${e.message}`)
    }
}

main()