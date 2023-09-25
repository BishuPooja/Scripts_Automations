const rp = require("request-promise")
const _ = require("lodash")
const fs = require("fs")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"
const SMS_TRIGGERED_CF = "SMS Triggered"
const OTP = "OTP"
const LR_NUMBER = "LR Number"
const TYPE = "Type"
var token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjIzNTU5MjgsInVzZXJJZCI6IjhkNDgwNzk1LTNlYzctNDc4Yy1iOTA5LTZmOGI5MmMzNzg2MCIsImVtYWlsIjoiYW5tb2wuYmFuc2FsQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTU2MDQ5MzE3NCIsIm9yZ0lkIjoiYjM3MGM3ODUtOTZkNy00MGMyLWE2MGEtZDI4OWE2ZjY3YWE5IiwibmFtZSI6ImFubW9sIGJhbnNhbCIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.Ic4AsKrEU6u8X1Gt2PUT6Sz2vWiGQplbZ2waBgmCP0Q";




async function primary(cnIds, sh) {
    try {
        console.log("PRIMARY CASE!!!");
        for (let cnId of cnIds) {
            let cn = await getCn(cnId)
            cn = cn.consignment
            let cnNo = cn?.consignmentNo
            let consigneeExternalId = (cn?.consignee?.externalId || '').replace(/^0+/, '');
            let consignerExternalId = (cn?.consigner?.externalId || '').replace(/^0+/, '');
            console.log("Consignment No: " + cnNo);
            let vehicleNo = sh?.fleetInfo?.vehicle?.vehicleRegistrationNumber
            let consingeeMobile = cn.consignee?.contacts?.[0]?.mobileNumbers ?? null;
            console.log(`consigneeMobile: ${consingeeMobile}`)
            let consignmentTrackingLink = await getConsignmentTrackingLink(cn.uuid);
            let consignor = cn?.consigner?.name;
            let consigneeMail = cn?.consignee?.contacts?.[0]?.emails ?? null
            console.log(`consignee mail: ${consigneeMail}`)
            consigneeMail.push("anmol@fretron.com");
            if (!consignmentTrackingLink) {
                console.log(`Tracking Link Not generated ${cn.consignmentNo} consigneeExternalId ${consigneeExternalId}`);
                return;
            }
            if (consingeeMobile?.length > 0) {
                let content =
                    "Exide Indu shared consignment ePOD Link with you for vehicle no. " +
                    vehicleNo +
                    ". Click the link below to track https://alpha.fretron.com/trip-share/vehicleLocation/consignment?code=" +
                    consignmentTrackingLink;
                let smsRes = await smsSend(content, consingeeMobile)
                console.log(`Sms send status  ${smsRes?.status}`);
            } else {
                console.log(`No mobile no found for ${cnNo} consignee ${consigneeExternalId} cosnigner ${consignerExternalId}`);
            }
            if (consigneeMail && consigneeMail.length > 0) {
                let htmlString = `
                                  <html>
                                  <head>
                                  <body>
                                  <p>${consignor}shared consignment ePOD Link with you for vehicle no. ${vehicleNo}. Click the link below to track-</p>
                                  <p><a href="https://alpha.fretron.com/trip-share/vehicleLocation/consignment?code=${consignmentTrackingLink}">Consignment Tracking Link</a></p>
                                  </body>
                                  </head>
                                  </html>`;
                let subject =
                    "Tracking Link for Invoice - " +
                    cn.consignmentNo +
                    " / " +
                    vehicleNo;
                let mailer = await forwardEmail(subject, consigneeMail, [""], htmlString);
                console.log(mailer);
            } else {
                console.log(`No Mail info found for ${cnNo} consignee ${consigneeExternalId} cosnigner ${consignerExternalId}`);
            }

        }
    }
    catch (e) {
        console.log(`primary function catch error  ${e.message}`)
    }
}

