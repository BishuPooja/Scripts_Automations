const rp = require("request-promise")
const _ = require("lodash")

const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTE1Nzc2MDUsInVzZXJJZCI6ImJvdHVzZXItLTFhODBhYTYzLTM3MmYtNGFhYi1hZTJlLWRlZGFhNmUyNTA5ZiIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTFhODBhYTYzLTM3MmYtNGFhYi1hZTJlLWRlZGFhNmUyNTA5ZiIsIm9yZ0lkIjoiMDcwMDFjYjEtNzBmYy00ZjA0LThhNDUtZmQwNmI5MzZiMmEwIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.-pGrI6Jl_ieK2VyMDH3kM6Ql9qI7gZ8rTPLvK0d2708"

async function OnEnrouteForDelivery(sh) {
    try {
        console.log(`Api Call On Enroute For Delivery For ${sh?.shipmentNumber}`)
        let url = `http://34.93.148.238:8094/amara-raja/on-efd/sh-sync`
        let res = await rp({
            uri: url,
            method: "POST",
            json: true,
            body: {
                "shipment": sh
            },
            headers: {
                Auhtorization: TOKEN
            }
        })
        if (res?.status == 200) {
            console.log(`EFD Api Status ${sh?.shipmentNumber}`)
        } else {
            console.log(`EFD Api Error ${JSON.stringify(res)}`)
        }
    } catch (e) {
        console.log(`Caught Error OnEnrouteForDelivery ${e.message}`)
    }
}


async function atDestination(sh) {
    try {
        console.log(`Api Call for At Destination For ${sh?.shipmentNumber}`)
        let url = `http://34.93.148.238:8094/amara-raja/at-destination/sh-sync`
        let res = await rp({
            uri: url,
            method: "POST",
            json: true,
            body: {
                "shipment": sh
            },
            headers: {
                Auhtorization: TOKEN
            }
        })

        if (res?.status == 200) {
            console.log(`At Destination Api Status ${sh?.shipmentNumber}`)
        } else {
            console.log(`At Destination Api Error ${JSON.stringify(res)}`)
        }
    } catch (e) {
        console.log(`Caught Error atDestination ${e.message}`)
    }
}

async function main(sh) {
    try {
        let shNo = sh.shipmentNumber
        console.log(`Stage Status Updated For ${shNo}`)
        let shStages = sh?.shipmentStages
        let deliveryStages = []
        shStages.map((stage) => {
            if (stage?.tripPoint?.purpose == "Delivery") {
                deliveryStages.push(stage)
            }
        })
        let firstDeliveryStage = _.first(deliveryStages)
        if (firstDeliveryStage.status == "UPCOMING") {
            console.log(`First Delivery Stage status ${firstDeliveryStage.status}`)
            // call Enrout for delivery Api
            // await OnEnrouteForDelivery(sh)
        }
        if (deliveryStages?.find((stage) => stage?.status == "AT")) {
            // call At Destination Api
            // await atDestination(sh)
            console.log(`Vehicle Reached At Destiantion`)
        }
    } catch (e) {
        console.log(`Main Caught Error ${e.message}`)
    }
}


try {
    main($event)
} catch (e) {
    console.log(`error ${e.message}`)
}
