const rp = require("request-promise")
const _ = require("lodash")

const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODYwNTI4NjgsInVzZXJJZCI6ImJvdHVzZXItLTc3ZmI4MGE2LThjNWMtNGE2Zi04MDY4LTI4NWNiYjI3ZmFmNiIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTc3ZmI4MGE2LThjNWMtNGE2Zi04MDY4LTI4NWNiYjI3ZmFmNiIsIm9yZ0lkIjoiM2FlZGE1MjctZWIzZS00MTNiLWFiNzgtY2FlNzdlMTE5N2QwIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.pxWBOTgfue6-I2RVBL_1QcXs8mbYoERnkAqAr3c3JbU";
async function getIssue() {
    try {
        let filter = {
            "issueType.keyword": ["Integration Failure - Gate Out - No relevant shipment found"],
            "tags.keyword": [],
            "status.keyword": ["Open"],
            "escalationLevel.keyword": [],
            "escalationName.keyword": [],
            "escalationPerson.email.keyword": [],
            "userFollowers.email.keyword": {
                "issueType.keyword": ["Integration Failure - Gate Out - No relevant shipment found"],
                "tags.keyword": [],
                "status.keyword": ["Open"],
                "escalationLevel.keyword": [],
                "escalationName.keyword": [],
                "escalationPerson.email.keyword": [],
                "userFollowers.email.keyword": [],
                "assignee.email.keyword": [],
                "reporter.email.keyword": [],
                "resourceType.keyword": [],
                "priority.keyword": []
            }
        }
        let url = `https://apis.fretron.com/shipment-view/issues/issues?filters=${JSON.stringify(filter)}&size=300`
        // console.log(url)
        let res = await rp({
            method: "GET",
            uri: url,
            json: true,
            headers: {
                authorization: token
            }

        });
        if (res && res.length) {
            return res
        } else {
            return null
        }
    } catch (e) {
        console.log(`Catched error in get issue: ${e.message}`)
    }
    return null
}

async function getShipmentByVehicleNo(vehicleNo) {
    try {
        let filter = {
            "shipmentTrackingStatus": ["Enroute For Delivery", "At Pickup Point", "Enroute For Pickup"],
            "__version": 2
        }
        let url = `https://apis.fretron.com/shipment-view/shipments/v1?filters=${(JSON.stringify(filter))}&search=${vehicleNo}`
        console.log(url)
        let res = await rp({
            url: url,
            method: "GET",
            json: true,
            headers: {
                authorization: token
            }
        });
        console.log(res)
        if (res) {
            return res
        } else {
            return null
        }



    } catch (e) {
        console.log(`Catched error in get shipment by vehicleNo: ${e.message}`)
    }
    return null
}

async function updateCfs(issueId, payload) {
    try {
        let url = `https://apis.fretron.com/issue/v1/issue/${issueId}/add/customFields`
        let res = await rp({
            method: "POST",
            url: url,
            body: payload,
            json: true,
            headers: {
                "Authorization": token
            },
        });
        // console.log(res)
        console.log(`cf updated status ${res.status}`)
        if (res.status == 200) {
            // console.log(JSON.stringify(res.data))
        }
        return res
    }
    catch (e) {
        console.log(`error in updating cfs ${e.message}`)
    }
}
async function issueClose(uuid) {
    let res = await rp({
        url: "https://apis.fretron.com/issue/v1/issue/" + uuid + "/status/Resolved",
        json: true,
        headers: {
            Authorization: token
        }
    })
    console.log(`issue close status ${res.status}`)
    return res.status == 200 ? "Issue Closed Successfully!" : res.error
}
function getFromCf(cfs, key) {
    if (cfs == null) {
        return null
    } else {
        let found = cfs.find(_ => _.fieldKey == key)
        if (found) {
            return found
        } else {
            return null
        }
    }
}

async function main() {
    let issuesRes = await getIssue()
    console.log(`Open Isuue --> ${issuesRes?.length ?? "Not found"}`)
    if (issuesRes && issuesRes.length) {
        for (let item of issuesRes) {
            let issueId = item.uuid
            let issueNo = item.issueNo

            let cfs = item.customFields ?? []
            let vehicleNo = getFromCf(cfs, "vehicleNo")?.value
            console.log(`issueNo  ${issueNo} vehicle ${vehicleNo} issueId  ${issueId}`)
            if (vehicleNo) {
                let shipmentRes = await getShipmentByVehicleNo(vehicleNo.trim())
                console.log(`Total sh for vehicle ${vehicleNo} : ${shipmentRes?.length}`)
                let shipmentFound = null
                let shId = null
                if (shipmentRes && shipmentRes.length) {
                    shipmentFound = shipmentRes.find(_ => _.fleetInfo.vehicle?.vehicleRegistrationNumber?.trim() == (vehicleNo).trim())
                    shId = shipmentFound?.uuid
                    console.log(`shipmentFound  ${shipmentFound}`)
                }
                console.log(`issueNo  ${issueNo} vehicle ${vehicleNo} sh ${shipmentFound?.shipmentNumber ?? "Not Found"}`)
                if (shipmentFound && shId) {
                    let payloadToUpdateCf = []
                    payloadToUpdateCf.push({
                        "indexedValue": [],
                        "fieldKey": "shipmentNumber",
                        "multiple": false,
                        "description": "",
                        "remark": "",
                        "required": false,
                        "accessType": null,
                        "input": null,
                        "unit": "",
                        "valueType": "string",
                        "options": [],
                        "fieldType": "text",
                        "value": shipmentFound?.shipmentNumber,
                        "isRemark": false
                    })
                    // payloadToUpdateCf.push({
                    //         "indexedValue": [],
                    //         "fieldKey": "forceResolve",
                    //         "multiple": false,
                    //         "description": "",
                    //         "remark": "",
                    //         "required": false,
                    //         "accessType": null,
                    //         "input": null,
                    //         "unit": "",
                    //         "valueType": "string",
                    //         "options": [],
                    //         "fieldType": "text",
                    //         "value": rejectionValue,
                    //         "isRemark": false
                    //     })
                    await updateCfs(issueId, payloadToUpdateCf)
                    await issueClose(issueId)
                }
                else {
                    console.log(`No shipment Found Enroute for delivery ${vehicleNo}`)
                }
            }
            else {
                console.log(`vehicle no not found in issue cf`)
            }
        }
    }
    else {
        console.log(`Not found Open issues `)
    }

}

try {
    main()
}
catch (e) {
    console.log(`error in main ${e.message}`)
}





