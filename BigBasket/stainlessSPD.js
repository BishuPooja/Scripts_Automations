/**
   * Filter SPD/Mint issues, send consolidated report with attachment of the same
   * By Suyash
   * Sprint 68
   * Task Number- 21303
   */

const rp = require("request-promise")
const moment = require("moment");
const _ = require("lodash")
var FRT_PUB_BASE_URL = "https://apis.fretron.com"
async function main() {
    try {
        const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODM1NDgwNDQsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNGIwMzVmYzgtZDlmMC00ZmUzLWI3ZDUtMWZkMTg3NDQzNTA0IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.hz7XqlxQW6xyyBMNlfuBDV0PXoUq4UGsh_bXY2O7fDE";

        const sevenDaysBack = 7 * 24 * 60 * 60 * 1000;
        let till = Date.now();
        let fromTime = till - sevenDaysBack;
        console.log(`from ${fromTime} : till ${till}`);
        // try {
        //     await closeAllPlantOutIssues();
        // } catch (err) {
        //     console.log("Some error closing issues- " + err.message);
        // }

        try {
            const spdIssue = ["SPD Vehicle Requirement"];
            let openIssues = await getAllIssues(spdIssue, fromTime, till, token);
            if (!openIssues.length) {
                console.log("No open issues found for SPD Vehicle Requirement");
            } else {
                var html = await htmlBuilder(openIssues);
                const cc = [""]
                const to = ["pooja.bishu@fretron.com"]
                const subject = "FRETRON | SPD Open Indent";

                var mailerRes = await mailer(
                    to,
                    cc,
                    subject,
                    html,
                    spdIssue,
                    fromTime,
                    till
                );

                console.log(mailerRes);
            }
        } catch (error) {
            console.log("Some error in open issue function- " + error.message);
        }

        // try {
        //     const mintIssues = ["MINT Vehicle Requirement"];
        //     let openIssues = await getAllIssues(mintIssues, fromTime, till, token);

        //     if (!openIssues.length) {
        //         console.log("No open issues found for MINT Vehicles");
        //     } else {
        //         const isMint = true;
        //         var html = await htmlBuilder(openIssues, isMint);
        //         const cc = [
        //             "dariya.singh@jshl.in",
        //             "akash.tripathy@jshl.in",
        //             "gulshan.saini@jshl.in",
        //             "nishant.girdhar@jshl.in",
        //             "crd.logistics@jshl.in",
        //             "parveen.verma@jshl.in",
        //             "akram.md@fretron.com",
        //         ];
        //         const to = [
        //             "ashwani@jindalstainless.com",
        //             "shailesh.arya@jindalstainless.com",
        //             "arvind.kumar@jshl.in",
        //             "pawan.sharma@jshl.in",
        //             "ashish.goyal@jshl.in",
        //             "pravin.jagtap@jshl.in",
        //             "dev.saini@jshl.in",
        //             "mahendra.saini@jindalsteelway.com",
        //             "dk.verma@jshl.in",
        //             "blanking.qad@jshl.in",
        //             "blanking.shift@jshl.in",
        //         ];

        //         const subject = "FRETRON | MINT Open Indent";

        //         var mailerRes = await mailer(
        //             to,
        //             cc,
        //             subject,
        //             html,
        //             mintIssues,
        //             fromTime,
        //             till
        //         );

        //         console.log(mailerRes);
        //     }
        // } catch (error) {
        //     console.log("Some error in open issue function- " + error.message);
        // }

        async function getAllIssues(issueType, fromTime, till, token) {
            return await rp({
                uri: `https://apis.fretron.com/shipment-view/issues/issues?filters=%7B%22issueType.keyword%22%3A%5B%5D%2C%22tags.keyword%22%3A%5B%5D%2C%22status.keyword%22%3A%5B%5D%2C%22escalationLevel.keyword%22%3A%5B%5D%2C%22escalationName.keyword%22%3A%5B%5D%2C%22escalationPerson.email.keyword%22%3A%5B%5D%2C%22userFollowers.email.keyword%22%3A%5B%5D%2C%22assignee.email.keyword%22%3A%5B%5D%2C%22reporter.email.keyword%22%3A%5B%5D%2C%22resourceType.keyword%22%3A%5B%5D%2C%22priority.keyword%22%3A%5B%5D%7D&from=%5B1681132564937%2C%22c222c8a5-80d6-4a71-b422-620717e337a0%22%5D&sortBy=%7B%22createdAt%22%3A%22desc%22%7D`,
                json: true,
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });
        }

        async function findSh(foNumber, token) {
            let url =
                `${FRT_PUB_BASE_URL}/shipment-view/shipments/v1?filters=` +
                JSON.stringify({
                    __version: 2,
                    "_shcf_FO Number": [`${foNumber}`],
                });
            return await rp({
                uri: url,
                json: true,
                headers: {
                    Authorization: token,
                },
            });
        }

        async function shMaster(uuid, token) {
            let res = await rp({
                uri:
                    `${FRT_PUB_BASE_URL}/shipment/v1/shipment/` + uuid + `?skipCn=true`,
                json: true,
                headers: {
                    Authorization: token,
                },
            });

            return res.status == 200 ? res.data : res.error;
        }

        // async function updateSh(uuid, payload, token) {
        //     let res = await rp({
        //         uri: `${FRT_PUB_BASE_URL}/shipment/v1/shipment/bulk/sync`,
        //         json: true,
        //         method: "POST",
        //         body: {
        //             shipmentId: uuid,
        //             updates: [
        //                 {
        //                     keyToUpdate: "customfields",
        //                     updatedValue: payload,
        //                 },
        //             ],
        //         },
        //         headers: {
        //             Authorization: token,
        //         },
        //     });

        //     return res.status == 200 ? "Sh Updation called" : res.error;
        // }

        // async function updateIssueCf(uuid, payload, token) {
        //     let res = await rp({
        //         url: `${FRT_PUB_BASE_URL}/issue/v1/issue/` + uuid + "/add/customFields",
        //         json: true,
        //         method: "POST",
        //         body: payload,
        //         headers: {
        //             Authorization: token,
        //         },
        //     });

        //     return res.status == 200 ? "CF Updated Successfully!" : res.error;
        // }

        // async function closeAllPlantOutIssues() {
        //     let issuesGet = await rp({
        //         url:
        //             `${FRT_PUB_BASE_URL}/shipment-view/issues/issues?filters=` +
        //             JSON.stringify({
        //                 "issueType.keyword": [
        //                     "SPD Vehicle Requirement",
        //                     "MINT Vehicle Requirement",
        //                 ],
        //                 "tags.keyword": [],
        //                 "status.keyword": ["Open"],
        //                 "escalationLevel.keyword": [],
        //                 "escalationName.keyword": [],
        //                 "escalationPerson.email.keyword": [],
        //                 "userFollowers.email.keyword": [],
        //                 "assignee.email.keyword": [],
        //                 "reporter.email.keyword": [],
        //                 _customeField: {
        //                     "Indent Status": ["Plant-Out"],
        //                 },
        //                 "resourceType.keyword": [],
        //                 "priority.keyword": [],
        //             }) +
        //             "&sortBy=" +
        //             JSON.stringify({ createdAt: "desc" }),
        //         json: true,
        //         headers: {
        //             Authorization: token,
        //         },
        //     });

        //     // for (let issues of issuesGet) {
        //     //     await closeIssue(issues.uuid, token);
        //     // }
        //     console.log("All Plant-Out Issues closed");
        //     return "All Plant-Out Issues closed";
        // }

        async function mailer(to, cc, subject, html, issueKeyword, fromTime, till) {
            let payload = {
                filters: JSON.stringify({
                    // "issueType.keyword": ["SPD Vehicle Requirement", "MINT Vehicle Requirement"],
                    "issueType.keyword": issueKeyword,
                    createdAt: {
                        from: fromTime,
                        till: till,
                    },
                }),
                mailInfo: {
                    to: to,
                    cc: cc,
                    subject: subject,
                    html: html,
                },
                templateId: "e4fdf697-7a67-467c-8617-033727cba6fa",
                search: null,
            };
            let res = await rp({
                uri: `${FRT_PUB_BASE_URL}/report-views/issues/download/email`,
                method: "POST",
                json: true,
                body: payload,
                headers: {
                    Authorization: token,
                },
            });

            /*
               let res = await rp({
                   uri: `${FRT_PUB_BASE_URL}/notifications/emails/email`,
                   method: "POST",
                   json: true,
                   body: {
                       to: to,
                       cc: cc,
                       subject: subject,
                       html: html,
                   }
               })
               */
            return res;
        }

        // async function closeIssue(uuid, token) {
        //     let res = await rp({
        //         url: `${FRT_PUB_BASE_URL}/issue/v1/issue/` + uuid + `/status/Resolved`,
        //         json: true,
        //         headers: {
        //             Authorization: token,
        //         },
        //     });
        //     console.log(res.status == 200 ? "Issue Closed Successfully!" : res.error);
        //     return res.status == 200 ? "Issue Closed Successfully!" : res.error;
        // }

        async function htmlBuilder(issueObj, isMint = false) {
            if (!issueObj.length) {
                return `
                          <html>
                          <body>
                          <div><p>Greetings team,</p></div>
                          <div><p>There were no open Order Found for the issue</p></div>
                          </body>
                          </html>
                  `;
            }
            var remainingHtml = "";
            var arr = [];
            for (let issues of issueObj) {
                // let indentDate = moment(issues.createdAt).format("DD-MM-YY HH:MM")
                let indentDate = moment(Number(issues.createdAt) + 19800000).format("DD-MM-YYYY");
                let requirementDate =
                    issues.customFields?.filter(
                        ({ fieldKey }) => fieldKey == "Requirement Date"
                    )?.[0]?.value ?? "";
                if (requirementDate) {
                    requirementDate = moment(Number(requirementDate) + 19800000).format("DD-MM-YYYY");

                }
                let indentNumber = issues.issueNo;
                let custName =
                    issues.customFields && issues.customFields.length
                        ? issues.customFields.filter(
                            ({ fieldKey, value }) =>
                                fieldKey.includes("Ship-To-Party Name") && value
                        )
                        : [];
                custName = custName.length
                    ? custName.map((e) => e.value.split("-")[0]).join(" | ")
                    : "";
                let destination =
                    issues.customFields && issues.customFields.length
                        ? issues.customFields.filter(
                            ({ fieldKey, value }) =>
                                fieldKey.includes("Ship to City") && value
                        )
                        : [];
                destination = destination.length
                    ? destination.map((e) => e.value).join(",")
                    : "";
                let materialDescription = issues.customFields.find(
                    ({ fieldKey }) => fieldKey == "Material Description"
                );
                try {
                    materialDescription =
                        materialDescription && materialDescription.value
                            ? JSON.parse(materialDescription.value).join(",")
                            : "";
                } catch (err) {
                    materialDescription =
                        materialDescription && materialDescription.value
                            ? materialDescription.value
                            : "";
                }

                let noOfDeliveries =
                    issues.customFields && issues.customFields.length
                        ? issues.customFields.find(
                            ({ fieldKey }) => fieldKey == "No of Deliveries"
                        )
                        : null;
                noOfDeliveries = noOfDeliveries ? noOfDeliveries.value : "";
                let vehicleType =
                    issues.customFields && issues.customFields.length
                        ? issues.customFields.filter(
                            ({ fieldKey }) => fieldKey == "Vehicle Type"
                        )
                        : [];
                vehicleType = vehicleType.length ? vehicleType[0].value : "";
                let vehicleCategory =
                    issues.customFields && issues.customFields.length
                        ? issues.customFields.filter(
                            ({ fieldKey }) => fieldKey == "Vehicle Category"
                        )
                        : [];
                vehicleCategory = vehicleCategory.length
                    ? vehicleCategory[0].value
                    : "";
                let indentStatus = "";

                let vehicleNo =
                    issues.customFields?.find(
                        ({ fieldKey }) => fieldKey === "Vehicle Number"
                    )?.value ?? "";

                let loadingPlant =
                    issues.customFields?.find(
                        ({ fieldKey }) => fieldKey === "Loading Plant"
                    )?.value ?? "";

                let driverNo =
                    issues.customFields?.find(
                        ({ fieldKey }) => fieldKey === "Driver Number"
                    )?.value ?? "";

                let foNumber = issues.customFields.find(
                    ({ fieldKey }) => fieldKey == "FO Number"
                );
                console.log(
                    `Issue ${issues.issueNo} : FO ${foNumber && foNumber.value ? foNumber.value : ""
                    }`
                );

                if (!foNumber || (foNumber && !foNumber.value)) {
                    indentStatus = "Pending";
                } else {
                    var findShRes = await findSh(foNumber.value, token);
                    if (!findShRes.length) {
                        indentStatus = "Pending";
                    }
                    if (!indentStatus) {
                        let issueCfUpdate = [];
                        let shCfUpdate = [];
                        let sh = await shMaster(findShRes[0].uuid, token);

                        let shTrackingStatus = sh.shipmentTrackingStatus;
                        let issueCfs = issues.customFields;

                        let cfFind = issueCfs?.find(
                            ({ fieldKey }) => fieldKey == "Indent Status"
                        );
                        let originArrivalTime = issueCfs?.find(
                            ({ fieldKey }) => fieldKey == "Origin Arrival Time"
                        );
                        let originDepartureTime = issueCfs?.find(
                            ({ fieldKey }) => fieldKey == "Origin Departure Time"
                        );
                        let customerSh = sh.customFields?.find(
                            ({ fieldKey }) => fieldKey == "Customer"
                        )?.value;
                        let destinationSh = sh.customFields?.find(
                            ({ fieldKey }) => fieldKey == "Destination"
                        )?.value;
                        let vehicleTypeSh = sh.customFields?.find(
                            ({ fieldKey }) => fieldKey == "Vehicle Type"
                        )?.value;

                        switch (shTrackingStatus) {
                            case "Enroute For Pickup":
                                indentStatus = "Pending";
                                break;
                            case "At Pickup Point":
                                indentStatus = "In-Plant";
                                if (!cfFind || cfFind.value != "In-Plant") {
                                    issueCfUpdate.push({
                                        indexedValue: [],
                                        fieldKey: "Indent Status",
                                        multiple: false,
                                        description: "",
                                        remark: "",
                                        required: false,
                                        accessType: null,
                                        input: "",
                                        unit: "",
                                        valueType: "string",
                                        options: ["In-Plant", "Plant-Out", "Vehicle Placed"],
                                        fieldType: "select",
                                        value: "In-Plant",
                                        isRemark: false,
                                    });
                                }

                                if (!originArrivalTime) {
                                    issueCfUpdate.push({
                                        indexedValue: [],
                                        fieldKey: "Origin Arrival Time",
                                        multiple: false,
                                        description: "",
                                        remark: "",
                                        required: false,
                                        accessType: null,
                                        input: "date",
                                        unit: "",
                                        valueType: "string",
                                        options: [],
                                        fieldType: "dateTime",
                                        value: sh.shipmentStages[0].arrivalTime + "",
                                        isRemark: false,
                                    });
                                }

                                if (!vehicleNo) {
                                    let vehicleNumber =
                                        sh.fleetInfo.vehicle.vehicleRegistrationNumber;
                                    vehicleNo = vehicleNumber;
                                    issueCfUpdate.push({
                                        indexedValue: [],
                                        fieldKey: "Vehicle Number",
                                        multiple: false,
                                        description: "",
                                        remark: "",
                                        required: false,
                                        accessType: null,
                                        input: null,
                                        unit: "",
                                        valueType: "string",
                                        options: [],
                                        fieldType: "text",
                                        value: vehicleNumber,
                                        isRemark: false,
                                    });
                                }

                                if (!driverNo) {
                                    let driverNumber = sh.fleetInfo.driver?.mobileNumber ?? "";

                                    if (driverNumber) {
                                        driverNo = driverNumber;
                                        issueCfUpdate.push({
                                            indexedValue: [],
                                            fieldKey: "Driver Number",
                                            multiple: false,
                                            description: "",
                                            remark: "",
                                            required: false,
                                            accessType: null,
                                            input: null,
                                            unit: "",
                                            valueType: "string",
                                            options: [],
                                            fieldType: "text",
                                            value: driverNumber,
                                            isRemark: false,
                                        });
                                    }
                                }
                                break;
                            default:
                                indentStatus = "Plant-Out";

                                if (!cfFind || cfFind.value != "Plant-Out") {
                                    issueCfUpdate.push({
                                        indexedValue: [],
                                        fieldKey: "Indent Status",
                                        multiple: false,
                                        description: "",
                                        remark: "",
                                        required: false,
                                        accessType: null,
                                        input: "",
                                        unit: "",
                                        valueType: "string",
                                        options: ["In-Plant", "Plant-Out", "Vehicle Placed"],
                                        fieldType: "select",
                                        value: "Plant-Out",
                                        isRemark: false,
                                    });
                                }

                                if (!originArrivalTime) {
                                    issueCfUpdate.push({
                                        indexedValue: [],
                                        fieldKey: "Origin Arrival Time",
                                        multiple: false,
                                        description: "",
                                        remark: "",
                                        required: false,
                                        accessType: null,
                                        input: "date",
                                        unit: "",
                                        valueType: "string",
                                        options: [],
                                        fieldType: "dateTime",
                                        value: sh.shipmentStages[0].arrivalTime + "",
                                        isRemark: false,
                                    });
                                }

                                if (!originDepartureTime) {
                                    issueCfUpdate.push({
                                        indexedValue: [],
                                        fieldKey: "Origin Departure Time",
                                        multiple: false,
                                        description: "",
                                        remark: "",
                                        required: false,
                                        accessType: null,
                                        input: "date",
                                        unit: "",
                                        valueType: "string",
                                        options: [],
                                        fieldType: "dateTime",
                                        value: sh.shipmentStages[0].departureTime + "",
                                        isRemark: false,
                                    });
                                }

                                if (!vehicleNo) {
                                    let vehicleNumber =
                                        sh.fleetInfo.vehicle.vehicleRegistrationNumber;
                                    vehicleNo = vehicleNumber;
                                    issueCfUpdate.push({
                                        indexedValue: [],
                                        fieldKey: "Vehicle Number",
                                        multiple: false,
                                        description: "",
                                        remark: "",
                                        required: false,
                                        accessType: null,
                                        input: null,
                                        unit: "",
                                        valueType: "string",
                                        options: [],
                                        fieldType: "text",
                                        value: vehicleNumber,
                                        isRemark: false,
                                    });
                                }

                                if (!driverNo) {
                                    let driverNumber = sh.fleetInfo.driver?.mobileNumber ?? "";

                                    if (driverNumber) {
                                        driverNo = driverNumber;
                                        issueCfUpdate.push({
                                            indexedValue: [],
                                            fieldKey: "Driver Number",
                                            multiple: false,
                                            description: "",
                                            remark: "",
                                            required: false,
                                            accessType: null,
                                            input: null,
                                            unit: "",
                                            valueType: "string",
                                            options: [],
                                            fieldType: "text",
                                            value: driverNumber,
                                            isRemark: false,
                                        });
                                    }
                                }

                                break;
                        }

                        if (custName && customerSh != custName) {
                            shCfUpdate.push({
                                indexedValue: [""],
                                fieldKey: "Customer",
                                multiple: false,
                                description: "",
                                remark: "",
                                required: true,
                                accessType: null,
                                input: null,
                                unit: null,
                                valueType: "string",
                                options: null,
                                fieldType: "text",
                                value: custName,
                                isRemark: false,
                            });
                        }

                        if (destination && destinationSh != destination) {
                            shCfUpdate.push({
                                indexedValue: [""],
                                fieldKey: "Destination",
                                multiple: false,
                                description: "",
                                remark: "",
                                required: true,
                                accessType: null,
                                input: null,
                                unit: null,
                                valueType: "string",
                                options: null,
                                fieldType: "text",
                                value: destination,
                                isRemark: false,
                            });
                        }

                        if (vehicleType && vehicleTypeSh != vehicleType) {
                            shCfUpdate.push({
                                indexedValue: [""],
                                fieldKey: "Vehicle Type",
                                multiple: false,
                                description: "",
                                remark: "",
                                required: true,
                                accessType: null,
                                input: null,
                                unit: null,
                                valueType: "string",
                                options: null,
                                fieldType: "text",
                                value: vehicleType,
                                isRemark: false,
                            });
                        }

                        // if (issueCfUpdate.length) {
                        //     let response = await updateIssueCf(
                        //         issues.uuid,
                        //         issueCfUpdate,
                        //         token
                        //     );
                        //     console.log("Issue CF Update Res- " + response);
                        // } else {
                        //     console.log("Not updating Issue Custom Field");
                        // }

                        // if (shCfUpdate.length) {
                        //     let response = await updateSh(sh.uuid, shCfUpdate, token);
                        //     console.log("Shipment CF Update Res- " + response);
                        // } else {
                        //     console.log("Not updating Shipment Custom Field");
                        // }
                    }
                }

                foNumber = foNumber?.value ?? "";
                arr.push({
                    indentDate: indentDate,
                    requirementDate: requirementDate,
                    indentNumber: indentNumber,
                    loadingPlant: loadingPlant,
                    foNumber: foNumber,
                    noOfDeliveries: noOfDeliveries,
                    indentStatus: indentStatus,
                    destination: destination,
                    materialDescription: materialDescription,
                    vehicleType: vehicleType,
                    vehicleCategory: vehicleCategory,
                    vehicleNo: vehicleNo,
                    driverNo: driverNo,
                    custName: custName
                        ? custName
                            .split(" | ")
                            .map((element, index) => {
                                if (custName.split(" | ").length - 1 == index) {
                                    return element;
                                } else {
                                    return `${element}<font size="+1"> | </font>`;
                                }
                            })
                            .join(" ")
                        : "",
                });
            }

            let groupedData = _.groupBy(arr, "indentStatus");
            for (let key in groupedData) {
                let array = groupedData[key];
                for (let arr of array) {
                    remainingHtml += `
                                                    <tr>
                                                    <td>${arr.requirementDate}</td>
                                                    <td>${arr.indentStatus}</td>
                                                    <td>${arr.custName}</td>
                                                    <td>${arr.destination}</td>
                                                    <td>${arr.vehicleType}</td>
                                                    <td>${arr.vehicleNo}</td>
                                                    <td>${arr.driverNo}</td>
                                                    <td>${arr.vehicleCategory}</td>
                                                    <td>${arr.noOfDeliveries}</td>
                                                    <td>${arr.materialDescription
                        }</td>
                                                    <td>${arr.indentDate}</td>
                                                    <td>${arr.indentNumber}</td>
                                                    ${isMint
                            ? `<td>${arr.loadingPlant}</td>`
                            : ""
                        }
                                                    <td>${arr.foNumber}</td>
                                                    </tr>
                                    `;
                }
            }
            console.log(remainingHtml)
            return `<html>
                                      <head>
                                      <style>
                                      table,tbody,th,td {
                                          border: 1px solid black;
                                          border-collapse: collapse;
                                          width: 1200px;
                                          margin-left: auto;
                                          margin-right: auto;
                                          }
                                          th, td {
                                          padding: 2px;
                                          text-align: center;
                                          }
                                      </style>
                                      </head>
                                      <body>
                                      <table>
                                      <tr style="background: rgb(97, 176, 169)">
                                      <th>Requirement Date</th>
                                      <th>Indent Status</th>
                                      <th>Customer Name</th>
                                      <th>Destination</th>
                                      <th>Vehicle Type</th>
                                      <th>Vehicle Number</th>
                                      <th>Driver Number</th>
                                      <th>Vehicle Category</th>
                                      <th>No Of Deliveries</th>
                                      <th>Material Description</th>
                                      <th>Indent Date</th>
                                      <th>Indent Number</th>
                                      ${isMint ? "<th>Loading Plant</th>" : ""}
                                      <th>FO Number</th>
                                      </tr>
                                      ${remainingHtml}
                                      </table>
                                      </body>
                                      </html>
                              `;

        }
    } catch (err) {
        console.log("Some error executing API- " + err.message);

        return {
            data: null,
            error: "Some error executing API- " + err.message,
            status: 500,
        };
    }
}


main()