const { Op } = require('sequelize');
const pool = require('../config/database');
const VoiceChannelSessionsModel = require('../models/voiceChannelSessionsModel'); // Assuming you have a model for voiceSession

// Handle GET request for all __voiceSession
exports.getAllVoiceSessions = async (req, res) => {
    try {
        const __voiceSession = await VoiceChannelSessionsModel.findAll();
        res.status(200).json(__voiceSession);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getAllVoiceSessionsLastHour = async (req, res) => {
    try {
        const __voiceSession = await VoiceChannelSessionsModel.findAll({
            where: {
                joined_at: {
                    [Op.gte]: new Date(Date.now() - 60 * 60 * 1000) // Last hour
                }
            }
        });
        res.status(200).json(__voiceSession);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for all voice sessions within a provided timeframe
exports.getVoiceSessionsWithinTimeframe = async (req, res) => {
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
        const sessions = await VoiceChannelSessionsModel.findAll({
            where: {
                joined_at: {
                    [Op.gte]: startDate,
                    [Op.lte]: endDate
                }
            }
        });
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for all voice sessions within a provided timeframe by user_id
exports.getVoiceSessionsWithinTimeframeByUserId = async (req, res) => {
    const { start, end, user_id } = req.query;
    if (!start || !end || !user_id) {
        return res.status(400).send('Start, end, and user_id query parameters are required');
    }
    try {
        const startDate = new Date(start);
        const endDate = new Date(end);
        if (isNaN(startDate) || isNaN(endDate)) {
            return res.status(400).send('Invalid date format for start or end');
        }
        const { Op } = require('sequelize');
        const sessions = await VoiceChannelSessionsModel.findAll({
            where: {
                user_id: user_id,
                joined_at: {
                    [Op.gte]: startDate,
                    [Op.lte]: endDate
                }
            }
        });
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for all active voice sessions
exports.getAllActiveVoiceSessions = async (req, res) => {
    try {
        const __voiceSession = await VoiceChannelSessionsModel.findAll({
            where: {
                left_at: null
            }
        });
        res.status(200).json(__voiceSession);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createVoiceSession = async (req, res) => {
    try {
        const new__voiceSession = new VoiceChannelSessionsModel(req.body);
        const saved_voiceSession = await new__voiceSession.save();
        res.status(201).json(saved_voiceSession);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateVoiceSession = async (req, res) => {
    try {
        // Find the __voiceSession first
        const __voiceSession = await VoiceChannelSessionsModel.findByPk(req.params.id);
        if (__voiceSession) {
            // Update the __voiceSession with new data from req.body
            const updated__voiceSession = await __voiceSession.update(req.body);
            res.status(200).json(updated__voiceSession);
        } else {
            res.status(404).send('voiceSession not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteVoiceSession = async (req, res) => {
    const voiceSessionId = req.params.id;
    if (!voiceSessionId) {
        return res.status(400).send('voiceSession ID is required');
    }
    try {
        const voiceSession = await VoiceChannelSessionsModel.findByPk(voiceSessionId);
        if (voiceSession) {
            await voiceSession.destroy();
            res.status(200).send('voiceSession deleted');
        } else {
            res.status(404).send('voiceSession not found');
        }
    } catch (error) {
        console.error(`Error deleting voiceSession: ${error.message}`);
        res.status(500).send(error.message);
    }
};
