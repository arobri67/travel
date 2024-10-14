const express = require('express');
const {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    addFavoriteListings,
    removeFavoriteListings,
    getFavoriteListings,
    getUserById,
} = require('../controllers/usersController');

const userRoutes = express.Router();

userRoutes.get('/', getAllUsers);
userRoutes.post('/', createNewUser);
userRoutes.patch('/', updateUser);
userRoutes.get('/favorites', getFavoriteListings);
userRoutes.patch('/favorites/add', addFavoriteListings);
userRoutes.patch('/favorites/remove', removeFavoriteListings);
userRoutes.delete('/', deleteUser);
userRoutes.get('/:id', getUserById);

module.exports = userRoutes;
