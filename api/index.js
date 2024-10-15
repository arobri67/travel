require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const errorHandler = require('./src/middleware/errorHandler');
// const { logger, logEvents } = require('./src/middleware/logger');

const indexRouter = require('./src/api/routes/indexRouter');
const corsOptions = require('./src/config/corsOptions');
const connectDB = require('./src/config/db');
const { seedInitialData } = require('./src/api/helpers/seedData');
const PORT = process.env.PORT || 3500;

const app = express();

// app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

connectDB();

seedInitialData();

app.use('/api/v1/', indexRouter);

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to DB!');
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});

mongoose.connection.on('error', (err) => {
    console.log(err);
    // logEvents(
    //     `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    //     'mongoErrLog.log'
    // );
});

module.exports = app;
