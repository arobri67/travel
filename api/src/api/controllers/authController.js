const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const {
    generateRefreshToken,
    generateAccessToken,
    verifyToken,
} = require('../helpers/token');

//@desc login
//@route POST /auth
//@access Public

const login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'Email and password are required' });
    }
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const refreshToken = await generateRefreshToken(foundUser._id);

    //Create a secure cookie with refresh token with maxage of 1 one week
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true, // only fore test, true for production
        sameSite: 'none', // lax for local development and none for production
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log('Cookie set. Response headers:', res.getHeaders());

    const accessToken = await generateAccessToken(refreshToken);

    //Send access token
    res.json({ accessToken });
});

//@desc refresh
//@route POST /auth/refresh
//@access Public - because access token has expired

const refresh = expressAsyncHandler(async (req, res) => {
    const cookies = req.cookies;
    const refreshToken = cookies.refreshToken;

    // Verifies refresh token and returns payload
    const refreshTokenPayload = refreshToken
        ? await verifyToken(refreshToken, { returnPayload: true })
        : false;

    if (!refreshTokenPayload) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Generate new access token
    const accessToken = await generateAccessToken(refreshToken);

    //Send access token
    res.json({ accessToken });
});

//@desc Get current user
//@route GET /auth/me
//@access Public -

const getCurrentUser = expressAsyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    const accessToken = authHeader?.split(' ')[1];

    // Verifies access token and returns payload
    const accessTokenPayload = await verifyToken(accessToken, {
        returnPayload: true,
    });

    if (!accessTokenPayload) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    // Verifies refresh token and returns payload
    const refreshTokenPayload = await verifyToken(accessTokenPayload.data, {
        returnPayload: true,
    });

    if (!refreshTokenPayload) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    //Send access token
    res.json({ accessToken, user: refreshTokenPayload.data });
});

//@desc Log out user
//@route POST /auth/logout
//@access Public -
const logout = (req, res) => {
    const cookie = req.cookies;

    if (!cookie?.refreshToken) return res.sendStatus(204); // no content
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false, // only fore test, true for production
        sameSite: 'lax', // lax for local development and none for production
    });
    res.json({ message: 'Cookie cleared' });
};

module.exports = { login, refresh, logout, getCurrentUser };
