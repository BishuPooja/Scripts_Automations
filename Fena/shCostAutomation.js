const rp = require("request-promise");
const TOKEN =
  "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTUwMTI2MTgsInVzZXJJZCI6ImJvdHVzZXItLTgyYzhiOGNiLWJhNDEtNGM0ZC1iODQxLWYzZjk1ZjgyNTFhZiIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTgyYzhiOGNiLWJhNDEtNGM0ZC1iODQxLWYzZjk1ZjgyNTFhZiIsIm9yZ0lkIjoiM2U0Y2RlZTktMGIzYi00NmRkLTliOTgtZGYwZTM4YTAyNzFjIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.k1wUWGQXmvmFNcU_8QdgP4aXCU_bj2jfj--baV3KLSE";

const FRT_PUB_BASE_URL = "https://apis.fretron.com";
const shCost = {
  amount: 5000,
  charge: {
    amount: 5000,
    amountByVendor: null,
    rate: null,
    billingType: ["VendorBill", "Invoice", "DebitNote", "CreditNote"],
    chartsOfAccount: {
      name: "DRIVER EXPENSE",
      accountGroup: "Expense",
      type: "Expense",
      accountPath: [
        "Expense",
        "Expense",
        "37a74f14-529d-4c87-b884-a5baa687418d",
      ],
      uuid: "37a74f14-529d-4c87-b884-a5baa687418d",
    },
    name: "Vendor Freight",
    rateUnit: null,
    uuid: "92971cd5-3240-408a-b880-998d1a942b45",
    base: null,
    applicableFor: null,
  },
  billItemId: null,
  billFeedingType: null,
  updates: {
    traceID: "0e802514-916c-4855-9bf1-27840ee9d251",
    resourceId: "6a0ea535-012d-4f42-8c3e-a42f5859cd17",
    updatedBy: "USER",
    changes: [],
    sourceOfInformation: null,
    description: "Added Charge DRIVER EXPENSE With Amount 5000.0",
    forwardReasons: [],
    userId: "97122da8-f5e1-45cf-9ba8-abbf6943aa2c",
    uuid: "6b69945c-5aee-46fa-b4d0-300cc53a8527",
    revision: 0,
    time: 1694758047783,
    forwardedFrom: null,
    resourceType: "ShipmentCost",
    updateType: null,
  },
  uuid: "238880b1-3f90-4639-b41f-b813a65624c0",
  orgId: "495b8728-c761-4fa7-83fe-db75a7d63221",
  lineItems: [],
  distributionBasis: "Weight",
  shipmentId: "6a0ea535-012d-4f42-8c3e-a42f5859cd17",
  vendor: {
    gstn: null,
    name: "JHRL",
    externalId: null,
    type: "vendor",
    uuid: "f24bff50-ded4-4fe8-9cdf-02f34b518d44",
    group: {
      name: "lorryOwner",
      partnerType: null,
      uuid: null,
      orgId: null,
    },
  },
  billId: null,
  billStatus: null,
  applicability: "Shipment",
};

async function bulkSyncApi(payload) {
  let url = `${FRT_PUB_BASE_URL}/shipment/v1/shipment/bulk/sync`;
  try {
    let res = await rp({
      method: "POST",
      uri: url,
      body: payload,
      headers: {
        Authorization: TOKEN,
      },
      json: true,
    });

    if (res.status == 200) {
      console.log(`Bulk Sync api response status : ${res.status}`);
      return res.data;
    } else {
      console.log(`Bulk Sync api response error : ${res.error}`);
    }
  } catch (e) {
    console.log(`Catched Error in Bulk Sync api : ${e.message}`);
  }
  return null;
}
async function getUserName(userId) {
  try {
    let userRes = await rp({
      uri: `${FRT_PUB_BASE_URL}/users/v1/admin/user?key=uuid&value=${userId}`,
      method: "GET",
      json: true,
    });
    if (userRes.data != null) {
      return userRes.data.name;
    }
  } catch (e) {
    console.log(
      `Catched Error While Getting User Name By Id ${userId}  ${e.message}`
    );
  }
  return null;
}

function getCfObj(fieldKey, value) {
  return {
    fieldKey: fieldKey,
    multiple: false,
    description: "",
    remark: "",
    uuid: null,
    required: false,
    accessType: null,
    input: "string",
    unit: "",
    valueType: "string",
    options: [],
    fieldType: "text",
    value: value,
    isRemark: false,
  };
}

async function main(shCost) {
  try {
    let shId = shCost?.shipmentId;
    let chargeType = shCost?.charge?.name;
    console.log(`chargeType ${chargeType}`);

    if (chargeType != "Vendor Freight") {
      console.log(`vendor Freight Charge Type Not Found For Shipment ${shId}`);
      return;
    }
    let updatedById = shCost?.updates?.userId;
    if (!updatedById) {
      console.log(`user Id Not Foundm For shipment ${shId}`);
      return;
    }

    let updatedByName = await getUserName(updatedById);
    if (!updatedByName) {
      console.log(`updated By Name Not Found For shipment ${shId}}`);
      return;
    }
    let cfs = [];
    cfs.push(getCfObj("Vendor Frieght Added By", updatedByName));
    let payload = {
      shipmentId: shId,
      updates: [
        {
          keyToUpdate: "customfields",
          updatedValue: cfs,
        },
      ],
    };
    let cfAddedRes = await bulkSyncApi(payload);
    if (cfAddedRes) {
      console.log(
        `Vendor Frieght Added By Added Successfully Shipment On ${cfAddedRes?.shipmentNumber}`
      );
    }
  } catch (e) {
    console.log(`Catched Error ${e.message}`);
  }
}

try {
  await main(shCost);
} catch (e) {
  console.log(`Automation Catched Error ${e.message}`);
}
