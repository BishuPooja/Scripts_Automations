const rp = require("request-promise");
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTQ0OTgzODIsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNmY4MGVmZjUtZmFkMS00ZmJmLTk3NmItYjViZmI1OTVkNDU0IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.kzSbreYsNocaAH6HwVyDxYfJBw2YKBs9urELsxSePWw";

async function deleteIssueType(issueTypeId) {
  try {
    let url = `https://apis.fretron.com/issue/v1/issue-type/${issueTypeId}`;
    let res = await rp({
      uri: url,
      method: "DELETE",
      json: true,
      headers: {
        Authorization: TOKEN,
      },
    });

    console.log(`issue Delete status ${res.status}`);
    if (res?.status != 200) {
      console.log(`issue delete error ${res.error}`);
    }
  } catch (e) {
    console.log(`Catched Error Deletion ${e.message}`);
  }
}

async function getIssueTypes(offset) {
  try {
    let url = `https://apis.fretron.com/issue/v1/issueType/v2?limit=218&offset=0&inFilters=%7B%22sharedDepartments%22%3A%5B%5D%2C%22isHidden%22%3A%5B%5D%2C%22relatedTo%22%3A%5B%5D%2C%22showIn%22%3A%5B%5D%7D&searchKey=Route%20deviation`;
    let res = await rp({
      uri: url,
      method: "GET",
      json: true,
      headers: {
        Authorization: TOKEN,
      },
    });

    console.log(`issue get status ${res.status}`);
    if (res?.status != 200) {
      console.log(`issue getting error ${res.error}`);
    }
    return res.data;

  } catch (e) {
    console.log(`Catched Error Getting ${e.message}`);
  }
  return [];
}

async function main() {
  try {
    let issueTypes = await getIssueTypes();
   
    console.log(issueTypes?.length)
    for (let issue of issueTypes) {
      console.log(issue.uuid);
      await deleteIssueType(issue.uuid);
    }
  } catch (e) {
    console.log(`Main Catched Error ${e.message}`);
  }
}

main()
