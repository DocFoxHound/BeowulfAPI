const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class Kill extends Model {}

Kill.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
        primaryKill: true
    },
    key: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false
    },
    player_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'Kill', // We need to choose the model name
    tableName: 'keys', // Specify the table name
    timestamps: false // Turn on Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = Kill;
