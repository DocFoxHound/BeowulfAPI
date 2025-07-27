const express = require('express');
const router = express.Router();
const playerStatsController = require('../controllers/playerStatsController');

// GET all player stats
router.get('/', playerStatsController.getAllPlayerStats);

// GET player stats by user_id
router.get('/:user_id', playerStatsController.getPlayerStats);

// POST to refresh the player_stats materialized view
router.post('/refresh', playerStatsController.refreshPlayerStatsView);

module.exports = router;
