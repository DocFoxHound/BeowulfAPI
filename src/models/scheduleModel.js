const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class Schedule extends Model {}

Schedule.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true,
        // autoIncrement: true
    },
    author_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    attendees: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
        allowNull: true,
        unique: false,
    },
    author_username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    attendees_usernames: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        unique: false,
    },
    timestamp: {
        type: DataTypes.TIME,
        allowNull: true,
        unique: false,
    },
    action: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'Schedule', // We need to choose the model name
    tableName: 'schedules', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = Schedule;
