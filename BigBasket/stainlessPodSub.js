const rp = require("request-promise")
/**
 * On Pod submission send alert mailer to consignee if the consignee matches the id from map.
 * -By Suyash
 * Task Number- 23373
 * Sprint- 72
 */
const _ = require("lodash")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"

const consigneeIds = [
    "1090000231",
    "1090000212",
    "1090000178",
    "1090000113",
    "1090000118",
    "1090000116",
    "1030000168",
    "1030000020",
    "1030000010",
    "1030000073",
    "1030000016",
    "1030000015",
    "1030000248",
    "1030000077",
];
const mandeepEmailId = "mandeep.yadav@jindalstainless.com"
const mandeepAllowedConsigneeIds = ["1090000212", "1090000251", "1090000252", "1090000178", "1090000113", "1090000118", "1030000208", "1090000116", "1090000178"
]
const cc = []
async function main() {

    try {
        const cn = $event;
        let cnNo = cn.consignmentNo;
        const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzM5Mzc0NTYsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiZDI1NWEwMDAtZjI3MS00ODllLTk0MDgtYjlmYjdkNTkyYjQ0IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.ilRErULUKItCkBgqfIkKee0jG-o5ESpFgzTqC2l3pfc"

        console.log(`Executing for consignment ${cnNo}`);

        let externalId = cn.consignee.externalId ?? "";
        console.log(externalId);
        let customerName = cn.consignee.name ?? "";

        if (!consigneeIds.includes(externalId)) {
            console.log(
                `External Id does not match with the given consignees id list. Not triggering mail`
            );
            return;
        }
        if (mandeepAllowedConsigneeIds.includes(externalId)) {
            cc.push(mandeepEmailId)
        }
        var uuid = cn?.associatedShipments?.[0];

        if (!uuid) {
            console.log("Shipment Id not found.... Cannot map details");
            return;
        }
        let sh = await shipmentGET(uuid, token);

        if (!sh) return;

        let cfs = sh.customFields;

        let foNumber =
            cfs?.find(({ fieldKey }) => fieldKey === "FO Number")?.value ?? "";

        let vehicleNumber = sh.fleetInfo.vehicle.vehicleRegistrationNumber;

        var lastStage = _.last(sh.shipmentStages);

        let vehiclearrivalTime = lastStage?.arrivalTime;
        console.log(`vehiclearrivalTime ${vehiclearrivalTime}`)
        let vehicleReportingDate = vehiclearrivalTime
            ? new Date(vehiclearrivalTime + 19800000).toLocaleString()
            : "";


        let unloadingStartTime = lastStage.actualActivityStartTime;

        let unloadingStartDate = unloadingStartTime
            ? new Date(unloadingStartTime + 19800000).toLocaleString()
            : "";
        console.log(unloadingStartTime)

        let unloadingFinishTime = lastStage.actualActivityEndTime;
        console.log(unloadingFinishTime)

        let unloadingFinishDate = unloadingFinishTime
            ? new Date(unloadingFinishTime + 19800000).toLocaleString()
            : "";

        console.log(unloadingFinishDate)
        const POD = await ensurePod(cn.uuid, token);
        var frontUrl = "";
        var backUrl = "";
        var shortage_damaged_list = "";

        if (POD) {
            frontUrl =
                POD.documents?.find(({ name }) => name?.includes("Front_"))?.value ?? "";
            backUrl =
                POD.documents?.find(({ name }) => name?.includes("Back_"))?.value ?? "";

            let shortDamageMap = {};

            if (!unloadingStartDate) {
                unloadingStartDate = POD?.unloadingStartDate
                    ? new Date(POD.unloadingStartDate + 19800000).toLocaleString()
                    : "";
            }

            if (!unloadingFinishDate) {
                unloadingFinishDate = POD?.unloadingFinishDate
                    ? new Date(POD.unloadingFinishDate + 19800000).toLocaleString()
                    : "";
            }

            for (let items of POD.deliveryItems) {
                if (items.issues?.includes("Shortage")) {
                    shortDamageMap["Shortage"] = {};
                    shortDamageMap["Shortage"]["url"] =
                        items.documents?.[0]?.downloadUrl ?? "";
                    shortDamageMap["Shortage"]["amount"] =
                        items.estimatedShortageAmount ?? 0;
                    shortDamageMap["Shortage"]["remarks"] = items.remarks;
                    shortDamageMap["Shortage"]["shortageReason"] = items.shortageReason;
                }

                if (items.issues?.includes("Damaged")) {
                    shortDamageMap["Damaged"] = {};
                    shortDamageMap["Damaged"]["url"] =
                        items.documents?.[0]?.downloadUrl ?? "";
                    shortDamageMap["Damaged"]["amount"] =
                        items.estimatedDamangedAmount ?? 0;
                    shortDamageMap["Damaged"]["remarks"] = items.remarks;
                    shortDamageMap["Damaged"]["damageReason"] = items.damageReason ?? "";
                }
            }

            if (Object.keys(shortDamageMap).length) {
                for (let key in shortDamageMap) {
                    let obj = shortDamageMap[key];
                    shortage_damaged_list += `
                                        <ul>
                                        <li>Type- ${key}</li>
                                        <li>Amount ${key}- ${obj.amount}</li>
                `;
                    if (obj.url) {
                        shortage_damaged_list += `<li>Attachment Link- <a href="${obj.url}">Attachment</a></li>`;
                    }
                    if (obj.remarks) {
                        shortage_damaged_list += `<li>Remarks- ${obj.remarks}</li>`;
                    }
                    if (obj.shortageReason) {
                        shortage_damaged_list += `<li>Shortage Reason- ${obj.shortageReason}</li>`;
                    }
                    if (obj.damageReason) {
                        shortage_damaged_list += `<li>Damaged Reason- ${obj.damageReason}</li>`;
                    }
                    shortage_damaged_list += "</ul>";
                }
            }
        }
        frontUrl = frontUrl ? `<a href="${frontUrl}">E-POD Front</a>` : "";
        backUrl = backUrl ? `<a href="${backUrl}">E-POD Back</a>` : "";

        var html = `
                    <html>
                    <body>
                    <p>Dear sir,</p>
                    <p>Greetings from Fretron!</p>
                    <br />
                    <p>Please find below the details of E-POD completion of consignment ${cnNo} along with neccessary details.</p>
                    <ul>
                    <li><b>FO Number</b>- ${foNumber}</li>
                    <li><b>Vehicle Number</b>- ${vehicleNumber}</li>
                    <li><b>Consignment Number</b>- ${cnNo}</li>
                    <li><b>Ship to Party External Id</b>- ${externalId}</li>
                    <li><b>Customer Name</b>- ${customerName}</li>
                    <li><b>Vehicle Reporting Date</b>- ${vehicleReportingDate}</li>
                    <li><b>Unloading Start Date</b>- ${unloadingStartDate}</li>
                    <li><b>Unloading Finish Date</b>- ${unloadingFinishDate}</li>
                    <li><b>E-POD Links</b>- ${frontUrl} ${backUrl}</li>
                    <li><b>Short/Damage Details</b>-</li>
                    ${shortage_damaged_list}
                    </ul>
                    </body>
                    </html>
          `;

        // const subject = `E-POD Submission for ${cnNo} ${moment(
        //     Date.now() + 19800000
        // ).format("DD-MM-YY")} `;
        const subject = `E-POD Submission ,  FO NO - ${foNumber}, Vehicle Number -${vehicleNumber}, ${customerName}(${externalId})`
        //  cc = ["rahul.bansal@fretron.com", "suyash.kumar@fretron.com", "akram.md@fretron.com"];
        cc.push("harshit.gupta@fretron.com")
        // const to = cn.consignee.contacts?.[0].emails?.[0] ?? cc;
        // const to = ["Nishant.girdhar@jindalstainless.com"];
        const to = ["pooja.bishu@fretron.com"]


        //Call Mailer function
        var response = await mailer(to, cc, subject, html);
        console.log(response);
        async function mailer(to, cc, subject, html) {
            try {
                var url = `${FRT_PUB_BASE_URL}/notifications/emails/email`;

                var options = {
                    uri: url,
                    method: "post",
                    json: true,
                    body: {
                        to: to,
                        cc: cc,
                        subject: subject,
                        html: html,
                        content: "",
                    },
                };

                return await rp(options);
            } catch (error) {
                console.log(`Some error sending mail ${error.message}`);
                return null;
            }
        }

        async function shipmentGET(uuid, token) {
            try {
                var url = `${FRT_PUB_BASE_URL}/shipment/v1/shipment/${uuid}?skipCn=true`;

                var options = {
                    url: url,
                    method: "get",
                    json: true,
                    headers: {
                        Authorization: token,
                    },
                };

                let res = await rp(options);

                if (res.error) {
                    console.log(`Error in fetching shipment ${res.error}`);
                    return null;
                }

                return res.data;
            } catch (error) {
                console.log(`Some error in getting shipment ${error.message}`);

                return null;
            }
        }

        async function ensurePod(uuid, token) {
            try {
                var url = `${FRT_PUB_BASE_URL}/pod/v1/action/ensure-pod?consignmentId=${uuid}`;

                var options = {
                    uri: url,
                    method: "get",
                    json: true,
                    headers: {
                        Authorization: token,
                    },
                };

                let response = await rp(options);

                if (response.error) {
                    console.log(`Error in getting POD from reponse ${response.error}`);
                    return null;
                }

                return response.data;
            } catch (error) {
                console.log(`Some error in getting POD ${error.message}`);
            }
        }
    } catch (error) {
        console.log(`Some error executing automation ${error.message}`);
    }
}

main()