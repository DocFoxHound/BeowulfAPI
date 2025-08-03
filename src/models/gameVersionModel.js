const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class GameVersion extends Model {}

GameVersion.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    version: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    season: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    },
    
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'GameVersion', // We need to choose the model name
    tableName: 'game_version', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = GameVersion;
