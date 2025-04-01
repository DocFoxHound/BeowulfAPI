
const express = require('express');
const router = express.Router();
const gameVersionController = require('../controllers/gameVersionController');

// GET request for retrieving a list of all users
router.get('/', gameVersionController.getAllGameVersions);

// PUT request for updating an existing user by ID
router.post('/', gameVersionController.createGameVersion);

module.exports = router;
