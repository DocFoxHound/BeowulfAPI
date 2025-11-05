const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class PlayerTracker extends Model {}

PlayerTracker.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
    },
    author_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false
    },
    author_username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    author_nickname: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
}, {
    sequelize,
    modelName: 'PlayerTracker',
    tableName: 'player_tracker',
    timestamps: false
});

module.exports = PlayerTracker;