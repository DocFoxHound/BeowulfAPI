const express = require('express');
const router = express.Router();
const reportKill = require('../controllers/reportKillController');

// GET request for retrieving a list of all users
router.get('/', reportKill.getAllKeys);

// POST request for creating a new user
router.post('/', reportKill.createKey);

// PUT request for updating an existing user by ID
router.get('/user', reportKill.getKeyByUserId);

// GET request for retrieving all badges by user ID
router.get('/key', reportKill.getKeyByKey);

// DELETE request for deleting a user by ID
router.delete('/:id', reportKill.deleteKey);

// GET request for retrieving all badges by user ID
router.get('/validatekey', reportKill.validateKey);

module.exports = router;
