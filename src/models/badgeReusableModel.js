const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class BadgeReusable extends Model {}

BadgeReusable.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
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
    prestige: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    prestige_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    prestige_level: {
        type: DataTypes.NUMBER,
        allowNull: true,
        unique: false
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    progression: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    progression_rank: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    trigger: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
        unique: false
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    emoji_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    series_id: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    series_position: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'BadgeReusable', // We need to choose the model name
    tableName: 'badges_reusable', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = BadgeReusable;
