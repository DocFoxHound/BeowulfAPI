const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class KnowledgeDoc extends Model {}

KnowledgeDoc.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
        defaultValue: []
    },
    vector: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    version: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '1.0'
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'KnowledgeDoc',
    tableName: 'knowledge_docs',
    timestamps: false
});

module.exports = KnowledgeDoc;
