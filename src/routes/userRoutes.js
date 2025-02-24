const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET request for retrieving a list of all users
router.get('/', userController.getAllUsers);

// GET request for retrieving a list of all users
router.get('/by-corsair-level', userController.getUsersByCorsairLevel);

// GET request for retrieving a single user by ID
router.get('/:id', userController.getUserById);

// POST request for creating a new user
router.post('/', userController.createUser);

// PUT request for updating an existing user by ID
router.put('/:id', userController.updateUser);

// DELETE request for deleting a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
