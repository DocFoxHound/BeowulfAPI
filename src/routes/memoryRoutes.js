const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/memoryController');

router.post('/search/vector', ctrl.vectorSearch);
router.put('/:id/vector', ctrl.updateVector);
router.put('/:memory_id/embedding', ctrl.updateEmbedding);

router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
