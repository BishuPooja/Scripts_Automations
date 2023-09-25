const rp = require('request-promise');
const _ = require('lodash');
const FRT_BASE_URL = "https://apis.fretron.com"

const Wel_Token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTM4MDA4NDIsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNmY4MGVmZjUtZmFkMS00ZmJmLTk3NmItYjViZmI1OTVkNDU0IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.VvlCLPeA4-DQIguafn3e8tFjzjYG8sUbpcUk8Ljlay0"

const WelDemo_Token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTM4MDQ0NjQsInVzZXJJZCI6ImJvdHVzZXItLTUzZmM5MTk3LWJjODktNGNhZC1iNjhmLTE1YTE4MzE2ZWNmMyIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTUzZmM5MTk3LWJjODktNGNhZC1iNjhmLTE1YTE4MzE2ZWNmMyIsIm9yZ0lkIjoiMGE1MzM0NDUtMWI5OS00MmY5LTliMmYtZDYyMWRlZTUxMjllIiwibmFtZSI6InN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.T-D61Ju9e77XxnLjz5W43NuMYZIPHnbAh_9y0RN3sSQ"

async function main() {
    let fleetInfo = await getFleetInfo() // Welspon
    let loadTypes = await getLoadTypes() // Demo
    let drivers = await getDrivers() // Demo
    let branches = await getOffices() // Demo
    let vehicleCFs = [{ "fieldKey": "TagIDs", "definitionId": "6dac8011-7186-4458-9e8c-1154bf76ec96" }, { "fieldKey": "RF IDs", "definitionId": "9f8dbaa3-2bc1-4c77-a366-93b7f557ea99" }]
    console.log(fleetInfo.length);
    for (let fleet of fleetInfo) {
        console.log(`Vehicle Number: ${fleet.vehicle.vehicleRegistrationNumber}`);
        let driver = fleet.driver
        let fleetOwner = fleet.fleetOwner
        let broker = fleet.broker
        let vehicle = fleet.vehicle
        // Set driver info
        if (driver?.name && driver?.uuid) {
            let driverName = driver.name
            driver = drivers.find(d => d.name == driverName)
            if (!driver) {
                console.log(`Driver ${driverName} not found for vehicle: ${vehicle.vehicleRegistrationNumber}`)
                continue
            }

            // Set driver id in vehicle
            vehicle.driverId = driver.uuid
        }
        // Set FleetOwner in object
        if (fleetOwner?.name) {
            let fleetOwnerName = fleetOwner.name
            let fleetOwnerPlaceName = fleetOwner?.places ? fleetOwner?.places[0]?.name : null

            fleetOwner = await getPartnerByName(fleetOwnerName, fleetOwnerPlaceName)
            if (!fleetOwner) {
                console.log(`Fleet Owner ${fleetOwnerName} not found for vehicle: ${vehicle.vehicleRegistrationNumber}`)
                continue
            }
        }
        // Set Broker in object
        if (broker?.name) {
            let brokerName = broker.name
            let brokerPlaceName = broker?.places ? broker?.places[0]?.name : null

            broker = await getPartnerByName(brokerName, brokerPlaceName)
            if (!broker) {
                console.log(`Broker ${brokerName} not found for vehicle: ${vehicle.vehicleRegistrationNumber}`)
                continue
            }
        }
        // Set vehicle load types
        if (vehicle?.vehicleLoadType?.name) {
            let loadTypeName = vehicle.vehicleLoadType.name
            vehicle.vehicleLoadType = loadTypes.find(l => l.name == loadTypeName)
            if (!vehicle.vehicleLoadType) {
                console.log(`Load Type ${loadTypeName} not found for vehicle: ${vehicle.vehicleRegistrationNumber}`)
                continue
            }
        }
        // Set vehicle branch
        if (vehicle?.branch?.name) {
            let branchName = vehicle.branch.name
            vehicle.branch = branches.find(b => b.name == branchName) ?? null
            if (!vehicle.branch) {
                console.log(`Branch name ${branchName} not found for vehicle: ${vehicle.vehicleRegistrationNumber}`)
                continue
            }
        }
        // update definitionId in vehicle CFs
        if (vehicle.customFields?.length > 0) {
            vehicle.customFields.forEach(cf => {
                if (cf.definitionId) {
                    cf.definitionId = vehicleCFs.find(o => o.fieldKey == cf.fieldKey).definitionId
                }
            })
        }
        // Remove unneccessary keys from vehicle and whole object
        vehicle = _.omit(vehicle, ['updates', 'uuid', 'orgId'])
        fleet = _.omit(fleet, ['orgId', 'uuid'])
        fleet.driver = driver
        fleet.fleetOwner = fleetOwner
        fleet.broker = broker
        fleet.vehicle = vehicle
        // console.log(JSON.stringify(fleet));
        // create vehicle
        let vehicleCreated = await createVehicle(fleet)
        if (!vehicleCreated) {
            console.log(`Vehicle: ${vehicle.vehicleRegistrationNumber} NOT CREATED.`)
            continue
        }
        // break
    }
}

