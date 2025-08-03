const express = require('express');
const router = express.Router();
const leaderboardSBOrgController = require('../controllers/leaderboardSBOrgController');

// GET all leaderboard entries
router.get('/', leaderboardSBOrgController.getAllLeaderboardEntries);

// GET leaderboard entry by ID
router.get('/:id', leaderboardSBOrgController.getLeaderboardEntryById);

// POST create a new leaderboard entry
router.post('/', leaderboardSBOrgController.createLeaderboardEntry);

// PUT update a leaderboard entry by ID
router.put('/:id', leaderboardSBOrgController.updateLeaderboardEntry);

// DELETE a leaderboard entry by ID
router.delete('/:id', leaderboardSBOrgController.deleteLeaderboardEntry);

// DELETE all leaderboard entries
router.delete('/', leaderboardSBOrgController.deleteAllLeaderboardEntries);

//submit in bulk
router.post('/bulk', leaderboardSBOrgController.createLeaderboardEntriesBulk);

module.exports = router;
