const express = require('express');
const router = express.Router();
const playerExperienceController = require('../controllers/playerExperienceController');

// GET request for retrieving a list of all users
router.get('/', playerExperienceController.getAllPlayerExperience);

// POST request for creating a new user
router.post('/', playerExperienceController.createPlayerExperience);

// PUT request for updating an existing user by ID
router.put('/:id', playerExperienceController.updatePlayerExperience);

// DELETE request for deleting a user by ID
router.delete('/:id', playerExperienceController.deletePlayerExperience);

// GET request for retrieving all badges by user ID
router.get('/user', playerExperienceController.getPlayerExperiencesByUserId);

// GET request for retrieving all badges by user ID
router.get('/patch', playerExperienceController.getPlayerExperiencesByPatch);

// GET request for retrieving all badges by user ID
router.get('/userandpatch', playerExperienceController.getByUserIdAndPatch);



module.exports = router;
