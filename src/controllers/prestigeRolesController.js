const PrestigeModel = require('../models/prestigeModel');

// Handle GET request for all users
exports.getAllPrestiges = async (req, res) => {
    try {
        const users = await PrestigeModel.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single user by ID
exports.getPrestigeById = async (req, res) => {
    try {
        const user = await PrestigeModel.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};