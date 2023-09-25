"use strict"

const { createLogger, format, transports } = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file');


var moment = require('moment')
var getDate = () => {
    return moment(Date.now()).format('DD-MM-YY HH:mm:SS')
}

// Create the logger
const logger = createLogger({
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            dirname: './integration_npl/logs',
            filename: 'integration-npl-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxSize: '5m', // Specify the maximum size of each log file
            maxFiles: '3d', // Specify how long to keep log files (e.g., keep logs for 7 days)
            auditFile: ''
        })
    ]
});


var info = function (message) {
    logger.info(getDate() + " : " + message)
}




module.exports = {
    info: info
}