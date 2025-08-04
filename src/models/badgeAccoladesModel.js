const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class BadgeAccolade extends Model {}

BadgeAccolade.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    fleet_id: {
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
    patch: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    badge_icon: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    badge_url: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'BadgeAccolade', // We need to choose the model name
    tableName: 'badges_accolades', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = BadgeAccolade;
