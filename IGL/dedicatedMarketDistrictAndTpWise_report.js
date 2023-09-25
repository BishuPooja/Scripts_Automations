const rp = require("request-promise")
const _ = require("lodash")
const fs = require("fs")
const XLSX = require('xlsx-js-style');
// const common = require("../config/common")
// const Base_url = common.config()["FRT_BASE_URL"]
const Base_url = "https://apis.fretron.com"
// const logger = require("../logger")

const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs.log' })
    ]
});

const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjA5MDI1OTIsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNDcyYjNjNTEtZDhlOS00Mjk0LThhN2YtYTY5MDkzYjUwNWI3IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.GnkPKO8URn1c70Us-p8-2LOuPTWKgN-SOMaaSm1jiAs"

async function getShsByFilter(filters) {
    try {
        let url = `${Base_url}/shipment-view/shipments/v1?filters=${JSON.stringify(filters)}&size=3000`
        logger.info(url)
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
        logger.info(`Error Executing While Getting Shipments ${e.message}`)
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

async function sendEmailWithAttachment(to, cc, subject, content, filePath1, html = null) {
    let url = `${Base_url}/notifications/emails/email`;
    let reqObj = {
        to: to,
        cc: cc.join(),
        subject: subject ? subject : "",
        content: content ? content : "",
        html: html ? html : "",
    };
    if (filePath1) reqObj.file = fs.createReadStream(filePath1);
    const options = {
        method: "POST",
        uri: url,
        headers: {
            "Content-Type": "application/json",
        },
        formData: reqObj,
        timeout: 10000,
    };
    let res = await rp(options);
    if (res && !res.error) {
        return "Done";
    }
    return res && res.error ? res.error : null;
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
            logger.info(item.shipmentNumber)
            logger.info(destination)
            continue
        }
        destination = destination?.split("-")[0]
        destination = destination?.trim().toUpperCase()
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


function getJsonLocationWise(obj) {
    let results = {};
    let locations = new Set(Object.keys(obj).flatMap((company) => Object.keys(obj[company])));
    for (let location of locations) {
        let result = {
            Total: 0
        };
        for (let company in obj) {
            let count = obj[company][location] ?? 0;
            result[company] = count;
            result.Total += count;
        }
        results[location] = result;
    }
    return results

}

function getDefaultObjectByTransporter(transporterNames) {
    let obj = {
        "Total": 0
    }
    for (let i = 0; i < transporterNames.length; i++) {
        obj[transporterNames[i]] = 0
    }
    return obj
}

function produceAoa(uniqLocations, dedicatedJsonLocationWise, marketJsonLocationWise, dedicatedTransporters, marketTransporters) {
    let aoa = []
    try {
        for (let i = 0; i < uniqLocations.length; i++) {
            let location = uniqLocations[i]
            if (!dedicatedJsonLocationWise[location]) {
                dedicatedJsonLocationWise[location] = getDefaultObjectByTransporter(dedicatedTransporters)
            }
            if (!marketJsonLocationWise[location]) {
                marketJsonLocationWise[location] = getDefaultObjectByTransporter(marketTransporters)
            }
            let dedicatedCount = dedicatedJsonLocationWise[location].Total
            let marketCount = marketJsonLocationWise[location].Total
            let total = dedicatedCount + marketCount
            let dedicatedShare = null
            let marketShare = null
            let remarks = ""
            if (total > 0) {
                dedicatedShare = ((dedicatedCount / total) * 100).toFixed(2)
                marketShare = ((marketCount / total) * 100).toFixed(2)
            }
            delete dedicatedJsonLocationWise[location].Total
            delete marketJsonLocationWise[location].Total
            aoa.push([i + 1, location, ...Object.values(dedicatedJsonLocationWise[location]), dedicatedCount, ...Object.values(marketJsonLocationWise[location]), marketCount, dedicatedShare, marketShare, remarks])
        }
    } catch (e) {
        logger.info(`Catched error : ${e.message}`)
    }
    return aoa
}

function aoa2XlsxBuffer(arrOfArr, fileName, dedicatedTransporters, marketTransporters) {
    const __styleCell = (value, rgb, bold = null, size = 11, border = null, alignmentH = null, wrapText = null) => {
        let cell = {
            v: value,
            t: "s",
            s: {
                alignment: {
                    vertical: "center",
                    horizontal: "center",
                    wrapText: false,
                },
                font: { bold: false, sz: 11 },
                fill: {
                    patternType: "solid",
                    fgColor: { rgb: rgb }
                }
            }
        }

        if (bold) cell.s.font.bold = true
        if (size) cell.s.font.sz = size
        if (border) cell.s.border = border
        if (alignmentH) cell.s.alignment.horizontal = alignmentH
        if (wrapText) cell.s.alignment.wrapText = true

        return cell
    }
    const border = {
        top: {
            style: "medium",
            color: "0000",
        },
        bottom: {
            style: "medium",
            color: "0000",
        },
        left: {
            style: "medium",
            color: "0000",
        },
        right: {
            style: "medium",
            color: "0000",
        },
    };
    dedicatedTransporters = dedicatedTransporters.map(it => __styleCell(it, "FFFF00", true, 14, border, "center", true))
    marketTransporters = marketTransporters.map(it => __styleCell(it, "FFFF00", true, 14, border, "center", true))
    let dedicatedHeader = []
    if (dedicatedTransporters.length) {
        dedicatedTransporters.forEach(tp => dedicatedHeader.push(""))//__styleCell("","00CCCC", true, 14, border, "center", true)))
        dedicatedHeader[0] = __styleCell("DEDICATED VEHICLES", "00FF00", true, 14, border, "center", true)
    }
    let marketHeader = []
    if (marketTransporters.length) {
        marketTransporters.forEach(tp => marketHeader.push(""))//__styleCell("","00CCCC", true, 14, border, "center", true)))
        marketHeader[0] = __styleCell("MARKET VEHICLES", "00FF00", true, 14, border, "center", true)
    }
    __styleCell("Freight Amount", true, 14, border, "center", true)
    let headersArr = [
        [
            __styleCell("SR NOS", "FFFF00", true, 14, border, "center", true),
            __styleCell("LOCATIONS", "FFFF00", true, 14, border, "center", true),
            ...dedicatedHeader,
            "",
            ...marketHeader,
            "",
            __styleCell("DEDICATED AND MARKET SHARE", "00FF00", true, 14, border, "center", true),
            "",
            ""
        ],
        [
            "",
            "",
            ...dedicatedTransporters,
            __styleCell("Total Dispatched Dedicated Vehicles", "FFFF00", true, 14, border, "center", true),
            ...marketTransporters,
            __styleCell("Total Dispatched Market Vehicles", "FFFF00", true, 14, border, "center", true),
            __styleCell("Dedicated Share", "FFFF00", true, 14, border, "center", true),
            __styleCell("Market Share", "FFFF00", true, 14, border, "center", true),
            __styleCell("Remarks", "FFFF00", true, 14, border, "center", true),
        ]
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
                    font: { bold: false, sz: 11 },
                    border: border
                },
            };
        });
    });

    const aoa = [...headersArr, ...arrOfArr];
    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.aoa_to_sheet(aoa);

    let mergeLast = []
    let initial = { s: { r: 1, c: 1 }, e: { r: 1, c: 1 } }
    for (let i = 1; i <= (dedicatedTransporters.length + marketTransporters.length + 5); i++) {
        let currCol = initial.e.c + i
        let mergeObj = { s: { r: 1, c: currCol }, e: { r: 1, c: currCol } }
        mergeLast.push(mergeObj)
    }


    const merge = [
        /* S.No - SR NOS */
        { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
        /**Locations */
        { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },
        /* Dedicated Vehicles*/
        { s: { r: 0, c: 2 }, e: { r: 0, c: dedicatedTransporters.length + 2 } },
        /**Market Vehicles */
        { s: { r: 0, c: dedicatedTransporters.length + 3 }, e: { r: 0, c: marketTransporters.length + (dedicatedTransporters.length + 3) } },
        /* Dedicated and Market Share*/
        { s: { r: 0, c: marketTransporters.length + dedicatedTransporters.length + 4 }, e: { r: 0, c: marketTransporters.length + dedicatedTransporters.length + 6 } },
        /* Dedicated T1 - Remarks*/
        ...mergeLast
    ];
    ws["!merges"] = merge;

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, fileName);
}

