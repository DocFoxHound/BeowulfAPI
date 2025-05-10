const pool = require('../config/database');
const ScheduleModel = require('../models/scheduleModel');

// Handle GET request for all __schedule
exports.getAllSchedules = async (req, res) => {
    try {
        const __schedule = await ScheduleModel.findAll();
        res.status(200).json(__schedule);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for schedules by user ID
exports.getWeekSchedules = async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).send('Both startDate and endDate are required.');
    }

    try {
        const schedules = await ScheduleModel.findAll({
            where: {
                date: {
                    [Op.between]: [startDate, endDate] // Find dates between startDate and endDate
                }
            }
        });

        if (schedules.length > 0) {
            res.status(200).json(schedules);
        } else {
            res.status(404).send('No schedules found for the given date range.');
        }
    } catch (error) {
        console.error(`Error fetching schedules: ${error.message}`);
        res.status(500).send(error.message);
    }
};

// Handle GET request for schedules by ID
exports.getScheduleById = async (req, res) => {
    const { id } = req.params; // Extract `id` from request parameters

    if (!id) {
        return res.status(400).send('Schedule ID is required.');
    }

    try {
        // Find the schedule by its primary key (id)
        const schedule = await ScheduleModel.findByPk(id);

        if (schedule) {
            res.status(200).json(schedule);
        } else {
            res.status(404).send('Schedule not found.');
        }
    } catch (error) {
        console.error(`Error fetching schedule by ID: ${error.message}`);
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a new __schedule
exports.createSchedule = async (req, res) => {
    try {
        // const { id, ...scheduleData } = req.body; // Exclude `id` if provided

        // Create a new schedule entry
        const saved_schedule = await ScheduleModel.create(req.body, {
            validate: true, // Validates the entry
        });

        res.status(201).json(saved_schedule);
    } catch (error) {
        console.error("Error creating schedule:", error);
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update a schedule by ID
exports.updateSchedule = async (req, res) => {
    try {
        // Find the __schedule first
        const __schedule = await ScheduleModel.findByPk(req.params.id);
        if (__schedule) {
            // Update the __schedule with new data from req.body
            const updated__schedule = await __schedule.update(req.body);
            res.status(200).json(updated__schedule);
        } else {
            res.status(404).send('Schedule not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to delete a schedule by ID
exports.deleteSchedule = async (req, res) => {
    const scheduleId = req.params.id;
    if (!scheduleId) {
        return res.status(400).send('Schedule ID is required');
    }

    try {
        const schedule = await ScheduleModel.findByPk(scheduleId);
        if (schedule) {
            await schedule.destroy();
            res.status(200).send('Schedule deleted');
        } else {
            res.status(404).send('Schedule not found');
        }
    } catch (error) {
        console.error(`Error deleting schedule: ${error.message}`);
        res.status(500).send(error.message);
    }
};

// Handle GET request for schedules by user ID
exports.getSchedulesByUserId = async (req, res) => {
    const { user_id } = req.query;
    try {
        const schedules = await ScheduleModel.findAll({
            where: {
                user_id: user_id
            }
        });
        if (schedules.length > 0) {
            res.status(200).json(schedules);
        } else {
            res.status(404).send('No schedules found for the given user ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};