const express = require('express');
const router = express.Router();
const leaderboardSBOrgSummaryController = require('../controllers/leaderboardSBOrgSummaryController');

// GET all player summaries
router.get('/', leaderboardSBOrgSummaryController.getAllOrgSummaries);

// GET player summary by nickname
router.get('/:name', leaderboardSBOrgSummaryController.getOrgSummaryByName);

module.exports = router;
