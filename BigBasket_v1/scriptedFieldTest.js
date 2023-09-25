const record = {}

var _f = function (record) {
    let cf = record?.customFields
    let deviceSubmitDate = getFromCf(cf, "Device Submit Date")
    console.log(deviceSubmitDate, "date")
    if (deviceSubmitDate) {
        let date = new Date(deviceSubmitDate).toLocaleString()
        date = date.split(",")[0]
        console.log(date)
    }
}

_f(record)
function getFromCf(cfs, key) {
    if (cfs == null) {
        return null

    } else {

        let found = cfs.find(_ => _.fieldKey == key)
        return found ? found.value : null
    }
}