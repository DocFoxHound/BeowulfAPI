const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class PlayerStats extends Model {}

PlayerStats.init({
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    shipackills: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false
    },
    shippukills: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false
    },
    shipkills: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false
    },
    shipacdamages: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false
    },
    shippudamages: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false
    },
    shipdamages: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false
    },
    fpsackills: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false
    },
    fpspukills: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false
    },
    fpskills: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false
    },
    shipsbleaderboardrank: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
    },
    piracyscustolen: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false
    },
    piracyvaluestolen: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false
    },
    piracyhits: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false
    },
    piracyhitspublished: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false
    },
    fleetleads: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false
    },
    fleetassists: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false
    },
    fleetparticipated: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false
    },
    fleetkills: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
    },
    fleetscu: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false
    },
    fleetvalue: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false
    },
    fleetdamages: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false
    },
    corsair: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
    },
    raider: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
    },
    raptor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
    },
    rank_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    ronin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    fleetcommander: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    voicehours: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false
    },
    recentgatherings: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false
    },
    flighthours: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'PlayerStats', // We need to choose the model name
    tableName: 'player_stats', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = PlayerStats;
