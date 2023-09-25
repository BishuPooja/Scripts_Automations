const rp = require("request-promise");
const _ = require("lodash");
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTUxOTU5NzUsInVzZXJJZCI6ImJvdHVzZXItLTY4MWFiZGMzLTU5M2YtNGRlYy04MzY1LTBjNWFlM2Y2ZTMyMyIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTY4MWFiZGMzLTU5M2YtNGRlYy04MzY1LTBjNWFlM2Y2ZTMyMyIsIm9yZ0lkIjoiNmY4MGVmZjUtZmFkMS00ZmJmLTk3NmItYjViZmI1OTVkNDU0IiwibmFtZSI6InN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.6mjgfKp1vlFFMuPVpdrDBL2_8qBSGv-yhuLEu2zJCbI";

async function getVehicles() {
  try {
    let data = [];
    let url = `https://apis.fretron.com/shipment-view/partner-fleet/fleets/v2?size=2000`;

    console.log(url);

    let res = await rp({
      uri: url,
      method: "GET",
      json: true,
      headers: {
        authorization: TOKEN,
      },
    });

    if (res.status != 200) {
      console.log(`vehicle Get Error ${res.error}`);
    }

    data.push(...res.data);
    let vehId = _.last(data);
    vehId = [vehId?.uuid];

    while (res?.data?.length && vehId) {
      url = `https://apis.fretron.com/shipment-view/partner-fleet/fleets/v2?size=200&from=${encodeURIComponent(
        JSON.stringify(vehId)
      )}`;
      console.log(url);
      res = await rp({
        uri: url,
        method: "GET",
        json: true,
        headers: {
          authorization: TOKEN,
        },
      });
      if (res?.data) {
        data.push(...res.data);
        vehId = [_.last(res.data)?.uuid];
      }
    }
    return data;
  } catch (e) {
    console.log(`Catched Error While Getting Vehicles ${e.message}`);
  }
  return [];
}
async function getVAHANdetails(vehNo) {
  try {
    let url = `https://apis.fretron.com/partner-fleet/v2/vehicle/registration/details/v2?vehicleNumber=${vehNo}`;

    console.log(url);
    let res = await rp({
      uri: url,
      method: "GET",
      headers: {
        authorization: TOKEN,
      },
      json: true,
      // timeout: 10000,
    });
    if (!res.status == 200) {
      console.log(`VAHAN Api Error ${e.message}`);
    }
    return res?.status == 200 ? res.data : null;
  } catch (e) {
    console.log(`Catched Error While Getting Vehicles ${e.message}`);
  }
  return null;
}

async function uploadDoc(docName) {
  const request = require("request-promise");
  let url = "https://apis.fretron.com/documents/v2/document";
  const options = {
    uri: url,
    method: "POST",
    headers: {
      accept: "application/json, text/plain, */*",
      authorization: TOKEN,
      "content-type":
        "multipart/form-data; boundary=----WebKitFormBoundaryB3LDYlKHwyD9GAYq",
    },
    formData: {
      file: {
        value: "No Attachment Available",
        options: {
          filename: "filename.txt",
          contentType: "application/octet-stream",
        },
      },
      doc: JSON.stringify({
        resourceId: null,
        isExpirable: false,
        expireDate: null,
        uuid: null,
        orgId: null,
        resourceType: "PARTNER_FLEET",
        docPath: null,
        downloadUrl: null,
        name: docName,
        customFields: [],
      }),
    },
    json: true, // Automatically parses the JSON response
  };

  let res = await request(options);
  if (res) {
    return res;
  } else {
    console.log(`upload Doc Catch Error ${res.error}`);
  }

  return null;
}

async function updateDocument(payload) {
  try {
    let url = `https://apis.fretron.com/documents/v2/document`;
    console.log(url);
    let res = await rp({
      uri: url,
      method: "PUT",
      body: payload,
      json: true,
      headers: {
        authorization: TOKEN,
      },
    });
    return res;
  } catch (e) {
    console.log(`Rc Updload Document Error ${e.message}`);
  }
}
async function udpateVehdOC(payload) {
  try {
    let url = `https://apis.fretron.com/partner-fleet/v2/bulk/actions`;
    console.log(url);
    let res = await rp({
      uri: url,
      method: "PUT",
      body: payload,
      json: true,
      headers: {
        authorization: TOKEN,
      },
    });
    // console.log(res);
    if (res?.status == 200) {
      console.log(`Vehicle Updated Successfully`);
    } else {
      console.log(`vehicle update Error ${res?.error}`);
    }

    return res;
  } catch (e) {
    console.log(`Catched Error While Getting Vehicles ${e.message}`);
  }
  return null;
}

function getCutomFields(no, noValue, validFrom, expiryDate, expiryDateValue) {
  return [
    {
      fieldType: "text",
      fieldKey: no,
      value: noValue,
      indexedValue: [],
      valueType: "string",
      definitionId: null,
    },
    {
      fieldType: "date",
      fieldKey: validFrom,
      value: null,
      indexedValue: [],
      valueType: "string",
      definitionId: null,
      max: null,
    },
    {
      fieldType: "date",
      fieldKey: expiryDate,
      value: expiryDateValue,
      indexedValue: [],
      valueType: "string",
      definitionId: null,
      min: null,
    },
    {
      fieldType: "text",
      fieldKey: "isDummy",
      value: "true",
      indexedValue: [],
      valueType: "string",
      definitionId: null,
    },
  ];
}

