const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class User extends Model {}

User.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    corsair_level: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
    },
    raptor_level: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
    },
    raider_level: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
    },
    rank: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    raptor_1_solo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    raptor_1_team: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    raptor_2_solo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    raptor_2_team: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    raptor_3_solo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    raptor_3_team: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    corsair_1_turret: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    corsair_1_torpedo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    corsair_2_ship_commander: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    corsair_2_wing_commander: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    corsair_3_fleet_commander: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    raider_1_swabbie: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    raider_1_linemaster: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    raider_1_boarder: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    raider_2_powdermonkey: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    raider_2_mate: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    raider_3_sailmaster: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false
    },
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'User', // We need to choose the model name
    tableName: 'users', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = User;
