const express = require('express');

const loginLimiter = require('../../middleware/loginLimiter');

const {
    login,
    refresh,
    logout,
    getCurrentUser,
} = require('../controllers/authController');

const authRoutes = express.Router();

authRoutes.post('/', loginLimiter, login);
authRoutes.get('/refresh', refresh);
authRoutes.get('/me', getCurrentUser);
authRoutes.post('/logout', logout);

module.exports = authRoutes;
