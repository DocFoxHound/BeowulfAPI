const pool = require('../config/database');

// GET all player summaries
exports.getAllPlayerSummaries = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM leaderboard_sb_player_summary');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// GET player summary by nickname
exports.getPlayerSummaryByNickname = async (req, res) => {
    try {
        const { nickname } = req.params;
        const result = await pool.query(
            'SELECT * FROM leaderboard_sb_player_summary WHERE nickname = $1',
            [nickname]
        );
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).send('Player summary not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

