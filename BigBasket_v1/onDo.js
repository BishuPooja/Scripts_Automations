const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Nzg4NjAxMDYsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiI4MjM5NDdhMy0wMmMwLTRlNjUtOGY0ZS0yMWRhMzcwZWE2Y2QiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.k01oFuZgGr8xmVU2ly4JeTR4LD6lbcODtbZ94LGKXYQ"
const rp = require("request-promise")

const mapOnId = {
    "100dd30b-0b40-4dd9-9187-c30692f5c322": [
        "8372888011",
        "7004389003",
        "8451013526",
        "6207674317",
        "9955387119",
        "9570268917",
        "7980545079",
        "7739763063"
    ],
    "33bc97d8-2daf-43a3-965c-152612791b25": [
        "8809326235",
        "9931937947",
        "8709743847",
    ],
    "7f90598f-10c9-440a-85f3-9ebaa167ae89": [
        "7004709742",
        "7004614217",
        "9334394983",
    ],
    "87f7209a-f92f-4552-a0b7-3eef7cd09662": [
        "7781000902",
        "7781000903",
        "7781000905",
        "7781000906",
        "7781000908",
        "9523640552",
    ],
    "5cd427ce-8dd6-4003-b518-54f78e998793": [
        "8797753222",
        "7683024648",
        "8797797111",
        "8797797333",
        "8797797444",
        "9771431097",
    ],
    "42051ae1-0e09-4b94-a7ea-5d779ebbe7cc": ["8252556460"],
    "d4460c97-f6b6-414d-8fd8-a697c487afb4": ["7766826745"],
    "9be9ea50-0867-4bd3-9bf0-a7fe9199423a": [
        "7909017706",
        "9523913940",
        "7266019380",
        "8271217170",
        "6203687500",
        "9905656496",
        "9350930701"
    ],
    "19493be1-3409-4b53-834c-9675528c9497": [
        "9199432093",
        "9110999250"
    ]
};

const mapOnName = {
    "KATARIA": [
        "8372888011",
        "7004389003",
        "8451013526",
        "6207674317",
        "9955387119",
        "9570268917",
        "7980545079",
        "7739763063"
    ],
    "RV LOG": ["8809326235", "9931937947", "8709743847"],
    "ZINKA": ["7004709742", "7004614217", "9334394983"],
    "JTC": [
        "7781000902",
        "7781000903",
        "7781000905",
        "7781000906",
        "7781000908",
        "9523640552",
    ],
    "CJDARCL": [
        "8797753222",
        "7683024648",
        "8797797111",
        "8797797333",
        "8797797444",
        "9771431097",
    ],
    "OBC": ["7766826745"],
    "A-ONE LOGISTICS (PT)": ["8252556460"],
    "SHIVA": [
        "7909017706",
        "9523913940",
        "7266019380",
        "8271217170",
        "6203687500",
        "9905656496",
        "9350930701",
        "7717758918"
    ],
    "SINGH ENT": [
        "9199432093",
        "9110999250",
    ]
};


let mobileNo1 = ["9304516177", "7079291199"]
let transportationNames2 = ["DASHMESH"]
let mobileNo2 = ["8936805014"]
let transporterName3 = ["EFC LOGISTICS"]
let mobileNo3 = ["8294161703"]

async function gettransporter(name) {
    let res = await rp({
        url: "https://apis.fretron.com/shipment-view/bpartners/partners?size=50&from=0&filters=%7B%22type%22%3A%5B%5D%2C%22isPortalEnabled%22%3A%5B%5D%2C%22group%22%3A%5B%5D%2C%22city%22%3A%5B%5D%2C%22status%22%3A%5B%5D%2C%22verificationStatus%22%3A%5B%5D%2C%22_customeField%22%3Anull%7D&search=" + name,
        method: "get",
        json: true,
        headers: {
            authorization: token
        }

    })

    return res
}

async function main() {
    let transporterNames1 = ["DASHMESH"]
    let mobileNo1 = ["8936805014"]

    let mapOnId = {
        "100dd30b-0b40-4dd9-9187-c30692f5c322": [
            "8372888011",
            "7004389003",
            "8451013526",
            "6207674317",
            "9955387119",
            "9570268917",
            "7980545079",
            "7739763063"
        ],
        "33bc97d8-2daf-43a3-965c-152612791b25": [
            "8809326235",
            "9931937947",
            "8709743847",
        ],
        "7f90598f-10c9-440a-85f3-9ebaa167ae89": [
            "7004709742",
            "7004614217",
            "9334394983",
        ],
        "87f7209a-f92f-4552-a0b7-3eef7cd09662": [
            "7781000902",
            "7781000903",
            "7781000905",
            "7781000906",
            "7781000908",
            "9523640552",
        ],
        "5cd427ce-8dd6-4003-b518-54f78e998793": [
            "8797753222",
            "7683024648",
            "8797797111",
            "8797797333",
            "8797797444",
            "9771431097",
        ],
        "42051ae1-0e09-4b94-a7ea-5d779ebbe7cc": ["8252556460"],
        "d4460c97-f6b6-414d-8fd8-a697c487afb4": ["7766826745"],
        "9be9ea50-0867-4bd3-9bf0-a7fe9199423a": [
            "7909017706",
            "9523913940",
            "7266019380",
            "8271217170",
            "6203687500",
            "9905656496",
            "9350930701"
        ],
        "19493be1-3409-4b53-834c-9675528c9497": [
            "9199432093",
            "9110999250"
        ]
    };

    let mapOnName = {
        "KATARIA": [
            "8372888011",
            "7004389003",
            "8451013526",
            "6207674317",
            "9955387119",
            "9570268917",
            "7980545079",
            "7739763063"
        ],
        "RV LOG": ["8809326235", "9931937947", "8709743847"],
        "ZINKA": ["7004709742", "7004614217", "9334394983"],
        "JTC": [
            "7781000902",
            "7781000903",
            "7781000905",
            "7781000906",
            "7781000908",
            "9523640552",
        ],
        "CJDARCL": [
            "8797753222",
            "7683024648",
            "8797797111",
            "8797797333",
            "8797797444",
            "9771431097",
        ],
        "OBC": ["7766826745"],
        "A-ONE LOGISTICS (PT)": ["8252556460"],
        "SHIVA": [
            "7909017706",
            "9523913940",
            "7266019380",
            "8271217170",
            "6203687500",
            "9905656496",
            "9350930701",
            "7717758918"
        ],
        "SINGH ENT": [
            "9199432093",
            "9110999250",
        ]
    };

    for (item of transporterNames1) {
        let restransporter = await gettransporter(item)
        let id = restransporter[0].uuid
        let name = restransporter[0].name
        console.log(id, name);
        // mapOnId[id] = mobileNo1
        // mapOnName[name] = mobileNo1

    }
    // console.log(JSON.stringify(mapOnId));
    // console.log(JSON.stringify(mapOnName))
}


main()