const { logEvents } = require('./logger');

const errorHandler = (err, req, res) => {
    logEvents(
        `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
        'errLog.log'
    );
    console.log(err.stack);

    const status = res.statusCode ? res.statusCode : 500; // server error

    res.status(status);
    //isError: true is for frontend to know that it is an error (for react-querry to handle error properly)
    res.json({ message: err.message, isError: true });
};

module.exports = errorHandler;
