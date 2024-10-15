const { createListings, listingsData } = require('../data/listings');
const { locationData, createLocation } = require('../data/location');
const Listing = require('../models/Listing');
const Location = require('../models/Location');

const seedInitialData = async () => {
    try {
        const locationExists = await Location.exists();
        const listingExists = await Listing.exists();

        if (locationExists && listingExists) {
            console.log('Database already seeded');
            return;
        }
        const locations = await createLocation(locationData);
        const listings = await createListings(listingsData);
        console.log('Initial data seeded');
        return { locations, listings };
    } catch (err) {
        console.error('Error seeding initial data', err);
    }
};

module.exports = { seedInitialData };
