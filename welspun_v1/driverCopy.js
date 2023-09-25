const rp = require('request-promise');
const _ = require('lodash');
const FRT_BASE_URL = "https://apis.fretron.com"

const Wel_Token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTM4MDA4NDIsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiNmY4MGVmZjUtZmFkMS00ZmJmLTk3NmItYjViZmI1OTVkNDU0IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.VvlCLPeA4-DQIguafn3e8tFjzjYG8sUbpcUk8Ljlay0"

const WelDemo_Token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTM4MDQ0NjQsInVzZXJJZCI6ImJvdHVzZXItLTUzZmM5MTk3LWJjODktNGNhZC1iNjhmLTE1YTE4MzE2ZWNmMyIsIm1vYmlsZU51bWJlciI6ImJvdHVzZXItLTUzZmM5MTk3LWJjODktNGNhZC1iNjhmLTE1YTE4MzE2ZWNmMyIsIm9yZ0lkIjoiMGE1MzM0NDUtMWI5OS00MmY5LTliMmYtZDYyMWRlZTUxMjllIiwibmFtZSI6InN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.T-D61Ju9e77XxnLjz5W43NuMYZIPHnbAh_9y0RN3sSQ"

async function getDrivers() {
    try {
        let url = `https://apis.fretron.com/shipment-view/drivers/drivers?limit=100&filters=%7B%22zone%22%3A%5B%5D%2C%22region%22%3A%5B%5D%2C%22branch%22%3A%5B%5D%2C%22dlExpiryTime%22%3Anull%2C%22_notExists%22%3A%5B%5D%2C%22_exists%22%3A%5B%5D%7D&size=150`
        let res = await rp({
            uri: url,
            method: "GET",
            json: true,
            headers: {
                authorization: Wel_Token
            }
        })
        return res?.data?.length ? res.data : null
    } catch (e) {
        console.log(`Caught Error Getting Drivers ${e.message}`)
    }
}

async function createDrivers(payload) {
    try {
        let url = `https://apis.fretron.com/drivers/v1/driver`
        let res = await rp({
            uri: url,
            method: "POST",
            body: payload,
            json: true,
            headers: {
                authorization: WelDemo_Token
            }
        })
        if (res.error) {
            console.log(`Create driver Error ${JSON.stringify(res)}`)
        } else {
            console.log(`create Vehicle Status ${res.status}`)
        }
    } catch (e) {
        console.log(`Caught error While creating Driver ${e.message}`)
    }
}

async function main() {
    try {
        let drivers = await getDrivers()
        console.log(drivers.length)
        for (let driver of drivers) {
            delete driver.updates
            delete driver.orgId
            delete driver.uuid
            delete driver.vehicleId
            delete driver.vehicleRegistrationNumber
            console.log(driver)
            await createDrivers(driver)
            // break
        }
    } catch (e) {
        console.log(`Caught Error In main ${e.message}`)
    }
}

main()