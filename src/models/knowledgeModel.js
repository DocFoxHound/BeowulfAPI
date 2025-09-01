const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Knowledge extends Model {}

Knowledge.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    // Required (NOT NULL in DB)
    source: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    category: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    section: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
        defaultValue: []
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    version: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    guild_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    channel_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    // Generated column in DB; map as TEXT for read-only purposes
    tsv: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'tsv'
    },
    // pgvector(1536) in DB; represent as TEXT for reads (updated via raw SQL)
    embedding: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'embedding'
    }
}, {
    sequelize,
    modelName: 'Knowledge',
    tableName: 'knowledge',
    timestamps: false
});

module.exports = Knowledge;
