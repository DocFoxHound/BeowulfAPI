const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

// GET request for retrieving a list of all users
router.get('/', scheduleController.getAllSchedules);

// GET request for retrieving a list of all users
router.get('/weekly', scheduleController.getWeekSchedules);

// GET request for retrieving a list of all users
router.get('/:id', scheduleController.getScheduleById);

// GET request for retrieving all badges by user ID
router.get('/user', scheduleController.getSchedulesByUserId);

// POST request for creating a new user
router.post('/', scheduleController.createSchedule);

// POST request for creating repeated schedules
router.post('/repeat', scheduleController.createScheduleRepeatUntil);

// PUT request for updating an existing user by ID
router.put('/:id', scheduleController.updateSchedule);

// DELETE request for deleting a user by ID
router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;
