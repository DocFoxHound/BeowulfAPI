const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// GET request for retrieving a list of all users
router.get('/', messageController.getAllMessages);

// // GET request for retrieving all badges by user ID
// router.get('/message', messageController.getMessageById);

// POST request for creating a new user
router.post('/', messageController.createMessage);

// // PUT request for updating an existing user by ID
// router.put('/:id', messageController.updateMessage);

// DELETE request for deleting a user by ID
router.delete('/:id', messageController.deleteMessage);

// DELETE request for deleting a user by ID
router.delete('/older-than', messageController.deleteMessagesOlderThan);

// DELETE by channel name and amount of messages
router.delete('/name/:name/number/:number', messageController.deleteMessagesByCount);


module.exports = router;
