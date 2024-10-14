const Location = require('../models/Location');

const createLocation = async (data) => {
    try {
        const locations = await Location.create(data);
        console.log('Initial Locations collection created');
        return locations;
    } catch (err) {
        console.error('Error creating initial Locations collection', err);
    }
};

const locationData = [
    {
        name: 'London',
        country: 'United Kingdom',
    },
    {
        name: 'Paris',
        country: 'France',
    },
];

module.exports = { createLocation, locationData };
