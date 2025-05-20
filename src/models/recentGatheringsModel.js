const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class RecentGathering extends Model {}

RecentGathering.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
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
    user_ids: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
        allowNull: false,
        unique: false
    },
    usernames: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        unique: false,
    },
    timestamp: {
        type: DataTypes.TIME,
        allowNull: false,
        unique: false
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'RecentGathering', // We need to choose the model name
    tableName: 'recent_gatherings', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = RecentGathering;
