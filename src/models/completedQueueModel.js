const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class CompletedQueue extends Model {}

CompletedQueue.init({
    ticket_id: {
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
    user_username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    user_nickname: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    handler_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false
    },
    handler_username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    handler_nickname: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false
    },
    ticket_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'CompletedQueue', // We need to choose the model name
    tableName: 'completed_queue_tickets', // Specify the table name
    timestamps: false // Turn on Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = CompletedQueue;
