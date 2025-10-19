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
        const parentId = Date.now(); // Generate a unique ID based on the current timestamp

    // Retrieve all game versions from the database
    const patches = await GameVersionModel.findAll();
    const key = req.headers.authorization;

        // Sanitize and validate the time field (backward compatible)
        let sanitizedTime = req.body.time;
        if (sanitizedTime && typeof sanitizedTime === 'string') {
            // Accept "<...>" or raw ISO string
            if (sanitizedTime.startsWith('<') && sanitizedTime.endsWith('>')) {
                sanitizedTime = sanitizedTime.slice(1, -1);
            }
        }
        let parsedTime = new Date(sanitizedTime);
        if (!sanitizedTime || isNaN(parsedTime.getTime())) {
            // Fallback to server time to keep endpoint tolerant of older clients
            parsedTime = new Date();
        }

        // Determine patch version based on the kill time and patch creation times
        // Assumptions: GameVersion.id is the creation time in ms (number or numeric string), GameVersion.version is the patch string
        let patchVersion = '0.0';
        if (Array.isArray(patches) && patches.length > 0) {
            const sortedPatches = patches
                .filter(p => p && p.id !== undefined && p.id !== null)
                .sort((a, b) => Number(a.id) - Number(b.id)); // ascending by creation time

            if (sortedPatches.length > 0) {
                const timeMs = parsedTime.getTime();
                const firstStart = Number(sortedPatches[0].id);
                if (Number.isFinite(firstStart) && timeMs < firstStart) {
                    patchVersion = '0.0';
                } else {
                    // Find interval [start_i, start_{i+1}) that contains timeMs; for the last patch, end is +Infinity
                    for (let i = 0; i < sortedPatches.length; i++) {
                        const start = Number(sortedPatches[i].id);
                        const end = i + 1 < sortedPatches.length ? Number(sortedPatches[i + 1].id) : Number.POSITIVE_INFINITY;
                        if (timeMs >= start && timeMs < end) {
                            patchVersion = sortedPatches[i].version || patchVersion;
                            break;
                        }
                    }
                }
            }
        }

        // Create a new KillModel object with the required fields
        // Sanitize optional org fields to ensure missing/blank values don't cause issues
        const rawOrgSid = req.body.org_sid;
        const rawOrgPicture = req.body.org_picture;
        const orgSid = typeof rawOrgSid === 'string' ? (rawOrgSid.trim() || null) : null;
        const orgPicture = typeof rawOrgPicture === 'string' ? (rawOrgPicture.trim() || null) : null;

        // Sanitize optional location field
        const rawLocation = req.body.location;
        const location = typeof rawLocation === 'string' ? (rawLocation.trim() || null) : null;

        // Sanitize optional coordinates field; accept string, array, or {x,y,z}
        const rawCoords = req.body.coordinates;
        let coordinates = null;
        if (typeof rawCoords === 'string') {
            const trimmed = rawCoords.trim();
            coordinates = trimmed.length ? trimmed : null;
        } else if (Array.isArray(rawCoords)) {
            const parts = rawCoords
                .map(v => typeof v === 'number' ? String(v) : (typeof v === 'string' ? v.trim() : ''))
                .filter(v => v !== '');
            coordinates = parts.length ? parts.join(',') : null;
        } else if (rawCoords && typeof rawCoords === 'object') {
            const { x, y, z } = rawCoords;
            const nums = [x, y, z].map(n => Number(n));
            coordinates = nums.every(n => Number.isFinite(n)) ? nums.join(',') : null;
        }

        const new__kill = await KillModel.create({
            id: parentId,
            patch: patchVersion,
            time: parsedTime.toISOString(),
            player: req.body.player ?? null,
            victim: req.body.victim ?? null,
            zone: req.body.zone ?? null,
            location: location,           // Optional for backward compatibility
            coordinates: coordinates,
            weapon: req.body.weapon ?? null,
            rsi_profile: req.body.rsi_profile ?? null,
            game_mode: req.body.game_mode ?? null,
            client_ver: req.body.client_ver ?? null,
            killers_ship: req.body.killers_ship ?? 'N/A',
            key: key,
            damage_type: req.body.damage_type ?? null,
            org_sid: orgSid,
            org_picture: orgPicture,
        });

        killLogConvert(new__kill.dataValues);

        res.status(201).json(new__kill);
    } catch (error) {
        console.error("Error creating kill:", error.message);
        res.status(500).send(error.message);
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
