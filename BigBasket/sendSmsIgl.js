// // const rp = require("request-promise")
// // const moment = require("moment")
// // const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODExODk1MjQsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiI0NzJiM2M1MS1kOGU5LTQyOTQtOGE3Zi1hNjkwOTNiNTA1YjciLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.MslKTgBMJ0VET7NriGRaeXhnO2T2_7K0JkI1Wi2QGms"

// // let contacts2 = [{ "mobileNumbers": ["8569977915", "8808068811"] }]

// // var FRT_PUB_BASE_URL = "http://apis.fretron.com"

// // async function forwardEmail(subject, to, cc, html) {
// //     try {
// //         console.log("Sending email with SUB: " + subject);
// //         await rp({
// //             uri: `${FRT_PUB_BASE_URL}/notifications/emails/email`,
// //             method: "POST",
// //             body: {
// //                 cc: cc,
// //                 to: to,
// //                 subject: subject,
// //                 html: html,
// //             },
// //             timeout: 15000,
// //             json: true,
// //         });
// //         return "Mail Sent"

// //     } catch (e) {
// //         console.log("Error while forwarding email");
// //     }
// // }

// // async function sendSms(consingeeMobile, content) {
// //     try {
// //         let smsRes = await rp({
// //             uri: `${FRT_PUB_BASE_URL}/notifications/smsing/sms`,
// //             method: "POST",
// //             body: {
// //                 to: consingeeMobile,
// //                 content: content
// //             },
// //             json: true,
// //             headers: {
// //                 Authorization: token
// //             }
// //         })
// //         return smsRes
// //     }
// //     catch (e) {
// //         console.log("error while sending sms ", e.message);
// //     }
// // }

// // async function getConsignmentTrackingLink(cnUUid) {
// //     var payload = {
// //         "consignmentId": cnUUid,
// //         "uiRestrictions": {
// //             "cnInfo": {
// //                 "consignmentNo": true,
// //                 "vehicleInfo": true,
// //                 "materialInfo": true,
// //                 "consignor": true,
// //                 "consignee": true,
// //                 "origin": true,
// //                 "destination": true,
// //                 "customer": true,
// //                 "valuOfGoods": false,
// //                 "currentStatus": true,
// //                 "currentAddress": true
// //             },
// //             "epod": {
// //                 "upload": true,
// //                 "timing": true,
// //                 "feeding": true,
// //                 "otpToDriver": true,
// //                 "unloadingStart": false,
// //                 "unloadingEnd": true,
// //                 "reportingTime": true,
// //                 "vehicleReleaseTime": false,
// //                 "unloadingCharge": true,
// //                 "isMandateTiming": true,
// //                 "isMandateFeeding": true,
// //                 "markManually": true
// //             },
// //             "map": true,
// //             "liveTracking": true,
// //             "updateTracking": true,
// //             "miscFields": false,
// //             "customFields": []
// //         }
// //     };
// //     var res = await rp({
// //         method: "POST",
// //         uri: `${FRT_PUB_BASE_URL}/sharing-utils/v1/share-cn`,
// //         body: payload,
// //         json: true,
// //         headers: { "Authorization": "Beaer " + token, "Content-Type": "application/json" }
// //     });
// //     if (res.data != null) {
// //         return "https://alpha.fretron.com/trip-share/vehicleLocation/consignment?code=" + res.data
// //     } else {
// //         console.log("Issue while fetching the consignment tracking link: " + res.error)
// //         return ""
// //     }
// // }

// // function getFromCf(cfs, key) {
// //     if (cfs == null) {
// //         return null
// //     } else {
// //         let found = cfs.find(v => v.fieldKey == key)
// //         return found ? found.value : null
// //     }
// // }

