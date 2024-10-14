const mongoose = require('mongoose');

const env = require('./env');

const connectDB = async () => {
    try {
        const dbUrl =
            env.PROD === 'true' ? env.MONGO_DB_URL_PROD : env.MONGO_DB_URL;
        await mongoose.connect(dbUrl);
    } catch (err) {
        console.error('Error connecting to server', err);
    }
};
module.exports = connectDB;
