async function getshipments(token) {
    const url = "https://apis.fretron.com/shipment-view/shipments/v1?filters=%7B%22shipmentDate%22%3A%7B%22isTillExpression%22%3Afalse%2C%22isFromExpression%22%3Afalse%2C%22from%22%3A1664609700000%2C%22till%22%3A1668018657000%7D%2C%22_shipmentStatus_%22%3A%7B%22shipmentStatus%22%3A%5B%22Completed%22%5D%7D%2C%22_shcf_Transportation%20Type%22%3A%5B%22CT%22%5D%2C%22__version%22%3A2%7D&size=500" + `&allFields=["shipmentDate","customFields","uuid","shipmentNumber"]`
    const options = {
        uri: url,
        method: "GET",
        headers: {
            "Authorization": token,
        },
        json: true
    }
    let response = await rp(options);
    let shipments = response
    while (response.length) {
        let uri = "https://apis.fretron.com/shipment-view/shipments/v1?filters=%7B%22shipmentDate%22%3A%7B%22isTillExpression%22%3Afalse%2C%22isFromExpression%22%3Afalse%2C%22from%22%3A1664609700000%2C%22till%22%3A1668018657000%7D%2C%22_shipmentStatus_%22%3A%7B%22shipmentStatus%22%3A%5B%22Completed%22%5D%7D%2C%22_shcf_Transportation%20Type%22%3A%5B%22CT%22%5D%2C%22__version%22%3A2%7D&from=" + encodeURIComponent(JSON.stringify([
            response[response.length - 1].shipmentDate,
            response[response.length - 1].uuid,
        ])) + "&sortBy=earliestDate&size=500&allFields=" + `["shipmentDate","customFields","uuid","shipmentNumber"]`
        options.uri = uri;
        response = await rp(options);
        shipments = [...shipments, ...response];
        console.log("shipment length " + shipments.length);
    }
    return shipments;


}
async function dateInDdMmYyyy(timeEpoch) {
    const today = new Date(timeEpoch);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    let todayInddmmyyyy = dd + "/" + mm + "/" + yyyy;
    console.log(todayInddmmyyyy)
}
dateInDdMmYyyy(1808550369000)

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const deg2rad = (deg) => deg * (Math.PI / 180);
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d.toFixed(2);
}
function getFromCf(cfs, key) {
    if (cfs == null) {
        return null
    } else {
        let found = cfs.find(_ => _.fieldKey == key)
        return found ? found.value : null
    }
}