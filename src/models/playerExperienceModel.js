const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class PlayerExperience extends Model {}

PlayerExperience.init({
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
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    operation_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false
    },
    operation_type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    operation_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    dogfighter: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    marine: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    snare: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    cargo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    multicrew: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    salvage: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    patch: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    air_leadership: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    ground_leadership: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    commander: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    type_of_experience: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'PlayerExperience', // We need to choose the model name
    tableName: 'player_experience', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = PlayerExperience;
