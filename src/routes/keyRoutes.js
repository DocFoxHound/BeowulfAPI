const express = require('express');
const router = express.Router();
const keyController = require('../controllers/keyController');

// GET request for retrieving a list of all users
router.get(process.env.API_KEY_GET, keyController.getAllKeys); //process.env.API_KEY_ROUTES

// POST request for creating a new user
router.post(process.env.API_KEY_POST, keyController.createKey);

// PUT request for updating an existing user by ID
router.get('/user', keyController.getKeyByUserId);

// GET request for retrieving all badges by user ID
router.get('/key', keyController.getKeyByKey);

// DELETE request for deleting a user by ID
router.delete('/:id', keyController.deleteKey);

// GET request for retrieving all badges by user ID
router.get('/validatekey', keyController.validateKey);

module.exports = router;
