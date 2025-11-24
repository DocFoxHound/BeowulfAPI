const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const GameEntity = require('../models/gameEntityModel');

const EMBEDDING_LENGTH = 1536;
const { Op } = Sequelize;

function sanitizeStringArray(values) {
    return values
        .filter(value => value !== undefined && value !== null)
        .map(value => String(value).trim())
        .filter(Boolean);
}

function normalizeStringArray(input, { whenMissing } = {}) {
    if (input === undefined) return whenMissing;
    if (input === null) return [];
    if (Array.isArray(input)) return sanitizeStringArray(input);

    if (typeof input === 'string') {
        const trimmed = input.trim();
        if (!trimmed.length) return [];
        try {
            const parsed = JSON.parse(trimmed);
            if (Array.isArray(parsed)) return sanitizeStringArray(parsed);
        } catch (_) {
            // Fall through to CSV parsing below
        }
        return sanitizeStringArray(trimmed.split(','));
    }

    return [];
}

function normalizeMetadata(input, { whenMissing } = {}) {
    if (input === undefined) return whenMissing;
    if (input === null) return {};
    if (typeof input === 'object') return input;
    if (typeof input === 'string') {
        const trimmed = input.trim();
        if (!trimmed.length) return {};
        try {
            const parsed = JSON.parse(trimmed);
            if (parsed && typeof parsed === 'object') return parsed;
        } catch (_) {
            return {};
        }
    }
    return {};
}

function normalizeVectorForStorage(vector) {
    if (vector === undefined) return { value: undefined };
    if (vector === null || vector === '') return { value: null };

    const asArray = Array.isArray(vector) ? vector : (() => {
        if (typeof vector === 'string') {
            const trimmed = vector.trim();
            if (!trimmed.length) return [];
            if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
                return trimmed.slice(1, -1).split(',').map(Number);
            }
            try {
                const parsed = JSON.parse(trimmed);
                if (Array.isArray(parsed)) return parsed;
            } catch (_) {
                // intentionally empty
            }
        }
        return null;
    })();

    if (asArray === null) {
        return { error: 'vector must be provided as a numeric array or pgvector literal string' };
    }

    if (!Array.isArray(asArray) || asArray.length !== EMBEDDING_LENGTH || asArray.some(value => typeof value !== 'number' || !Number.isFinite(value))) {
        return { error: `vector must contain exactly ${EMBEDDING_LENGTH} finite numbers` };
    }

    return { value: `[${asArray.join(',')}]` };
}

async function persistVector(id, vectorLiteral) {
    if (vectorLiteral === undefined) return;
    if (vectorLiteral === null) {
        await sequelize.query(
            'UPDATE game_entities SET vector = NULL WHERE id = :id',
            { replacements: { id }, type: Sequelize.QueryTypes.UPDATE }
        );
        return;
    }

    await sequelize.query(
        'UPDATE game_entities SET vector = CAST(:embedding AS vector) WHERE id = :id',
        { replacements: { id, embedding: vectorLiteral }, type: Sequelize.QueryTypes.UPDATE }
    );
}

