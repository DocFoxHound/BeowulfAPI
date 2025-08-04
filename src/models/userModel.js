const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class User extends Model {}

User.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
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
    corsair_level: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
    },
    raptor_level: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
    },
    raider_level: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
    },
    rank: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: true
    },
    roles: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
        allowNull: true,
        unique: false,
    },
    rsi_handle: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    rsi_display_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    verification_code: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false
    },
    joined_date: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false
    },
    player_org: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    fleet: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'User', // We need to choose the model name
    tableName: 'users', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = User;
