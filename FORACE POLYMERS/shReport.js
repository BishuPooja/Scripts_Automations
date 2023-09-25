const rp = require("request-promise");
const token =
  "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODg0NDc5ODUsInVzZXJJZCI6ImViZTU3NTFhLWEwNWItNDZiNi05MWI0LTFjMTEyYTkwZjYzOCIsImVtYWlsIjoic3V5YXNoLmt1bWFyQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTU1NTEwNzcwMCIsIm9yZ0lkIjoiMTFhMzlkMmYtMTQ4NS00MDEwLWJmOTYtNjllOWZkY2RlMjAzIiwibmFtZSI6IlN1eWFzaCAiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.0Xg7xX_WkOK9LJ_W2u6WFr8b0BgLO6ktWnvQa76TaB4";
const moment = require("moment");
const _ = require("lodash");
const fs = require("fs");
const XLSX = require("xlsx");

const headers = [
  "Document No.",
  "POINTS OUTWARD",
  "POINTS INWARD",
  "CONCETNATE",
  "MONTH",
  "TRUCK NO",
  "CAPACITY OF VEHICLE",
  "TOUR NO.",
  "DATE",
  "DRIVER",
  "REGION",
  "STATION",
  "KM START",
  "KM END",
  "TOTAL RUNNING",
  "DIESAL QTY",
  "AVG",
  "WEIGHT OUTWARD",
  "WEIGHT INWARD",
  "INWARD INCOME RECD",
  "TRANSPORTER NAME",
  "Diesal price",
  "Diesal amount",
  "OUTRATE PER KG",
  "INRATE PER KG",
  "OUTWARD FREIGHT AMT",
  "INWARD FREIGHT AMT",
  "TOTAL INCOME OF OWN FLEET IN TRIP",
  "DA",
  "TOLL",
  "REPAIR",
  "DIESEL",
  "CHALLAN",
  "LOADING/UNLOADING",
  "FASTAG TOLL",
  "TOTAL TOUR EXP",
  "ROAD TAX PER TRIP",
  "FITNESS PERTRIP",
  "PERMIT PER TRIP",
  "SALARY PER TRIP",
  "INTT PER TRIP",
  "DEP PER TRIP",
  "REP OTHER THAN TOUR",
  "UREA IN TRUCK",
  "INSURANCE",
  "TOTAL OF FIXED EXP + OTHER THAN TOUR EXP",
  "NET FINAL EXP",
  "NET PROFIT LOSS PER TRIP",
];
const FRT_PUB_BASE_URL = "http://apis.fretron.com";

async function main() {
  try {
    const fromDate = new Date(2023, 6, 3);
    const tillDate = new Date(2023, 6, 31);

    const from = fromDate.valueOf();
    const till = tillDate.valueOf();

    const shipments = await getShipments(from, till, token);

    console.log(`--------Segreggating on the basis of shipment date--------`);

    let groupedData = groupVehicles(shipments);

    const json = await generateJSON(groupedData);

    if (!json || !json?.length) {
      return null;
    }

    console.log(`Total json made- ${json.length}`);

    const worksheet = XLSX.utils.json_to_sheet(json);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

    const outputPath = "output.xlsx";
    XLSX.writeFile(workbook, outputPath);

    console.log(`XLSX file generated: ${outputPath}`);
  } catch (error) {
    console.log(`Some Server error - ${error.message}`);
  }
}

async function getShipments(from, till, token) {
  try {
    let filters = {
      shipmentDate: {
        isFromExpression: null,
        isTillExpression: null,
        from: from,
        till: till,
      },
      __version: 2,
    };
    let url = `${FRT_PUB_BASE_URL}/shipment-view/shipments/v1?filters=${JSON.stringify(
      filters
    )}`;

    let options = {
      uri: url,
      method: "GET",
      json: true,
      headers: {
        Authorization: token,
      },
    };

    let res = await rp(options);

    console.log(`Total Shipments - ${res?.length ?? 0}`);

    return res;
  } catch (error) {
    console.log(`Catched error in getting shipments - ${error.message}`);
  }

  return [];
}

