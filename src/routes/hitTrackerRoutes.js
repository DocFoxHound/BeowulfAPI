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
router.get('/user2/:id/patch/:patch', hitTrackerController.getByUserIdAndPatch);

// POST request for creating a new user
router.post('/', hitTrackerController.create);

// PUT request for updating an existing user by ID
router.put('/:id', hitTrackerController.update);

// DELETE request for deleting a user by ID
router.delete('/:id', hitTrackerController.delete);

module.exports = router;
