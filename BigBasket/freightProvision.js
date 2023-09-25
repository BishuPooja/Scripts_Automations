const rp = require("request-promise")
const moment = require("moment-timezone")
const XLSX = require("xlsx-js-style")
const fs = require("fs")

const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzY0NDEwOTEsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiM2U0Y2RlZTktMGIzYi00NmRkLTliOTgtZGYwZTM4YTAyNzFjIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.QhhipbIJe0x9xhsuZeGmcwq2A3ThrMQmwUQebvrRVSk"

async function getFreightPricing(originHub, destinationHub) {
  let filters = [
    { key: "originHub", values: [originHub] },
    { key: "destinationHub", values: [destinationHub] },
  ]
  filters = JSON.stringify(filters)

  let offset = 0
  const limit = 500
  try {

    let freightPrices = []

    const options = {
      uri: "",
      headers: {
        Authorization: token,
      },
      json: true,
    }
    let res;

    do {
      options.uri = `https://apis.fretron.com/freight-pricing/v1/price/conditions?limit=${limit}&offset=${offset}&freightId=d4dcbe17-01b3-4e06-a5b8-925b1a5693d3&filters=${filters}`
      res = await rp(options)
      if (res.error) throw new Error(res.error)
      freightPrices = [...freightPrices, ...res.data]
      offset++;
    } while (res.data.length == limit)

    return freightPrices

  } catch (error) {
    console.log(`Get freright pricing catched Error : ${error.message}`)
    return null
  }
}

let bucketTypeMaterialCodes = [
  "405773",
  "405795",
  "406535",
  "405796",
  "406434",
  "405774",
  "405775",
  "406225",
  "405797",
  "405255",
  "406582",
  "406137",
  "406371",
  "405711",
  "406554",
  "406604",
  "405826",
  "406585",
  "406417",
  "406581",
  "406553",
  "406224",
  "406131",
  "406580",
  "405798",
  "406181",
  "405799",
  "406227",
  "406160",
  "405261",
  "406552"
]

async function getCnsMastersFromUUIDs(cnIdsWithShs) {
  let uuids = cnIdsWithShs.map(it => it.cnId)
  const batchSize = 30
  const numBatches = Math.ceil(uuids.length / batchSize)
  const result = []
  for (let i = 0; i < numBatches; i++) {
    const start = i * batchSize
    const end = Math.min((i + 1) * batchSize, uuids.length)
    const batchUuids = uuids.slice(start, end)
    console.log(batchUuids)
    let res = await rp({
      uri: "https://apis.fretron.com/consignment/v1/admin/consignments",
      method: 'POST',
      body: batchUuids,
      json: true
    })
    res = res.data.map((cn) => {
      let associatedShipments = cnIdsWithShs.find(({ cnId }) => cnId == cn.uuid)?.associatedShipments ?? []
      return {
        uuid: cn.uuid,
        consignmentNo: cn.consignmentNo,
        associatedShipments: associatedShipments,
        consignmentDate: cn.consignmentDate,
        customFields: cn.customFields,
        consignee: {
          name: cn.consignee?.name ?? null,
          places: cn.consignee?.places.map((p) => {
            return {
              name: p.name,
              state: p.state,
              address: p.address,
              center: p.center
            }
          }),
          address: cn.consignee?.address,
          externalId: cn.consignee?.externalId
        },
        consigner: {
          name: cn?.consigner?.name ?? null,
          places: cn?.consigner?.places.map((p) => {
            return {
              name: p.name,
              state: p.state,
              address: p.address,
              center: p.center
            }
          }),
          address: cn.consigner?.address,
          externalId: cn.consigner?.externalId
        },
        lineItems: cn.lineItems,
        orderMappings: cn.orderMappings,
        loadInfo: cn.loadInfo,
        eWayBillNumber: cn.eWayBillNumber,
        eWayBillExpiryDate: cn.eWayBillExpiryDate
      }
    })
    result.push(...res)
  }
  return result
}

