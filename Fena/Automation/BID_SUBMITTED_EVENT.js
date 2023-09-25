/**
 * Author: Vikram
 * send alert mail from transporter to Fena Logistics Team when transporter submits a bid
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

try {
    var transporters = new Array()
    async function main(auction) {
        let newCc = []

        var header = [
            "Order Number",
            "Dispatch From Location",
            "Dispatch To Town",
            "State",
            "Total Weight",
            // "Vehicle Type",
            "Bid Amount"
        ]
        let tableRows = ``

        var bidAmount = null
        if (auction.bids && auction.bids.length) {
            bidPlaced = auction.bids.reverse().find(v => v.status != null)
        }
        if (bidPlaced) {
            bidAmount = bidPlaced.amount
            let res = await setTransporterContact(bidPlaced.businessPartnerId)
            if (res == "error") return `Transporters not found`
        }

        let allOrders = await getAllData(auction)
        if (allOrders && allOrders.length) {
            for (order of allOrders) {
                var plantName = allOrders[0].plantName
                let state = order["State"] ? order["State"] : "N/A"
                tableRows += `
                <tr>
                    <td>${order["Order Number"]}</td>
                    <td>${order["Dispatch From Location"]}</td>
                    <td>${order["Dispatch To Town"]}</td>
                    <td>${state}</td>
                    <td>${order["Total Weight"]}</td>
                    
                    <td>${bidAmount}</td>
                </tr>
                `
                let fromLocation = order["Dispatch From Location"]
                if (dipatchWiseMailContact[fromLocation]) {
                    newCc.push(dipatchWiseMailContact[fromLocation].mail)
                }
            }
        } else {
            console.log(`No order found for orderId- ${auction.orderId}`)
        }


        if (transporters.length) {
            for (let transporter of transporters) {
                let name = transporter?.name ?? "Sir"
                let email = transporter.email ?? null
                let html = getHtml(header, tableRows, name, plantName)

                if (email && email.length && email[0] && email[0].length) {
                    let from = email[0]
                    let cc = [...newCc]
                    cc = _.uniq(cc)
                    let to = ["varunsharma@fena.com"]
                    let subject = "FRETRON | Bid Submitted"
                    console.log(`Sending mail from ${from} to ${to}`)
                    let sendMail = await mailerWithoutExcel(to, cc, subject, html, from)
                    console.log(sendMail)
                } else {
                    console.log(`EmailId not found of trasnporter - ${name}`)
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
                let quantity = getTotalQuantity(mappings)
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
                    state = consigner.places[0]?.state ?? "N/A"
                }
                let plantName = consigner?.name ?? "N/A"
                if (consigner.address) {
                    let address = JSON.parse(consigner.address)
                    // plantName = address?.city ?? "N/A"
                } else {
                    console.log(`address not found of consigner ${"- " + consigner.name} `)
                }
                if (consignee.address) {
                    let address = JSON.parse(consignee.address)
                    if (state == "N/A") {
                        state = address?.state ?? "N/A"
                    }
                } else {
                    console.log(`address not found of consigner ${"- " + consigner.name} `)
                }

                orderslist.push({
                    "Order Number": orderNumber,
                    "Dispatch From Location": dispatchFrom,
                    "Dispatch To Town": dispatchTo,
                    "State": state,
                    "Total Weight": quantity,
                    "Vehicle Type": vehicleType,
                    "plantName": plantName
                })

            } else {
                console.log(`Order not found for order id- ${orderId}`)
            }
        }

        return (orderslist && orderslist.length) ? orderslist : null

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


        function getTotalQuantity(mappings) {
            let weightQuantity = 0.0
            let packageQuantity = 0.0

            for (let mapping of mappings) {

                if (mapping.quantity.weight) {
                    weightQuantity = weightQuantity + mapping.quantity.weight.netQuantity
                }
                if (mapping.quantity.packageMeasurement) {
                    packageQuantity = packageQuantity + mapping.quantity.packageMeasurement.netQuantity
                }
            }
            let quantity = ''
            if (weightQuantity > 0.0) {
                quantity = `${weightQuantity.toFixed(2)} MT`
            }
            if (packageQuantity > 0.0) {
                quantity = quantity.length > 0 ? quantity + `| ${packageQuantity} Units` : `${packageQuantity} Units`
            }
            return quantity

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
                }
                transporters.push({
                    "name": name,
                    "email": emailId,
                })
            }
        } else {
            console.log(`Transporters not found`);
            return "error"
        }
    }

    async function getTransportersById(id) {
        let url = `${FRT_PUB_BASE_URL}/business-partners/v2/admin/business-partners?ids=${id}`;
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
            <p>Fena Logistics Team (${plantName})</p>
            <p>Bid has been Submitted successfully for the following Order/s</p>
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

    async function mailerWithoutExcel(to, cc, subject, html, sender) {
        try {
            await rp({
                url: `${FRT_PUB_BASE_URL}/notifications/emails/email`,
                method: "POST",
                json: true,
                body: {
                    sender: sender,
                    to: to,
                    cc: cc,
                    subject: subject,
                    html: html,
                },
            });
            return "Mail Sent Successfully";
        } catch (error) {
            return `Error sending mail- ${error}`;
        }
    }


    await main($event)
} catch (err) {
    console.log(`Caught some error - ${err}`);
    return err
}


