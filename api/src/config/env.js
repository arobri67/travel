const z = require('zod');

const envSchema = z.object({
    MONGO_DB_URL: z.string().url(),
    MONGO_DB_URL_PROD: z.string().url(),
    JWT_TOKEN_SECRET: z.string().min(64 * 2),
    PROD: z.string(),
    FRONTEND_URL: z.string(),
});

const env = envSchema.parse({
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    MONGO_DB_URL_PROD: process.env.MONGO_DB_URL_PROD,
    JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
    PROD: process.env.PROD,
    FRONTEND_URL: process.env.FRONTEND_URL,
});

module.exports = env;
