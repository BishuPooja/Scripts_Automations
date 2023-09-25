/**
 * Author: Vikram
 * Send alert mail and SMS from fena Logistics Team to transporter when bid is accepted
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

var cc = []
const consignerPlace = ["SURAJPUR", "ROORKEE", "GUWHATI", "SILVASSA", "PUDUCHERRY", "HOWRAH", "KATHUA"]
const materialCodes = ["405773", "405795", "406535", "405796", "406434", "405774", "405775", "406225", "405797", "405255"]
const tubCodes = ["405798", "406181", "405799", "406227", "406160", "405261"]
const containerCodes = ["406582", "406137", "406371", "405711", "406554", "406604", "405826", "406585", "406580"]

var transporters = new Array()
async function main(auction) {
    let newCc = []
    let newContact = []
    var header = [
        "Order Number",
        "Dispatch From Location",
        "Dispatch To Town",
        "State",
        "Total Weight",
        "Total Buckets",
        "Total Tubs",
        "Total Containers",
        // "Vehicle Type (in MT)"
    ]
    let tableRows = ``

    var totalFreight = "N/A"
    if (auction.bids && auction.bids.length) {
        var bidAccepted = auction.bids.find(v => v.status == "ACCEPTED")
    }
    if (bidAccepted) {
        totalFreight = bidAccepted?.amount ?? "N/A"
        let res = await setTransporterContact(bidAccepted.businessPartnerId)
        if (res == "error") return `Transporters not found`
    }

    var totalWeight = 0
    let allOrders = await getAllData(auction)
    if (allOrders && allOrders.length) {
        for (order of allOrders) {
            var plantName = allOrders[0].plantName
            let state = order["State"] ? order["State"] : "N/A"
            var fromLocation = order["Dispatch From Location"]
            var toLocation = order["Dispatch To Town"]
            var vehType = order["Vehicle Type"]
            totalWeight += Number(order["Total Weight"])
            tableRows += `
                <tr>
                    <td>${order["Order Number"]}</td>
                    <td>${order["Dispatch From Location"]}</td>
                    <td>${order["Dispatch To Town"]}</td>
                    <td>${state}</td>
                    <td>${order["Total Weight"]}</td>
                    <td>${order["Bucket Quantity"]}</td>
                    <td>${order["Tub Quantity"]}</td>
                    <td>${order["Container Quantity"]}</td>
                    
                </tr>
                `

            if (dipatchWiseMailContact[fromLocation]) {
                newCc.push(dipatchWiseMailContact[fromLocation].mail)
                newContact.push(dipatchWiseMailContact[fromLocation].mobile)
            }
        }
    } else {
        console.log(`No order found for orderId- ${auction.orderId}`)
    }

    if (transporters.length) {
        for (let transporter of transporters) {
            let name = transporter?.name ?? "Sir"
            let email = transporter.email ?? null
            let contact = transporter?.contact ?? null
            let html = getHtml(header, tableRows, name)

            if (email && email.length && email[0]) {
                let to = email
                let cc1 = [...newCc, ...cc, ...["varunsharma@fena.com", "shankararya@fena.com"]]
                cc1 = _.uniq(cc1)
                console.log(`cc1: ${JSON.stringify(cc1)}`)
                let subject = "FRETRON | Bid Accepted"
                console.log(`Sending mail to ${to}`)
                let sendMail = await mailerWithoutExcel(to, cc1, subject, html)
                console.log(sendMail)
            } else {
                console.log(`EmailId not found of trasnporter - ${name}`)
            }
            contact = [...newContact, contact]
            contact = _.uniq(contact)
            console.log(`contact  ${JSON.stringify(contact)}`)
            if (contact) {
                let content = `Dear ${name} Transport Please arrange for Vehicle to load From ${fromLocation} To ${toLocation} vehicle type ${vehType} Freight will be ${totalFreight} Fena Logistics Team -${plantName}`;

                let smsSentRes = await sendSmsToTransporter(contact, content)
                console.log(`smsSentRes - ${smsSentRes}`)
            } else {
                console.log(`Contact No. not found of transporter - ${name}`);
            }
        }
    } else {
        console.log(`Transporter contact details not found for orderId - ${auction.orderId}`);
    }
}


// Helping functions --->
async function getAllData(auction) {
    var orderslist = new Array()
    let fuLineItemId = auction.fuMappings[0].lineItemId

    let orders = await getOrdersByFuLineItemId(fuLineItemId)
    if (!orders || orders.length == 0) {
        console.log("No orders found")
        return null
    }

    let orderByUUId = orders.reduce((pv, cv) => {
        pv.set(cv.uuid, cv)
        return pv
    }, new Map())

    let mappingsByOrderId = auction.salesOrderMappings.reduce((pv, cv) => {
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
            let bucketQuantity = quantityMap["totalMaterialQuantity"]
            let tubQuantity = quantityMap["totalTubQuantity"]
            let containerQuantity = quantityMap["totalContainerQuantity"]

            let dispatchFrom = "N/A"
            let dispatchTo = "N/A"
            var state = "N/A"

            let orderNumber = order.externalId ?? order.orderNumber
            let item = order.lineItems.find((li) => li.uuid == mappings[0].lineItemId)
            var consignee = item.consignee
            var consigner = item.consigner
            let loadType = item.allowedLoadTypes
            var vehicleType = "N/A"
            if (loadType && loadType.length) {
                vehicleType = loadType.map((v) => { if (v.passingCapacityMT) return v.passingCapacityMT }).join()
            }
            if (consigner) {
                dispatchFrom = consigner.places[0]?.name ?? "N/A"
            }
            if (consignee) {
                dispatchTo = consignee.places[0]?.name ?? "N/A"
                state = consignee.places[0]?.state ?? "N/A"
            }
            let plantName = consigner?.name ?? "N/A"
            if (consignee.address) {
                var address = JSON.parse(consignee.address)
                if (state == "N/A") {
                    state = address?.state ?? "N/A"
                }
            } else {
                console.log(`address not found of consigner ${"- " + consigner.name} `)
            }
            if (consigner.address) {
                var address = JSON.parse(consigner.address)
                // plantName = address?.city ?? "N/A"
            } else {
                console.log(`address not found of consigner ${"- " + consigner.name} `)
            }
            if (dispatchFrom == "SURAJPUR") {
                cc = ["rakeshkumar@fena.com"]
            }
            orderslist.push({
                "Order Number": orderNumber,
                "Dispatch From Location": dispatchFrom,
                "Dispatch To Town": dispatchTo,
                "State": state,
                "Total Weight": quantity,
                "Bucket Quantity": bucketQuantity,
                "Tub Quantity": tubQuantity,
                "Container Quantity": containerQuantity,
                "Vehicle Type": vehicleType,
                "plantName": plantName
            })

        } else {
            console.log(`Order not found for order id- ${orderId}`)
        }
    }

    return orderslist.length ? orderslist : null

}

// Helping functions to getAllData --->>
async function getOrdersByFuLineItemId(fuLineItenId) {
    let filter = {
        "_nested": {
            "_path": "lineItems",
            "_include_nested_hits": true,
            "lineItems.freightUnitLineItemIds": [fuLineItenId],
        }
    }
    // let allFields = ["orderNumber","externalId", "lineItems.uuid", "lineItems.mappings.orderId", "lineItems.allowedLoadTypes", "lineItems.consignee.name", "lineItems.consignee.places", "lineItems.consigner.name", "lineItems.consigner.places", "lineItems.consignee.address", "lineItems.consigner.address", "uuid"]
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
        console.log("error getting order - " + err)
        return null
    })
}

function getTotalQuantity(mappings, lineitems) {
    let weightQuantity = 0.0
    var totalMaterialQuantity = 0
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
                        totalMaterialQuantity += item.loadInfo.standardMeasurement.packageMeasurement.netQuantity
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
        "totalMaterialQuantity": `${totalMaterialQuantity} Units`,
        "totalTubQuantity": `${totalTubQuantity} Units`,
        "totalContainerQuantity": `${totalContainerQuantity} Units`
    }
}

async function setTransporterContact(allowedTransportersList) {
    let allTransporters = await getTransportersById(allowedTransportersList)
    if (allTransporters && allTransporters.length) {
        for (let transporter of allTransporters) {
            let name = transporter?.name ?? "N/A"
            if (transporter.contacts && transporter.contacts.length) {
                var emailId = transporter.contacts.map((v) => {
                    if (v.emails && v.emails.length && v.emails[0].length && v.emails[0] != ("null" || "")) return v.emails[0]
                    return null
                })
                var contact = transporter.contacts.map((v) => {
                    if (v.mobileNumber) return v.mobileNumber
                    else if (v.mobileNumbers.length) return v.mobileNumbers[0]
                })
                var contact = transporter.contacts.map((v) => {
                    if (v.mobileNumber) return v.mobileNumber
                    else if (v.mobileNumbers.length) return v.mobileNumbers[0]
                })
                var trasnporterContact = null
                if (contact.length) {
                    if (contact[0] != undefined && contact[0].length > 9 && contact[0].length < 14) {
                        if (contact[0].match(/^[\]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
                            trasnporterContact = contact[0]
                        }
                    }
                } else {
                    console.log(`Invalid mobile no of length- ${contact[0].length}`)
                }
            }
            transporters.push({
                "name": name,
                "email": emailId,
                "contact": trasnporterContact
            })
        }
    } else {
        console.log(`Transporters not found`);
        return "error"
    }
}

async function getTransportersById(id) {
    let url = `${FRT_PUB_BASE_URL}/business-partners/v2/admin/business-partners?ids=${id}`;
    // console.log(url);
    return rp({
        url: url,
        method: "GET",
        json: true,
        headers: { Authorization: token }
    }).then((res) => {
        return res.data.length ? res.data : null
    }).catch((err) => {
        console.log(err)
        return null
    })
}

function getHtml(header, rows, transporter) {
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
            <p>Dear Logistics HO  :</p>
            <p>Vehicle & Freight Rate/s Confirmed for the following Order/s</p>
            </br></br>
            <table>
            ${heading}  
            ${rows}  
            </table>
            </br></br>
            <p>Logisitics - Dispatch Location</p>
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

async function sendSmsToTransporter(phoneNumber, content) {
    let msgRes = await rp({
        method: "POST",
        uri: `${FRT_PUB_BASE_URL}/notifications/smsing/sms`,
        body: JSON.stringify({
            to: phoneNumber,
            content: content,
        }),
        headers: {
            "Content-Type": "Application/json",
        },
    });
    console.log(msgRes);
    return msgRes
}

try {
    let mainData = main($event)
    console.log(mainData)
} catch (err) {
    console.log(err);
    return err
}