// // async function main(sh) {
// //     let shNo = sh.shipmentNumber
// //     console.log(`shNo  ${shNo}`);
// //     let shId = sh.uuid
// //     let vehicleNo = sh.fleetInfo?.vehicle?.vehicleRegistrationNumber
// //     let shDate = moment(new Date(Number(sh.creationTime))).format("DD-MM-YYYY HH:mm:ss")
// //     let stages = sh?.shipmentStages
// //     let origin = ""
// //     let destination = ""
// //     let to = ["pooja.bishu@fretron.com"]
// //     let cc = []

// //     let mailSentRes = ''
// //     let cfs = sh.customFields.length ? sh.customFields : null
// //     let type_cf = getFromCf(cfs, "Type")
// //     let vehicleType_cf = getFromCf(cfs, "Vehicle Type")
// //     if (type_cf == "Outbound") {


// //         if (stages && stages.length) {
// //             if (sh.shipmentTrackingStatus == "Enroute For Delivery" && stages[0].status == "COMPLETED" && stages[1].status == "UPCOMING") {
// //                 let originPlace = stages[0].place ? stages[0].place : stages[0].hub
// //                 origin = originPlace.name
// //                 origin = origin.split("-")[0]

// //                 if (stages.length == 3 && type_cf == "Outbound" && vehicleType_cf == "Dedicated") {
// //                     let destinationDedicated = (stages[stages.length - 2]?.place) ? (stages[stages.length - 2]?.place) : stages[stages.length - 2]?.hub
// //                     destination = destinationDedicated.name
// //                     destination = destination.split("-")[0]
// //                 }
// //                 else {
// //                     let destinationPlace = (stages[stages.length - 1]?.place) ? (stages[stages.length - 1]?.place) : stages[stages.length - 1]?.hub
// //                     destination = destinationPlace.name
// //                     destination = destination.split("-")[0]
// //                 }
// //                 if (origin == destination) {
// //                     let destinationNotDedicated = (stages[stages.length - 2]?.place) ? (stages[stages.length - 2]?.place) : stages[stages.length - 2]?.hub
// //                     destination = destinationNotDedicated.name
// //                     destination = destination.split("-")[0]
// //                 }

// //                 let html =
// //                     `<html>
// //                     <head>
// //                     <body>
// //                     <p>Dear Sir</p>
// //                     <p>Please find below details :-</p>
// //                     <p>shipmentNumber:- ${shNo ?? "N/A"} </p>
// //                     <p>shipmentDate:- ${shDate ?? "N/A"} </p>
// //                     <p>Vehicle Number:- ${vehicleNo ?? "N/A"} </p>
// //                     <p>origin:- ${origin ?? "N/A"} </p>
// //                     <p>Destination:- ${destination ?? "N/A"} </p>
// //                     </body>
// //                     </head>
// //                     </html>`
// //                 let cn = sh?.consignments
// //                 if (cn && cn.length) {
// //                     for (item of cn) {
// //                         let cnId = item.uuid
// //                         let cnNo = item.consignmentNo
// //                         let consignmentTrackingLink = await getConsignmentTrackingLink(cnId)
// //                         let consignee = item.consignee
// //                         let contacts = contacts2

// //                         let smsContent = `Shipment No. - ${shNo ?? "NAN"} Shipment Date. - ${shDate ?? "NAN"} Vehicle No. - ${vehicleNo ?? "NAN"} Shipment origin. - ${origin ?? "NAN"} Destination - ${destination ?? "NAN"} Link - ${consignmentTrackingLink} FRETRON`

// //                         console.log(smsContent)


