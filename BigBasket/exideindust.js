const rp = require("request-promise")


var token = ""

async function getShipment() {
    try {
        var res = await rp({
            url: `https://apis.fretron.com/shipment-view/shipments/v1?filters=%7B%22__version%22%3A2%2C%22shipmentDate%22%3A%7B%22isTillExpression%22%3Afalse%2C%22isFromExpression%22%3Afalse%2C%22from%22%3A1675103460000%2C%22till%22%3A1675535491000%7D%7D&size=500&allFields=["uuid","shipmentNumber"]`,

            json: true,
            method: "GET",
            headers: {
                Authorization: "Beaer " + token
            }
        })
        return res
    }
    catch (e) {
        console.log(e.message)
    }

}

async function main() {
    try {
        var noCon = []
        var verifiedSh = []
        let trackingLinkNotGen = []
        var getdata = [{ "uuid": "cb27d67c-cfc3-439a-8bb4-f671fcf3c4b5", "shipmentNumber": "00000000006100207391" }] //  await getShipment()
        // console.log(getdata)
        console.log(getdata.length)
        for (let i = 0; i < getdata.length; i++) {

            let data = getdata[i]
            console.log("Process Starts For SH No - " + data.shipmentNumber + "UUID :" + data.uuid)

            let sh = await getShipmentById(data.uuid, false)

            console.log("Shipment No: " + sh.shipmentNumber)
            let isValidData = checkIfValidData(sh)
            if (isValidData) {
                var cns = sh.consignments ?? []
                // console.log("cns", cns)
                if (!cns) {
                    noCon.push(sh.shipmentNumber)
                }


                var vehicleNo = sh.fleetInfo.vehicle.vehicleRegistrationNumber
                for (let c in cns) {

                    var cn = cns[c];

                    var checkStatus = getFromCf(cn.customFields, "DriverVerificationStatus")
                    if (checkStatus != "VERIFIED") {

                        console.log("Consignment No: " + cn.consignmentNo)
                        let cfConsigneeMobileNo = getFromCf(cn.customFields, "Consignee Phone No")
                        console.log("Found Consignne Mobile From Cf :" + cfConsigneeMobileNo)
                        //SMS Sending
                        var consingeeMobile = cn.consignee.contacts[0].mobileNumbers && cn.consignee.contacts[0].mobileNumbers.length > 0
                            ? cn.consignee.contacts[0].mobileNumbers : (cfConsigneeMobileNo ? [cfConsigneeMobileNo] : null)

                        console.log(consingeeMobile)
                        var consignmentTrackingLink = await getConsignmentTrackingLink(cn.uuid);
                        console.log("Tracking link: " + consignmentTrackingLink)

                        if (consignmentTrackingLink != "") {
                            var cfPayload = {
                                "cnUuid": cn.uuid,
                                "updates": [{
                                    "keyToUpdate": "cfs",
                                    "updatedValue": [{
                                        "indexedValue": [],
                                        "fieldKey": "ePOD Link",
                                        "multiple": false,
                                        "description": "",
                                        "remark": "",
                                        "uuid": "",
                                        "required": false,
                                        "accessType": null,
                                        "input": "string",
                                        "unit": "",
                                        "valueType": "string",
                                        "options": [],
                                        "fieldType": "text",
                                        "value": consignmentTrackingLink,
                                        "isRemark": false
                                    }]
                                }]
                            }
                            console.log(await updateCfs(cfPayload))
                            var consignor = cn.consigner.name

                            if (consingeeMobile != null && consingeeMobile.length > 0) {
                                // consingeeMobile = consingeeMobile[0].value;
                                var content = "Exide Indu shared consignment ePOD Link with you for vehicle no. " + vehicleNo + ". Click the link below to track " + consignmentTrackingLink + " FRETRON"
                                var smsRes = await rp({
                                    method: "POST",
                                    uri: "http://apis.fretron.com/notifications/smsing/sms",
                                    body: {
                                        to: consingeeMobile,
                                        content: content
                                    },
                                    json: true
                                })

                                console.log("SMS Response")
                                console.log(smsRes)
                                if (smsRes.status == 200) {
                                    // Set CF SMS Sent -> Yes
                                    let smsSentPayload = {
                                        "cnUuid": cn.uuid,
                                        "updates": [{
                                            "keyToUpdate": "cfs",
                                            "updatedValue": [{
                                                "indexedValue": [],
                                                "fieldKey": "SMS Sent",
                                                "multiple": false,
                                                "valueType": "string",
                                                "options": ["Yes", "No"],
                                                "fieldType": "yes-no",
                                                "value": "Yes",
                                            }]
                                        }]
                                    }
                                    await updateCfs(smsSentPayload)
                                }

                            } else {
                                console.log("No mobile no found!")
                                // Set CF SMS Sent -> No
                                let smsSentPayload = {
                                    "cnUuid": cn.uuid,
                                    "updates": [{
                                        "keyToUpdate": "cfs",
                                        "updatedValue": [{
                                            "indexedValue": [],
                                            "fieldKey": "SMS Sent",
                                            "multiple": false,
                                            "valueType": "string",
                                            "options": ["Yes", "No"],
                                            "fieldType": "yes-no",
                                            "value": "No",
                                        }]
                                    }]
                                }
                                await updateCfs(smsSentPayload)
                            }


                            let cfConsigneeEmail = getFromCf(cn.customFields, "Consignee Email")
                            console.log("Found Consignne Email From Cf :" + cfConsigneeEmail)

                            //Mail Sending
                            var consigneeMail = cn.consignee.contacts[0].emails && cn.consignee.contacts[0].emails.length > 0
                                ? cn.consignee.contacts[0].emails : (cfConsigneeEmail ? [cfConsigneeEmail] : null)
                            console.log(consigneeMail)
                            if (consigneeMail != null && consigneeMail.length > 0) {
                                var htmlString = `
                                            <html>
                                            <head>
                                            <body>
                                            <p>${consignor}shared consignment ePOD Link with you for vehicle no. ${vehicleNo}. Click the link below to track-</p>
                                            <p><a href="${consignmentTrackingLink}">Consignment Tracking Link</a></p>
                                            </body>
                                            </head>
                                            </html>
                            `
                                var subject = "Tracking Link for Invoice - " + cn.consignmentNo + " / " + vehicleNo
                                let mailer = await forwardEmail(subject, consigneeMail, [""], htmlString)
                                console.log(mailer)

                                // Set CF Email Sent -> Yes
                                let cfEmailSentPayload = {
                                    "cnUuid": cn.uuid,
                                    "updates": [{
                                        "keyToUpdate": "cfs",
                                        "updatedValue": [{
                                            "indexedValue": [],
                                            "fieldKey": "Email Sent",
                                            "multiple": false,
                                            "valueType": "string",
                                            "options": ["Yes", "No"],
                                            "fieldType": "yes-no",
                                            "value": "Yes",
                                        }]
                                    }]
                                }
                                await updateCfs(cfEmailSentPayload)
                            } else {
                                console.log("No Mail info found!")
                                // Set CF Email Sent -> No
                                let cfEmailSentPayload = {
                                    "cnUuid": cn.uuid,
                                    "updates": [{
                                        "keyToUpdate": "cfs",
                                        "updatedValue": [{
                                            "indexedValue": [],
                                            "fieldKey": "Email Sent",
                                            "multiple": false,
                                            "valueType": "string",
                                            "options": ["Yes", "No"],
                                            "fieldType": "yes-no",
                                            "value": "No",
                                        }]
                                    }]
                                }
                                await updateCfs(cfEmailSentPayload)
                            }

                        } else {
                            console.log("Tracking Link Not generated")
                            trackingLinkNotGen.push(sh.shipmentNumber)
                        }

                    } else {
                        verifiedSh.push(sh.shipmentNumber)

                    }
                }
            } else {
                noCon.push(sh.shipmentNumber)

            }

            function checkIfValidData(sh) {
                if (sh.consignments == null || sh.consignments.length == 0) {
                    console.log("No consignments found!")
                    return false
                }
                return true
            }


            function getFromCf(cfs, key) {
                if (cfs == null) {
                    return null
                } else {
                    let found = cfs.find(_ => _.fieldKey == key)
                    return found ? found.value : null
                }
            }

            async function getConsignmentTrackingLink(cnNO) {
                var payload = {
                    "consignmentId": cnNO,
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
                    uri: "https://apis.fretron.com/sharing-utils/v1/share-cn",
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

            async function forwardEmail(subject, to, cc, html) {
                console.log("Sending email with SUB: " + subject);
                await rp({
                    uri: "http://apis.fretron.com/notifications/emails/email",
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
            }

            async function updateCfs(cfPayload) {
                try {
                    console.log(JSON.stringify(cfPayload))
                    var res = await rp({
                        url: `https://apis.fretron.com/shipment/v1/consignment/actions/sync`,
                        method: "POST",
                        json: true,
                        body: cfPayload,
                        headers: {
                            Authorization: "Beaer " + token
                        }
                    });
                    if (res.status == 200) {
                        console.log(`Added CFS consignment!, Status- ${res.status} ${JSON.stringify(res)}`);
                        return "Done"
                    } else {
                        console.log(`Error while adding cfsconsignment- ${res.error}`)
                        return "Issue"
                    }

                } catch (e) {
                    console.log("updateCN : " + e.toString())
                }
            }

            async function getShipmentById(shId, skipCn) {
                try {
                    let url = `https://apis.fretron.com/shipment/v1/admin/shipment/${shId}?skipCn=${skipCn}`
                    let res = await rp({
                        method: "GET",
                        uri: url,
                        json: true
                    });
                    if (res.status == 200) {
                        return res.data
                    } else {
                        console.log(`Get shipment by id res error : ${res.error}`)
                        return null
                    }
                } catch (e) {
                    console.log(`Catched error in get sh by id : ${e.message}`)
                }
                return null
            }
        }

        console.log("Data Having No CN :" + JSON.stringify(noCon))
        console.log("Data Having Verified Sh :" + JSON.stringify(verifiedSh))
        console.log("Tracking Link Not Gen:" + JSON.stringify(trackingLinkNotGen))

    } catch (ex) {
        console.log("Error executing automation- " + ex.toString())
    }
}

// main().then(_ => console.log(JSON.stringify(_))).catch(e => console.log(e))

