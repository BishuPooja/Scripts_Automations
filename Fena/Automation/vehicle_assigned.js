/**
 * Author: Vikram
 * send alert mail from transporter to Fena Logistics Team on vehicle assigned/sh created
*/
const dipatchWiseMailContact = {
    "SURAJPUR": {
        "mobile": "9540368585",
        "mail": "rksharma@fena.com"
    },
    "ROORKEE": {
        "mobile": "9639004217",
        "mail": "sandeeppal@fena.com"
    },
    "PONDICHERRY": {
        "mobile": "9894800148",
        "mail": "ssuresh@fena.com"
    },
    "HOWRAH": {
        "mobile": "8001294506",
        "mail": "santukoley@fena.com"
    },
    "SILVASSA": {
        "mobile": "9737878805",
        "mail": "srpatil@fena.com"
    },
    "GUWAHATI": {
        "mobile": "8472896160",
        "mail": "ashokdas@fena.com"
    }
}

const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzY4NzI0OTcsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiM2U0Y2RlZTktMGIzYi00NmRkLTliOTgtZGYwZTM4YTAyNzFjIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.cDByYzL2qr_SsYtNXWbm2zRw4iy_a14ZbllyPgI1mjs"

const consignerPlace = ["SURAJPUR", "ROORKEE", "GUWHATI", "SILVASSA", "PUDUCHERRY", "HOWRAH", "KATHUA"]
const materialCodes = ["405773", "405795", "406535", "405796", "406434", "405774", "405775", "406225", "405797", "405255"]
const tubCodes = ["405798", "406181", "405799", "406227", "406160", "405261"]
const containerCodes = ["406582", "406137", "406371", "405711", "406554", "406604", "405826", "406585", "406580"]

var transporterEmail = null
var transporterName = "Sir"
var transporterContact = null
var cc = []
async function main(shipment) {
    let newCc = []
    var header = [
        "Order Date",
        "Order Number",
        "Consignee",
        "Dispatch From Location",
        "Dispatch To Town",
        "State",
        "Total Weight",
        "Total Buckets",
        "Total Tubs",
        "Total Containers",
        // "Vehicle Type (in MT)",
        "Vehicle No.",
        "Driver Name",
        "Mob. No."
    ]
    let tableRows = ``

    console.log(`SH no- ${shipment.shipmentNumber}`)

    let vehicleNumber = shipment.fleetInfo.vehicle?.vehicleRegistrationNumber ?? "N/A"
    let driverName = shipment.fleetInfo.driver?.name ?? "N/A"
    let driverNumber = shipment.fleetInfo.driver?.mobileNumber ?? "N/A"
    let freightUnitLineItemId = shipment.freightUnitLineItemId
    let freightUnit = await getFreightUnitByFuLineItemId(freightUnitLineItemId)
    if (!freightUnit) return "FreightUnit NOT Found"

    let res = await setTransporterContact(freightUnit)
    if (res == "error") return `Transporter not found`

    let allOrders = await getAllData(freightUnit)

    if (allOrders && allOrders.length) {
        var plantName = allOrders[0].plantName
        console.log(`plant name - ${plantName}`)
        for (let order of allOrders) {
            let state = order["State"]
            tableRows += `
            <tr>
                <td>${order["OrderDate"]}</td>
                <td>${order["Order Number"]}</td>
                <td>${order["consignee"]}</td>
                <td>${order["Dispatch From Location"]}</td>
                <td>${order["Dispatch To Town"]}</td>
                <td>${state}</td>
                <td>${order["Total Weight"]}</td>
                <td>${order["Bucket Quantity"]}</td>
                <td>${order["Tub Quantity"]}</td>
                <td>${order["Container Quantity"]}</td>
                
                <td>${vehicleNumber}</td>
                <td>${driverName}</td>
                <td>${driverNumber}</td>
            </tr>
            `

            if (dipatchWiseMailContact[order["Dispatch From Location"]]) {
                newCc.push(dipatchWiseMailContact[order["Dispatch From Location"]].mail)
            }
        }
    } else {
        console.log(`No order found for sh- ${shipment.shipmentNumber}`)
        return `No order found for sh- ${shipment.shipmentNumber}`
    }


    if (transporterEmail && transporterEmail.length && transporterEmail[0] && transporterEmail[0] != "null") {
        let html = getHtml(header, tableRows, transporterName, plantName)
        let to = [...cc, ...["varunsharma@fena.com", "shankararya@fena.com", "sagar.soni@fretron.com"]] //HO logistics
        let cc1 = transporterEmail     //transporter
        cc1 = [...cc1, ...newCc]
        cc1 = _.uniq(cc1)
        let subject = `FRETRON | Fena ~ Vehicle Assigned by ${transporterName}`
        console.log(`Sending mail to ${to} & ${cc}`)

        let sendMail = await mailerWithoutExcel(to, cc1, subject, html)
        console.log(sendMail)
    } else {
        console.log(`Transporter email detail not found for sh - ${shipment.shipmentNumber}`);
    }
}

