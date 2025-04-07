const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');

// GET request for retrieving a list of all users
router.get('/', warehouseController.getAll);

// GET request for retrieving all badges by user ID
router.get('/user', warehouseController.getByUserId);

// GET request for retrieving all badges by user ID
router.get('/patch', warehouseController.getByPatch);

// GET request for retrieving all badges by user ID
router.get('/entry', warehouseController.getByEntryId);

// GET request for retrieving all badges by user ID
router.get('/commodity', warehouseController.getByCommodity);

// GET request for retrieving all badges by user ID
router.get('/userandpatch', warehouseController.getByUserIdAndPatch);

// GET request for retrieving all badges by user ID
router.get('/userandcommodity', warehouseController.getByUserAndCommodity);

// GET request for retrieving all badges by user ID
router.get('/commodityandpatch', warehouseController.getByCommodityAndPatch);

// POST request for creating a new user
router.post('/', warehouseController.create);

// PUT request for updating an existing user by ID
router.put('/:id', warehouseController.update);

// DELETE request for deleting a user by ID
router.delete('/:id', warehouseController.delete);

module.exports = router;
