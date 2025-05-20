const pool = require('../config/database');
const PlayerExperienceModel = require('../models/playerExperienceModel');

// Handle GET request for all __playerExperience
exports.getAllPlayerExperience = async (req, res) => {
    try {
        const __playerExperience = await PlayerExperienceModel.findAll();
        res.status(200).json(__playerExperience);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a new __playerExperience
exports.createPlayerExperience = async (req, res) => {
    try {
        const new__playerExperience = new PlayerExperienceModel(req.body);
        const saved_playerExperience = await new__playerExperience.save();
        res.status(201).json(saved_playerExperience);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update a playerExperience by ID
exports.updatePlayerExperience = async (req, res) => {
    try {
        // Find the __playerExperience first
        const __playerExperience = await PlayerExperienceModel.findByPk(req.params.id);
        if (__playerExperience) {
            // Update the __playerExperience with new data from req.body
            const updated__playerExperience = await __playerExperience.update(req.body);
            res.status(200).json(updated__playerExperience);
        } else {
            res.status(404).send('PlayerExperience not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to delete a playerExperience by ID
exports.deletePlayerExperience = async (req, res) => {
    const playerExperienceId = req.params.id;
    if (!playerExperienceId) {
        return res.status(400).send('PlayerExperience ID is required');
    }
    try {
        const playerExperience = await PlayerExperienceModel.findByPk(playerExperienceId);
        if (playerExperience) {
            await playerExperience.destroy();
            res.status(200).send('PlayerExperience deleted');
        } else {
            res.status(404).send('PlayerExperience not found');
        }
    } catch (error) {
        console.error(`Error deleting playerExperience: ${error.message}`);
        res.status(500).send(error.message);
    }
};

// Handle GET request for playerExperiences by user ID
exports.getPlayerExperiencesByUserId = async (req, res) => {
    const { user_id } = req.query;
    try {
        const playerExperiences = await PlayerExperienceModel.findAll({
            where: {
                user_id: user_id
            }
        });
        if (playerExperiences.length > 0) {
            res.status(200).json(playerExperiences);
        } else {
            res.status(404).send('No playerExperiences found for the given user ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for playerExperiences by user ID
exports.getPlayerExperiencesByPatch = async (req, res) => {
    const { patch } = req.query;
    try {
        const playerExperiences = await PlayerExperienceModel.findAll({
            where: {
                patch: patch
            }
        });
        if (playerExperiences.length > 0) {
            res.status(200).json(playerExperiences);
        } else {
            res.status(404).send('No playerExperiences found for the specified patch.');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getByUserIdAndPatch = async (req, res) => {
    const { user_id, patch } = req.query;
    try {
      const entries = await PlayerExperienceModel.findAll({
        where: {
            user_id,
            patch
        }
      });
  
      if (entries.length > 0) {
        res.status(200).json(entries);
      } else {
        res.status(404).send('No playerExperience found for the given user ID and patch');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
};