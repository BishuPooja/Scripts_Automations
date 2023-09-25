const rp = require("request-promise");
const _ = require("lodash");
const FRT_PUB_BASE_URL = "https://apis.fretron.com";
const TOKEN =
  "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTQ0MjcyMDUsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiMDZhY2FjN2YtNTY5Ny00ZmVmLTlhNjEtZWVmNDdmNzUzNjdhIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.vUi7UX-ZSzVDetSVm2PZcQy-g-47B3TKq7jBn1_wEII";
const mails = [
  "john.talari1@bigbasket.com",
  "rathish.1@bigbasket.com",
  "prashant.mandade@bigbasket.com",
  "rama.satapathy@bigbasket.com",
  "vivek.p@bigbasket.com",
  "rahul.bansal@fretron.com",
  "monu.khan@fretron.com",
];
async function mailer(to, cc, subject, html) {
  try {
    console.log(`Mail Sent with Subject ${subject}`);
    await rp({
      url: `${FRT_PUB_BASE_URL}/notifications/emails/email`,
      json: true,
      body: {
        cc: cc,
        to: to,
        subject: subject,
        html: html,
      },
      method: "POST",
    });
    return "Mail Sent successfully";
  } catch (err) {
    return "Error sending mail- " + err.message;
  }
}

async function generateAlert(alert, sh) {
  try {
    let res = await rp({
      uri: `${FRT_PUB_BASE_URL}/shipment/v1/shipment/${sh.uuid}/alert`,
      method: "POST",
      headers: {
        Authorization: TOKEN,
      },
      json: true,
      body: alert,
    });
    if (res.status === 200) {
      console.log(
        `successfully added alert ${alert.description} on shipmentNo : ${sh.shipmentNumber}`
      );
    } else {
      console.log(
        `Some error in adding alert ${alert.description} : ${sh.shipmentNumber}, error: ${res.error}`
      );
    }
  } catch (e) {
    console.log(
      `Some catched error in adding alert on shipmentNo : ${sh.shipmentNumber}, error: ${e.message}`
    );
  }
}
function getFromCf(cfs, key) {
  return cfs?.find((v) => v.fieldKey == key)?.value;
}

async function main(sh) {
  try {
    let shNo = sh?.shipmentNumber;
    console.log(`Shpment Number ${shNo}`);
    let shStages = sh?.shipmentStages;
    if (shStages[0]?.status == "COMPLETED" &&shStages[1]?.status == "UPCOMING") {
      let cfs = sh?.customFields;
      let eLockImage = getFromCf(cfs, "E-Lock Image Upload");
      if (!eLockImage) {
        // send Mail
        let vehicleNo = sh?.fleetInfo?.vehicle?.vehicleRegistrationNumber;
        let driverName = sh?.fleetInfo?.driver?.name;
        let driverNo = sh?.fleetInfo?.driver?.mobileNumber;
        let origin =
          _.first(shStages)?.place?.name ?? _.first(shStages)?.hub?.name;
        let destination =
          _.last(shStages)?.place?.name ?? _.last(shStages)?.hub?.name;

        let htmlString = `<html> 
        <head>               
        </head>
            <body>
            <p>Dear User,</p>
            <p>We would like to bring to your attention that the E-Lock assigned to the following trip has been reported as an E-Lock Image not Uploaded while departing from DC.,</p>
            <p>Trip Number : ${shNo ?? "N/A"}</p>
            <p>Vehicle Number : ${vehicleNo ?? "N/A"}</p>
            <p>Driver Name : ${driverName ?? "N/A"}</p>
            <p>Driver Number : ${driverNo ?? "N/A"}</p>
            <p>Origin : ${origin ?? "N/A"}</p>
            <p>Destination : ${destination ?? "N/A"}</p>
            </body>
            </html>`;
        let subject = `Fretron |"E-Lock Image not Uploaded while departing from DC`;
        let mailRes = await mailer(["pooja.bishu@fretron.com"],[],subject,htmlString);
        console.log(`mailRes ${JSON.stringify(mailRes)}`)
        // Generate ALert
        let alertGenPayload = {
          closedBy: null,
          createdAt: Date.now(),
          issueId: null,
          createdBy: null,
          snoozTime: null,
          description: "E-Lock Image not uploaded",
          type: "elock.image.missing.notification",
          status: "OPEN",
          updatedAt: null,
        };
        // await generateAlert(alertGenPayload,sh)
      } else {
        console.log(`E-Lock Image Uploaded for ${shNo}`);
      }
    } else {
      console.log(`shipment is not Enroute For Delivery ${shNo}`);
    }
  } catch (e) {
    console.log(`Catched Error In Main ${e.message}`);
  }
}


main($event);
