const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class Availability extends Model {}

Availability.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
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
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: false,
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'Availability', // We need to choose the model name
    tableName: 'calendar_availability', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = Availability;
