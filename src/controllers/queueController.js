const Queue = require('../models/queueModel');

// Handle GET request for all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await Queue.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a new user in the queue
exports.createUser = async (req, res) => {
    try {
        const newUser = new Queue(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await Queue.findByIdAndDelete(req.params.id);
        if (deletedUser) {
            res.status(200).send('User deleted');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
