const { Op } = require('sequelize');
const VoiceChannelSession = require('../models/voiceChannelSessionModel');

const MAX_LIMIT = 500;
const autoMigrate = process.env.VOICE_SESSIONS_AUTO_MIGRATE !== 'false';
let schemaReadyPromise = null;

async function ensureSchema() {
    if (!autoMigrate) return;
    if (!schemaReadyPromise) {
        schemaReadyPromise = (async () => {
            const qi = VoiceChannelSession.sequelize.getQueryInterface();
            try {
                await qi.describeTable('voice_channel_sessions');
                return true; // table already exists
            } catch (err) {
                const msg = err.message || '';
                const missing = err.original?.code === '42P01' || msg.includes('does not exist');
                if (!missing) throw err;
                await VoiceChannelSession.sync();
                return true;
            }
        })().catch(err => {
            schemaReadyPromise = null;
            throw err;
        });
    }
    return schemaReadyPromise;
}

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

function disableCache(res) {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');
    res.set('ETag', `voice-${Date.now()}-${Math.random().toString(36).slice(2)}`);
}

function parseSmallInt(value, fieldName) {
    if (value === undefined || value === null || value === '') return undefined;
    const num = Number(value);
    if (!Number.isInteger(num)) {
        const error = new Error(`${fieldName} must be an integer`);
        error.statusCode = 400;
        throw error;
    }
    if (num < -32768 || num > 32767) {
        const error = new Error(`${fieldName} must be between -32768 and 32767`);
        error.statusCode = 400;
        throw error;
    }
    return num;
}

function sendJson(res, payload, status = 200) {
    disableCache(res);
    return res.status(status).json(payload);
}

function sendError(res, err) {
    const status = err && err.statusCode ? err.statusCode : 500;
    return sendJson(res, { error: err.message || 'Unexpected error' }, status);
}

function parseRequiredDate(value, fieldName) {
    const date = parseDateValue(value, fieldName);
    if (!date) {
        const error = new Error(`${fieldName} query parameter is required`);
        error.statusCode = 400;
        throw error;
    }
    return date;
}

exports.list = async (req, res) => {
    try {
        await ensureSchema();
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
        sendJson(res, rows);
    } catch (err) {
        sendError(res, err);
    }
};

exports.getById = async (req, res) => {
    try {
        await ensureSchema();
        const row = await VoiceChannelSession.findByPk(req.params.id);
        if (!row) return sendJson(res, { error: 'Not found' }, 404);
        sendJson(res, row);
    } catch (err) {
        sendError(res, err);
    }
};

exports.getActive = async (_req, res) => {
    try {
        await ensureSchema();
        const rows = await VoiceChannelSession.findAll({
            where: { ended_at: { [Op.is]: null } },
            order: [['started_at', 'DESC']]
        });
        sendJson(res, rows);
    } catch (err) {
        sendError(res, err);
    }
};

exports.getLastHour = async (_req, res) => {
    try {
        await ensureSchema();
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
        sendJson(res, rows);
    } catch (err) {
        sendError(res, err);
    }
};

exports.getTimeframe = async (req, res) => {
    try {
        await ensureSchema();
        const windowStart = parseRequiredDate(req.query.start, 'start');
        const windowEnd = parseRequiredDate(req.query.end, 'end');
        if (windowStart > windowEnd) {
            return sendJson(res, { error: 'start must be <= end' }, 400);
        }

        const where = {
            [Op.and]: [
                { started_at: { [Op.lte]: windowEnd } },
                {
                    [Op.or]: [
                        { ended_at: { [Op.gte]: windowStart } },
                        { ended_at: { [Op.is]: null } }
                    ]
                }
            ]
        };

        if (req.query.guild_id) where.guild_id = req.query.guild_id;
        if (req.query.channel_id) where.channel_id = req.query.channel_id;

        const limit = coerceLimit(req.query.limit);
        const offset = coerceOffset(req.query.offset);

        const rows = await VoiceChannelSession.findAll({
            where,
            limit,
            offset,
            order: [['started_at', 'DESC']]
        });
        sendJson(res, rows);
    } catch (err) {
        sendError(res, err);
    }
};

exports.create = async (req, res) => {
    try {
        await ensureSchema();
        const { guild_id, channel_id } = req.body;
        if (!guild_id || !channel_id) {
            return sendJson(res, { error: 'guild_id and channel_id are required' }, 400);
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

        if (req.body.user_id !== undefined) payload.user_id = req.body.user_id;
        const joinedAt = parseDateValue(req.body.joined_at, 'joined_at');
        if (joinedAt) payload.joined_at = joinedAt;
        const leftAt = parseDateValue(req.body.left_at, 'left_at');
        if (leftAt) payload.left_at = leftAt;
        const minutes = parseSmallInt(req.body.minutes, 'minutes');
        if (minutes !== undefined) payload.minutes = minutes;

        const startedAt = parseDateValue(req.body.started_at, 'started_at');
        if (startedAt) payload.started_at = startedAt;
        const endedAt = parseDateValue(req.body.ended_at, 'ended_at');
        if (endedAt) payload.ended_at = endedAt;

        const created = await VoiceChannelSession.create(payload);
        sendJson(res, created, 201);
    } catch (err) {
        sendError(res, err);
    }
};

exports.update = async (req, res) => {
    try {
        await ensureSchema();
        const updates = {};
        if (req.body.guild_id !== undefined) updates.guild_id = req.body.guild_id;
        if (req.body.channel_id !== undefined) updates.channel_id = req.body.channel_id;
        if (req.body.channel_name !== undefined) updates.channel_name = req.body.channel_name;
        if (req.body.created_by !== undefined) updates.created_by = req.body.created_by;
        if (req.body.created_by_name !== undefined) updates.created_by_name = req.body.created_by_name;
        if (req.body.user_id !== undefined) updates.user_id = req.body.user_id;
        if (req.body.joined_at !== undefined) {
            updates.joined_at = req.body.joined_at === null ? null : parseDateValue(req.body.joined_at, 'joined_at');
        }
        if (req.body.left_at !== undefined) {
            updates.left_at = req.body.left_at === null ? null : parseDateValue(req.body.left_at, 'left_at');
        }
        if (req.body.started_at !== undefined) {
            updates.started_at = req.body.started_at === null ? null : parseDateValue(req.body.started_at, 'started_at');
        }
        if (req.body.ended_at !== undefined) updates.ended_at = req.body.ended_at === null ? null : parseDateValue(req.body.ended_at, 'ended_at');
        if (req.body.metadata !== undefined) updates.metadata = parseMetadata(req.body.metadata);
        if (req.body.minutes !== undefined) {
            updates.minutes = req.body.minutes === null ? null : parseSmallInt(req.body.minutes, 'minutes');
        }

        if (!Object.keys(updates).length) {
            return sendJson(res, { error: 'No fields provided to update' }, 400);
        }
        updates.updated_at = new Date();

        const [count, rows] = await VoiceChannelSession.update(updates, {
            where: { id: req.params.id },
            returning: true
        });
        if (!count) return sendJson(res, { error: 'Not found' }, 404);
        sendJson(res, rows[0]);
    } catch (err) {
        sendError(res, err);
    }
};

exports.remove = async (req, res) => {
    try {
        await ensureSchema();
        const count = await VoiceChannelSession.destroy({ where: { id: req.params.id } });
        if (!count) return sendJson(res, { error: 'Not found' }, 404);
        sendJson(res, { deleted: true });
    } catch (err) {
        sendError(res, err);
    }
};
