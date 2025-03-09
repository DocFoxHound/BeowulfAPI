const express = require('express');
const router = express.Router();
const completedQueueController = require('../controllers/completedQueueController');

// GET request for retrieving a list of all users
router.get('/', completedQueueController.getAllUsers);

// GET request for retrieving a single user by ID
router.get('/:id', completedQueueController.getUserById);

// POST request for creating a new user
router.post('/', completedQueueController.createUser);

// DELETE request for deleting a user by ID
router.delete('/:id', completedQueueController.deleteUser);

// PUT request for updating an existing user by ID
router.put('/:id', completedQueueController.updateUser);

module.exports = router;
