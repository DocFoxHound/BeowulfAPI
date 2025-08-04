const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/calendarAvailabilityController');

// GET request for retrieving a list of all users
router.get('/', availabilityController.getAllAvailability);

// GET weekly availabilities
router.get('/weekly', availabilityController.getWeekAvailabilities);

// GET request for retrieving all availabilities by user ID
router.get('/user', availabilityController.getAvailabilityByUserId);

// GET request for retrieving all availabilities by patch
router.get('/patch', availabilityController.getAvailabilityByPatch);

// POST request for creating a new availability
router.post('/', availabilityController.createAvailability);

// PUT request for updating an existing availability by ID
router.put('/:id', availabilityController.updateAvailability);

// DELETE request for deleting a availability by ID
router.delete('/:id', availabilityController.deleteAvailability);

module.exports = router;
