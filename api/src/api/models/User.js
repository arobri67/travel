const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        bio: { type: String },
        avatarUrl: { type: String },
        favoriteListingsIds: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
        ],
    },
    { timestamps: true, collection: 'User' }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
