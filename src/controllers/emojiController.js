const pool = require('../config/database');
const BadgeModel = require('../models/badgeModel');
// Using built-in fetch (Node.js v18+)

// Handle GET request for all __badge
exports.getAllEmojis = async (req, res) => {
    try {
        const response = await fetch('http://localhost:3001/emojidata');
        if (!response.ok) {
            throw new Error('Failed to fetch emoji data from Discord bot');
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
