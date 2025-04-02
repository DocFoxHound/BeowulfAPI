const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class BlackBox extends Model {}

BlackBox.init({
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
    ship_used: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    ship_killed: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    value: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        unique: false,
    },
    kill_count: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        unique: false,
    },
    victims: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        unique: false
    },
    patch: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    assists: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
        allowNull: false,
        unique: false
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'BlackBox', // We need to choose the model name
    tableName: 'black_box', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = BlackBox;
