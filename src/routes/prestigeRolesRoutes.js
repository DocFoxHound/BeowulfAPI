const express = require('express');
const router = express.Router();
const prestigeRolesController = require('../controllers/prestigeRolesController');

// GET request for retrieving a list of all users
router.get('/', prestigeRolesController.getAllPrestiges);

// GET request for retrieving a single user by ID
router.get('/:id', prestigeRolesController.getPrestigeById);

module.exports = router;
