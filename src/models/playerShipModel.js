const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class PlayerShip extends Model {}

PlayerShip.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    uex_ship_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    },
    ship_model: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    custom_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    crew: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    pad_type: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    }
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'PlayerShip', // We need to choose the model name
    tableName: 'player_ships', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = PlayerShip;
