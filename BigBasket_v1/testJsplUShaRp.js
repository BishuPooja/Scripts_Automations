/**
 * Customer Idling report only for USHA MARTIN fleetOwner
 * -By Suyash
 */
const rp = require("request-promise")
var FRT_PUB_BASE_URL = "https://apis.fretron.com"
const { log } = require("console");
const { loadavg } = require("os");
const _ = require("lodash")
const moment = require("moment")
const date = 1680582600000
const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTEwNDk2MzUsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiODIzOTQ3YTMtMDJjMC00ZTY1LThmNGUtMjFkYTM3MGVhNmNkIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.mn0TXQ9OT6HbiMNQlpoFxqi4RYr9KQjPVstnKEyb6JY"

async function mainMailSent() {
    try {
        const mailer = async (subject, to, cc, html) => {
            console.log("Sending email with SUB: " + subject);
            try {
                let res = await rp({
                    uri: `${FRT_PUB_BASE_URL}/report-views/shipments/download/email`,
                    method: "POST",
                    body: {
                        "formate": null,
                        "filters": `{\"_destination_\":{\"_nested\":{\"_path\":\"shipmentStages\",\"shipmentStages.tripPoint.purpose\":[\"Delivery\"],\"_or\":{\"shipmentStages.place.name\":[\"RANCHI-USHA MARTIN LIMITED\",\"RANCHI -USHA MARTIN LIMITED\"],\"shipmentStages.hub.name\":[\"RANCHI-USHA MARTIN LIMITED\",\"RANCHI -USHA MARTIN LIMITED\"]}}},\"_shipmentTrackingStatus_\":{\"_or\":{\"_at_delivery_\":{\"shipmentTrackingStatus\":[\"At Delivery Point\"]}}},\"__version\":2}`,
                        "shipmentFilters": {},
                        "mailInfo": {
                            "to": to,
                            "cc": cc,
                            "subject": subject,
                            "html": html,
                        },
                        "consignmentWise": false,
                        "templateId": "81a880d8-fc11-4e17-bde8-56b197f1af35",
                        "search": null
                    },
                    timeout: 2000,
                    json: true,
                    headers: {
                        Authorization: token
                    }
                });
                console.log(res)
                return res.status == 200 ? "Mail sent Successfully!" : "Error sending mail"
            } catch (err) {
                console.log("Error in sending email " + err.message);
                return "Error in sending email " + err.message
            }

        }

        const atDeliveryShs = async () => {
            let url = `${FRT_PUB_BASE_URL}/shipment-view/shipments/v1?filters=%7B%22shipmentDate%22%3A%7B%22isTillExpression%22%3Afalse%2C%22isFromExpression%22%3Afalse%2C%22from%22%3A` + new Date(2022, 7, 1).valueOf() + `%2C%22till%22%3A` + Date.now() + `%7D%2C%22_shipmentTrackingStatus_%22%3A%7B%22_or%22%3A%7B%22_at_delivery_%22%3A%7B%22shipmentTrackingStatus%22%3A%5B%22At%20Delivery%20Point%22%5D%7D%7D%7D%2C%22__version%22%3A2%7D&size=1000` + `&allFields=["shipmentNumber","fleetInfo","uuid","shipmentStages","customFields"]`
            let res = await rp({
                url: url,
                json: true,
                headers: {
                    Authorization: token
                }
            })
            var arr = []
            if (res && res.length) {
                for (let items of res) {
                    let custName = items.customFields && items.customFields.length ? items.customFields.filter(({ fieldKey }) => fieldKey == "Customer Name") : []
                    custName = custName.length != 0 ? custName[0].value : ""
                    let driverRemark = items.customFields && items.customFields.length ? items.customFields.filter(({ fieldKey }) => fieldKey == "Driver Remark") : []
                    let driverNumber = items.fleetInfo.driver.mobileNumber
                    let qty = items.customFields && items.customFields.length ? items.customFields.filter(({ fieldKey }) => fieldKey.includes("Quantity")) : []
                    let gateOutTimeSap = items.customFields && items.customFields.length ? items.customFields.filter(({ fieldKey }) => fieldKey == "Gate Out Time SAP") : []
                    let tptType = items.customFields && items.customFields.length ? items.customFields.filter(({ fieldKey }) => fieldKey == "Transportation Type") : []
                    if (tptType.length && tptType[0].value == "PT" && _.first(items.shipmentStages).status == "COMPLETED") continue
                    let destReportingTime = new Date(_.last(items.shipmentStages).arrivalTime + 19800000).toLocaleString()
                    let destination = _.last(items.shipmentStages).place.name.split("-")[0]
                    let ranchiDestination = destination.toLowerCase().includes("ranchi")


                    if (custName && custName.toLowerCase().includes("usha martin") && ranchiDestination) {
                        let tptName = items.fleetInfo.forwardingAgent
                            ? items.fleetInfo.forwardingAgent.name
                            : items.fleetInfo.broker
                                ? items.fleetInfo.broker.name
                                : items.fleetInfo.fleetOwner
                                    ? items.fleetInfo.fleetOwner.name
                                    : "";
                        arr.push({
                            driverNumber: driverNumber ? driverNumber : "",
                            driverRemark: ((driverRemark.length != 0 ? driverRemark[0].value : "") != null) ? driverRemark.length != 0 ? driverRemark[0].value : "" : "",
                            destination: _.last(items.shipmentStages).place.name.split("-")[0],
                            tptName: tptName,
                            vehicleNumber: items.fleetInfo.vehicle.vehicleRegistrationNumber,
                            qty: qty.length ? Number(qty[0].value).toFixed(0) : 0,
                            gateOutTimeSap: gateOutTimeSap.length ? new Date(Number(gateOutTimeSap[0].value) + 19800000).toLocaleString() : "",
                            destReportingTime: destReportingTime
                        })
                    }
                }
                return arr
            } else {
                console.log(`No SH Found`)
                return null
            }
        }

        const shs = await atDeliveryShs()
        if (!shs.length) {
            console.log("No Shipments for At delivery found")
            return {
                data: "No Shipments for At delivery found",
                error: null,
                status: 200
            }
        }
        let to = ["pooja.bishu@fretron.com"]
        let cc = []
        // if ($event && $event.query && $event.query.To) {
        //     let toFromQuery = $event.query.To.trim().split(",").map(e => e = e.trim())
        //     to = to.concat(toFromQuery)
        // }
        // if ($event && $event.query && $event.query.Cc) {
        //     let ccFromQuery = $event.query.Cc.trim().split(",").map(e => e = e.trim())
        //     cc = cc.concat(ccFromQuery)
        // }
        const subject = "Usha Martin Ranchi - Waiting for unloading Report " + moment(date).format("DD MMMM YYYY")
        let remainingContent = ""
        let grandTotal = 0
        for (let items of shs) {
            remainingContent += `
                                    <tr>
                                    <td colspan="3">${items.vehicleNumber}</td>
                                    <td colspan="3">${items.driverNumber}</td>
                                    <td colspan="3">${items.driverRemark}</td>
                                    <td colspan="3">${items.tptName}</td>
                                    <td colspan="3">${items.destination}</td>
                                    <td colspan="3">${items.qty}</td>
                                    <td colspan="3">${items.gateOutTimeSap}</td>
                                    <td colspan="3">${items.destReportingTime}</td>
                                    </tr>
                `
            grandTotal += Number(items.qty)
        }

        remainingContent += `
                                    <tr>
                                    <td colspan="3" style="background: rgb(251, 221, 109);"><b>Grand Total</b></td>
                                    <td colspan="3"></td>
                                    <td colspan="3"></td>
                                    <td colspan="3"></td>
                                    <td colspan="3"></td>
                                    <td colspan="3" style="background: rgb(251, 221, 109);"><b>${grandTotal}</b></td>
                                    <td colspan="3"></td>
                                    <td colspan="3" ></td>
                                    </tr>
            `

        let html = `
                        <html>
                        <head>
                        <style>
                        table,tbody,th,td {
                        border: 1px solid black;
                        border-collapse: collapse;
                        width: 900px;
                        margin-left: auto;
                        margin-right: auto;
                        }
                        th, td {
                        padding: 2px;
                        text-align: center;
                        }
                        p {
                        font-size: 17px;
                        }
                        </style>
                        </head>
                        <body>
                        <p>Dear Sir,</p>
                        <p>This is to inform you that these vehicles are waiting for unloading at Usha Martin, Ranchi.</p>
                        <br />
                        <table>
                        <tr>
                        <th colspan="24" style="background: rgb(250, 65, 65);">${("Usha Martin Ranchi - Waiting for unloading Report " + moment(date).format("DD MMMM YYYY")).toUpperCase()}</th>
                        </tr>
                        <tr>
                            <th colspan="3" style="background: rgb(251, 221, 109);">Vehicle Number</th>
                            <th colspan="3" style="background: rgb(251, 221, 109);">Driver Number</th>
                            <th colspan="3" style="background: rgb(251, 221, 109);">Remark</th>
                            <th colspan="3" style="background: rgb(251, 221, 109);">Transporter Name</th>
                            <th colspan="3" style="background: rgb(251, 221, 109);">Destination</th>
                            <th colspan="3" style="background: rgb(251, 221, 109);">Quantity</th>
                            <th colspan="3" style="background: rgb(251, 221, 109);">Gate Out Time</th>
                            <th colspan="3" style="background: rgb(251, 221, 109);">Destination Reporting Time</th>
                        </tr>
                        ${remainingContent}
                        </table>
                        </body>
                        </html>
            `

        // let res = await mailer(subject, to, cc, html)
        // console.log(res)

        // return JSON.stringify({
        //     data: res,
        //     error: null,
        //     status: 200
        // })



    } catch (err) {
        console.log("Error executing API- " + err.message)
        return JSON.stringify({
            data: null,
            error: "Internal Server Error- " + err.message,
            status: 500
        })
    }
}

