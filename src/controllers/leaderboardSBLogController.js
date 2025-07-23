const pool = require('../config/database');
const LeaderboardLogSBLog = require('../models/leaderboardSBLogModel');

// GET all LeaderboardLog entries
exports.getAllLeaderboardLogEntries = async (req, res) => {
    try {
        const entries = await LeaderboardLogSBLog.findAll();
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// GET LeaderboardLog entry by ID
exports.getLeaderboardLogEntryById = async (req, res) => {
    try {
        const entry = await LeaderboardLogSBLog.findByPk(req.params.id);
        if (entry) {
            res.status(200).json(entry);
        } else {
            res.status(404).send('LeaderboardLog entry not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// GET LeaderboardLog entry by ID
exports.getLeaderboardLogEntryByUserId = async (req, res) => {
    try {
        const entry = await LeaderboardLogSBLog.findOne({ where: { user_id: req.params.id } });
        if (entry) {
            res.status(200).json(entry);
        } else {
            res.status(404).send('LeaderboardLog entry not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// GET all LeaderboardLog entries within a provided timespan
exports.getLeaderboardLogEntriesByTimespan = async (req, res) => {
    const { start, end } = req.query;
    if (!start || !end) {
        return res.status(400).send('Missing required query parameters: start, end');
    }
    try {
        const entries = await LeaderboardLogSBLog.findAll({
            where: {
                createdAt: {
                    $gte: new Date(start),
                    $lte: new Date(end)
                }
            }
        });
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// POST create a new LeaderboardLog entry
exports.createLeaderboardLogEntry = async (req, res) => {
    try {
        const newEntry = await LeaderboardLogSBLog.create(req.body);
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// PUT update a LeaderboardLog entry by ID
exports.updateLeaderboardLogEntry = async (req, res) => {
    try {
        const entry = await LeaderboardLogSBLog.findByPk(req.params.id);
        if (entry) {
            const updatedEntry = await entry.update(req.body);
            res.status(200).json(updatedEntry);
        } else {
            res.status(404).send('LeaderboardLog entry not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// DELETE a LeaderboardLog entry by ID
exports.deleteLeaderboardLogEntry = async (req, res) => {
    try {
        const entry = await LeaderboardLogSBLog.findByPk(req.params.id);
        if (entry) {
            await entry.destroy();
            res.status(200).send('LeaderboardLog entry deleted');
        } else {
            res.status(404).send('LeaderboardLog entry not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// DELETE all LeaderboardLog entries
exports.deleteAllLeaderboardLogEntries = async (req, res) => {
    try {
        await LeaderboardLogSBLog.destroy({ where: {}, truncate: true });
        res.status(200).send('All LeaderboardLog entries deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// POST bulk create LeaderboardLog entries
exports.createLeaderboardLogEntriesBulk = async (req, res) => {
    try {
        let entries = [];
        if (Array.isArray(req.body)) {
            entries = req.body.map(parseLeaderboardLogEntry);
        } else if (req.body.data && Array.isArray(req.body.data.resultset)) {
            entries = req.body.data.resultset.map(parseLeaderboardLogEntry);
        } else {
            return res.status(400).send('Invalid input format: expected array or data.resultset');
        }
        const newEntries = await LeaderboardLogSBLog.bulkCreate(entries);
        res.status(201).json(newEntries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Utility to convert string fields to correct types for the model
function parseLeaderboardLogEntry(entry) {
    const intFields = [
        "kills", "deaths", "score", "damage_dealt", "damage_taken", "matches",
        "wins", "draws", "core_captures", "core_carrier_kills", "max_waves",
        "num_waves", "first_blood", "ace", "mvp", "captures", "shots_fired",
        "hits", "insignia_rank", "rating", "losses", "rank"
    ];
    const floatFields = [
        "rank_score", "best_lap", "score_minute", "damage_ratio",
        "kill_death_ratio", "win_loss_ratio", "accuracy"
    ];
    const intervalFields = [
        "flight_time", "best_race", "avg_flight_time"
    ];

    let parsed = { ...entry };

    intFields.forEach(field => {
        if (parsed[field] !== undefined && parsed[field] !== null && parsed[field] !== "") {
            parsed[field] = parseInt(parsed[field], 10);
        }
    });

    floatFields.forEach(field => {
        if (parsed[field] !== undefined && parsed[field] !== null && parsed[field] !== "") {
            parsed[field] = parseFloat(parsed[field]);
        }
    });

    intervalFields.forEach(field => {
        if (parsed[field] !== undefined && parsed[field] !== null && parsed[field] !== "") {
            parsed[field] = String(parsed[field]);
        }
    });

    return parsed;
}