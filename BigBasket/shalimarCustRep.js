const rp = require("request-promise")
const _ = require("lodash")
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTEzOTI4NjMsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiMGJiZGMxMjItZjk2My00NTJmLTlhZjEtMjg3MTVmNWUzNmIyIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.kr8VL5I84_rqNWWq7aHx-c-dLb_pew0Ef9XoWASEDCA"
const FRT_BASE_URL = "https://apis.fretron.com"

async function getShipments(from, till) {
    try {
        console.log("api ", from, till)
        let filters = { "shipmentDate": { "isTillExpression": false, "isFromExpression": false, "from": from, "till": till }, "__version": 2 }
        let url = `${FRT_BASE_URL}/shipment-view/shipments/v1?filters=${encodeURIComponent(JSON.stringify(filters))}&allFields=["consignments","branch","shipmentNumber","shipmentStatus","fleetInfo"]&size=800`
        console.log(JSON.stringify(url))
        let res = await rp({
            uri: url,
            method: 'GET',
            json: true,
            headers: {
                authorization: TOKEN
            }
        })
        return res?.length ? res : []
    } catch (e) {
        console.log(`Error getting Shipment ${e.message}`)
    }
    return []

}

async function getVendorBillByBranch(branch) {
    try {
        let filters = { "billingBranchName": [branch] }
        let url = `${FRT_BASE_URL}/shipment-view/vendor-bill/v1/vendor-bills?filters=${encodeURIComponent(JSON.stringify(filters))}`
        let res = await rp({
            uri: url,
            method: 'GET',
            json: true,
            headers: {
                Authorization: TOKEN
            }
        })
        // console.log(res)
        return res.length ? res : []
    } catch (e) {
        console.log(`Error getting vendor bill by branch ${e.message}`)
    }
    return []
}

function getLastDayEpoch() {
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    let till = new Date(currentDate);
    till.setDate(currentDate.getDate() - 1);
    till = till.setHours(23, 59, 59, 999)
    let startOfLastDay = new Date(currentDate);
    startOfLastDay.setDate(currentDate.getDate() - 1);

    let startTimestamp = startOfLastDay.getTime();
    console.log(startTimestamp, till)

    return {
        from: startTimestamp,
        till: till
    }
}

async function JsonToExcelEmail(jsonArr, emails, subject, content, orgId, html = false) {
    let url = `${FRT_BASE_URL}/shipment-view/shipments/json/email`;
    let payload = {
        data: jsonArr,
        emailInfo: {
            to: emails[0],
            cc: emails.slice(1),
            subject: subject,
            content: content,
        },
        orgId: orgId,
    };
    if (html) {
        payload.emailInfo.html = html
    }
    try {
        let res = await rp({
            method: "POST",
            uri: url,
            body: payload,
            json: true,

        });

        console.log(`Sending Json to Excel email api res status : ${res.status}`);

        if (res.status === 200) {
            console.log(res.data);
            return "Email sent successfully"
        } else {
            console.log(`Sending Json to Excel email api res error : ${res.error}`);
        }

    } catch (e) {
        console.log(`Catched Error in sending json to excel email : ${e.message}`);
    }
    return "Some error in sending email"
}


async function getOrders(from, till) {
    try {
        let filters = { "orderDate": { "from": from, "till": till } }

        let url = `https://apis.fretron.com/shipment-view/sales/v2/orders?limit=1000&filters=${encodeURIComponent(JSON.stringify(filters))}`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: TOKEN
            }
        })
        return res?.length ? res : []


    } catch (e) {
        console.log(`error executing while getting Orders ${e.message}`)
    }
    return []
}

