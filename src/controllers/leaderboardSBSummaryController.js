const sequelize = require('../config/database'); // Use sequelize, not pool

// GET all player summaries
exports.getAllPlayerSummaries = async (req, res) => {
    try {
        const result = await sequelize.query('SELECT * FROM leaderboard_sb_player_summary', { type: sequelize.QueryTypes.SELECT });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// GET player summary by nickname
exports.getPlayerSummaryByNickname = async (req, res) => {
    try {
        const nickname = req.params.nickname;
        if (!nickname) {
            return res.status(400).send('Nickname parameter is required');
        }
        // Debug log to verify nickname
        console.log('\n\nNickname param:', nickname);
        // Use ? for parameter and pass replacements
        const results = await sequelize.query(
            'SELECT * FROM leaderboard_sb_player_summary WHERE nickname = ?',
            { replacements: [nickname], type: sequelize.QueryTypes.SELECT }
        );
        console.log('Query results:', results);
        // results is an array of objects, not an array inside an array
        if (Array.isArray(results) && results.length > 0) {
            res.status(200).json(results[0]);
            return;
        }
        // Try case-insensitive search if not found
        const ciResults = await sequelize.query(
            'SELECT * FROM leaderboard_sb_player_summary WHERE LOWER(nickname) = LOWER(?)',
            { replacements: [nickname], type: sequelize.QueryTypes.SELECT }
        );
        console.log('\n\nCase-insensitive results:', ciResults);
        if (Array.isArray(ciResults) && ciResults.length > 0) {
            res.status(200).json(ciResults[0]);
        } else {
            res.status(404).send('Player summary not found');
        }
    } catch (error) {
        console.error('Error in getPlayerSummaryByNickname:', error);
        res.status(500).send(error.message);
    }
};

