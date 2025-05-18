const express = require('express');
const router = express.Router();
const hitTrackerController = require('../controllers/hitTrackerController');

// GET request for retrieving a list of all users
router.get('/', hitTrackerController.getAll);

// GET request for retrieving all badges by user ID
router.get('/user', hitTrackerController.getByUserId);

// GET request for retrieving all badges by user ID
router.get('/patch', hitTrackerController.getByPatch);

// GET request for retrieving all badges by user ID
router.get('/entry', hitTrackerController.getByEntryId);

// GET request for retrieving all badges by user ID
router.get('/userandpatch', hitTrackerController.getByUserIdAndPatch);

// GET request for retrieving all badges
router.get('/assists', hitTrackerController.getAssistEntries);

// GET request for retrieving all badges by user ID
router.get('/assistsuserpatch', hitTrackerController.getAssistEntriesUserPatch);

// GET request for retrieving the latest entry
router.get('/latest', hitTrackerController.getLatest);

// POST request for creating a new user
router.post('/', hitTrackerController.create);

// PUT request for updating an existing user by ID
router.put('/:id', hitTrackerController.update);

// DELETE request for deleting a user by ID
router.delete('/:id', hitTrackerController.delete);

module.exports = router;
