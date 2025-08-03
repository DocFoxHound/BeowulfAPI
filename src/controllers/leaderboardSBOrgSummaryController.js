const pool = require('../config/database');

// GET all player summaries
exports.getAllOrgSummaries = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM leaderboard_sb_org_summary');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// GET player summary by nickname
exports.getOrgSummaryByName = async (req, res) => {
    try {
        const { nickname } = req.params;
        const result = await pool.query(
            'SELECT * FROM leaderboard_sb_org_summary WHERE name = $1',
            [nickname]
        );
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).send('Org summary not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

