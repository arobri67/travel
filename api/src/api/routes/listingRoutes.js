const express = require('express');

const {
    getAllListings,
    getListingById,
} = require('../controllers/listingsController');

const listingRoutes = express.Router();

listingRoutes.get('/', getAllListings);
listingRoutes.get('/:id', getListingById);

module.exports = listingRoutes;
