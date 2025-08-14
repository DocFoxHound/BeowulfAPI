const express = require('express');
const router = express.Router();
const hitTrackerController = require('../controllers/hitTrackerController');

// GET request for retrieving a list of all users
router.get('/', hitTrackerController.getAll);

// GET request for retrieving all badges by user ID
router.get('/user', hitTrackerController.getByUserId);

// GET request for all hits by patch
router.get('/patch', hitTrackerController.getByPatch);

// GET request for retrieving all badges by user ID
router.get('/entry', hitTrackerController.getByEntryId);

// GET request for retrieving all hits by user ID and patch
router.get('/userandpatch', hitTrackerController.getByUserIdAndPatch);

// GET request for retrieving all badges
router.get('/assists', hitTrackerController.getAssistEntries);

// GET request for retrieving all badges by user ID
router.get('/assistsuserpatch', hitTrackerController.getAssistEntriesUserPatch);

// GET request for retrieving the latest entry
router.get('/latest', hitTrackerController.getLatest);

// GET request for retrieving the latest 100 entries
router.get('/latest100', hitTrackerController.getLatest100);

// POST request for creating a new user
router.post('/', hitTrackerController.create);

// PUT request for updating an existing user by ID
router.put('/:id', hitTrackerController.update);

// DELETE request for deleting a user by ID
router.delete('/:id', hitTrackerController.delete);

// GET request for retrieving the count of hit entries
router.get('/count', hitTrackerController.getHitEntryCount);

// GET request for retrieving the total value sum
router.get('/totalsum', hitTrackerController.getTotalValueSum);

// GET request for retrieving top 10 total cut value by patch
router.get('/top10totalcutvalue', hitTrackerController.getTop10TotalCutValueByPatch);

// GET request for retrieving org overview summary by patch
router.get('/hitoverviewbypatch', hitTrackerController.getOverviewByPatch);

// GET request for retrieving all hitTracker entries between a timeframe
router.get('/timeframe', hitTrackerController.getEntriesByTimeframe);

// GET request for retrieving recent piracy summary from view
router.get('/usersummary', hitTrackerController.getRecentPirateSummary);

// GET request for retrieving recent piracy summary from view
router.get('/totalusersummary', hitTrackerController.getTotalPirateSummary);

module.exports = router;
