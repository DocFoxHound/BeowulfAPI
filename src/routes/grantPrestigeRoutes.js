const express = require('express');
const router = express.Router();
const grantPrestige = require('../controllers/grantPrestigeController');

// POST request for promoting a user (expects user_id in body)
router.post('/', grantPrestige.grantPrestige);

module.exports = router;
