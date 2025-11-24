const { Op } = require('sequelize');
const ListShips = require('../models/listShipsModel');

function normalizeId(value) {
    if (value === undefined || value === null || value === '') return null;
    if (typeof value === 'number') return value;
    const asNumber = Number(value);
    return Number.isFinite(asNumber) ? asNumber : null;
}

function normalizeStats(value) {
    if (value === undefined || value === null) return null;
    if (typeof value === 'object') return value;
    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (!trimmed.length) return null;
        try {
            const parsed = JSON.parse(trimmed);
            if (parsed && typeof parsed === 'object') return parsed;
        } catch (_) {
            return null;
        }
    }
    return null;
}

exports.list = async (req, res) => {
    try {
        const { category, type, name, search, limit = 50, offset = 0 } = req.query;
        const where = {};

        if (category) where.category = category;
        if (type) where.type = type;
        if (name) where.name = name;
        if (search) {
            where.name = { [Op.iLike]: `%${search}%` };
        }

        const rows = await ListShips.findAll({
            where,
            limit: Math.min(Number(limit) || 50, 200),
            offset: Number(offset) || 0,
            order: [['name', 'ASC']]
        });
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.get = async (req, res) => {
    try {
        const row = await ListShips.findByPk(req.params.id);
        if (!row) return res.status(404).json({ error: 'Not found' });
        res.json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const id = normalizeId(req.body.id);
        if (id === null) {
            return res.status(400).json({ error: 'id is required and must be numeric' });
        }

        const payload = {
            id,
            name: req.body.name ?? null,
            category: req.body.category ?? null,
            type: req.body.type ?? null,
            stats: normalizeStats(req.body.stats)
        };

        const created = await ListShips.create(payload);
        res.status(201).json(created);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const payload = {};
        if (req.body.name !== undefined) payload.name = req.body.name;
        if (req.body.category !== undefined) payload.category = req.body.category;
        if (req.body.type !== undefined) payload.type = req.body.type;
        if (req.body.stats !== undefined) payload.stats = normalizeStats(req.body.stats);

        const [count, [updated]] = await ListShips.update(payload, {
            where: { id: req.params.id },
            returning: true
        });

        if (!count) return res.status(404).json({ error: 'Not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await ListShips.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ error: 'Not found' });
        res.json({ deleted: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
