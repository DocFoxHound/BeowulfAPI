const CompletedQueue = require('../models/completedQueueModel');

// Handle GET request for all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await CompletedQueue.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await CompletedQueue.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a new user in the queue
exports.createUser = async (req, res) => {
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
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await pool.query('DELETE FROM completed_queue_tickets WHERE id = $1 RETURNING *;', [userId]);
        if (result.rows.length > 0) {
            res.status(200).send('User deleted');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update a user by ID
exports.updateUser = async (req, res) => {
    try {
        // Find the user first
        const user = await CompletedQueue.findByPk(req.params.id);
        if (user) {
            // Update the user with new data from req.body
            const updatedUser = await user.update(req.body);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};