const { Op } = require('sequelize');
const VoiceChannelSession = require('../models/voiceChannelSessionModel');

const MAX_LIMIT = 500;

function parseMetadata(raw) {
    if (raw === undefined || raw === null || raw === '') return {};
    if (typeof raw === 'object' && !Array.isArray(raw)) return raw;
    if (typeof raw === 'string') {
        try {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
                return parsed;
            }
        } catch (err) {
            const error = new Error('metadata must be valid JSON object');
            error.statusCode = 400;
            throw error;
        }
    }
    const error = new Error('metadata must be an object');
    error.statusCode = 400;
    throw error;
}

function parseDateValue(value, fieldName) {
    if (value === undefined || value === null || value === '') return undefined;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        const error = new Error(`Invalid ${fieldName} value`);
        error.statusCode = 400;
        throw error;
    }
    return date;
}

function coerceLimit(value) {
    if (value === undefined) return 100;
    const num = Number(value);
    if (Number.isNaN(num) || num <= 0) return 100;
    return Math.min(Math.floor(num), MAX_LIMIT);
}

function coerceOffset(value) {
    if (value === undefined) return 0;
    const num = Number(value);
    if (Number.isNaN(num) || num < 0) return 0;
    return Math.floor(num);
}

function sendError(res, err) {
    if (err && err.statusCode) {
        return res.status(err.statusCode).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message || 'Unexpected error' });
}

exports.list = async (req, res) => {
    try {
        const { guild_id, channel_id, is_active } = req.query;
        const where = {};
        if (guild_id) where.guild_id = guild_id;
        if (channel_id) where.channel_id = channel_id;
        if (typeof is_active === 'string') {
            if (is_active === 'true') {
                where.ended_at = { [Op.is]: null };
            } else if (is_active === 'false') {
                where.ended_at = { [Op.not]: null };
            }
        }

        const limit = coerceLimit(req.query.limit);
        const offset = coerceOffset(req.query.offset);

        const rows = await VoiceChannelSession.findAll({
            where,
            limit,
            offset,
            order: [['started_at', 'DESC']]
        });
        res.json(rows);
    } catch (err) {
        sendError(res, err);
    }
};

exports.getById = async (req, res) => {
    try {
        const row = await VoiceChannelSession.findByPk(req.params.id);
        if (!row) return res.status(404).json({ error: 'Not found' });
        res.json(row);
    } catch (err) {
        sendError(res, err);
    }
};

exports.getActive = async (_req, res) => {
    try {
        const rows = await VoiceChannelSession.findAll({
            where: { ended_at: { [Op.is]: null } },
            order: [['started_at', 'DESC']]
        });
        res.json(rows);
    } catch (err) {
        sendError(res, err);
    }
};

exports.getLastHour = async (_req, res) => {
    try {
        const cutoff = new Date(Date.now() - 60 * 60 * 1000);
        const rows = await VoiceChannelSession.findAll({
            where: {
                [Op.or]: [
                    { started_at: { [Op.gte]: cutoff } },
                    { ended_at: { [Op.gte]: cutoff } }
                ]
            },
            order: [['started_at', 'DESC']]
        });
        res.json(rows);
    } catch (err) {
        sendError(res, err);
    }
};

exports.create = async (req, res) => {
    try {
        const { guild_id, channel_id } = req.body;
        if (!guild_id || !channel_id) {
            return res.status(400).json({ error: 'guild_id and channel_id are required' });
        }

        const payload = {
            guild_id,
            channel_id,
            channel_name: req.body.channel_name || null,
            created_by: req.body.created_by || null,
            created_by_name: req.body.created_by_name || null,
            metadata: req.body.metadata === undefined ? {} : parseMetadata(req.body.metadata),
            created_at: new Date(),
            updated_at: new Date()
        };

        const startedAt = parseDateValue(req.body.started_at, 'started_at');
        if (startedAt) payload.started_at = startedAt;
        const endedAt = parseDateValue(req.body.ended_at, 'ended_at');
        if (endedAt) payload.ended_at = endedAt;

        const created = await VoiceChannelSession.create(payload);
        res.status(201).json(created);
    } catch (err) {
        sendError(res, err);
    }
};

exports.update = async (req, res) => {
    try {
        const updates = {};
        if (req.body.guild_id !== undefined) updates.guild_id = req.body.guild_id;
        if (req.body.channel_id !== undefined) updates.channel_id = req.body.channel_id;
        if (req.body.channel_name !== undefined) updates.channel_name = req.body.channel_name;
        if (req.body.created_by !== undefined) updates.created_by = req.body.created_by;
        if (req.body.created_by_name !== undefined) updates.created_by_name = req.body.created_by_name;
        if (req.body.started_at !== undefined) updates.started_at = parseDateValue(req.body.started_at, 'started_at');
        if (req.body.ended_at !== undefined) updates.ended_at = req.body.ended_at === null ? null : parseDateValue(req.body.ended_at, 'ended_at');
        if (req.body.metadata !== undefined) updates.metadata = parseMetadata(req.body.metadata);

        if (!Object.keys(updates).length) {
            return res.status(400).json({ error: 'No fields provided to update' });
        }
        updates.updated_at = new Date();

        const [count, rows] = await VoiceChannelSession.update(updates, {
            where: { id: req.params.id },
            returning: true
        });
        if (!count) return res.status(404).json({ error: 'Not found' });
        res.json(rows[0]);
    } catch (err) {
        sendError(res, err);
    }
};

exports.remove = async (req, res) => {
    try {
        const count = await VoiceChannelSession.destroy({ where: { id: req.params.id } });
        if (!count) return res.status(404).json({ error: 'Not found' });
        res.json({ deleted: true });
    } catch (err) {
        sendError(res, err);
    }
};
