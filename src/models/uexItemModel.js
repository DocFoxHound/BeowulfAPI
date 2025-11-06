const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UEXItem extends Model {}

UEXItem.init({
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
    id_category: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_company: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_vehicle: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    name: {
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
    },
    section: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    category: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    company_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    vehicle_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    slug: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    size: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    uuid: {
        type: DataTypes.UUID,
        allowNull: true,
        unique: false,
    },
    url_store: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    is_exclusive_pledge: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false,
    },
    is_exclusive_subscriber: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false,
    },
    is_exclusive_concierge: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false,
    },
    is_commodity: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false,
    },
    is_harvestable: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false,
    },
    screenshot: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    game_version: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    notification: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    }
}, {
    sequelize,
    modelName: 'UEXItem',
    tableName: 'uex_items',
    timestamps: false
});

module.exports = UEXItem;
