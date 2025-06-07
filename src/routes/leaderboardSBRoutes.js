const express = require('express');
const router = express.Router();
const leaderboardSBController = require('../controllers/leaderboardSBController');

// GET all leaderboard entries
router.get('/', leaderboardSBController.getAllLeaderboardEntries);

// GET leaderboard entry by ID
router.get('/:id', leaderboardSBController.getLeaderboardEntryById);

// POST create a new leaderboard entry
router.post('/', leaderboardSBController.createLeaderboardEntry);

// PUT update a leaderboard entry by ID
router.put('/:id', leaderboardSBController.updateLeaderboardEntry);

// DELETE a leaderboard entry by ID
router.delete('/:id', leaderboardSBController.deleteLeaderboardEntry);

//submit in bulk
router.post('/bulk', leaderboardSBController.createLeaderboardEntriesBulk);

module.exports = router;
