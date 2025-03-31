const express = require('express');
const router = express.Router();
const blackBoxController = require('../controllers/blackBoxController');

// GET request for retrieving a list of all users
router.get('/', blackBoxController.getAll);

// GET request for retrieving all badges by user ID
router.get('/user', blackBoxController.getByUserId);

// GET request for retrieving all badges by user ID
router.get('/patch', blackBoxController.getByPatch);

// GET request for retrieving all badges by user ID
router.get('/user2/:id/patch/:patch', blackBoxController.getByUserIdAndPatch);

// POST request for creating a new user
router.post('/', blackBoxController.create);

// PUT request for updating an existing user by ID
router.put('/:id', blackBoxController.update);

// DELETE request for deleting a user by ID
router.delete('/:id', blackBoxController.delete);

module.exports = router;
