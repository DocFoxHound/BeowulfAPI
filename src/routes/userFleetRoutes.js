const express = require('express');
const router = express.Router();
const fleetController = require('../controllers/userFleetController');

router.get('/', fleetController.getAllFleets);

router.get('/commander', fleetController.getFleetsByCommanderId);

router.get('/fleet', fleetController.getFleetById);

router.get('/members', fleetController.getFleetByMember);

router.get('/activeornot', fleetController.getFleetsByActivtyOrNot);

router.post('/', fleetController.createFleet);

router.put('/:id', fleetController.updateFleet);

router.delete('/:id', fleetController.deleteFleet);

module.exports = router;
