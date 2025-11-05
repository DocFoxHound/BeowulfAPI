const PlayerTrackerModel = require('../models/playerTrackerModel');

// Handle GET request for all player trackers
exports.getAllPlayers = async (req, res) => {
    try {
        const players = await PlayerTrackerModel.findAll();
        res.status(200).json(players);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single player tracker by ID
exports.getPlayerById = async (req, res) => {
    try {
        const player = await PlayerTrackerModel.findByPk(req.params.id);
        if (player) {
            res.status(200).json(player);
        } else {
            res.status(404).send('Player tracker not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a new player tracker
exports.createPlayerTracker = async (req, res) => {
    try {
        const newPlayerTracker = new PlayerTrackerModel(req.body);
        const savedPlayerTracker = await newPlayerTracker.save();
        res.status(201).json(savedPlayerTracker);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update a player tracker by ID
exports.updatePlayerTracker = async (req, res) => {
    try {
        const playerTracker = await PlayerTrackerModel.findByPk(req.params.id);
        if (playerTracker) {
            const updatedPlayerTracker = await playerTracker.update(req.body);
            res.status(200).json(updatedPlayerTracker);
        } else {
            res.status(404).send('Player tracker not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to delete a player tracker by ID
exports.deletePlayerTracker = async (req, res) => {
    const playerTrackerId = req.params.id;
    if (!playerTrackerId) {
        return res.status(400).send('Player Tracker ID is required');
    }
    try {
        const playerTracker = await PlayerTrackerModel.findByPk(playerTrackerId);
        if (playerTracker) {
            await playerTracker.destroy();
            res.status(200).send('Player tracker deleted');
        } else {
            res.status(404).send('Player tracker not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};