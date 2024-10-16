const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true, trim: true },
        images: { type: [String], required: true },
        price: { type: Number, required: true },
        maxGuests: { type: Number, required: true },
        locationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Location',
            required: true,
        },
        availability: {
            from: { type: Date, required: true },
            to: { type: Date, required: true },
        },
    },
    { timestamps: true, collection: 'Listing' }
);

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
