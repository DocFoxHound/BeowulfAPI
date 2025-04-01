const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class Ship extends Model {}

Ship.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    ship: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    avg_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        unique: false,
    },
    
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'Ship', // We need to choose the model name
    tableName: 'uex_ships', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = Ship;
