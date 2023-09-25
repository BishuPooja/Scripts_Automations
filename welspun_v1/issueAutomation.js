const rp = require("request-promise");
const TOKEN = "";
const issueTypesArr = [
  "Normal Rate Table",
  "Depot to Depot Movement",
  "CSD Movement",
];

async function postIssueDataOnIntegration(issue) {
  try {
    let url=``
    let res = await rp({
      uri: url,
      method: "POST",
      body: issue,
      json: true,
      headers: {
        authorization: TOKEN,
      },
    });
    console.log(`Integration Res status ${res.status}`);
    return res;
  } catch (e) {
    console.log(`Catched Error While Sending Data On Integration ${e.message}`);
  }
}

async function main(issue) {
  try {
    let issueType = issue?.issueType;
    console.log(`IssueType ${issueType}`);
    if (issueTypesArr.includes(issueType)) {
      console.log(`Issue Type Matched`);
      await postIssueDataOnIntegration(issue);
    }
  } catch (e) {
    console.log(`Caught Error in Main ${e.message}`);
  }
}

try {
   main($event);
} catch (e) {
  console.log(`Caught Error In Main ${e.message}`);
}
