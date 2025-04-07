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
    commodity_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    price_buy_avg: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false,
    },
    price_sell_avg: {
        type: DataTypes.DOUBLE,
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
