const RankModel = require('../models/rankModel');

// Handle GET request for all users
exports.getAllRanks = async (req, res) => {
    try {
        const users = await RankModel.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single user by ID
exports.getRankById = async (req, res) => {
    try {
        const user = await RankModel.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};