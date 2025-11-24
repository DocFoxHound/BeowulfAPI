const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Memory = require('../models/memoryModel');

const EMBEDDING_LENGTH = 1536;

function normalizeTags(tags) {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;
    if (typeof tags === 'string') {
        try { return JSON.parse(tags); } catch (_) { return [tags]; }
    }
    return [];
}

function sanitizeTagsToTextArray(arr) {
    return arr.filter(v => v !== undefined && v !== null)
              .map(v => String(v).trim())
              .filter(v => v.length > 0);
}

function isValidEmbeddingArray(embedding) {
    return Array.isArray(embedding)
        && embedding.length === EMBEDDING_LENGTH
        && embedding.every(value => typeof value === 'number' && Number.isFinite(value));
}

async function updateMemoryEmbedding(memoryId, embedding) {
    const literal = `[${embedding.join(',')}]`;
    const [rows] = await sequelize.query(
        `UPDATE public.memories
         SET vector = CAST(:embedding AS vector), updated_at = NOW()
         WHERE id = :memory_id
         RETURNING id`,
        {
            replacements: { embedding: literal, memory_id: memoryId },
            type: Sequelize.QueryTypes.UPDATE
        }
    );
    return Array.isArray(rows) ? rows.length : 0;
}

exports.list = async (req, res) => {
    try {
        const { user_id, guild_id, channel_id, type, limit = 50, offset = 0 } = req.query;
        const where = {};
        if (user_id) where.user_id = user_id;
        if (guild_id) where.guild_id = guild_id;
        if (channel_id) where.channel_id = channel_id;
        if (type) where.type = type;

        const rows = await Memory.findAll({ where, limit: Number(limit), offset: Number(offset), order: [['created_at', 'DESC']] });
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.get = async (req, res) => {
    try {
        const row = await Memory.findByPk(req.params.id);
        if (!row) return res.status(404).json({ error: 'Not found' });
        res.json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const data = { ...req.body };
        data.tags = sanitizeTagsToTextArray(normalizeTags(data.tags));
        const required = ['guild_id', 'type', 'content'];
        const missing = required.filter(k => data[k] == null || data[k] === '');
        if (missing.length) return res.status(400).json({ error: 'Missing required fields', missing });

        const created = await Memory.create(data);
        res.status(201).json(created);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = { ...req.body };
        if (data.tags !== undefined) data.tags = sanitizeTagsToTextArray(normalizeTags(data.tags));
        const [count, [updated]] = await Memory.update(data, { where: { id: req.params.id }, returning: true });
        if (!count) return res.status(404).json({ error: 'Not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const count = await Memory.destroy({ where: { id: req.params.id } });
        if (!count) return res.status(404).json({ error: 'Not found' });
        res.json({ deleted: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.vectorSearch = async (req, res) => {
    try {
        const { queryEmbedding, limit = 10, filter_type, filter_user_id, filter_guild_id, filter_channel_id } = req.body;
        if (!Array.isArray(queryEmbedding) || !queryEmbedding.length) {
            return res.status(400).json({ error: 'queryEmbedding array required' });
        }

        const whereClauses = [];
        const repl = { limit: Number(limit) };
        if (filter_type) { whereClauses.push('type = :filter_type'); repl.filter_type = filter_type; }
        if (filter_user_id) { whereClauses.push('user_id = :filter_user_id'); repl.filter_user_id = filter_user_id; }
        if (filter_guild_id) { whereClauses.push('guild_id = :filter_guild_id'); repl.filter_guild_id = filter_guild_id; }
        if (filter_channel_id) { whereClauses.push('channel_id = :filter_channel_id'); repl.filter_channel_id = filter_channel_id; }

        const whereSQL = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

        const results = await sequelize.query(
            `SELECT id, user_id, guild_id, channel_id, type, content, tags, importance, created_at, updated_at, last_used_at,
                    1 - (vector <=> CAST(:embedding AS vector)) AS similarity
             FROM memories
             ${whereSQL}
             ORDER BY vector <=> CAST(:embedding AS vector)
             LIMIT :limit`,
            {
                replacements: { ...repl, embedding: `[${queryEmbedding.join(',')}]` },
                type: Sequelize.QueryTypes.SELECT
            }
        );
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateVector = async (req, res) => {
    try {
        const { embedding } = req.body;
        if (!Array.isArray(embedding) || !embedding.length) {
            return res.status(400).json({ error: 'embedding array required' });
        }
        const id = req.params.id;
        await sequelize.query(
            `UPDATE memories SET vector = CAST(:embedding AS vector), last_used_at = NOW(), updated_at = NOW() WHERE id = :id`,
            { replacements: { id, embedding: `[${embedding.join(',')}]` }, type: Sequelize.QueryTypes.UPDATE }
        );
        res.json({ id, updated: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateEmbedding = async (req, res) => {
    try {
        const { memory_id } = req.params;
        const { embedding } = req.body || {};

        if (!isValidEmbeddingArray(embedding)) {
            return res.status(400).json({ error: { message: 'embedding must be an array of 1,536 finite numbers' } });
        }

        const updatedRows = await updateMemoryEmbedding(memory_id, embedding);
        if (!updatedRows) {
            return res.status(404).json({ error: { message: 'Not Found' } });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
