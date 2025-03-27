const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class Class extends Model {}

Class.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    prestige_category: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    alt_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    ai_function_class_names: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        unique: false
    },
    description: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    prerequisites: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        unique: false
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'Class', // We need to choose the model name
    tableName: 'classes', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = Class;
