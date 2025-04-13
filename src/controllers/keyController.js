const pool = require('../config/database');
const KeyModel = require('../models/keyModel');

// Handle GET request for all __key
exports.getAllKeys = async (req, res) => {
    try {
        const __key = await KeyModel.findAll();
        res.status(200).json(__key);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a new __key
exports.createKey = async (req, res) => {
    try {
        const new__key = new KeyModel(req.body);
        const saved_key = await new__key.save();
        res.status(201).json(saved_key);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to delete a key by ID
exports.deleteKey = async (req, res) => {
    const keyId = req.params.id;
    if (!keyId) {
        return res.status(400).send('Key ID is required');
    }
    try {
        const key = await KeyModel.findByPk(keyId);
        if (key) {
            await key.destroy();
            res.status(200).send('Key deleted');
        } else {
            res.status(404).send('Key not found');
        }
    } catch (error) {
        console.error(`Error deleting key: ${error.message}`);
        res.status(500).send(error.message);
    }
};

// Handle GET request for Keys by user ID
exports.getKeyByKey = async (req, res) => {
    const { key } = req.query;
    try {
        const foundKey = await KeyModel.findOne({
            where: {
                key: key
            }
        });
        if (foundKey) {
            res.status(200).json(foundKey);
        } else {
            res.status(404).send('No Keys found for the given user ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for Keys by user ID
exports.getKeyByUserId = async (req, res) => {
    const { user_id } = req.query;
    try {
        const foundKey = await KeyModel.findOne({
            where: {
                user_id: user_id
            }
        });
        if (foundKey) {
            res.status(200).json(foundKey);
        } else {
            res.status(404).send('No Keys found for the given user ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for Keys by user ID
exports.validateKey = async (req, res) => {
    const { key } = req.query;
    try {
        const foundKey = await KeyModel.findOne({
            where: {
                key: key
            }
        });
        if(foundKey) {
            res.status(200).json(foundKey);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
