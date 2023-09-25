const rp = require("request-promise");
const _ = require("lodash");
const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODA2MDkzMTQsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiI1YzYwY2I4OS1kYzZhLTQzZDMtYTFmZi1iMDY5YTNlMmQxZDgiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.4AIpVMlPaZ-8YknBnGZ5HjcNx9cG28aW2XYjbQS1DnU"
/**
 * Adds CF Total Distance on shipment
 * -By Suyash
 */


async function getRoute(routeId) {
    try {
        console.log(routeId);
        let res = await rp({
            url: "https://apis.fretron.com/routes/v1/routes",
            method: "GET",
            json: true,
            headers: {
                authorization: token
            }
        })
        // console.log(res.data);
        if (res.status == 200) {
            const result = res.data.filter(({ uuid }) => uuid === routeId)
            return result
        } else {
            return null
        }
    }
    catch (E) {
        console.log(`error getting route ${E.message}`);
    }

}
async function main($event) {
    try {
        console.log("Shipment Number- " + $event.shipmentNumber);
        let sh = $event;
        if (sh.shipmentTrackingStatus == "Enroute For Delivery") {
            /**
             * Find routeId key on shipment $event.routeId
             * From routeId find route -- > API call
             * Total Distance --> payload.push
             */
            let routeId = sh.routeId
            let resRoute = await getRoute(routeId)
            let totalDistance = (resRoute?.[0]?.distance ?? 0 / 1000).toFixed(2)

            let payload = [];
            if (totalDistance) {
                payload.push({
                    indexedValue: [],
                    fieldKey: "Total Distance (KM)",
                    multiple: false,
                    description: "",
                    remark: "",
                    required: false,
                    accessType: null,
                    input: "string",
                    unit: "",
                    valueType: "string",
                    options: [],
                    fieldType: "text",
                    value: totalDistance + "",
                    isRemark: false,
                });
            } else {
                let origin = sh.shipmentStages[0].place
                    ? sh.shipmentStages[0].place
                    : sh.shipmentStages[0].hub
                        ? sh.shipmentStages[0].hub
                        : "";
                let destination = _.last(sh.shipmentStages).place
                    ? _.last(sh.shipmentStages).place
                    : _.last(sh.shipmentStages).hub
                        ? _.last(sh.shipmentStages).hub
                        : "";

                if (!origin || !destination) {
                    console.log("Origin/Destination Not found! Cannot add Custom Field");
                    return;
                }

                let lat1 = origin.center.latitude;
                let long1 = origin.center.longitude;
                let lat2 = destination.center.latitude;
                let long2 = destination.center.longitude;

                let calculateDistance = await distanceGET(lat1, long1, lat2, long2);
                console.log(calculateDistance);
                if (typeof calculateDistance == "string") {
                    console.log("Error calculating Distance- " + calculateDistance);
                    return;
                }

                if (!Number(calculateDistance)) {
                    console.log("Distance Calculated is 0!");
                    return;
                }

                payload.push({
                    indexedValue: [],
                    fieldKey: "Total Distance (KM)",
                    multiple: false,
                    description: "",
                    remark: "",
                    required: false,
                    accessType: null,
                    input: "string",
                    unit: "",
                    valueType: "string",
                    options: [],
                    fieldType: "text",
                    value: calculateDistance + "",
                    isRemark: false,
                });
            }

            let cfUpdateResponse = await cfAdd(sh.uuid, payload);

            console.log("CF Update Response- ");
            console.log(cfUpdateResponse);
        } else {
            console.log("Shipment not enroute for delivery");
        }

        async function cfAdd(uuid, payload) {
            let res = await rp({
                url:
                    `${FRT_PUB_BASE_URL}/shipment/v1/admin/shipment/` +
                    uuid +
                    "/add/customFields",
                json: true,
                method: "POST",
                body: payload,
            });

            return res.status == 200 ? "Custom Field Added Successfully!" : res.error;
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
    } catch (err) {
        console.log("Error executing automation- " + err.message);
    }
}
main($event)
