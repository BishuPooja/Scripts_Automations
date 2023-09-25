/**
 * Author: vikram
 * send alert mail and SMS to transporters when auction is created
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


var transporters = new Array()
const consignerPlace = ["SURAJPUR", "ROORKEE", "GUWHATI", "SILVASSA", "PUDUCHERRY", "HOWRAH", "KATHUA"]
const materialCodes = ["405773", "405795", "406535", "405796", "406434", "405774", "405775", "406225", "405797", "405255"]
const tubCodes = ["405798", "406181", "405799", "406227", "406160", "405261"]
const containerCodes = ["406582", "406137", "406371", "405711", "406554", "406604", "405826", "406585", "406580"]

async function main(auction) {
    try {
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
            "Vehicle Type (in MT)"
        ]
        let tableRows = ``

        if (auction.allowedTransporters.length) {
            let res = await setTransporterContact(auction.allowedTransporters)
            if (res == "error") return `Transporters not found`
        } else {
            console.log("No Transporters found")
            return `Transporters not found`
        }

        let allOrders = await getAllData(auction)
        if (allOrders.length) {
            for (order of allOrders) {
                var plantName = allOrders[0].plantName
                let state = order["State"] ? order["State"] : "N/A"
                var fromLocation = order["Dispatch From Location"]
                var toLocation = order["Dispatch To Town"]
                var mt = order["Total Weight"]
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
                    <td>${order["Vehicle Type"]}</td>
                </tr>
                `

                if (dipatchWiseMailContact[fromLocation]) {
                    newCc.push(dipatchWiseMailContact[fromLocation].mail)
                    newContact.push(dipatchWiseMailContact[fromLocation].mobile)
                }
            }
        }

        if (transporters.length) {
            for (let transporter of transporters) {
                let name = transporter?.name ?? "Sir"
                let email = transporter.email ?? null
                let contact = transporter?.contact ?? null
                let html = getHtml(header, tableRows, plantName)

                if (email && email.length && email[0]) {
                    let to = email
                    let cc = ["varunsharma@fena.com"]
                    cc = [...cc, ...newCc]
                    cc = _.uniq(cc)
                    let subject = "FRETRON | Freight Requirement"
                    console.log(`Sending mail to ${to}`)
                    let sendMail = await mailerWithoutExcel(to, cc, subject, html)
                    console.log(sendMail)
                } else {
                    console.log(`EmailId not found of trasnporter - ${name}`)
                }
                contact = [...newContact, contact]
                contact = _.uniq(contact)
                if (contact) {
                    let content = `Dear ${name} Transport\nPlease arrange Vehicle/s From ${fromLocation} To ${toLocation} for ${mt} MT\nFena Logistics Team -(${plantName})`
                    let smsSentRes = await sendSmsToTransporter(contact, content)
                    console.log(`smsSentRes  - ${smsSentRes}`)
                } else {
                    console.log(`Contact No. not found of transporter - ${name}`);
                }
            }
        } else {
            console.log(`Transporter contact details not found for orderId - ${auction.orderId}`);
        }
        //add remark
        let totalQty = allOrders.reduce((acc, val) => {
            acc["Bucket Quantity"] += val["Bucket Qty Without Unit"];
            acc["Tub Quantity"] += val["Tub Qty Without Unit"];
            acc["Container Quantity"] += val["Container Qty Without Unit"];
            return acc;
        },
            { "Bucket Quantity": 0, "Tub Quantity": 0, "Container Quantity": 0 });
        let remarks = `Bucket Quantity: ${totalQty["Bucket Quantity"]}Units, Tub Quantity: ${totalQty["Tub Quantity"]}Units, Container Quantity: ${totalQty["Container Quantity"]}Units.`;
        if (auction?.remarks?.length) remarks = remarks + " " + auction?.remarks[0];
        console.log(remarks);
        await setRemark(auction?.uuid, remarks);
    } catch (err) {
        console.log(`Caught Error in main: ${err.message}`)
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
            let containerWithoutQty = quantityMap["totalContainerWithoutQty"];
            let tubWithoutQty = quantityMap["totalTubWithoutQty"];
            let bucketWithoutQty = quantityMap["totalMaterialWithoutQty"];


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
                state = consigner.places[0]?.state ?? "N/A"
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
                // plantName = address?.city ?? "N/A"
            } else {
                console.log(`address not found of consigner ${"- " + consigner.name} `)
            }
            if (consigner.address) {
                var address = JSON.parse(consigner.address)
                plantName = address?.city ?? "N/A"
            } else {
                console.log(`address not found of consigner ${"- " + consigner.name} `)
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
                "plantName": plantName,
                "Container Qty Without Unit": containerWithoutQty,
                "Tub Qty Without Unit": tubWithoutQty,
                "Bucket Qty Without Unit": bucketWithoutQty,
            })

        } else {
            console.log(`Order not found for order id- ${orderId}`)
        }
    }

    return orderslist.length ? orderslist : null

    // Helping functions to getAllData --->>
    async function getOrdersByFuLineItemId(fuLineItemId) {
        let filter = {
            "_nested": {
                "_path": "lineItems",
                "_include_nested_hits": true,
                "lineItems.freightUnitLineItemIds": [fuLineItemId]
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
            "totalContainerQuantity": `${totalContainerQuantity} Units`,
            "totalContainerWithoutQty": totalContainerQuantity,
            "totalTubWithoutQty": totalTubQuantity,
            "totalMaterialWithoutQty": totalMaterialQuantity,
        }
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

async function getTransportersById(ids) {
    let url = `${FRT_PUB_BASE_URL}/business-partners/v2/admin/business-partners?ids=${ids.join(',')}`;
    console.log(url);
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

function getHtml(header, rows, plantName) {
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
                    padding:3px;
                }
                th{
                    background-color: #97f72a;
                }
            </style>
            <title>Document</title>
        </head>

        <body>
            <p>Dear Transporter :</p>
            <p>Please provide Freight Rate/s as per details mentioned below : </p>
            </br></br>
            <table>
            ${heading}  
            ${rows}  
            </table>
            </br></br>
            <p>Fena Logistics Team (${plantName})</p>
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
    console.log(phoneNumber)
    console.log(content)
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

async function setRemark(auctionId, payload) {
    let url = `${FRT_PUB_BASE_URL}/order-manager-v2/auctions/v1/auction/${auctionId}/remark`;
    let res = await rp({
        method: "POST",
        uri: url,
        json: true,
        headers: {
            Authorization: token,
        },
        body: { remark: payload },
    });
    console.log("Res status while adding remark" + JSON.stringify(res?.status));
    if (res.status == 200) {
        return res;
    } else {
        return res;
    }
}


try {
    await main($event)
} catch (err) {
    console.log(err);
    return err
}


