
const rp = require("request-promise")
var FRT_PUB_BASE_URL = "https://apis.fretron.com"
const { log } = require("console");
const { loadavg } = require("os");
const _ = require("lodash")
const moment = require("moment")
const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTg4MTY0OTMsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNWM2MGNiODktZGM2YS00M2QzLWExZmYtYjA2OWEzZTJkMWQ4IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.YuWzQeFxCcN9WnofCZGo8XbE0jIwazk3DsaSjX5lraQ"
//

async function test() {
    try {
        let shipments = await enrouteShs();
        let finalRes = [];
        console.log("Total Enroute Shs- " + shipments.length);

        for (let items of shipments) {
            try {
                let cfs = items.customFields;
                //Conditions Check
                if (!cfs || cfs.length == 0) continue;
                let triggerMailUpdateCF = cfValueExtract(cfs, "Trigger update mail");
                if (!triggerMailUpdateCF || triggerMailUpdateCF === "No") { continue; }

                //CFs Filter for values
                let shStageOri = _.first(items.shipmentStages);
                let shStageDest = _.last(items.shipmentStages);

                let mawbNo = cfValueExtract(cfs, "MAWB Number");
                let truckNo = items.fleetInfo.vehicle.vehicleRegistrationNumber;
                let origin = shStageOri.place.name.split(" ");
                origin = _.last(origin);
                let destination = shStageDest.place.name.split(" ");
                destination = _.last(destination);

                let grossWeight = cfValueExtract(cfs, "Gross Weight (KG)");
                let chargeableWeight = cfValueExtract(cfs, "Chargeable Weight (KG)");
                let noOfPackets = cfValueExtract(cfs, "No. of Packets (Pcs)");
                let truckingRoute = cfValueExtract(cfs, "Route");
                let uuid = items.uuid;

                let oriDepartEpoch = shStageOri.departureTime + 19800000;
                let shDepartTime = `${new Date(oriDepartEpoch)
                    .getDate()
                    .toString()
                    .padStart(2, "0")}/${(new Date(oriDepartEpoch).getMonth() + 1)
                        .toString()
                        .padStart(2, "0")}/${new Date(
                            oriDepartEpoch
                        ).getFullYear()} at ${new Date(oriDepartEpoch)
                            .getHours()
                            .toString()
                            .padStart(2, "0")}:${new Date(oriDepartEpoch)
                                .getMinutes()
                                .toString()
                                .padStart(2, "0")}`;
                let transitTime = cfValueExtract(cfs, "Transit Time (Hrs)");
                let commitedETAEpoch = cfValueExtract(cfs, "Committed ETA");
                commitedETAEpoch = commitedETAEpoch
                    ? Number(commitedETAEpoch) + 19800000
                    : "";

                let commitedETA = commitedETAEpoch
                    ? `${new Date(commitedETAEpoch)
                        .getDate()
                        .toString()
                        .padStart(2, "0")}/${(new Date(commitedETAEpoch).getMonth() + 1)
                            .toString()
                            .padStart(2, "0")}/${new Date(
                                commitedETAEpoch
                            ).getFullYear()} at ${new Date(commitedETAEpoch)
                                .getHours()
                                .toString()
                                .padStart(2, "0")}:${new Date(commitedETAEpoch)
                                    .getMinutes()
                                    .toString()
                                    .padStart(2, "0")}`
                    : "";
                let actualETAEpoch = cfValueExtract(cfs, "Actual ETA");
                actualETAEpoch = actualETAEpoch
                    ? Number(actualETAEpoch) + 19800000
                    : "";

                let actualETA = actualETAEpoch
                    ? `${new Date(actualETAEpoch)
                        .getDate()
                        .toString()
                        .padStart(2, "0")}/${(new Date(actualETAEpoch).getMonth() + 1)
                            .toString()
                            .padStart(2, "0")}/${new Date(
                                actualETAEpoch
                            ).getFullYear()} at ${new Date(actualETAEpoch)
                                .getHours()
                                .toString()
                                .padStart(2, "0")}:${new Date(actualETAEpoch)
                                    .getMinutes()
                                    .toString()
                                    .padStart(2, "0")}`
                    : "";
                let delayed = cfValueExtract(cfs, "Is Delayed");
                let delayReason = cfValueExtract(cfs, "Reason (If delayed)");
                delayReason = delayReason ? delayReason : "N/A";


                let distanceToGo =
                    shStageDest.tripPoint && shStageDest.tripPoint.remainingDistance
                        ? (shStageDest.tripPoint.remainingDistance / 1000).toFixed(0)
                        : 0;

                // @DEPRECATED totalDistance calculation on basis of tripPoint
                // let totalDistance =
                //     distanceCovered || distanceToGo
                //         ? Number(distanceCovered) + Number(distanceToGo)
                //         : cfValueExtract(cfs, "Total Distance (KM)")
                //             ? Number(cfValueExtract(cfs, "Total Distance (KM)"))
                //             : 0;

                var totalDistance = cfValueExtract(cfs, "Total Distance (KM)");

                if (!totalDistance) {
                    if (items?.routeId) {
                        var resRoute = await getRoute(items?.routeId, token);
                        try {
                            totalDistance = Math.round((resRoute?.[0]?.distance ?? 0) / 1000);
                        } catch (e) {
                            console.log(e);
                        }
                    } else {
                        let originCenterCordinates = shStageOri.place
                            ? shStageOri.place.center
                            : shStageOri.hub
                                ? shStageOri.hub.center
                                : null;

                        let destinationCenterCordinates = shStageDest.place
                            ? shStageDest.place.center
                            : shStageDest.hub
                                ? shStageDest.hub.center
                                : null;

                        if (originCenterCordinates && destinationCenterCordinates) {
                            totalDistance = await calculateTotalDistance(
                                originCenterCordinates,
                                destinationCenterCordinates
                            );
                        }
                    }
                }

                totalDistance = totalDistance
                    ? parseFloat(totalDistance).toFixed(0)
                    : 0;

                let distanceCovered = 0
                if (totalDistance && distanceToGo) {
                    distanceCovered = (totalDistance - Number(distanceToGo))
                }
                if (distanceCovered <= 0) {
                    distanceCovered = shStageDest.tripPoint
                        ? shStageDest.tripPoint.coveredDistance
                        : 0;
                    distanceCovered = distanceCovered
                        ? (distanceCovered / 1000).toFixed()
                        : 0;
                }
                let currentLocation = items.currentLocation
                    ? items.currentLocation.address
                    : "";
                currentLocation = currentLocation ? currentLocation.split(",") : "";
                let str = "";
                if (currentLocation) {
                    currentLocation.map((e, i) => {
                        if (i != 0 && i % 2 == 0) {
                            str += `<br />`;
                        }
                        str += e;
                    });
                }
                let htmlStr = htmlStringGen(
                    mawbNo,
                    totalDistance,
                    origin,
                    distanceCovered,
                    destination,
                    distanceToGo ? distanceToGo : "",
                    truckingRoute,
                    str,
                    shDepartTime,
                    truckNo,
                    transitTime,
                    grossWeight,
                    commitedETA,
                    chargeableWeight,
                    actualETA,
                    noOfPackets,
                    delayed,
                    delayReason,
                    uuid
                );

                let subject = "Status Update - AIRLIFT SERVICES";
                // let toArr = cfValueExtract(cfs, "Customer Email's");
                // toArr = toArr ? toArr.split(",").map((e) => e.trim()) : [];
                // let to = toArr.length ? toArr : ["operations@airliftservices.in"];
                // let cc = ["status@airliftservices.in", "ops@airliftservices.in"];
                let to = ["pooja.bishu@fretron.com"]
                let cc = []

                // put all customer mail ids above the mail ids ending with @airliftservices.in
                // toArr.sort(function (mailId) {
                //     if (mailId.endsWith("@airliftservices.in")) return 1;
                //     else return -1;
                // });
                // console.log("to array : " + toArr);
                let response = await mailer(subject, to, cc, htmlStr);
                console.log(response)
                finalRes.push({
                    shipmentNumber: items.shipmentNumber,
                    error: null,
                    status: response,
                });
            } catch (error) {
                console.log(`Some error in data manipulation ${error.message}`);
            }
        }

        console.log({ data: finalRes, error: null, status: 200 });
        return { data: finalRes, error: null, status: 200 };

        async function enrouteShs() {
            return await rp({
                url: `${FRT_PUB_BASE_URL}/shipment-view/shipments/v1?filters=%7B%22_shipmentTrackingStatus_%22%3A%7B%22_or%22%3A%7B%22_enroute_for_delivery_%22%3A%7B%22shipmentTrackingStatus%22%3A%5B%22Enroute%20For%20Delivery%22%5D%7D%7D%7D%2C%22__version%22%3A2%7D&size=500&allFields=["customFields","shipmentNumber","uuid","currentLocation","shipmentStages","fleetInfo","routeId"]`,
                json: true,
                headers: {
                    Authorization: token,
                },
            });
        }

        async function mailer(subject, to, cc, html) {
            console.log("Sending email with SUB: " + subject);
            await rp({
                uri: `${FRT_PUB_BASE_URL}/notifications/emails/email`,
                method: "POST",
                body: {
                    cc: cc,
                    to: to,
                    subject: subject,
                    html: html,
                    sender: "Airlift Services Vehicle Status updates",
                },
                timeout: 2000,
                json: true,
            });
            return "Mail sent successfully!";
        }

        function htmlStringGen(
            mawbNo,
            totalDistance,
            origin,
            distanceCovered,
            destination,
            dist2Go,
            route,
            currentLocation,
            shipmentDepart,
            vehicleNumber,
            transitTime,
            grossWeight,
            committedETA,
            chargeableWeight,
            actualETA,
            noOfPackages,
            delayed,
            delayReason,
            uuid
        ) {
            return `
                      <html>
                      <head>
                          <style>
                          table,
                          th,
                          td {
                              border: 1px solid black;
                              border-collapse: collapse;
                              margin-left: auto;
                              margin-right: auto;
                              text-align: center;
                              font-family: Calibri, sans-serif;
                              word-wrap: break-word
                          }
                          </style>
                          <body>
                          <p>Dear Sir,</p>
                          <p>Please find the link below to track the live status of your shipment. Brief detail is mentioned below for your reference:</p>
                          <br />
                          <table>
                              <tr>
                              <th colspan="12" width="600px" align="center">
                                  <img
                                  src="https://i.ibb.co/g3DjJz4/Airlift-Logo.png"
                                  alt="Airlift Services Pvt Ltd"
                                  width="200"
                                  height="100"
                                  />
                              </th>
                              </tr>
                              <tr>
                              <th colspan="3">MAWB No.</th>
                              <td colspan="3">${mawbNo}</td>
                              <th colspan="3">Total Distance (km)</th>
                              <td colspan="3">${totalDistance}</td>
                              </tr>
                              <tr>
                              <th colspan="3">Origin</th>
                              <td colspan="3">${origin}</td>
                              <th colspan="3">Distance Covered (km)</th>
                              <td colspan="3">${distanceCovered}</td>
                              </tr>
                              <tr>
                              <th colspan="3">Destination</th>
                              <td colspan="3">${destination}</td>
                              <th colspan="3">Distance to go (km)</th>
                              <td colspan="3">${dist2Go}</td>
                              </tr>
                              <tr>
                              <th colspan="3">Trucking Route</th>
                              <td colspan="3">${route}</td>
                              <th colspan="3">Current Location</th>
                              <td colspan="3">${currentLocation}</td>
                              </tr>
                              <tr>
                              <th colspan="3">Shipment Departed</th>
                              <td colspan="3">${shipmentDepart}</td>
                              <th colspan="3">Truck No.</th>
                              <td colspan="3">${vehicleNumber}</td>
                              </tr>
                              <tr>
                              <th colspan="3">Transit Time (hrs)</th>
                              <td colspan="3">${transitTime}</td>
                              <th colspan="3">Gross Weight (kgs)</th>
                              <td colspan="3">${grossWeight}</td>
                              </tr>
                              <tr>
                              <th colspan="3">Committed ETA</th>
                              <td colspan="3">${committedETA}</td>
                              <th colspan="3">Chargeable Weight (kgs)</th>
                              <td colspan="3">${chargeableWeight}</td>
                              </tr>
                              <tr>
                              <th colspan="3">Actual ETA</th>
                              <td colspan="3">${actualETA}</td>
                              <th colspan="3">No. of packages</th>
                              <td colspan="3">${noOfPackages}</td>
                              </tr>
                              <tr>
                              <th colspan="3">Delayed</th>
                              <td colspan="3">${delayed}</td>
                              <th colspan="3">Delay Reason</th>
                              <td colspan="3">${delayReason}</td>
                              </tr>
                              <tr>
                              <th colspan="3">Tracking Link</th>
                              <td colspan="3">
                                  <a
                                  href="https://jsl.fretron.com/shared-shipment/v2?uuid=${uuid}"
                                  >Click Here</a
                                  >
                              </td>
                              <th colspan="3"></th>
                              <td colspan="3"></td>
                              </tr>
                          </table>
                          <br />
                          <p><b>Thanks and Regards,</b></p>
                          <p><b>Team Airlift.</b></p>
                          <img
                              src="https://i.ibb.co/g3DjJz4/Airlift-Logo.png"
                              alt="Airlift Services Pvt Ltd"
                              width="125"
                              height="75"
                          />
                          </body>
                      </head>
                      </html>
              `;
        }

        function cfValueExtract(arr, key) {
            // let filter = arr.filter(({ fieldKey }) => fieldKey == key)
            // if (filter.length == 0) return ""
            let filter = arr.find((v) => v.fieldKey == key);
            return filter?.value ?? "";
        }

        async function getRoute(routeId, token) {
            try {
                let res = await rp({
                    url: `${FRT_PUB_BASE_URL}/routes/v1/routes`,
                    method: "GET",
                    json: true,
                    headers: {
                        authorization: token,
                    },
                });
                if (res.status == 200) {
                    const result = res.data.filter(({ uuid }) => uuid === routeId);
                    return result;
                } else {
                    return null;
                }
            } catch (E) {
                console.log(`error getting route ${E.message}`);
            }
        }

        async function distanceGET(lat1, long1, lat2, long2) {
            let res = await rp({
                url:
                    `${FRT_PUB_BASE_URL}/itinerary/admin/calculateDistance?originLat=` +
                    lat1 +
                    `&originLng=` +
                    long1 +
                    `&destinationLat=` +
                    lat2 +
                    `&destinationLng=` +
                    long2,
                json: true,
            });

            return res.status == 200 ? res.data / 1000 : res.error;
        }

        async function calculateTotalDistance(
            originCenterCoordinates,
            destinationCenterCoordinates
        ) {
            let totalDistance = 0;

            if (originCenterCoordinates && destinationCenterCoordinates) {
                const lat1 = originCenterCoordinates.latitude;
                const long1 = originCenterCoordinates.longitude;
                const lat2 = destinationCenterCoordinates.latitude;
                const long2 = destinationCenterCoordinates.longitude;

                if (lat1 && long1 && lat2 && long2) {
                    var calculateDistance = await distanceGET(lat1, long1, lat2, long2);

                    if (typeof calculateDistance === "string") {
                        console.log(`Error calculating distance: ${calculateDistance}`);
                        return;
                    }

                    if (!Number(calculateDistance)) {
                        console.log("Distance calculated is 0!");
                        return;
                    }

                    totalDistance = calculateDistance;
                }
            }
            return totalDistance.toFixed(2);
        }
    } catch (err) {
        console.log("Error executing script- " + err.message);
        return {
            data: null,
            error: "Error executing script- " + err.message,
            status: 400,
        };
    }
}

test()