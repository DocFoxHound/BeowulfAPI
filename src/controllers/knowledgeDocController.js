const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const KnowledgeDoc = require('../models/knowledgeDocModel');

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

function normalizeVectorForStorage(vector) {
    if (vector === undefined) return { value: undefined };
    if (vector === null || vector === '') return { value: null };

    if (Array.isArray(vector)) {
        if (!isValidEmbeddingArray(vector)) {
            return { error: `vector must be an array of ${EMBEDDING_LENGTH} finite numbers` };
        }
        return { value: `[${vector.join(',')}]` };
    }

    if (typeof vector === 'string') {
        const trimmed = vector.trim();
        if (!trimmed.length) return { value: null };
        if (!trimmed.startsWith('[') || !trimmed.endsWith(']')) {
            return { error: 'vector string must be a pgvector literal (e.g. [0.1,0.2,...])' };
        }
        return { value: trimmed };
    }

    return { error: 'vector must be provided as a numeric array or pgvector literal string' };
}

exports.list = async (req, res) => {
    try {
        const { tag, tags_any, tags_all, limit = 50, offset = 0 } = req.query;
        const where = {};

        if (tag) where.tags = { [Sequelize.Op.contains]: [tag] };
        if (tags_any) where.tags = { [Sequelize.Op.overlap]: tags_any.split(',').map(s => s.trim()).filter(Boolean) };
        if (tags_all) where.tags = { [Sequelize.Op.contains]: tags_all.split(',').map(s => s.trim()).filter(Boolean) };

        const rows = await KnowledgeDoc.findAll({ where, limit: Number(limit), offset: Number(offset), order: [['created_at', 'DESC']] });
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.get = async (req, res) => {
    try {
        const row = await KnowledgeDoc.findByPk(req.params.id);
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
        const vectorResult = normalizeVectorForStorage(data.vector);
        if (vectorResult.error) {
            return res.status(400).json({ error: vectorResult.error });
        }
        if (vectorResult.value !== undefined) data.vector = vectorResult.value;
        const required = ['title', 'text'];
        const missing = required.filter(k => data[k] == null || data[k] === '');
        if (missing.length) return res.status(400).json({ error: 'Missing required fields', missing });

        const created = await KnowledgeDoc.create(data);
        res.status(201).json(created);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = { ...req.body };
        if (data.tags !== undefined) data.tags = sanitizeTagsToTextArray(normalizeTags(data.tags));
        if (data.vector !== undefined) {
            const vectorResult = normalizeVectorForStorage(data.vector);
            if (vectorResult.error) {
                return res.status(400).json({ error: vectorResult.error });
            }
            data.vector = vectorResult.value;
        }
        const [count, [updated]] = await KnowledgeDoc.update(data, { where: { id: req.params.id }, returning: true });
        if (!count) return res.status(404).json({ error: 'Not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const count = await KnowledgeDoc.destroy({ where: { id: req.params.id } });
        if (!count) return res.status(404).json({ error: 'Not found' });
        res.json({ deleted: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.vectorSearch = async (req, res) => {
    try {
        const { queryEmbedding, limit = 10 } = req.body;
        if (!Array.isArray(queryEmbedding) || !queryEmbedding.length) {
            return res.status(400).json({ error: 'queryEmbedding array required' });
        }

        const results = await sequelize.query(
            `SELECT id, title, text, tags, version, created_at,
                    1 - (vector <=> CAST(:embedding AS vector)) AS similarity
             FROM knowledge_docs
             ORDER BY vector <=> CAST(:embedding AS vector)
             LIMIT :limit`,
            {
                replacements: { limit: Number(limit), embedding: `[${queryEmbedding.join(',')}]` },
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
        const vectorResult = normalizeVectorForStorage(embedding);
        if (vectorResult.error) {
            return res.status(400).json({ error: vectorResult.error });
        }
        if (vectorResult.value == null) {
            return res.status(400).json({ error: 'embedding array required' });
        }
        const id = req.params.id;
        await sequelize.query(
            `UPDATE knowledge_docs SET vector = CAST(:embedding AS vector) WHERE id = :id`,
            { replacements: { id, embedding: vectorResult.value }, type: Sequelize.QueryTypes.UPDATE }
        );
        res.json({ id, updated: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
