const pool = require('../config/database');
const RecentGatheringModel = require('../models/recentGatheringsModel');

// Handle GET request for all __recentGathering
exports.getAllRecentGatherings = async (req, res) => {
    try {
        const __recentGathering = await RecentGatheringModel.findAll();
        res.status(200).json(__recentGathering);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for all recent gatherings within a provided timeframe
exports.getRecentGatheringsWithinTimeframe = async (req, res) => {
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
        const gatherings = await RecentGatheringModel.findAll({
            where: {
                created_at: {
                    [Op.gte]: startDate,
                    [Op.lte]: endDate
                }
            }
        });
        res.status(200).json(gatherings);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createRecentGathering = async (req, res) => {
    try {
        const new__recentGathering = new RecentGatheringModel(req.body);
        const saved_recentGathering = await new__recentGathering.save();
        res.status(201).json(saved_recentGathering);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateRecentGathering = async (req, res) => {
    try {
        // Find the __recentGathering first
        const __recentGathering = await RecentGatheringModel.findByPk(req.params.id);
        if (__recentGathering) {
            // Update the __recentGathering with new data from req.body
            const updated__recentGathering = await __recentGathering.update(req.body);
            res.status(200).json(updated__recentGathering);
        } else {
            res.status(404).send('RecentGathering not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteRecentGathering = async (req, res) => {
    const recentGatheringId = req.params.id;
    if (!recentGatheringId) {
        return res.status(400).send('RecentGathering ID is required');
    }
    try {
        const recentGathering = await RecentGatheringModel.findByPk(recentGatheringId);
        if (recentGathering) {
            await recentGathering.destroy();
            res.status(200).send('RecentGathering deleted');
        } else {
            res.status(404).send('RecentGathering not found');
        }
    } catch (error) {
        console.error(`Error deleting recentGathering: ${error.message}`);
        res.status(500).send(error.message);
    }
};
