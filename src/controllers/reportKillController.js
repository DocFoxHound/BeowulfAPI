const pool = require('../config/database');
const KillModel = require('../models/reportKillModel');
const GameVersionModel = require('../models/gameVersionModel'); // Import the GameVersionModel
const { killLogConvert } = require('../logic/killLogConverter');

// Handle GET request for all __kill
exports.getAllKills = async (req, res) => {
    try {
        const __kill = await KillModel.findAll();
        res.status(200).json(__kill);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a new __kill
exports.createKill = async (req, res) => {
    try {
        const parentId = new Date().getTime(); // Generate a unique ID based on the current timestamp

        // Retrieve all game versions from the database
        const patches = await GameVersionModel.findAll();
        const latestPatchesSorted = patches.sort((a, b) => b.id - a.id);
        const latestPatch = latestPatchesSorted[0].version; // Get the latest patch
        const key = req.headers.authorization

        // Sanitize and validate the time field
        let sanitizedTime = req.body.time;
        if (sanitizedTime && sanitizedTime.startsWith('<') && sanitizedTime.endsWith('>')) {
            sanitizedTime = sanitizedTime.slice(1, -1); // Remove angle brackets
        }

        const parsedTime = new Date(sanitizedTime);
        if (!sanitizedTime || isNaN(parsedTime.getTime())) {
            return res.status(400).send('Invalid time format. Please provide a valid ISO 8601 date string.');
        }

        // Create a new KillModel object with only the required fields
        const new__kill = await KillModel.create({
            id: parentId, // Set the id to the generated parentId
            patch: latestPatch, // Add the latest patch to the kill object
            time: parsedTime.toISOString(), // Use the sanitized and validated time
            player: req.body.player,
            victim: req.body.victim,
            zone: req.body.zone,
            weapon: req.body.weapon,
            rsi_profile: req.body.rsi_profile,
            game_mode: req.body.game_mode,
            client_ver: req.body.client_ver,
            killers_ship: req.body.killers_ship,
            key: key
        });

        console.log("New Kill ", new__kill);
        killLogConvert(new__kill.dataValues); // Call the killLogConvert function with the new kill object

        res.status(201).json(new__kill); // Respond with the saved kill
    } catch (error) {
        console.error("Error creating kill:", error.message);
        res.status(500).send(error.message); // Handle errors
    }
};

// Handle DELETE request to delete a kill by ID
exports.deleteKill = async (req, res) => {
    const killId = req.params.id;
    if (!killId) {
        return res.status(400).send('Kill ID is required');
    }
    try {
        const kill = await KillModel.findByPk(killId);
        if (kill) {
            await kill.destroy();
            res.status(200).send('Kill deleted');
        } else {
            res.status(404).send('Kill not found');
        }
    } catch (error) {
        console.error(`Error deleting kill: ${error.message}`);
        res.status(500).send(error.message);
    }
};

// Handle GET request for Kills by user ID
exports.getKillById = async (req, res) => {
    const { id } = req.query;
    try {
        const foundKill = await KillModel.findOne({
            where: {
                id: id
            }
        });
        if (foundKill) {
            res.status(200).json(foundKill);
        } else {
            res.status(404).send('No Kills found for the given user ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for Kills by user ID
exports.getKillByUserId = async (req, res) => {
    const { user_id } = req.query;
    try {
        const foundKill = await KillModel.findOne({
            where: {
                user_id: user_id
            }
        });
        if (foundKill) {
            res.status(200).json(foundKill);
        } else {
            res.status(404).send('No Kills found for the given user ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.validateKill = async (req, res) => {
    const kill = req.query.kill || req.headers.authorization;
  
    if (!kill) return res.status(400).send('Missing kill');
  
    try {
      const foundKill = await KillModel.findOne({ where: { kill } });
      if (foundKill) {
        return res.status(200).json(foundKill);
      } else {
        return res.status(404).send('Kill not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
};
