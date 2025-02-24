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
        allowNull: false,
        unique: false
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
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
    date: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'User', // We need to choose the model name
    tableName: 'users', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = User;
