const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController');

// GET request for retrieving a list of all users
router.get('/', badgeController.getAllBadges);

// GET request for retrieving all badges by user ID
router.get('/user', badgeController.getBadgesByUserId);

// GET request for retrieving all badges by user ID
router.get('/patch', badgeController.getBadgesByPatch);

// POST request for creating a new user
router.post('/', badgeController.createBadge);

// PUT request for updating an existing user by ID
router.put('/:id', badgeController.updateBadge);

// DELETE request for deleting a user by ID
router.delete('/:id', badgeController.deleteBadge);

module.exports = router;
