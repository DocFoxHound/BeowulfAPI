const UserModel = require('../models/userModel');
const { Op } = require('sequelize');

// Handle GET request for all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a new user
exports.createUser = async (req, res) => {
    try {
        const newUser = new UserModel(req.body);

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// // Handle PUT request to update a user by ID
// exports.updateUser = async (req, res) => {
//     try {
//         const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (updatedUser) {
//             res.status(200).json(updatedUser);
//         } else {
//             res.status(404).send('User not found');
//         }
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };

// Handle PUT request to update a user by ID
exports.updateUser = async (req, res) => {
    try {
        // Find the user first
        const user = await UserModel.findByPk(req.params.id);
        if (user) {
            // Update the user with new data from req.body
            const updatedUser = await user.update(req.body);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to delete a user by ID
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).send('User ID is required');
    }
    try {
        const user = await UserModel.findByPk(userId);
        if (user) {
            await user.destroy();
            res.status(200).send('User deleted');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(`Error deleting user: ${error.message}`);
        res.status(500).send(error.message);
    }
};

exports.getUsersByCorsairLevel = async (req, res) => {
    const level = req.query.level;
    try {
        const users = await UserModel.findAll({
            where: { corsair_level: level }
        });
        if (users && users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: 'No users found with Corsair level ' + level });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Handle GET request to retrieve users whose roles contain any RONIN_IDS
exports.getUsersByRoninRole = async (req, res) => {
    // Get RONIN_IDS from environment variable and split into array
    const roninIds = (process.env.RONIN_IDS || '').split(',').map(id => id.trim());
    try {
        // Find all users where roles contains any of the RONIN_IDS
        const users = await UserModel.findAll({
            where: {
                roles: {
                    // Sequelize 'overlap' operator for arrays
                    [require('sequelize').Op.overlap]: roninIds
                }
            }
        });
        if (users && users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: 'No users found with Ronin roles' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Handle GET request to retrieve users whose roles contain any FLEET_COMMANDER_IDS
exports.getUsersByFleetCommanderRole = async (req, res) => {
    // Get FLEET_COMMANDER_IDS from environment variable and split into array
    const fleetCommanderIds = (process.env.FLEET_COMMANDER_IDS || '').split(',').map(id => id.trim());
    try {
        // Find all users where roles contains any of the FLEET_COMMANDER_IDS
        const users = await UserModel.findAll({
            where: {
                roles: {
                    [require('sequelize').Op.overlap]: fleetCommanderIds
                }
            }
        });
        if (users && users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: 'No users found with Fleet Commander roles' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
