const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class Queue extends Model {}

Queue.init({
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
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false
    },
    queue_corsair: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    queue_corsair_desc: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    queue_raptor: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    queue_raptor_desc: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    queue_raider: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    queue_raider_desc: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    queue_promote: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    queue_promote_desc: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'Queue', // We need to choose the model name
    tableName: 'queue', // Specify the table name
    timestamps: false // Turn on Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = Queue;
