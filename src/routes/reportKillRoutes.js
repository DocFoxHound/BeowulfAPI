const express = require('express');
const router = express.Router();
const reportKill = require('../controllers/reportKillController');

// GET request for retrieving a list of all users
router.get('/', reportKill.getAllKills);

// POST request for creating a new user
router.post('/', reportKill.createKill);

// PUT request for updating an existing user by ID
router.get('/user', reportKill.getKillByUserId);

// GET request for retrieving all badges by user ID
router.get('/kill', reportKill.getKillById);

// DELETE request for deleting a user by ID
router.delete('/:id', reportKill.deleteKill);

// GET request for retrieving all badges by user ID
router.get('/validatekill', reportKill.validateKill);

module.exports = router;
