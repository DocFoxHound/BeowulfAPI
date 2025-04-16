const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class ShipLog extends Model {}

ShipLog.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    commander: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    },
    air_subcommanders: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        unique: false,
    },
    fps_subcommanders: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        unique: false,
    },
    crew: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        unique: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: false,
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    patch: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'ShipLog', // We need to choose the model name
    tableName: 'fleet_logs', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = ShipLog;
