const { Op, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Knowledge = require('../models/knowledgeModel');

// Utility: coalesce array input
function normalizeTags(tags) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  if (typeof tags === 'string') {
    try { return JSON.parse(tags); } catch (_) { return [tags]; }
  }
  return [];
}

// GET / -> list with filters and pagination
exports.list = async (req, res) => {
  try {
    const {
      q, // full-text query
      category,
      guild_id,
      channel_id,
      tag, // single tag match
      tags_any, // comma-separated list -> any match
      tags_all, // comma-separated list -> all must match
      limit = 50,
      offset = 0,
      order = 'updated_at.desc' // "column.direction"
    } = req.query;

    const where = {};
    if (category) where.category = category;
    if (guild_id) where.guild_id = guild_id;
    if (channel_id) where.channel_id = channel_id;

    // Tag filters
    if (tag) where.tags = { [Op.contains]: [tag] };
    if (tags_any) where.tags = { [Op.overlap]: tags_any.split(',').map(s => s.trim()).filter(Boolean) };
    if (tags_all) where.tags = { [Op.contains]: tags_all.split(',').map(s => s.trim()).filter(Boolean) };

    // order-by whitelist to avoid SQL injection
    const [orderColRaw, orderDirRaw] = String(order).split('.');
    const allowedCols = new Set(['updated_at', 'created_at', 'id']);
    const col = allowedCols.has(orderColRaw) ? orderColRaw : 'updated_at';
    const dir = (orderDirRaw || 'desc').toLowerCase() === 'asc' ? 'ASC' : 'DESC';
    const orderBy = [[col, dir]];

    // Full-text search using the generated tsv column via raw SQL when q provided
  if (q) {
      const results = await sequelize.query(
        `SELECT * FROM knowledge
         WHERE tsv @@ plainto_tsquery('english', immutable_unaccent(:q))
     ${category ? 'AND category = :category' : ''}
     ${guild_id ? 'AND guild_id = :guild_id' : ''}
     ${channel_id ? 'AND channel_id = :channel_id' : ''}
     ORDER BY ts_rank(tsv, plainto_tsquery('english', immutable_unaccent(:q))) DESC, ${col} ${dir}
         LIMIT :limit OFFSET :offset`,
        {
          replacements: {
            q,
      category,
      guild_id,
      channel_id,
            limit: Number(limit),
            offset: Number(offset)
          },
          type: Sequelize.QueryTypes.SELECT
        }
      );
      return res.json(results);
    }

    const rows = await Knowledge.findAll({ where, limit: Number(limit), offset: Number(offset), order: orderBy });
    res.json(rows);
  } catch (err) {
    console.error('knowledge.list error', err);
    res.status(500).json({ error: err.message });
  }
};

// GET /:id
exports.get = async (req, res) => {
  try {
    const row = await Knowledge.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /
exports.create = async (req, res) => {
  try {
    const data = { ...req.body };
    data.tags = normalizeTags(data.tags);
    const created = await Knowledge.create(data);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error("Error:", err.message);
  }
};

// PUT /:id
exports.update = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.tags !== undefined) data.tags = normalizeTags(data.tags);
    const [count, [updated]] = await Knowledge.update(data, { where: { id: req.params.id }, returning: true });
    if (!count) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /:id
exports.remove = async (req, res) => {
  try {
    const count = await Knowledge.destroy({ where: { id: req.params.id } });
    if (!count) return res.status(404).json({ error: 'Not found' });
    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /search/vector { queryEmbedding: number[], limit }
// Requires pgvector extension and embedding column
exports.vectorSearch = async (req, res) => {
  try {
    const { queryEmbedding, limit = 10, filter_category, filter_guild_id, filter_channel_id } = req.body;
    if (!Array.isArray(queryEmbedding) || !queryEmbedding.length) {
      return res.status(400).json({ error: 'queryEmbedding array required' });
    }

    const whereClauses = [];
    const repl = { limit: Number(limit) };
    if (filter_category) { whereClauses.push('category = :filter_category'); repl.filter_category = filter_category; }
    if (filter_guild_id) { whereClauses.push('guild_id = :filter_guild_id'); repl.filter_guild_id = filter_guild_id; }
    if (filter_channel_id) { whereClauses.push('channel_id = :filter_channel_id'); repl.filter_channel_id = filter_channel_id; }

    const whereSQL = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const results = await sequelize.query(
      `SELECT id, source, category, title, section, content, tags, url, version, guild_id, channel_id, created_at, updated_at,
              1 - (embedding <=> CAST(:embedding AS vector)) AS similarity
       FROM knowledge
       ${whereSQL}
       ORDER BY embedding <=> CAST(:embedding AS vector)
       LIMIT :limit`,
      {
        replacements: { ...repl, embedding: `[${queryEmbedding.join(',')}]` },
        type: Sequelize.QueryTypes.SELECT
      }
    );
    res.json(results);
  } catch (err) {
    console.error('knowledge.vectorSearch error', err);
    res.status(500).json({ error: err.message });
  }
};

// PUT /:id/embedding { embedding: number[] }
exports.updateEmbedding = async (req, res) => {
  try {
    const { embedding } = req.body;
    if (!Array.isArray(embedding) || !embedding.length) {
      return res.status(400).json({ error: 'embedding array required' });
    }
    const id = req.params.id;
    const updated = await sequelize.query(
      `UPDATE knowledge SET embedding = CAST(:embedding AS vector) WHERE id = :id RETURNING id`,
      { replacements: { id, embedding: `[${embedding.join(',')}]` }, type: Sequelize.QueryTypes.UPDATE }
    );
    res.json({ id, updated: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
