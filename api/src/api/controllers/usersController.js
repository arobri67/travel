const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Listing = require('../models/Listing');

const { getUserId } = require('../helpers/token');

//@desc Get all users
//@route GET /users
//@access Private
const getAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' });
    }
    res.json(users);
});

//@desc Get user by id
//@route GET /users
//@access Private
const getUserById = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(id).select('-password').lean();

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    res.json(user);
});

//@desc Create new user
//@route POST /users
//@access Private
const createNewUser = expressAsyncHandler(async (req, res) => {
    const { email, password, firstName, lastName, avatarUrl } = req.body;

    //confirm data
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    //check for duplicate
    const duplicate = await User.findOne({ email }).lean();

    if (duplicate) {
        return res.status(409).json({ message: 'Email already exists' });
    }

    //Hash password
    const hashPwd = await bcrypt.hash(password, 10);

    const userObject = {
        email,
        password: hashPwd,
        firstName,
        lastName,
        avatarUrl,
    };

    //Create and store new user
    const user = await User.create(userObject);

    // here no return because if else
    if (user) {
        res.status(201).json({ message: `New user ${email} created` });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
});

//@desc Update a user
//@route PATCH /users
//@access Private
const updateUser = expressAsyncHandler(async (req, res) => {
    const { id, email, password } = req.body;

    //Confirm data
    if (!id || !email) {
        return res
            .status(400)
            .json({ message: 'All fields exept password are required' });
    }

    // Does the user exist to update?
    const user = await User.findById(id);

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    //check for duplicate
    const duplicate = await User.findOne({ email }).lean();
    // Allow update to the original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Email already exists' });
    }

    user.email = email;

    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();

    res.json({ message: `${updatedUser.email} updated` });
});

//@desc Delete a user
//@route DELETE /users
//@access Private
const deleteUser = expressAsyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    await user.deleteOne();

    const reply = `User ${user.email} with ${user._id} deleted`;

    res.json(reply);
});

//@desc Add favorite listings ids to a user
//@route PATCH /users
//@access Private

const addFavoriteListings = expressAsyncHandler(async (req, res) => {
    const { listingId } = req.body;
    const refreshToken = req.cookies['refreshToken'];

    const userId = await getUserId(refreshToken);

    if (!userId || !listingId) {
        return res
            .status(400)
            .json({ message: 'User ID and Listing ID required' });
    }

    const user = await User.findById(userId);

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const listing = await Listing.findById(listingId);

    if (!listing) {
        return res.status(400).json({ message: 'Listing not found' });
    }

    if (user.favoriteListingsIds.includes(listingId)) {
        return res.status(400).json({ message: 'Listing already favorited' });
    }

    user.favoriteListingsIds.push(listingId);
    await user.save();

    const reply = `Favorite listing added to ${user.email}`;

    res.json(reply);
});

//@desc Remove favorite listings ids to a user
//@route PATCH /users
//@access Private

const removeFavoriteListings = expressAsyncHandler(async (req, res) => {
    const { listingId } = req.body;
    const refreshToken = req.cookies['refreshToken'];

    const userId = await getUserId(refreshToken);

    if (!userId || !listingId) {
        return res
            .status(400)
            .json({ message: 'User ID and Listing ID required' });
    }

    const user = await User.findById(userId);

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const listing = await Listing.findById(listingId);

    if (!listing) {
        return res.status(400).json({ message: 'Listing not found' });
    }

    if (!user.favoriteListingsIds.includes(listingId)) {
        return res
            .status(400)
            .json({ message: 'This listing is not in the favorite list' });
    }

    user.favoriteListingsIds.pull(listingId);
    await user.save();

    const reply = `Favorite listing removed`;

    res.json(reply);
});

//@desc get favorite listings ids from a user
//@route GET /users
//@access Private

const getFavoriteListings = expressAsyncHandler(async (req, res) => {
    const refreshToken = req.cookies['refreshToken'];

    const userId = await getUserId(refreshToken);

    if (!userId) {
        return res.status(400).json({ message: 'User ID required' });
    }

    const user = await User.findById(userId);

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    res.json(user.favoriteListingsIds);
});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    addFavoriteListings,
    removeFavoriteListings,
    getFavoriteListings,
    getUserById,
};
