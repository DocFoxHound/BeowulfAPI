const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Schedule extends Model {}

Schedule.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    author_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    attendees: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
        allowNull: true
    },
    author_username: {
        type: DataTypes.STRING,
        allowNull: true
    },
    attendees_usernames: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    timestamp: {
        type: DataTypes.DATE, // timestamp with time zone
        allowNull: true
    },
    action: {
        type: DataTypes.STRING,
        allowNull: true
    },
    allowed_ranks: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
        allowNull: true
    },
    allowed_ranks_names: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    start_time: {
        type: DataTypes.DATE, // timestamp with time zone
        allowNull: true
    },
    end_time: {
        type: DataTypes.DATE, // timestamp with time zone
        allowNull: true
    },
    appearance: {
        type: DataTypes.JSON,
        allowNull: true
    },
    repeat: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    rsvp_options: {
        type: DataTypes.JSON,
        allowNull: true
    },
    fleet: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
        allowNull: true
    },
    patch: {
        type: DataTypes.STRING,
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    repeat_end_date: {
        type: DataTypes.DATE, // timestamp with time zone
        allowNull: true
    },
    repeat_frequency: {
        type: DataTypes.STRING,
        allowNull: true
    },
    repeat_series: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    event_members: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true
    },
    discord_post: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    discord_channel: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    discord_buttons: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    discord_thread: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    first_notice: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    second_notice: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'Schedule',
    tableName: 'schedules',
    timestamps: false
});

module.exports = Schedule;
