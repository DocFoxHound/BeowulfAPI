const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class RcoMiningData extends Model {}

RcoMiningData.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    source_file: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    stat_grain: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    system_name: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    location_code: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    rock_type: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ore_name: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    scans: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    clusters: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    finds: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    cluster_min: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    cluster_max: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    cluster_med: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mass_min: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    mass_max: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    mass_med: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    inst_min: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    inst_max: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    inst_med: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    res_min: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    res_max: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    res_med: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    rocks_min: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    rocks_max: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    rocks_med: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    ore_prob: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    ore_pct_min: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    ore_pct_max: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    ore_pct_med: {
        type: DataTypes.DOUBLE,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'RcoMiningData',
    tableName: 'rco_mining_stats',
    timestamps: false
});

module.exports = RcoMiningData;
