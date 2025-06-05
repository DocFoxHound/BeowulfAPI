const pool = require('../config/database');
const FleetModel = require('../models/userFleetModel');
const axios = require('axios'); // Add this line
const sequelize = require('../config/database');

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
            await axios.post('http://localhost:3001/fleetcreated', saved_fleet);
        } catch (notifyErr) {
            console.error('Failed to notify Discord bot:', notifyErr.message);
        }

        // Notify commander add
        try {
            await axios.post('http://localhost:3001/fleetcommanderchange', {
                ...saved_fleet.toJSON(),
                action: "add"
            });
        } catch (err) {
            console.error('Failed to notify commander add:', err.message);
        }

        res.status(201).json(saved_fleet);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update a fleet by ID
// for adding a member,detect add_member in the request body
// for removing a member, detect remove_member
// for closing a fleet detect close_fleet
// for taking command, detect take_command
// for editing a fleet, detect edit_fleet
// for logging fleet activity, detect log_fleet_activity
exports.updateFleet = async (req, res) => {
    try {
        const fleetId = req.params.id;
        const { action, changed_user_id, updated_at: clientUpdatedAt, ...updateFields } = req.body;

        if (!clientUpdatedAt) {
            return res.status(400).send('Missing created_at for version control');
        }

        // Fetch the fleet
        const __fleet = await FleetModel.findByPk(fleetId);
        if (!__fleet) {
            return res.status(404).send('Fleet not found');
        }

        // Check version
        if (String(__fleet.created_at) !== String(clientUpdatedAt)) {
            return res.status(409).send('Fleet has been modified by another user. Please refresh and try again.');
        }

        // Update created_at for new version
        const newCreatedAt = Date.now();
        updateFields.created_at = newCreatedAt;

        const oldCommander = __fleet.commander_id;
        const updated__fleet = await __fleet.update(updateFields);
        const newCommander = updated__fleet.commander_id;

        // Handle specific actions
        if (action === "add_member" || action === "remove_member") {
            // Notify member change
            try {
                await axios.post('http://localhost:3001/fleetmemberchange', {
                    ...updated__fleet.toJSON(),
                    action,
                    changed_user_id
                });
            } catch (err) {
                console.error(`Failed to notify fleet member ${action}:`, err.message);
            }
        } else if (action === "close_fleet") {
            // Notify closing fleet
            try {
                await axios.post('http://localhost:3001/fleetcommanderchange', {
                    ...__fleet.toJSON(),
                    commander_id: changed_user_id,
                    action: "close"
                });
            } catch (err) {
                console.error(`Failed to notify fleet commander ${action}:`, err.message);
            }
        } else if (oldCommander !== newCommander) { //promoting someone else to commander
            // Remove old commander
            try {
                await axios.post('http://localhost:3001/fleetcommanderchange', {
                    ...updated__fleet.toJSON(),
                    commander_id: oldCommander,
                    action: "remove"
                });
            } catch (err) {
                console.error('Failed to notify commander remove:', err.message);
            }
            // Add new commander
            try {
                await axios.post('http://localhost:3001/fleetcommanderchange', {
                    ...updated__fleet.toJSON(),
                    commander_id: newCommander,
                    action: "add"
                });
            } catch (err) {
                console.error('Failed to notify commander add:', err.message);
            }
        }
        // For edit_fleet or log_fleet_activity, just update, no extra POST

        res.status(200).json(updated__fleet);
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
      const [entry] = await sequelize.query(
        'SELECT * FROM user_fleets WHERE :user_id = ANY(members_ids) LIMIT 1',
        {
          replacements: { user_id },
          type: sequelize.QueryTypes.SELECT
        }
      );
      if (entry) {
        res.status(200).json(entry);
      } else {
        res.status(404).send('No fleet found for the given member');
      }
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