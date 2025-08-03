const { Op } = require('sequelize');
const pool = require('../config/database');
const OrgGoalModel = require('../models/orgGoalsModel');

// Handle GET request for all organization goals
exports.getAllOrgGoals = async (req, res) => {
    try {
        const orgGoals = await OrgGoalModel.findAll();
        res.status(200).json(orgGoals);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for all active organization goals (deleted !== true)
exports.getActiveOrgGoals = async (req, res) => {
    try {
        const activeGoals = await OrgGoalModel.findAll({
            where: {
                deleted: { [Op.ne]: true }
            }
        });
        res.status(200).json(activeGoals);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a new organization goal
exports.createOrgGoal = async (req, res) => {
    try {
        const newOrgGoal = new OrgGoalModel(req.body);
        const savedOrgGoal = await newOrgGoal.save();
        res.status(201).json(savedOrgGoal);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update a organization goal by ID
exports.updateOrgGoal = async (req, res) => {
    try {
        // Find the organization goal first
        const orgGoal = await OrgGoalModel.findByPk(req.params.id);
        if (orgGoal) {
            // Update the organization goal with new data from req.body
            const updatedOrgGoal = await orgGoal.update(req.body);
            res.status(200).json(updatedOrgGoal);
        } else {
            res.status(404).send('Organization goal not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to delete a organization goal by ID
exports.deleteOrgGoal = async (req, res) => {
    const orgGoalId = req.params.id;
    if (!orgGoalId) {
        return res.status(400).send('Organization goal ID is required');
    }
    try {
        const orgGoal = await OrgGoalModel.findByPk(orgGoalId);
        if (orgGoal) {
            await orgGoal.destroy();
            res.status(200).send('Organization goal deleted');
        } else {
            res.status(404).send('Organization goal not found');
        }
    } catch (error) {
        console.error(`Error deleting organization goal: ${error.message}`);
        res.status(500).send(error.message);
    }
};

// Handle GET request for organization goals by user ID
exports.getOrgGoalsById = async (req, res) => {
    const { id } = req.query;
    try {
        const orgGoals = await OrgGoalModel.findAll({
            where: {
                id: id
            }
        });
        if (orgGoals.length > 0) {
            res.status(200).json(orgGoals);
        } else {
            res.status(404).send('No organization goals found for the given user ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};