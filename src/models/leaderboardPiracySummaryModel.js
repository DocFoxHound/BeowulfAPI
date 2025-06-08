const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class HitTrackerSummaryPerPatch extends Model {}

HitTrackerSummaryPerPatch.init({
    player_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    patch: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    hits_created: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    air_count: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ground_count: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mixed_count: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    brute_force_count: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    extortion_count: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_value: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'HitTrackerSummaryPerPatch',
    tableName: 'hit_tracker_summary_per_patch',
    timestamps: false
});

module.exports = HitTrackerSummaryPerPatch;
