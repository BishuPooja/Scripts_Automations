/**
 * Send Mail if shipment in redzone
 * Run every 15 minutes
 * 1. Filter Potential Red zone Shipments alert.keyword from UI
 * 2. Calculate if sh still in redzone
 * 3. If sh in Redzone, check if mail sent or not --> if not sent, send mail and update CF
 * 4. If notification is closed, update Cf of sh to No
 * 
 * -By Suyash
 * Task No- 22000
 * Sprint- 69
 */
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzY0NTA4MzgsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiOTM4MjQ4ODYtM2M0Ny00YjIxLWExN2EtMDk3YmU3MzM4MDZkIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.SUu1761cjbh9VQsDCGWtof6OAp5qvjGBisy-m5EQRNo"

const RED_ZONE_POLY_ONE = [21.436916, 85.189869]
const RED_ZONE_POLY_TWO = [21.26396, 85.196767]
const RED_ZONE_POLY_THREE = [21.434682, 85.314641]

const Red_Zone_Map = {
    "One": "RedZone_Pallahara_Mail",
    "Two": "RedZone_Khamar_Mail",
    "Three": "RedZone_Jagmohanpur_Mail"
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}
function convertMsToHM(milliseconds) {
    return Math.floor(milliseconds / 60000).toString()
}

function getDecodedDimensionFromPolyline(t, e) {
    for (var n = 1, r = 0; ;) {
        var o = t[e].charCodeAt(0) - 63 - 1;
        if ((e++, (n += lshiftOperator(o, r)), (r += 5), o < 31)) break;
    }
    return n % 2 != 0
        ? [e, rshiftOperator(notOperator(n), 1)]
        : [e, rshiftOperator(n, 1)];
}
function decodePoly(t) {
    for (var e = [], n = 0, r = 0, o = 0, a = 0, i = t.length; n < i;) {
        var l = getDecodedDimensionFromPolyline(t, n),
            s = getDecodedDimensionFromPolyline(t, (n = l[0])),
            g = getDecodedDimensionFromPolyline(t, (n = s[0]));
        (n = g[0]),
            (r += l[1]),
            (o += s[1]),
            (a += g[1]),
            e.push(getGpxLog(r, o, a));
    }
    return e;
}
function lshiftOperator(t, e) {
    return t * Math.pow(2, e);
}
function rshiftOperator(t, e) {
    return Math.floor(t / Math.pow(2, e));
}
function notOperator(t) {
    return ~t;
}
function getGpxLog(t, e, n) {
    return [getCoordinate(t), getCoordinate(e), n];
}
function getCoordinate(t) {
    return +(1e-5 * t).toFixed(5);
}
function getIsoTime(t) {
    // return new Date(1e3 * t).toISOString();
    return new Date(t).toISOString();
}

async function getTimeLine(from, till, imei) {
    console.log(`Get timeline for imei ${imei} from ${from} till ${till}`)
    try {
        let res = await rp({
            'uri': `${FRT_PUB_BASE_URL}/reports/timeline/byrange/v2?startTime=${from}&endTime=${till}&imei=${imei}`,
            'method': 'GET',
            'json': true,
            'headers': {
                'Authorization': TOKEN
            }
        })
        console.log(`Found total element in timeline ${res.length}`)
        return res
    }
    catch (e) {
        return []
    }
}

async function getProbleInRedZoneShipments() {
    let filters = {
        "__version": 2,
        "_and": { "alerts.type.keyword": ["probable.red.zone.One.notification", "probable.red.zone.Two.notification", "probable.red.zone.Three.notification"], "alerts.status.keyword": ["SNOOZED", "OPEN"] },
        "trackingMode": ["VTS"]
    }
    let url = `${FRT_PUB_BASE_URL}/shipment-view/shipments/v1?filters=${encodeURIComponent(JSON.stringify(filters))}&allFields=true`
    // console.log(url)
    try {
        let res = await rp({
            'uri': url,
            'method': 'GET',
            'json': true,
            'headers': {
                'Authorization': TOKEN
            }
        })
        return res
    }
    catch (e) {
        return []
    }
}

