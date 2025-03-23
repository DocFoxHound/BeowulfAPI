const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class Planet extends Model {}

Planet.init({
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
    modelName: 'Planet', // We need to choose the model name
    tableName: 'uex_planets', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = Planet;
