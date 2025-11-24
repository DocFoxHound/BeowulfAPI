const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class GameEntity extends Model {}

GameEntity.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    aliases: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
        defaultValue: []
    },
    type: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    subcategory: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    short_description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
        defaultValue: []
    },
    source: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'manual'
    },
    dataset_hint: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    metadata: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {}
    },
    vector: {
        type: DataTypes.TEXT,
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
    }
}, {
    sequelize,
    modelName: 'GameEntity',
    tableName: 'game_entities',
    timestamps: false
});

module.exports = GameEntity;
