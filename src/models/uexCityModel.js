const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class City extends Model {}

City.init({
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
    id_moon: {
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
    is_monitored: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_armistice: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_landable: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_decommissioned: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    has_quantum_marker: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    has_trade_terminal: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    has_habitation: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    has_refinery: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    has_cargo_center: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    has_clinic: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    has_food: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    has_shops: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    has_refuel: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    has_repair: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    has_gravity: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    has_loading_dock: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    has_docking_port: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    has_freight_elevator: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    pad_types: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    wiki: {
        type: DataTypes.TEXT,
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
    moon_name: {
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
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'City', // We need to choose the model name
    tableName: 'uex_cities', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = City;