async function main() {
  try {
    let vehicles = await getVehicles();
    console.log(`vehicles ${vehicles?.length}`);
    let count = 0;
    for (let veh of vehicles) {
      count += 1;

      console.log(`count ${count}`);
      let vehNo = veh?.vehicle?.vehicleRegistrationNumber;
      let vehId = veh?.uuid;
      console.log(`Executing For ${vehNo}`);
      if (veh?.vehicle?.attachedDocs?.length >= 3) {
        console.log(`already updated Document ${vehNo}`);
        continue;
      }
      let docDetials = await getdocIds(vehNo);
      if (!docDetials) {
        console.log(`docDetials Not Found For ${vehNo}`);
        continue;
      }
      let docIds = docDetials?.docIds;
      let engineNumber = docDetials?.engineNumber;
      let chassisNumber = docDetials?.chassisNumber;

      let engineData = {
        actionName: "cfs",
        payload: {
          cfs: [
            {
              fieldType: "text",
              fieldKey: "EngineNumber",
              value: engineNumber,
              indexedValue: [],
              valueType: "string",
              definitionId: null,
            },
          ],
        },
      };

      let vehDocUpdatePayload = {
        partnerUUID: vehId,
        actions: [
          {
            actionName: "document",
            payload: {
              document: docIds,
            },
          },
          {
            actionName: "chassisNumber",
            payload: {
              chassisNumber: chassisNumber,
            },
          },

          engineData,
        ],
      };
      await udpateVehdOC(vehDocUpdatePayload);
    }
  } catch (e) {
    console.log(`catched Error ${e.message}`);
  }
}

main();

async function getdocIds(vehNo) {
  try {
    let docIds = [];
    let vahanDetails = await getVAHANdetails(vehNo);
    if (!vahanDetails) {
      console.log(`Vahan Details not Found For ${vehNo}`);
      return;
    }

    let rcId = vahanDetails.rcNumber;
    let rcExpriyDate = vahanDetails?.rcExpiryDate;
    let pollutionNo = vahanDetails?.pollutionNumber;
    let pollutionExpDate = vahanDetails?.pollutionExpiryDate;
    let insuranceNumber = vahanDetails?.insuranceNumber;
    let insuranceExpiryDate = vahanDetails?.insuranceExpiryDate;
    let engineNumber = vahanDetails?.engineNumber;
    let chassisNumber = vahanDetails?.chassisNumber;

    let rcCfs = getCutomFields(
      "RC ID",
      rcId,
      "RC Valid From",
      "RC Expire Date",
      rcExpriyDate
    );

    let pullutionCfs = getCutomFields(
      "Pollution No.",
      pollutionNo,
      "Pollution Valid From",
      "Pollution Expiry Date",
      pollutionExpDate
    );

    let insuranceCfs = getCutomFields(
      "Insurance No.",
      insuranceNumber,
      "Insurance Valid From",
      "Insurance Expiry Date",
      insuranceExpiryDate
    );
    let docNames = ["VEHICLE_INSURANCE", "VEHICLE_POLLUTION", "VEHICLE_RC"];
    for (let doc of docNames) {
      console.log(`exceuting For ${doc}`);
      let uploadedDocRes = await uploadDoc(doc);
      if (!uploadedDocRes) {
        console.log(`Doc Not Uploaded for ${doc}`);
        continue;
      }

      let customFields = [];
      if (doc == "VEHICLE_INSURANCE") {
        customFields = insuranceCfs;
      } else if (doc == "VEHICLE_POLLUTION") {
        customFields = pullutionCfs;
      } else {
        customFields = rcCfs;
      }

      let downloadUrl = uploadedDocRes?.data?.downloadUrl;
      let docPath = uploadedDocRes?.docPath;
      let updates = uploadedDocRes?.updates;
      let docUpdatePayload = {
        resourceId: null,
        customFields: customFields,
        downloadUrl: downloadUrl,
        updates: updates,
        uuid: uploadedDocRes.data.uuid,
        orgId: uploadedDocRes.data.orgId,
        docPath: docPath,
        createdAt: Date.now(),
        isExpirable: false,
        previewString: null,
        createdBy: uploadedDocRes?.createdBy,
        name: uploadedDocRes?.name,
        expireDate: null,
        resourceType: "PARTNER_FLEET",
      };
      let documentUpdated = await updateDocument(docUpdatePayload);
      if (documentUpdated?.status == 200) {
        docIds.push(documentUpdated.data.uuid);
      }
    }
    return {
      docIds: docIds,
      engineNumber: engineNumber,
      chassisNumber: chassisNumber,
    };
  } catch (e) {
    console.log(`Get Doc Id Catch Error ${e.message}`);
  }
}
