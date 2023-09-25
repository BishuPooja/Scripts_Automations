

try {
    console.log("Shipment- " + $event.shipmentNumber)
    const sh = $event
    const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODM2MDkwMjEsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNDcyYjNjNTEtZDhlOS00Mjk0LThhN2YtYTY5MDkzYjUwNWI3IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.3GzbqFIDaOaP69gP9HfRGKqOF7a5DXFxINBBa3nShjE"
    const RED_ZONE_POLY_ONE = [26.47312754856727, 83.71768791241793] //Deoria-Rudrapur Road
    const RED_ZONE_POLY_TWO = [25.5551616, 83.3990266] //Lords Distillery Limited-Ghazipur
    const RED_ZONE_POLY_THREE = [27.511050801530793, 81.68579790587738] //Simbhaoli sugars chilwaria bahraich
    const RED_ZONE_POLY_FOUR = [27.7865888, 80.1978926]//DCM Shriram Ltd.,Khiri
    const RED_ZONE_POLY_FIVE = [28.394194268031764, 79.37617776125727]//Superior Industries ltd Bareilly
    const RED_ZONE_POLY_SIX = [26.4586831, 80.3499083]//KM Sugar Mills Ltd.,Mirpur

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

        function deg2rad(deg) {
            return deg * (Math.PI / 180)
        }
    }

    async function generateAlert(body, shId) {
        try {
            let res = await rp({
                'uri': `${FRT_PUB_BASE_URL}/shipment/v1/shipment/${shId}/alert`,
                'method': 'POST',
                'headers': {
                    'Authorization': TOKEN
                },
                'json': true,
                'body': body
            })
            console.log('res status on add alert ' + res.status)
        } catch (e) {
            console.log('error in add alert ' + e.message)
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
            console.log('error in add activity log ' + e.message)
        }
    }

    function getCurrentIndex(sh) {
        let filter = sh.shipmentStages.filter(stage => {
            return stage.status == "UPCOMING" || stage.status == "AT"
        })
        return sh.shipmentStages.indexOf(filter?.[0] ?? sh.shipmentStages.slice(-1)[0])
    }

    async function task() {
        let currentIdx = getCurrentIndex(sh)
        console.log('current idx ' + currentIdx)
        if (currentIdx <= sh.shipmentStages.length - 1) {
            let currentGpsState = sh.shipmentStages[currentIdx].tripPoint ? (sh.shipmentStages[currentIdx].tripPoint.currentGpsState ? sh.shipmentStages[currentIdx].tripPoint.currentGpsState : null) : null
            let gpsState = currentGpsState.state
            console.log(' GPS state ' + gpsState)
            if (gpsState == "Stopped") {
                let foundALert = sh.alerts.find(_ => (_.type == "probable.red.zone.One.notification" || _.type == "probable.red.zone.Two.notification" || _.type == "probable.red.zone.Three.notification" || _.type == "probable.red.zone.Four.notification" || _.type == "probable.red.zone.Five.notification" || _.type == "probable.red.zone.Six.notification") && _.status == "OPEN")
                if (foundALert != null) {
                    console.log('aleady and OPEN redZoneAlert')
                } else {
                    let lat = currentGpsState.mean.latitude
                    let lng = currentGpsState.mean.longitude

                    let redOneDis = getDistanceFromLatLonInKm(lat, lng, RED_ZONE_POLY_ONE[0], RED_ZONE_POLY_ONE[1]) * (1000.0)
                    let redTwoDis = getDistanceFromLatLonInKm(lat, lng, RED_ZONE_POLY_TWO[0], RED_ZONE_POLY_TWO[1]) * (1000.0)
                    let redThreeDis = getDistanceFromLatLonInKm(lat, lng, RED_ZONE_POLY_THREE[0], RED_ZONE_POLY_THREE[1]) * (1000.0)
                    let redFourDis = getDistanceFromLatLonInKm(lat, lng, RED_ZONE_POLY_FOUR[0], RED_ZONE_POLY_FOUR[1]) * (1000.0)
                    let redFiveDis = getDistanceFromLatLonInKm(lat, lng, RED_ZONE_POLY_FIVE[0], RED_ZONE_POLY_FIVE[1]) * (1000.0)
                    let redSixDis = getDistanceFromLatLonInKm(lat, lng, RED_ZONE_POLY_SIX[0], RED_ZONE_POLY_SIX[1]) * (1000.0)

                    console.log(`Distance from redZone one ${redOneDis} : from redZonetwo ${redTwoDis} : from redZoneThree ${redThreeDis} : from redZoneFour ${redFourDis} : from redZoneFive ${redFiveDis} : from redZoneSix ${redSixDis}`)
                    if (redOneDis < 1000 || redTwoDis < 1000 || redThreeDis < 1000 || redFourDis < 1000 || redFiveDis < 1000 || redSixDis < 1000) {
                        let leastDist = Math.min(redOneDis, redTwoDis, redThreeDis, redFourDis, redFiveDis, redSixDis)
                        let redZoneVal = ""
                        if (leastDist == redOneDis) {
                            redZoneVal = "One"
                        } else if (leastDist == redTwoDis) {
                            redZoneVal = "Two"
                        } else if (leastDist == redThreeDis) {
                            redZoneVal = "Three"
                        }
                        else if (leastDist == redFourDis) {
                            redZoneVal = "Four"
                        }
                        else if (leastDist == redFiveDis) {
                            redZoneVal = "Five"
                        }
                        else {
                            redZoneVal = "Six"
                        }

                        let alert = {
                            "closedBy": null,
                            "createdAt": Date.now(),
                            "issueId": null,
                            "createdBy": null,
                            "snoozTime": null,
                            "description": "Vehicle May Be Stopped In RedZone",
                            "type": `probable.red.zone.${redZoneVal}.notification`,
                            "status": "OPEN",
                            "updatedAt": null
                        }
                        await generateAlert(alert, sh.uuid)

                        await addActivityLog(sh.uuid, 'Detected Vehicle Stop Near Red Zone, It will be a continuous watch on this event')
                    }
                }
            }
        }
    }

    await task()
} catch (err) {
    console.log("Error executing automation- " + err.message)
}

