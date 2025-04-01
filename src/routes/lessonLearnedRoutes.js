const express = require('express');
const router = express.Router();
const lessonLearnedController = require('../controllers/lessonsLearnedController');

// GET request for retrieving a list of all users
router.get('/', lessonLearnedController.getAllLessons);

// POST request for creating a new user
router.post('/', lessonLearnedController.createLesson);

// DELETE request for deleting a user by ID
router.delete('/:id', lessonLearnedController.deleteLesson);

module.exports = router;
