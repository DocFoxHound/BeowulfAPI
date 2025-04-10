const express = require('express');
const router = express.Router();
const uexController = require('../controllers/uexController');

//--------------------------------------------
//               CITY ROUTES
//--------------------------------------------

// GET request for retrieving a list of all entities
router.get('/cities/', uexController.getAllCities);

// GET request for retrieving a single entity by ID
router.get('/cities/:id', uexController.getCityById);

// POST request for creating a new entity
router.post('/cities/', uexController.createCity);

// PUT request for updating an existing entity by ID
router.put('/cities/:id', uexController.updateCity);


//--------------------------------------------
//             COMMODITY ROUTES
//--------------------------------------------

// GET request for retrieving a list of all entities
router.get('/commodities/', uexController.getAllCommodities);

// GET request for retrieving a single entity by ID
router.get('/commodities/:id', uexController.getCommodityById);

// POST request for creating a new entity
router.post('/commodities/', uexController.createCommodity);

// PUT request for updating an existing entity by ID
router.put('/commodities/:id', uexController.updateCommodity);


//--------------------------------------------
//        COMMODITY BY TERMINAL ROUTES
//--------------------------------------------

// GET request for retrieving a list of all entities
router.get('/terminalcommodities/', uexController.getAllTerminalCommodities);

// GET request for retrieving a single entity by ID
router.get('/terminalcommodities/:id', uexController.getTerminalCommodityById);

// POST request for creating a new entity
router.post('/terminalcommodities/', uexController.createTerminalCommodity);

// PUT request for updating an existing entity by ID
router.put('/terminalcommodities/:id', uexController.updateTerminalCommodity);


//--------------------------------------------
//        COMMODITY SUMMARIZED ROUTES
//--------------------------------------------

// GET request for retrieving a list of all entities
router.get('/summarizedcommodities/', uexController.getAllSummarizedCommodities);

// GET request for retrieving a single entity by ID
router.get('/summarizedcommodities/:id', uexController.getSummarizedCommodityById);

// POST request for creating a new entity
router.post('/summarizedcommodities/', uexController.createSummarizedCommodity);

// PUT request for updating an existing entity by ID
router.put('/summarizedcommodities/:id', uexController.updateSummarizedCommodity);


//--------------------------------------------
//           ITEM BY TERMINAL ROUTES
//--------------------------------------------

// GET request for retrieving a list of all entities
router.get('/terminalitems/', uexController.getAllTerminalItems);

// GET request for retrieving a single entity by ID
router.get('/terminalitems/:id', uexController.getTerminalItemById);

// POST request for creating a new entity
router.post('/terminalitems/', uexController.createTerminalItem);

// PUT request for updating an existing entity by ID
router.put('/terminalitems/:id', uexController.updateTerminalItem);


//--------------------------------------------
//           ITEMS SUMMARIZED ROUTES
//--------------------------------------------

// GET request for retrieving a list of all entities
router.get('/sumarizeditems/', uexController.getAllSummarizedItems);

// GET request for retrieving a single entity by ID
router.get('/sumarizeditems/:id', uexController.getSummarizedItemById);

// POST request for creating a new entity
router.post('/sumarizeditems/', uexController.createSummarizedItem);

// PUT request for updating an existing entity by ID
router.put('/sumarizeditems/:id', uexController.updateSummarizedItem);


//--------------------------------------------
//              OUTPOST ROUTES
//--------------------------------------------

// GET request for retrieving a list of all entities
router.get('/outposts/', uexController.getAllOutposts);

// GET request for retrieving a single entity by ID
router.get('/outposts/:id', uexController.getOutpostById);

// POST request for creating a new entity
router.post('/outposts/', uexController.createOutpost);

// PUT request for updating an existing entity by ID
router.put('/outposts/:id', uexController.updateOutpost);


//--------------------------------------------
//               PLANET ROUTES
//--------------------------------------------

// GET request for retrieving a list of all entities
router.get('/planets/', uexController.getAllPlanets);

// GET request for retrieving a single entity by ID
router.get('/planets/:id', uexController.getPlanetById);

// POST request for creating a new entity
router.post('/planets/', uexController.createPlanet);

// PUT request for updating an existing entity by ID
router.put('/planets/:id', uexController.updatePlanet);


//--------------------------------------------
//            SPACE STATION ROUTES
//--------------------------------------------

// GET request for retrieving a list of all entities
router.get('/spacestations/', uexController.getAllSpaceStations);

// GET request for retrieving a single entity by ID
router.get('/spacestations/:id', uexController.getSpaceStationById);

// POST request for creating a new entity
router.post('/spacestations/', uexController.createSpaceStation);

// PUT request for updating an existing entity by ID
router.put('/spacestations/:id', uexController.updateSpaceStation);


//--------------------------------------------
//             STAR SYSTEM ROUTES
//--------------------------------------------

// GET request for retrieving a list of all entities
router.get('/starsystems/', uexController.getAllStarSystems);

// GET request for retrieving a single entity by ID
router.get('/starsystems/:id', uexController.getStarSystemById);

// POST request for creating a new entity
router.post('/starsystems/', uexController.createStarSystem);

// PUT request for updating an existing entity by ID
router.put('/starsystems/:id', uexController.updateStarSystem);


//--------------------------------------------
//                 SHIP ROUTES
//--------------------------------------------

// GET request for retrieving a list of all entities
router.get('/ships/', uexController.getAllShips);

// GET request for retrieving a single entity by ID
router.get('/ships/:id', uexController.getShipById);

// POST request for creating a new entity
router.post('/ships/', uexController.createShip);

// PUT request for updating an existing entity by ID
router.put('/ships/:id', uexController.updateShip);



//--------------------------------------------
//             TERMINAL ROUTES
//--------------------------------------------

// GET request for retrieving a list of all entities
router.get('/terminals/', uexController.getAllTerminals);

// GET request for retrieving a single entity by ID
router.get('/terminals/:id', uexController.getTerminalById);

// POST request for creating a new entity
router.post('/terminals/', uexController.createTerminal);

// PUT request for updating an existing entity by ID
router.put('/terminals/:id', uexController.updateTerminal);


//--------------------------------------------
//           TERMINAL PRICES ROUTES
//--------------------------------------------

// GET request for retrieving a list of all entities
router.get('/terminalprices/', uexController.getAllTerminalPrices);

// GET request for retrieving a single entity by ID
router.get('/terminalprices/:id', uexController.getTerminalPricesById);

// POST request for creating a new entity
router.post('/terminalprices/', uexController.createTerminalPrices);

// PUT request for updating an existing entity by ID
router.put('/terminalprices/:id', uexController.updateTerminalPrices);



module.exports = router;
