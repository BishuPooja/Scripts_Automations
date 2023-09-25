const rp = require("request-promise")
const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Nzg4NjAxMDYsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiI4MjM5NDdhMy0wMmMwLTRlNjUtOGY0ZS0yMWRhMzcwZWE2Y2QiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.k01oFuZgGr8xmVU2ly4JeTR4LD6lbcODtbZ94LGKXYQ"



async function getshByshNo(shNo) {
    try {

        let res = await rp({
            url: "https://apis.fretron.com/shipment-view/shipments/v1?filters=%7B%22__version%22%3A2%7D&search=" + shNo,
            method: "get",
            json: true,
            headers: {
                authorization: token
            }
        })
        if (res.length) {
            return res[0]
        }
    }
    catch (e) {
        console.log(`error executing when getting shipment ${e.message}`);
    }

}

async function main() {
    const shNodelayOpen = ["FRETSH000021150", "FRETSH000021243", "FRETSH000021538", "FRETSH000021616", "FRETSH000021633", "FRETSH000021657", "FRETSH000021658", "FRETSH000021659", "FRETSH000021680", "FRETSH000021779", "FRETSH000021830"]
    for (let item of shNodelayOpen) {
        let sh = await getshByshNo(item)
        // console.log(sh.alerts);
        let allALerts = (sh?.alerts?.length) ? sh.alerts : ""
        // console.log(allALerts);
        if (allALerts) {
            for (let value of allALerts) {
                if (value.status == "CLOSED" && value.type == "shipment.potential.delay.notification") {
                    console.log(value);
                    console.log("true");
                }
            }
        }
    }

}

// main()

let cc = ["rahul.bansal@fretron.com", "sagar.maruti@fretron.com", "vivek.kumar@fretron.com", "madnatand.pat@jindalsteel.com", "rahul.chauhan@jindalsteel.com", "sushil.singh@jindalsteel.com", "laxmi.kumari@jindalsteel.com", "akhilesh.chaubey@jindalsteel.com", "saphelpdesk.pat@jindalsteel.com", "cctv.support.pat@jindalsteel.com", "cso.patratu.pat@jindalsteel.com"];

let ccd = [
    "cso.patratu.pat@jindalsteel.com",
    "cctv.support.pat@jindalsteel.com",
    "saphelpdesk.pat@jindalsteel.com",
    "akhilesh.chaubey@jindalsteel.com",

    "laxmi.kumari@jindalsteel.com",
    "sushil.singh@jindalsteel.com",
    "rahul.chauhan@jindalsteel.com"

]