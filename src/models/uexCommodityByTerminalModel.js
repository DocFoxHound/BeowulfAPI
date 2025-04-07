const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class CommodityByTerminal extends Model {}

CommodityByTerminal.init({
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
    price_buy: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false,
    },
    price_buy_avg: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false,
    },
    price_sell: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false,
    },
    price_sell_avg: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false,
    },
    scu_buy: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false,
    },
    scu_buy_avg: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false,
    },
    scu_sell_stock: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false,
    },
    scu_sell_stock_avg: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false,
    },
    scu_sell: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false,
    },
    scu_sell_avg: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false,
    },
    status_buy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
    },
    status_sell: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
    },
    commodity_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    terminal_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    id_terminal: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'CommodityByTerminal', // We need to choose the model name
    tableName: 'uex_commodities_by_terminal', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = CommodityByTerminal;
