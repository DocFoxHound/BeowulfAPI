const pool = require('../config/database');
const RecentGatheringModel = require('../models/recentGatheringsModel');

// Handle GET request for all __recentGathering
exports.getAllRecentGatherings = async (req, res) => {
    try {
        const __recentGathering = await RecentGatheringModel.findAll();
        res.status(200).json(__recentGathering);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a new __recentGathering
exports.createRecentGathering = async (req, res) => {
    try {
        const new__recentGathering = new RecentGatheringModel(req.body);
        const saved_recentGathering = await new__recentGathering.save();
        res.status(201).json(saved_recentGathering);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update a recentGathering by ID
exports.updateRecentGathering = async (req, res) => {
    try {
        // Find the __recentGathering first
        const __recentGathering = await RecentGatheringModel.findByPk(req.params.id);
        if (__recentGathering) {
            // Update the __recentGathering with new data from req.body
            const updated__recentGathering = await __recentGathering.update(req.body);
            res.status(200).json(updated__recentGathering);
        } else {
            res.status(404).send('RecentGathering not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to delete a recentGathering by ID
exports.deleteRecentGathering = async (req, res) => {
    const recentGatheringId = req.params.id;
    if (!recentGatheringId) {
        return res.status(400).send('RecentGathering ID is required');
    }
    try {
        const recentGathering = await RecentGatheringModel.findByPk(recentGatheringId);
        if (recentGathering) {
            await recentGathering.destroy();
            res.status(200).send('RecentGathering deleted');
        } else {
            res.status(404).send('RecentGathering not found');
        }
    } catch (error) {
        console.error(`Error deleting recentGathering: ${error.message}`);
        res.status(500).send(error.message);
    }
};

// // Handle GET request for recentGatherings by user ID
// exports.getRecentGatheringsByUserId = async (req, res) => {
//     const { user_id } = req.query;
//     try {
//         const recentGatherings = await RecentGatheringModel.findAll({
//             where: {
//                 user_id: user_id
//             }
//         });
//         if (recentGatherings.length > 0) {
//             res.status(200).json(recentGatherings);
//         } else {
//             res.status(404).send('No recentGatherings found for the given user ID');
//         }
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };

// // Handle GET request for recentGatherings by user ID
// exports.getRecentGatheringsByPatch = async (req, res) => {
//     const { patch } = req.query;
//     try {
//         const recentGatherings = await RecentGatheringModel.findAll({
//             where: {
//                 patch: patch
//             }
//         });
//         if (recentGatherings.length > 0) {
//             res.status(200).json(recentGatherings);
//         } else {
//             res.status(404).send('No recentGatherings found for the specified patch.');
//         }
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };

// exports.getByUserIdAndPatch = async (req, res) => {
//     const { user_id, patch } = req.query;
//     try {
//       const entries = await RecentGatheringModel.findAll({
//         where: {
//             user_id,
//             patch
//         }
//       });
  
//       if (entries.length > 0) {
//         res.status(200).json(entries);
//       } else {
//         res.status(404).send('No recentGathering found for the given user ID and patch');
//       }
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
// };