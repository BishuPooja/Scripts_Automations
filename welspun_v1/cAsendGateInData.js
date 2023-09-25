const validUserIds = [
  "a42e539c-88f3-42cf-a1e7-d13e0b60833d",
  "97122da8-f5e1-45cf-9ba8-abbf6943aa2c",
  "ebe5751a-a05b-46b6-91b4-1c112a90f638",
];

const _ = require("request-promise");

const validUsersMap = {
  "a42e539c-88f3-42cf-a1e7-d13e0b60833d": {
    name: "System Integration",
  },
  "97122da8-f5e1-45cf-9ba8-abbf6943aa2c": {
    name: "Pooja Bishu",
  },
  "ebe5751a-a05b-46b6-91b4-1c112a90f638": {
    name: "Suyash",
  },
};

function _parseJwt(token) {
  var base64Url = token.split(".")[1];
  return JSON.parse(Buffer.from(base64Url, "base64").toString());
}

async function getShByShId(shId, TOKEN) {
  try {
    let url = `${FRT_PUB_BASE_URL}/shipment/v1/shipment/${shId}`;
    let res = await rp({
      uri: url,
      method: "GET",
      json: true,
      headers: {
        Authorization: TOKEN,
      },
    });
    if (res.error) {
      console.log(`shRes Error ${JSON.stringify(res)}`);
    }
    return res?.status == 200 ? res.data : null;
  } catch (e) {
    console.log(`error executing when getting shipment ${e.message}`);
  }
  return null;
}

function getFromCf(cfs, key) {
  return cfs.find((v) => v.fieldKey == key)?.value;
}

async function sendData(payload, TOKEN, type) {
  try {
    const port_dev = 8088;
    const port_quality = 8089;
    const port = type == "dev" ? port_dev : port_quality;
    let url = `http://122.180.251.100:${port}/welspun/amazin/manual-sync/gateIn`;
    let res = await rp({
      uri: url,
      method: "POST",
      body: payload,
      json: true,
      headers: {
        Authorization: TOKEN,
      },
    });
    console.log(res);
    return res;
  } catch (e) {
    console.log(`error catched SendData ${e.message}`);
  }
}

async function main(body) {
  try {
    let data = null;
    let status = 400;
    let error = null;
    let shId = body.shipmentId;

    let token = "Bearer " + body.token;
    let parseToken = _parseJwt(`${token}`);
    let userId = parseToken?.userId;
    // if (!validUserIds.includes(userId)) {
    //     return { data: data, error: `UserId Not Allowed ${userId}`, status: 401 }
    // }

    let portalType = parseToken?.portalType;
    if (portalType != "basic") {
      token =
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTIxNzkzNjUsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNmY4MGVmZjUtZmFkMS00ZmJmLTk3NmItYjViZmI1OTVkNDU0IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.M8JSbjIam0zW-ipGftY8-5keUeozgOfFYI5LLftQArE";
    }

    let cfs = body.cfs;
    console.log(
      cfs.map((_) => {
        return `${_.fieldKey}___${_.value}`;
      })
    );

    // let destination = _.last(body.shipmentStages);
    let gate_entry_date = getFromCf(cfs, "Gate Entry Date");
    let enviornment = getFromCf(cfs, "Environment");

    //***Gate Entry Number is not required
    // let gate_entry_no_manual = getFromCf(cfs, "Gate Entry Number_Manual")
    // let shipment = await getShByShId(shId, token)

    let payload = {
      gateInTime: gate_entry_date,
      shipmentId: shId,
    };

    if (gate_entry_date && enviornment) {
      let server = enviornment;
      // if (parseToken.orgId == "0a533445-1b99-42f9-9b2f-d621dee5129e") {
      //     server = "quality"
      // }
      //   let sentDataRes = await sendData(payload, token, server);
      //   if (sentDataRes?.status == 200) {
      //     data = sentDataRes?.data;
      //     status = 200;
      //   } else {
      //     error = sentDataRes?.error ?? "";
      //   }
    } else {
      error = "Gate Entry Date Not Provided or Missing on shipment";
      console.log(`Gate Entry Date not provided or missing on shipment`);
    }
    return { data: data, error: error, status: status };
  } catch (e) {
    console.log(`Error Catched Main ${e.message}`);
    return { data: null, error: e.message, status: 400 };
  }
}

let $event = {
  body: {
    shipmentId: "41f36c30-669c-40f6-a91a-1bafdd7f9df9",
    cfs: [
      {
        indexedValue: [],
        fieldKey: "Environment",
        multiple: true,
        description: "",
        remark: "",
        uuid: "f603ceb2-ba8d-44e8-97fb-47b1c2134329",
        required: false,
        accessType: null,
        input: "",
        unit: "",
        valueType: "arrayOfJson",
        options: [],
        fieldType: "camera",
        value: "Development",
        isRemark: false,
      },
    ],
    token:
      "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTEwNjI5OTksInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiI0OTViODcyOC1jNzYxLTRmYTctODNmZS1kYjc1YTdkNjMyMjEiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.dcdMT_-mN2BpAuhdGiAMpxqwQLoQC91nvsfuY9jwROA",
  },
};
try {
  main($event.body);
} catch (e) {
  console.log(`Error Catched custom Action ${e.message}`);

  return { data: null, error: `Some server error - ${e.message}`, status: 500 };
}
