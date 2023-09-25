const rp = require("request-promise")
const _ = require("lodash")
const moment = require("moment")
const XLSX = require("xlsx-js-style")
const fs = require("fs")
// const logger = require("../logger")





const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Nzc2NzYzMTAsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiM2U0Y2RlZTktMGIzYi00NmRkLTliOTgtZGYwZTM4YTAyNzFjIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.JGyYvE1ULmcqOwpbUkEzELlF3wkPWFKrQ6hG2KPHiXw";

async function main(originHub, state, from, till) {
    try {
        const freightPrices = await getFreightPricing(originHub, token)
        console.log({ freightPrices: freightPrices.length })

        const originHubMaster = await getHubByName(originHub, token)

        const stateHubs = state ? await getHubsByState(state, token) : []

        const jsonArr = _createJsonArrAndFilter(freightPrices, from, till)
        // console.log(`jsonAoaArr: ${JSON.stringify(jsonArr)}`)

        const jsonAoaArr = _toFile_createJsonAoaArr(jsonArr, stateHubs)
        // console.log(`jsonAoaArr: ${JSON.stringify(jsonAoaArr)}`)

        const aoa = _toFile_createArrayOfArray(jsonAoaArr, originHubMaster, stateHubs)
        console.log(aoa)

        let buff = aoa2XlsxBuffer(aoa, originHub, state, from, till)

        const workbook = XLSX.read(buff, { type: 'buffer' });

        XLSX.writeFile(workbook, 'output.xlsx');

        console.log('Conversion completed. XLSX file created.');



        return buff
    } catch (error) {
        console.log(`Error : ${error.message}`);
        throw error
    }
}

async function getFreightPricing(originHub, token) {
    let filters = [
        { key: "originHub", values: [originHub] },
        {
            key: "_cf_fixed_ApprovedWeight",
            values: ["09MT", "15MT", "20MT", "24MT"],
        },
    ]
    filters = JSON.stringify(filters)

    let offset = 0
    const limit = 500
    try {

        let freightPrices = []

        const options = {
            uri: "",
            headers: {
                Authorization: token,
            },
            json: true,
        }
        let res;

        do {
            options.uri = `https://apis.fretron.com/freight-pricing/v1/price/conditions?limit=${limit}&offset=${offset}&freightId=d4dcbe17-01b3-4e06-a5b8-925b1a5693d3&filters=${filters}`
            res = await rp(options)
            if (res.error) throw new Error(res.error)
            freightPrices = [...freightPrices, ...res.data]
            offset++;
        } while (res.data.length == limit)

        return freightPrices

    } catch (error) {
        console.log(`Get freright pricing catched Error : ${error.message}`)
        return null
    }
}

async function getHubsByState(state, token) {
    try {
        const filters = JSON.stringify({ "state.keyword": [state] })
        const url = `https://apis.fretron.com/shipment-view/places/page/hubs?filters=${filters}&size=1000`
        const res = await rp({
            uri: url,
            headers: {
                Authorization: token,
            },
            json: true,
        })
        return res
    } catch (e) {
        console.log(
            `Get hubs by state Error : ${e.message} for state name : ${state}`,
        )
        return null
    }
}

async function getHubByName(hubName, token) {
    try {
        const url = "http://apis.fretron.com/hubs/v1/search/hubs?name=" + hubName
        const res = await rp({
            uri: url,
            headers: {
                Authorization: token,
            },
            json: true,
        })
        if (res.status == 200) {
            return res.data?.[0]
        } else {
            console.log(
                `Get Hub by name Error : ${res.error} for hub name : ${hubName}`,
            )
            return null
        }
    } catch (e) {
        console.log(
            `Get Hub by name Error : ${e.message} for hub name : ${hubName}`,
        )
        return null
    }
}

