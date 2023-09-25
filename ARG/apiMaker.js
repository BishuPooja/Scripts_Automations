const rp = require("request-promise")
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTE1Nzc2MDUsInVzZXJJZCI6ImJvdHVzZXItLTFhODBhYTYzLTM3MmYtNGFhYi1hZTJlLWRlZGFhNmUyNTA5ZiIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTFhODBhYTYzLTM3MmYtNGFhYi1hZTJlLWRlZGFhNmUyNTA5ZiIsIm9yZ0lkIjoiMDcwMDFjYjEtNzBmYy00ZjA0LThhNDUtZmQwNmI5MzZiMmEwIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.-pGrI6Jl_ieK2VyMDH3kM6Ql9qI7gZ8rTPLvK0d2708"

async function processGateInFile() {
    try {
        let url = `http://34.93.148.238:8094/amara-raja/gate-in/sh-sync`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                Authorization: TOKEN
            }
        })
        console.log(`Process Gate In File Res ${JSON.stringify(res)}`)
    } catch (e) {
        console.log(`Error caught in Process Gate In File ${e.message}`)
    }
}

async function processGateOutFile() {
    try {
        let url = `http://34.93.148.238:8094/amara-raja/gate-out/sh-sync`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                Authorization: TOKEN
            }
        })
        console.log(`Process Gate Out File Res ${JSON.stringify(res)}`)

    } catch (e) {
        console.log(`Error caught in Process Gate Out File ${e.message}`)
    }
}

async function processSecondaryFile() {
    try {
        let url = `http://34.93.148.238:8094/amara-raja/secondary/sh-sync`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                Authorization: TOKEN
            }
        })
        console.log(`Process Secondary File Res ${JSON.stringify(res)}`)
    } catch (e) {
        console.log(`Caught Error in Process Secondary File ${e.message}`)
    }
}

async function processInboundFile() {
    try {
        let url = `http://34.93.148.238:8094/amara-raja/inbound/sh-sync`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                Authorization: TOKEN
            }
        })
        console.log(`Process Inbound File res ${JSON.stringify(res)}`)
    } catch (e) {
        console.log(`Caught Error in Process Inbound File ${e.message}`)
    }
}

async function main() {
    try {
        // await processGateInFile()
        // await processGateOutFile()
        // await processSecondaryFile()
        // await processInboundFile()
    } catch (e) {
        console.log(`Caught Error in main ${e.message}`)
    }
}