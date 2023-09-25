const rp = require("request-promise")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"

async function sendMailWithMissingValues(missingValue, shNo) {
    if (missingValue && missingValue.length) {
        let remainingHtml = ""
        for (let item of missingValue) {
            console.log(item)
            remainingHtml += `
            <li>${item}</li> `
        }
        let html = ` <html>
            <body>
                <p>Dear Sir</p>
                <p>Please find the below details</p>
                <ol>
                <li>shipment Number :-${shNo ?? "N/A"}</li>
                ${remainingHtml}
                </ol>
            </body>
        </html>
        `
        let subject = "FRETRON | Shipment Values Missing EXIDE"
        let mailRes = await mailer(["pooja.bishu@fretron.com"], [], subject, html)
        console.log(mailRes)
    }
}

const mailer = async (to, cc, subject, html) => {
    try {
        console.log(`Mail Sent with Subject ${subject}`)
        await rp({
            url: `${FRT_PUB_BASE_URL}/notifications/emails/email`,
            json: true,
            body: {
                cc: cc,
                to: to,
                subject: subject,
                html: html,
            },
            method: "POST"
        })
        return "Mail Sent successfully"
    } catch (err) {
        return "Error sending mail- " + err.message
    }
}
const bodyObj = {
    "missingFields": ["shipmentTrackingStatus", "cn", "foNo"],
    "sipmentNo": 6879
}
sendMailWithMissingValues(bodyObj.missingFields, bodyObj.sipmentNo)


