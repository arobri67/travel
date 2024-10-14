const jose = require('jose');
const env = require('../../config/env');

const jwtSecret = new TextEncoder().encode(env.JWT_TOKEN_SECRET);

const verifyToken = async (token, options = undefined) => {
    try {
        const verification = await jose.jwtVerify(token, jwtSecret);
        return options?.returnPayload ? verification.payload : true;
    } catch {
        return false;
    }
};

const generateRefreshToken = async (data) => {
    return await new jose.SignJWT({ data })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('30d')
        .sign(jwtSecret);
};

const generateAccessToken = async (data) => {
    return await new jose.SignJWT({ data })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1m')
        .sign(jwtSecret);
};

const getUserId = async (token) => {
    const payload = await verifyToken(token, { returnPayload: true });
    return payload ? payload.data : null;
};

module.exports = {
    generateRefreshToken,
    generateAccessToken,
    verifyToken,
    getUserId,
};