async function shipmentUpdate(shUUID, payload) {
    try {
        let res = await rp({
            uri: `${FRT_PUB_BASE_URL}/shipment/v1/shipment/bulk/sync`,
            json: true,
            headers: {
                Authorization: TOKEN
            },
            body: {
                shipmentId: shUUID,
                updates: [
                    {
                        keyToUpdate: "customfields",
                        updatedValue: payload
                    },
                ],
            }
        })

        console.log("Bulk Sync API Res- " + res.status)
    } catch (err) {
        console.log("Some error updating shipment- " + err.message)
    }
}

async function addActivityLog(shId, desc) {
    console.log(`adding activity log: ` + desc)
    let payload = {
        'updatedValue': {
            'updatedBy': 'USER',
            'time': Date.now(),
            'description': desc
        },
        "shipmentId": shId
    }
    try {
        let res = await rp({
            'uri': `${FRT_PUB_BASE_URL}/shipment/v1/action/activitylog`,
            'method': 'POST',
            'headers': {
                'Authorization': TOKEN
            },
            'json': true,
            'body': payload
        })

        console.log('res status on add activity log ' + res.status)
    }
    catch (e) {
        console.log('error in add activity log ' + e)
    }
}

async function markAlertClose(body, shId) {
    try {
        let res = await rp({
            'uri': `${FRT_PUB_BASE_URL}/shipment/v1/shipment/${shId}/alert/${body.uuid}`,
            'method': 'PUT',
            'headers': {
                'Authorization': TOKEN
            },
            'json': true,
            'body': body
        })
        console.log('res status on add alert ' + res.status)
    }
    catch (e) {
        console.log('error in add alert ' + e)
    }
}

async function tryToCheckRedZoneAlert(sh, alert, startTime) {
    let imei = sh.fleetInfo.device.imei
    if (imei) {
        let timeLineData = await getTimeLine(startTime - 5 * 60 * 1000, Date.now(), imei)
        console.log('total stopped timeline found ' + timeLineData.length)

        let incidentFound = ""
        let zoneName = "One"
        for (let tData of timeLineData) {
            console.log(`timeline start ${moment(tData.startTime).format("DD-MM-YY hh:mm a")}  end: ${moment(tData.endTime).format("DD-MM-YY hh:mm a")} state ${tData.state}`)
            let redOneMinima = -1
            let redThreeMinima = -1
            let redTwoMinima = -1
            if (tData.state == "Stopped") {
                let poly = tData['timeAwarePolyline']['polyline']
                let decodedPoly = decodePoly(poly)
                for (let coord of decodedPoly) {
                    let redOneDis = -1
                    let redTwoDis = -1
                    let redThreeDis = -1
                    redTwoDis = getDistanceFromLatLonInKm(coord[0], coord[1], RED_ZONE_POLY_TWO[0], RED_ZONE_POLY_TWO[1]) * 1000
                    if (redTwoMinima == -1 || redTwoDis < redTwoMinima) {
                        redTwoMinima = redTwoDis
                    }
                    if (redTwoDis < 200 && !incidentFound) {
                        incidentFound = "Two"
                        zoneName = "Two"
                    }
                    if (!incidentFound) {
                        redOneDis = getDistanceFromLatLonInKm(coord[0], coord[1], RED_ZONE_POLY_ONE[0], RED_ZONE_POLY_ONE[1]) * 1000
                        if (redOneMinima == -1 || redOneDis < redOneMinima) {
                            redOneMinima = redOneDis
                        }
                        if (redOneDis < 200 && !incidentFound) {
                            incidentFound = "One"
                            zoneName = "One"
                        }
                    }
                    if (!incidentFound) {
                        redThreeDis = getDistanceFromLatLonInKm(coord[0], coord[1], RED_ZONE_POLY_THREE[0], RED_ZONE_POLY_THREE[1]) * 1000
                        if (redThreeMinima == -1 || redThreeDis < redThreeMinima) {
                            redThreeMinima = redThreeDis
                        }
                        if (redThreeDis < 200) {
                            incidentFound = "Three"
                            zoneName = "Three"
                        }
                    }
                    if (incidentFound) {
                        break;
                    }
                }
                console.log(`red one minima ${redOneMinima} : redTwoMinima ${redTwoMinima}`)
                if (incidentFound) {
                    let whichCf = Red_Zone_Map[incidentFound]
                    let shCustFieldFilter = sh.customFields?.find(({ fieldKey }) => fieldKey == whichCf) ?? null

                    if (!shCustFieldFilter || (shCustFieldFilter && shCustFieldFilter.value.toLowerCase() != "yes")) {
                        let payload = [{
                            "indexedValue": [],
                            "fieldKey": whichCf,
                            "multiple": false,
                            "description": "",
                            "remark": "",
                            "required": false,
                            "accessType": null,
                            "input": "",
                            "unit": "",
                            "valueType": "string",
                            "options": ["Yes", "No"],
                            "fieldType": "yes-no",
                            "value": "Yes",
                            "isRemark": false
                        }]
                        await shipmentUpdate(sh.uuid, payload)
                        try {
                            await getHtmlAndEmail(sh, "RED Zone - Stoppage")
                        } catch (e) {
                            console.log(e.message)
                        }
                    } else {
                        console.log("Mail already sent!")
                    }
                    break;
                }
            } else {
                let toUseZone = null
                if (alert.type.indexOf("One") != -1) {
                    toUseZone = RED_ZONE_POLY_ONE
                } else if (alert.type.indexOf("Two") != -1) {
                    toUseZone = RED_ZONE_POLY_TWO
                } else {
                    toUseZone = RED_ZONE_POLY_THREE
                }
                let distance = getDistanceFromLatLonInKm(tData.mean.latitude, tData.mean.longitude, toUseZone[0], toUseZone[1]) * 1000
                if (distance > 1500) {
                    alert.status = "CLOSED"
                    alert.updatedAt = Date.now()
                    await markAlertClose(alert, sh.uuid)
                    await addActivityLog(sh.uuid, ' Vehicle has passed the Red Zone Area')
                    break;
                }
            }
        }

    }
}