async function main(From, Till, to, cc, plantNames = []) {
  console.log(Date.now())
  function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  try {
    if (monthDiff(new Date(From), new Date(Till)) > 3) {
      throw new Error(`Maximum allowed months difference is 3 found more than 3`)
    }
    const cnIdsWithSh = await getAllConsignments(From, Till, token, plantNames)

    const consignments = await getCnsMastersFromUUIDs(cnIdsWithSh.map((cnIdWithSh) => {
      return {
        cnId: cnIdWithSh.consignment.uuid,
        associatedShipments: cnIdWithSh.associatedShipments,
        shCost: cnIdWithSh.shCosts
      }
    }))

    const jsonAoaArr = await _getJsonAoaArrayFromData(consignments)

    const aoa = _jsonArr2Aoa(jsonAoaArr)

    const fileName = "/home/fretron/Desktop/basic/xls.xlsx"
    aoa2XlsxFile(aoa, new Date(From), new Date(Till), fileName)

    const subject = "Fretron | Freight Provision Report"
    const content = `Dear all, \n\nPlease find attached freight provision report from ${moment(new Date(From)).format("DD-MM-YYYY")} till ${moment(new Date(Till)).format("DD-MM-YYYY")}.\n\nNote: This is a system generated report.\n\nRegards\nTeam Fretron`
    const mailRes = await sendEmailWithAttachment(to, cc, subject, content, fileName)
    console.log(Date.now())
    return mailRes;

  } catch (e) {
    console.log(e.message)
    throw e
  }
}

async function getAllConsignments(fromTime, tillTime, token, plantNames = []) {
  console.log({ fromTime, tillTime })
  const filters = {
    "_consignment_": {
      "consignmentDate": { from: fromTime, till: tillTime }
    }
  };
  if (plantNames.length) {
    filters["_consignment_"]["consignerPlace"] = plantNames
  }
  const allFields = [
    "consignment.uuid",
    "shCosts",
    "associatedShipments"
  ];
  try {
    let url = `https://apis.fretron.com/shipment-view/consignments/enriched?filters=${encodeURIComponent(
      JSON.stringify(filters),
    )}&sortBy=%5B%22consignmentDate%22%5D&size=5000&allFields=${encodeURIComponent(
      JSON.stringify(allFields),
    )}`;
    let consignments = [];
    let options = {
      uri: url,
      method: "GET",
      headers: {
        Authorization: token,
      },
      json: true,
    };
    let res = await rp(options);
    // console.log(res.length);
    consignments = res;
    while (res.length == 5000) {
      let lastCn = res[res.length - 1];
      let { uuid, consignmentDate } = lastCn.consignment;
      let from = [consignmentDate, uuid];

      let url =
        `https://apis.fretron.com/shipment-view/consignments/enriched?filters=${encodeURIComponent(
          JSON.stringify(filters),
        )}&sortBy=%5B%22consignmentDate%22%5D&size=500&allFields=${encodeURIComponent(
          JSON.stringify(allFields),
        )}&from=` + encodeURIComponent(JSON.stringify(from));

      options.uri = url;

      res = await rp(options);
      // console.log(res.length);
      consignments = [...consignments, ...res];
    }
    console.log("Total Consignments : " + consignments.length);
    return consignments;
  } catch (e) {
    // console.error(e);
    console.log(e.toString());
    throw new Error("From getAllConsignments : " + e.message);
  }
}


async function getShipmentCostByShId(shipmentId) {
  try {
    const url = `https://apis.fretron.com/shipment-cost/v1/costs?shipmentId=${shipmentId}`;
    const res = await rp({
      uri: url,
      headers: {
        Authorization: token,
      },
      json: true,
    });
    if (res.status == 200) {
      return res.data;
    } else {
      console.log(
        `Get shipment by shId Error : ${res.error} for shipmentId : ${shipmentId}`,
      );
      return null;
    }
  } catch (error) {
    console.log(
      `Get shipment by shId Error : ${e.message} for shipmentId : ${shipmentId}`,
    );
    return null;
  }
}

