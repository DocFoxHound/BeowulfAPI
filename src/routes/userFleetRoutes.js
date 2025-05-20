const express = require('express');
const router = express.Router();
const fleetController = require('../controllers/userFleetController');

// GET request for retrieving a list of all users
router.get('/', fleetController.getAllFleets);

// GET request for retrieving all badges by user ID
router.get('/commander', fleetController.getFleetsByCommanderId);

// GET request for retrieving all badges by fleet ID
router.get('/fleet', fleetController.getFleetById);

// GET request for retrieving all badges
router.get('/members', fleetController.getFleetByMember);

// GET request for retrieving all badges
router.get('/activeornot', fleetController.getFleetsByActivtyOrNot);

// POST request for creating a new user
router.post('/', fleetController.createFleet);

// PUT request for updating an existing user by ID
router.put('/:id', fleetController.updateFleet);

// DELETE request for deleting a user by ID
router.delete('/:id', fleetController.deleteFleet);

module.exports = router;