// //                         if (contacts && contacts.length) {
// //                             console.log(contacts);
// //                             for (let value of contacts) {
// //                                 let mobileNumbers = value?.mobileNumbers
// //                                 if (mobileNumbers && mobileNumbers.length) {
// //                                     for (let no of mobileNumbers) {
// //                                         let mobileNo = no
// //                                         console.log(mobileNo);
// //                                         let smsSentRes = await sendSms(mobileNo, smsContent)
// //                                         console.log(smsSentRes);
// //                                     }
// //                                 }
// //                                 else {
// //                                     subject = `MobileNo Not Found ConsignmentNo ${cnNo}`
// //                                     mailSentRes = await forwardEmail(subject, to, cc, html)
// //                                     console.log(mailSentRes)
// //                                     // send mail
// //                                 }
// //                             }
// //                         }
// //                         else {
// //                             subject = `Contacts Not Found ConsignmentNo ${cnNo}`
// //                             mailSentRes = await forwardEmail(subject, to, cc, html)
// //                             console.log(mailSentRes)
// //                             // send mail
// //                         }
// //                     }
// //                 }
// //                 else {
// //                     // send mail
// //                     subject = `Consignment Not Found ShipmentNo ${shNo}`
// //                     mailSentRes = await forwardEmail(subject, to, cc, html)
// //                     console.log(mailSentRes);
// //                 }
// //             }
// //             else {
// //                 console.log(`Shipment not mark departed ${shNo}`)
// //             }
// //         }
// //     }
// //     else {
// //         console.log(`Not outbound case ${shNo}`);
// //     }

// // }


// // main($event)


// const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODA4NjYwMjAsInVzZXJJZCI6ImJvdHVzZXItLTg0OTEzYjZkLWVhMzktNGQ3OC1iOGEyLTMyZjMxODk5ZmM1MSIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTg0OTEzYjZkLWVhMzktNGQ3OC1iOGEyLTMyZjMxODk5ZmM1MSIsIm9yZ0lkIjoiNDcyYjNjNTEtZDhlOS00Mjk0LThhN2YtYTY5MDkzYjUwNWI3IiwibmFtZSI6IkFETUlOIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.9cdW2HbIp8v2vPZMjSOX_Kemt5L_ThsooACoyImpEWE"
// const contacts2 = [{ "mobileNumbers": ["8955117003", "9717922297" ,"8569977915", "8808068811", "8506888327"] }]
// // ,"8569977915", "8808068811", "8506888327"
// async function forwardEmail(subject, to, cc, html) {
//     try {
//         console.log("Sending email with SUB: " + subject);
//         await rp({
//             uri: `${FRT_PUB_BASE_URL}/notifications/emails/email`,
//             method: "POST",
//             body: {
//                 cc: cc,
//                 to: to,
//                 subject: subject,
//                 html: html,
//             },
//             timeout: 15000,
//             json: true,
//         });
//         return "Mail Sent"

//     } catch (e) {
//         console.log("Error while forwarding email");
//     }
// }

// async function sendSms(consingeeMobile, content) {
//     try {
//         let smsRes = await rp({
//             uri: `${FRT_PUB_BASE_URL}/notifications/smsing/sms`,
//             method: "POST",
//             body: {
//                 to: consingeeMobile,
//                 content: content
//             },
//             json: true,
//             headers: {
//                 Authorization: token
//             }
//         })
//         return smsRes
//     }
//     catch (e) {
//         console.log("error while sending sms ", e.message);
//     }
// }

// async function getConsignmentTrackingLink(cnUUid) {
//     var payload = {
//         "consignmentId": cnUUid,
//         "uiRestrictions": {
//             "cnInfo": {
//                 "consignmentNo": true,
//                 "vehicleInfo": true,
//                 "materialInfo": true,
//                 "consignor": true,
//                 "consignee": true,
//                 "origin": true,
//                 "destination": true,
//                 "customer": true,
//                 "valuOfGoods": false,
//                 "currentStatus": true,
//                 "currentAddress": true
//             },
//             "epod": {
//                 "upload": true,
//                 "timing": true,
//                 "feeding": true,
//                 "otpToDriver": true,
//                 "unloadingStart": false,
//                 "unloadingEnd": true,
//                 "reportingTime": true,
//                 "vehicleReleaseTime": false,
//                 "unloadingCharge": true,
//                 "isMandateTiming": true,
//                 "isMandateFeeding": true,
//                 "markManually": true
//             },
//             "map": true,
//             "liveTracking": true,
//             "updateTracking": true,
//             "miscFields": false,
//             "customFields": []
//         }
//     };
//     var res = await rp({
//         method: "POST",
//         uri: `${FRT_PUB_BASE_URL}/sharing-utils/v1/share-cn`,
//         body: payload,
//         json: true,
//         headers: { "Authorization": "Beaer " + token, "Content-Type": "application/json" }
//     });
//     if (res.data != null) {
//         return "https://alpha.fretron.com/trip-share/vehicleLocation/consignment?code=" + res.data
//     } else {
//         console.log("Issue while fetching the consignment tracking link: " + res.error)
//         return ""
//     }
// }

