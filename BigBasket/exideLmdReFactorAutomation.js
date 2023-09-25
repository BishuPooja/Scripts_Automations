await delay(3000)
var token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjIzNTU5MjgsInVzZXJJZCI6IjhkNDgwNzk1LTNlYzctNDc4Yy1iOTA5LTZmOGI5MmMzNzg2MCIsImVtYWlsIjoiYW5tb2wuYmFuc2FsQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTU2MDQ5MzE3NCIsIm9yZ0lkIjoiYjM3MGM3ODUtOTZkNy00MGMyLWE2MGEtZDI4OWE2ZjY3YWE5IiwibmFtZSI6ImFubW9sIGJhbnNhbCIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.Ic4AsKrEU6u8X1Gt2PUT6Sz2vWiGQplbZ2waBgmCP0Q";

try {
    var sh = $event;

    console.log("Shipment No: " + sh.shipmentNumber);
    if (sh.shipmentTrackingStatus != "Enroute For Delivery") {
        console.log("Tracking Status is not enroute for delivery");
        return;
    }
    if (sh.customFields == null) {
        console.log("No custom fields found on shipment!");
        return;
    }
    var type = _.filter(sh.customFields, function (o) {
        return o.fieldKey == "Type";
    });
    var cns = [];
    if (sh.consignments != null && sh.consignments.length > 0) {
        cns = sh.consignments;
    } else {
        console.log("No consignments found!");
        return;
    }
    var vehicleNo = sh.fleetInfo.vehicle.vehicleRegistrationNumber;

    if (type.length > 0) {
        if (type[0].value == "PRIMARY") {
            await primary();
        } else if (type[0].value == "LAST MILE") {
            await lastMile();
        }
    }

    async function lastMile() {
        console.log("LAST MILE CASE!!!");

        for (var c = 0; c < cns.length; c++) {
            var cnData = cns[c];
            cnData = await getCn(cnData.uuid);
            cnData = cnData.consignment;
            console.log("Consignment No: " + cnData.consignmentNo);

            let customFields = cnData.customFields;
            const getCfByName = (key) => {
                if (customFields == null) return null;
                if (customFields.filter((cf) => cf.fieldKey == key).length > 0) {
                    return customFields.filter((cf) => cf.fieldKey == key);
                }
                return null;
            };

            let isSmsTrigger = getCfByName("SMS Triggered");
            if (isSmsTrigger && isSmsTrigger.length && isSmsTrigger[0].value) {
                console.log("SMS Already Triggered!");
                continue;
            }

            var otpFlag = false;
            let ensureOtp = getCfByName("OTP");
            if (ensureOtp && ensureOtp.length && ensureOtp[0].value) {
                otpFlag = true;
                console.log("Otp already added to cn");
            }
            if (otpFlag == false) {
                let rngValue = getOTP();
                // CF to get OTP
                var cfPayload = {
                    cnUuid: cnData.uuid,
                    updates: [
                        {
                            keyToUpdate: "cfs",
                            updatedValue: [
                                {
                                    indexedValue: [],
                                    fieldKey: "OTP",
                                    multiple: false,
                                    description: "",
                                    remark: "",
                                    uuid: "",
                                    required: false,
                                    accessType: null,
                                    input: "string",
                                    unit: "",
                                    valueType: "string",
                                    options: [],
                                    fieldType: "text",
                                    value: rngValue,
                                    isRemark: false,
                                },
                            ],
                        },
                    ],
                };
                let respponse = await updateCN(cfPayload);
                console.log("OTP Adding CF- " + respponse);
            }

            await delay(2000);
            cnData = await getCn(cnData.uuid);
            cnData = cnData.consignment;
            let response = await lastMileRemainingLogic(cnData);
            console.log(response);
        }
        return;
    }

    async function lastMileRemainingLogic(cnData) {
        let customFields = cnData.customFields;
        const getCfByName = (key) => {
            if (customFields == null) return null;
            if (customFields.filter((cf) => cf.fieldKey == key).length > 0) {
                return customFields.filter((cf) => cf.fieldKey == key);
            }
            return null;
        };

        var lrNumber = "";
        var ensureLrNumber = getCfByName("LR Number");

        if (ensureLrNumber != null && ensureLrNumber.length > 0) {
            if (ensureLrNumber[0].value != null) {
                lrNumber = ensureLrNumber[0].value;
            } else {
                console.log("LR Number not found");
                return null;
            }
        } else {
            console.log("LR Number not found");
            return null;
        }

        /*
              sh = await getShipmentData(token, $event.uuid)
              consignmentFilter = cnData.consignment
              let otpCustomFieldOK = consignmentFilter.customFields.filter(e => e.fieldKey == "ePOD OK OTP")[0]
              let otpCustomFieldNotOK = consignmentFilter.customFields.filter(e => e.fieldKey == "ePOD NOT OK OTP")[0]
              */

        let otpCustomField = getCfByName("OTP");
        if (!otpCustomField) {
            console.log("OTP Custom field not found");
            return null;
        } else if (!otpCustomField.length) {
            console.log("OTP Custom field not found");
            return null;
        } else {
            otpCustomField = otpCustomField[0].value;
        }
        if (!cnData.consignee.contacts) {
            console.log(
                "Contact not found for dealer, not triggering sms for dealer"
            );
            return null;
        } else if (
            cnData.consignee.contacts.length &&
            cnData.consignee.contacts[0].mobileNumbers &&
            cnData.consignee.contacts[0].mobileNumbers.length
        ) {
            var dealerMobileNumberArray =
                cnData.consignee.contacts[0].mobileNumbers;
        } else {
            console.log(
                "Dealer number not present in mobileNumbers field, not triggering sms for dealer"
            );
            return null;
        }

        var consignmentTrackingLink = await getConsignmentTrackingLink_LMD(
            cnData.uuid
        );
        console.log("Dealer Numbers Present!");

        var contentNEw = `Send FRT <OTP> to 8889855525 to confirm the delivery for ${sh.fleetInfo.vehicle.vehicleRegistrationNumber}, LR No- ${lrNumber} for ${cnData.consignee.name} OTP -${otpCustomField}. To view invoices listed in the LR, please click on the below link. https://alpha.fretron.com/trip-share/vehicleLocation/consignment?code=${consignmentTrackingLink}`;
        // var contentNEw = `Send FRT <OTP> to 8889855525 to complete the POD of ${sh.fleetInfo.vehicle.vehicleRegistrationNumber}, ${consignmentFilter.consignmentNo} for ${consignmentFilter.consignee.name}, ${consignmentFilter.consignee.places[0].name}. OK POD-${otpCustomFieldOK.value} / NOT OK POD-${otpCustomFieldNotOK.value} In order to report damage/shortage/excess please click on the below link. https://alpha.fretron.com/trip-share/vehicleLocation/consignment?code=${consignmentTrackingLink}`
        console.log("Attaching Content");
        let smsRes2 = await smsSend(contentNEw, dealerMobileNumberArray);
        if (smsRes2) {
            // CF on sms trigger ---> value: yes
            var smsTrigerPayload = {
                cnUuid: cnData.uuid,
                updates: [
                    {
                        keyToUpdate: "cfs",
                        updatedValue: [
                            {
                                indexedValue: [],
                                fieldKey: "SMS Triggered",
                                multiple: false,
                                description: "",
                                remark: "",
                                uuid: "",
                                required: false,
                                accessType: null,
                                input: "string",
                                unit: "",
                                valueType: "string",
                                options: [],
                                fieldType: "text",
                                value: "Yes",
                                isRemark: false,
                            },
                            {
                                indexedValue: [],
                                fieldKey: "SMS Trigger Date Time", // Add CF of date and time of sending SMS
                                multiple: false,
                                description: "",
                                remark: "",
                                uuid: "",
                                required: false,
                                accessType: null,
                                input: "string",
                                unit: "",
                                valueType: "string",
                                options: [],
                                fieldType: "text",
                                value: new Date(Date.now() + 19800000).toLocaleString(),
                                isRemark: false,
                            },
                        ],
                    },
                ],
            };
        } else {
            var smsTrigerPayload = {
                cnUuid: cnData.uuid,
                updates: [
                    {
                        keyToUpdate: "cfs",
                        updatedValue: [
                            {
                                indexedValue: [],
                                fieldKey: "SMS Triggered",
                                multiple: false,
                                description: "",
                                remark: "",
                                uuid: "",
                                required: false,
                                accessType: null,
                                input: "string",
                                unit: "",
                                valueType: "string",
                                options: [],
                                fieldType: "text",
                                value: smsRes2,
                                isRemark: false,
                            },
                        ],
                    },
                ],
            };
        }
        let result = await updateCN(smsTrigerPayload);
        console.log("SMS Trigger Response- " + result);
        console.log("SMS Response- dealer");
        console.log(smsRes2);
        return "SMS SENT";
    }

    async function primary() {
        console.log("PRIMARY CASE!!!");

        for (var c = 0; c < cns.length; c++) {
            var cn = cns[c];
            console.log("Consignment No: " + cn.consignmentNo);

            var consingeeMobile =
                cn.consignee.contacts && cn.consignee.contacts.length
                    ? cn.consignee.contacts[0].mobileNumbers
                    : null;
            var consignmentTrackingLink = await getConsignmentTrackingLink(
                cn.uuid
            );
            if (!consignmentTrackingLink) {
                console.log("Tracking Link Not generated");
                return;
            }

            var consignor = cn.consigner.name;
            if (consingeeMobile != null && consingeeMobile.length > 0) {
                var content =
                    "Exide Indu shared consignment ePOD Link with you for vehicle no. " +
                    vehicleNo +
                    ". Click the link below to track https://alpha.fretron.com/trip-share/vehicleLocation/consignment?code=" +
                    consignmentTrackingLink;
                var smsRes = await rp({
                    method: "POST",
                    uri: `${FRT_PUB_BASE_URL}/notifications/smsing/sms`,
                    body: {
                        to: consingeeMobile,
                        content: content,
                    },
                    json: true,
                });

                console.log("SMS Response");
                console.log(smsRes);

                //Mail Sending
                var consigneeMail = cn.consignee.contacts[0].emails;
                consigneeMail.push("anmol@fretron.com");
                console.log(consigneeMail);

                if (consigneeMail != null && consigneeMail.length > 0) {
                    var htmlString = `
                                  <html>
                                  <head>
                                  <body>
                                  <p>${consignor}shared consignment ePOD Link with you for vehicle no. ${vehicleNo}. Click the link below to track-</p>
                                  <p><a href="https://alpha.fretron.com/trip-share/vehicleLocation/consignment?code=${consignmentTrackingLink}">Consignment Tracking Link</a></p>
                                  </body>
                                  </head>
                                  </html>`;
                    var subject =
                        "Tracking Link for Invoice - " +
                        cn.consignmentNo +
                        " / " +
                        vehicleNo;
                    let mailer = await forwardEmail(
                        subject,
                        consigneeMail,
                        [""],
                        htmlString
                    );
                    console.log(mailer);
                } else {
                    console.log("No Mail info found!");
                }
            } else {
                console.log("No mobile no found!");
            }
        }
    }

    async function smsSend(content, mobileNumber) {
        try {
            let res = await rp({
                method: "post",
                uri: `${FRT_PUB_BASE_URL}/notifications/smsing/sms`,
                body: {
                    to: mobileNumber,
                    content: content,
                },
                timeout: 10000,
                json: true,
            });
            return res;
        } catch (e) {
            console.log("smsSend" + e.message);
            return e.message;
        }
    }

    async function updateCN(cfPayload) {
        try {
            // console.log(cfPayload)
            var res = await rp({
                url: `${FRT_PUB_BASE_URL}/shipment/v1/consignment/actions/sync`,
                method: "POST",
                json: true,
                body: cfPayload,
                headers: {
                    Authorization: token,
                },
            });
            if (res.status == 200) {
                console.log(`Added CF on consignment!, Status- ${res.status}`);
                return "Done";
            } else {
                console.log(`Error while adding CF on consignment- ${res.error}`);
                return "Issue";
            }
        } catch (e) {
            console.log("updateCN : " + e.message);
        }
    }

    async function getShipmentData(token, uuid) {
        var options = {
            uri:
                "https://apis.fretron.com/shipment/v1/shipment/" +
                uuid +
                "?skipCn=false",
            method: "GET",
            headers: {
                Authorization: token,
            },
            json: true,
        };
        return rp(options)
            .then((data) => {
                return data.data;
            })
            .catch((e) => {
                console.log("getShipmentData : " + e.message);
                return [];
            });
    }

    function getOTP() {
        return _.random(100000, 999999);
    }

    async function getConsignmentTrackingLink(cnNO) {
        var payload = {
            consignmentId: cnNO,
            uiRestrictions: {
                cnInfo: {
                    consignmentNo: true,
                    vehicleInfo: true,
                    materialInfo: true,
                    consignor: true,
                    consignee: true,
                    origin: true,
                    destination: true,
                    customer: false,
                    valuOfGoods: false,
                    currentStatus: true,
                    currentAddress: true,
                },
                epod: {
                    upload: true,
                    timing: true,
                    otpToDriver: true,
                    unloadingStart: false,
                    unloadingEnd: true,
                    reportingTime: true,
                    unloadingCharge: true,
                    isMandateTiming: true,
                    isMandateFeeding: true,
                    vehicleReleaseTime: false,
                    feeding: true,
                },
                map: true,
                liveTracking: true,
                updateTracking: false,
            },
        };
        var res = await rp({
            method: "POST",
            uri: `${FRT_PUB_BASE_URL}/sharing-utils/v1/share-cn`,
            body: payload,
            json: true,
            headers: { Authorization: token, "Content-Type": "application/json" },
        });
        if (res.data != null) {
            return res.data;
        } else {
            console.log(
                "Issue while fetching the consignment tracking link: " + res.error
            );
            return "";
        }
    }

    async function getConsignmentTrackingLink_LMD(cnNO) {
        var payload = {
            consignmentId: cnNO,
            uiRestrictions: {
                cnInfo: {
                    consignmentNo: true,
                    vehicleInfo: true,
                    materialInfo: true,
                    consignor: true,
                    consignee: true,
                    origin: true,
                    destination: true,
                    customer: false,
                    valuOfGoods: false,
                    currentStatus: false,
                    currentAddress: false,
                },
                epod: {
                    upload: false,
                    timing: true,
                    feeding: true,
                    otpToDriver: false,
                    unloadingStart: false,
                    unloadingEnd: true,
                    reportingTime: false,
                    vehicleReleaseTime: false,
                    unloadingCharge: false,
                    isMandateTiming: true,
                    isMandateFeeding: false,
                    markManually: true,
                    podSignatureVerification: false,
                },
                map: false,
                liveTracking: false,
                updateTracking: false,
                miscFields: false,
                customFields: [],
            },
        };
        var res = await rp({
            method: "POST",
            uri: `${FRT_PUB_BASE_URL}/sharing-utils/v1/share-cn`,
            body: payload,
            json: true,
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });
        if (res.data != null) {
            return res.data;
        } else {
            console.log(
                "Issue while fetching the consignment tracking link - LMD: " +
                res.error
            );
            return "";
        }
    }

    async function forwardEmail(subject, to, cc, html) {
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
            timeout: 2000,
            json: true,
        });
        return "Mail Sent";
    }

    async function getCn(uuid) {
        var url =
            `${FRT_PUB_BASE_URL}/shipment/v1/consignment/` +
            uuid +
            "/shipments";
        var req = {
            method: "GET",
            uri: url,
            headers: {
                Authorization: token,
            },
            json: true,
        };

        try {
            var res3 = await rp(req);
            if (res3.data != null) {
                return res3.data;
            } else {
                return "CN Detail not available";
            }
        } catch (e) {
            console.log("getCn " + e.toString());
        }
    }
} catch (ex) {
    console.log("Error executing automation- " + ex.message);
}