async function task() {
    let shList = await getProbleInRedZoneShipments()
    console.log('total found for probable red zone ' + shList.length)
    for (let i = 0; i < shList.length; i++) {
        let sh = shList[i]

        console.log(`---- Executing for sh ${sh.shipmentNumber} ------`)
        let foundAlert = sh.alerts.find(_ => (_.type == "probable.red.zone.One.notification" || _.type == "probable.red.zone.Two.notification" || _.type == "probable.red.zone.Three.notification") && (_.status == "SNOOZED" || _.status == "OPEN"))

        if (foundAlert) {
            try {
                console.log(`Found alert for sh ${sh.shipmentNumber} : ${JSON.stringify(foundAlert)}`)
                await tryToCheckRedZoneAlert(sh, foundAlert, foundAlert.createdAt)
            }
            catch (e) {
                console.log('error in checking red zone for sh ' + sh.shipmentNumber + " error " + e)
            }
        }
    }
}
async function getHtmlAndEmail(shData, issueType) {
    let toArr = ["suyash.kumar@fretron.com"];
    let ccArr = [""];
    let stage = shData.shipmentStages[0]
    let vehicleNo = shData.fleetInfo.vehicle.vehicleRegistrationNumber
    let shipmentNo = shData.shipmentNumber
    let subject = `${issueType} alert for vehicle number ${vehicleNo}. ${moment(Date.now()).format('DD-MM-YYYY')}`
    let htmlContent = `
                              <html>
                              <body>
                              <p>Dear Sir,</p>
                              <br>
                              <p>It is observed that vehicle number ${vehicleNo} starting journey from ${stage.hub && stage.hub.name ? stage.hub.name : (stage.place && stage.place.name ? stage.place.name : "N/A")}. has taken a ${issueType} 
                              </p>
                              <br>
                             <p>
                              Driver, supplier, and vehicle's current location details are as below
                              </p>  
                              <br>
                              <p>
                              Shipment Number - ${shipmentNo}
                              </p>
                              <p>
                              Driver name - ${shData.fleetInfo.driver?.name ?? "N/A"}
                              </p>
                              <p>
                              Driver contact number -  ${shData.fleetInfo.driver?.mobileNumber ?? "N/A"}
                              </p> 
                              <br>
                              <br>
                              Regards
                              </body>
                              </html>`;
    console.log(`to ${toArr} : cc ${ccArr}`)
    await forwardEmail(subject, toArr, ccArr, htmlContent)
    return "OK"
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
    console.log("Mail sent");
    return "Mail Sent";
}
try {
    await task()
    console.log("--- COMPLETE ---")
    // task().then(_=>{
    //     console.log("DONE")
    // })
    // .catch(e=>{
    //     console.log("Error "+e)
    // })

}
catch (e) {
    console.log("Error " + e)
}
