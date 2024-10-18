const express = require('express');

const userRoutes = require('./userRoutes');
const listingRoutes = require('./listingRoutes');
const authRoutes = require('./authRoutes');
const isAuthenticated = require('../../middleware/auth');

const indexRouter = express.Router();
indexRouter.use('/', (req, res) => {
    res.send('travel-api is up and running!');
});
indexRouter.use('/users', isAuthenticated, userRoutes);
indexRouter.use('/listings', isAuthenticated, listingRoutes);
indexRouter.use('/auth', authRoutes);

module.exports = indexRouter;
