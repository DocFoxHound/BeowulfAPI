const express = require('express');
const router = express.Router();
const leaderboardSBSummaryController = require('../controllers/leaderboardSBSummaryController');

// GET all player summaries
router.get('/', leaderboardSBSummaryController.getAllPlayerSummaries);

// GET player summary by nickname
router.get('/:nickname', leaderboardSBSummaryController.getPlayerSummaryByNickname);

module.exports = router;
