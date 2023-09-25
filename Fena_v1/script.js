/**
 * Vendor Bill is created when there will be issue ticket for 
 * that shipment and that issue ticket is accpted only.
 * Author : Karan Mishra
 */

const orgId = "3e4cdee9-0b3b-46dd-9b98-df0e38a0271c"
const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzQxMDg3MTIsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiM2U0Y2RlZTktMGIzYi00NmRkLTliOTgtZGYwZTM4YTAyNzFjIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.Ik4gseD-0J3u0iDMm4kZHFimi9FosQUaaFcZpSHBXfU"
const BASE_URL = `${FRT_PUB_BASE_URL}`

async function ensurePod(cnUuid) {
    try {
        let res = await rp({
            url:
                `${FRT_PUB_BASE_URL}/pod/v1/action/ensure-pod?consignmentId=` +
                cnUuid,
            json: true,
            headers: {
                Authorization: token,
            },
        });
        if (res.status == 200) {
            return res.data
        } else {
            console.log(`EnsurePod api res error : ${res.error}`)
        }
    } catch (e) {
        console.log(`Catched error in ensurePod : ${e.message}`)
    }
    return null
}


async function ensureIfPodFeedingDone(cnIds) {
    try {
        let currptedCnIds = []
        for (let i = 0; i < cnIds.length; i++) {
            let cnId = cnIds[i]
            let pod = await ensurePod(cnId)
            if (pod?.status != "SUBMITTED") {
                // let isCurrptedCase = (pod?.deliveryItems ?? []).filter(item => item?.status == "PENDING")?.length > 0
                // if (isCurrptedCase) { currptedCnIds.push(cnId) }
                currptedCnIds.push(cnId)
            }
        }
        return currptedCnIds
    } catch (e) {
        console.log(`Some error in ensuring if pod feeding done : ${e.message}`)
    }
    return []
}

async function main($event) {
    let bill = $event.body.actionData
    let shIds = []
    if (bill && bill.lineItems.length) {

        bill.lineItems.forEach((lineItem) => {
            if (lineItem.costs && lineItem.costs.length && lineItem.costs[0].shipmentId) {
                shIds.push(lineItem.costs[0].shipmentId)
            }
        })
        if (shIds.length) {
            let shipments = await getShipmentsByIds(shIds)
            let fuLineItemIds = shipments.filter((sh) => sh.freightUnitLineItemId).map((it) => it.freightUnitLineItemId)
            if (fuLineItemIds.length > 0) {
                let issues = await getIssuesByResourceIds(fuLineItemIds)
                if (issues.length > 0) {
                    let anyOpen = issues.filter((issue) => issue.status == 'Open')
                    if (anyOpen.length > 0) {
                        return {
                            "status": 400,
                            "data": null,
                            'updatedKeys': [],
                            "error": "Bill for these type of shipments can only be raised after approval of the tickets"
                        }
                    }

                }
            }
            try {
                let cnIds = (shipments ?? []).reduce((acc, sh) => [...acc, ...((sh?.consignments ?? []).map(cn => cn.uuid))], [])
                let currptCnIds = await ensureIfPodFeedingDone(cnIds)
                let cnIdCnNumMap = (shipments ?? []).reduce((acc, sh) => {
                    sh.consignments?.forEach(cn => { acc[cn.uuid] = cn.consignmentNo })
                    return acc
                }, {})
                let currptedCnNums = currptCnIds.reduce((cnNums, cnId) => [...cnNums, cnIdCnNumMap[cnId]], [])
                console.log(`Currpted CnNums : ${currptedCnNums.join()}`)
                if (currptCnIds.length) {
                    return {
                        "status": 400,
                        "data": null,
                        'updatedKeys': [],
                        "error": `Pod not Submitted for Invoice's : ${currptedCnNums.join()}`
                    }
                }
            } catch (e) {
                console.log(`Catched error in ensuring if pod feeding is done or not : ${e.message}`)
            }
            //Fail prehook if any consignment with invoice status as PAID
            try {
                let paidShCnNums = (shipments ?? []).reduce((acc, sh) => {
                    let consignments = sh.consignments ?? []
                    let paidCns = consignments.filter(cn => (cn.customFields ?? []).find(({ fieldKey }) => fieldKey == "Invoice Status")?.value == "PAID")
                    if (paidCns.length) {
                        return [...acc, `Consigments ${paidCns.map(cn => cn.consignmentNo).join()} of sh ${sh.shipmentNumber}`]
                    } else {
                        return acc
                    }
                }, [])
                if (paidShCnNums.length) {
                    return {
                        "status": 400,
                        "data": null,
                        'updatedKeys': [],
                        "error": `${paidShCnNums.join(", ")} are present with Invoice Status as PAID, so they must not be added in vendor bill`
                    }
                }
            } catch (e) {
                console.log(`Catched error in ensuring PAID Invoice Status on Cn : ${e.message}`)
            }
            //Added By Divyanshi: Bill Creation Date should not be less than invoice date
            let res = await calcBillCreationDate(bill, shipments);
            return res;
        }
    }
    let response = { "status": 200, "data": bill, "updatedKeys": [], "error": null }
    console.log(response)
    return response
}