function calculateDistance(center1, center2) {
  function distance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // distance in km
    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  if (!center1 || !center2) return 0;

  const { latitude: lat1, longitude: lon1 } = center1;
  const { latitude: lat2, longitude: lon2 } = center2;

  let totalKm = Number(1.2 * distance(lat1, lon1, lat2, lon2));

  return Number(totalKm.toFixed(2));
}

async function _getJsonAoaArrayFromData(cns) {
  let jsonArr = [];
  var freightPriceMap = []
  for (let cn of cns) {
    let cnQtyAndItemIdMap = {}
    cn?.orderMappings.forEach(it => {
      cnQtyAndItemIdMap[`${it.consignmentLineItemId}`] = it.quantity
    })
    let sh = cn.associatedShipments.length ? cn.associatedShipments[0] : null
    let dispatch = cn.consigner?.places?.[0].name
    let town = cn.consignee?.address ? JSON.parse(cn.consignee.address)?.city : null
    let origin = cn.consigner?.places?.[0]
    let destination = cn.consignee?.places?.[0]
    let cnInfoObj = {
      dispatch: dispatch ?? "-",
      customerCode: cn.consignee?.externalId ?? "-",
      customerName: cn.consignee?.name ?? "-",
      town: town ?? "",
      state: cn.consignee?.places?.[0]?.state ?? "-",
      invoiceNo: cn?.consignmentNo ?? "-",
      invoiceDate: cn?.consignmentDate ? moment(cn.consignmentDate).format("DD-MM-YYYY") : "-",
      eWayNo: cn?.eWayBillNumber ?? "",
      eWayDate: cn?.eWayBillExpiryDate ? moment(cn.eWayBillExpiryDate).format("DD-MM-YYYY") : "-",
      eWayTime: cn?.eWayBillExpiryDate ? moment(cn.eWayBillExpiryDate).format("hh:mm -A") : "-",
      distance: null,
      transporterName: sh?.fleetInfo?.fleetOwner?.name ?? sh?.fleetInfo?.fleetOwner?.name ?? "-",
      transporterGrnNo: cn?.customFields.find(({ fieldKey }) => fieldKey == "LR Number")?.value ?? "-",
      transporterGrnDate: cn?.customFields.find(({ fieldKey }) => fieldKey == "LR Date")?.value ?? "-",
      vehicleNo: sh?.fleetInfo?.vehicle?.vehicleRegistrationNumber ?? "",
      invoiceAmount: cn?.loadInfo.valueOfGoods ?? 0.0,
      netWeight: parseFloat(((cn?.loadInfo?.standardMeasurement?.weight?.netQuantity ?? 0.0) * 1000).toFixed(2)) ?? "-",
      bucketQty: cn.lineItems.reduce((pv, cv) => {
        if (bucketTypeMaterialCodes.includes(cv?.material?.externalId)) {
          pv += cnQtyAndItemIdMap[cv.uuid]?.packageMeasurement?.netQuantity ?? 0.0
        }
        return pv
      }, 0.0),
      "Bucket/Tub Weight Calculated as per Policy (In KG)": cn.lineItems.reduce((pv, cv) => {
        if (bucketTypeMaterialCodes.includes(cv?.material?.externalId)) {
          pv += (cnQtyAndItemIdMap[cv.uuid]?.weight?.netQuantity ?? 0.0) * 1000
        }
        return pv
      }, 0.0),
      totalWeight: parseFloat(((cn?.loadInfo?.standardMeasurement?.weight?.netQuantity ?? 0.0) * 1000).toFixed(2)) ?? "-",
      freightPaymentStatus: (cn?.customFields ?? []).find(({ fieldKey }) => fieldKey == "Invoice Status")?.value ?? "UNPAID",
      clubbingStatus: "-",
      toPayFreigt: "-",
      freightAmount: "-"
    }
    let distance = 0
    if (dispatch && town) {
      const DISTANCE_UUID = "6dff38dc-cc01-412f-b8ac-010068d208e2"
      var freightPrices = []
      const freightPriceFromMap = freightPriceMap.filter(_ => _.origin === dispatch && _.destination === town);
      if (freightPriceFromMap.length) {
        freightPrices = freightPriceFromMap[0]?.price;
      }
      else {
        freightPrices = await getFreightPricing(dispatch, town)
        freightPriceMap.push({
          origin: dispatch,
          destination: town,
          price: freightPrices
        })
      }
      distance = freightPrices?.[0]?.chargeTypes.find((e) => e.uuid == DISTANCE_UUID)?.amount ?? 0
    } else {
      console.log("As dispatch and town not found skiping freight pricing")
    }
    if (distance == 0) {
      console.log(`Distance not found from freight pricing [${cnInfoObj.dispatch} to ${cnInfoObj.town}] calculting by lat-lng`)
    }
    cnInfoObj.distance = distance === 0 ? calculateDistance(origin.center, destination.center) : distance;
    if (sh) {
      let freightCosts = cn?.shCost
      let freightAmount = (freightCosts ?? []).reduce((pv, cv) => {
        let item = (cv?.lineItems ?? []).find(it => it.consignmentId == cn.uuid)
        return pv + (item?.amount ?? 0.0)
      }, 0)
      cnInfoObj.toPayFreigt = (cnInfoObj.freightPaymentStatus == "PAID") ? parseFloat(freightAmount.toFixed(2)) : "-"
      cnInfoObj.freightAmount = (cnInfoObj.freightPaymentStatus == "PAID") ? "-" : parseFloat(freightAmount.toFixed(2))
      cnInfoObj.clubbingStatus = (sh.shipmentStages ?? []).filter(({ consignmentPickUps, consignmentDelivered }) => !((consignmentPickUps ?? []).includes(cn.uuid) || (consignmentDelivered ?? []).includes(cn.uuid)))?.length ? "Yes" : "No"
    }
    jsonArr.push(cnInfoObj)
  }
  return jsonArr
}

