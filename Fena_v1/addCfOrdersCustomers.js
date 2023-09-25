const rp = require("request-promise")
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODczNTA1NjcsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiIzZTRjZGVlOS0wYjNiLTQ2ZGQtOWI5OC1kZjBlMzhhMDI3MWMiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.0UL0D6cPz6LUA25PtwwLNvEFUPpzSRZZDMcH4ozdC0Q"

async function getOrderByNo(orderNo) {
    try {
        let res = await rp({
            uri: `https://apis.fretron.com/shipment-view/sales/v2/orders?search=${orderNo}`,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })

        return res.find((o) => o.orderNumber == orderNo) ?? null
    }
    catch (e) {
        console.log(`Error exceuting while getting order ${e.message}`)
    }
    return null
}

function getCfObj(fieldKey, value) {
    return {
        "indexedValue": [],
        "fieldKey": fieldKey,
        "multiple": false,
        "description": "",
        "remark": "",
        "uuid": null,
        "required": false,
        "accessType": null,
        "input": "string",
        "unit": "",
        "valueType": "string",
        "options": [],
        "fieldType": "text",
        "value": value,
        "isRemark": false
    }
}

async function main(orders) {
    let cfs = []
    let customerExtIds = []
    for (let orderNo of orders) {
        let orderRes = await getOrderByNo(orderNo)
        let customer = orderRes?.lineItems?.[0]?.consignee?.externalId
        customerExtIds.push(customer)
    }
    orders = orders?.join(",")
    customerExtIds = customerExtIds?.join(",")
    if (customerExtIds) {
        cfs.push(getCfObj("customers", customerExtIds))
    }
    cfs.push(getCfObj("orders", orders))
    console.log(cfs)
    return cfs
}

main(["FRSO0003254", "FRSO0003266", "FRSO0003319"])