exports.list = async (req, res) => {
    try {
        const {
            type,
            subcategory,
            source,
            tag,
            tags_any,
            tags_all,
            alias,
            search,
            name,
            limit = 50,
            offset = 0
        } = req.query;

        const parsedLimit = Math.min(Number(limit) || 50, 200);
        const parsedOffset = Number(offset) || 0;
        const where = {};
        const andClauses = [];

        if (type) where.type = type;
        if (subcategory) where.subcategory = subcategory;
        if (source) where.source = source;
        if (name) where.name = name;

        if (tag) andClauses.push({ tags: { [Op.contains]: [tag] } });

        if (tags_any) {
            const list = sanitizeStringArray(String(tags_any).split(','));
            if (list.length) andClauses.push({ tags: { [Op.overlap]: list } });
        }

        if (tags_all) {
            const list = sanitizeStringArray(String(tags_all).split(','));
            if (list.length) andClauses.push({ tags: { [Op.contains]: list } });
        }

        if (alias) andClauses.push({ aliases: { [Op.contains]: [alias] } });

        if (search) {
            const likeValue = `%${search}%`;
            andClauses.push({
                [Op.or]: [
                    { name: { [Op.iLike]: likeValue } },
                    { short_description: { [Op.iLike]: likeValue } },
                    { dataset_hint: { [Op.iLike]: likeValue } }
                ]
            });
        }

        if (andClauses.length) {
            where[Op.and] = andClauses;
        }

        const rows = await GameEntity.findAll({
            where,
            limit: parsedLimit,
            offset: parsedOffset,
            order: [['updated_at', 'DESC']]
        });

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.get = async (req, res) => {
    try {
        const row = await GameEntity.findByPk(req.params.id);
        if (!row) return res.status(404).json({ error: 'Not found' });
        res.json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const payload = { ...req.body };
        payload.name = payload.name && String(payload.name).trim();
        payload.type = payload.type && String(payload.type).trim();
        if (!payload.name || !payload.type) {
            return res.status(400).json({ error: 'name and type are required' });
        }

        payload.aliases = normalizeStringArray(payload.aliases, { whenMissing: [] });
        payload.tags = normalizeStringArray(payload.tags, { whenMissing: [] });
        payload.metadata = normalizeMetadata(payload.metadata, { whenMissing: {} });

        const vectorSource = payload.vector ?? payload.embedding;
        const vectorResult = normalizeVectorForStorage(vectorSource);
        if (vectorResult.error) return res.status(400).json({ error: vectorResult.error });
        delete payload.vector;
        delete payload.embedding;

        const created = await GameEntity.create(payload);
        await persistVector(created.id, vectorResult.value);
        const fresh = await GameEntity.findByPk(created.id);
        res.status(201).json(fresh);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const payload = { ...req.body };
        if (payload.aliases !== undefined) payload.aliases = normalizeStringArray(payload.aliases, { whenMissing: undefined });
        if (payload.tags !== undefined) payload.tags = normalizeStringArray(payload.tags, { whenMissing: undefined });
        if (payload.metadata !== undefined) payload.metadata = normalizeMetadata(payload.metadata, { whenMissing: undefined });

        const vectorSource = payload.vector ?? payload.embedding;
        const vectorResult = normalizeVectorForStorage(vectorSource);
        if (vectorResult.error) return res.status(400).json({ error: vectorResult.error });
        delete payload.vector;
        delete payload.embedding;

        const [count] = await GameEntity.update(payload, { where: { id: req.params.id } });
        if (!count) return res.status(404).json({ error: 'Not found' });

        await persistVector(req.params.id, vectorResult.value);
        const fresh = await GameEntity.findByPk(req.params.id);
        res.json(fresh);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await GameEntity.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ error: 'Not found' });
        res.json({ deleted: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.vectorSearch = async (req, res) => {
    try {
        const { queryEmbedding, limit = 10, type, source, tags_any } = req.body;
        if (!Array.isArray(queryEmbedding) || !queryEmbedding.length) {
            return res.status(400).json({ error: 'queryEmbedding array required' });
        }

        if (queryEmbedding.length !== EMBEDDING_LENGTH) {
            return res.status(400).json({ error: `queryEmbedding must contain ${EMBEDDING_LENGTH} values` });
        }

        const filters = ['vector IS NOT NULL'];
        const replacements = {
            embedding: `[${queryEmbedding.join(',')}]`,
            limit: Math.min(Number(limit) || 10, 100)
        };

        if (type) {
            filters.push('type = :type');
            replacements.type = type;
        }

        if (source) {
            filters.push('source = :source');
            replacements.source = source;
        }

        if (tags_any && tags_any.length) {
            const tagList = Array.isArray(tags_any) ? tags_any : sanitizeStringArray(String(tags_any).split(','));
            if (tagList.length) {
                filters.push('tags && :tags_any');
                replacements.tags_any = tagList;
            }
        }

        const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';

        const results = await sequelize.query(
            `SELECT id, name, aliases, type, subcategory, short_description, tags, source, dataset_hint, metadata,
                    1 - (vector <=> CAST(:embedding AS vector)) AS similarity
             FROM game_entities
             ${whereClause}
             ORDER BY vector <=> CAST(:embedding AS vector)
             LIMIT :limit`,
            {
                replacements,
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
        if (vectorResult.error) return res.status(400).json({ error: vectorResult.error });
        if (vectorResult.value == null) return res.status(400).json({ error: 'embedding array required' });

        await persistVector(req.params.id, vectorResult.value);
        res.json({ id: req.params.id, updated: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