// function getFromCf(cfs, key) {
//     if (cfs == null) {
//         return null
//     } else {
//         let found = cfs.find(v => v.fieldKey == key)
//         return found ? found.value : null
//     }
// }

// async function main(sh) {
//     let shNo = sh.shipmentNumber
//     console.log(`shNo  ${sh.shipmentNumber}`);
//     let cfs = sh.customFields
//     let type_cf = getFromCf(sh.customFields, "Type")
//     if ((sh.shipmentTrackingStatus == "Enroute For Delivery" || sh.shipmentTrackingStatus == "Departed From Pickup Point") && type_cf == "Outbound") {
//         let vehicleNo = sh.fleetInfo?.vehicle?.vehicleRegistrationNumber
//         let shDate = moment(new Date(Number(sh.creationTime))).format("DD-MM-YYYY HH:mm:ss")
//         let stages = sh?.shipmentStages
//         let origin = ""
//         let destination = ""
//         let to = ["pooja.bishu@fretron.com"]
//         let cc = []

//         let mailSentRes = ''
//         let vehicleType_cf = getFromCf(cfs, "Vehicle Type")
//         if (stages && stages.length) {
//             if (stages[0].status == "COMPLETED" && stages[1].status == "UPCOMING") {
//                 let originPlace = stages[0].place ? stages[0].place : stages[0].hub
//                 origin = originPlace.name
//                 origin = origin.split("-")[0]

//                 if (stages.length == 3 && type_cf == "Outbound" && vehicleType_cf == "Dedicated") {
//                     let destinationDedicated = (stages[stages.length - 2]?.place) ? (stages[stages.length - 2]?.place) : stages[stages.length - 2]?.hub
//                     destination = destinationDedicated.name
//                     destination = destination.split("-")[0]
//                 }
//                 else {
//                     let destinationPlace = (stages[stages.length - 1]?.place) ? (stages[stages.length - 1]?.place) : stages[stages.length - 1]?.hub
//                     destination = destinationPlace.name
//                     destination = destination.split("-")[0]
//                 }
//                 if (origin == destination) {
//                     let destinationNotDedicated = (stages[stages.length - 2]?.place) ? (stages[stages.length - 2]?.place) : stages[stages.length - 2]?.hub
//                     destination = destinationNotDedicated.name
//                     destination = destination.split("-")[0]
//                 }

//                 let html =
//                     `<html>
//                 <head>
//                 <body>
//                 <p>Dear Sir</p>
//                 <p>Please find below details :-</p>
//                 <p>shipmentNumber:- ${shNo ?? "N/A"} </p>
//                 <p>shipmentDate:- ${shDate ?? "N/A"} </p>
//                 <p>Vehicle Number:- ${vehicleNo ?? "N/A"} </p>
//                 <p>origin:- ${origin ?? "N/A"} </p>
//                 <p>Destination:- ${destination ?? "N/A"} </p>
//                 </body>
//                 </head>
//                 </html>`
//                 let cn = sh?.consignments
//                 if (cn && cn.length) {
//                     for (item of cn) {
//                         let cnId = item.uuid
//                         let cnNo = item.consignmentNo
//                         let consignmentTrackingLink = await getConsignmentTrackingLink(cnId)
//                         let consignee = item.consignee
//                         let contacts = contacts2

