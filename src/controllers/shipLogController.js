const pool = require('../config/database');
const sequelize = require('../config/database'); // Import the Sequelize instance
const ShipLog = require('../models/shipLogModel');
const axios = require('axios'); // Add this at the top if not already present
const { Op } = require('sequelize');



exports.getAll = async (req, res) => {
    try {
        const entries = await ShipLog.findAll();
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getByEntryId = async (req, res) => {
    const { id } = req.query;
    try {
        const entry = await ShipLog.findOne({
            where: {
                id: id
            }
        });

        if (entry) {
            res.status(200).json(entry); // Return the object directly
        } else {
            res.status(404).send('No ShipLog found for the given ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getByOwnerId = async (req, res) => {
    const { owner_id } = req.query;
    try {
        const entries = await ShipLog.findAll({
            where: {
                owner_id: owner_id
            }
        });
        if (entries.length > 0) {
            res.status(200).json(entries);
        } else {
            res.status(404).send('No ShipLog found for the given user ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getByCommanderId = async (req, res) => {
    const { commander } = req.query;
    try {
        const entries = await ShipLog.findAll({
            where: {
                commander: commander
            }
        });
        if (entries.length > 0) {
            res.status(200).json(entries);
        } else {
            res.status(404).send('No ShipLog found for the given user ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getByPatch = async (req, res) => {
    const { patch } = req.query;
    try {
        const entries = await ShipLog.findAll({
            where: {
                patch: patch
            }
        });
        if (entries.length > 0) {
            res.status(200).json(entries);
        } else {
            res.status(404).send('No ShipLog found for the given user ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getByCommanderIdAndPatch = async (req, res) => {
    const { commander, patch } = req.query;
    try {
      const entries = await ShipLog.findAll({
        where: {
            commander,
            patch
        }
      });
  
      if (entries.length > 0) {
        res.status(200).json(entries);
      } else {
        res.status(404).send('No ShipLog found for the given user ID and patch');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
};


exports.getCrewEntries = async (req, res) => {
    const user_id = req.query.user_id;
    try {
      const entries = await sequelize.query(
        'SELECT * FROM ship_logs WHERE :user_id = ANY(crew)',
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


exports.getCrewEntriesUserPatch = async (req, res) => {
    const { user_id, patch } = req.query;
    try {
        const entries = await sequelize.query(
            'SELECT * FROM ship_logs WHERE :user_id = ANY(crew) AND patch = :patch',
            {
                replacements: { user_id, patch },
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (entries.length > 0) {
            res.status(200).json(entries);
        } else {
            res.status(404).send('No ShipLog found for the given user ID and patch');
        }
    } catch (error) {
        console.error('Error querying assistant shiplog with patch:', error.message);
        res.status(500).send(error.message);
    }
};


exports.create = async (req, res) => {
    try {
        const saved_entry = await ShipLog.create(req.body);

        // Notify Discord bot or external service
        try {
            await axios.post('http://localhost:3001/fleetlog', saved_entry); // Change URL as needed
        } catch (notifyErr) {
            console.error('Failed to notify Discord bot:', notifyErr.message);
            // Optionally: continue even if bot notification fails
        }

        res.status(201).json(saved_entry);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.update = async (req, res) => {
    try {
        // Find the __badge first
        const entry = await ShipLog.findByPk(req.params.id);
        if (entry) {
            // Update the __badge with new data from req.body
            const updated_entry = await entry.update(req.body);
            res.status(200).json(updated_entry);
        } else {
            res.status(404).send('ShipLog not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.delete = async (req, res) => {
    const entryId = req.params.id;
    if (!entryId) {
        return res.status(400).send('ShipLog ID is required');
    }
    try {
        const entry = await ShipLog.findByPk(entryId);
        if (entry) {
            await entry.destroy();
            res.status(200).send('ShipLog deleted');
        } else {
            res.status(404).send('ShipLog not found');
        }
    } catch (error) {
        console.error(`Error deleting ShipLog: ${error.message}`);
        res.status(500).send(error.message);
    }
};

// Get logs by fleet active status
exports.getByFleetActiveStatus = async (req, res) => {
    const { active } = req.query;
    try {
        const entries = await ShipLog.findAll({
            include: [{
                association: 'Fleet',
                where: { active: active === 'true' }
            }]
        });
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get logs with top kills
exports.getTopKills = async (req, res) => {
    try {
        const entries = await ShipLog.findAll({
            order: [['total_kills', 'DESC']],
            limit: 10
        });
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get logs with top damages_value
exports.getTopDamages = async (req, res) => {
    try {
        const entries = await ShipLog.findAll({
            order: [['damages_value', 'DESC']],
            limit: 10
        });
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get recent logs by fleet ID
exports.getRecentByFleetId = async (req, res) => {
    const { fleet_id } = req.query;
    if (!fleet_id) {
        return res.status(400).send('fleet_id is required');
    }
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    try {
        const entries = await ShipLog.findAll({
            where: {
                fleet_id: fleet_id,
                created_at: {
                    [sequelize.Sequelize.Op.gte]: threeMonthsAgo
                }
            }
        });
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get top fleets by patch
exports.getTopFleetsByPatch = async (req, res) => {
    const { patch } = req.query;
    if (!patch) {
        return res.status(400).send('patch is required');
    }
    try {
        const { fn, col } = require('sequelize');
        const results = await ShipLog.findAll({
            attributes: [
                'fleet_id',
                [fn('COUNT', col('fleet_id')), 'entry_count']
            ],
            where: { patch },
            group: ['fleet_id'],
            order: [[fn('COUNT', col('fleet_id')), 'DESC']],
            limit: 10
        });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getEntriesByTimeframe = async (req, res) => {
    const { start, end } = req.query;
    if (!start || !end) {
        return res.status(400).send('Start and end timestamps are required');
    }
    try {
        const entries = await ShipLog.findAll({
            where: {
                created_at: {
                    [require('sequelize').Op.between]: [new Date(start), new Date(end)]
                }
            }
        });
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

