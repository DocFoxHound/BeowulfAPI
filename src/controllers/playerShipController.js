const pool = require('../config/database');
const sequelize = require('../config/database'); // Import the Sequelize instance
const PlayerShip = require('../models/playerShipModel');



exports.getAll = async (req, res) => {
    try {
        const entries = await PlayerShip.findAll();
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getByEntryId = async (req, res) => {
    const { id } = req.query;
    try {
        const entry = await PlayerShip.findOne({
            where: {
                id: id
            }
        });

        if (entry) {
            res.status(200).json(entry); // Return the object directly
        } else {
            res.status(404).send('No PlayerShip found for the given ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getByUexShipId = async (req, res) => {
    const { ship_id } = req.query;
    try {
        const entries = await PlayerShip.findAll({
            where: {
                ship_id: ship_id
            }
        });
        if (entries.length > 0) {
            res.status(200).json(entries);
        } else {
            res.status(404).send('No PlayerShip found for the given user ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getByUserId = async (req, res) => {
    const { user_id } = req.query;
    try {
        const entries = await PlayerShip.findAll({
            where: {
                user_id: user_id
            }
        });
        if (entries.length > 0) {
            res.status(200).json(entries);
        } else {
            res.status(404).send('No PlayerShip found for the given user ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.create = async (req, res) => {
    try {
        const new_entry = new PlayerShip(req.body);
        const saved_entry = await new_entry.save();
        res.status(201).json(saved_entry);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.update = async (req, res) => {
    try {
        // Find the __badge first
        const entry = await PlayerShip.findByPk(req.params.id);
        if (entry) {
            // Update the __badge with new data from req.body
            const updated_entry = await entry.update(req.body);
            res.status(200).json(updated_entry);
        } else {
            res.status(404).send('PlayerShip not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.delete = async (req, res) => {
    const entryId = req.params.id;
    if (!entryId) {
        return res.status(400).send('PlayerShip ID is required');
    }
    try {
        const entry = await PlayerShip.findByPk(entryId);
        if (entry) {
            await entry.destroy();
            res.status(200).send('PlayerShip deleted');
        } else {
            res.status(404).send('PlayerShip not found');
        }
    } catch (error) {
        console.error(`Error deleting PlayerShip: ${error.message}`);
        res.status(500).send(error.message);
    }
};

