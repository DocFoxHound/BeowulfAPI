const pool = require('../config/database');
const EventParticipantModel = require('../models/eventparticipantModel');

// Handle GET request for all __eventParticipant
exports.getAllEventParticipants = async (req, res) => {
    try {
        const __eventParticipant = await EventParticipantModel.findAll();
        res.status(200).json(__eventParticipant);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a new __eventParticipant
exports.createEventParticipant = async (req, res) => {
    try {
        const new__eventParticipant = new EventParticipantModel(req.body);
        const saved_eventParticipant = await new__eventParticipant.save();
        res.status(201).json(saved_eventParticipant);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update a eventParticipant by ID
exports.updateEventParticipant = async (req, res) => {
    try {
        // Find the __eventParticipant first
        const __eventParticipant = await EventParticipantModel.findByPk(req.params.id);
        if (__eventParticipant) {
            // Update the __eventParticipant with new data from req.body
            const updated__eventParticipant = await __eventParticipant.update(req.body);
            res.status(200).json(updated__eventParticipant);
        } else {
            res.status(404).send('EventParticipant not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to delete a eventParticipant by ID
exports.deleteEventParticipant = async (req, res) => {
    const eventParticipantId = req.params.id;
    if (!eventParticipantId) {
        return res.status(400).send('EventParticipant ID is required');
    }
    try {
        const eventParticipant = await EventParticipantModel.findByPk(eventParticipantId);
        if (eventParticipant) {
            await eventParticipant.destroy();
            res.status(200).send('EventParticipant deleted');
        } else {
            res.status(404).send('EventParticipant not found');
        }
    } catch (error) {
        console.error(`Error deleting eventParticipant: ${error.message}`);
        res.status(500).send(error.message);
    }
};

// Handle GET request for eventParticipants by user ID
exports.getEventParticipantsByUserId = async (req, res) => {
    const { user_id } = req.query;
    try {
        const eventParticipants = await EventParticipantModel.findAll({
            where: {
                user_id: user_id
            }
        });
        if (eventParticipants.length > 0) {
            res.status(200).json(eventParticipants);
        } else {
            res.status(404).send('No eventParticipants found for the given user ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for eventParticipants by user ID
exports.getEventParticipantsByPatch = async (req, res) => {
    const { patch } = req.query;
    try {
        const eventParticipants = await EventParticipantModel.findAll({
            where: {
                patch: patch
            }
        });
        if (eventParticipants.length > 0) {
            res.status(200).json(eventParticipants);
        } else {
            res.status(404).send('No eventParticipants found for the specified patch.');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};