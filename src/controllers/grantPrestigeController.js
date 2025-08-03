const pool = require('../config/database');
// Using built-in fetch (Node.js v18+)

// Handle GET request for all __badge
exports.grantPrestige = async (req, res) => {
    try {
        const user_id = req.body.user_id || req.query.user_id;
        const prestige_name = req.body.prestige_name || req.query.prestige_name;
        const prestige_level = req.body.prestige_level || req.query.prestige_level;
        if (!user_id || !prestige_name || prestige_level === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const response = await fetch('http://localhost:3001/grantprestige', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id, prestige_name, prestige_level })
        });
        if (!response.ok) {
            throw new Error('Failed to grant prestige from Discord bot');
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
