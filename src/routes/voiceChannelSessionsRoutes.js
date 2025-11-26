const express = require('express');
const router = express.Router();
const controller = require('../controllers/voiceChannelSessionController');

router.get('/', controller.list);
router.get('/active', controller.getActive);
router.get('/lasthour', controller.getLastHour);
router.get('/timeframe', controller.getTimeframe);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
