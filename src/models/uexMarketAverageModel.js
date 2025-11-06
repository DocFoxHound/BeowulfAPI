const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class MarketAverage extends Model {}

MarketAverage.init({
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
    id_category: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_buy: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_sell: {
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
    item_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    item_uuid: {
        type: DataTypes.UUID,
        allowNull: true,
        unique: false,
    }
}, {
    sequelize,
    modelName: 'MarketAverage',
    tableName: 'uex_market_averages',
    timestamps: false
});

module.exports = MarketAverage;
