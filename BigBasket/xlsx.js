let _ = require("lodash")
let ordersData = [{
    "branch": "UNKNOWN BRANCH",
    "totalQty": 30,
    "dispatchQty": 30,
    "remQty": 0
}, {
    "branch": "UNKNOWN BRANCH",
    "totalQty": 30,
    "dispatchQty": 0,
    "remQty": 30
}, {
    "branch": "Johnson",
    "totalQty": 50,
    "dispatchQty": 48,
    "remQty": 2
}, {
    "branch": "Random Office",
    "totalQty": 0,
    "dispatchQty": 0,
    "remQty": 0
}, {
    "branch": "Random Office",
    "totalQty": 0,
    "dispatchQty": 0,
    "remQty": 0
}, {
    "branch": "Random Office",
    "totalQty": 5,
    "dispatchQty": 0,
    "remQty": 5
}, {
    "branch": "Britannia Industries Ltd",
    "totalQty": 25,
    "dispatchQty": 25,
    "remQty": 0
}, {
    "branch": "JIndal saw",
    "totalQty": 12,
    "dispatchQty": 12,
    "remQty": 0
}, {
    "branch": "Havells India Ltd (Katkewadi)",
    "totalQty": 25,
    "dispatchQty": 25,
    "remQty": 0
}, {
    "branch": "UNKNOWN BRANCH",
    "totalQty": 8,
    "dispatchQty": 8,
    "remQty": 0
}]
let groupOrders = _.groupBy(ordersData, "branch");
let aggregatedData = _.map(groupOrders, (items, branch) => ({
    'Dispatch Location': branch,
    totalQty: _.sumBy(items, 'totalQty'),
    remQty: _.sumBy(items, 'remQty'),
    dispatchQty: _.sumBy(items, 'dispatchQty'),
}));

console.log(aggregatedData)