//                         let smsContent = `Shipment No. - ${shNo ?? "NAN"} Shipment Date. - ${shDate ?? "NAN"} Vehicle No. - ${vehicleNo ?? "NAN"} Shipment origin. - ${origin ?? "NAN"} Destination - ${destination ?? "NAN"} Link - ${consignmentTrackingLink} `


//                         if (contacts && contacts.length) {
//                             for (let value of contacts) {
//                                 let mobileNumbers = value?.mobileNumbers
//                                 if (mobileNumbers && mobileNumbers.length) {
//                                     console.log(mobileNumbers)
//                                     for (let no of mobileNumbers) {
//                                         let mobileNo = no
//                                         await sendSms(mobileNo, smsContent)
//                                     }
//                                 }
//                                 else {
//                                     subject = `MobileNo Not Found ConsignmentNo ${cnNo}`
//                                     mailSentRes = await forwardEmail(subject, to, cc, html)
//                                     // send mail
//                                 }
//                             }
//                         }
//                         else {
//                             subject = `Contacts Not Found ConsignmentNo ${cnNo}`
//                             mailSentRes = await forwardEmail(subject, to, cc, html)
//                             // send mail
//                         }
//                     }
//                 }
//                 else {
//                     // send mail
//                     subject = `Consignment Not Found ShipmentNo ${shNo}`
//                     mailSentRes = await forwardEmail(subject, to, cc, html)
//                 }
//             }
//         }

//     } else {
//         console.log("tracking Status: " + sh.shipmentTrackingStatus + "type: " + type_cf)
//     }

// }

// async function main2(sh) {
//     let shNo = sh.shipmentNumber
//     console.log(`shNo  ${sh.shipmentNumber}`);
//     let cfs = sh.customFields
//     let type_cf = getFromCf(cfs, "Type")
//     let vehicleType_cf = getFromCf(cfs, "Vehicle Type")

//     if ((sh.shipmentTrackingStatus == "Enroute For Delivery" || sh.shipmentTrackingStatus == "Departed From Pickup Point") && type_cf == "Outbound" && vehicleType_cf == "Dedicated") {
//         let vehicleNo = sh.fleetInfo?.vehicle?.vehicleRegistrationNumber
//         let shDate = moment(new Date(Number(sh.creationTime))).format("DD-MM-YYYY HH:mm:ss")
//         let stages = sh?.shipmentStages
//         let origin = ""
//         let destination = ""
//         let contacts = contacts2
//         if (stages && stages.length) {
//             if (stages[0].status == "COMPLETED" && stages[1].status == "UPCOMING") {
//                 let originPlace = stages[0].place ? stages[0].place : stages[0].hub
//                 origin = originPlace.name
//                 origin = origin.split("-")[0]

//                 if (stages.length == 3 && vehicleType_cf == "Dedicated") {
//                     let destinationDedicated = (stages[stages.length - 2]?.place) ? (stages[stages.length - 2]?.place) : stages[stages.length - 2]?.hub
//                     destination = destinationDedicated.name
//                     destination = destination.split("-")[0]
//                 }
//                 else {
//                     let destinationPlace = (stages[stages.length - 1]?.place) ? (stages[stages.length - 1]?.place) : stages[stages.length - 1]?.hub
//                     destination = destinationPlace.name
//                     destination = destination.split("-")[0]
//                 }
//                 if (origin == destination) {
//                     let destinationNotDedicated = (stages[stages.length - 2]?.place) ? (stages[stages.length - 2]?.place) : stages[stages.length - 2]?.hub
//                     destination = destinationNotDedicated.name
//                     destination = destination.split("-")[0]
//                 }
//                 let consignmentTrackingLink = `https://alpha.fretron.com/shared-shipment/v2?${sh.uuid}`


