const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class RecentFleets extends Model {}

RecentFleets.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    channel_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    channel_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    timestamp: {
        type: DataTypes.TIME,
        allowNull: true,
        unique: false
    },
    created_at: {
        type: DataTypes.TIME,
        allowNull: true,
        unique: false
    },
    users: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
        unique: false
    },
    pu_shipkills: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    pu_fpskills: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    ac_shipkills: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    ac_fpskills: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    stolen_cargo: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false,
    },
    stolen_value: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false,
    },
    damages: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false,
    },
    patch: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    icon_url: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    accolade: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'RecentFleets', // We need to choose the model name
    tableName: 'recent_fleets', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = RecentFleets;
