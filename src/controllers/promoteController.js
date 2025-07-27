const pool = require('../config/database');
// Using built-in fetch (Node.js v18+)

// Handle GET request for all __badge
exports.promote = async (req, res) => {
    try {
        const user_id = req.query.user_id || req.body.user_id;
        if (!user_id) {
            return res.status(400).json({ error: 'Missing user_id' });
        }
        const response = await fetch(`http://localhost:3001/promote?user_id=${user_id}`);
        if (!response.ok) {
            throw new Error('Failed to promote from Discord bot');
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
