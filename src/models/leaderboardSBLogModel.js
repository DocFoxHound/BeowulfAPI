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
    kills: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    score: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    flight_time: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rating: {
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
}, {
    sequelize,
    modelName: 'LeaderboardSBLog',
    tableName: 'leaderboard_sb_log',
    timestamps: false
});

module.exports = LeaderboardSBLog;
