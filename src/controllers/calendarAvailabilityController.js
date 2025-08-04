const pool = require('../config/database');
const AvailabilityModel = require('../models/calendarAvailabilityModel');
const { Op } = require('sequelize');

// Handle GET request for all availability
exports.getAllAvailability = async (req, res) => {
    try {
        const availability = await AvailabilityModel.findAll();
        res.status(200).json(availability);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a new availability
exports.createAvailability = async (req, res) => {
    try {
        const savedAvailability = await AvailabilityModel.create(req.body);
        res.status(201).json(savedAvailability);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update a availability by ID
exports.updateAvailability = async (req, res) => {
    try {
        // Find the availability first
        const availability = await AvailabilityModel.findByPk(req.params.id);
        if (availability) {
            // Update the availability with new data from req.body
            const updatedAvailability = await availability.update(req.body);
            res.status(200).json(updatedAvailability);
        } else {
            res.status(404).send('Availability not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to delete a availability by ID
exports.deleteAvailability = async (req, res) => {
    const availabilityId = req.params.id;
    if (!availabilityId) {
        return res.status(400).send('Availability ID is required');
    }
    try {
        const availability = await AvailabilityModel.findByPk(availabilityId);
        if (availability) {
            await availability.destroy();
            res.status(200).send('Availability deleted');
        } else {
            res.status(404).send('Availability not found');
        }
    } catch (error) {
        console.error(`Error deleting availability: ${error.message}`);
        res.status(500).send(error.message);
    }
};

// Handle GET request for availability by user ID
exports.getAvailabilityByUserId = async (req, res) => {
    const { user_id } = req.query;
    try {
        const availability = await AvailabilityModel.findAll({
            where: {
                user_id: user_id
            }
        });
        if (availability.length > 0) {
            res.status(200).json(availability);
        } else {
            res.status(404).send('No availability found for the given user ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for availability by user ID
exports.getAvailabilityByPatch = async (req, res) => {
    const { patch } = req.query;
    try {
        const availability = await AvailabilityModel.findAll({
            where: {
                patch: patch
            }
        });
        if (availability.length > 0) {
            res.status(200).json(availability);
        } else {
            res.status(404).send('No availability found for the specified patch.');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for availabilities by user ID
exports.getWeekAvailabilities = async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).send('Both startDate and endDate are required.');
    }

    try {
        const availabilities = await AvailabilityModel.findAll({
            where: {
                timestamp: {
                    [Op.between]: [startDate, endDate] // Find dates between startDate and endDate
                }
            }
        });

        if (availabilities.length > 0) {
            res.status(200).json(availabilities);
        } else {
            res.status(404).send('No availabilities found for the given date range.');
        }
    } catch (error) {
        console.error(`Error fetching availabilities: ${error.message}`);
        res.status(500).send(error.message);
    }
};
