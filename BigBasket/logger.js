"use strict";
const { createLogger, format, transports } = require("winston");
const date = new Date().toLocaleString();
var context = require("./middlewares/req.context.middleware");

var clsNameSpace = context.clsNamespace;

var logger = createLogger({
    transports: [
        new transports.Console(),
        //new transports.File({ filename: 'combined.log' })
    ],
});

var info = function (message) {
    var id = clsNameSpace.get("traceID");
    id = id ? id : "-";
    logger.info(date + " TRACE ID : " + id + " " + message);
    let stack = clsNameSpace.get("errorStack");
    if (stack) {
        stack.push(message);
    }
};

var error = function (errorMessage) {
    var id = clsNameSpace.get("traceID");
    id = id ? id : "-";
    logger.error(date + " TRACE ID : " + id + " " + errorMessage);
    let stack = clsNameSpace.get("errorStack");
    if (stack) {
        stack.push(errorMessage);
    }
};

module.exports = {
    info: info,
    error: error,
};

module.exports = logger;
