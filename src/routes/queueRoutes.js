const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');

// GET request for retrieving a list of all users
router.get('/', queueController.getAllUsers);

// POST request for creating a new user
router.post('/', queueController.createUser);

// DELETE request for deleting a user by ID
router.delete('/:id', queueController.deleteUser);

module.exports = router;
