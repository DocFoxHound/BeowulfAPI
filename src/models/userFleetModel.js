const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class Fleet extends Model {}

Fleet.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    commander_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    },
    commander_username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    members_ids: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
        allowNull: true,
        unique: false,
    },
    members_usernames: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        unique: false,
    },
    primary_mission: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    secondary_mission: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    total_kills: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    },
    patch_kills: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    },
    total_damages: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        unique: false,
    },
    total_damages_patch: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        unique: false,
    },
    total_events: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    },
    total_events_patch: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    },
    last_active: {
        type: DataTypes.TIME,
        allowNull: true,
        unique: false,
    },
    commander_corsair_rank: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    },
    allowed_total_members: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    },
    total_cargo_stolen: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    },
    total_cargo_stolen_patch: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    },
    total_value_stolen: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        unique: false,
    },
    total_value_stolen_patch: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        unique: false,
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'Fleet', // We need to choose the model name
    tableName: 'user_fleets', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = Fleet;
