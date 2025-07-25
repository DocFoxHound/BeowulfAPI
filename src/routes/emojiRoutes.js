const express = require('express');
const router = express.Router();
const emojiController = require('../controllers/emojiController');

// GET request for retrieving a list of all emojis
router.get('/', emojiController.getAllEmojis);

module.exports = router;
