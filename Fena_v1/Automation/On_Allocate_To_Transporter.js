/**
 * Author: Vikram
 * Send alert mail and SMS from Fena logistics team to transporter on vehicle request
 * Set CF - Allocation Time
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
async function main(freightUnit) {
    let newCc = []
    let newContact = []
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
        "Total Containers"
        // "Vehicle Type (in MT)",
        //"Freight (Per Vehicle)"
    ]
    let tableRows = ``
    console.log(`freightUnit document number - ${freightUnit.documentNumber}`);

    // let cfAddRes = await setAllocationTimeCF(freightUnit.uuid, Date.now())
    // console.log(cfAddRes);
    let res = await setTransporterContact(freightUnit)
    if (res == "error") return `Tranporter not found`

    let allOrders = await getAllData(freightUnit)

    var totalWeight = 0
    if (allOrders && allOrders.length) {
        var plantName = allOrders[0].plantName
        console.log(`plant name - ${plantName}`)
        for (let order of allOrders) {
            var state = order["State"]
            var fromLocation = order["Dispatch From Location"]
            var toLocation = order["Dispatch To Town"]
            var vehType = order["Vehicle Type"]
            var freight = order["freight"]
            totalWeight += Number(order["Total Weight"])
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
                </tr>
                
            `
            // if (allOrders.indexOf(order) == 0) {
            //     tableRows += `<td>${order["freight"]}</td>
            //     </tr>`
            // } else {
            //     tableRows += `<td></td>
            //     </tr>`
            // }

            if (dipatchWiseMailContact[fromLocation]) {
                newCc.push(dipatchWiseMailContact[fromLocation].mail)
                newContact.push(dipatchWiseMailContact[fromLocation].mobile)
            }
        }
    } else {
        console.log(`No order found for fu.documentNumber- ${freightUnit.documentNumber}`)
        return `No order found for fu.documentNumber- ${freightUnit.documentNumber}`
    }

    // sending email to transporters -->
    if (transporterEmail && transporterEmail[0].length) {
        let html = getHtml(header, tableRows, transporterName, plantName, totalWeight)
        // let from = "varunsharma@fena.com"
        let to = transporterEmail
        let cc1 = [...newCc, ...cc, ...["varunsharma@fena.com", "shankararya@fena.com", "sagar.soni@fretron.com"]]
        cc1 = _.uniq(cc1)
        let subject = `FRETRON | Fena ~ Vehicle Requirement by ${plantName}`

        console.log(`Sending mail to ${to}`)
        let sendMail = await mailerWithoutExcel(to, cc1, subject, html)
        console.log(sendMail)
    } else {
        console.log(`Transporter email details not found for fu.documentNumber - ${freightUnit.documentNumber}`);
    }

    // sending SMS to transporter
    transporterContact = [transporterContact, ...newContact]
    transporterContact = _.uniq(transporterContact)
    if (transporterContact) {
        let content = `Dear ${transporterName} Transport Please arrange for Vehicle to load From ${fromLocation} To ${toLocation} vehicle type ${vehType}MT Freight will be ${freight} Fena Logistics Team -${plantName}`;

        console.log(`Sending SMS to ${transporterContact}`)
        console.log(`Content - ${content} `)
        let smsSentRes = await sendSmsToTransporter(transporterContact, content)
        console.log(`SMS sent - ${JSON.stringify(smsSentRes)} `)
    } else {
        console.log(`Transporter mobileNo not found for fu.documentNumber - ${freightUnit.documentNumber}`);
    }
}

// Helping functions --->
async function getAllData(fu) {
    let orderslist = new Array()

    var freight = 0
    fu.lineItems.map((v => { freight += v.expectedFreightINR }))

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

    let mappingsByOrderId = fuLineItem?.salesOrderMappings.reduce((pv, cv) => {
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
            // let orderDate = order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"
            let orderDate = "N/A"
            if (order.orderDate) {
                orderDate = formatDateFromEpoch(order.orderDate / 1000)
                // orderDate = `${new Date(order.orderDate).getDate()}/${new Date(order.orderDate).getMonth()+ 1 }/${new Date(order.orderDate).getFullYear()}`
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
            let plantName = "N/A"
            if (consignee.address) {
                var address = JSON.parse(consignee.address)
                if (state == "N/A") {
                    state = address?.state ?? "N/A"
                }
                //plantName = address?.city ?? "N/A"
            } else {
                console.log(`address not found of consigner ${"- " + consigner.name} `)
            }
            plantName = consigner?.name
            if (consigner.address) {
                var address = JSON.parse(consigner.address)
                // plantName = address?.city ?? "N/A"
            } else {
                console.log(`address not found of consigner ${"- " + consigner.name} `)
            }
            if (dispatchFrom.toUpperCase() == "SURAJPUR") {
                cc = ["rksharma@fena.com"]
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
                "freight": freight,
                "consignee": consigneeName,
                "OrderDate": orderDate
            })

        }
    }

    return orderslist

    // Helping functions to getAllData --->>
    async function getOrdersByFuLineItemId(fuLineItenId) {
        let filter = {
            "_nested": {
                "_path": "lineItems",
                "_include_nested_hits": true,
                "lineItems.freightUnitLineItemIds": [fuLineItenId],
            }
        }
        // let allFields = ["orderNumber", "orderDate", "externalId", "lineItems.mappings.orderId", "allowedLoadTypes", "lineItems.consignee.name", "lineItems.consignee.places", "lineItems.consigner.name", "lineItems.consignee.address", "lineItems.consigner.address", "lineItems.consigner.places", "lineItems.loadInfo", "lineItems.material.externalId", "lineItems.uuid", "uuid"]
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

}

function getHtml(header, rows, transporter, plantName, totalWeight) {
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
            <p>Dear ${transporter}:</p>
            <p>Please arrange Vehicle/s as per details mentioned below for total weight ${totalWeight}:</p>
            </br></br>
            <table>
            ${heading}  
            ${rows}  
            </table>
            </br></br>
            <p>From : Fena Logistics Team (${plantName})</p>
        </body>
        </html>
        `
    return html
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
                    if (v.emails && v.emails.length && v.emails[0] != "null") return v.emails[0]
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
        console.log(`transporterId not found in freightUnit`)
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
        console.log(`error getting transporter - ${err}`)
        return null
    })
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

async function sendSmsToTransporter(mobileNumber, content) {
    let res = await rp({
        method: "post",
        uri: `${FRT_PUB_BASE_URL}/notifications/smsing/sms`,
        body: {
            to: mobileNumber,
            content: content,
        },
        json: true,
    });
    return res;
}

async function getFuByOrderId(fuUuid, token) {
    try {
        return await rp({
            url: `${FRT_PUB_BASE_URL}/order-manager-v2/freight-units/v1/freight-unit/${fuUuid}`,
            json: true,
            method: "GET",
            headers: {
                Authorization: token
            }
        }).then(res => {
            if (res && res.data) {
                return res.data
            } else {
                console.log(`Freight unit not found for order id- ${res.error}`)
                return null
            }
        }).catch(err => {
            console.log(err)
            return null
        })

    } catch (error) {
        console.log(error)
        return null
    }
}

async function setAllocationTimeCF(fuId, allocationTime) {
    try {
        let payload = [
            {
                "indexedValue": [],
                "fieldKey": "Allocation Time",
                "multiple": false,
                "description": "Transporter Allocation Time",
                "remark": "",
                "uuid": null,
                "required": false,
                "accessType": null,
                "input": "date",
                "unit": null,
                "valueType": "string",
                "options": [],
                "fieldType": "date",
                "value": allocationTime,
                "isRemark": false
            }
        ]
        let url = `${FRT_PUB_BASE_URL}/order-manager-v2/freight-units/v1/custom-fields?uuid=${fuId}`
        let res = await rp({
            url: url,
            json: true,
            method: "PUT",
            body: payload,
            headers: { Authorization: token }
        })

        if (res && res?.data) return `cf-Transporter Allocation Time Added to FU`
        console.log(res?.error)
        return `cf-Transporter Allocation Time NOT ADDED to FU`
    } catch (err) {
        console.log(`Caught Error: ${err.message}`)
    }
}


try {
    console.log('Hit...wait for delay 5 sec')
    await delay(5000)
    // wait for 5 sec until freight updated in freight unit
    // Get fu by Id
    let fuUuid = $event.uuid
    let freshFreightUnit = await getFuByOrderId(fuUuid, token)



    if (freshFreightUnit) {
        await main(freshFreightUnit)
    } else {
        console.log("Error getting freight unit")
        return "Error getting freight unit"
    }

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