const express = require('express');
const router = express.Router();
const blackBoxController = require('../controllers/blackBoxController');

// GET request for retrieving a list of all users
router.get('/', blackBoxController.getAll);

// GET request for retrieving all badges by user ID
router.get('/user', blackBoxController.getByUserId);

// GET request for retrieving all badges by user ID
router.get('/entry', blackBoxController.getByEntryId);

// GET request for retrieving all badges by user ID
router.get('/patch', blackBoxController.getByPatch);

// GET request for retrieving all badges by user ID
router.get('/userandpatch', blackBoxController.getByUserIdAndPatch);

// GET request for retrieving all badges
router.get('/assistantbox', blackBoxController.getAssistantEntries);

//assistantboxuserpatch
// GET request for retrieving all badges by user ID
router.get('/assistantboxuserpatch', blackBoxController.getAssistantEntriesUserPatch);

// POST request for creating a new user
router.post('/', blackBoxController.create);

// PUT request for updating an existing user by ID
router.put('/:id', blackBoxController.update);

// DELETE request for deleting a user by ID
router.delete('/:id', blackBoxController.delete);

// GET request for retrieving all badges by user ID
router.get('/userkillsbefore', blackBoxController.getUserKillsBeforeTimestamp);

// GET request for retrieving all badges by user ID and patch game mode
router.get('/userpatchgamemode', blackBoxController.getByUserIdPatchGameMode);

// GET request for retrieving entries between two timestamps
router.get('/between', blackBoxController.getEntriesBetweenTimestamps);

module.exports = router;
