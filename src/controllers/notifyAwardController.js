const pool = require('../config/database');
// Using built-in fetch (Node.js v18+)

// Handle GET request for all __badge
exports.notifyaward = async (req, res) => {
    try {
        // Accept data from either body or query
        const badgeName = req.body.badgeName || req.query.badgeName;
        const badgeDescription = req.body.badgeDescription || req.query.badgeDescription;
        const userName = req.body.userName || req.query.userName;
        const userId = req.body.userId || req.query.userId;

        if (!badgeName || !badgeDescription || !userName || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Forward the data to the Discord bot service using GET
        const params = new URLSearchParams({ badgeName, badgeDescription, userName, userId });
        const response = await fetch(`http://localhost:3001/notifyaward?${params.toString()}`);
        if (!response.ok) {
            throw new Error('Failed to notify award from Discord bot');
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
