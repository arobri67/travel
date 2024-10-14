const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss'); //date can be formated in any way
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(
            path.join(__dirname, '..', 'logs', logFileName),
            logItem
        );
    } catch (err) {
        console.log(err);
    }
};
//we can retrict to some specifc req
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
    console.log(`${req.method} ${req.path}`);
    next();
};

module.exports = { logEvents, logger };