async function generateReport(from, till, isMail) {
    try {
        let shs = await getShipments(from, till)
        let json = []
        let branchesData = []
        console.log(`shipment Length ${shs.length}`)

        for (let sh of shs) {
            let shNo = sh.shipmentNumber
            let branch = sh?.branch?.name ?? ""
            let shipmentStatus = sh?.shipmentStatus
            let podPendingCount = 0
            let podSubmittedCount = 0
            let completedShSubmittedPodCount = 0
            let trackingMode = sh?.fleetInfo?.trackingMode ?? ""
            let lbsNo = sh?.fleetInfo?.lbsNumber
            let completedSh = 0
            // console.log(`TrackingMode ${trackingMode}`)
            let trackingManual = 0
            let trackingVTS_LBS = 0
            if (shipmentStatus == "Completed") {
                completedSh += 1
            }
            if (trackingMode == "VTS-LBS" || (trackingMode == "MANUAL" && lbsNo != null)) {
                trackingVTS_LBS += 1
            } else {
                if (trackingMode == "MANUAL") {
                    trackingManual += 1
                }
            }

            let cns = sh?.consignments
            if (cns?.length) {
                for (let cn of cns) {
                    let podStatus = cn?.pod?.status ?? ""
                    if (podStatus == "PENDING") {
                        podPendingCount += 1
                    }
                    if (podStatus == "SUBMITTED" || podStatus == "RECIEVED") {
                        podSubmittedCount += 1
                    }

                    if (shipmentStatus == "Completed") {
                        if (podStatus == "SUBMITTED" || podStatus == "RECIEVED") {
                            completedShSubmittedPodCount += 1
                        }
                    }
                }
            }

            branchesData.push({
                shNo: shNo,
                branch: branch ? branch : "UNKNOWN BRANCH",
                podPendingCount: podPendingCount,
                podSubmittedCount: podSubmittedCount,
                trackingManual: trackingManual,
                trackingVTS_LBS: trackingVTS_LBS,
                completedShSubmittedPodCount: completedShSubmittedPodCount,
                completedSh: completedSh
            })

        }

        let result = [];
        let branchCount = {};

        branchesData.forEach(item => {
            let branch = item.branch;
            if (!branchCount[branch]) {
                branchCount[branch] = 1;
            } else {
                branchCount[branch] += 1;
            }
        });

        for (let branch in branchCount) {
            let obj = {
                branch: branch,
                count: branchCount[branch],
                podPendingCount: 0,
                trackingManualCount: 0,
                trackingVTS_LBS_Count: 0,
                completedSh: 0,
                podSubmittedCount: 0,
                completedShSubmittedPodCount: 0
            };
            branchesData.forEach(item => {
                if (item.branch === branch) {
                    obj.podPendingCount += item.podPendingCount;
                    obj.trackingManualCount += item.trackingManual;
                    obj.trackingVTS_LBS_Count += item.trackingVTS_LBS;
                    obj.completedSh += item.completedSh;
                    obj.podSubmittedCount += item.podSubmittedCount
                    obj.completedShSubmittedPodCount += item.completedShSubmittedPodCount
                }
            });
            result.push(obj);
        }

        for (let item of result) {
            let branchName = item.branch
            let branchCount = item.count
            let podPendingCount = item.podPendingCount
            let trackingManualCount = item.trackingManualCount
            let trackingVTS_LBS_Count = item.trackingVTS_LBS_Count
            let podSubmittedCount = item.podSubmittedCount
            let completedSh = item.completedSh
            let completedShSubmittedPodCount = item.completedShSubmittedPodCount
            let notBilled = 0

            let vendorBills = await getVendorBillByBranch(branchName)
            let totalInvoiceCreated = vendorBills?.length ?? ""
            let pendingInvoices = 0
            let billedInvoices = 0
            let paidInvoices = 0
            if (totalInvoiceCreated) {
                vendorBills.map((v) => {
                    if (v.billingStatus === "PENDING" || v.billingStatus === "APPROVAL_PENDING") {
                        pendingInvoices += 1
                        return true
                    }
                }
                )

                vendorBills.map((v) => {
                    if (v.billingStatus === "BILLED") {
                        billedInvoices += 1
                    }
                })

                vendorBills.map((v) => {
                    if (v.billingStatus === "PAID" || v.billingStatus === "PARTIAL_PAID") {
                        paidInvoices += 1
                    }
                })

            }
            if (completedShSubmittedPodCount && !totalInvoiceCreated) {
                notBilled += 1
            }
            let jsonObj = {
                "Dispatch Location": branchName,
                "Vehicle Placement Count": branchCount,
                "Manual Tracking Count": trackingManualCount,
                "SIM Tracking Count": trackingVTS_LBS_Count,
                "Pending POD": podPendingCount,
                "POD submitted": podSubmittedCount,
                "Shipment Delivered": completedSh,
                "Invoice Created": totalInvoiceCreated,
                "Pending invoice": pendingInvoices,
                "Invoices Approved": billedInvoices,
                "Invoices Paid/Partial Paid": paidInvoices,
                "Delivered but Not Billed Invoice": notBilled
            }
            json.push(jsonObj)
        }
        if (isMail) {
            let orgId = "0bbdc122-f963-452f-9af1-28715f5e36b2"
            let subject = "Daily Invoice Creation vs Placement "
            let content = `Dear Sir
            Please Find Below Details`
            await JsonToExcelEmail(json, ["pooja.bishu@fretron.com"], subject, content, orgId)
        }
        console.log(json)
        return json
    } catch (e) {
        console.log(`Error Main: ${e.message}`)
    }
}

