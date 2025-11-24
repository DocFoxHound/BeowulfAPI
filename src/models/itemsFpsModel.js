const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ItemsFps extends Model {}

ItemsFps.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stats: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: {}
    }
}, {
    sequelize,
    modelName: 'ItemsFps',
    tableName: 'items_fps',
    timestamps: false
});

module.exports = ItemsFps;
