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

// // Handle GET request for a single __player by ID
// exports.getBadgeByPlayerId = async (req, res) => {
//     try {
//         const __player = await BadgeModel.findByPk(req.params.id);
//         if (__player) {
//             res.status(200).json(__player);
//         } else {
//             res.status(404).send('Player not found');
//         }
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };

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

// Handle DELETE request to delete a __badge by ID
exports.deleteBadge = async (req, res) => {
    const __badgeId = req.params.id;
    try {
        const result = await pool.query('DELETE FROM badges WHERE id = $1 RETURNING *;', [__badgeId]);
        if (result.rows.length > 0) {
            res.status(200).send('Badge deleted');
        } else {
            res.status(404).send('Badge not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for badges by user ID
exports.getBadgesByUserId = async (req, res) => {
    const { user_id } = req.params;
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
