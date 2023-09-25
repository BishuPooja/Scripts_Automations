const brachMails = {
    "SURAJPUR": ["shekharkumar@fena.com", "rksharma@fena.com"],
    "ROORKEE": ["purusharthsharma@fena.com", "sandeeppal@fena.com"],
    "Howrah": ["sulalitchatterjee@fena.com", "santukoley@fena.com"],
    "SILVASSA": ["srpatil@fena.com", "sanjaybadola@fena.com"],
    "HEAD OFFICE": ["akbhargava@fena.com", "varunsharma@fena.com"],
    "PONDICHERRY": ["oumapadyc@fena.com", "ssuresh@fena.com"],
    "GUWAHATI": ["ashokdas@fena.com", "dhirajsarma@fena.com"]
}

function getFromTill() {
    try {
        let from = null
        let till = null
        let currentDate = Date.now()
        let currentMonth = new Date(currentDate).getMonth()
        let currentyear = new Date(currentDate).getFullYear()
        let lastDay = currentDate - 8.64e+7
        let lastDayMonth = new Date(lastDay).getMonth()
        let lastDayYear = new Date(lastDay).getFullYear()
        if (currentMonth == lastDayMonth && lastDayYear == currentyear) {
            from = new Date(currentyear, currentMonth, 1).valueOf()
            till = new Date(lastDay).setHours(23, 59)
        } else {
            from = new Date(lastDayYear, lastDayMonth, 1).valueOf()
            till = new Date(lastDayYear, lastDayMonth + 1, 0).valueOf()
            till = new Date(till).setHours(23, 59)
        }
        return { from: from, till: till }
    }
    catch (e) {
        console.log(`Caught Error Getting From Till ${e.message}`)
    }
}

async function sendBranchData(payload) {
    try {
        let url = ``
        let res = await rp({
            uri: url,
            method: "POST",
            json: true,
            body: payload,
            headers: {
                authorization: TOKEN
            }
        })
        console.log(`Res ${JSON.stringify(res)}`)
    } catch (e) {
        console.log(`Caught Error ${e.message}`)
    }
}

async function main() {
    try {
        let from = getFromTill().from
        let till = getFromTill().till
        let payload = {}
        payload = {
            branchWiseMails: brachMails,
            from: from,
            till: till
        }
        console.log(payload)
        // await sendBranchData(payload)
    } catch (e) {
        console.log(`Caught Error In Main ${e.message}`)
    }

}
main()