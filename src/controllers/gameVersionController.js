
const pool = require('../config/database');
const GameVersionModel = require('../models/gameVersionModel');

// Handle GET request for all entities
exports.getAllGameVersions = async (req, res) => {
    try {
        const entity = await GameVersionModel.findAll();
        res.status(200).json(entity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a entity
exports.createGameVersion = async (req, res) => {
    try {
        const newEntity = new GameVersionModel(req.body);
        const savedEntity = await newEntity.save();
        res.status(201).json(savedEntity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};