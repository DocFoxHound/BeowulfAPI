const pool = require('../config/database');
const LessonLearned = require('../models/lessonLearnedModel');

// Handle GET request for all Lesson
exports.getAllLessons = async (req, res) => {
    try {
        const lesson = await LessonLearned.findAll();
        res.status(200).json(lesson);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a new Lesson
exports.createLesson = async (req, res) => {
    console.log("\nTEST\n")
    try {
        const newLesson = new LessonLearned(req.body);
        const savedLesson = await newLesson.save();
        res.status(201).json(savedLesson);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to delete a Lesson by ID
exports.deleteLesson = async (req, res) => {
    const lessonId = req.params.id;
    if (!lessonId) {
        return res.status(400).send('Lesson ID is required');
    }
    try {
        const lesson = await LessonLearned.findByPk(lessonId);
        if (lesson) {
            await lesson.destroy();
            res.status(200).send('Lesson deleted');
        } else {
            res.status(404).send('Lesson not found');
        }
    } catch (error) {
        console.error(`Error deleting Lesson: ${error.message}`);
        res.status(500).send(error.message);
    }
};