function calculateDistance(center1, center2) {
    function distance(lat1, lon1, lat2, lon2) {
        const R = 6371 // Earth's radius in km
        const dLat = deg2rad(lat2 - lat1)
        const dLon = deg2rad(lon2 - lon1)
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = R * c // distance in km
        return distance
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    if (!center1 || !center2) return 0

    const { latitude: lat1, longitude: lon1 } = center1
    const { latitude: lat2, longitude: lon2 } = center2

    let totalKm = Number(1.2 * distance(lat1, lon1, lat2, lon2))

    return Number(totalKm.toFixed(2))
}

function _createJsonArrAndFilter(data, from, till) {
    const reqJsonArr = _createReqJsonArr(data)
    if (!from) return reqJsonArr
    let result = reqJsonArr.filter((e) => e.from <= from && e.till >= till)
    return result
}

function _createReqJsonArr(data) {
    const ORIGIN_HUB_UUID = "4f0eeb0c-07ca-4707-9ecd-46fab3e5931f"
    const DES_HUB_UUID = "0b2613b2-1ecd-4ce7-b6f4-6833aafee35d"
    const APP_WT_UUID = "17d3c99b-8bc3-42ff-8708-06ff5264e897" // approve wt uuid
    const MIN_AMT_UUID = "88b9e774-b498-49c0-b956-51116aa7dcf0"
    const MAX_AMT_UUID = "511cdf96-ba64-4337-9d4b-f6caa9973c02"
    const DISTANCE_UUID = "6dff38dc-cc01-412f-b8ac-010068d208e2"

    let reqJsonArr = []

    for (let obj of data) {
        reqJsonArr.push({
            origin: obj.conditionValues.find((e) => e.uuid == ORIGIN_HUB_UUID)
                .value[0],
            destination: obj.conditionValues.find((e) => e.uuid == DES_HUB_UUID)
                .value[0],
            from: obj.fixedRanges[0].min,
            till: obj.fixedRanges[0].max,
            approvedWeight: obj.conditionValues.find((e) => e.uuid == APP_WT_UUID)
                .value[0],
            maxCharge: obj.chargeTypes.find((e) => e.uuid == MAX_AMT_UUID).amount,
            minCharge: obj.chargeTypes.find((e) => e.uuid == MIN_AMT_UUID).amount,
            distance: obj.chargeTypes.find((e) => e.uuid == DISTANCE_UUID)?.amount,
        })
    }
    return reqJsonArr
}

function _toFile_createJsonAoaArr(reqJsonArr, hubs) {
    const approvedWeights = ["09MT", "15MT", "20MT", "24MT"]

    let jsonAoaArr = []

    const destinationWiseJsonArr = _.groupBy(reqJsonArr, "destination")

    for (let key in destinationWiseJsonArr) {
        if (!hubs.find((h) => h.name == key)) continue
        const jsonArr = destinationWiseJsonArr[key]

        const jsonAoa = {
            origin: reqJsonArr[0].origin,
            destination: key,
            validFrom: moment(destinationWiseJsonArr[key][0].from).format("DD-MM-yyyy"),
            validTill: moment(destinationWiseJsonArr[key][0].till).format("DD-MM-yyyy"),
            distance: jsonArr[0].distance,
            approvedWeights: [],
            maxCharges: [],
            minCharges: [],
        }
        approvedWeights.forEach((w) => {
            let obj = jsonArr.find((e) => e.approvedWeight == w)
            jsonAoa.approvedWeights.push(w)
            jsonAoa.maxCharges.push(obj?.maxCharge ?? 0)
            jsonAoa.minCharges.push(obj?.minCharge ?? 0)
        })

        jsonAoaArr.push(jsonAoa)
    }

    return jsonAoaArr
}

function _toFile_createArrayOfArray(jsonAoaArr, originHubMaster, hubs) {
    const approvedWeightsValues = [9, 15, 20, 24]

    let aoa = []

    for (let i in jsonAoaArr) {
        let arr = []
        const jsonAoa = jsonAoaArr[i]

        const destinationHubMaster = hubs.find((h) => h.name == jsonAoa.destination)

        const sNo = Number(i) + 1
        const destinationTown = destinationHubMaster.name
        const district = destinationHubMaster.district
        const validFrom = jsonAoaArr[i].validFrom
        const validTill = jsonAoaArr[i].validTill
        // console.log(validFrom, validTill)
        const distance = jsonAoa.distance != null ? jsonAoa.distance : calculateDistance(originHubMaster.center, destinationHubMaster.center)

        arr = [sNo, destinationTown, district, validFrom, validTill, distance.toFixed(2)]

        jsonAoa.approvedWeights.forEach((v, i) => {
            let approvedWeight = (approvedWeightsValues[i] * distance)

            if (jsonAoa.minCharges[i]) {
                arr.push(jsonAoa.minCharges[i])
                arr.push(approvedWeight ? (jsonAoa.minCharges[i] / (approvedWeightsValues[i] * distance)).toFixed(2) : 0)


            } else {
                arr.push(...["", ""])
            }
        })
        arr.push(...["", "", ""])

        aoa.push(arr)
    }
    console.log(aoa)
    return aoa
}

function _updateHeadersArr(headersArr, dispatchCenter, state, from, till) {
    const border = {
        top: {
            style: "thin",
            color: "0000",
        },
        bottom: {
            style: "thin",
            color: "0000",
        },
        left: {
            style: "thin",
            color: "0000",
        },
        right: {
            style: "thin",
            color: "0000",
        },
    }

    headersArr = headersArr.map((arr, I) => {
        return arr.map((e, i) => {
            if (i == 0) return e
            return {
                v: e,
                t: "s",
                s: {
                    alignment: {
                        vertical: "center",
                        horizontal: "center",
                        wrapText: I != 0
                    },
                    font: { bold: true, sz: 11 },
                    border,
                },
            }
        })
    })

    headersArr = [
        [
            "",
            "",
            {
                v: "Dispatch Center",
                t: "s",
                s: {
                    alignment: {
                        vertical: "center",
                        horizontal: "right",
                    },
                    font: { bold: true, sz: 14 },
                },
            },
            {
                v: dispatchCenter,
                t: "s",
                s: {
                    alignment: {
                        vertical: "center",
                        horizontal: "left",
                    },
                    font: { sz: 14 },
                },
            }
        ],
        [
            "",
            "",
            {
                v: "W.E.F.",
                t: "s",
                s: {
                    alignment: {
                        vertical: "center",
                        horizontal: "right",
                    },
                    font: { bold: true, sz: 14 },
                },
            },
            {
                v: from ? moment(new Date(from)).format("DD-MM-YYYY") : "",
                t: "s",
                s: {
                    alignment: {
                        vertical: "center",
                        horizontal: "center",
                    },
                    font: { sz: 14 },
                },
            },
            {
                v: "TO",
                t: "s",
                s: {
                    alignment: {
                        vertical: "center",
                        horizontal: "center",
                    },
                    font: { bold: true, sz: 14 },
                },
            },
            {
                v: till ? moment(new Date(till)).format("DD-MM-YYYY") : "",
                t: "s",
                s: {
                    alignment: {
                        vertical: "center",
                        horizontal: "center",
                    },
                    font: { sz: 14 },
                },
            },

        ],
        [
            "",
            "",
            {
                v: "State",
                t: "s",
                s: {
                    alignment: {
                        vertical: "center",
                        horizontal: "right",
                    },
                    font: { bold: true, sz: 14 },
                },
            },
            {
                v: state,
                t: "s",
                s: {
                    alignment: {
                        vertical: "center",
                        horizontal: "left",
                    },
                    font: { sz: 14 },
                },
            }
        ],
        ...headersArr
    ]

    return headersArr
}

function aoa2XlsxBuffer(arrOfArr, dispatchCenter, state, from, till) {
    const border = {
        top: {
            style: "thin",
            color: "0000",
        },
        bottom: {
            style: "thin",
            color: "0000",
        },
        left: {
            style: "thin",
            color: "0000",
        },
        right: {
            style: "thin",
            color: "0000",
        },
    }
    let headersArr = [
        [
            "",
            "S.NO",
            "Destination Town",
            "Distric",
            "Valid From",
            "Valid Till",
            "Dispatch Center To Destination Town (KM)",
            "Approved Freight Rates",
            "",
            "Approved Freight Rates",
            "",
            "Approved Freight Rates",
            "",
            "Approved Freight Rates",
            "",
            "Prepared By",
            "Checked By",
            "Approved By",
        ],
        [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "Rate Per 9 MT",
            "Rate Per Ton Per KM",
            "Rate Per 15 MT",
            "Rate Per Ton Per KM",
            "Rate Per 20 MT",
            "Rate Per Ton Per KM",
            "Rate Per 24 MT",
            "Rate Per Ton Per KM",
            "",
            "",
            "",
        ],
    ]

    headersArr = _updateHeadersArr(headersArr, dispatchCenter, state, from, till)

    arrOfArr = arrOfArr.map((arr) => {
        return arr.map((e) => {
            return {
                v: e,
                t: "s",
                s: {
                    alignment: {
                        vertical: "center",
                        horizontal: "center",
                    },
                    // font: { bold: true, sz: 11 },
                    border,
                },
            }
        })
    })

    for (let i in arrOfArr) arrOfArr[i] = ["", ...arrOfArr[i]]

    const aoa = [...headersArr, ...arrOfArr]
    const wb = XLSX.utils.book_new()

    const ws = XLSX.utils.aoa_to_sheet(aoa)
    const merge = [
        { s: { r: 3, c: 1 }, e: { r: 4, c: 1 } },
        { s: { r: 3, c: 2 }, e: { r: 4, c: 2 } },
        { s: { r: 3, c: 3 }, e: { r: 4, c: 3 } },
        { s: { r: 3, c: 4 }, e: { r: 4, c: 4 } },
        { s: { r: 3, c: 5 }, e: { r: 4, c: 5 } },
        { s: { r: 3, c: 6 }, e: { r: 4, c: 6 } },
        { s: { r: 3, c: 7 }, e: { r: 3, c: 8 } },
        { s: { r: 3, c: 9 }, e: { r: 3, c: 10 } },
        { s: { r: 3, c: 11 }, e: { r: 3, c: 12 } },
        { s: { r: 3, c: 13 }, e: { r: 3, c: 14 } },
        { s: { r: 3, c: 15 }, e: { r: 4, c: 15 } },
        { s: { r: 3, c: 16 }, e: { r: 4, c: 16 } },
        { s: { r: 3, c: 17 }, e: { r: 4, c: 17 } }
    ];

    ws["!merges"] = merge

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1")

    let buf = XLSX.write(wb, { type: 'buffer', bookType: "xlsx" });
    return buf
}

// module.exports = {
//   freight_rate_approval_report: main
// }

main("OKHLA", "DELHI", 1685580047000, 1687480847000)