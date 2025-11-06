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
// DELETE request for deleting all entities
router.delete('/cities/', uexController.deleteAllCities);


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
// DELETE request for deleting all entities
router.delete('/commodities/', uexController.deleteAllCommodities);


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
// DELETE request for deleting all entities
router.delete('/terminalcommodities/', uexController.deleteAllTerminalCommodities);


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
// DELETE request for deleting all entities
router.delete('/summarizedcommodities/', uexController.deleteAllSummarizedCommodities);


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
// DELETE request for deleting all entities
router.delete('/terminalitems/', uexController.deleteAllTerminalItems);


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
// DELETE request for deleting all entities
router.delete('/sumarizeditems/', uexController.deleteAllSummarizedItems);


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
// DELETE request for deleting all entities
router.delete('/outposts/', uexController.deleteAllOutposts);


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
// DELETE request for deleting all entities
router.delete('/planets/', uexController.deleteAllPlanets);

//--------------------------------------------
//                 MOON ROUTES
//--------------------------------------------

// GET request for retrieving a list of all entities
router.get('/moons/', uexController.getAllMoons);

// GET request for retrieving a single entity by ID
router.get('/moons/:id', uexController.getMoonById);

// POST request for creating a new entity
router.post('/moons/', uexController.createMoon);

// PUT request for updating an existing entity by ID
router.put('/moons/:id', uexController.updateMoon);
// DELETE request for deleting all entities
router.delete('/moons/', uexController.deleteAllMoons);


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
// DELETE request for deleting all entities
router.delete('/spacestations/', uexController.deleteAllSpaceStations);


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
// DELETE request for deleting all entities
router.delete('/starsystems/', uexController.deleteAllStarSystems);


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
// DELETE request for deleting all entities
router.delete('/ships/', uexController.deleteAllShips);



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
// DELETE request for deleting all entities
router.delete('/terminals/', uexController.deleteAllTerminals);


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
// DELETE request for deleting all entities
router.delete('/terminalprices/', uexController.deleteAllTerminalPrices);


//--------------------------------------------
//         REFINERY YIELDS ROUTES
//--------------------------------------------

// GET request for retrieving a list of all entities
router.get('/refineryyields/', uexController.getAllRefineryYields);

// GET request for retrieving a single entity by ID
router.get('/refineryyields/:id', uexController.getRefineryYieldById);

// POST request for creating a new entity
router.post('/refineryyields/', uexController.createRefineryYield);

// PUT request for updating an existing entity by ID
router.put('/refineryyields/:id', uexController.updateRefineryYield);
// DELETE request for deleting all entities
router.delete('/refineryyields/', uexController.deleteAllRefineryYields);



module.exports = router;
