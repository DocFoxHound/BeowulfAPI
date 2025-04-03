const express = require('express');
const router = express.Router();
const playerShipController = require('../controllers/playerShipController');

// GET request for retrieving a list of all users
router.get('/', playerShipController.getAll);

// GET request for retrieving all badges by user ID
router.get('/user', playerShipController.getByUserId);

// GET request for retrieving all badges by user ID
router.get('/entry', playerShipController.getByEntryId);

// GET request for retrieving all badges by user ID
router.get('/uexshipid', playerShipController.getByUexShipId);

// POST request for creating a new user
router.post('/', playerShipController.create);

// PUT request for updating an existing user by ID
router.put('/:id', playerShipController.update);

// DELETE request for deleting a user by ID
router.delete('/:id', playerShipController.delete);

module.exports = router;
