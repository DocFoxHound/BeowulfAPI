const pool = require('../config/database');
const PlayerStats = require('../models/playerStatsModel');

// Handle GET request for all player stats
exports.getAllPlayerStats = async (req, res) => {
    try {
        const playerStats = await PlayerStats.findAll();
        res.status(200).json(playerStats);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for player stats by user_id
exports.getPlayerStats = async (req, res) => {
    try {
        const { user_id } = req.params;
        const playerStats = await PlayerStats.findOne({ where: { user_id } });
        if (!playerStats) {
            return res.status(404).json({ message: 'Player stats not found' });
        }
        res.status(200).json(playerStats);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Refresh the playerstats materialized view
exports.refreshPlayerStatsView = async (req, res) => {
    try {
        await PlayerStats.sequelize.query('REFRESH MATERIALIZED VIEW player_stats');
        res.status(200).json({ message: 'player_stats materialized view refreshed' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};