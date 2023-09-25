async function saveData(payload) {
    try {
        let res = await rp({
            url: `http://122.180.251.100:3002/integration-exide/v1/integration-data`,
            method: "POST",
            json: true,
            body: payload
        })
        return res
    }
    catch (e) {
        console.log(`Error saving intergration data ${e.message}`)
    }

}

async function Inbound_GateIn() {
    try {
        let primaryKey = $event.body.length ? $event.body[0]?.mblnr : ""
        if (primaryKey) {
            let payload = {
                "eventType": "Inbound_GateIn",
                "orgId": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
                "primaryKey": primaryKey,
                "inputData": [
                    $event.body
                ],
                "outputData": []
            }
            let savedDataRes = await intergrationDataSave(payload)
            console.log(savedDataRes)
        }
        else {
            console.log(`primary key not found`)
        }
    }
    catch (e) {
        console.log(`error in main ${e.message}`)
    }
}

async function saveIntegrationData() {
    try {
        let primaryKey = $event.body.length ? $event.body[0]?.mblnr : ""
        if (primaryKey) {
            let payload = {
                "eventType": "Inbound_Unloading",
                "orgId": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
                "primaryKey": primaryKey,
                "inputData": $event.body,
            }
            await intergrationDataSave(payload)
        }
        else {
            console.log(`primary key not found`)
        }

    }
    catch (e) {
        console.log(`error in main ${e.message}`)
    }
}

async function saveIntegrationData() {
    try {
        let invoiceNo = $event.body.length ? $event.body[0].invoiceno : null
        if (invoiceNo) {

        }
        else {
            console.log(`invoice no not found`)
        }
        let payloadSaveInput = {
            "eventType": "Outbound",
            "orgId": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
            "primaryKey": invoiceNo,
            "inputData": $event.body,
        }
        console.log(savedDataInputRes)
        let savedDataInputRes = await intergrationDataSave(payloadSaveInput)

        let payloadSaveOutput = {
            "eventType": "Outbound",
            "orgId": "472b3c51-d8e9-4294-8a7f-a69093b505b7",
            "primaryKey": invoiceNo,
            "inputData": [],
            "outputData": savedDataInputRes

        }
        let savedDataOutputRes = await intergrationDataSave(payloadSaveOutput)
        console.log(savedDataOutputRes)

    }
    catch (e) {
        console.log(`error in main ${e.message}`)
    }
}