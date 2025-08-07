const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class LeaderboardSBOrg extends Model {}

LeaderboardSBOrg.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    rank_score: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: true
    },
    kills: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    deaths: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    score: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    damage_dealt: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    damage_taken: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    matches: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    flight_time: {
        type: DataTypes.STRING,
        allowNull: true
    },
    wins: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    draws: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    core_captures: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    core_carrier_kills: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    max_waves: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    num_waves: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    first_blood: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    ace: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mvp: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    captures: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    shots_fired: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    hits: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    org_media: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    rating: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    avg_flight_time: {
        type: DataTypes.STRING,
        allowNull: true
    },
    score_minute: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    damage_ratio: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    kill_death_ratio: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    losses: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    win_loss_ratio: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    accuracy: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    rank: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    created_at: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    map: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'LeaderboardSBOrg',
    tableName: 'leaderboard_sb_org',
    timestamps: false
});

module.exports = LeaderboardSBOrg;
