const PlayerTracker = require('../models/playerTrackerModel');

// GET: Retrieve all player tracker entries
exports.getAll = async (req, res) => {
    try {
        const entries = await PlayerTracker.findAll();
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET: Retrieve a single entry by ID
exports.getById = async (req, res) => {
    try {
        const entry = await PlayerTracker.findByPk(req.params.id);
        if (!entry) return res.status(404).send('Entry not found');
        res.status(200).json(entry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET: Retrieve entries by user_id
exports.getByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;
        const entries = await PlayerTracker.findAll({ where: { user_id } });
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET: Retrieve entries by author_id
exports.getByAuthorId = async (req, res) => {
    try {
        const { author_id } = req.params;
        const entries = await PlayerTracker.findAll({ where: { author_id } });
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST: Create a new entry
exports.create = async (req, res) => {
    try {
        const newEntry = new PlayerTracker(req.body);
        const saved = await newEntry.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT: Update an entry by ID
exports.update = async (req, res) => {
    try {
        const entry = await PlayerTracker.findByPk(req.params.id);
        if (!entry) return res.status(404).send('Entry not found');
        const updated = await entry.update(req.body);
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE: Delete an entry by ID
exports.remove = async (req, res) => {
    try {
        const entry = await PlayerTracker.findByPk(req.params.id);
        if (!entry) return res.status(404).send('Entry not found');
        await entry.destroy();
        res.status(200).send('Entry deleted');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
