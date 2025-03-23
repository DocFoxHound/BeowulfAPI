const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class Commodity extends Model {}

Commodity.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    id_parent: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false
    },
    code: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false
    },
    kind: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    weight_scu: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false,
    },
    price_buy: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_sell: {
        type: DataTypes.DOUBLE,
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
    is_mineral: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_raw: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_refined: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_harvestable: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_buyable: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_sellable: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_temporary: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_illegal: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    is_fuel: {
        type: DataTypes.BIGINT,
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
    }
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'Commodity', // We need to choose the model name
    tableName: 'uex_commodities', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = Commodity;
