const express = require('express');
const router = express.Router();
const threadController = require("../controllers/threadController");

// GET request for retrieving all badges by user ID
router.get('/message', threadController.getThreadByMessageId);

// POST request for creating a new user
router.post('/', threadController.createThread);

// DELETE request for deleting a user by ID
router.delete('/older-than', threadController.deleteThreadsOlderThan);

// PUT request for updating an existing user by ID
router.put('/:id', threadController.editThread);

module.exports = router;
