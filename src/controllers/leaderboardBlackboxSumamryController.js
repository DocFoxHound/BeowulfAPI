const sequelize = require('../config/database');

// Get leaderboard for a specific patch
exports.getLeaderboardByPatch = async (req, res) => {
  const { patch } = req.params;
  try {
    const result = await sequelize.query(
      `SELECT * FROM leaderboard_blackbox_summary WHERE patch = :patch`,
      { replacements: { patch }, type: sequelize.QueryTypes.SELECT }
    );
    res.json(result); // <-- return the whole array
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get stats for a specific player
exports.getPlayerStats = async (req, res) => {
  const { player_id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM leaderboard_blackbox_summary WHERE player_id = $1`,
      [player_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


