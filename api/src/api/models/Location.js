const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        country: { type: String, required: true },
    },
    { timestamps: true, collection: 'Location' }
);

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
