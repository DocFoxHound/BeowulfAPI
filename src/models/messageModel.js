const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class MessageModel extends Model {}

MessageModel.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
        primaryKey: true
    },
    message: {
        type: DataTypes.JSON,
        allowNull: true,
        unique: false
    },
    channel_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'MessageModel', // We need to choose the model name
    tableName: 'chat_logs', // Specify the table name
    timestamps: false // Turn on Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = MessageModel;
