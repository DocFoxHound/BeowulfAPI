const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

// GET all schedules
router.get('/', scheduleController.getAllSchedules);

// GET weekly schedules
router.get('/weekly', scheduleController.getWeekSchedules);

// GET schedules by user ID
router.get('/user', scheduleController.getSchedulesByUserId);

// POST create a new schedule
router.post('/', scheduleController.createSchedule);

// POST create repeated schedules
router.post('/repeat', scheduleController.createScheduleRepeatUntil);

// PUT update schedule by ID (with notify)
router.put('/:id', scheduleController.updateSchedule);

// DELETE schedule by ID
router.delete('/:id', scheduleController.deleteSchedule);

// GET all active schedules
router.get('/active', scheduleController.getActiveSchedules);

// GET next schedule by repeat_series ID (closest after today)
router.get('/repeatseries/:id/next', scheduleController.getNextScheduleByRepeatSeries);

// GET schedule by ID
router.get('/:id', scheduleController.getScheduleById);

module.exports = router;
