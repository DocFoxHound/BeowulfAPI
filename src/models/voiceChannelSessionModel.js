const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class VoiceChannelSession extends Model {}

VoiceChannelSession.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    guild_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    channel_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    channel_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    joined_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    left_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    minutes: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created_by_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    started_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    ended_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    metadata: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    created_at: {
        type: DataTypes.TIME,
        allowNull: true
    },
    updated_at: {
        type: DataTypes.TIME,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'VoiceChannelSession',
    tableName: 'voice_channel_sessions',
    timestamps: false
});

module.exports = VoiceChannelSession;
