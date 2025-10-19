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
    damage_type: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    coordinates: {
        type: DataTypes.STRING, // "-580645.384869,141765.234817,806351.274790"
        allowNull: true,
    },
    org_sid: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    org_picture: {
        type: DataTypes.STRING, // URL or path to the organization's picture
        allowNull: true,
    },
    victim_image: {
        type: DataTypes.STRING, // URL or path to the victim's image
        allowNull: true,
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
