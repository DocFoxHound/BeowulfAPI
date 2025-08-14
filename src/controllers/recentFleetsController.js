const pool = require('../config/database');
const RecentFleetsModel = require('../models/recentFleetsModel');
const { Op } = require('sequelize');

// Handle GET request for all __recentFleets
exports.getAllRecentFleets = async (req, res) => {
    try {
        const __recentFleets = await RecentFleetsModel.findAll();
        res.status(200).json(__recentFleets);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for all recent fleetss within a provided timeframe
exports.getRecentFleetsWithinTimeframe = async (req, res) => {
    const { start, end } = req.query;
    if (!start || !end) {
        return res.status(400).send('Start and end query parameters are required');
    }
    try {
        const startDate = new Date(start);
        const endDate = new Date(end);
        if (isNaN(startDate) || isNaN(endDate)) {
            return res.status(400).send('Invalid date format for start or end');
        }
        const { Op } = require('sequelize');
        const fleetss = await RecentFleetsModel.findAll({
            where: {
                timestamp: {
                    [Op.gte]: startDate,
                    [Op.lte]: endDate
                }
            }
        });
        res.status(200).json(fleetss);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for recentFleets by patch
exports.getRecentFleetsByPatch = async (req, res) => {
    const { patch } = req.query;
    if (!patch) {
        return res.status(400).send('Patch query parameter is required');
    }
    try {
        const fleets = await RecentFleetsModel.findAll({
            where: {
                patch: {
                    [Op.like]: `%${patch}%` // Use Op.iLike for PostgreSQL
                }
            }
        });
        res.status(200).json(fleets);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createRecentFleets = async (req, res) => {
    try {
        const new__recentFleets = new RecentFleetsModel(req.body);
        const saved_recentFleets = await new__recentFleets.save();
        res.status(201).json(saved_recentFleets);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateRecentFleets = async (req, res) => {
    try {
        // Find the __recentFleets first
        const __recentFleets = await RecentFleetsModel.findByPk(req.params.id);
        if (__recentFleets) {
            // Update the __recentFleets with new data from req.body
            const updated__recentFleets = await __recentFleets.update(req.body);
            res.status(200).json(updated__recentFleets);
        } else {
            res.status(404).send('RecentFleets not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteRecentFleets = async (req, res) => {
    const recentFleetsId = req.params.id;
    if (!recentFleetsId) {
        return res.status(400).send('RecentFleets ID is required');
    }
    try {
        const recentFleets = await RecentFleetsModel.findByPk(recentFleetsId);
        if (recentFleets) {
            await recentFleets.destroy();
            res.status(200).send('RecentFleets deleted');
        } else {
            res.status(404).send('RecentFleets not found');
        }
    } catch (error) {
        console.error(`Error deleting recentFleets: ${error.message}`);
        res.status(500).send(error.message);
    }
};

const sequelize = require('../config/database'); // This is your Sequelize instance

// GET recent fleets summary from view with patch, limit, offset
exports.getRecentFleetsSummary = async (req, res) => {
    try {
        const patch = req.query.patch ?? null;
        const limit = Math.min(parseInt(req.query.limit ?? "100", 10), 500);
        const offset = Math.max(parseInt(req.query.offset ?? "0", 10), 0);

        const patchEscaped = patch ? `'${patch.replace(/'/g, "''")}'` : 'NULL';

        const query = `
            SELECT *
            FROM recent_fleets_user_summary(${patchEscaped}::text)
            ORDER BY appearances DESC
            OFFSET ${offset}
            LIMIT ${limit}
        `;

        const rows = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// Handle GET request for a single RecentFleet by id
exports.getRecentFleetById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send('RecentFleets ID is required');
    }
    try {
        const fleet = await RecentFleetsModel.findByPk(id);
        if (!fleet) {
            return res.status(404).send('RecentFleets not found');
        }
        res.status(200).json(fleet);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
