const rp = require("request-promise")
const token = ""

var perDayRun = [
    {
        VehicleTypeCode: "VT002",
        VehicleTypeDescription: "BODY TRUCK 6 WHEELER (MAX CAPACITY: 10 MT)",
        perDayKM: 350,
    },
    {
        VehicleTypeCode: "VT003",
        VehicleTypeDescription: "BODY TRUCK 10 WHEELER (MAX CAPACITY: 18 MT)",
        perDayKM: 350,
    },
    {
        VehicleTypeCode: "VT004",
        VehicleTypeDescription: "BODY TRUCK 12 WHEELER (MAX CAPACITY: 24 MT)",
        perDayKM: 350,
    },
    {
        VehicleTypeCode: "VT005",
        VehicleTypeDescription: "BODY TRUCK 14 WHEELER (MAX CAPACITY: 28 MT)",
        perDayKM: 350,
    },
    {
        VehicleTypeCode: "VT006",
        VehicleTypeDescription: "BODY TRAILER 18 WHEELER (MAX CAPACITY: 34 MT)",
        perDayKM: 250,
    },
    {
        VehicleTypeCode: "VT007",
        VehicleTypeDescription: "BODY TRAILER 22 WHEELER (MAX CAPACITY: 42 MT)",
        perDayKM: 250,
    },
    {
        VehicleTypeCode: "VT008",
        VehicleTypeDescription: "OPEN TRAILER 14 WHEELER (MAX CAPACITY: 27 MT)",
        perDayKM: 250,
    },
    {
        VehicleTypeCode: "VT009",
        VehicleTypeDescription: "OPEN TRAILER 18 WHEELER (MAX CAPACITY: 33 MT)",
        perDayKM: 250,
    },
    {
        VehicleTypeCode: "VT010",
        VehicleTypeDescription: "OPEN TRAILER 22 WHEELER (MAX CAPACITY: 43 MT)",
        perDayKM: 250,
    },
];

var vehTypePerDayKM = _.filter(perDayRun, [
    "VehicleTypeDescription",
    shipment.fleetInfo.vehicle.vehicleLoadType != null
        ? shipment.fleetInfo.vehicle.vehicleLoadType.name
        : shipment.fleetInfo.vehicle.vehicleType,
])[0];

if (vehTypePerDayKM == null) {
    console.log("ERROR! Vehicle Type not found with vehicle Type Description");
    return;
}

var remainingDistance = upcomingStage.tripPoint.remainingDistance;
if (remainingDistance == null) {
    console.log(
        "ERROR! remaining distance is 0 or null on the upcoming stage, uuid: " +
        upcomingStage.uuid
    );
    return;
}
console.log(`Remaining Distance- ${remainingDistance}`);
console.log(`Vehicle Per Day run- ${vehTypePerDayKM.perDayKM}`);
