const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ListShips extends Model {}

ListShips.init({
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
    modelName: 'ListShips',
    tableName: 'list_ships',
    timestamps: false
});

module.exports = ListShips;
