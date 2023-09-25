const rp = require("request-promise");
const moment = require("moment");
const FRT_BASE_URL = "https://apis.fretron.com";
const TOKEN = `Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTAyNjMwNTEsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNTE0MmEyNzUtMDc4Yi00MzYyLTkyMjMtY2ZhZTBlYzkwYzQ4IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.42zM360jeCcHkjnD8mM2hBWBQ4TD6ArAYaoDu2hjeLA`;

async function getPodData(cnId) {
  try {
    let res = await rp({
      url: `https://apis.fretron.com/pod/v1/action/ensure-pod?consignmentId=${cnId}`,
      method: "GET",
      json: true,
      headers: {
        authorization: TOKEN,
      },
    });
    if (res.status == 200) {
      return res.data;
    } else {
      return null;
    }
  } catch (e) {
    console.log(`error executing getting pod data ${e.message}`);
  }
}
function getFromCf(cfs, key) {
  return cfs?.find((v) => v.fieldKey == key)?.value ?? null;
}


async function getShipments(from, till) {
  try {
    console.log("api ", from, till)
    let filters = { "shipmentDate": { "isTillExpression": false, "isFromExpression": false, "from": from, "till": till }, "__version": 2 }
    let allFields = ["consignments", "branch", "shipmentNumber", "shipmentStatus", "fleetInfo", "customFields", "shipmentStages"]
    let url = `${FRT_BASE_URL}/shipment-view/shipments/v1?filters=${encodeURIComponent(JSON.stringify(filters))}&allFields=${encodeURIComponent(JSON.stringify(allFields))}&size=800`
    console.log(JSON.stringify(url))
    let res = await rp({
      uri: url,
      method: 'GET',
      json: true,
      headers: {
        authorization: TOKEN
      }
    })
    return res?.length ? res : []
  } catch (e) {
    console.log(`Error getting Shipment ${e.message}`)
  }
  return []

}

async function generateReport(event) {
  try {
    let fromTime = event.query.from
    let tillTime = event.query.till
    console.log(`fromTime ${fromTime}`)
    console.log("From " + fromTime + " Till " + tillTime)
    let shRes = await getShipments(fromTime, tillTime)
    let json = []
    console.log(shRes?.length)
    if (shRes?.length) {
      let count = 0
      for (let item of shRes) {
        let shNo = item?.shipmentNumber
        let vehicleNo = item?.fleetInfo?.vehicle?.vehicleRegistrationNumber
        let cfs = item?.customFields ?? []
        let manifestNo = getFromCf(cfs, "Manifest No")

        let tptCode = item.fleetInfo?.forwardingAgent?.externalId ?? item.fleetInfo?.broker?.externalId ?? item.fleetInfo?.fleetOwner?.externalId ?? ""
        let loadingDate = item.shipmentStages.find((v) => v.consignmentPickUps?.length)?.arrivalTime
        loadingDate = loadingDate ? new Date(loadingDate).toLocaleString() : ""
        let consignments = item?.consignments
        // console.log(JSON.stringify(consignments))
        if (consignments?.length) {
          for (let value of consignments) {
            let cnNo = ""
            let remarks = ""
            let shortage = null
            let receivedQty = null
            let recordDate = ""
            let cnId = value.uuid
            // console.log(`cnId ${cnId}`)
            let cnRes = value
            if (cnRes?.status == "Delivered") {
              count += 1
              cnNo = cnRes?.consignmentNo
              let consigneeName = cnRes?.consignee?.name
              let consigneeDestination = cnRes?.consignee?.places?.[0].name
              let podRes = await getPodData(cnId)
              if (podRes) {
                recordDate = podRes?.receiveDate
                recordDate = recordDate ? new Date(recordDate).toLocaleString() : ""
                remarks = podRes?.remarks
                let shortageDeliveryItem = podRes?.deliveryItems.find(_ => _.issues?.includes("Shortage"))
                if (shortageDeliveryItem) {
                  shortage = shortageDeliveryItem.orderMapping?.quantity?.weight?.shortage
                }
                if (podRes?.deliveryItems?.length) {
                  for (let item of podRes.deliveryItems) {
                    receivedQty += item.orderMapping?.quantity?.weight?.netQuantity
                    // console.log(`receivedQty`, receivedQty)
                  }
                }
              }

              let jsonObj = {
                "Invoice No": cnNo ?? "N/A",
                "Vehicle No": vehicleNo ?? "N/A",
                "Loading Date": loadingDate ?? "N/A",
                "Town": consigneeDestination ?? "N/A",
                "Consignee Name": consigneeName ?? "N/A",
                "POD Record Date": recordDate ?? "N/A",
                "TPT Code": tptCode ?? "N/A",
                "ReceivedQty": receivedQty ?? "N/A",
                "Remark": remarks ?? "N/A",
                "Shortage": shortage ?? "N/A",
                "Manifest No": manifestNo ?? "N/A"
              }
              json.push(jsonObj)
            }
          }
        } else {
          console.log(`Cn Not Found for Sh ${shNo}`)
        }
      }
      console.log(`count ${count}`)
    }
    console.log(json)
    return json
  } catch (e) {
    console.log(`error in getShMakeJson ${e.message}`)
  }
}

async function main() {
  try {
    let event = {
      "query": {
        "from": "1688103000000",
        "till": "1690695000000"
      }

    }
    console.log(event.query.from)
    generateReport(event);
  } catch (e) {
    console.log(`error in main ${e.message}`);
  }
}
main()




// async function test() {
//   let from = "1687068994000";
//   let till = "1689540814000";
//   let orgId = "5142a275-078b-4362-9223-cfae0ec90c48";

//   let data = await getShipments(from, till);
//   let count=0

//   for(let item of data){
//     count+=1
//     console.log(count)
//     console.log(item.consignments)
//     if(item.consignments?.pod){
//         console.log(pod)
//         return
//     }
//   }
// }
// test()