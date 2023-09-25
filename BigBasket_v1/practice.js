// const rp = require("request-promise")
// const FRT_PUB_BASE_URL = "https://apis.fretron.com"
// const $event = {
//     "body": [{ "shipment": "0000514877", "tripid": "d975874b-8536-48dc-be78-7be14702f1a0", "transcode": "0004003269", "transpname": "VISION FINSEC CONSULTANTS PVT LTD", "custcode": "0000215156", "custname": "ARCHANA", "destination": "BASTI", "invoiceno": "0811245186", "lineitem": 10, "material": "BUNTY BABLI200ML - PET BOTTLE", "invqty": "1200.000", "uom": "CS", "batch": "582", "obd": "0051072145", "lrnumber": "0000001544", "nrgpdat": "2023-05-26", "ndgptime": "00:00:00", "materialcode": "FGCLBBPET25", "mattype": "FERT", "matgroup": "FG0000009", "division": "15" }]
// }


// console.log("Hit!")
// console.log($event.body)
// console.log(JSON.stringify($event.body))

// const TOKEN = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjA5MDI1OTIsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNDcyYjNjNTEtZDhlOS00Mjk0LThhN2YtYTY5MDkzYjUwNWI3IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.GnkPKO8URn1c70Us-p8-2LOuPTWKgN-SOMaaSm1jiAs"
// async function main() {
//     let response = await rp({
//         url: `http://35.192.123.13:8081/igl/integration/outbound-integration`,
//         method: "POST",
//         json: true,
//         body: $event.body,
//     });
//     if (response.status == 200) {
//         let res = response.data
//         console.log("response " + res)
//         return res;
//     } else {
//         console.log("Error :" + response.error)
//         return null
//     }
// }


// async function saveData(payload) {
//     try {
//         let res = await rp({
//             url: `${FRT_PUB_BASE_URL}/integration-exide/v1/integration-data`,
//             method: "POST",
//             json: true,
//             body: payload,
//             headers: {
//                 Authorization: TOKEN
//             }
//         })
//         console.log(`save data status ${res.status}`)
//         return res
//     }
//     catch (e) {
//         console.log(`Error saving intergration data ${e.message}`)
//     }

// }




// async function saveIntegrationData() {
//     try {
//         let invoiceNo = $event.body.length ? $event.body[0].invoiceno : null
//         if (invoiceNo) {
//             try {
//                 let payloadSaveInput = {
//                     "eventType": "Outbound",
//                     "orgId": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
//                     "primaryKey": invoiceNo,
//                     "inputData": $event.body,
//                 }
//                 await saveData(payloadSaveInput)
//             }
//             catch (e) {
//                 console.log(`error in save data ${e.message}`)
//             }

//             let outPutData = await main()

//             try {
//                 let payloadSaveOutput = {
//                     "eventType": "Outbound",
//                     "orgId": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
//                     "primaryKey": invoiceNo,
//                     "outputData": outPutData
//                 }
//                 await saveData(payloadSaveOutput)

//             }
//             catch (e) {
//                 console.log(`error in saving output data ${e.message}`)
//             }
//         }
//         else {
//             console.log(`invoiceNo not found`)
//         }

//     }
//     catch (e) {
//         console.log(`error in saveIntegrationData ${e.message} `)
//     }
// }

// try {
//     saveIntegrationData()
// }
// catch (e) {
//     console.log(`error in save data ${e.message}`)
// }



// console.log("Hit!")
// console.log($event.body)
// console.log(JSON.stringify($event.body))


// let response = await rp({
//     uri: `http://35.192.123.13:8081/igl/integration/outbound-integration`,
//     method: "POST",
//     json: true,
//     body: $event.body
// });
// if (response.status == 200) {
//     let res = response.data
//     console.log("response " + res)
//     return res;
// } else {
//     console.log("Error :" + response.error)
//     return null
// }

const _ = require('lodash');
var finalRoutes2 = []

function calculateDistance(city1, city2) {
    const earthRadius = 6371; // Earth's radius in kilometers

    const lat1 = city1.latitude;
    const lon1 = city1.longitude;
    const lat2 = city2.latitude;
    const lon2 = city2.longitude;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;
    return distance;
}

