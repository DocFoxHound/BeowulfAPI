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
        allowNull: true,
        unique: false
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: true,
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
        allowNull: true,
        unique: true
    },
    raptor_1_initiation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raptor_1_hooligan: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raptor_2_brawler: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raptor_2_teamfighter: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raptor_3_competitor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raptor_3_family: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raptor_3_mercenary: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raptor_4_dogfighter: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raptor_4_hivemind: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raptor_4_assassin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raptor_5_ace: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raider_1_bouncer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raider_1_thief: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raider_2_butcher: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raider_2_highwayman: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raider_2_squadie: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raider_3_mission: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raider_3_requisition: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raider_3_proficiency: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raider_4_point: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raider_4_operator: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raider_4_challenge: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    raider_5_selection: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    corsair_1_torpedo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    corsair_1_turret: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    corsair_2_sailor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    corsair_3_broadening: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    corsair_3_staff: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    corsair_4_operations: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    corsair_5_commander: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    corsair_5_admiral: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    // Discord authentication fields
    // discordId: { 
    //     type: DataTypes.STRING, 
    //     allowNull: false, 
    //     unique: true 
    // },
    // accessToken: { 
    //     type: DataTypes.STRING, 
    //     allowNull: false 
    // },
    // refreshToken: { 
    //     type: DataTypes.STRING, 
    //     allowNull: false 
    // }
    // Add more fields as necessary
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'User', // We need to choose the model name
    tableName: 'users', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = User;
