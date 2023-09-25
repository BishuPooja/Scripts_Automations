

const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODM2MDkwMjEsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNDcyYjNjNTEtZDhlOS00Mjk0LThhN2YtYTY5MDkzYjUwNWI3IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.3GzbqFIDaOaP69gP9HfRGKqOF7a5DXFxINBBa3nShjE"

const RED_ZONE_POLY_ONE = [26.47312754856727, 83.71768791241793] //Deoria-Rudrapur Road
const RED_ZONE_POLY_TWO = [25.5551616, 83.3990266] //Lords Distillery Limited-Ghazipur
const RED_ZONE_POLY_THREE = [27.511050801530793, 81.68579790587738] //Simbhaoli sugars chilwaria bahraich
const RED_ZONE_POLY_FOUR = [27.7865888, 80.1978926]//DCM Shriram Ltd.,Khiri
const RED_ZONE_POLY_FIVE = [28.394194268031764, 79.37617776125727]//Superior Industries ltd Bareilly
const RED_ZONE_POLY_SIX = [26.4586831, 80.3499083]//KM Sugar Mills Ltd.,Mirpur

const Red_Zone_Map = {
    "One": "RedZone_Deoria-Rudrapur Road",
    "Two": "RedZone_Lords Distillery Limited-Ghazipur",
    "Three": "RedZone_Simbhaoli sugars chilwaria bahraich",
    "Four": "RedZone_DCM Shriram Ltd.,Khiri",
    "Five": "RedZone_Superior Industries ltd Bareilly",
    "Six": "RedZone_KM Sugar Mills Ltd.,Mirpur"

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
        "_and": { "alerts.type.keyword": ["probable.red.zone.One.notification", "probable.red.zone.Two.notification", "probable.red.zone.Three.notification", "probable.red.zone.Four.notification", "probable.red.zone.Five.notification", "probable.red.zone.Six.notification"], "alerts.status.keyword": ["SNOOZED", "OPEN"] },
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
        let timeLineData = await getTimeLine(startTime - 30 * 60 * 1000, Date.now(), imei)
        console.log('total stopped timeline found ' + timeLineData.length)

        let incidentFound = ""
        let zoneName = "One"
        for (let tData of timeLineData) {
            console.log(`timeline start ${moment(tData.startTime).format("DD-MM-YY hh:mm a")}  end: ${moment(tData.endTime).format("DD-MM-YY hh:mm a")} state ${tData.state}`)
            let redOneMinima = -1
            let redThreeMinima = -1
            let redTwoMinima = -1
            let redFourMinima = -1
            let redFiveMinima = -1
            let redSixMinima = -1
            if (tData.state == "Stopped") {
                let poly = tData['timeAwarePolyline']['polyline']
                let decodedPoly = decodePoly(poly)
                for (let coord of decodedPoly) {
                    let redOneDis = -1
                    let redTwoDis = -1
                    let redThreeDis = -1
                    let redFourDis = -1
                    let redFiveDis = -1
                    let redSixDis = -1
                    redTwoDis = getDistanceFromLatLonInKm(coord[0], coord[1], RED_ZONE_POLY_TWO[0], RED_ZONE_POLY_TWO[1]) * 1000
                    if (redTwoMinima == -1 || redTwoDis < redTwoMinima) {
                        redTwoMinima = redTwoDis
                    }
                    if (redTwoDis < 500 && !incidentFound) {
                        incidentFound = "Two"
                        zoneName = "Two"
                    }
                    if (!incidentFound) {
                        redOneDis = getDistanceFromLatLonInKm(coord[0], coord[1], RED_ZONE_POLY_ONE[0], RED_ZONE_POLY_ONE[1]) * 1000
                        if (redOneMinima == -1 || redOneDis < redOneMinima) {
                            redOneMinima = redOneDis
                        }
                        if (redOneDis < 500 && !incidentFound) {
                            incidentFound = "One"
                            zoneName = "One"
                        }
                    }
                    if (!incidentFound) {
                        redThreeDis = getDistanceFromLatLonInKm(coord[0], coord[1], RED_ZONE_POLY_THREE[0], RED_ZONE_POLY_THREE[1]) * 1000
                        if (redThreeMinima == -1 || redThreeDis < redThreeMinima) {
                            redThreeMinima = redThreeDis
                        }
                        if (redThreeDis < 500) {
                            incidentFound = "Three"
                            zoneName = "Three"
                        }
                    }
                    if (!incidentFound) {
                        redFourDis = getDistanceFromLatLonInKm(coord[0], coord[1], RED_ZONE_POLY_FOUR[0], RED_ZONE_POLY_FOUR[1]) * 1000
                        if (redFourMinima == -1 || redFourDis < redFourMinima) {
                            redFourMinima = redFourDis
                        }
                        if (redFourDis < 500) {
                            incidentFound = "Four"
                            zoneName = "Four"
                        }
                    }
                    if (!incidentFound) {
                        redFiveMinima = getDistanceFromLatLonInKm(coord[0], coord[1], RED_ZONE_POLY_FIVE[0], RED_ZONE_POLY_FIVE[1]) * 1000
                        if (redFiveMinima == -1 || redFiveDis < redFiveMinima) {
                            redFiveMinima = redFiveDis
                        }
                        if (redFiveDis < 500) {
                            incidentFound = "Five"
                            zoneName = "Five"
                        }
                    }
                    if (!incidentFound) {
                        redSixMinima = getDistanceFromLatLonInKm(coord[0], coord[1], RED_ZONE_POLY_SIX[0], RED_ZONE_POLY_SIX[1]) * 1000
                        if (redSixMinima == -1 || redSixDis < redSixMinima) {
                            redSixMinima = redSixDis
                        }
                        if (redSixMinima < 500) {
                            incidentFound = "Six"
                            zoneName = "Six"
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
                            await getHtmlAndEmail(sh, "RED Zone - Stoppage", whichCf)
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
                }
                else if (alert.type.indexOf("Three") != -1) {
                    toUseZone = RED_ZONE_POLY_THREE
                }
                else if (alert.type.indexOf("Four") != -1) {
                    toUseZone = RED_ZONE_POLY_FOUR

                }
                else if (alert.type.indexOf("Five") != -1) {
                    toUseZone = RED_ZONE_POLY_FIVE
                }
                else {
                    toUseZone = RED_ZONE_POLY_SIX
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
        let foundAlert = sh.alerts.find(_ => (_.type == "probable.red.zone.One.notification" || _.type == "probable.red.zone.Two.notification" || _.type == "probable.red.zone.Three.notification" || _.type == "probable.red.zone.Four.notification" || _.type == "probable.red.zone.Five.notification" || _.type == "probable.red.zone.Six.notification") && (_.status == "SNOOZED" || _.status == "OPEN"))

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
async function getHtmlAndEmail(shData, issueType, whichCf) {
    let toArr = ["pooja.bishu@fretron.com", "harshit.gupta@fretron.com"];
    // let toArr = ["Anil.Srivastava@indiaglycols.com", "atul.k.pandey@indiaglycols.com", "Sanjay.K.Tripathi@indiaglycols.com", "IGLcontroltower@fretron.com", "monu.kan@fretron.com"
    // ]
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
                              <p>
                              This email is to inform you that the vehicle has been standing in the Red Zone Area (${whichCf}) for 30 min. Please check this vehicle.
                              <p>
                              Driver name - ${shData.fleetInfo.driver?.name ?? "N/A"}
                              </p>
                              <p>
                              Driver Number -  ${shData.fleetInfo.driver?.mobileNumber ?? "N/A"}
                              </p> 
                              <p>
                              Vehicle Number - ${vehicleNo ?? "N/A"}
                              </p>
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

async function main() {

    try {
        await task()
        console.log("--- COMPLETE ---")
    }
    catch (e) {
        console.log("Error " + e)
    }
}
main()
