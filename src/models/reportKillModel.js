const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class Kill extends Model {}

Kill.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    player: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    victim: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    time: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false
    },
    zone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    weapon: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    rsi_profile: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    game_mode: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    client_ver: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    killers_ship: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    patch: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    key: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'Kill', // We need to choose the model name
    tableName: 'report_kill', // Specify the table name
    timestamps: false // Turn on Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = Kill;
