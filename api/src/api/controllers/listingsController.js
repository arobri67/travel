const expressAsyncHandler = require('express-async-handler');

const Listing = require('../models/Listing');

const isAvailable = require('../helpers/checkAvailability');

//@desc Get all users
//@route GET /users
//@access Public
const getAllListings = expressAsyncHandler(async (req, res) => {
    const { guests, search, from, to } = req.query;

    const listings = await Listing.find().populate('locationId', 'name');

    let filteredListings = listings;

    if (from && to) {
        filteredListings = filteredListings.filter((listing) =>
            isAvailable(from, to, listing)
        );
    }

    if (guests) {
        filteredListings = filteredListings.filter(
            (listing) => guests <= listing.maxGuests
        );
    }

    if (search) {
        filteredListings = filteredListings.filter((listing) =>
            listing.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (!listings?.length) {
        return res.status(400).json({ message: 'No listings found' });
    }
    res.json(filteredListings);
});

//@desc Get listing by Id
//@route GET /users
//@access Public

const getListingById = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id).populate('locationId', 'name');

    if (!listing) {
        return res.status(400).json({ message: 'No listing found' });
    }
    res.json(listing);
});

module.exports = { getAllListings, getListingById };
