const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Fleet extends Model {}

Fleet.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    commander_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    members_ids: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
        allowNull: true
    },
    primary_mission: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    secondary_mission: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    total_kills: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    patch_kills: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    total_damages: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    total_damages_patch: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    total_events: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    total_events_patch: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    last_active: {
        type: DataTypes.DATE,
        allowNull: true
    },
    commander_corsair_rank: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    total_cargo_stolen: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    total_cargo_stolen_patch: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    total_value_stolen: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    total_value_stolen_patch: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    original_commander_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    discord_role: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'Fleet',
    tableName: 'user_fleets',
    timestamps: false
});

module.exports = Fleet;
