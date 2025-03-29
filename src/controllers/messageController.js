const { Op } = require('sequelize');
const MessageModel = require('../models/messageModel');

// Handle GET request for all __badge
exports.getAllMessages = async (req, res) => {
    try {
        const message = await MessageModel.findAll();
        res.status(200).json(message);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a new __badge
exports.createMessage = async (req, res) => {
    try {
        const newMessage = new MessageModel(req.body);
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to delete a badge by ID
exports.deleteMessage = async (req, res) => {
    const messageId = req.params.id;
    if (!messageId) {
        return res.status(400).send('Message ID is required');
    }
    try {
        const message = await MessageModel.findByPk(messageId);
        if (message) {
            await message.destroy();
            res.status(200).send('Message deleted');
        } else {
            res.status(404).send('Message not found');
        }
    } catch (error) {
        console.error(`Error deleting message: ${error.message}`);
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to delete messages older than a specified date THIS IS FROM THREAD CONTROLLER
exports.deleteMessagesOlderThan = async (req, res) => {
    const { date } = req.body;
    if (!date) {
        return res.status(400).send('Date is required');
    }
    try {
        const result = await MessageModel.destroy({
            where: {
                createdAt: {
                    [Op.lt]: new Date(date)
                }
            }
        });
        res.status(200).send(`${result} messages deleted`);
    } catch (error) {
        console.error(`Error deleting messages: ${error.message}`);
        res.status(500).send(error.message);
    }
};

// DELETE request to delete by the channel name and amount of messages
exports.deleteMessagesByCount = async (req, res) => {
    const { name, number } = req.params;
    if (!name || !number) {
        return res.status(400).send('Channel name and number of messages are required');
    }
    try {

        // Find the IDs of the messages to keep (the newest `limit` messages)
        const messagesToKeep = await MessageModel.findAll({
            where: { channel_name: name },
            order: [['id', 'DESC']],
            limit: number,
            attributes: ['id'], // Only fetch the IDs
        });

        // Extract the IDs of the messages to keep
        const idsToKeep = messagesToKeep.map(message => message.id);

        // Delete messages that are not in the list of IDs to keep
        const result = await MessageModel.destroy({
            where: {
                channel_name: name,
                id: { [Op.notIn]: idsToKeep }, // Exclude the IDs to keep
            },
        });

        res.status(200).send(`${result} messages deleted`);
    } catch (error) {
        console.error(`Error deleting messages: ${error.message}`);
        res.status(500).send(error.message);
    }
};