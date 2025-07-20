const express = require('express');
const router = express.Router();
const RecentGathering = require('../controllers/recentGatheringsController');

// GET request for retrieving a list of all users

// GET request for retrieving all recent gatherings
router.get('/', RecentGathering.getAllRecentGatherings);

// GET request for retrieving recent gatherings within a timeframe
router.get('/timeframe', RecentGathering.getRecentGatheringsWithinTimeframe);

router.post('/', RecentGathering.createRecentGathering);

router.put('/:id', RecentGathering.updateRecentGathering);

router.delete('/:id', RecentGathering.deleteRecentGathering);

// // GET request for retrieving all badges by user ID
// router.get('/user', RecentGathering.getRecentGatheringsByUserId);

// // GET request for retrieving all badges by user ID
// router.get('/patch', RecentGathering.getRecentGatheringsByPatch);

// // GET request for retrieving all badges by user ID
// router.get('/userandpatch', RecentGathering.getByUserIdAndPatch);



module.exports = router;
