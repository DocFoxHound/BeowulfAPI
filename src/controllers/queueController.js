const QueueModel = require('../models/queueModel');

// Handle GET request for all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await QueueModel.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await QueueModel.findByPk(req.params.id);
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
    try {
        const newUser = new QueueModel(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await QueueModel.findByIdAndDelete(req.params.id);
        if (deletedUser) {
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
        console.log("Req.params:")
        console.log(req.params)
        console.log("Req.body:")
        console.log(req.body)
        // Find the user first
        const user = await QueueModel.findByPk(req.params.id);
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