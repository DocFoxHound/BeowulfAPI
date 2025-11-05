const express = require('express');
const router = express.Router();
const controller = require('../controllers/playerTrackerController');

// List and filters (define specific routes before parameterized :id)
router.get('/', controller.getAll);
router.get('/by-user/:user_id', controller.getByUserId);
router.get('/by-author/:author_id', controller.getByAuthorId);

// CRUD by ID
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
