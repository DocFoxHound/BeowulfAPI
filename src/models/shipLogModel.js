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
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    },
    ship: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    ship_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    patch: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'ShipLog', // We need to choose the model name
    tableName: 'ship_log', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = ShipLog;