async function main(from, till, ismail) {
    await generateReport(from, till, ismail)
}


// try {
//     let event = {
//         query: {
//             from: "1675056600000",
//             till: "1690695000000"
//         }
//     }
//     let from = event.query.from
//     let till = event.query.till
//     if (from && till) {
//         console.log(`custom Report Api Call`)
//         main(from, till, false)
//     }
//     else {
//         let lastDayEpoch = getLastDayEpoch()
//         let fromLastDay = lastDayEpoch.from
//         let tillLastDay = lastDayEpoch.till
//         console.log(fromLastDay, tillLastDay)
//         console.log(`Mail send Api Call`)
//         main(fromLastDay, tillLastDay, true)
//     }
// } catch (e) {
//     console.log(`Main catching ${e.message}`)
// }


async function test() {
    let from = 1690889100000
    let till = 1690975500000
    let orders = await getOrders(from, till)
    console.log("Total Orders ", orders?.length)
    let ordersData = []
    for (let order of orders) {
        console.log(order?.orderNumber)
        let totalQty = 0
        let remQty = 0
        let totalPackages = 0
        let remPackages = 0
        order.lineItems.map((v) => {
            totalQty += v?.loadInfo?.standardMeasurement?.weight?.netQuantity ?? 0
            remQty += v?.remainingPlannedQuantity?.weight?.netQuantity ?? 0
            totalPackages += v?.loadInfo?.standardMeasurement?.packageMeasurement?.netQuantity ?? 0
            remPackages += v?.remainingPlannedQuantity?.packageMeasurement?.netQuantity ?? 0
        })
        let dispatchQty = totalQty - remQty
        let dispacthPackages = totalPackages - remPackages
        let branch = order?.consignmentBranch?.name ?? "UNKNOWN BRANCH"
        console.log(branch)

        ordersData.push({
            "count": 1,
            "branch": branch,
            "Invoice Creation (KG)": totalQty,
            "Dispacth Quantity (KG)": dispatchQty,
            "Pending Quantity (KG)": remQty,
            "Invoice Creation (UNITS)": totalPackages,
            "Dispacth Quantity (UNITS)": dispacthPackages,
            "Pending Quantity (UNITS)": remPackages,

        })
    }
    console.log(JSON.stringify(ordersData))
    let groupOrders = _.groupBy(ordersData, "branch");
    let orderDataByBranch = _.map(groupOrders, (items, branch) => ({
        'Dispatch Location': branch,
        "Invoice Creation Count": _.sumBy(items, "count"),
        "Invoice Creation (KG)": _.sumBy(items, 'Invoice Creation (KG)'),
        "Pending Quantity (KG)": _.sumBy(items, 'Pending Quantity (KG)'),
        "Dispacth Quantity (KG)": _.sumBy(items, 'Dispacth Quantity (KG)'),
        "Invoice Creation (UNITS)": _.sumBy(items, "Invoice Creation (UNITS)"),
        "Dispacth Quantity (UNITS)": _.sumBy(items, "Dispacth Quantity (UNITS)"),
        "Pending Quantity (UNITS)": _.sumBy(items, "Pending Quantity (UNITS)")
    }));


    let shs = await getShipments(from, till)
    let json = []
    let branchesData = []
    console.log(`Total Shipments ${shs.length}`)

    for (let sh of shs) {
        let shNo = sh.shipmentNumber
        let branch = sh?.branch?.name ?? ""
        let shipmentStatus = sh?.shipmentStatus
        let podPendingCount = 0
        let podSubmittedCount = 0
        let completedShSubmittedPodCount = 0
        let trackingMode = sh?.fleetInfo?.trackingMode ?? ""
        let lbsNo = sh?.fleetInfo?.lbsNumber
        let completedSh = 0
        // console.log(`TrackingMode ${trackingMode}`)
        let trackingManual = 0
        let trackingVTS_LBS = 0
        if (shipmentStatus == "Completed") {
            completedSh += 1
        }
        if (trackingMode == "VTS-LBS" || (trackingMode == "MANUAL" && lbsNo != null)) {
            trackingVTS_LBS += 1
        } else {
            if (trackingMode == "MANUAL") {
                trackingManual += 1
            }
        }

        let cns = sh?.consignments
        if (cns?.length) {
            for (let cn of cns) {
                let podStatus = cn?.pod?.status ?? ""
                if (podStatus == "PENDING") {
                    podPendingCount += 1
                }
                if (podStatus == "SUBMITTED" || podStatus == "RECIEVED") {
                    podSubmittedCount += 1
                }

                if (shipmentStatus == "Completed") {
                    if (podStatus == "SUBMITTED" || podStatus == "RECIEVED") {
                        completedShSubmittedPodCount += 1
                    }
                }
            }
        }

        branchesData.push({
            shNo: shNo,
            branch: branch ? branch : "UNKNOWN BRANCH",
            podPendingCount: podPendingCount,
            podSubmittedCount: podSubmittedCount,
            trackingManual: trackingManual,
            trackingVTS_LBS: trackingVTS_LBS,
            completedShSubmittedPodCount: completedShSubmittedPodCount,
            completedSh: completedSh
        })

    }

    let result = [];
    let branchCount = {};

    branchesData.forEach(item => {
        let branch = item.branch;
        if (!branchCount[branch]) {
            branchCount[branch] = 1;
        } else {
            branchCount[branch] += 1;
        }
    });

    for (let branch in branchCount) {
        let obj = {
            branch: branch,
            count: branchCount[branch],
            podPendingCount: 0,
            trackingManualCount: 0,
            trackingVTS_LBS_Count: 0,
            completedSh: 0,
            podSubmittedCount: 0,
            completedShSubmittedPodCount: 0
        };
        branchesData.forEach(item => {
            if (item.branch === branch) {
                obj.podPendingCount += item.podPendingCount;
                obj.trackingManualCount += item.trackingManual;
                obj.trackingVTS_LBS_Count += item.trackingVTS_LBS;
                obj.completedSh += item.completedSh;
                obj.podSubmittedCount += item.podSubmittedCount
                obj.completedShSubmittedPodCount += item.completedShSubmittedPodCount
            }
        });
        result.push(obj);
    }

    for (let item of result) {
        let branchName = item.branch
        let branchCount = item.count
        let podPendingCount = item.podPendingCount
        let trackingManualCount = item.trackingManualCount
        let trackingVTS_LBS_Count = item.trackingVTS_LBS_Count
        let podSubmittedCount = item.podSubmittedCount
        let completedSh = item.completedSh
        let completedShSubmittedPodCount = item.completedShSubmittedPodCount
        let notBilled = 0

        let vendorBills = await getVendorBillByBranch(branchName)
        let totalInvoiceCreated = vendorBills?.length ?? ""
        let pendingInvoices = 0
        let billedInvoices = 0
        let paidInvoices = 0
        if (totalInvoiceCreated) {
            vendorBills.map((v) => {
                if (v.billingStatus === "PENDING" || v.billingStatus === "APPROVAL_PENDING") {
                    pendingInvoices += 1
                    return true
                }
            }
            )

            vendorBills.map((v) => {
                if (v.billingStatus === "BILLED") {
                    billedInvoices += 1
                }
            })

            vendorBills.map((v) => {
                if (v.billingStatus === "PAID" || v.billingStatus === "PARTIAL_PAID") {
                    paidInvoices += 1
                }
            })

        }
        if (completedShSubmittedPodCount && !totalInvoiceCreated) {
            notBilled += 1
        }
        let jsonObj = {
            "Dispatch Location": branchName,
            "Vehicle Placement Count": branchCount,
            "Manual Tracking Count": trackingManualCount,
            "SIM Tracking Count": trackingVTS_LBS_Count,
            "Pending POD": podPendingCount,
            "POD submitted": podSubmittedCount,
            "Shipment Delivered": completedSh,
            "vendor Bill Created": totalInvoiceCreated,
            "Pending vendor Bills": pendingInvoices,
            "vendor Bills Approved": billedInvoices,
            "vendor Bill Paid/Partial Paid": paidInvoices,
            "Delivered but Not Billed vendor Bill": notBilled
        }
        json.push(jsonObj)
    }



    let finalData = _.map(orderDataByBranch, item => {
        const matchingItem = _.find(json, { 'Dispatch Location': item['Dispatch Location'] });
        if (matchingItem) {
            return {
                ...item,
                ...matchingItem,
            };
        }
        else {
            return {
                ...item,
                "Vehicle Placement Count": 0,
                "Manual Tracking Count": 0,
                "SIM Tracking Count": 0,
                "Pending POD": 0,
                "POD submitted": 0,
                "Shipment Delivered": 0,
                "Invoice Created": 0,
                "Pending invoice": 0,
                "Invoices Approved": 0,
                "Invoices Paid/Partial Paid": 0,
                "Delivered but Not Billed Invoice": 0
            }
        }
    });

    console.log(finalData)

}
test()

