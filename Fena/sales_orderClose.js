const rp = require("request-promise")

const fs = require("fs")
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODczNTA1NjcsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiIzZTRjZGVlOS0wYjNiLTQ2ZGQtOWI5OC1kZjBlMzhhMDI3MWMiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.0UL0D6cPz6LUA25PtwwLNvEFUPpzSRZZDMcH4ozdC0Q"

const sheetData = JSON.parse(fs.readFileSync("Sheet_orderData.txt", "utf8"))
console.log(sheetData.length)
async function getOrders(offset) {
    try {

        let filters = { "status": ["OPEN"], "orderType": ["Order", "MTROrder", "MarketOrder"] }
        let url = `https://apis.fretron.com/shipment-view/sales/v2/orders?limit=1000&filters=${encodeURIComponent(JSON.stringify(filters))}`
        console.log(JSON.stringify(url))
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })

        return res?.length ? res : []
    }
    catch (e) {
        console.log(`Error exceuting while getting order ${e.message}`)
    }
    return null
}

async function main() {
    try {
        let offset = []
        let orders = await getOrders()
        console.log(orders?.length)

        for (let order of orders) {

        }
    } catch (e) {
        console.log(`Error in main ${e.message}`)
    }
}

main()