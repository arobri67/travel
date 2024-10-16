const env = require('./env');

const allowedOrigins = [
    env.ALLOWED_ORIGINS1,
    env.ALLOWED_ORIGINS2,
    env.ALLOWED_ORIGINS3,
    env.ALLOWED_ORIGINS4,
    'http://localhost:5173',
];

module.exports = allowedOrigins;