async function getOffices() {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/offices/v1/offices/pages`,
            json: true,
            method: "GET",
            headers: {
                Authorization: WelDemo_Token
            }
        });

        if (res?.data?.length) {
            return res.data
        } console.log(`Error getting offices: ${res?.error}`)
    } catch (err) {
        console.log(`Some Error getting offices: ${err.message}`);
    }
}

async function getDrivers() {
    let url = `https://apis.fretron.com/shipment-view/drivers/drivers`
    let options = {
        url: url,
        json: true,
        method: "GET",
        headers: {
            Authorization: WelDemo_Token
        }
    }

    let res = await rp(options);
    let drivers = []
    if (res?.data?.length) {
        drivers = res.data
        var lastDriver = _.last(res.data)
    }

    while (lastDriver && res?.data?.length && lastDriver) {
        let from = [lastDriver.uuid]
        url = `https://apis.fretron.com/shipment-view/drivers/drivers?from=${JSON.stringify(from)}`

        console.log(url);
        options.url = url
        res = await rp(options)

        if (res?.data?.length) {
            drivers = [...drivers, ...res.data]
            lastDriver = _.last(res.data)
        }

    }

    return drivers
}

async function getLoadTypes() {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/order-manager-v2/load-types/v1/load-types/v2`,
            json: true,
            method: "GET",
            headers: {
                Authorization: WelDemo_Token
            }
        });

        if (res?.data?.length) {
            return res.data
        } console.log(`Error getting load types: ${res?.error}`)
    } catch (err) {
        console.log(`Some Error getting load types: ${err.message}`);
    }
}

async function getFleetInfo() {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/shipment-view/partner-fleet/fleets/v2?size=200`,
            json: true,
            method: "GET",
            headers: {
                Authorization: Wel_Token
            }
        });

        if (res?.data?.length) {
            return res.data
        }
        console.log(`Error getting fleetInfo: ${res?.error}`)
    } catch (err) {
        console.log(`Some Error getting fleetInfo: ${err.message}`);
    }
}

async function getPartnerByName(name, placeName) {
    let res = await rp({
        url: `https://apis.fretron.com/shipment-view/bpartners/partners?search=${encodeURIComponent(JSON.stringify(name))}`,
        json: true,
        method: "GET",
        headers: {
            Authorization: WelDemo_Token
        }
    });

    if (placeName) {
        return res.find(p => { return (p.name == name && p?.places.length && p?.places[0]?.name == placeName) })
    } else {
        return res.find(p => { return p.name == name })
    }

}


async function createVehicle(fleet) {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/partner-fleet/v2/fleet/v2`,
            json: true,
            method: "POST",
            body: fleet,
            headers: {
                Authorization: WelDemo_Token
            }
        });

        if (res?.data) {
            return "created"
        } else if (res?.error) {
            console.log(`Error creating Vehicle: ${fleet.vehicle.vehicleRegistrationNumber} : ${res.error}`);
        } else {
            console.log(`Error creating Vehicle: ${fleet.vehicle.vehicleRegistrationNumber} : ${res}`);
        }
    } catch (err) {
        console.log(`Caught Error creating Vehicle: ${fleet.vehicle.vehicleRegistrationNumber} : ${err.message}`);
    }
}


main()