// Helping functions --->
async function getAllData(fu) {
    var orderslist = new Array()
    let fuLineItem = fu.lineItems[0]

    let fuLineItemId = fuLineItem.uuid
    let orders = await getOrdersByFuLineItemId(fuLineItemId)

    if (!orders || orders.length == 0) {
        console.log("No orders found")
        return null
    }

    let orderByUUId = orders.reduce((pv, cv) => {
        pv.set(cv.uuid, cv)
        return pv
    }, new Map())

    let mappingsByOrderId = fuLineItem.salesOrderMappings.reduce((pv, cv) => {
        let now = pv.get(cv.orderId) ?? []
        now.push(cv)
        pv.set(cv.orderId, now)
        return pv
    }, new Map())

    let keys = Array.from(mappingsByOrderId.keys())

    for (let orderId of keys) {
        let order = orderByUUId.get(orderId)
        if (order) {
            let mappings = mappingsByOrderId.get(orderId)
            let quantityMap = getTotalQuantity(mappings, order.lineItems)

            let quantity = quantityMap["weightQuantity"]
            let bucketQuantity = quantityMap["totalBucketQuantity"]
            let tubQuantity = quantityMap["totalTubQuantity"]
            let containerQuantity = quantityMap["totalContainerQuantity"]

            let dispatchFrom = "N/A"
            let dispatchTo = "N/A"
            var state = "N/A"

            let orderNumber = order.externalId ?? order.orderNumber
            let orderDate = "N/A"
            if (order.orderDate) {
                orderDate = formatDateFromEpoch(order.orderDate / 1000)
                // orderDate = `${new Date(order.orderDate).getDate()}/${new Date(order.orderDate).getMonth()}/${new Date(order.orderDate).getFullYear()}`
            }
            let item = order.lineItems.find((li) => li.uuid == mappings[0].lineItemId)
            var consignee = item.consignee
            var consigner = item.consigner
            let loadType = fu.allowedLoadTypes.find(v => v.uuid == fuLineItem.loadTypeId)
            var vehicleType = loadType?.passingCapacityMT != null ? loadType.passingCapacityMT : "N/A"
            if (consigner) {
                dispatchFrom = consigner.places[0]?.name ?? "N/A"
            }
            let consigneeName = "N/A"
            if (consignee) {
                dispatchTo = consignee.places[0]?.name ?? "N/A"
                state = consignee.places[0]?.state ?? "N/A"
                consigneeName = consignee?.name
            }

            let plantName = consigner?.name ?? "N/A"
            if (consigner.address) {
                var address = JSON.parse(consigner.address)
                if (state == "N/A") {
                    state = address?.state ?? "N/A"
                }
                // plantName = address?.city ?? "N/A"
            } else {
                console.log(`address not found of consigner ${"- " + consigner.name} `)
            }
            if (consignee.address) {
                var address = JSON.parse(consignee.address)
                if (state == "N/A") {
                    state = address?.state ?? "N/A"
                }
            } else {
                console.log(`address not found of consigner ${"- " + consigner.name} `)
            }
            if (dispatchFrom.toUpperCase() == "SURAJPUR") {
                cc = ['rksharma@fena.com']
            }
            orderslist.push({
                "Order Number": orderNumber,
                "Dispatch From Location": dispatchFrom,
                "Dispatch To Town": dispatchTo,
                "State": state,
                "Total Weight": quantity,
                "Vehicle Type": vehicleType,
                "plantName": plantName,
                "Bucket Quantity": bucketQuantity,
                "Tub Quantity": tubQuantity,
                "Container Quantity": containerQuantity,
                "consignee": consigneeName,
                "OrderDate": orderDate
            })

        }
    }

    return orderslist.length ? orderslist : null

    // Helping functions to getAllData --->>
    async function getOrdersByFuLineItemId(fuLineItenId) {
        let filter = {
            "_nested": {
                "_path": "lineItems",
                "_include_nested_hits": true,
                "lineItems.freightUnitLineItemIds": [fuLineItenId],
            }
        }
        // let allFields = ["orderNumber", "orderDate", "externalId", "lineItems.uuid", "lineItems.mappings.orderId", "lineItems.allowedLoadTypes", "lineItems.consignee.name", "lineItems.consignee.places", "lineItems.consigner.name", "lineItems.consigner.places", "lineItems.consignee.address", "lineItems.consigner.address", "lineItems.loadInfo", "lineItems.material.externalId", "uuid"]
        let allFields = true
        let url = `${FRT_PUB_BASE_URL}/shipment-view/sales/v2/orders_new?orderOrEnquiry=order&limit=500&filters=${JSON.stringify(filter)}&source=${JSON.stringify(allFields)}`
        return rp({
            url: url,
            method: "GET",
            json: true,
            headers: { Authorization: token }
        }).then((res) => {
            return res.length ? res : null
        }).catch((err) => {
            console.log(`error getting order - ${err}`)
            return null
        })
    }

    function getTotalQuantity(mappings, lineitems) {
        let weightQuantity = 0.0
        var totalBucketQuantity = 0
        var totalTubQuantity = 0
        var totalContainerQuantity = 0

        for (let mapping of mappings) {
            if (mapping.quantity.weight) {
                weightQuantity = weightQuantity + mapping.quantity.weight.netQuantity
            }
        }
        let quantity = ''
        if (weightQuantity > 0.0) {
            quantity = `${weightQuantity.toFixed(2)} MT`
        }

        var mapingLineItems = mappings.map((v) => { return v.lineItemId })

        for (let item of lineitems) {
            if (mapingLineItems.includes(item.uuid)) {
                let consigner = item.consigner
                if (consigner) {
                    let dispatchFrom = consigner.places[0]?.name.toUpperCase()
                    let material = item.material
                    if (dispatchFrom && consignerPlace.includes(dispatchFrom) && material?.externalId && materialCodes.includes(material.externalId)) {
                        if (item?.loadInfo?.standardMeasurement?.packageMeasurement?.netQuantity) {
                            totalBucketQuantity += item.loadInfo.standardMeasurement.packageMeasurement.netQuantity
                        }
                    } else if (dispatchFrom && consignerPlace.includes(dispatchFrom) && material?.externalId && tubCodes.includes(material.externalId)) {
                        if (item?.loadInfo?.standardMeasurement?.packageMeasurement?.netQuantity) {
                            totalTubQuantity += item.loadInfo.standardMeasurement.packageMeasurement.netQuantity
                        }
                    } else if (dispatchFrom && consignerPlace.includes(dispatchFrom) && material?.externalId && containerCodes.includes(material.externalId)) {
                        if (item?.loadInfo?.standardMeasurement?.packageMeasurement?.netQuantity) {
                            totalContainerQuantity += item.loadInfo.standardMeasurement.packageMeasurement.netQuantity
                        }
                    }
                }
            }
        }

        return {
            "weightQuantity": quantity,
            "totalBucketQuantity": `${totalBucketQuantity} Units`,
            "totalTubQuantity": `${totalTubQuantity} Units`,
            "totalContainerQuantity": `${totalContainerQuantity} Units`
        }
    }
}

