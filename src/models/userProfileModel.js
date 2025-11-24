const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UserProfile extends Model {}

UserProfile.init({
    user_id: {
        type: DataTypes.TEXT,
        primaryKey: true
    },
    nickname: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    tease_level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    style_preferences: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {}
    },
    stats_json: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {}
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'UserProfile',
    tableName: 'user_profiles',
    timestamps: false
});

module.exports = UserProfile;
