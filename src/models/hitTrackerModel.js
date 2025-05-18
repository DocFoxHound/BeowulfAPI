const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class HitTrack extends Model {}

HitTrack.init({
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
    cargo: {
        type: DataTypes.JSON,
        allowNull: false,
        unique: false
    },
    total_value: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        unique: false,
    },
    patch: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    total_cut_value: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        unique: false,
    },
    assists: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
        allowNull: false,
        unique: false
    },
    total_scu: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        unique: false,
    },
    air_or_ground: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    story: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    timestamp: {
        type: DataTypes.TIME,
        allowNull: true,
        unique: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    assists_usernames: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        unique: false,
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'HitTrack', // We need to choose the model name
    tableName: 'hit_tracker', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = HitTrack;