mainMailSent()

const atDeliveryShs = async () => {
    let url = `${FRT_PUB_BASE_URL}/shipment-view/shipments/v1?%7B%0A%09%22shipmentDate%22%3A%20%7B%0A%09%09%22isTillExpression%22%3A%20false%2C%0A%09%09%22isFromExpression%22%3A%20false%2C%0A%09%09%22from%22%3A%201659292200000%2C%0A%09%09%22till%22%3A%201680582600000%0A%09%7D%0A%09%22__version%22%3A%202%0A%7D%20%26%20size%20%3D%201000%20%26%20allFields%20%3D%20%5B%22shipmentNumber%22%2C%20%22fleetInfo%22%2C%20%22uuid%22%2C%20%22shipmentStages%22%2C%20%22customFields%22%5D%0A%7D`
    console.log(url)
    let res = await rp({
        url: url,
        json: true,
        headers: {
            Authorization: token
        }
    })

    return res
}


async function mainTest() {
    let result = await atDeliveryShs()
    console.log(result.length)

    for (let items of result) {
        console.log(items.shipmentNumber)
        let tptType = items.customFields && items.customFields.length ? items.customFields.filter(({ fieldKey }) => fieldKey == "Transportation Type") : []
        if (tptType.length && tptType[0].value == "PT" && _.first(items.shipmentStages).status == "COMPLETED") continue

        let custName = items.customFields && items.customFields.length ? items.customFields.filter(({ fieldKey }) => fieldKey == "Customer Name") : []
        custName = custName.length != 0 ? custName[0].value : ""
        let destination = _.last(items.shipmentStages).place.name.split("-")[0]
        let ranchiDestination = destination.toLowerCase().includes("ranchi")
        console.log(ranchiDestination)



        console.log(custName + " " + "custName   " + destination)
        if (custName && custName.toLowerCase().includes("usha martin") && ranchiDestination) {

            console.log(result.length)
        }
    }

}

// mainTest()
