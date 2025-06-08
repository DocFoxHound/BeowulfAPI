const pool = require('../config/database');
const sequelize = require('../config/database'); // Import the Sequelize instance
const BlackBox = require('../models/blackBoxModel');



exports.getAll = async (req, res) => {
    try {
        const entries = await BlackBox.findAll();
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getByEntryId = async (req, res) => {
    const { id } = req.query;
    try {
        const entry = await BlackBox.findOne({
            where: {
                id: id
            }
        });

        if (entry) {
            res.status(200).json(entry); // Return the object directly
        } else {
            res.status(404).send('No BlackBox found for the given ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getByUserId = async (req, res) => {
    const { user_id } = req.query;
    try {
        const entries = await BlackBox.findAll({
            where: {
                user_id: user_id
            }
        });
        if (entries.length > 0) {
            res.status(200).json(entries);
        } else {
            res.status(404).send('No BlackBox found for the given user ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getByPatch = async (req, res) => {
    const { patch } = req.query;
    try {
        const entries = await BlackBox.findAll({
            where: {
                patch: patch
            }
        });
        if (entries.length > 0) {
            res.status(200).json(entries);
        } else {
            res.status(404).send('No BlackBox found for the given user ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getByUserIdAndPatch = async (req, res) => {
    const { user_id, patch } = req.query;
    try {
      const entries = await BlackBox.findAll({
        where: {
          user_id,
          patch
        }
      });
  
      if (entries.length > 0) {
        res.status(200).json(entries);
      } else {
        res.status(404).send('No BlackBox found for the given user ID and patch');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
};


exports.getAssistantEntries = async (req, res) => {
    const user_id = req.query.user_id;
    try {
      const entries = await sequelize.query(
        'SELECT * FROM black_box WHERE :user_id = ANY(assists)',
        {
          replacements: { user_id },
          type: sequelize.QueryTypes.SELECT
        }
      );      
      res.status(200).json(entries);
    } catch (error) {
      console.error('Error querying assistant blackbox:', error.message);
      res.status(500).send(error.message);
    }
};


exports.getAssistantEntriesUserPatch = async (req, res) => {
    const { user_id, patch } = req.query;
    try {
        const entries = await sequelize.query(
            'SELECT * FROM black_box WHERE :user_id = ANY(assists) AND patch = :patch',
            {
                replacements: { user_id, patch },
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (entries.length > 0) {
            res.status(200).json(entries);
        } else {
            res.status(404).send('No BlackBox found for the given user ID and patch');
        }
    } catch (error) {
        console.error('Error querying assistant blackbox with patch:', error.message);
        res.status(500).send(error.message);
    }
};


exports.create = async (req, res) => {
    try {
        const new_entry = new BlackBox(req.body);
        const saved_entry = await new_entry.save();
        res.status(201).json(saved_entry);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.update = async (req, res) => {
    try {
        // Find the __badge first
        const entry = await BlackBox.findByPk(req.params.id);
        if (entry) {
            // Update the __badge with new data from req.body
            const updated_entry = await entry.update(req.body);
            res.status(200).json(updated_entry);
        } else {
            res.status(404).send('BlackBox not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.delete = async (req, res) => {
    const entryId = req.params.id;
    if (!entryId) {
        return res.status(400).send('BlackBox ID is required');
    }
    try {
        const entry = await BlackBox.findByPk(entryId);
        if (entry) {
            await entry.destroy();
            res.status(200).send('BlackBox deleted');
        } else {
            res.status(404).send('BlackBox not found');
        }
    } catch (error) {
        console.error(`Error deleting BlackBox: ${error.message}`);
        res.status(500).send(error.message);
    }
};


exports.getUserKillsBeforeTimestamp = async (req, res) => {
    const { user_id, timestamp } = req.query;
    if (!user_id || !timestamp) {
        return res.status(400).send('user_id and timestamp are required');
    }
    try {
        // Calculate one hour before the given timestamp
        const endTime = new Date(timestamp);
        const startTime = new Date(endTime.getTime() - 60 * 60 * 1000);

        const entries = await BlackBox.findAll({
            where: {
                user_id: user_id,
                timestamp: {
                    [require('sequelize').Op.between]: [startTime, endTime]
                }
            }
        });

        if (entries.length > 0) {
            res.status(200).json(entries);
        } else {
            res.status(404).send('No kills found for the given user and time window');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getByUserIdPatchGameMode = async (req, res) => {
    const { user_id, patch, game_mode } = req.query;
    if (!user_id || !patch || !game_mode) {
        return res.status(400).send('user_id, patch, and game_mode are required');
    }
    try {
        const entries = await BlackBox.findAll({
            where: {
                user_id,
                patch,
                game_mode
            }
        });
        if (entries.length > 0) {
            res.status(200).json(entries);
        } else {
            res.status(404).send('No BlackBox found for the given user_id, patch, and game_mode');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getEntriesBetweenTimestamps = async (req, res) => {
    const { start, end } = req.query;
    if (!start || !end) {
        return res.status(400).send('start and end timestamps are required');
    }
    try {
        const entries = await BlackBox.findAll({
            where: {
                timestamp: {
                    [require('sequelize').Op.between]: [new Date(start), new Date(end)]
                }
            }
        });
        if (entries.length > 0) {
            res.status(200).json(entries);
        } else {
            res.status(404).send('No BlackBox entries found in the given time range');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getACGameModeCount = async (req, res) => {
    try {
        const count = await BlackBox.count({
            where: {
                game_mode: "AC"
            }
        });
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getPUGameModeCount = async (req, res) => {
    try {
        const count = await BlackBox.count({
            where: {
                game_mode: "PU"
            }
        });
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getShipKillCount = async (req, res) => {
    try {
        const { Op } = require('sequelize');
        const count = await BlackBox.count({
            where: {
                ship_killed: {
                    [Op.ne]: "FPS"
                }
            }
        });
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getFPSKillCount = async (req, res) => {
    try {
        const count = await BlackBox.count({
            where: {
                ship_killed: "FPS"
            }
        });
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getTotalValueSum = async (req, res) => {
    try {
        const { fn } = require('sequelize');
        const result = await BlackBox.findOne({
            attributes: [[fn('SUM', sequelize.col('value')), 'total_sum']]
        });
        const total_sum = result.dataValues.total_sum || 0;
        res.status(200).json({ total_sum: parseFloat(total_sum) });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getTop10ACShipKillersByPatch = async (req, res) => {
    const { patch } = req.query;
    if (!patch) {
        return res.status(400).send('patch is required');
    }
    try {
        const { Op, fn, col } = require('sequelize');
        const results = await BlackBox.findAll({
            attributes: [
                'user_id',
                [fn('COUNT', col('user_id')), 'kill_count']
            ],
            where: {
                patch: patch,
                game_mode: 'AC',
                ship_killed: { [Op.ne]: 'FPS' }
            },
            group: ['user_id'],
            order: [[fn('COUNT', col('user_id')), 'DESC']],
            limit: 10
        });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getTop10ACFPSKillersByPatch = async (req, res) => {
    const { patch } = req.query;
    if (!patch) {
        return res.status(400).send('patch is required');
    }
    try {
        const { fn, col } = require('sequelize');
        const results = await BlackBox.findAll({
            attributes: [
                'user_id',
                [fn('COUNT', col('user_id')), 'kill_count']
            ],
            where: {
                patch: patch,
                game_mode: 'AC',
                ship_killed: 'FPS'
            },
            group: ['user_id'],
            order: [[fn('COUNT', col('user_id')), 'DESC']],
            limit: 10
        });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getTop10PUShipKillersByPatch = async (req, res) => {
    const { patch } = req.query;
    if (!patch) {
        return res.status(400).send('patch is required');
    }
    try {
        const { Op, fn, col } = require('sequelize');
        const results = await BlackBox.findAll({
            attributes: [
                'user_id',
                [fn('COUNT', col('user_id')), 'kill_count']
            ],
            where: {
                patch: patch,
                game_mode: 'PU',
                ship_killed: { [Op.ne]: 'FPS' }
            },
            group: ['user_id'],
            order: [[fn('COUNT', col('user_id')), 'DESC']],
            limit: 10
        });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getTop10PUFPSKillersByPatch = async (req, res) => {
    const { patch } = req.query;
    if (!patch) {
        return res.status(400).send('patch is required');
    }
    try {
        const { fn, col } = require('sequelize');
        const results = await BlackBox.findAll({
            attributes: [
                'user_id',
                [fn('COUNT', col('user_id')), 'kill_count']
            ],
            where: {
                patch: patch,
                game_mode: 'PU',
                ship_killed: 'FPS'
            },
            group: ['user_id'],
            order: [[fn('COUNT', col('user_id')), 'DESC']],
            limit: 10
        });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get all FPS kills by patch
exports.getAllFPSKillsByPatch = async (req, res) => {
    const { patch } = req.query;
    if (!patch) return res.status(400).send('patch is required');
    try {
        const entries = await BlackBox.findAll({
            where: {
                patch,
                ship_killed: 'FPS'
            }
        });
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get all ship kills by patch (excluding FPS)
exports.getAllShipKillsByPatch = async (req, res) => {
    const { patch } = req.query;
    if (!patch) return res.status(400).send('patch is required');
    try {
        const { Op } = require('sequelize');
        const entries = await BlackBox.findAll({
            where: {
                patch,
                ship_killed: { [Op.ne]: 'FPS' }
            }
        });
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get newest 100 FPS kills by patch
exports.getNewest100FPSKillsByPatch = async (req, res) => {
    const { patch } = req.query;
    if (!patch) return res.status(400).send('patch is required');
    try {
        const entries = await BlackBox.findAll({
            where: {
                patch,
                ship_killed: 'FPS'
            },
            order: [['timestamp', 'DESC']],
            limit: 100
        });
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get newest 100 ship kills by patch (excluding FPS)
exports.getNewest100ShipKillsByPatch = async (req, res) => {
    const { patch } = req.query;
    if (!patch) return res.status(400).send('patch is required');
    try {
        const { Op } = require('sequelize');
        const entries = await BlackBox.findAll({
            where: {
                patch,
                ship_killed: { [Op.ne]: 'FPS' }
            },
            order: [['timestamp', 'DESC']],
            limit: 100
        });
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

