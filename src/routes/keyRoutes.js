const express = require('express');
const router = express.Router();
const keyController = require('../controllers/keyController');

// GET request for retrieving a list of all users
router.get('/', keyController.getAllKeys);

// POST request for creating a new user
router.post('/', keyController.createKey);

// PUT request for updating an existing user by ID
router.get('/user', keyController.getKeyByUserId);

// GET request for retrieving all badges by user ID
router.get('/key', keyController.getKeyByKey);

// DELETE request for deleting a user by ID
router.delete('/:id', keyController.deleteKey);

// GET request for retrieving all badges by user ID
router.get('/validate', keyController.validateKey);

module.exports = router;