// Helper function to convert degrees to radians
function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function optimizeRoutes(origin, destinations, maxDestinations) {

    var routes = [];
    var finalRoutes2 = [];

    for (var i = 0; i < destinations.length; i++) {
        routes.push([origin, destinations[i]]);
    }

    for (var j = 0; j < routes.length; j++) {
        var finalRoutes = new Array()
        var o1 = routes[j][0];
        var d1 = routes[j][1];
        var o1Tod1 = calculateDistance(o1, d1);

        finalRoutes = [o1]

        for (var k = 0; k < destinations.length; k++) {
            if (k === j) continue;

            var dest = destinations[k];

            var distance1 = calculateDistance(dest, d1);
            var o1Tod2 = null;
            var o1Tod3 = null;
            var o1Tod4 = null;
            var d1Tod2 = null;
            var d1Tod3 = null;
            var d1Tod4 = null;
            var d2Tod3 = null;
            var d2Tod4 = null;
            var d3Tod4 = null;
            var d2 = null;
            var d3 = null;
            var d4 = dest;

            if (distance1 > 400 || distance1 === 0 || dest.name == d1.name) {
                continue;
            }

            if (finalRoutes.length === 1) {
                o1Tod2 = calculateDistance(o1, dest);
                d1Tod2 = distance1;
            } else if (finalRoutes.length === 2) {
                d2 = finalRoutes[1];
                d1Tod3 = distance1;
                o1Tod2 = calculateDistance(o1, d2);
                o1Tod3 = calculateDistance(o1, dest);
                d1Tod2 = calculateDistance(d1, d2);
                d2Tod3 = calculateDistance(d2, dest);
            } else {
                d2 = finalRoutes[1];
                d3 = finalRoutes[2];
                o1Tod2 = calculateDistance(o1, d2);
                o1Tod3 = calculateDistance(o1, d3);
                o1Tod4 = calculateDistance(o1, d4);
                d1Tod2 = calculateDistance(d1, d2);
                d1Tod3 = calculateDistance(d1, d3);
                d1Tod4 = calculateDistance(d1, d4);
                d2Tod3 = calculateDistance(d2, d3);
                d2Tod4 = calculateDistance(d2, d4);
                d3Tod4 = calculateDistance(d3, d4);
            }

            if (finalRoutes.length === 1) {
                if (o1Tod2 < o1Tod1) {
                    finalRoutes.push(dest);
                }
            } else if (finalRoutes.length == 2) {
                var dist1 = o1Tod3 + d2Tod3 + d1Tod2;
                var dist2 = o1Tod2 + d2Tod3 + d1Tod3;

                if (dist1 < dist2) {
                    finalRoutes = [o1, dest, d2];
                } else {
                    finalRoutes = [o1, d2, dest];
                }

            } else if (finalRoutes.length == 3) {

                var dist1 = o1Tod4 + d3Tod4 + d1Tod3;
                var dist2 = o1Tod4 + d2Tod4 + d1Tod2;
                var dist3 = o1Tod3 + d3Tod4 + d1Tod4;
                var dist4 = o1Tod2 + d2Tod4 + d1Tod4;
                var dist5 = o1Tod2 + d2Tod3 + d1Tod3;
                var dist6 = o1Tod3 + d2Tod3 + d1Tod2;
                var shortestDistance = Math.min(dist1, dist2, dist3, dist4, dist5, dist6);

                if (shortestDistance === dist1) {
                    if (d4.name != d3.name || d1.name != d3.name) {
                        finalRoutes = [o1, d4, d3];
                    }
                } else if (shortestDistance === dist2) {
                    if (d4.name != d2.name || d1.name != d2.name) {
                        finalRoutes = [o1, d4, d2];
                    }
                } else if (shortestDistance === dist3) {
                    if (d4.name != d3.name || d1.name != d4.name) {
                        finalRoutes = [o1, d3, d4];
                    }
                } else if (shortestDistance === dist4) {
                    if (d4.name != d2.name || d1.name != d4.name) {
                        finalRoutes = [o1, d2, d4];
                    }
                } else if (shortestDistance === dist5) {
                    if (d3.name != d2.name || d1.name != d3.name) {
                        finalRoutes = [o1, d2, d3];
                    }
                } else if (shortestDistance === dist6) {
                    if (d3.name != d2.name || d1.name != d2.name) {
                        finalRoutes = [o1, d3, d2];
                    }
                }

                // var o11 = finalRoutes[0];
                // var d11 = finalRoutes[1];
                // var d12 = finalRoutes[2];
                // let diff = calculateDistance(o11, d11) - calculateDistance(o11, d12)
                // if (diff > 25) {
                //     finalRoutes.splice(2, 1);
                // }

            } else if (finalRoutes.length > 3) {
                continuefinalRoutes
            } else {
                console.log('Some exception occurred');
                break;
            }
        }
        finalRoutes = [...finalRoutes, ...[d1]]
        finalRoutes2.push(finalRoutes);
    }

    return finalRoutes2;
}



