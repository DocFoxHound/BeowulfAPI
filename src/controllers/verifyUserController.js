const pool = require('../config/database');
// Using built-in fetch (Node.js v18+)

// Handle GET request for all __badge
exports.verifyUser = async (req, res) => {
    try {
        const handle = req.body.handle || req.query.handle;
        const userId = req.body.userId || req.query.userId;
        if (!handle || !userId) {
            return res.status(400).json({ error: 'Missing required fields: handle and userId' });
        }
        const response = await fetch('http://localhost:3001/verifyuser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ handle, userId })
        });
        const data = await response.json();
        if (!response.ok) {
            // If the response contains an error string, return it
            return res.status(response.status).json({ error: data.error || 'Failed to verify user from Discord bot' });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