async function lastMile(cnIds, sh) {
    try {
        console.log("LAST MILE CASE!!!");
        let count = 0
        for (let cnId of cnIds) {
            count += 1
            console.log(`count ${count}`)
            let cnData = await getCn(cnId);
            cnData = cnData?.consignment;
            let cnNo = cnData.consignmentNo
            let consigneeExternalId = (cnData?.consignee?.externalId || '').replace(/^0+/, '');
            let consignerExternalId = (cnData?.consigner?.externalId || '').replace(/^0+/, '');
            console.log("Consignment No: " + cnNo);
            let customFields = cnData?.customFields ?? [];
            let isSmsTrigger = getFromCf(customFields, SMS_TRIGGERED_CF);
            if (isSmsTrigger && isSmsTrigger == "Yes") {
                console.log(`SMS Already Triggered For consignment ${cnNo} of consignee ${consigneeExternalId} consigner ${consignerExternalId}`);
                continue;
            }
            let otpFlag = false;
            let ensureOtp = getFromCf(customFields, OTP);
            if (ensureOtp) {
                otpFlag = true;
                console.log(`Otp already added to  for consignment ${cnNo}`);
            }
            if (otpFlag == false) {
                let rngValue = getOTP();
                let cfPayload = {
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
                let updatedCfRes = await actionSync(cfPayload);
                console.log("OTP Adding CF Res status" + updatedCfRes?.status);
            }
            await delay(2000);
            cnData = await getCn(cnId);
            cnData = cnData.consignment;
            let cfs = cnData?.customFields ?? []
            let lrNumber = "";
            let ensureLrNumber = getFromCf(cfs, LR_NUMBER);
            if (!ensureLrNumber) {
                console.log(`LR Number not found in ${cnData.consignmentNo}`)
            }
            let otpCustomField = getFromCf(cfs, OTP);
            if (!otpCustomField) {
                console.log(`OTP Custom field not found ${cnData.consignmentNo}`);
                return null;
            }
            let consigneeContacts = cnData?.consignee?.contacts?.[0]?.mobileNumbers ?? null;
            console.log(`consigneeContacts: ${consigneeContacts}`)
            if (!consigneeContacts) {
                console.log(`consignee contacts not found for ${cnData?.consignee?.externalId}`);
            }
            let vehicleNo = sh?.fleetInfo?.vehicle?.vehicleRegistrationNumber
            let consignmentTrackingLink = await getConsignmentTrackingLink(cnData.uuid);
            if (consignmentTrackingLink) {
                let contentNEw = `Send FRT <OTP> to 8889855525 to confirm the delivery for ${vehicleNo ?? "N/A"}, LR No- ${lrNumber} for ${cnData.consignee.name} OTP -${otpCustomField ?? "N/A"}. To view invoices listed in the LR, please click on the below link. https://alpha.fretron.com/trip-share/vehicleLocation/consignment?code=${consignmentTrackingLink}`;
                let smsRes2 = await smsSend(contentNEw, consigneeContacts);
                let smsTrigerPayload = {
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
                                    value: "",
                                    isRemark: false,
                                },
                            ],
                        },
                    ],
                };
                if (smsRes2?.status == 200) {
                    smsTrigerPayload.updates[0].updatedValue[0].value = "Yes"
                    smsTrigerPayload.updates[0].updatedValue.push({
                        indexedValue: [],
                        fieldKey: "SMS Trigger Date Time",
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
                    })
                } else {
                    smsTrigerPayload.updates[0].updatedValue[0].value = "No"
                }

                let result = await actionSync(smsTrigerPayload);
                console.log("cf Added SMS Trigger Response status- " + result?.status);
                console.log("SMS SENT");
            }
            else {
                console.log(`consignment tracking not generated for ${cnData?.consignmentNo}`)
            }
        }
        return;
    }
    catch (e) {
        console.log(`Error in Last Mile function ${e.message}`)
    }
}

function getFromCf(cfs, key) {
    const found = cfs?.find(item => item.fieldKey === key);
    return found?.value ?? null;
}






