const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class VoiceChannelSession extends Model {}

VoiceChannelSession.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    guild_id: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    channel_id: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    channel_name: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    created_by: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    created_by_name: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    started_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    ended_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    metadata: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {}
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
    modelName: 'VoiceChannelSession',
    tableName: 'voice_channel_sessions',
    timestamps: false
});

module.exports = VoiceChannelSession;
