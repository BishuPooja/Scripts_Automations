const Base_url = "https://apis.fretron.com"
const rp = require("request-promise")
const _ = require("lodash")
const { KeyObject } = require("crypto")
const XLSX = require('xlsx');
const fs = require("fs")

const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODc3NTg4MDEsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiI0NzJiM2M1MS1kOGU5LTQyOTQtOGE3Zi1hNjkwOTNiNTA1YjciLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.ea1URtCrJ8NpCfRyhim4FXPAYhtDXzfmUxFaCAfPqVI"

async function getShs(filters) {
    try {
        let url = `${Base_url}/shipment-view/shipments/v1?filters=${JSON.stringify(filters)}&size=3000`
        console.log(url)
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })
        return res.length ? res : []
    }
    catch (e) {
        console.log(`Error Executing While Getting Shipments ${e.message}`)
    }
    return []
}
function getLastMonthEpochDates() {
    var currentDate = new Date();
    var previousMonth = currentDate.getMonth() - 1;
    var year = currentDate.getFullYear();

    if (previousMonth < 0) {
        previousMonth = 11;
        year--;
    }

    var firstDayOfMonth = new Date(year, previousMonth, 1).getTime();
    var lastDayOfMonth = new Date(year, previousMonth + 1, 0).getTime();

    return {
        firstDay: firstDayOfMonth,
        lastDay: lastDayOfMonth + 8.28e+7 + 3.54e+6
    };
}

function getFromCf(cfs, key) {
    return cfs?.find(item => item.fieldKey === key);
}

function getTransporterWiseJSON(shs, index) {
    let transporterJson = {}
    for (let item of shs) {
        let destination = item.shipmentStages[item.shipmentStages.length - index]
        let transporterName = (item.fleetInfo?.fleetOwner?.name).trim()
        destination = destination.place?.name.trim()
        if (destination.toUpperCase() == ("VIJAY KUMAR JAISWAL-LAKHIMPUR KHERI").toUpperCase()) {
            destination = "LAKHIMPUR KHERI"
        }
        if (destination == "lucknow - Gorakhpur road ( Dummy)") {
            console.log(item.shipmentNumber)
            console.log(destination)
            continue
        }

        destination = destination?.split("-")[0]
        destination = destination.toUpperCase()
        // console.log(transporterName)
        if (transporterJson[transporterName] && transporterJson[transporterName][destination]) {
            transporterJson[transporterName][destination] += 1
        } else if (transporterJson[transporterName]) {
            transporterJson[transporterName][destination] = 1
        } else {
            transporterJson[transporterName] = {}
            transporterJson[transporterName][destination] = 1
        }

    }
    return transporterJson
}

function getTotalCount(obj) {
    let count = 0
    for (let item of Object.values(obj)) {
        let sum = _.sum(Object.values(item))
        count += sum
    }
    return count
}


function getJsonLocationWise(obj) {
    let results = [];

    let locations = new Set(Object.keys(obj).flatMap((company) => Object.keys(obj[company])));

    for (let location of locations) {
        let result = {
            location: location,
            total: 0
        };

        for (let company in obj) {
            let count = obj[company][location] || 0;
            result[company] = count;
            result.total += count;
        }

        results.push(result);
    }

    // console.log(results);
    return results

}

function jsonToxlsx(data, sheetName, outputFilePath) {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    XLSX.writeFile(workbook, outputFilePath);
    console.log(`Data converted and saved as ${outputFilePath}`);

}