// Example usage
const origin = {
    "name": "KOLKATA",
    "latitude": 22.5726,
    "longitude": 88.3639
}

const destinations = [
    {
        "name": "CUTTACK",
        "latitude": 20.4625,
        "longitude": 85.882
    },
    {
        "name": "BEGUSARAI",
        "latitude": 25.4167,
        "longitude": 86.1294
    },
    {
        "name": "PATNA",
        "latitude": 25.5941,
        "longitude": 85.1376
    },
    {
        "name": "BARPETA",
        "latitude": 26.3222,
        "longitude": 91.0092
    },
    {
        "name": "GUWAHATI",
        "latitude": 26.1445,
        "longitude": 91.7362
    },
    {
        "name": "RAIPUR",
        "latitude": 21.2514,
        "longitude": 81.6296
    },
    {
        "name": "BILASPUR",
        "latitude": 22.0807,
        "longitude": 82.1399
    },
    {
        "name": "SINGRAULI",
        "latitude": 24.1997,
        "longitude": 82.6753
    },
    {
        "name": "JAMSHEDPUR",
        "latitude": 22.8046,
        "longitude": 86.2029
    },
    {
        "name": "RANCHI",
        "latitude": 23.3441,
        "longitude": 85.3096
    },
    {
        "name": "DHANBAD",
        "latitude": 23.7957,
        "longitude": 86.4304
    },
    {
        "name": "DEOGHAR",
        "latitude": 24.4799,
        "longitude": 86.6933
    },
    {
        "name": "LUDHIANA",
        "latitude": 30.901,
        "longitude": 75.8573
    },
    {
        "name": "BARNALA",
        "latitude": 30.3888,
        "longitude": 75.5484
    },
    {
        "name": "MOHALI",
        "latitude": 30.7046,
        "longitude": 76.7179
    },
    {
        "name": "BATALA",
        "latitude": 31.8185,
        "longitude": 75.2026
    },
    {
        "name": "JALANDHAR",
        "latitude": 31.326,
        "longitude": 75.5762
    },
    {
        "name": "CHANDIGARH",
        "latitude": 30.7333,
        "longitude": 76.7794
    },
    {
        "name": "BATHINDA",
        "latitude": 30.21,
        "longitude": 74.9455
    },
    {
        "name": "JAIPUR",
        "latitude": 26.9124,
        "longitude": 75.7873
    },
    {
        "name": "JODHPUR",
        "latitude": 26.2389,
        "longitude": 73.0243
    },
    {
        "name": "BHARATPUR",
        "latitude": 27.215,
        "longitude": 77.492
    },
    {
        "name": "BHILWARA",
        "latitude": 25.3463,
        "longitude": 74.6352
    },
    {
        "name": "BUNDI",
        "latitude": 25.441,
        "longitude": 75.6347
    },
    {
        "name": "KOTA",
        "latitude": 25.1609,
        "longitude": 75.8522
    },
    {
        "name": "NEW DELHI",
        "latitude": 28.6139,
        "longitude": 77.209
    },
    {
        "name": "HANUMANGARH",
        "latitude": 29.5814,
        "longitude": 74.3294
    },
    {
        "name": "FARIDABAD",
        "latitude": 28.4089,
        "longitude": 77.3178
    },
    {
        "name": "PALWAL/BALBGARH",
        "latitude": 28.15,
        "longitude": 77.3333
    },
    {
        "name": "GURGAON",
        "latitude": 28.4595,
        "longitude": 77.0266
    },
    {
        "name": "KARNAL",
        "latitude": 29.6857,
        "longitude": 76.9905
    },
    {
        "name": "PANCHKULA",
        "latitude": 30.6942,
        "longitude": 76.8606
    },
    {
        "name": "ROHTAK",
        "latitude": 28.8955,
        "longitude": 76.6066
    },
    {
        "name": "HISAR",
        "latitude": 29.1492,
        "longitude": 75.7217
    },
    {
        "name": "SONIPAT/PANIPAT",
        "latitude": 28.9288,
        "longitude": 76.6131
    },
    {
        "name": "PANTNAGAR",
        "latitude": 29.0403,
        "longitude": 79.5262
    },
    {
        "name": "LUCKNOW",
        "latitude": 26.8467,
        "longitude": 80.9462
    },
    {
        "name": "AGRA",
        "latitude": 27.1767,
        "longitude": 78.0081
    },
    {
        "name": "GHAZIABAD",
        "latitude": 28.6692,
        "longitude": 77.4538
    },
    {
        "name": "MEERUT",
        "latitude": 28.9845,
        "longitude": 77.7064
    },
    {
        "name": "VARANASI",
        "latitude": 25.3176,
        "longitude": 82.9739
    },
    {
        "name": "HAPUR",
        "latitude": 28.7304,
        "longitude": 77.7812
    },
    {
        "name": "RUDRAPUR",
        "latitude": 28.9869,
        "longitude": 79.407
    },
    {
        "name": "SRINAGAR",
        "latitude": 34.0837,
        "longitude": 74.7973
    },
    {
        "name": "JAMMU",
        "latitude": 32.7266,
        "longitude": 74.857
    },
    {
        "name": "NEPAL (AMRITSAR)",
        "latitude": 31.633,
        "longitude": 74.8723
    },
    {
        "name": "SAIBABA",
        "latitude": 19.9975,
        "longitude": 73.7903
    },
    {
        "name": "CHENNAI - AMBUR",
        "latitude": 12.7967,
        "longitude": 78.7167
    },
    {
        "name": "COIMBATORE",
        "latitude": 11.0168,
        "longitude": 76.9558
    },
    {
        "name": "TIRUCHIRAPPALLI",
        "latitude": 10.7905,
        "longitude": 78.7047
    },
    {
        "name": "TUTICORIN",
        "latitude": 8.7642,
        "longitude": 78.1348
    },
    {
        "name": "MADURAI",
        "latitude": 9.9252,
        "longitude": 78.1198
    },
    {
        "name": "SALEM",
        "latitude": 11.6643,
        "longitude": 78.146
    },
    {
        "name": "ERNAKULAM",
        "latitude": 9.9816,
        "longitude": 76.2996
    },
    {
        "name": "COCHIN",
        "latitude": 9.9312,
        "longitude": 76.2673
    },
    {
        "name": "CALICUT",
        "latitude": 11.2588,
        "longitude": 75.7804
    },
    {
        "name": "PALAKKAD",
        "latitude": 10.7867,
        "longitude": 76.6548
    },
    {
        "name": "BANGALORE",
        "latitude": 12.9716,
        "longitude": 77.5946
    },
    {
        "name": "BELGAUM",
        "latitude": 15.8497,
        "longitude": 74.4977
    },
    {
        "name": "DAVANGERE",
        "latitude": 14.4662,
        "longitude": 75.926
    },
    {
        "name": "MANGALORE",
        "latitude": 12.9141,
        "longitude": 74.8559
    },
    {
        "name": "HAVERI",
        "latitude": 14.7937,
        "longitude": 75.404
    },
    {
        "name": "PEENYA",
        "latitude": 13.0329,
        "longitude": 77.5252
    },
    {
        "name": "HUBLI",
        "latitude": 15.3647,
        "longitude": 75.124
    },
    {
        "name": "HYDERABAD",
        "latitude": 17.385,
        "longitude": 78.4867
    },
    {
        "name": "SECUNDERABAD",
        "latitude": 17.4423,
        "longitude": 78.4981
    },
    {
        "name": "KURNOOL",
        "latitude": 15.8281,
        "longitude": 78.0373
    },
    {
        "name": "VIJAYAWADA",
        "latitude": 16.5062,
        "longitude": 80.648
    },
    {
        "name": "KARIMNAGAR",
        "latitude": 18.4392,
        "longitude": 79.1288
    },
    {
        "name": "GUNTUR",
        "latitude": 16.3067,
        "longitude": 80.4365
    },
    {
        "name": "VIZAG",
        "latitude": 17.6868,
        "longitude": 83.2185
    },
    {
        "name": "BHIWANDI",
        "latitude": 19.3002,
        "longitude": 73.0588
    },
    {
        "name": "PUNE (CHAKAN)",
        "latitude": 18.751,
        "longitude": 73.4062
    },
    {
        "name": "TALOJA/PANVEL/TURBHE",
        "latitude": 19.075,
        "longitude": 73.0193
    },
    {
        "name": "NAGPUR",
        "latitude": 21.1458,
        "longitude": 79.0882
    },
    {
        "name": "MUMBAI",
        "latitude": 19.076,
        "longitude": 72.8777
    },
    {
        "name": "KASURDI",
        "latitude": 18.717,
        "longitude": 73.7397
    },
    {
        "name": "KOLHAPUR",
        "latitude": 16.705,
        "longitude": 74.2433
    },
    {
        "name": "WAGHOLI (PUNE)",
        "latitude": 18.569,
        "longitude": 73.982
    },
    {
        "name": "LASALGAON",
        "latitude": 20.1667,
        "longitude": 74.2333
    },
    {
        "name": "MALKAPUR",
        "latitude": 20.8862,
        "longitude": 76.1969
    },
    {
        "name": "THANE",
        "latitude": 19.2183,
        "longitude": 72.9781
    },
    {
        "name": "AHMEDNAGAR",
        "latitude": 19.094,
        "longitude": 74.748
    },
    {
        "name": "RAJKOT",
        "latitude": 22.3039,
        "longitude": 70.8022
    },
    {
        "name": "KODINAR",
        "latitude": 20.7932,
        "longitude": 70.7048
    },
    {
        "name": "SURAT",
        "latitude": 21.1702,
        "longitude": 72.8311
    },
    {
        "name": "AHMEDABAD",
        "latitude": 23.0225,
        "longitude": 72.5714
    },
    {
        "name": "INDORE",
        "latitude": 22.7196,
        "longitude": 75.8577
    },
    {
        "name": "JABALPUR",
        "latitude": 23.1815,
        "longitude": 79.9864
    },
    {
        "name": "BHOPAL",
        "latitude": 23.2599,
        "longitude": 77.4126
    },
    {
        "name": "PITHAMPUR",
        "latitude": 22.605,
        "longitude": 75.6656
    },
    {
        "name": "MORENA",
        "latitude": 26.4997,
        "longitude": 77.994
    },
    {
        "name": "GWALIOR",
        "latitude": 26.2183,
        "longitude": 78.1828
    },
    {
        "name": "BHUBANESHWAR",
        "latitude": 20.2961,
        "longitude": 85.8245
    },
    {
        "name": "TALOJA",
        "latitude": 19.0927,
        "longitude": 73.1355
    },
    {
        "name": "ALWAR",
        "latitude": 27.567,
        "longitude": 76.6094
    },
    {
        "name": "AURANGABAD",
        "latitude": 19.8762,
        "longitude": 75.3433
    },
    {
        "name": "BASTI",
        "latitude": 26.8026,
        "longitude": 82.761
    },
    {
        "name": "BELLARY",
        "latitude": 15.1394,
        "longitude": 76.9214
    },
    {
        "name": "CHHINDWARA",
        "latitude": 22.0567,
        "longitude": 78.9394
    },
    {
        "name": "DHULE",
        "latitude": 20.9042,
        "longitude": 74.774
    },
    {
        "name": "DURGAPUR",
        "latitude": 23.5204,
        "longitude": 87.3119
    },
    {
        "name": "FORBESGANJ",
        "latitude": 26.3072,
        "longitude": 87.2628
    },
    {
        "name": "GORAKHPUR",
        "latitude": 26.7606,
        "longitude": 83.3732
    },
    {
        "name": "KAPURTHALA",
        "latitude": 31.3801,
        "longitude": 75.3928
    },
    {
        "name": "KASHIPUR",
        "latitude": 29.2115,
        "longitude": 78.9566
    },
    {
        "name": "KORBA",
        "latitude": 22.3597,
        "longitude": 82.7567
    },
    {
        "name": "KUSHI NAGAR",
        "latitude": 26.75,
        "longitude": 83
    },
    {
        "name": "NASHIK",
        "latitude": 20.011,
        "longitude": 73.7903
    },
    {
        "name": "NEPAL",
        "latitude": 26.5791,
        "longitude": 88.1616
    },
    {
        "name": "SANGLI (MH)",
        "latitude": 16.8524,
        "longitude": 74.5815
    },
    {
        "name": "SILIGURI",
        "latitude": 26.7271,
        "longitude": 88.3953
    },
    {
        "name": "SOLAPUR",
        "latitude": 17.6599,
        "longitude": 75.9064
    },
    {
        "name": "UDAIPUR",
        "latitude": 24.5854,
        "longitude": 73.7125
    },
    {
        "name": "PATIALA",
        "latitude": 30.3398,
        "longitude": 76.3869
    }
]
const maxDestinationsOnRoute = 3;

const optimizedRoutes = optimizeRoutes(origin, destinations, maxDestinationsOnRoute);
console.log(JSON.stringify(optimizedRoutes));