async function setTransporterContact(freightUnit) {
    let fuLineItem = freightUnit.lineItems[0]
    if (fuLineItem.transporterId) {
        console.log(`fuLineItem.transporterId: ${fuLineItem.transporterId}`)
        let transporter = await getTransporterById(fuLineItem.transporterId)
        if (transporter) {
            transporterName = transporter.name
            if (transporter.contacts && transporter.contacts.length) {
                let emailId = transporter.contacts.map((v) => {
                    if (v.emails && v.emails.length) return v.emails[0]
                    return null
                })
                if (emailId) transporterEmail = emailId
                let contact = transporter.contacts.map((v) => {
                    if (v.mobileNumber) return v.mobileNumber
                    else if (v.mobileNumbers.length) return v.mobileNumbers[0]
                })
                if (contact.length) {
                    if (contact[0] != undefined && contact[0].length > 9 && contact[0].length < 14) {
                        if (contact[0].match(/^[\]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
                            transporterContact = contact[0]
                        }
                    }
                } else {
                    console.log(`Invalid mobile no of length- ${contact[0].length}`)
                }
            }
        } else {
            console.log(`Tranporter not found`)
            return "error"
        }
    } else {
        console.log(`trasnporterId not found in freightUnit`)
        return "error"
    }
}

async function getTransporterById(id) {
    let url = `${FRT_PUB_BASE_URL}/business-partners/v2/partner/${id}`
    return rp({
        url: url,
        method: "GET",
        json: true,
        headers: { Authorization: token }
    }).then((res) => {
        return res.data ? res.data : null
    }).catch((err) => {
        console.log(err)
        return null
    })
}

async function getFreightUnitByFuLineItemId(id) {
    try {
        return await rp({
            url: `${FRT_PUB_BASE_URL}/order-manager-v2/freight-units/v1/freight-units/by/linItemIds`,
            json: true,
            method: "POST",
            body: [id],
            headers: {
                Authorization: token
            }
        }).then((res) => {
            if (res.data && res.data.length) return res.data[0]
            console.log(res.error)
            return null
        }).catch((err) => {
            console.log(err)
            return null
        })
    } catch (err) {
        console.log(err)
        return null
    }
}

function getHtml(header, rows, transporter, plantName) {
    let heading = ``
    for (val of header) {
        heading += `<th>${val}</th>`
    }

    let html =
        `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                table,
                tr,
                td,
                th {
                    border: 1px solid black;
                    border-collapse: collapse;
                    padding: auto;
                    margin: auto;
                    align-items: left;
                    font-size: 1.2rem;
                    margin: auto;
                    padding:auto;
                }
                th{
                    background-color: #97f72a;
                }
            </style>
            <title>Document</title>
        </head>

        <body>
            <p>Dear Fena Logistics Team (${plantName})</p>
            <p>Vehicle/s Assigned as per detail mentioned below :</p>
            </br></br>
            <table>
            ${heading}  
            ${rows}  
            </table>
            </br></br>
            <p>From : ${transporter}</p>
        </body>
        </html>
        `
    return html
}

async function mailerWithoutExcel(to, cc, subject, html) {
    try {
        await rp({
            url: `${FRT_PUB_BASE_URL}/notifications/emails/email`,
            method: "POST",
            json: true,
            body: {
                to: to,
                cc: cc,
                subject: subject,
                html: html,
            },
        });
        return "Mail Sent Successfully";
    } catch (error) {
        return error;
    }
}


try {

    await main($event)
} catch (err) {
    console.log(err);
    return err
}


function formatDateFromEpoch(epoch) {

    const date = moment.unix(epoch)

    const offset = 330; // IST offset in minutes (+5:30)
    // Set the time zone offset manually

    date.utcOffset(offset);

    // Format the date in "DD/MM/YYYY" format

    return date.format('DD/MM/YYYY');

}