function _jsonArr2Aoa(jsonArr) {
  const aoa = [];

  jsonArr.forEach((v) => {
    let tempArr = [
      v.dispatch,
      v.customerCode,
      v.customerName,
      v.town,
      v.state,
      v.invoiceNo,
      v.invoiceDate,
      v.eWayNo,
      v.eWayDate,
      v.eWayTime,
      v.distance,
      v.transporterName,
      v.transporterGrnNo,
      v.transporterGrnDate,
      v.vehicleNo,
      v.invoiceAmount,
      v.netWeight,
      v.bucketQty,
      v["Bucket/Tub Weight Calculated as per Policy (In KG)"],
      v.totalWeight,
      v.freightPaymentStatus,
      v.clubbingStatus,
      v.toPayFreigt,
      v.freightAmount
    ]

    aoa.push(tempArr)
  })

  return aoa
}

function aoa2XlsxFile(arrOfArr, fromDate, tillDate, fileName) {
  const __styleCell = (value, bold = null, size = 11, border = null, alignmentH = null, wrapText = null) => {
    let cell = {
      v: value,
      t: "s",
      s: {
        alignment: {
          vertical: "center",
          horizontal: "center",
          wrapText: false,
        },
        font: { bold: false, sz: 11 },
      }
    }

    if (bold) cell.s.font.bold = true
    if (size) cell.s.font.sz = size
    if (border) cell.s.border = border
    if (alignmentH) cell.s.alignment.horizontal = alignmentH
    if (wrapText) cell.s.alignment.wrapText = true

    return cell
  }

  const border = {
    top: {
      style: "thin",
      color: "0000",
    },
    bottom: {
      style: "thin",
      color: "0000",
    },
    left: {
      style: "thin",
      color: "0000",
    },
    right: {
      style: "thin",
      color: "0000",
    },
  };

  let headersArr = [
    [
      "",
      __styleCell("From:", true, 14, null, "right", null),
      __styleCell(`${moment(fromDate).format("DD-MM-YYYY")}`, null, 14, null, "left", null)
    ],
    [
      "",
      __styleCell("Till:", true, 14, null, "right", null),
      __styleCell(`${moment(tillDate).format("DD-MM-YYYY")}`, null, 14, null, "left", null)
    ],
    [
      "",
      __styleCell("Dispatch Plant", true, 14, border, "center", true),
      __styleCell("Customer Code", true, 14, border, "center", true),
      __styleCell("Customer Name", true, 14, border, "center", true),
      __styleCell("Town (Ship to)", true, 14, border, "center", true),
      __styleCell("State (Ship to)", true, 14, border, "center", true),
      __styleCell("SAP Invoice No", true, 14, border, "center", true),
      __styleCell("SAP Invoice Date", true, 14, border, "center", true),
      __styleCell("E Way No", true, 14, border, "center", true),
      __styleCell("E Way Date", true, 14, border, "center", true),
      __styleCell("E Way Time", true, 14, border, "center", true),
      __styleCell("Distance (KM)", true, 14, border, "center", true),
      __styleCell("Transporter Name", true, 14, border, "center", true),
      __styleCell("Transporter GRN No", true, 14, border, "center", true),
      __styleCell("Transporter GRN Date", true, 14, border, "center", true),
      __styleCell("Vehicle No", true, 14, border, "center", true),
      __styleCell("Invoice Amount", true, 14, border, "center", true),
      __styleCell("Net Weight", true, 14, border, "center", true),
      __styleCell("Bucket/Tub Qty. (In Nos.)", true, 14, border, "center", true),
      __styleCell("Bucket/Tub Weight Calculated as per Policy (In KG)", true, 14, border, "center", true),
      __styleCell("Total Weight (In KG)", true, 14, border, "center", true),
      __styleCell("Freight Payment Status (Paid/Unpaid)", true, 14, border, "center", true),
      __styleCell("Clubbing Status", true, 14, border, "center", true),
      __styleCell("To-Pay Freight (Paid By RS)", true, 14, border, "center", true),
      __styleCell("Freight Amount", true, 14, border, "center", true),
    ],
  ]

  arrOfArr = arrOfArr.map((arr) => {
    arr = arr.map((v) => __styleCell(v, null, 12, border))
    return ["", ...arr]
  })

  const aoa = [...headersArr, ...arrOfArr]

  const wb = XLSX.utils.book_new()

  const ws = XLSX.utils.aoa_to_sheet(aoa)

  XLSX.utils.book_append_sheet(wb, ws)

  XLSX.writeFile(wb, fileName)
}

async function sendEmailWithAttachment(to, cc, subject, content, filePath1, html = null) {
  let url = `https://apis.fretron.com/notifications/emails/email`;
  let reqObj = {
    to: to.join(),
    cc: cc.join(),
    subject: subject ? subject : "",
    content: content ? content : "",
    html: html ? html : "",
  };
  if (filePath1) reqObj.file = fs.createReadStream(filePath1);

  const options = {
    method: "POST",
    uri: url,
    headers: {
      "Content-Type": "application/json",
    },
    formData: reqObj,
    timeout: 10000,
  };
  let res = await rp(options);
  console.log(`sendEmailWithAttachment Status ${res}`);
  if (res && !res.error) {
    return "Done";
  }
  return res && res.error ? res.error : null;
}

// module.exports = {
//   monthly_freight_provision: main
// }



main(1682879400000, 1685557800000, ["pooja.bishu@fretron.com"], [])



