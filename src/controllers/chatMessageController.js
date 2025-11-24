const ChatMessage = require('../models/chatMessageModel');

exports.list = async (req, res) => {
    try {
        const { guild_id, channel_id, user_id, limit = 50, offset = 0 } = req.query;
        const where = {};
        if (guild_id) where.guild_id = guild_id;
        if (channel_id) where.channel_id = channel_id;
        if (user_id) where.user_id = user_id;

        const rows = await ChatMessage.findAll({ where, limit: Number(limit), offset: Number(offset), order: [['timestamp', 'DESC']] });
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.get = async (req, res) => {
    try {
        const row = await ChatMessage.findByPk(req.params.id);
        if (!row) return res.status(404).json({ error: 'Not found' });
        res.json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const data = { ...req.body };
        const required = ['guild_id', 'channel_id', 'user_id', 'content'];
        const missing = required.filter(k => data[k] == null || data[k] === '');
        if (missing.length) return res.status(400).json({ error: 'Missing required fields', missing });

        const created = await ChatMessage.create(data);
        res.status(201).json(created);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const count = await ChatMessage.destroy({ where: { id: req.params.id } });
        if (!count) return res.status(404).json({ error: 'Not found' });
        res.json({ deleted: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
