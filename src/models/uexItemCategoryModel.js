const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UEXItemCategory extends Model {}

UEXItemCategory.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    section: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    is_game_related: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false,
    },
    is_mining: {
        type: DataTypes.BOOLEAN,
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
    sequelize,
    modelName: 'UEXItemCategory',
    tableName: 'uex_item_categories',
    timestamps: false
});

module.exports = UEXItemCategory;
