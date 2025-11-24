const PlayerTrackerModel = require('../models/playerTrackerModel');

exports.getAll = async (_req, res) => {
    try {
        const players = await PlayerTrackerModel.findAll();
        res.json(players);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getByUserId = async (req, res) => {
    try {
        const players = await PlayerTrackerModel.findAll({ where: { user_id: req.params.user_id } });
        res.json(players);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getByAuthorId = async (req, res) => {
    try {
        const players = await PlayerTrackerModel.findAll({ where: { author_id: req.params.author_id } });
        res.json(players);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const player = await PlayerTrackerModel.findByPk(req.params.id);
        if (!player) {
            return res.status(404).json({ error: 'Player tracker not found' });
        }
        res.json(player);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const created = await PlayerTrackerModel.create(req.body);
        res.status(201).json(created);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const tracker = await PlayerTrackerModel.findByPk(req.params.id);
        if (!tracker) {
            return res.status(404).json({ error: 'Player tracker not found' });
        }
        const updated = await tracker.update(req.body);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const tracker = await PlayerTrackerModel.findByPk(req.params.id);
        if (!tracker) {
            return res.status(404).json({ error: 'Player tracker not found' });
        }
        await tracker.destroy();
        res.json({ deleted: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};