async function generateJSON(shipments) {
  try {
    const sample_Data = {
      DL8CU4678: [
        { vehicleNumber: "DL8CU4678", shipmentDate: "4-July-2023" },
        { vehicleNumber: "DL8CU4678", shipmentDate: "1-July-2023" },
      ],

      DL8CU4679: [{ vehicleNumber: "DL8CU4679", shipmentDate: "1-July-2023" }],
    };

    let jsonArr = [];

    let vehicleNumbers = Object.keys(shipments);

    for (let vehicleNo of vehicleNumbers) {
      console.log(`Executing for vehicle- ${vehicleNo}`);

      var multipleShs = shipments[vehicleNo];

      multipleShs.sort((a, b) => a.shipmentDate - b.shipmentDate);

      for (let shs of multipleShs) {
        let resObj = {
          "Document No.": "",
          "POINTS OUTWARD": "",
          "POINTS INWARD": "",
          MONTH: "",
          "TRUCK NO": "",
          "CAPACITY OF VEHICLE": "",
          "TOUR NO.": "",
          DATE: "",
          DRIVER: "",
          REGION: "",
          STATION: "",
          "KM START": "",
          "KM END": "",
          "TOTAL RUNNING": "",
          "DIESEL QTY": "",
          AVG: "",
          "WEIGHT OUTWARD": "",
          "WEIGHT INWARD": "",
          "INWARD INCOME RECD": "",
          "TRANSPORTER NAME": "",
          "Diesel price": "",
          "Diesel amount": "",
          "OUTRATE PER KG": "",
          "INRATE PER KG": "",
          "OUTWARD FREIGHT AMT": "",
          "INWARD FREIGHT AMT": "",
          "TOTAL INCOME OF OWN FLEET IN TRIP": "",
          DA: "",
          TOLL: "",
          REPAIR: "",
          DIESEL: "",
          CHALLAN: "",
          "LOADING/UNLOADING": "",
          "FASTAG TOLL": "",
          "TOTAL TOUR EXP": "",
          "ROAD TAX PER TRIP": "",
          "FITNESS PERTRIP": "",
          "PERMIT PER TRIP": "",
          "SALARY PER TRIP": "",
          "INTT PER TRIP": "",
          "DEP PER TRIP": "",
          "REP OTHER THAN TOUR": "",
          "UREA IN TRUCK": "",
          INSURANCE: "",
          "TOTAL OF FIXED EXP + OTHER THAN TOUR EXP": "",
          "NET FINAL EXP": "",
          "NET PROFIT LOSS PER TRIP": "",
        };

        const origin = shs.shipmentStages[0];
        const shipmentDate = shs?.shipmentDate ?? null;
        const cfs = shs?.customFields;
        const vehicle = shs?.fleetInfo?.vehicle;
        const monthlyValuesOfVehicle = getMonthlyValues(vehicle?.customFields);
        console.log(`Monthly Values ${JSON.stringify(monthlyValuesOfVehicle)}`);

        // break;

        let shipmentNumber = shs?.shipmentNumber ?? "";
        let vehicleNumber =
          shs?.fleetInfo?.vehicle?.vehicleRegistrationNumber ?? "";
        let vehicleCapacity = vehicle?.vehicleLoadType?.name ?? "";
        let tourNo = "";
        let driver = shs?.driver?.name ?? "";
        let region = origin.place?.state ?? origin.hub?.state ?? "";
        let station = _.uniq(
          shs.shipmentStages
            ?.slice(1)
            ?.map((e) => e.place?.state ?? e.hub?.state ?? "") ?? []
        ).join();
        let kmStart = 0;
        let kmEnd = 0;

        let totalRunning = Math.abs(kmEnd - kmStart);
        let dieselQty = isNaN(Number(extractValFromCF(cfs, "DIESEL QTY")))
          ? 0
          : Number(extractValFromCF(cfs, "DIESEL QTY"));
        let avg =
          dieselQty && totalRunning
            ? Number((totalRunning / dieselQty).toFixed(2))
            : "";
        let weightOutward = 0;
        let weightInward = 0;
        let inwardIncomeRec = isNaN(
          Number(extractValFromCF(cfs, "INWARD INCOME RECD"))
        )
          ? 0
          : Number(extractValFromCF(cfs, "INWARD INCOME RECD"));
        let transporterName = isNaN(
          Number(extractValFromCF(cfs, "TRANSPORTER NAME"))
        )
          ? 0
          : Number(extractValFromCF(cfs, "TRANSPORTER NAME"));

        let dieselPrice = isNaN(Number(extractValFromCF(cfs, "Diesel price")))
          ? 0
          : Number(extractValFromCF(cfs, "Diesel price"));
        let dieselAmount =
          dieselQty && dieselPrice
            ? Number((dieselPrice * dieselQty).toFixed(2))
            : 0;
        let outratePerKg = isNaN(
          Number(extractValFromCF(cfs, "OUTRATE PER KG"))
        )
          ? 0
          : Number(extractValFromCF(cfs, "OUTRATE PER KG"));
        let inratePerKg = isNaN(Number(extractValFromCF(cfs, "INRATE PER KG")))
          ? 0
          : Number(extractValFromCF(cfs, "INRATE PER KG"));

        let outwardFrtAmt =
          weightOutward && outratePerKg
            ? Number((outratePerKg * weightOutward).toFixed(2))
            : 0;
        let inwardFrtAmt =
          weightInward && inratePerKg
            ? Number((inratePerKg * weightInward).toFixed(2))
            : 0;
        let totalIncome = outwardFrtAmt + inwardFrtAmt;
        let da = isNaN(Number(extractValFromCF(cfs, "DA")))
          ? 0
          : Number(extractValFromCF(cfs, "DA"));
        let toll = isNaN(Number(extractValFromCF(cfs, "TOLL")))
          ? 0
          : Number(extractValFromCF(cfs, "TOLL"));
        let repair = isNaN(Number(extractValFromCF(cfs, "REPAIR")))
          ? 0
          : Number(extractValFromCF(cfs, "REPAIR"));
        let diesel = isNaN(Number(extractValFromCF(cfs, "DIESEL")))
          ? 0
          : Number(extractValFromCF(cfs, "DIESEL"));
        let challan = isNaN(Number(extractValFromCF(cfs, "CHALLAN")))
          ? 0
          : Number(extractValFromCF(cfs, "CHALLAN"));
        let loadingUnloading = 0;
        let fastagToll = 0;
        let totalTourExp =
          da + toll + repair + diesel + challan + loadingUnloading + fastagToll;
        let roadTaxPerTrip = monthlyValuesOfVehicle["Road Tax"] * totalRunning;
        let fitnessPerTrip = monthlyValuesOfVehicle["Fitness"] * totalRunning;
        let permitPerTrip = monthlyValuesOfVehicle["N.Permit"] * totalRunning;

        let salaryPerTrip = monthlyValuesOfVehicle["Salary"] * totalRunning;
        let inttPerTrip =
          monthlyValuesOfVehicle["INTT PER TRIP"] * totalRunning;
        let depPerTrip = monthlyValuesOfVehicle["DEP PER TRIP"] * totalRunning;
        let repOtherThanTour =
          monthlyValuesOfVehicle["REP OTHER THAN TOUR"] * totalRunning;
        let ureaInTruck =
          monthlyValuesOfVehicle["UREA IN TRUCK"] * totalRunning;
        let insurance = monthlyValuesOfVehicle["Insurance"] * totalRunning;
        let totalPlusOtherThanTrip = 0;
        let netFinalExp = totalPlusOtherThanTrip + totalTourExp + dieselAmount;
        let netProfitLossPerTrip = totalIncome - netFinalExp;

        resObj["Document No."] = shipmentNumber;
        resObj["MONTH"] = shipmentDate
          ? moment(shipmentDate).format("MMM-D")
          : "";
        resObj["TRUCK NO"] = vehicleNumber;
        resObj["CAPACITY OF VEHICLE"] = vehicleCapacity;
        resObj["TOUR NO."] = tourNo;
        resObj["DATE"] = shipmentDate
          ? moment(shipmentDate).format("DD-MMM-YY")
          : "";
        resObj["DRIVER"] = driver;
        resObj["REGION"] = region;
        resObj["STATION"] = station;
        resObj["KM START"] = kmStart;
        resObj["KM END"] = kmEnd;
        resObj["TOTAL RUNNING"] = totalRunning;
        resObj["DIESEL QTY"] = dieselQty;
        resObj["AVG"] = avg;
        resObj["WEIGHT OUTWARD"] = weightOutward;
        resObj["WEIGHT INWARD"] = weightInward;
        resObj["INWARD INCOME RECD"] = inwardIncomeRec;
        resObj["TRANSPORTER NAME"] = transporterName;
        resObj["Diesel price"] = dieselPrice;
        resObj["Diesel amount"] = dieselAmount;
        resObj["OUTRATE PER KG"] = outratePerKg;
        resObj["INRATE PER KG"] = inratePerKg;
        resObj["OUTWARD FREIGHT AMT"] = outwardFrtAmt;
        resObj["INWARD FREIGHT AMT"] = inwardFrtAmt;
        resObj["TOTAL INCOME OF OWN FLEET IN TRIP"] = totalIncome;
        resObj["DA"] = da;
        resObj["TOLL"] = toll;
        resObj["REPAIR"] = repair;
        resObj["DIESEL"] = diesel;
        resObj["CHALLAN"] = challan;
        resObj["LOADING/UNLOADING"] = loadingUnloading;
        resObj["FASTAG TOLL"] = fastagToll;
        resObj["TOTAL TOUR EXP"] = totalTourExp;
        resObj["ROAD TAX PER TRIP"] = roadTaxPerTrip;
        resObj["FITNESS PERTRIP"] = fitnessPerTrip;
        resObj["PERMIT PER TRIP"] = permitPerTrip;
        resObj["SALARY PER TRIP"] = salaryPerTrip;
        resObj["INTT PER TRIP"] = inttPerTrip;
        resObj["DEP PER TRIP"] = depPerTrip;
        resObj["REP OTHER THAN TOUR"] = repOtherThanTour;
        resObj["UREA IN TRUCK"] = ureaInTruck;
        resObj["INSURANCE"] = insurance;
        resObj["TOTAL OF FIXED EXP + OTHER THAN TOUR EXP"] =
          totalPlusOtherThanTrip;
        resObj["NET FINAL EXP"] = netFinalExp;
        resObj["NET PROFIT LOSS PER TRIP"] = netProfitLossPerTrip;

        jsonArr.push(resObj);
      }
    }

    return jsonArr;
  } catch (error) {
    console.log(`Some error in generating json - ${error.message}`);
  }

  return null;
}