//                 let smsContent = `Shipment No. - ${shNo ?? "NAN"} Shipment Date. - ${shDate ?? "NAN"} Vehicle No. - ${vehicleNo ?? "NAN"} Shipment origin. - ${origin ?? "NAN"} Destination - ${destination ?? "NAN"} Link - ${consignmentTrackingLink ?? "N/A"} FRETRON`

//                 if (contacts && contacts.length) {
//                     for (let value of contacts) {
//                         let mobileNumbers = value?.mobileNumbers
//                         if (mobileNumbers && mobileNumbers.length) {
//                             console.log(mobileNumbers)
//                             for (let no of mobileNumbers) {
//                                 let mobileNo = no
//                                 await sendSms(mobileNo, smsContent)
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     } else {
//         console.log("tracking Status: " + sh.shipmentTrackingStatus + "  type: " + type_cf + "  vehicleType_cf : "+vehicleType_cf)
//     }
// }


// try {
//     await main2($event)
// } catch (error) {
//     console.log("Error in sending sms or email "+error)

// }

const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODA4NjYwMjAsInVzZXJJZCI6ImJvdHVzZXItLTg0OTEzYjZkLWVhMzktNGQ3OC1iOGEyLTMyZjMxODk5ZmM1MSIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTg0OTEzYjZkLWVhMzktNGQ3OC1iOGEyLTMyZjMxODk5ZmM1MSIsIm9yZ0lkIjoiNDcyYjNjNTEtZDhlOS00Mjk0LThhN2YtYTY5MDkzYjUwNWI3IiwibmFtZSI6IkFETUlOIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.9cdW2HbIp8v2vPZMjSOX_Kemt5L_ThsooACoyImpEWE"
const contacts2 = [{ "mobileNumbers": ["8955117003", "9717922297"] }]
async function forwardEmail(subject, to, cc, html) {
    try {
        console.log("Sending email with SUB: " + subject);
        await rp({
            uri: `${FRT_PUB_BASE_URL}/notifications/emails/email`,
            method: "POST",
            body: {
                cc: cc,
                to: to,
                subject: subject,
                html: html,
            },
            timeout: 15000,
            json: true,
        });
        return "Mail Sent"

    } catch (e) {
        console.log("Error while forwarding email");
    }
}

async function sendSms(consingeeMobile, content) {
    try {
        let smsRes = await rp({
            uri: `${FRT_PUB_BASE_URL}/notifications/smsing/sms`,
            method: "POST",
            body: {
                to: consingeeMobile,
                content: content
            },
            json: true,
            headers: {
                Authorization: token
            }
        })
        return smsRes
    }
    catch (e) {
        console.log("error while sending sms ", e.message);
    }
}

async function getConsignmentTrackingLink(cnUUid) {
    var payload = {
        "consignmentId": cnUUid,
        "uiRestrictions": {
            "cnInfo": {
                "consignmentNo": true,
                "vehicleInfo": true,
                "materialInfo": true,
                "consignor": true,
                "consignee": true,
                "origin": true,
                "destination": true,
                "customer": true,
                "valuOfGoods": false,
                "currentStatus": true,
                "currentAddress": true
            },
            "epod": {
                "upload": true,
                "timing": true,
                "feeding": true,
                "otpToDriver": true,
                "unloadingStart": false,
                "unloadingEnd": true,
                "reportingTime": true,
                "vehicleReleaseTime": false,
                "unloadingCharge": true,
                "isMandateTiming": true,
                "isMandateFeeding": true,
                "markManually": true
            },
            "map": true,
            "liveTracking": true,
            "updateTracking": true,
            "miscFields": false,
            "customFields": []
        }
    };
    var res = await rp({
        method: "POST",
        uri: `${FRT_PUB_BASE_URL}/sharing-utils/v1/share-cn`,
        body: payload,
        json: true,
        headers: { "Authorization": "Beaer " + token, "Content-Type": "application/json" }
    });
    if (res.data != null) {
        return "https://alpha.fretron.com/trip-share/vehicleLocation/consignment?code=" + res.data
    } else {
        console.log("Issue while fetching the consignment tracking link: " + res.error)
        return ""
    }
}

function getFromCf(cfs, key) {
    if (cfs == null) {
        return null
    } else {
        let found = cfs.find(v => v.fieldKey == key)
        return found ? found.value : null
    }
}

async function main(sh) {
    let shNo = sh.shipmentNumber
    console.log(`shNo  ${sh.shipmentNumber}`);
    let cfs = sh.customFields
    let type_cf = getFromCf(sh.customFields, "Type")
    if ((sh.shipmentTrackingStatus == "Enroute For Delivery" || sh.shipmentTrackingStatus == "Departed From Pickup Point") && type_cf == "Outbound") {
        let vehicleNo = sh.fleetInfo?.vehicle?.vehicleRegistrationNumber
        let shDate = moment(new Date(Number(sh.creationTime))).format("DD-MM-YYYY HH:mm:ss")
        let stages = sh?.shipmentStages
        let origin = ""
        let destination = ""
        let to = ["pooja.bishu@fretron.com"]
        let cc = []

        let mailSentRes = ''
        let vehicleType_cf = getFromCf(cfs, "Vehicle Type")
        if (stages && stages.length) {
            if (stages[0].status == "COMPLETED" && stages[1].status == "UPCOMING") {
                let originPlace = stages[0].place ? stages[0].place : stages[0].hub
                origin = originPlace.name
                origin = origin.split("-")[0]

                if (stages.length == 3 && type_cf == "Outbound" && vehicleType_cf == "Dedicated") {
                    let destinationDedicated = (stages[stages.length - 2]?.place) ? (stages[stages.length - 2]?.place) : stages[stages.length - 2]?.hub
                    destination = destinationDedicated.name
                    destination = destination.split("-")[0]
                }
                else {
                    let destinationPlace = (stages[stages.length - 1]?.place) ? (stages[stages.length - 1]?.place) : stages[stages.length - 1]?.hub
                    destination = destinationPlace.name
                    destination = destination.split("-")[0]
                }
                if (origin == destination) {
                    let destinationNotDedicated = (stages[stages.length - 2]?.place) ? (stages[stages.length - 2]?.place) : stages[stages.length - 2]?.hub
                    destination = destinationNotDedicated.name
                    destination = destination.split("-")[0]
                }

                let html =
                    `<html>
                <head>
                <body>
                <p>Dear Sir</p>
                <p>Please find below details :-</p>
                <p>shipmentNumber:- ${shNo ?? "N/A"} </p>
                <p>shipmentDate:- ${shDate ?? "N/A"} </p>
                <p>Vehicle Number:- ${vehicleNo ?? "N/A"} </p>
                <p>origin:- ${origin ?? "N/A"} </p>
                <p>Destination:- ${destination ?? "N/A"} </p>
                </body>
                </head>
                </html>`
                let cn = sh?.consignments
                if (cn && cn.length) {
                    for (item of cn) {
                        let cnId = item.uuid
                        let cnNo = item.consignmentNo
                        let consignmentTrackingLink = await getConsignmentTrackingLink(cnId)
                        let consignee = item.consignee
                        let contacts = contacts2

                        let smsContent = `Shipment No. - ${shNo ?? "NAN"} Shipment Date. - ${shDate ?? "NAN"} Vehicle No. - ${vehicleNo ?? "NAN"} Shipment origin. - ${origin ?? "NAN"} Destination - ${destination ?? "NAN"} Link - ${consignmentTrackingLink} `


                        if (contacts && contacts.length) {
                            for (let value of contacts) {
                                let mobileNumbers = value?.mobileNumbers
                                if (mobileNumbers && mobileNumbers.length) {
                                    console.log(mobileNumbers)
                                    for (let no of mobileNumbers) {
                                        let mobileNo = no
                                        await sendSms(mobileNo, smsContent)
                                    }
                                }
                                else {
                                    subject = `MobileNo Not Found ConsignmentNo ${cnNo}`
                                    mailSentRes = await forwardEmail(subject, to, cc, html)
                                    // send mail
                                }
                            }
                        }
                        else {
                            subject = `Contacts Not Found ConsignmentNo ${cnNo}`
                            mailSentRes = await forwardEmail(subject, to, cc, html)
                            // send mail
                        }
                    }
                }
                else {
                    // send mail
                    subject = `Consignment Not Found ShipmentNo ${shNo}`
                    mailSentRes = await forwardEmail(subject, to, cc, html)
                }
            }
        }

    } else {
        console.log("tracking Status: " + sh.shipmentTrackingStatus + "type: " + type_cf)
    }

}

async function main2(sh) {
    let shNo = sh.shipmentNumber
    console.log(`shNo  ${sh.shipmentNumber}`);
    let cfs = sh.customFields
    let type_cf = getFromCf(cfs, "Type")
    let vehicleType_cf = getFromCf(cfs, "Vehicle Type")

    if ((sh.shipmentTrackingStatus == "Enroute For Delivery" || sh.shipmentTrackingStatus == "Departed From Pickup Point") && type_cf == "Outbound" && vehicleType_cf == "Dedicated") {
        let vehicleNo = sh.fleetInfo?.vehicle?.vehicleRegistrationNumber
        let shDate = moment(new Date(Number(sh.creationTime))).format("DD-MM-YYYY HH:mm:ss")
        let stages = sh?.shipmentStages
        let origin = ""
        let destination = ""
        let contacts = contacts2
        if (stages && stages.length) {
            if (stages[0].status == "COMPLETED" && stages[1].status == "UPCOMING") {
                let originPlace = stages[0].place ? stages[0].place : stages[0].hub
                origin = originPlace.name

                if (stages.length == 3 && vehicleType_cf == "Dedicated") {
                    let destinationDedicated = (stages[stages.length - 2]?.place) ? (stages[stages.length - 2]?.place) : stages[stages.length - 2]?.hub
                    destination = destinationDedicated.name
                }
                else {
                    let destinationPlace = (stages[stages.length - 1]?.place) ? (stages[stages.length - 1]?.place) : stages[stages.length - 1]?.hub
                    destination = destinationPlace.name
                }
                if (origin == destination) {
                    let destinationNotDedicated = (stages[stages.length - 2]?.place) ? (stages[stages.length - 2]?.place) : stages[stages.length - 2]?.hub
                    destination = destinationNotDedicated.name
                }
                let consignmentTrackingLink = `https://test.fretron.com/shared-shipment?uuid=${sh.uuid}`


                let smsContent = `Shipment No. - ${shNo ?? "NAN"} Shipment Date. - ${shDate ?? "NAN"} Vehicle No. - ${vehicleNo ?? "NAN"} Shipment origin. - ${origin ?? "NAN"} Destination - ${destination ?? "NAN"} Link - ${consignmentTrackingLink ?? "N/A"} FRETRON`

                if (contacts && contacts.length) {
                    for (let value of contacts) {
                        let mobileNumbers = value?.mobileNumbers
                        if (mobileNumbers && mobileNumbers.length) {
                            console.log(mobileNumbers)
                            for (let no of mobileNumbers) {
                                let mobileNo = no
                                await sendSms(mobileNo, smsContent)
                            }
                        }
                    }
                }
            }
        }
    } else {
        console.log("tracking Status: " + sh.shipmentTrackingStatus + "  type: " + type_cf + "  vehicleType_cf : " + vehicleType_cf)
    }
}


try {
    await main2($event)
} catch (error) {
    console.log("Error in sending sms or email " + error)

}
