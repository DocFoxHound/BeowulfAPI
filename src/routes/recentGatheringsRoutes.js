const express = require('express');
const router = express.Router();
const RecentGathering = require('../controllers/recentGatheringsController');

// GET request for retrieving a list of all users
router.get('/', RecentGathering.getAllRecentGatherings);

// POST request for creating a new user
router.post('/', RecentGathering.createRecentGathering);

// PUT request for updating an existing user by ID
router.put('/:id', RecentGathering.updateRecentGathering);

// DELETE request for deleting a user by ID
router.delete('/:id', RecentGathering.deleteRecentGathering);

// // GET request for retrieving all badges by user ID
// router.get('/user', RecentGathering.getRecentGatheringsByUserId);

// // GET request for retrieving all badges by user ID
// router.get('/patch', RecentGathering.getRecentGatheringsByPatch);

// // GET request for retrieving all badges by user ID
// router.get('/userandpatch', RecentGathering.getByUserIdAndPatch);



module.exports = router;