// Helping functions
async function getShipmentsByIds(resourceIds) {
    try {
        let url = `${BASE_URL}/shipment/v1/admin/shipments/by/uuids?uuids=${resourceIds.join()}&orgId=${orgId}`
        // console.log(url)
        return await rp({
            url: url,
            json: true,
            method: "GET",
        }).then((_) => {
            if (_.status == 200) {
                return _.data
            } else {
                console.log(_.error);
                return null
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

async function getIssuesByResourceIds(resourceIds) {
    try {
        let filters = {
            "resourceId": resourceIds
        }
        let url = `${BASE_URL}/issue/v1/issues?filters=${JSON.stringify(filters)}`;
        // console.log(url);
        return rp({
            method: "GET",
            uri: url,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            json: true,
        }).then((_) => {
            if (_.status == 200) {
                return _.data;
            } else {
                console.log(_.error)
                return [];
            }
        });
    } catch (error) {
        console.log(error.message);
        return []
    }
}

async function getConsignmentById(cnIds) {
    let url = `${BASE_URL}/consignment/v1/consignment/consignments/by_ids?ids=${cnIds}`;
    try {
        let request = {
            method: 'GET',
            uri: url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            json: true
        };
        return rp(request).then((res) => {
            if (res?.status == 200) {
                return { ...res, ...{ "updatedKeys": [] } };
            } else {
                return { ...res, ...{ "updatedKeys": [] } };
            }
        })
    } catch (e) {
        console.log(`Error while fetching consignment list ${e.message}`);
        return { "status": 400, "data": null, "updatedKeys": [], "error": "Error : " + e.message }
    }
}

async function calcBillCreationDate(invoice, shipments) {
    let ids = [];
    let cns = [];
    if (invoice?.billFeedingType === 'PerConsignment') {
        ids = invoice?.lineItems?.map(e => e.costs[0]?.lineItems[0]?.consignmentId)
        let cnIds = ids.join(',')
        let res = await getConsignmentById(cnIds)
        cns = [...cns, ...res?.data];
    } else {
        cns = shipments.filter(sh => sh.consignments?.length).map(ele => ele.consignments).flat();
    }
    if (cns?.length) {
        let isMax = cns.map(cn => cn.consignmentDate).some(cnDate => cnDate > invoice?.billDate);
        console.log(isMax)
        if (isMax) {
            return { "status": 400, "data": null, "updatedKeys": [], "error": "Error : Bill Date cannot be less than invoice date." }
        } else {
            return { "status": 200, "data": invoice, "updatedKeys": [], "error": null }
        }
    } else {
        return { "status": 200, "data": invoice, "updatedKeys": [], "error": null }
    }
}
// return { "status": 400, "data": null, "updatedKeys": [], "error": "Bill creation not allowed" }

let prehookRes = await main($event)
console.log(`Prehook res status : ${prehookRes.status} and error : ${prehookRes.error}`)
return prehookRes