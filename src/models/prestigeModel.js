const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class PrestigeModel extends Model {}

PrestigeModel.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'PrestigeModel', // We need to choose the model name
    tableName: 'prestige_roles', // Specify the table name
    timestamps: false // Turn on Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = PrestigeModel;
