const express = require('express');
const router = express.Router();
const starcitizenApiController = require('../controllers/starcitizen-apiController');


// GET request for retrieving all badges by user ID
router.get('/:handle', starcitizenApiController.getPlayer);

module.exports = router;
