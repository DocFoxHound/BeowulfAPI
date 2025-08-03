const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class OrgGoal extends Model {}

OrgGoal.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    goal_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    goal_description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    goal_trigger: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
        unique: false
    },
    patch: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    created_at: {
        type: DataTypes.TIME,
        allowNull: true,
        unique: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    completed_on: {
        type: DataTypes.TIME,
        allowNull: true,
        unique: false
    },
    start_date: {
        type: DataTypes.TIME,
        allowNull: true,
        unique: false
    },
    end_date: {
        type: DataTypes.TIME,
        allowNull: true,
        unique: false
    },
    priority: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
    },
    manual_percentage: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
    },
    manual_progress: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'OrgGoal', // We need to choose the model name
    tableName: 'org_goals', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = OrgGoal;
