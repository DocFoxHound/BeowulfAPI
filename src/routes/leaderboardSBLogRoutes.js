const express = require('express');
const router = express.Router();
const LeaderboardLogSBController = require('../controllers/leaderboardSBLogController');

// GET all LeaderboardLog entries
router.get('/', LeaderboardLogSBController.getAllLeaderboardLogEntries);

// GET LeaderboardLog entry by ID
router.get('/:id', LeaderboardLogSBController.getLeaderboardLogEntryById);

// GET LeaderboardLog entry by User ID
router.get('/user/:id', LeaderboardLogSBController.getLeaderboardLogEntryByUserId);

// GET all LeaderboardLog entries within a provided timespan
router.get('/timespan', LeaderboardLogSBController.getLeaderboardLogEntriesByTimespan);

// POST create a new LeaderboardLog entry
router.post('/', LeaderboardLogSBController.createLeaderboardLogEntry);

// PUT update a LeaderboardLog entry by ID
router.put('/:id', LeaderboardLogSBController.updateLeaderboardLogEntry);

// DELETE a LeaderboardLog entry by ID
router.delete('/:id', LeaderboardLogSBController.deleteLeaderboardLogEntry);

// DELETE all LeaderboardLog entries
router.delete('/', LeaderboardLogSBController.deleteAllLeaderboardLogEntries);

//submit in bulk
router.post('/bulk', LeaderboardLogSBController.createLeaderboardLogEntriesBulk);

module.exports = router;
