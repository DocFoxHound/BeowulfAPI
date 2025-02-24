const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class UserInQueue extends Model {}

UserInQueue.init({
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
    queue_corsair: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    queue_raptor: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    queue_raider: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    queue_promote_crew: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    queue_promote_marauder: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    queue_description: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'User', // We need to choose the model name
    tableName: 'queue_help', // Specify the table name
    timestamps: true // Turn on Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = UserInQueue;