async function main(emails, fromTime, tillTime) {
    try {
        let from = fromTime ?? getLastMonthEpochDates()?.firstDay
        let till = tillTime ?? getLastMonthEpochDates()?.lastDay
        let filter = {
            "shipmentDate": {
                "isTillExpression": false,
                "isFromExpression": false,
                "from": from,
                "till": till
            },
            "_shipmentStatus_": {
                "shipmentStatus": ["Completed"]
            },
            "__version": 2,
            "_shcf_Type": ["Outbound"]
        }
        let shs = await getShsByFilter(filter)
        let marketVehicles = []
        let dedicatedVehicles = []
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
        logger.info(`marketVehicles: ${marketVehicles.length}`)
        logger.info(`dedicatedVehicles: ${dedicatedVehicles.length}`)
        let dedicatedJson = getTransporterWiseJSON(dedicatedVehicles, 2)
        let dedicatedJsonLocationWise = getJsonLocationWise(dedicatedJson)

        let marketJson = getTransporterWiseJSON(marketVehicles, 1)
        let marketJsonLocationWise = getJsonLocationWise(marketJson)

        let dedicatedTransporters = Object.keys(dedicatedJson)
        let marketTransporters = Object.keys(marketJson)
        let uniqLocations = [...new Set([...Object.keys(dedicatedJsonLocationWise), ...Object.keys(marketJsonLocationWise)])]
        let fileName = `igl_plant_tracking/reports/reports/districtAndTpWise_report.xlsx`
        let aoa = produceAoa(uniqLocations, dedicatedJsonLocationWise, marketJsonLocationWise, dedicatedTransporters, marketTransporters)
        aoa2XlsxBuffer(aoa, fileName, dedicatedTransporters, marketTransporters)
        const to = emails[0]
        const cc = emails.slice(1)
        const subject = "Fretron | Dedicated Market District and Transporter Wise Report"
        const content = `Dear Team,\n\n\nGreetings!\n\nWe are pleased to share with you the total case counts monthly report categorized by District and Transporter. This report provides a comprehensive overview of the cases delivered in each district by the transporter.\n\nThanks, Regards`
        const mailRes = await sendEmailWithAttachment(to, cc, subject, content, fileName)
        return mailRes
    } catch (e) {
        logger.info(`Catched error in generating dedicated market district and tp wise report : ${e.message}`)
    }
    return null
}

// module.exports = {
//     marketDedicatedDistrictAndTpWiseReport: main
// }


main(["pooja.bishu@fretron.com", ""], "", "")