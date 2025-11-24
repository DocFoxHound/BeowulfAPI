const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Memory extends Model {}

Memory.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    guild_id: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    channel_id: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    type: {
        type: DataTypes.TEXT,
        allowNull: false
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
    importance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    },
    last_used_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Memory',
    tableName: 'memories',
    timestamps: false
});

module.exports = Memory;
