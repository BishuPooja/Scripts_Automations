const rp = require("request-promise");
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTA1MjMzODcsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNmY4MGVmZjUtZmFkMS00ZmJmLTk3NmItYjViZmI1OTVkNDU0IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.CsBVd3CUxmnRs5UAa-96i9GD2nKTZoa_Eg1uD9ulgGc";

ensureIssueExists("Route Deviation", "FRETSH000002361");

async function ensureIssueExists(issueType, shipmentNo) {
  try {
    let filters = {
      "issueType.keyword": [`${issueType}`],
      "status.keyword": ["Open"],
      _customeField: { "Shipment Number": [`${shipmentNo}`] },
    };

    let url = `https://apis.fretron.com/shipment-view/issues/issues?filters=${encodeURIComponent(
      JSON.stringify(filters)
    )}`;

    let res = await rp({
      uri: url,
      method: "GET",
      json: true,
      headers: {
        Authorization: TOKEN,
      },
    });
    console.log(res);
    if (res?.length) {
      return false;
    }
  } catch (e) {
    console.log(`Caught Error Ensure Issue Exitsts ${e.message}`);
  }
  return true;
}
