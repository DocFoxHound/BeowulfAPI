const express = require('express');
const router = express.Router();
const rankRolesController = require('../controllers/rankRolesController');

// GET request for retrieving a list of all users
router.get('/', rankRolesController.getAllRanks);

// GET request for retrieving a single user by ID
router.get('/:id', rankRolesController.getRankById);

module.exports = router;
