const rp = require("request-promise")
const token = "Bearet eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODUxMDQ1NjIsInVzZXJJZCI6ImJvdHVzZXItLTIwYzEwNzBiLWMwNzQtNDcxYS05NzA4LWU1MmZhZmEwNTdhZCIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTIwYzEwNzBiLWMwNzQtNDcxYS05NzA4LWU1MmZhZmEwNTdhZCIsIm9yZ0lkIjoiM2U0Y2RlZTktMGIzYi00NmRkLTliOTgtZGYwZTM4YTAyNzFjIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.Y3Lg4tmDXELG920JoEvAwUQQNva9H2fPvPbw5iXvfYY"

async function getActivityLog(uuid) {
    let url = `https://apis.fretron.com/shipment/v1/shipment/${uuid}/update-trail/v2?limit=150&offset=0`

    try {
        let res = await rp({
            url: url,
            json: true,
            method: "GET",
            headers: {
                Authorization: token
            }
        })
        return res.status == 200 ? res.data : null
    }
    catch (e) {
        console.log(`error getting activity log ${e.message}`)
    }
}


async function getShWithCn(shId) {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/shipment/v1/shipment/${shId}?skipCn=false`,
            method: "GET",
            json: true,
            headers: {
                authorization: token
            }
        })
        if (res.status == 200) {
            return res.data
        }
        else {
            console.log(`error in get sh ${res.error}`)
            return null
        }

    } catch (e) {
        console.log(`error executing while fetching shipment ${e.message}`)
    }
    return null

}

async function mailer(subject, to, cc, html) {
    console.log("Sending email with SUB: " + subject);
    await rp({
        uri: `https://apis.fretron.com/notifications/emails/email`,
        method: "POST",
        body: {
            cc: cc,
            to: to,
            subject: subject,
            html: html,
        },
        timeout: 2000,
        json: true,
    });
    return "Mail sent successfully!";
}

function getFromCf(cfs, key) {
    return cfs?.find(item => item.fieldKey === key);
}

async function main() {
    let shId = "d8ecbe61-253b-4b02-8960-bdfd9401e01a"
    let shMaster = await getShWithCn(shId)
    let originStatus = shMaster?.shipmentStages?.[0]?.status
    let firstStageStatus = shMaster?.shipmentStages?.[1]?.status
    if (originStatus == "COMPLETED" && firstStageStatus == "UPCOMING") {
        let shNo = shMaster?.shipmentNumber
        console.log(shNo)
        let cfs = shMaster?.customFields ?? []
        let shInvoiceNos = getFromCf(cfs, "Invoice No's")?.value?.split(",") ?? []
        let cnNos = shMaster?.consignments?.map(cn => cn.consignmentNo) ?? []
        let matchAllInvoiceNos = shInvoiceNos.every(element => cnNos.includes(element)) && cnNos.every(element => shInvoiceNos.includes(element));
        let subject = ""
        let to = ["pooja.bishu@fretron.com"]
        let cc = []
        let flag = false
        let html = ``
        if (matchAllInvoiceNos) {
            let activityRes = await getActivityLog(shId)
            let invoiceTime = activityRes.find(element => element.description.includes("Added Invoice No's"))?.time
            console.log(invoiceTime)
            let departureTime = shMaster?.shipmentStages[0].departureTime
            console.log(departureTime)
            if (invoiceTime && departureTime) {
                html = `
                <html>
                <body>
                <p>Dear sir,</p>
                <p>Please Find Below Details</p>
                <p>shipment No: ${shNo ?? "N/A"}</p>
                <p>InvoiceNos: ${shInvoiceNos ?? "N/A"}</p>
                <p>consignmentNo: ${cnNos ?? "N/A"}</p>         
                </body>
                </html>`;

                if (invoiceTime > departureTime) {
                    // send mail 
                    flag = true
                    subject = "Finalize Fail - Invoice No added After Shipment Departure";

                }
                else if (departureTime > invoiceTime) {
                    // send mail
                    flag = true
                    subject = "Finalize Fail -Invoice Added Before Shipment Departure"
                }
            }
            if (flag) {
                console.log(`Not finalize case ${shNo}`)
                await mailer(subject, to, cc, html)
            }

        }
        else {
            console.log(`Already finalize ${shNo}`)
        }
    }
}
main()