const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class RefineryYield extends Model {}

RefineryYield.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    id_commodity: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_star_system: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_planet: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_orbit: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_moon: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_space_station: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_city: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_outpost: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_poi: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_terminal: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_report: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    value: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    value_week: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    value_month: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    date_added: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    date_modified: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    commodity_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    star_system_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    planet_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    orbit_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    moon_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    space_station_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    city_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    outpost_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    poi_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    terminal_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    }
}, {
    sequelize,
    modelName: 'RefineryYield',
    tableName: 'uex_refinery_yields',
    timestamps: false
});

module.exports = RefineryYield;
