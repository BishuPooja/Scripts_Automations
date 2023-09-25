const rp = require("request-promise")
const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODU2MDQ3MTksInVzZXJJZCI6ImM2YjBkYTA5LTk1NTItNDgzZC1iZGFhLTdlZDdjMDIwODdhMCIsImVtYWlsIjoidmlrcmFtLmJhZGVzYXJhQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTQ5OTQyNDMwNCIsIm9yZ0lkIjoiM2U0Y2RlZTktMGIzYi00NmRkLTliOTgtZGYwZTM4YTAyNzFjIiwibmFtZSI6IlZpa3JhbSBCYWRlc2FyYSIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.O0NvAYXrq9dsa6WA79st9y-Ed-KNsceu4WK_Hma-Ev8"

async function getShbyshNo(shNo) {
    let res = await rp({
        url: `https://apis.fretron.com/shipment-view/shipments/v1?filters=%7B%7D&search=${shNo}`,
        method: 'GET',
        json: true,
        headers: {
            authorization: token
        }
    })

    return res
}

async function getOrderIdByFreighId(freightId) {
    try {
        let res = await rp({
            url: `http://apis.fretron.com/order-manager-v2/freight-units/v1/freight-units/by/linItemIds`,
            method: 'POST',
            body: [freightId],
            json: true,
            headers: {
                authorization: token
            }
        })
        if (res.status == 200) {

            return res.data
        }
        else {
            return null
        }
    } catch (e) {
        console.log(`error getting order id ${e.message}`)
    }

}

async function getOrderById(ORDER_ID) {
    let res = await rp({
        url: `https://apis.fretron.com/order-manager-v2/sales-orders/v1/order/${ORDER_ID}`,
        method: 'GET',
        json: true,
        headers: {
            authorization: token
        }
    })
    if (res.status == 200) {

        return res.data
    } else {
        return null
    }
}

async function cfUpdateVRdate(payload) {
    try {
        let res = await rp({
            url: "https://apis.fretron.com/shipment/v1/shipment/bulk/sync",
            method: "POST",
            json: true,
            body: payload,
            headers: {
                authorization: token
            }

        })
        if (res.status == 200) {
            return res.status
        }
        else {
            return res.error
        }
    } catch (e) {
        console.log(`error executing while updating VR date ${e.message}`)
    }

}


async function main() {
    let shNos = ["FRETSH000062391", "FRETSH000062008", "FRETSH000062001"]
    for (let shNo of shNos) {
        let shRes = await getShbyshNo(shNo)
        let shId = shRes[0].uuid
        // console.log(shRes)
        let freightId = shRes[0].freightUnitLineItemId
        console.log(freightId)
        let freightRes = await getOrderIdByFreighId(freightId)
        console.log(freightRes[0].lineItems[0].salesOrderMappings[0].orderId)
        let orderId = freightRes[0].lineItems[0].salesOrderMappings[0].orderId
        console.log(`orderId  ${orderId}`)
        let orderRes = await getOrderById(orderId)
        let vrNo = orderRes.orderNumber
        let vrDate = orderRes.orderDate
        console.log(vrNo, vrDate)
        if (vrNo && vrDate) {
            let payload = {
                shipmentId: shId,
                updates: [
                    {
                        keyToUpdate: "customfields",
                        updatedValue: [
                            {
                                accessType: null,
                                fieldType: "date",
                                fieldKey: "VR Date",
                                value: vrDate,
                                multiple: false,
                                unit: "",
                                isRemark: false,
                                remark: "",
                                required: false,
                                description: "",
                                options: [],
                                indexedValue: [],
                                valueType: "string",
                                input: "date",
                            },
                            {
                                indexedValue: [""],
                                fieldKey: "VR Number",
                                multiple: false,
                                description: "",
                                remark: "",
                                uuid: null,
                                required: false,
                                accessType: null,
                                input: "text",
                                unit: "",
                                valueType: "string",
                                options: [],
                                fieldType: "text",
                                value: vrNo,
                                isRemark: false,
                            },
                        ],
                    },
                ],
            };

            console.log(payload)

            let updatedCfRes = await cfUpdateVRdate(payload)
            console.log(updatedCfRes)
        }

    }
}

// main()
async function test() {
    let id = "d59b3e6e-db0e-4e23-b05c-7df76545a42f"
    let freightRes = await getOrderIdByFreighId(id)
    console.log(freightRes[0].lineItems[0].salesOrderMappings[0].orderId)
    let orderId = freightRes[0].lineItems[0].salesOrderMappings[0].orderId
    let orderRes = await getOrderById(orderId)
    let vrNo = orderRes.orderNumber
    let vrDate = orderRes.orderDate
    console.log(`orderId  ${orderId}`, vrNo, vrDate)
}
test()