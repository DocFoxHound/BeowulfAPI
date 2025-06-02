const pool = require('../config/database');
const FleetModel = require('../models/userFleetModel');
const axios = require('axios'); // Add this line

// Handle GET request for all __fleet
exports.getAllFleets = async (req, res) => {
    try {
        const __fleet = await FleetModel.findAll();
        res.status(200).json(__fleet);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a new __fleet
exports.createFleet = async (req, res) => {
    try {
        const new__fleet = new FleetModel(req.body);
        const saved_fleet = await new__fleet.save();

        // Notify Discord bot or external service
        try {
            await axios.post('http://localhost:3001/fleetcreated', saved_fleet); // Change URL as needed
        } catch (notifyErr) {
            console.error('Failed to notify Discord bot:', notifyErr.message);
            // Optionally: continue even if bot notification fails
        }

        res.status(201).json(saved_fleet);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update a fleet by ID
exports.updateFleet = async (req, res) => {
    try {
        // Find the __fleet first
        const __fleet = await FleetModel.findByPk(req.params.id);
        if (__fleet) {
            // Update the __fleet with new data from req.body
            const updated__fleet = await __fleet.update(req.body);
            res.status(200).json(updated__fleet);
        } else {
            res.status(404).send('Fleet not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to delete a fleet by ID
exports.deleteFleet = async (req, res) => {
    const fleetId = req.params.id;
    if (!fleetId) {
        return res.status(400).send('Fleet ID is required');
    }
    try {
        const fleet = await FleetModel.findByPk(fleetId);
        if (fleet) {
            await fleet.destroy();
            res.status(200).send('Fleet deleted');
        } else {
            res.status(404).send('Fleet not found');
        }
    } catch (error) {
        console.error(`Error deleting fleet: ${error.message}`);
        res.status(500).send(error.message);
    }
};

// Handle GET request for fleets by user ID
exports.getFleetById = async (req, res) => {
    const { id } = req.query;
    try {
        const fleets = await FleetModel.findAll({
            where: {
                id: id
            }
        });
        if (fleets.length > 0) {
            res.status(200).json(fleets);
        } else {
            res.status(404).send('No fleets found for the given ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getFleetByMember = async (req, res) => {
    const user_id = req.query.user_id;
    try {
      const entries = await sequelize.query(
        'SELECT * FROM user_fleets WHERE :user_id = ANY(member_ids)',
        {
          replacements: { user_id },
          type: sequelize.QueryTypes.SELECT
        }
      );      
      res.status(200).json(entries);
    } catch (error) {
      console.error('Error querying assistant shiplog:', error.message);
      res.status(500).send(error.message);
    }
};

// Handle GET request for fleets by user ID
exports.getFleetsByCommanderId = async (req, res) => {
    const { user_id } = req.query;
    try {
        const fleets = await FleetModel.findAll({
            where: {
                commander_id: user_id
            }
        });
        if (fleets.length > 0) {
            res.status(200).json(fleets);
        } else {
            res.status(404).send('No fleets found for the given user ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for fleets by user ID
exports.getFleetsByActivtyOrNot = async (req, res) => {
    const { activeOrNot } = req.query; //this is a boolean value
    try {
        const fleets = await FleetModel.findAll({
            where: {
                active: activeOrNot
            }
        });
        if (fleets.length > 0) {
            res.status(200).json(fleets);
        } else {
            res.status(404).send('No fleets found for the specified patch.');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};