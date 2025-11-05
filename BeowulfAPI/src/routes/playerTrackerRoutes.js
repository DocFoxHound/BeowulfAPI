const express = require('express');
const router = express.Router();
const playerTrackerController = require('../controllers/playerTrackerController');

// GET request for retrieving a list of all player trackers
router.get('/', playerTrackerController.getAllPlayers);

// GET request for retrieving a single player tracker by ID
router.get('/:id', playerTrackerController.getPlayerById);

// POST request for creating a new player tracker
router.post('/', playerTrackerController.createPlayerTracker);

// PUT request for updating an existing player tracker by ID
router.put('/:id', playerTrackerController.updatePlayerTracker);

// DELETE request for deleting a player tracker by ID
router.delete('/:id', playerTrackerController.deletePlayerTracker);

module.exports = router;