async function getShCostFromType(type, shId, token) {
  try {
    let url = `${FRT_PUB_BASE_URL}/shipment-cost/v1/${
      type === "revenue" ? "revenue/costs" : "costs"
    }?shipmentId=${shId}`;

    let options = {
      uri: url,
      method: "GET",
      json: true,
      headers: {
        Authorization: token,
      },
    };

    let res = await rp(options);

    console.log(
      `Incoming response of cost for type - ${type} - for sh - ${shId} - status - ${res.status}`
    );

    if (res.status === 200) {
      return res.data;
    } else {
      console.log(`Error in incoming response of Shipment cost - ${res.error}`);
    }
  } catch (error) {
    console.log(`Some error in getting cost from shipment - ${error.message}`);
  }

  return [];
}

async function getVehicles(token) {
  try {
  } catch (error) {
    console.log(`Catched error in getting vehicles - ${error.message}`);
  }

  return [];
}

function extractValFromCF(cfs, key) {
  return cfs?.find(({ fieldKey }) => fieldKey === key)?.value ?? "";
}

function getMonthlyValues(cfs) {
  var resObj = {
    "Road Tax": 0,
    Fitness: 0,
    "N.Permit": 0,
    Salary: 0,
    "INTT PER TRIP": 0,
    "DEP PER TRIP": 0,
    "REP OTHER THAN TOUR": 0,
    "UREA IN TRUCK": 0,
    Insurance: 0,
  };
  if (cfs?.length) {
    for (let { fieldKey, value } of cfs) {
      if (fieldKey === "Road Tax") {
        resObj["Road Tax"] = !isNaN(Number(value)) ? Number(value) / 12 : 0;
      } else if (fieldKey === "Fitness") {
        resObj["Fitness"] = !isNaN(Number(value)) ? Number(value) / 12 : 0;
      } else if (fieldKey === "N.Permit") {
        resObj["N.Permit"] = !isNaN(Number(value)) ? Number(value) / 12 : 0;
      } else if (fieldKey === "Salary") {
        resObj["Salary"] = !isNaN(Number(value)) ? Number(value) / 12 : 0;
      } else if (fieldKey === "INTT PER TRIP") {
        resObj["INTT PER TRIP"] = !isNaN(Number(value))
          ? Number(value) / 12
          : 0;
      } else if (fieldKey === "DEP PER TRIP") {
        resObj["DEP PER TRIP"] = !isNaN(Number(value)) ? Number(value) / 12 : 0;
      } else if (fieldKey === "REP OTHER THAN TOUR") {
        resObj["REP OTHER THAN TOUR"] = !isNaN(Number(value))
          ? Number(value) / 12
          : 0;
      }else if (fieldKey === "UREA IN TRUCK") {
        resObj["UREA IN TRUCK"] = !isNaN(Number(value))
          ? Number(value) / 12
          : 0; 
       } else if (fieldKey === "Insurance") {
        resObj["Insurance"] = !isNaN(Number(value)) ? Number(value) / 12 : 0;
      }
    }
  }
  return resObj;
}

function groupVehicles(shipments) {
  return _.reduce(
    shipments,
    (result, item) => {
      let vehicleNumber = item.fleetInfo.vehicle.vehicleRegistrationNumber;

      if (!result[vehicleNumber]) {
        result[vehicleNumber] = [];
      }

      result[vehicleNumber].push(item);
      return result;
    },
    {}
  );
}
main();