async function smsSend(content, mobileNumber) {
    try {
        const options = {
            method: "POST",
            uri: `${FRT_PUB_BASE_URL}/notifications/smsing/sms`,
            body: {
                to: mobileNumber,
                content: content,
            },
            timeout: 10000,
            json: true,
        };

        const res = await rp(options);

        if (res?.status === 200) {
            return res;
        } else {
            return null;
        }
    } catch (e) {
        console.log("smsSend catch error: " + e.message);
    }

    return null;
}


async function actionSync(cfPayload) {
    try {
        const options = {
            url: `${FRT_PUB_BASE_URL}/shipment/v1/consignment/actions/sync`,
            method: "POST",
            json: true,
            body: cfPayload,
            headers: {
                Authorization: token,
            },
        };

        const res = await rp(options);

        if (res.status === 200) {
            console.log(`Added CF on consignment! Status: ${res.status}`);
            return res;
        } else {
            console.log(`Error while adding CF on consignment: ${res.error}`);
            return null;
        }
    } catch (e) {
        console.log("actionSync catch error: " + e.message);
    }

    return null;
}


function getOTP() {
    return _.random(100000, 999999);
}

async function getConsignmentTrackingLink(cnId) {
    try {
        let payload = {
            consignmentId: cnId,
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
        let res = await rp({
            method: "POST",
            uri: `${FRT_PUB_BASE_URL}/sharing-utils/v1/share-cn`,
            body: payload,
            json: true,
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });
        console.log(res)
        if (res?.data) {
            return res.data;
        } else {
            console.log(
                "Issue while fetching the consignment tracking link - LMD: " +
                res.error
            );
            return null
        }
    }
    catch (e) {
        console.log(`getConsignmentTrackingLink catch error ${e.message}`)
    }

}


async function forwardEmail(subject, to, cc, html) {
    try {
        console.log("Sending email with SUB: " + subject);
        const options = {
            uri: `${FRT_PUB_BASE_URL}/notifications/emails/email`,
            method: "POST",
            body: {
                cc,
                to,
                subject,
                html,
            },
            timeout: 2000,
            json: true,
        };

        await rp(options);
        return "Mail Sent";
    } catch (e) {
        console.log(`Error in forwardEmail: ${e.message}`);
        return null;
    }
}


async function getCn(uuid) {
    try {
        const url = `${FRT_PUB_BASE_URL}/shipment/v1/consignment/${uuid}/shipments`;
        const options = {
            uri: url,
            method: "GET",
            headers: {
                Authorization: token,
            },
            json: true,
        };

        const res = await rp(options);

        if (res?.status === 200) {
            return res.data;
        } else {
            console.log(`Error in getCn: ${res.error}`);
        }
    } catch (e) {
        console.log(`getCn catch error: ${e.message}`);
    }

    return null;
}



async function main($event) {
    try {
        const sh = $event;
        const shNo = sh.shipmentNumber.replace(/^0+/, '');
        console.log("Shipment No: " + shNo);

        if (sh?.shipmentTrackingStatus !== "Enroute For Delivery") {
            console.log(`Tracking Status is not enroute for delivery ${shNo}`);
            return;
        }

        if (!sh.customFields) {
            console.log(`No custom fields found on shipment ${shNo}`);
            return;
        }

        const cfs = sh.customFields;
        const type = getFromCf(cfs, TYPE);

        if (sh.consignments && sh.consignments.length > 0) {
            const cnIds = sh.consignments.map((v) => v.uuid);
            console.log(cnIds)
            if (type && cnIds) {
                if (type === "PRIMARY") {
                    await primary(cnIds, sh);
                } else {
                    await lastMile(cnIds, sh);
                }
            }
        } else {
            console.log(`No consignments found for ${shNo}`);
            return;
        }
    } catch (e) {
        console.log(`main catch error ${e.message}`);
    }
}


try {
    main($event)
}
catch (e) {
    console.log(`Error in main ${e.message}`)
}












