const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class Terminal extends Model {}

Terminal.init({
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
    id_space_station: {
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
    id_city: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_faction: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_company: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: false,
    },
    nickname: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: false,
    },
    code: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: false,
    },
    type: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: false,
    },
    mcs: {
        type: DataTypes.BIGINT,
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
    is_default_system: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_affinity_influenceable: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_habitation: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_refinery: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_cargo_center: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_medical: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_food: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_shop_fps: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_shop_vehicle: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_refuel: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_repair: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_nqa: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_player_owned: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_auto_load: {
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
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: false,
    },
    planet_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: false,
    },
    orbit_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: false,
    },
    space_station_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: false,
    },
    faction_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: false,
    },
    company_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: false,
    },
    max_container_size: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    }
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'Terminal', // We need to choose the model name
    tableName: 'uex_terminals', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = Terminal;
