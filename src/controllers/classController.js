const ClassModel = require('../models/classModel');

// Handle GET request for all __classs
exports.getAllClasses = async (req, res) => {
    try {
        const __classs = await ClassModel.findAll();
        res.status(200).json(__classs);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single __class by ID
exports.getClassById = async (req, res) => {
    try {
        const __class = await ClassModel.findByPk(req.params.id);
        if (__class) {
            res.status(200).json(__class);
        } else {
            res.status(404).send('Class not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a new __class
exports.createClass = async (req, res) => {
    try {
        const new__Class = new ClassModel(req.body);
        const saved__Class = await new__Class.save();
        res.status(201).json(saved__Class);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update a class by ID
exports.updateClass = async (req, res) => {
    try {
        // Find the __class first
        const __class = await ClassModel.findByPk(req.params.id);
        if (__class) {
            // Update the __class with new data from req.body
            const updated__Class = await __class.update(req.body);
            res.status(200).json(updated__Class);
        } else {
            res.status(404).send('Class not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to delete a __class by ID
exports.deleteClass = async (req, res) => {
    const __classId = req.params.id;
    try {
        const result = await pool.query('DELETE FROM class WHERE id = $1 RETURNING *;', [__classId]);
        if (result.rows.length > 0) {
            res.status(200).send('Class deleted');
        } else {
            res.status(404).send('Class not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
