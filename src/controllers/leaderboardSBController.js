const pool = require('../config/database');
const LeaderboardSB = require('../models/leaderboardSBModel');

// GET all leaderboard entries
exports.getAllLeaderboardEntries = async (req, res) => {
    try {
        const entries = await LeaderboardSB.findAll();
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// GET leaderboard entry by ID
exports.getLeaderboardEntryById = async (req, res) => {
    try {
        const entry = await LeaderboardSB.findByPk(req.params.id);
        if (entry) {
            res.status(200).json(entry);
        } else {
            res.status(404).send('Leaderboard entry not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// POST create a new leaderboard entry
exports.createLeaderboardEntry = async (req, res) => {
    try {
        const newEntry = await LeaderboardSB.create(req.body);
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// PUT update a leaderboard entry by ID
exports.updateLeaderboardEntry = async (req, res) => {
    try {
        const entry = await LeaderboardSB.findByPk(req.params.id);
        if (entry) {
            const updatedEntry = await entry.update(req.body);
            res.status(200).json(updatedEntry);
        } else {
            res.status(404).send('Leaderboard entry not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// DELETE a leaderboard entry by ID
exports.deleteLeaderboardEntry = async (req, res) => {
    try {
        const entry = await LeaderboardSB.findByPk(req.params.id);
        if (entry) {
            await entry.destroy();
            res.status(200).send('Leaderboard entry deleted');
        } else {
            res.status(404).send('Leaderboard entry not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// POST bulk create leaderboard entries
exports.createLeaderboardEntriesBulk = async (req, res) => {
    try {
        let entries = [];
        if (Array.isArray(req.body)) {
            entries = req.body.map(parseLeaderboardEntry);
        } else if (req.body.data && Array.isArray(req.body.data.resultset)) {
            entries = req.body.data.resultset.map(parseLeaderboardEntry);
        } else {
            return res.status(400).send('Invalid input format: expected array or data.resultset');
        }
        const newEntries = await LeaderboardSB.bulkCreate(entries);
        res.status(201).json(newEntries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Utility to convert string fields to correct types for the model
function parseLeaderboardEntry(entry) {
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