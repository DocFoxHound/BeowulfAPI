const { Op } = require('sequelize');
const RcoMiningData = require('../models/rcoMiningDataModel');

function toInt(value) {
    if (value === undefined) return undefined;
    if (value === null || value === '') return null;
    if (typeof value === 'number' && Number.isInteger(value)) return value;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? Math.trunc(parsed) : null;
}

function toFloat(value) {
    if (value === undefined) return undefined;
    if (value === null || value === '') return null;
    if (typeof value === 'number') return Number.isFinite(value) ? value : null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

function normalizePayload(body, { forUpdate = false } = {}) {
    const base = {};

    const copyFields = ['source_file', 'stat_grain', 'system_name', 'location_code', 'rock_type', 'ore_name'];
    copyFields.forEach(field => {
        if (!forUpdate || body[field] !== undefined) {
            base[field] = body[field] !== undefined ? (body[field] === null ? null : String(body[field]).trim()) : undefined;
        }
    });

    const intFields = ['scans', 'clusters', 'finds', 'cluster_min', 'cluster_max', 'cluster_med', 'rocks_min', 'rocks_max', 'rocks_med'];
    intFields.forEach(field => {
        if (!forUpdate || body[field] !== undefined) {
            base[field] = toInt(body[field]);
        }
    });

    const floatFields = ['mass_min', 'mass_max', 'mass_med', 'inst_min', 'inst_max', 'inst_med', 'res_min', 'res_max', 'res_med', 'ore_prob', 'ore_pct_min', 'ore_pct_max', 'ore_pct_med'];
    floatFields.forEach(field => {
        if (!forUpdate || body[field] !== undefined) {
            base[field] = toFloat(body[field]);
        }
    });

    return base;
}

exports.list = async (req, res) => {
    try {
        const { source_file, stat_grain, system_name, location_code, rock_type, ore_name, limit = 100, offset = 0, search } = req.query;
        const where = {};

        if (source_file) where.source_file = source_file;
        if (stat_grain) where.stat_grain = stat_grain;
        if (system_name) where.system_name = system_name;
        if (location_code) where.location_code = location_code;
        if (rock_type) where.rock_type = rock_type;
        if (ore_name) where.ore_name = ore_name;
        if (search) {
            const like = `%${search}%`;
            where[Op.or] = [
                { system_name: { [Op.iLike]: like } },
                { location_code: { [Op.iLike]: like } },
                { rock_type: { [Op.iLike]: like } },
                { ore_name: { [Op.iLike]: like } }
            ];
        }

        const rows = await RcoMiningData.findAll({
            where,
            limit: Math.min(Number(limit) || 100, 500),
            offset: Number(offset) || 0,
            order: [['id', 'DESC']]
        });

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.get = async (req, res) => {
    try {
        const row = await RcoMiningData.findByPk(req.params.id);
        if (!row) return res.status(404).json({ error: 'Not found' });
        res.json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const payload = normalizePayload(req.body);
        if (!payload.source_file || !payload.stat_grain) {
            return res.status(400).json({ error: 'source_file and stat_grain are required' });
        }

        const created = await RcoMiningData.create(payload);
        res.status(201).json(created);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const payload = normalizePayload(req.body, { forUpdate: true });
        const [count, [updated]] = await RcoMiningData.update(payload, {
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
        const deleted = await RcoMiningData.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ error: 'Not found' });
        res.json({ deleted: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
