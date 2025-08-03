const express = require('express');
const router = express.Router();
const orgGoalsController = require('../controllers/orgGoalsController');

// GET request for retrieving a list of all users
router.get('/', orgGoalsController.getAllOrgGoals);

// GET request for retrieving all active organization goals
router.get('/active', orgGoalsController.getActiveOrgGoals);

// GET request for retrieving all organization goals by ID
router.get('/id', orgGoalsController.getOrgGoalsById);

// POST request for creating a new goal
router.post('/', orgGoalsController.createOrgGoal);

// PUT request for updating an existing goal by ID
router.put('/:id', orgGoalsController.updateOrgGoal);

// DELETE request for deleting a goal by ID
router.delete('/:id', orgGoalsController.deleteOrgGoal);

module.exports = router;
