const express = require('express');
const router = express.Router();
const shipLogController = require('../controllers/shipLogController');

// GET request for retrieving a list of all users
router.get('/', shipLogController.getAll);

// GET request for retrieving all badges by user ID
router.get('/commander', shipLogController.getByCommanderId);

// GET request for retrieving all badges by user ID
router.get('/owner', shipLogController.getByOwnerId);

// GET request for retrieving all badges by user ID
router.get('/entry', shipLogController.getByEntryId);

// GET request for retrieving all badges by user ID
router.get('/patch', shipLogController.getByPatch);

// GET request for retrieving all badges by user ID
router.get('/commanderandpatch', shipLogController.getByCommanderIdAndPatch);

// GET request for retrieving all badges
router.get('/crew', shipLogController.getCrewEntries);

// GET request for retrieving all badges by user ID
router.get('/crewuserpatch', shipLogController.getCrewEntriesUserPatch);

// POST request for creating a new user
router.post('/', shipLogController.create);

// PUT request for updating an existing user by ID
router.put('/:id', shipLogController.update);

// DELETE request for deleting a user by ID
router.delete('/:id', shipLogController.delete);

// GET logs by fleet active status
router.get('/by-fleet-active', shipLogController.getByFleetActiveStatus);

// GET logs with top kills
router.get('/top-kills', shipLogController.getTopKills);

// GET logs with top damages_value
router.get('/top-damages', shipLogController.getTopDamages);

// GET request for retrieving recent logs by fleet ID
router.get('/recent-by-fleet', shipLogController.getRecentByFleetId);

// GET request for retrieving top fleets by patch
router.get('/top-fleets', shipLogController.getTopFleetsByPatch);

module.exports = router;
