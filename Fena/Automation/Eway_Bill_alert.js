/**
 * Written By Harshit
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
console.log($event.shipmentNumber)

const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODUxMDQ1NjIsInVzZXJJZCI6ImJvdHVzZXItLTIwYzEwNzBiLWMwNzQtNDcxYS05NzA4LWU1MmZhZmEwNTdhZCIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTIwYzEwNzBiLWMwNzQtNDcxYS05NzA4LWU1MmZhZmEwNTdhZCIsIm9yZ0lkIjoiM2U0Y2RlZTktMGIzYi00NmRkLTliOTgtZGYwZTM4YTAyNzFjIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.Y3Lg4tmDXELG920JoEvAwUQQNva9H2fPvPbw5iXvfYY"




async function getOrderById(ORDER_ID) {
    let res = await rp({
        url: `${FRT_PUB_BASE_URL}/order-manager-v2/sales-orders/v1/order/${ORDER_ID}`,
        method: 'GET',
        json: true,
        headers: {
            authorization: token
        }
    })
    if (res.status == 200) {
        return res.data
    } else {
        return null
    }
}

async function forwardEmail(subject, to, cc, html) {
    await rp({
        uri: `${FRT_PUB_BASE_URL}/notifications/emails/email`,
        method: "POST",
        body: {
            cc: cc,
            to: to,
            subject: subject,
            html: html,
        },
        timeout: 2000,
        json: true,
    });
    return "mail sent successfully"
}

async function sendSmsToTransporter(mobileNumbers, content) {
    let res = await rp({
        method: "POST",
        uri: `${FRT_PUB_BASE_URL}/notifications/smsing/sms`,
        body: {
            to: mobileNumbers,
            content: content,
        },
        json: true,
    });
    return res;
}

async function main() {
    try {
        var consignments = $event.consignments

        if (!consignments) {
            return
        }
        let newCc = []
        let newContact = []
        let shALerts = $event.alerts
        let ewayBillAlert = shALerts.find(_ => _.type == "shipment.eway.bill.expiry.notification" && _.status == "OPEN")
        for (var data of $event.consignments) {
            var ewaybillNo = data.eWayBillNumber ?? "N/A"
            var invoice = data.consignmentNo ?? "N/A"
            var consignee = data.consignee?.name
            let tptName = $event.fleetInfo?.fleetOwner?.name ?? $event.fleetInfo?.broker?.name
            console.log(`tptName: ${tptName}`)
            var state = data.consignee.places[0].state
            let shDate = $event.shipmentDate
            let origin = $event.shipmentStages[0]?.place?.name ?? $event.shipmentStages[0]?.hub?.name
            let destination = _.last($event.shipmentStages)
            destination = destination?.place?.name ?? destination?.hub?.name
            let vehicleNo = $event.fleetInfo?.vehicle?.vehicleRegistrationNumber
            let ewayBillExpiryTime = data.eWayBillExpiryDate
            let ewayBillExpiryFormat = moment(ewayBillExpiryTime + 19800000).format("DD/MM/YY")
            let plantName = "N/A"
            if (data?.consigner?.address) {
                if (JSON.parse(data?.consigner?.address)?.city) {
                    plantName = JSON.parse(data?.consigner?.address)?.city
                }
            }
            let remainingHtml = ""
            if (data.orderMappings && data.orderMappings.length) {
                let uniqueOrders = _.uniqBy(data?.orderMappings, function (e) {
                    return e.orderId;
                });
                for (let order of uniqueOrders) {
                    let orderId = order.orderId
                    let orderRes = await getOrderById(orderId)
                    if (orderRes) {
                        let orderNo = orderRes.externalId
                        let orderDate = orderRes?.orderDate
                        orderDate = orderDate ? moment(orderDate).format("DD/MM/YY") : "N/A";
                        remainingHtml += `                  
                                <tr>
                                    <td>${orderDate ?? "N/A"}</td>
                                    <td>${orderNo ?? "N/A"}</td>
                                    <td>${invoice ?? "N/A"}</td>
                                    <td>${consignee ?? "N/A"}</td>
                                    <td>${origin ?? "N/A"}</td>
                                    <td>${destination ?? "N/A"}</td>
                                    <td>${state ?? "N/A"}</td>
                                    <td>${vehicleNo ?? "N/A"}</td>
                                    <td>${tptName ?? "N/A"}</td>
                                    <td>${ewaybillNo ?? "N/A"}</td>
                                    <td>${ewayBillExpiryFormat ?? "N/A"}</td>
                                </tr>                
                        `
                    }

                    if (dipatchWiseMailContact[origin]) {
                        newCc.push(dipatchWiseMailContact[origin].mail)
                        newContact.push(dipatchWiseMailContact[origin].mobile)
                    }
                }
            }

            var htmlString = `<html> 
            <head>
            <style>
                table,
                td,
                th,
                tr {
                    border: 1.5px solid #000000;
                    border-collapse: collapse;
                    padding: auto;
                    margin: 10px;
                }                
                th {
                    font-weight: bold;
                    background-color: rgb(10, 226, 10);
                }
            </style>           
        </head>
        <body>
        <p>Dear Team,</p>
        <p>E-way bill ${ewaybillNo} for invoice no. ${invoice} is going to expire in next 24 hours.
        Please extend using the link below -https://alpha.fretron.com
        </p><br>
        <table>
            <tr>
                <th>Order Date</th>
                <th>Order Number</th>
                <th>Invoice Number</th>
                <th>Consignee</th>
                <th>Dispatch From Location</th>
                <th>Dispatch To Town</th>
                <th>State</th>
                <th>Vehicle Number</th>
                <th>TPT Name</th>
                <th>Eway Bill No.</th>
                <th>Eway Bill Expiry Date</th>
            </tr>
            ${remainingHtml}
            </table><br>        
             <p>Fena</p>
            </body>
                </html>`
            let needToSendMail = !(shDate && ewayBillExpiryTime && ewayBillExpiryTime - shDate < 25 * 60 * 60 * 1000)
            console.log(`Sh : ${$event.shipmentNumber} , cn ${invoice} & needToSendEmail : ${needToSendMail}`)
            if (ewayBillAlert && true) {
                if (ewayBillAlert.description.includes(invoice)) {
                    let mailSubject = `E-way bill Near Expiry Of ${plantName}`
                    let toArr = ["skjha@fena.com", "sagar.soni@fretron.com"]
                    let ccArr = [...newCc]
                    ccArr = _.uniq(ccArr)
                    var emailRes = await forwardEmail(mailSubject, toArr, ccArr, htmlString)
                    console.log(emailRes);

                    // Sending SMS --->
                    let contacts = [...newContact, "9711442362", "8527438074"]
                    contacts = _.uniq(contacts)
                    let content = `Dear Team,\nE-way bill ${ewaybillNo} for invoice no. ${invoice} is going to expire in the next 24 hrs. Please extend using the link below -https://alpha.fretron.com\nFena`
                    console.log(`Sending SMS to ${contacts}`)

                    let smsSentRes = await sendSmsToTransporter(contacts, content)
                    console.log(`SMS sent - ${JSON.stringify(smsSentRes)} `)

                } else {
                    console.log("Not expire for " + invoice)
                }
            } else {
                console.log("no open eway bill alert")
            }
        }
    } catch (e) {
        console.log("Error executing automation- " + e.message)
    }
}

try {

    await main()
} catch (e) {
    console.log(e)
}
