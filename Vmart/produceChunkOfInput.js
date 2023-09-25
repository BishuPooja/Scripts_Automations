let data = require("./orderVmart - Sheet1.json")
console.log(data.length)
let limit = Math.floor(data.length/3)
data = data.map( it => it.ExtId)
let res = [data.slice(0,limit), data.slice(limit,2*limit),data.slice(2*limit,data.length)]
console.log(res[0].length+res[1].length+res[2].length)
console.log(JSON.stringify(res))