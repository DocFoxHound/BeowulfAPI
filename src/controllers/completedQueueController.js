const CompletedQueue = require('../models/completedQueueModel');
const pool = require('../config/database');
const { Op } = require('sequelize');

// Handle GET request for all users
exports.getAllEntries = async (req, res) => {
    try {
        const users = await CompletedQueue.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single user by ID
exports.getEntryById = async (req, res) => {
    try {
        const user = await CompletedQueue.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('Entry not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single user by ID
exports.getEntryByUserAndClassIds = async (req, res) => {
    const { userid, classid } = req.params;
    try {
        const entries = await CompletedQueue.findAll({
            where: {
                user_id: userid,
                class_id: classid
            }
        });
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Handle GET request for a single user by ID
exports.getEntriesBetweenDates = async (req, res) => {
    const { startdate, enddate } = req.query;
    try {
        const entries = await CompletedQueue.findAll({
            where: {
                createdAt: {
                    [Op.between]: [new Date(startdate), new Date(enddate)]
                }
            }
        });
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Handle POST request to create a new user in the queue
exports.createEntry = async (req, res) => {
    console.log("Create entry for completed queue")
    try {
        const newUser = new CompletedQueue(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to delete a user by ID
exports.deleteEntry = async (req, res) => {
    const entryId = req.params.id;
    console.log(`Received entryId: ${entryId}`);
    if (!entryId) {
        return res.status(400).send('Entry ID is required');
    }

    try {
        const result = await pool.query(`DELETE FROM completed_queue_tickets WHERE ticket_id = ${entryId} RETURNING *;`);
    } catch (error) {
        console.error(`Error executing query: ${error.message}`);
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update a user by ID
exports.updateEntry = async (req, res) => {
    try {
        // Find the user first
        const user = await CompletedQueue.findByPk(req.params.id);
        if (user) {
            // Update the user with new data from req.body
            const updatedUser = await user.update(req.body);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).send('Entry not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};