const express = require('express');
const router = express.Router();
const badgeReusableController = require('../controllers/badgeReusableController');

// GET request for retrieving a list of all users
router.get('/', badgeReusableController.getAllBadgeReusables);

// GET request for retrieving all badges by ID
router.get('/id', badgeReusableController.getBadgeReusableById);

// POST request for creating a new user
router.post('/', badgeReusableController.createBadgeReusable);

// PUT request for updating an existing user by ID
router.put('/:id', badgeReusableController.updateBadgeReusable);

// DELETE request for deleting a user by ID
router.delete('/:id', badgeReusableController.deleteBadgeReusable);

module.exports = router;
