const { Op } = require('sequelize');
const AiThreadModel = require('../models/threadModel');

// Handle GET request for a single thread by message ID
exports.getThreadByMessageId = async (req, res) => {
    try {
        const thread = await AiThreadModel.findByPk(req.query.message_id);
        if (thread) {
            res.status(200).json(thread);
        } else {
            res.status(404).send('Thread not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a new __badge
exports.createThread = async (req, res) => {
    try {
        const newThread = new AiThreadModel(req.body);
        const savedThread = await newThread.save();
        res.status(201).json(savedThread);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to delete threads older than a specified date
exports.deleteThreadsOlderThan = async (req, res) => {
    const { date } = req.body;
    if (!date) {
        return res.status(400).send('Date is required');
    }
    try {
        const result = await AiThreadModel.destroy({
            where: {
                createdAt: {
                    [Op.lt]: new Date(date)
                }
            }
        });
        res.status(200).send(`${result} threads deleted`);
    } catch (error) {
        console.error(`Error deleting threads: ${error.message}`);
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update a user by ID
exports.editThread = async (req, res) => {
    try {
        // Find the user first
        const user = await AiThreadModel.findByPk(req.params.id);
        if (user) {
            // Update the user with new data from req.body
            const updatedThread = await user.update(req.body);
            res.status(200).json(updatedThread);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};