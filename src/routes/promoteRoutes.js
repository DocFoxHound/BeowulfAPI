const express = require('express');
const router = express.Router();
const promoteController = require('../controllers/promoteController');

// POST request for promoting a user (expects user_id in body)
router.post('/', promoteController.promote);

module.exports = router;
