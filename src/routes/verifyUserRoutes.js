const express = require('express');
const router = express.Router();
const verifyUser = require('../controllers/verifyUserController');

// POST request for promoting a user (expects user_id in body)
router.post('/', verifyUser.verifyUser);

module.exports = router;
