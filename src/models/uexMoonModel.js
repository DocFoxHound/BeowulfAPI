const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Moon extends Model {}

Moon.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
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
    id_faction: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_jurisdiction: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    name_origin: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    code: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    is_available: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_available_live: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_visible: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_default: {
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
    faction_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    jurisdiction_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    }
}, {
    sequelize,
    modelName: 'Moon',
    tableName: 'uex_moons',
    timestamps: false
});

module.exports = Moon;
