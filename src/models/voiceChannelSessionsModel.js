const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class VoiceChannelSessions extends Model {}

VoiceChannelSessions.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    },
    channel_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    },
    channel_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    joined_at: {
        type: DataTypes.TIME,
        allowNull: false,
        unique: false
    },
    left_at: {
        type: DataTypes.TIME,
        allowNull: true,
        unique: false
    },
    minutes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'VoiceChannelSessions', // We need to choose the model name
    tableName: 'voice_channel_sessions', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = VoiceChannelSessions;
