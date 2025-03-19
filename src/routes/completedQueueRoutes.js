const express = require('express');
const router = express.Router();
const completedQueueController = require('../controllers/completedQueueController');

// GET request for retrieving a list of all entries
router.get('/', completedQueueController.getAllEntries);

// GET request for retrieving a single entry by ID
router.get('/:id', completedQueueController.getEntryById);

// GET request for retrieving a list of entries by userId and classId
router.get('/:userid/:classid', completedQueueController.getEntryByUserAndClassIds);

// POST request for creating a new entry
router.post('/', completedQueueController.createEntry);

// DELETE request for deleting a entry by ID
router.delete('/:id', completedQueueController.deleteEntry);

// PUT request for updating an existing entry by ID
router.put('/:id', completedQueueController.updateEntry);

module.exports = router;
