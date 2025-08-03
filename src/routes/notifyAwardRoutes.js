const express = require('express');
const router = express.Router();
const notifyAward = require('../controllers/notifyAwardController');

// POST request for notifying a user about an award (expects badgeName, badgeDescription, userName, userId in body)
router.post('/', notifyAward.notifyaward);

module.exports = router;
