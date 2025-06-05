const { Op } = require('sequelize');
const pool = require('../config/database');
const ScheduleModel = require('../models/scheduleModel');
const axios = require('axios'); // Add this at the top if not present

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
                start_time: {
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
        const data = req.body;
        let notifySchedule;

        if (Array.isArray(data)) {
            // Create multiple schedules
            const savedSchedules = await ScheduleModel.bulkCreate(data, { validate: true });
            // Find the schedule with the earliest start_time
            notifySchedule = savedSchedules.reduce((earliest, curr) => {
                return new Date(curr.start_time) < new Date(earliest.start_time) ? curr : earliest;
            }, savedSchedules[0]);
            res.status(201).json(savedSchedules);
        } else {
            // Create a single schedule
            const savedSchedule = await ScheduleModel.create(data, { validate: true });
            notifySchedule = savedSchedule;
            res.status(201).json(savedSchedule);
        }
        // Notify Discord bot (non-blocking, errors are logged)
        if (notifySchedule) {
            axios.post('http://localhost:3001/createschedule', notifySchedule)
                .catch(err => console.error('Failed to notify Discord bot:', err.message));
        } 
    } catch (error) {
        console.error("Error creating schedule:", error);
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update a schedule by ID
exports.updateSchedule = async (req, res) => {
    try {
        // Destructure notify from the body, default to true if not provided
        const { notify = false, ...updateData } = req.body;

        // Find the schedule first
        const __schedule = await ScheduleModel.findByPk(req.params.id);
        if (__schedule) {
            // Update the schedule with new data from updateData
            const updated__schedule = await __schedule.update(updateData);

            // Notify Discord bot only if notify is true
            if (notify) {
                axios.post('http://localhost:3001/updateschedule', updated__schedule)
                    .catch(err => console.error('Failed to notify Discord bot:', err.message));
            }

            res.status(200).json(updated__schedule);
        } else {
            res.status(404).send('Schedule not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// // Handle PUT request to update a schedule by ID
// exports.updateScheduleNoNotify = async (req, res) => {
//     try {
//         // Find the __schedule first
//         const __schedule = await ScheduleModel.findByPk(req.params.id);
//         if (__schedule) {
//             // Update the __schedule with new data from req.body
//             const updated__schedule = await __schedule.update(req.body);
//             res.status(200).json(updated__schedule);
//         } else {
//             res.status(404).send('Schedule not found');
//         }
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };

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

// Handle POST request to create multiple schedules with repeat until
exports.createScheduleRepeatUntil = async (req, res) => {
    try {
        const {
            repeat_end_date,
            repeat_frequency,
            start_time,
            ...rest
        } = req.body;

        if (!repeat_end_date || !repeat_frequency || !start_time) {
            return res.status(400).send('repeat_end_date, repeat_frequency, and start_time are required.');
        }

        const events = [];
        let current = new Date(start_time);
        const end = new Date(repeat_end_date);

        while (current <= end) {
            events.push({
                ...rest,
                start_time: new Date(current),
                repeat_end_date,
                repeat_frequency
            });

            if (repeat_frequency === 'daily') {
                current.setDate(current.getDate() + 1);
            } else if (repeat_frequency === 'weekly') {
                current.setDate(current.getDate() + 7);
            } else if (repeat_frequency === 'monthly') {
                current.setMonth(current.getMonth() + 1);
            } else {
                return res.status(400).send('Invalid repeat_frequency. Use daily, weekly, or monthly.');
            }
        }

        const created = await ScheduleModel.bulkCreate(events, { validate: true });
        res.status(201).json(created);
    } catch (error) {
        console.error("Error creating repeated schedules:", error);
        res.status(500).send(error.message);
    }
};

// Handle GET request for the next schedule in a repeat series after a given schedule's start_time
exports.getNextScheduleByRepeatSeries = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send('Schedule ID is required.');
    }

    try {
        // Find the current schedule by ID
        const currentSchedule = await ScheduleModel.findByPk(id);
        if (!currentSchedule) {
            return res.status(404).send('Schedule not found.');
        }
        if (!currentSchedule.repeat_series) {
            return res.status(400).send('Schedule does not belong to a repeat series.');
        }

        // Find the next schedule in the same repeat_series after the current schedule's start_time
        const nextSchedule = await ScheduleModel.findOne({
            where: {
                repeat_series: currentSchedule.repeat_series,
                start_time: { [Op.gt]: currentSchedule.start_time }
            },
            order: [['start_time', 'ASC']]
        });

        if (nextSchedule) {
            res.status(200).json(nextSchedule);
        } else {
            res.status(404).send('No next schedule found in the repeat series.');
        }
    } catch (error) {
        console.error(`Error fetching next schedule by repeat_series: ${error.message}`);
        res.status(500).send(error.message);
    }
};

// Handle GET request for all active schedules
exports.getActiveSchedules = async (req, res) => {
    try {
        const activeSchedules = await ScheduleModel.findAll({
            where: { active: true }
        });
        res.status(200).json(activeSchedules);
    } catch (error) {
        console.error('Error fetching active schedules:', error.message);
        res.status(500).send(error.message);
    }
};