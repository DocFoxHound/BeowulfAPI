const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class Warehouse extends Model {}

Warehouse.init({
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
    commodity_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    total_scu: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        unique: false,
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
    location: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    for_org: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    intent: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    }
    
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'Warehouse', // We need to choose the model name
    tableName: 'warehouse', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = Warehouse;
