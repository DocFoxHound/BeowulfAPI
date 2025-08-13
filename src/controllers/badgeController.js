const pool = require('../config/database');
const BadgeModel = require('../models/badgeModel');

// Handle GET request for all __badge
exports.getAllBadges = async (req, res) => {
    try {
        const __badge = await BadgeModel.findAll();
        res.status(200).json(__badge);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a new __badge
exports.createBadge = async (req, res) => {
    try {
        const new__badge = new BadgeModel(req.body);
        const saved_badge = await new__badge.save();
        res.status(201).json(saved_badge);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update a badge by ID
exports.updateBadge = async (req, res) => {
    try {
        // Find the __badge first
        const __badge = await BadgeModel.findByPk(req.params.id);
        if (__badge) {
            // Update the __badge with new data from req.body
            const updated__badge = await __badge.update(req.body);
            res.status(200).json(updated__badge);
        } else {
            res.status(404).send('Badge not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to delete a badge by ID
exports.deleteBadge = async (req, res) => {
    const badgeId = req.params.id;
    if (!badgeId) {
        return res.status(400).send('Badge ID is required');
    }
    try {
        const badge = await BadgeModel.findByPk(badgeId);
        if (badge) {
            await badge.destroy();
            res.status(200).send('Badge deleted');
        } else {
            res.status(404).send('Badge not found');
        }
    } catch (error) {
        console.error(`Error deleting badge: ${error.message}`);
        res.status(500).send(error.message);
    }
};

// Handle GET request for badges by user ID
exports.getBadgesByUserId = async (req, res) => {
    const { user_id } = req.query;
    try {
        const badges = await BadgeModel.findAll({
            where: {
                user_id: user_id
            }
        });
        if (badges.length > 0) {
            res.status(200).json(badges);
        } else {
            res.status(404).send('No badges found for the given user ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for badges by user ID
exports.getBadgesByUserIdAndAccolade = async (req, res) => {
    const { user_id } = req.query;
    try {
        const badges = await BadgeModel.findAll({
            where: {
                user_id: user_id,
                accolade: true
            }
        });
        if (badges.length > 0) {
            res.status(200).json(badges);
        } else {
            res.status(404).send('No badges found for the given user ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for badges by user ID
exports.getBadgesByPatch = async (req, res) => {
    const { patch } = req.query;
    try {
        const badges = await BadgeModel.findAll({
            where: {
                patch: patch
            }
        });
        if (badges.length > 0) {
            res.status(200).json(badges);
        } else {
            res.status(404).send('No badges found for the specified patch.');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};