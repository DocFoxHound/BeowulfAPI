const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class LeaderboardSBLog extends Model {}

LeaderboardSBLog.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    rank_score: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    displayname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: true
    },
    visibility: {
        type: DataTypes.CHAR(1),
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
        type: DataTypes.BIGINT,
        allowNull: true
    },
    damage_dealt: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    damage_taken: {
        type: DataTypes.BIGINT,
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
    best_lap: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    best_race: {
        type: DataTypes.STRING,
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
        type: DataTypes.INTEGER,
        allowNull: true
    },
    hits: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    account_media: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    org_media: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    insignia_rank: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    insignia_title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rating: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
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
    modelName: 'LeaderboardSBLog',
    tableName: 'leaderboard_sb_log',
    timestamps: false
});

module.exports = LeaderboardSBLog;
