const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/userProfileController');

router.get('/', ctrl.list);
router.get('/:user_id', ctrl.get);
router.put('/:user_id', ctrl.upsert);
router.post('/', ctrl.upsert);
router.delete('/:user_id', ctrl.remove);

module.exports = router;
