const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class Badge extends Model {}

Badge.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    },
    badge_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    badge_description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    badge_weight: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'Badge', // We need to choose the model name
    tableName: 'badges', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = Badge;
