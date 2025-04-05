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
    owner_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    },
    ship_used: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false
    },
    commander: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    },
    value: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        unique: false,
    },
    victim_orgs: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        unique: false
    },
    patch: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    crew: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
        allowNull: false,
        unique: false
    },
    ships_killed: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
        allowNull: false,
        unique: false
    },
    divided_value: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        unique: false
    },
    total_kills: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },
    divided_kills: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        unique: false
    },
    ship_used_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'ShipLog', // We need to choose the model name
    tableName: 'ship_logs', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = ShipLog;
