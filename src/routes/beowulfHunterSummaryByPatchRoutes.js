const express = require('express');
const router = express.Router();
const controller = require('../controllers/beowulfHunterSummaryByPatchController');

// Get summary for a specific patch and time range (milliseconds since epoch)
// Path style: /patch/:patch/start/:start_ms/end/:end_ms
router.get('/patch/:patch/start/:start_ms/end/:end_ms', controller.getByPatchAndRange);

// Also allow query params style: /patch/:patch?start=...&end=...
router.get('/patch/:patch', controller.getByPatchAndRange);

module.exports = router;
