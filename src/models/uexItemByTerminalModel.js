const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class ItemSummary extends Model {}

ItemSummary.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    id_item: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_terminal: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_buy: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false,
    },
    price_sell: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false
    },
    terminal_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'ItemSummary', // We need to choose the model name
    tableName: 'uex_items_summary', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = ItemSummary;
