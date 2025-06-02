const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ShipLog extends Model {}

ShipLog.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
    },
    created_at: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    commander_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    patch: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    crew_usernames: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    air_sub_usernames: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    fps_sub_usernames: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    commander_username: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    air_sub_ids: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
        allowNull: true,
    },
    fps_sub_ids: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
        allowNull: true,
    },
    crew_ids: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
        allowNull: true,
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    total_kills: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    value_stolen: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    total_cargo: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    damages_value: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    fleet_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    fleet_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    video_link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    media_links: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    associated_hits: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'ShipLog',
    tableName: 'fleet_logs',
    timestamps: false
});

module.exports = ShipLog;
