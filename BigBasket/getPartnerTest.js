const { randomBytes } = require("crypto")
const FRT_PUB_BASE_URL = "https://apis.fretron.com"
const rp = require("request-promise")
const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODA4NjYwMjAsInVzZXJJZCI6ImJvdHVzZXItLTg0OTEzYjZkLWVhMzktNGQ3OC1iOGEyLTMyZjMxODk5ZmM1MSIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTg0OTEzYjZkLWVhMzktNGQ3OC1iOGEyLTMyZjMxODk5ZmM1MSIsIm9yZ0lkIjoiNDcyYjNjNTEtZDhlOS00Mjk0LThhN2YtYTY5MDkzYjUwNWI3IiwibmFtZSI6IkFETUlOIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.9cdW2HbIp8v2vPZMjSOX_Kemt5L_ThsooACoyImpEWE"


async function main() {
    let destination = "GORAKHPUR-SUNIL KUMAR JAISWAL"
    let partner = await getPartnerbyName(destination)
    console.log(`partner  ${JSON.stringify(partner)}`)
}

main()

async function getPartnerbyName(name) {
    try {
        if (!name.includes("-")) {
            sendMailBpNotFound(name)
            return null
        }
        let partnername = name.split("-")
        partnername = partnername[1]
        let url = `${FRT_PUB_BASE_URL}/shipment-view/bpartners/partners?size=50&from=0&filters={"name.keyword" :[${JSON.stringify(partnername)}]}`
        let res = await rp({
            url: url,
            json: true,
            method: "GET",
            headers: {
                authorization: token
            }
        })
        console.log(res.length)
        let foundPlace = res.find(_ => _.places && _.places.length > 0 ? _.places[0].name == name : null) 
        if(!foundPlace){
            await sendMailBpNotFound(partnername)
        }
        return foundPlace
    }
    catch (e) {
        console.log(`error get partner ${e.message}`)
    }

}

async function sendMailBpNotFound(partnerName) {
    let html =
        `<html>
<head>
    <body>
        <p>Dear Sir</p>
        <p>Please find below details :-</p>
        <p>Partner Name:- ${partnerName ?? "N/A"} </p>
    </body>
</head>
</html>`

    let to = ["monu.khan@fretron.com"]
    let cc = ["pooja.bishu@fretron.com"]
    let subject = `Business Partner Not Found - IGL `
    await forwardEmail(subject, to, cc, html)
}

async function forwardEmail(subject, to, cc, html) {
    try {
        console.log("Sending email with SUB: " + subject);
        await rp({
            uri: `${FRT_PUB_BASE_URL}/notifications/emails/email`,
            method: "POST",
            body: {
                cc: cc,
                to: to,
                subject: subject,
                html: html,
            },
            timeout: 15000,
            json: true,
        });
        return "Mail Sent"

    } catch (e) {
        console.log("Error while forwarding email");
    }
}