const z = require('zod');

const envSchema = z.object({
    MONGO_DB_URL: z.string().url(),
    MONGO_DB_URL_PROD: z.string().url(),
    JWT_TOKEN_SECRET: z.string().min(64 * 2),
    PROD: z.string(),
    ALLOWED_ORIGINS1: z.string(),
    ALLOWED_ORIGINS2: z.string(),
    ALLOWED_ORIGINS3: z.string(),
    ALLOWED_ORIGINS4: z.string(),
    ALLOWED_ORIGINS5: z.string(),
});

const env = envSchema.parse({
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    MONGO_DB_URL_PROD: process.env.MONGO_DB_URL_PROD,
    JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
    PROD: process.env.PROD,
    ALLOWED_ORIGINS1: process.env.ALLOWED_ORIGINS1,
    ALLOWED_ORIGINS2: process.env.ALLOWED_ORIGINS2,
    ALLOWED_ORIGINS3: process.env.ALLOWED_ORIGINS3,
    ALLOWED_ORIGINS4: process.env.ALLOWED_ORIGINS4,
    ALLOWED_ORIGINS5: process.env.ALLOWED_ORIGINS5,
});

module.exports = env;
