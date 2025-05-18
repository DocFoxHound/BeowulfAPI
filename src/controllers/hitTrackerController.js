const pool = require('../config/database');
const HitTrack = require('../models/hitTrackerModel');
// const { Sequelize } = require('sequelize');
const sequelize = require('../config/database'); // Import the Sequelize instance

exports.getAll = async (req, res) => {
    try {
        const entries = await HitTrack.findAll();
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getByUserId = async (req, res) => {
    const { user_id } = req.query;
    try {
        const entries = await HitTrack.findAll({
            where: {
                user_id: user_id
            }
        });
        if (entries.length > 0) {
            res.status(200).json(entries);
        } else {
            res.status(404).send('No HitTrack found for the given user ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getByEntryId = async (req, res) => {
    const { id } = req.query;
    console.log("\nid", id);
    try {
        const entry = await HitTrack.findOne({
            where: {
                id: id
            }
        });
        if (entry) {
            res.status(200).json(entry);
        } else {
            res.status(404).send('No HitTrack found for the given ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getByPatch = async (req, res) => {
    const { patch } = req.query;
    console.log('\npatch', patch);
    try {
        const entries = await HitTrack.findAll({
            where: {
                patch: patch
            }
        });
        if (entries.length > 0) {
            res.status(200).json(entries);
        } else {
            res.status(404).send('No HitTrack found for the given user ID and patch');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};



exports.getByUserIdAndPatch = async (req, res) => {
    const { user_id, patch } = req.query;
    try {
      const entries = await HitTrack.findAll({
        where: {
            user_id,
            patch
        }
      });
  
      if (entries.length > 0) {
        res.status(200).json(entries);
      } else {
        res.status(404).send('No Hit Track found for the given user ID and patch');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
};

exports.getAssistEntries = async (req, res) => {
    const user_id = req.query.user_id;
    try {
      const entries = await sequelize.query(
        'SELECT * FROM hit_tracker WHERE :user_id = ANY(assists)',
        {
          replacements: { user_id },
          type: sequelize.QueryTypes.SELECT
        }
      );      
      res.status(200).json(entries);
    } catch (error) {
      console.error('Error querying assistant shiplog:', error.message);
      res.status(500).send(error.message);
    }
};


exports.getAssistEntriesUserPatch = async (req, res) => {
    const { user_id, patch } = req.query;
    try {
        const entries = await sequelize.query(
            'SELECT * FROM hit_tracker WHERE :user_id = ANY(assists) AND patch = :patch',
            {
                replacements: { user_id, patch },
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (entries.length > 0) {
            res.status(200).json(entries);
        } else {
            res.status(404).send('No Hit Track found for the given user ID and patch');
        }
    } catch (error) {
        console.error('Error querying assistant Hit Track with patch:', error.message);
        res.status(500).send(error.message);
    }
};


exports.create = async (req, res) => {
    try {
        const new_entry = new HitTrack(req.body);
        const saved_entry = await new_entry.save();
        res.status(201).json(saved_entry);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.update = async (req, res) => {
    try {
        // Find the __badge first
        const entry = await HitTrack.findByPk(req.params.id);
        if (entry) {
            // Update the __badge with new data from req.body
            const updated_entry = await entry.update(req.body);
            res.status(200).json(updated_entry);
        } else {
            res.status(404).send('HitTrack not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.delete = async (req, res) => {
    const entryId = req.params.id;
    if (!entryId) {
        return res.status(400).send('HitTrack ID is required');
    }
    try {
        const entry = await HitTrack.findByPk(entryId);
        if (entry) {
            await entry.destroy();
            res.status(200).send('HitTrack deleted');
        } else {
            res.status(404).send('HitTrack not found');
        }
    } catch (error) {
        console.error(`Error deleting HitTrack: ${error.message}`);
        res.status(500).send(error.message);
    }
};

exports.getLatest = async (req, res) => {
    try {
        const entries = await HitTrack.findAll({
            order: [['id', 'DESC']],
            limit: 10
        });
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