async function main() {

    let from = getLastMonthEpochDates()?.firstDay
    let till = getLastMonthEpochDates()?.lastDay

    let filters = { "shipmentDate": { "isTillExpression": false, "isFromExpression": false, "from": from, "till": till }, "_shipmentStatus_": { "shipmentStatus": ["Completed"] }, "__version": 2, "_shcf_Type": ["Outbound"] }


    let shs = await getShs(filters)

    console.log(shs.length)
    if (shs?.length) {
        let marketVehicles = []
        let dedicatedVehicles = []
        let shareJson = []
        for (let sh of shs) {
            let cfs = sh?.customFields ?? []
            let vehicleType = getFromCf(cfs, "Vehicle Type")?.value
            if (vehicleType === "Market") {
                marketVehicles.push(sh)
            }
            else if (vehicleType === "Dedicated") {
                dedicatedVehicles.push(sh)
            }
        }
        console.log(`marketVehicles: ${marketVehicles.length}`)
        console.log(`dedicatedVehicles: ${dedicatedVehicles.length}`)

        console.log(`dedicatedVehicles`)
        let dedicatedJson = getTransporterWiseJSON(dedicatedVehicles, 2)
        let dedicatedJsonLocationWise = getJsonLocationWise(dedicatedJson)

        // console.log(dedicatedJsonLocationWise)

        console.log("marketJson")
        let marketJson = getTransporterWiseJSON(marketVehicles, 1)
        let marketJsonLocationWise = getJsonLocationWise(marketJson)
        // console.log(marketJsonLocationWise)
        let dedicatedCount = getTotalCount(dedicatedJson)
        let marketCount = getTotalCount(marketJson)
        let totalCount = dedicatedCount + marketCount

        let dedicatedPercent = dedicatedCount && totalCount ? dedicatedCount / totalCount * 100 : 0
        let marketPercent = dedicatedCount && totalCount ? marketCount / totalCount * 100 : 0
        console.log(`count dedicatedVehicles ${dedicatedCount} marketCount ${marketCount}`);
        shareJson.push({
            ["dedicatedCount"]: dedicatedPercent.toFixed(2),
            ["marketCount"]: marketPercent.toFixed(2)
        })
        // console.log(shareJson)
        let arrayOfObject = [{ "dedicatedVehicle": dedicatedJsonLocationWise, "marketVehicle": marketJsonLocationWise, "Total Share": shareJson }]


        // call a function to convert array of array
        let aoa = convertAoA(arrayOfObject)
        console.log(aoa)
        let buff = aoa2XlsxBuffer(aoa)
        buffToXlsx(buff)
    }
    else {
        console.log(`No shipmensts found`)
    }
}
main()




function aoa2XlsxBuffer(arrOfArr) {
    let border = {
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
    };

    let headersArr = [
        [
            {
                v: "Dedicated Vehicles",
                t: "s",
                s: {
                    alignment: {
                        vertical: "center",
                        horizontal: "left",
                    },
                    font: { sz: 14 },
                },
            },
            {
                v: "Market Vehicles",
                t: "s",
                s: {
                    alignment: {
                        vertical: "center",
                        horizontal: "left",
                    },
                    font: { sz: 14 },
                },
            },
            {
                v: "Total Share",
                t: "s",
                s: {
                    alignment: {
                        vertical: "center",
                        horizontal: "left",
                    },
                    font: { sz: 14 },
                },
            }
        ]
    ];

    let headersArr1 = [
        [
            "location",
            "total",
            "DELHI U.P. ROAD LINES",
            "SHYAM & TRANSPORT COMPANY",
            "R J LOGISTICS",
            "VISION FINSEC CONSULTANTS PVT LTD",
            "SINGH TRANSPORT GOODS CARRIER",
            "ADHUNIK TRANSPORT ORGANI",
            "GAJANAND TRANSPORT COMPANY",
            "TANDON TRANSPORT",
            "JAY AMBEY TRANSPORT CO.",
            "YASHU GLOBAL LOGISTICS",
            "location",
            "total",
            "R J LOGISTICS",
            "Super safe cargo carriers",
            "VISION FINSEC CONSULTANTS PVT LTD",
            "SINGH TRANSPORT GOODS CARRIER",
            "DELHI U.P. ROAD LINES",
            "ADHUNIK TRANSPORT ORGANI",
            "SSC	JAY AMBEY TRANSPORT CO.",
            "SHYAM & TRANSPORT COMPANY",
            "ANANT TRANSPORT CO",
            "RJL",
            "dedicated Count",
            "Market Count",
        ],
    ];

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
                    border,
                },
            };
        });
    });

    let aoa = [...headersArr, ...headersArr1, ...arrOfArr];

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet(aoa);

    let merge = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 11 } },
        { s: { r: 0, c: 12 }, e: { r: 0, c: 23 } },
        { s: { r: 0, c: 24 }, e: { r: 0, c: 25 } },

    ];


    ws["!merges"] = merge;

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    let buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
    return buf;
}


function convertAoA(data) {
    let result = [];
    let entry = data[0];

    for (let key in entry) {
        if (Array.isArray(entry[key])) {
            let subArray = entry[key].map((obj) => Object.values(obj));
            result.push(subArray);
        }
    }
    result = result.flat()
    return result
}

function buffToXlsx(buf) {
    fs.writeFile('output.xlsx', buf, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('File saved successfully!');
    });
}

