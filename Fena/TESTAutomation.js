const moment = require("moment");
const rp = require("request-promise");
const FRT_PUB_BASE_URL = "https://apis.fretron.com";
const _ = require("lodash");
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTUxOTU5NzUsInVzZXJJZCI6ImJvdHVzZXItLTY4MWFiZGMzLTU5M2YtNGRlYy04MzY1LTBjNWFlM2Y2ZTMyMyIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTY4MWFiZGMzLTU5M2YtNGRlYy04MzY1LTBjNWFlM2Y2ZTMyMyIsIm9yZ0lkIjoiNmY4MGVmZjUtZmFkMS00ZmJmLTk3NmItYjViZmI1OTVkNDU0IiwibmFtZSI6InN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.6mjgfKp1vlFFMuPVpdrDBL2_8qBSGv-yhuLEu2zJCbI";

const physicalbillCfs = [
  "Physical Bill Satus For Logistics",
  "Physical Bill Satus For Account Unit",
];

async function updateCfsOnBill(billId, cfs) {
  try {
    let res = await rp({
      uri: `${FRT_PUB_BASE_URL}/shipment-cost/v1/vendor/bill/${billId}/add/customFields`,
      json: true,
      method: "POST",
      headers: {
        Authorization: TOKEN,
      },
      body: cfs,
    });
    console.log(
      `Custom Field updated on bill ${billId}, status: ${res.status}`);
    if (res?.status != 200) {
      console.log(
        `Error while updating cf on bill ${billId}, status: ${res.error}`
      );
    } else {
      return res?.data;
    }
  } catch (e) {
    console.log(
      `Error while updating cf on bill ${billId}, status: ${e.message}`
    );
  }
}
function getFromCf(cfs, fieldKey) {
  return cfs?.find((v) => v.fieldKey == fieldKey);
}
function getCfPayload(key, value) {
  return {
    "fieldKey": key,
    "multiple": false,
    "description": "",
    "remark": "",
    "uuid": null,
    "required": false,
    "accessType": null,
    "input": "",
    "unit": "",
    "valueType": "string",
    "options": [
      "Recieved",
      "Pending"
    ],
    "fieldType": "radio-button",
    "value": value,
    "isRemark": false
  }
}

async function main() {
  try {
    let billId = "87ba45c3-0570-4fb8-95a4-79011b980f51"
    let cfAdd = [getCfPayload("Physical Bill Satus For Logistics", "Pending")];
    
    await updateCfsOnBill(billId, cfAdd);
    return

    console.log(`Executing For ${billNo}`);
    let updates = bill?.updates;
    let updatedTime = updates?.time;
    let cfs = bill?.customFields;
    let forwardedFrom = updates?.forwardedFrom
      ? (updates?.forwardedFrom).split(",")
      : null;
    if (!forwardedFrom) {
      console.log(`ForwardedFrom Not Found For Bill ${billNo}`);
      return;
    }
    let udpatedCfs = null;
    if (forwardedFrom) {
      udpatedCfs = forwardedFrom.filter((v) =>
        physicalbillCfs.find((it) => it == v)
      );
    }
    let receivedAtcfs = [];
    if (udpatedCfs?.length) {
      for (cf of cfs) {
        let fieldKey = cf.fieldKey;
        if (udpatedCfs.find((v) => v == fieldKey)) {
          let cfValue = cf.value;
          if (cfValue == "Recieved") {
            let recievedAtFieldKey = `${fieldKey} Received At`;
            let recievedAtCf = getFromCf(cfs, recievedAtFieldKey);
            if (recievedAtCf) {
              receivedAtcfs.value = updatedTime;
              receivedAtcfs.push(recievedAtCf);
            } else {
              receivedAtcfs.push(getCfPayload(recievedAtFieldKey, updatedTime));
            }
          } else {
            console.log(` ${fieldKey} : ${cfValue}`);
          }
        }
      }
    } else {
      console.log(`Physical Bill status cfs are not updated for ${billNo}`);
    }
    console.log(receivedAtcfs);
    await updateCfsOnBill(billId, receivedAtcfs);
  } catch (e) {
    console.log(`Caught Error in Main ${e.message}`);
  }
}
main();



// const moment = require("moment")
// const rp = require("request-promise")
// const FRT_PUB_BASE_URL = "https://apis.fretron.com"
// const _ = require("lodash")

const removeCfsKey = ["Physical Bill Satus For Logistics Recieved At", "Physical Bill Satus For Account Unit Recieved At", "Physical Bill Status Recieved At"]
const updateCfsKey = ["Physical Bill Satus For Logistics", "Physical Bill Satus For Account Unit"]


async function updateBill(payload) {
    try {
        let url = `${FRT_PUB_BASE_URL}/shipment-cost/v1/vendor/bill`
        let res = await rp({
            uri: url,
            method: "PUT",
            json: true,
            body: payload,
            headers: {
                authorization: TOKEN
            }
        })
        if (res ?.status != 200) {
            console.log(`Bill Updation Error ${res.error}`)
        } else {
            console.log(`Bill ${payload ?.billNumber} Updated Successfully BillUpdated Status: ${res ?.status} `)
        }
    } catch (e) {
        console.log(`Caught Error while updating Bill ${e.message}`)
    }
}
async function main(bill) {
    try {
        let billNo = bill ?.billNumber
        console.log(`BillNumber ${billNo}`)
        if (bill.billingStatus == "PENDING") {
            bill.physicalBillStatus = "PENDING"
            let updatedCfs = (bill ?.customFields ?? []).reduce((acc, cv) => {
                if (!removeCfsKey.includes(cv.fieldKey)) {
                    if (updateCfsKey.includes(cv.fieldKey)) { cv.value = "Pending" }
                    acc.push(cv)
                }
            }, [])
            bill.customFields = updatedCfs
            console.log(JSON.stringify(bill.customFields))
            await updateBill(bill)
        }else{
            console.log(`Bill is in ${bill.billingStatus} mode`)
        }
    } catch (e) {
        console.log(`Catched Error in Main ${e.message}`)
    }
}


await main(bill)
