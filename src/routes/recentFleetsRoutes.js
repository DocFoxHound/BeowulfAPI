const express = require('express');
const router = express.Router();
const RecentFleet = require('../controllers/recentFleetsController');

// GET request for retrieving a list of all users

// GET request for retrieving all recent fleets
router.get('/', RecentFleet.getAllRecentFleets);

// GET request for retrieving recent fleets within a timeframe
router.get('/timeframe', RecentFleet.getRecentFleetsWithinTimeframe);

// GET request for retrieving recent fleets by patch
router.get('/patch', RecentFleet.getRecentFleetsByPatch);

// GET request for retrieving recent fleets summary from view
router.get('/usersummary', RecentFleet.getRecentFleetsSummary);

router.post('/', RecentFleet.createRecentFleets);

router.put('/:id', RecentFleet.updateRecentFleets);

router.delete('/:id', RecentFleet.deleteRecentFleets);


module.exports = router;
