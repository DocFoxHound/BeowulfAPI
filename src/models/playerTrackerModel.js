const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class PlayerTracker extends Model {}

PlayerTracker.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    rating: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    author_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    author_username: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    author_nickname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'PlayerTracker',
    tableName: 'player_tracker',
    timestamps: false,
});

module.exports = PlayerTracker;
