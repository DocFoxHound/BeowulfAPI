const express = require('express');
const router = express.Router();
const badgeAccoladesController = require('../controllers/badgeAccoladesController');

// GET request for retrieving a list of all users
router.get('/', badgeAccoladesController.getAllBadges);

// GET request for retrieving all badges by user ID
router.get('/id', badgeAccoladesController.getBadgesById);

// GET request for retrieving all badges by user ID
router.get('/patch', badgeAccoladesController.getBadgesByPatch);

// POST request for creating a new user
router.post('/', badgeAccoladesController.createBadge);

// PUT request for updating an existing user by ID
router.put('/:id', badgeAccoladesController.updateBadge);

// DELETE request for deleting a user by ID
router.delete('/:id', badgeAccoladesController.deleteBadge);

module.exports = router;
