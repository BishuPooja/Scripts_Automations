/**
   * Disconnection report (Consolidated)--> Filter shipments disconnected and no data --> send report in appropriate format
   * -By Suyash
   */
const rp = require("request-promise")
const _ = require("lodash")
const moment = require("moment")
const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTEwNDk2MzUsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiODIzOTQ3YTMtMDJjMC00ZTY1LThmNGUtMjFkYTM3MGVhNmNkIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.mn0TXQ9OT6HbiMNQlpoFxqi4RYr9KQjPVstnKEyb6JY";
var FRT_PUB_BASE_URL = "https://apis.fretron.com"


async function main() {
    try {
        const getMailInfo = async (name) => {
            try {
                let uri = `${FRT_PUB_BASE_URL}/automate/autoapi/run/85ab9431-cdd6-4b34-8c5e-17dedfed88c7?name=${name}`;

                let options = {
                    uri: uri,
                    method: "get",
                    json: true,
                };

                let res = await rp(options);

                if (res.error) {
                    console.log(`Some error ${res.error}`);
                    return null;
                }

                return res.data ?? null;
            } catch (err) {
                console.log(`Some error getting mail info ${err.message}`);
            }
        };

        const disconnectedShs = async () => {
            return await rp({
                url: `${FRT_PUB_BASE_URL}/shipment-view/shipments/v1?filters={"_origin_":{"_nested":{"_path":"shipmentStages","isVtsDisconnected":["true"],"shipmentStages.status.keyword":["AT","UPCOMING"]}},"__version":2}&size=3000&allFields=["fleetInfo","customFields","delayReason","shipmentStages","currentLocation","uuid"]`,
                json: true,
                headers: {
                    Authorization: token,
                },
            });
        };

        const noDataShs = async () => {
            return await rp({
                url: `${FRT_PUB_BASE_URL}/shipment-view/shipments/v1?filters={"_origin_":{"_nested":{"_path":"shipmentStages","shipmentStages.status.keyword":["AT","UPCOMING"],"_not":{"_exists":["shipmentStages.tripPoint.currentGpsState.state"]}}},"trackingMode":["VTS"],"__version":2}&size=3000&allFields=["fleetInfo","customFields","delayReason","shipmentStages","creationTime","currentLocation","uuid"]`,
                json: true,
                headers: {
                    Authorization: token,
                },
            });
        };

        const locationTrail = async (shId) => {
            try {
                let url = `https://apis.fretron.com/shipment/v1/shipment/${shId}/location-trail`;

                let options = {
                    uri: url,
                    method: "GET",
                    json: true,
                    headers: {
                        Authorization: token,
                    },
                };

                let res = await rp(options);

                return res.data;
            } catch (error) {
                console.log(`Some error in locationTrail ${error.message}`);
                return null;
            }
        };

        const mailer = async (to, cc, subject, html) => {
            console.log(`to: ${to}`)
            console.log(`cc: ${cc}`)

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

            return "Mail sent successfully";
        };

        let sh1 = await disconnectedShs();

        let sh2 = await noDataShs();

        let arr = [];
        let vehiclesDisconnectedData = []
        for (let items of sh1) {
            if (_.last(items.shipmentStages).arrivalTime) continue;
            let productCategory = "";
            let vehicleNumber = items.fleetInfo.vehicle.vehicleRegistrationNumber;
            let driverNumber = items.fleetInfo.driver.mobileNumber;
            let remarks = "";
            let tptName = items.fleetInfo.forwardingAgent
                ? items.fleetInfo.forwardingAgent.name
                : items.fleetInfo.broker
                    ? items.fleetInfo.broker.name
                    : items.fleetInfo.fleetOwner
                        ? items.fleetInfo.fleetOwner.name
                        : "";

            let customerName = "";
            let gateOutTime = "";
            let destination = _.last(items.shipmentStages).place
                ? _.last(items.shipmentStages).place.name.toUpperCase()
                : _.last(items.shipmentStages).hub
                    ? _.last(items.shipmentStages).hub.name
                    : "";
            let tptType = "";
            if (items.customFields) {
                for (let cfs of items.customFields) {
                    if (cfs.fieldKey == "Customer Name") {
                        customerName = cfs.value;
                    }
                    if (cfs.fieldKey == "Gate Out Time SAP") {
                        gateOutTime = Number(cfs.value);
                    }
                    if (cfs.fieldKey == "Transportation Type") {
                        tptType = cfs.value;
                    }
                    if (cfs.fieldKey.trim() == "Disconnection Remark") {
                        remarks = cfs.value;
                    }
                }
            }
            if (
                tptType == "PT" &&
                _.first(items.shipmentStages).status == "COMPLETED"
            )
                continue;
            gateOutTime = gateOutTime
                ? new Date(gateOutTime + 19800000).toLocaleString()
                : _.first(items.shipmentStages).departureTime
                    ? new Date(
                        _.first(items.shipmentStages).departureTime + 19800000
                    ).toLocaleString("en-GB")
                    : "";
            let diconnectedStage = items.shipmentStages.filter(
                ({ tripPoint }) => tripPoint && tripPoint.isDisconnected == true
            );
            let disconnectedTime = 0;
            if (diconnectedStage.length) {
                let epochSinceDisconnection = diconnectedStage[0].tripPoint
                    .currentGpsState
                    ? diconnectedStage[0].tripPoint.currentGpsState.endTime
                    : diconnectedStage[0].tripPoint.actualArrival;
                disconnectedTime =
                    Number(Date.now() - epochSinceDisconnection) / 3600000;
            }
            if (disconnectedTime && disconnectedTime < 0.5) continue;

            let lastLocation = items.currentLocation
                ? items.currentLocation.address
                : "";
            let upcomingOrAt = items.shipmentStages.find(
                (_) => _.status == "AT" || _.status == "UPCOMING"
            );
            if (!upcomingOrAt) {
                upcomingOrAt = items.shipmentStages[items.shipmentStages.length - 1];
            }
            let lastLocationTimeByGps = upcomingOrAt?.tripPoint?.currentGpsState
                ?.endTime
                ? new Date(
                    upcomingOrAt?.tripPoint?.currentGpsState?.endTime + 19800000
                ).toLocaleString("en-GB")
                : items.currentLocation
                    ? new Date(items.currentLocation.time + 19800000).toLocaleString(
                        "en-GB"
                    )
                    : "";
            let locationTrailRes = await locationTrail(items.uuid);
            let lastLocationTimeByFastTag = "";

            if (locationTrailRes.length) {
                locationTrailRes = locationTrailRes.filter(
                    ({ decoder }) => decoder === "fastag"
                );

                if (locationTrailRes.length) {
                    locationTrailRes.sort((a, b) => b.time - a.time);

                    lastLocationTimeByFastTag = new Date(
                        locationTrailRes[0].time + 19800000
                    ).toLocaleString("en-GB");
                }
            }
            productCategory = items.customFields.filter(
                ({ fieldKey }) => fieldKey == "Material Type"
            );
            productCategory = productCategory.length ? productCategory[0].value : "";
            vehiclesDisconnectedData.push(vehicleNumber)
            arr.push({
                vehicleNumber: vehicleNumber,
                driverNumber: driverNumber,
                disconnectedTime: disconnectedTime,
                disconnectionRemarks: remarks ? remarks : "",
                tptName: tptName,
                customerName: customerName,
                destination: destination,
                gateOutTime: gateOutTime,
                lastLocation: lastLocation,
                lastLocationTimeByGps: lastLocationTimeByGps,
                lastLocationTimeByFastTag: lastLocationTimeByFastTag,
                productCategory: productCategory,
                tptType: tptType,
            });
        }

        for (let items of sh2) {
            let productCategory = "";
            let vehicleNumber = items.fleetInfo.vehicle.vehicleRegistrationNumber;
            let driverNumber = items.fleetInfo.driver.mobileNumber;
            let remarks = "";
            let tptName = items.fleetInfo.forwardingAgent
                ? items.fleetInfo.forwardingAgent.name
                : items.fleetInfo.broker
                    ? items.fleetInfo.broker.name
                    : items.fleetInfo.fleetOwner
                        ? items.fleetInfo.fleetOwner.name
                        : "";
            let customerName = "";
            let gateOutTime = "";
            let destination = _.last(items.shipmentStages).place
                ? _.last(items.shipmentStages).place.name.toUpperCase()
                : _.last(items.shipmentStages).hub
                    ? _.last(items.shipmentStages).hub.name
                    : "";
            let tptType = "";
            if (items.customFields) {
                for (let cfs of items.customFields) {
                    if (cfs.fieldKey == "Customer Name") {
                        customerName = cfs.value;
                    }
                    if (cfs.fieldKey == "Gate Out Time SAP") {
                        gateOutTime = Number(cfs.value);
                    }
                    if (cfs.fieldKey == "Transportation Type") {
                        tptType = cfs.value;
                    }
                    if (cfs.fieldKey.trim() == "Disconnection Remark") {
                        remarks = cfs.value;
                    }
                }
            }
            if (
                tptType == "PT" &&
                _.first(items.shipmentStages).status == "COMPLETED"
            )
                continue;
            gateOutTime = gateOutTime
                ? new Date(gateOutTime + 19800000).toLocaleString()
                : _.first(items.shipmentStages).departureTime
                    ? new Date(
                        _.first(items.shipmentStages).departureTime + 19800000
                    ).toLocaleString()
                    : "";

            let timeElapsedHrs = Number(Date.now() - items.creationTime) / 3600000;
            if (timeElapsedHrs && timeElapsedHrs < 0.5) continue;

            let lastLocation = items.currentLocation
                ? items.currentLocation.address
                    ? items.currentLocation.address
                    : ""
                : "";
            let upcomingOrAtStage = items.shipmentStages.filter(
                ({ status }) => status === "AT" || status === "UPCOMING"
            );

            if (!upcomingOrAtStage.length) {
                upcomingOrAtStage =
                    items.shipmentStages[items.shipmentStages.length - 1];
            }
            let lastLocationTimeByGps = upcomingOrAtStage[0]?.tripPoint
                ?.currentGpsState?.endTime
                ? new Date(
                    upcomingOrAtStage[0].tripPoint.currentGpsState.endTime + 19800000
                ).toLocaleString("en-GB")
                : "";
            let locationTrailRes = await locationTrail(items.uuid);

            let lastLocationTimeByFastTag = "";

            if (locationTrailRes.length) {
                locationTrailRes = locationTrailRes.filter(
                    ({ decoder }) => decoder === "fastag"
                );

                if (locationTrailRes.length) {
                    locationTrailRes.sort((a, b) => b.time - a.time);

                    lastLocationTimeByFastTag = new Date(
                        locationTrailRes[0].time + 19800000
                    ).toLocaleString("en-GB");
                }
            }
            productCategory = items.customFields.filter(
                ({ fieldKey }) => fieldKey == "Material Type"
            );
            productCategory = productCategory.length ? productCategory[0].value : "";
            if (vehiclesDisconnectedData.find(v => v == vehicleNumber)) {
                continue
            }

            arr.push({
                vehicleNumber: vehicleNumber,
                driverNumber: driverNumber,
                disconnectedTime: timeElapsedHrs,
                disconnectionRemarks: remarks ? remarks : "",
                tptName: tptName,
                customerName: customerName,
                destination: destination,
                gateOutTime: gateOutTime,
                lastLocation: lastLocation,
                lastLocationTimeByGps: lastLocationTimeByGps,
                lastLocationTimeByFastTag: lastLocationTimeByFastTag,
                productCategory: productCategory,
                tptType: tptType,
            });


        }

        try {
            let count = 1;
            let remainingHtml = "";
            let sortedArr = arr.sort(
                (a, b) => b.disconnectedTime - a.disconnectedTime
            );
            for (let items of sortedArr) {
                let remainingHrs = items.disconnectedTime.toFixed(2);
                let timeElapsedHrs = remainingHrs.toString().split(".");
                let hrs =
                    Math.round(Number(timeElapsedHrs[1]) * 0.06) == 60
                        ? (Number(timeElapsedHrs[0]) + 1).toString().padStart(2, "0")
                        : Number(timeElapsedHrs[0]).toString().padStart(2, "0");
                let mins =
                    timeElapsedHrs[1] &&
                        Math.round(Number(timeElapsedHrs[1]) * 0.06) != 60
                        ? Math.round(Number(timeElapsedHrs[1]) * 0.06)
                            .toString()
                            .padStart(2, "0")
                        : "00";
                if (hrs == "00" && Number(mins) < 30) continue;
                let disconnectedTime = `${hrs}:${mins} `;
                remainingHtml += `
          <tr>
          <td>${count}</td>
          <td>${items.vehicleNumber}</td>
          <td>${items.driverNumber}</td>
          <td>${items.disconnectionRemarks}</td>
          <td>${disconnectedTime}</td>
          <td>${items.tptName}</td>
          <td>${items.lastLocation}</td>
          <td>${items.lastLocationTimeByGps}</td>
          <td>${items.lastLocationTimeByFastTag}</td>
          <td>${items.customerName}</td>
          <td>${items.destination}</td>
          <td>${items.gateOutTime}</td>
          <td>${items.productCategory}</td>
          <td>${items.tptType}</td>
          </tr>
          `;
                count += 1;
            }

            let html = `
    <html>
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
    p {
    font-size: 17px;
    }
    </style>
    </head>
    <body>
    <p>Dear Sir, Greetings!</p>
    <p>Kindly find the vehicles which does not have any location data.</p>
    <br />
    <table>
    <tr>
    <th colspan="24" style="background: rgb(250, 65, 65);">${(
                    "Disconnection Report " + moment(Date.now()).format("DD MMMM YYYY")
                ).toUpperCase()}</th>
    </tr>
    <tr colspan = "3" style = "background: rgb(251, 221, 109);">
    <th>S No.</th>
      <th> Vehicle Number </th>
          <th> Driver Number </th>
          <th> Disconnection Remarks </th>
              <th> Disconnected Since </th>
                  <th> Transporter Name </th>
                  <th> Last Location </th>
                  <th> Last location date time by GPS </th>
                  <th> Last location date time by Fast Tag </th>
                      <th> Customer Name </th>
                          <th> Destination </th>
                          <th> Gate Out Time </th>
                          <th> Product Type </th>
                          <th> Type </th>
                              </tr>
    ${remainingHtml}
    </table>
    </body>
    </html>
    `;
            var mailInfo = await getMailInfo("LOGISTICS");
            if (null) {
                var to = mailInfo.to;
                var cc = mailInfo.cc;
            } else {
                var to = ["pooja.bishu@fretron.com"]
                var cc = ["suyash.kumar"]
            }
            // let cc = ["jageshwar.kumar@jindalsteel.com", "ashish.sharma@jindalsteel.com", "rama.mohanty@jindalsteel.com", "neeraj.kumar1@jindalsteel.com", "rahul.bansal@fretron.com", "sagar.maruti@fretron.com", "vivek.kumar@fretron.com", "madnatand.pat@jindalsteel.com", "jspl.patratu@fretron.com", "kuntal.chakraborty@jindalsteel.com", "mukesh.panchal@jindalsteel.com", "ajay.mishra@jindalsteel.com", "abhishek.sinha@jindalsteel.com", "hadi.zaidi@jindalsteel.com", "cso.patratu.pat@jindalsteel.com", "cctv.support.pat@jindalsteel.com", "saphelpdesk.pat@jindalsteel.com"];

            // if ($event && $event.query && $event.query.To) {
            //     let toFromQuery = $event.query.To.trim()
            //         .split(",")
            //         .map((e) => (e = e.trim()));
            //     to = to.concat(toFromQuery);
            // }
            // if ($event && $event.query && $event.query.Cc) {
            //     let ccFromQuery = $event.query.Cc.trim()
            //         .split(",")
            //         .map((e) => (e = e.trim()));
            //     cc = cc.concat(ccFromQuery);
            // }

            const subject =
                "FRETRON <> Red GPS (DATA not coming) Vehicles Status report " +
                moment(Date.now() + 19800000).format("DD-MM-YY");
            let mailRES = await mailer(to, cc, subject, html);
            console.log(mailRES);

            return {
                data: mailRES,
                error: null,
                status: 200,
            };
        } catch (err) {
            console.log(`Some error ${err.message}`);
        }
    } catch (err) {
        console.log("Error executing script- " + err.message);

        return {
            data: null,
            error: "Internal Server Error- " + err.message,
            status: 500,
        };
    }
}

main()
