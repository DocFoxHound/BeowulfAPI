const express = require('express');
const router = express.Router();
const controller = require('../controllers/leaderboardFleetlogSumamryController');

// Get leaderboard for a specific patch
router.get('/patch/:patch', controller.getLeaderboardByPatch);

// Get stats for a specific player
router.get('/player/:player_id', controller.getPlayerStats);

module.exports = router;
