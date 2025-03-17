const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// GET request for retrieving a list of all users
router.get('/', classController.getAllClasses);

// GET request for retrieving a single user by ID
router.get('/:id', classController.getClassById);

// POST request for creating a new user
router.post('/', userController.createClass);

// PUT request for updating an existing user by ID
router.put('/:id', userController.updateClass);

// DELETE request for deleting a user by ID
router.delete('/:id', userController.deleteClass);

module.exports = router;
