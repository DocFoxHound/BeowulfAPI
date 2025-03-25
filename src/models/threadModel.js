const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class AiThread extends Model {}

AiThread.init({
    message_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    thread_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'AiThread', // We need to choose the model name
    tableName: 'threads', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = AiThread;
