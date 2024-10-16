const env = require('./env');

const allowedOrigins = [env.FRONTEND_URL];

module.exports = allowedOrigins;
