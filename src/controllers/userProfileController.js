const UserProfile = require('../models/userProfileModel');

exports.list = async (req, res) => {
    try {
        const rows = await UserProfile.findAll();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.get = async (req, res) => {
    try {
        const row = await UserProfile.findByPk(req.params.user_id);
        if (!row) return res.status(404).json({ error: 'Not found' });
        res.json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.upsert = async (req, res) => {
    try {
        const user_id = req.params.user_id || req.body.user_id;
        if (!user_id) return res.status(400).json({ error: 'user_id required' });
        const [row] = await UserProfile.upsert({ ...req.body, user_id }, { returning: true });
        res.json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const count = await UserProfile.destroy({ where: { user_id: req.params.user_id } });
        if (!count) return res.status(404).json({ error: 'Not found' });
        res.json({ deleted: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
