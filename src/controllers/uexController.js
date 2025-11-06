const pool = require('../config/database');
const CityModel = require('../models/uexCityModel');
const CommodityModel = require('../models/uexCommodityModel');
const OutpostModel = require('../models/uexOutpostModel');
const PlanetModel = require('../models/uexPlanetModel');
const SpaceStationModel = require('../models/uexSpaceStationModel');
const StarSystemModel = require('../models/uexStarSystemModel');
const TerminalModel = require('../models/uexTerminalModel');
const TerminalPricesModel = require('../models/uexTerminalPricesModel');
const ShipModel = require('../models/uexShipModel');
const CommodityByTerminal = require('../models/uexCommodityByTerminalModel');
const ItemByTerminal = require('../models/uexItemByTerminalModel');
const CommoditySummary = require('../models/uexCommoditySummaryModel');
const ItemSummary = require('../models/uexItemSummaryModel');
const MoonModel = require('../models/uexMoonModel');
const RefineryYieldModel = require('../models/uexRefineryYieldModel');



//--------------------------------------------
//              CITY CONTROLLER               CityModel
//--------------------------------------------


// Handle GET request for all entities
exports.getAllCities = async (req, res) => {
    try {
        const entity = await CityModel.findAll();
        res.status(200).json(entity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single entity by ID
exports.getCityById = async (req, res) => {
    try {
        const id = await CityModel.findByPk(req.params.id);
        if (id) {
            res.status(200).json(id);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a entity
exports.createCity = async (req, res) => {
    try {
        const newEntity = new CityModel(req.body);
        const savedEntity = await newEntity.save();
        res.status(201).json(savedEntity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update an entity by ID
exports.updateCity = async (req, res) => {
    try {
        // Find the __badge first
        const entity = await CityModel.findByPk(req.params.id);
        if (entity) {
            // Update the __badge with new data from req.body
            const updatedEntity = await entity.update(req.body);
            res.status(200).json(updatedEntity);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to remove all entities
exports.deleteAllCities = async (req, res) => {
    try {
        const deleted = await CityModel.destroy({ where: {} });
        res.status(200).json({ deleted });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//--------------------------------------------
//           COMMODITY CONTROLLER             CommodityModel
//--------------------------------------------

// Handle GET request for all entities
exports.getAllCommodities = async (req, res) => {
    try {
        const entity = await CommodityModel.findAll();
        res.status(200).json(entity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single entity by ID
exports.getCommodityById = async (req, res) => {
    try {
        const id = await CommodityModel.findByPk(req.params.id);
        if (id) {
            res.status(200).json(id);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a entity
exports.createCommodity = async (req, res) => {
    try {
        const newEntity = new CommodityModel(req.body);
        const savedEntity = await newEntity.save();
        res.status(201).json(savedEntity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update an entity by ID
exports.updateCommodity = async (req, res) => {
    try {
        // Find the __badge first
        const entity = await CommodityModel.findByPk(req.params.id);
        if (entity) {
            // Update the __badge with new data from req.body
            const updatedEntity = await entity.update(req.body);
            res.status(200).json(updatedEntity);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to remove all entities
exports.deleteAllCommodities = async (req, res) => {
    try {
        const deleted = await CommodityModel.destroy({ where: {} });
        res.status(200).json({ deleted });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//--------------------------------------------
//      COMMODITY BY TERMINAL CONTROLLER      CommodityByTerminal
//--------------------------------------------

// Handle GET request for all entities
exports.getAllTerminalCommodities = async (req, res) => {
    try {
        const entity = await CommodityByTerminal.findAll();
        res.status(200).json(entity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single entity by ID
exports.getTerminalCommodityById = async (req, res) => {
    try {
        const id = await CommodityByTerminal.findByPk(req.params.id);
        if (id) {
            res.status(200).json(id);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a entity
exports.createTerminalCommodity = async (req, res) => {
    try {
        const newEntity = new CommodityByTerminal(req.body);
        const savedEntity = await newEntity.save();
        res.status(201).json(savedEntity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update an entity by ID
exports.updateTerminalCommodity = async (req, res) => {
    try {
        // Find the __badge first
        const entity = await CommodityByTerminal.findByPk(req.params.id);
        if (entity) {
            // Update the __badge with new data from req.body
            const updatedEntity = await entity.update(req.body);
            res.status(200).json(updatedEntity);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to remove all entities
exports.deleteAllTerminalCommodities = async (req, res) => {
    try {
        const deleted = await CommodityByTerminal.destroy({ where: {} });
        res.status(200).json({ deleted });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//--------------------------------------------
//        COMMODITY SUMMARY CONTROLLER        CommoditySummary
//--------------------------------------------

// Handle GET request for all entities
exports.getAllSummarizedCommodities = async (req, res) => {
    try {
        const entity = await CommoditySummary.findAll();
        res.status(200).json(entity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single entity by ID
exports.getSummarizedCommodityById = async (req, res) => {
    try {
        const id = await CommoditySummary.findByPk(req.params.id);
        if (id) {
            res.status(200).json(id);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a entity
exports.createSummarizedCommodity = async (req, res) => {
    try {
        const newEntity = new CommoditySummary(req.body);
        const savedEntity = await newEntity.save();
        res.status(201).json(savedEntity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update an entity by ID
exports.updateSummarizedCommodity = async (req, res) => {
    try {
        // Find the __badge first
        const entity = await CommoditySummary.findByPk(req.params.id);
        if (entity) {
            // Update the __badge with new data from req.body
            const updatedEntity = await entity.update(req.body);
            res.status(200).json(updatedEntity);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to remove all entities
exports.deleteAllSummarizedCommodities = async (req, res) => {
    try {
        const deleted = await CommoditySummary.destroy({ where: {} });
        res.status(200).json({ deleted });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//--------------------------------------------
//         ITEM BY TERMINAL CONTROLLER        ItemByTerminal
//--------------------------------------------

// Handle GET request for all entities
exports.getAllTerminalItems = async (req, res) => {
    try {
        const entity = await ItemByTerminal.findAll();
        res.status(200).json(entity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single entity by ID
exports.getTerminalItemById = async (req, res) => {
    try {
        const id = await ItemByTerminal.findByPk(req.params.id);
        if (id) {
            res.status(200).json(id);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a entity
exports.createTerminalItem = async (req, res) => {
    try {
        const newEntity = new ItemByTerminal(req.body);
        const savedEntity = await newEntity.save();
        res.status(201).json(savedEntity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update an entity by ID
exports.updateTerminalItem = async (req, res) => {
    try {
        // Find the __badge first
        const entity = await ItemByTerminal.findByPk(req.params.id);
        if (entity) {
            // Update the __badge with new data from req.body
            const updatedEntity = await entity.update(req.body);
            res.status(200).json(updatedEntity);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to remove all entities
exports.deleteAllTerminalItems = async (req, res) => {
    try {
        const deleted = await ItemByTerminal.destroy({ where: {} });
        res.status(200).json({ deleted });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//--------------------------------------------
//           ITEM SUMMARY CONTROLLER          ItemSummary
//--------------------------------------------

// Handle GET request for all entities
exports.getAllSummarizedItems = async (req, res) => {
    try {
        const entity = await ItemSummary.findAll();
        res.status(200).json(entity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single entity by ID
exports.getSummarizedItemById = async (req, res) => {
    try {
        const id = await ItemSummary.findByPk(req.params.id);
        if (id) {
            res.status(200).json(id);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a entity
exports.createSummarizedItem = async (req, res) => {
    try {
        const newEntity = new ItemSummary(req.body);
        const savedEntity = await newEntity.save();
        res.status(201).json(savedEntity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update an entity by ID
exports.updateSummarizedItem = async (req, res) => {
    try {
        // Find the __badge first
        const entity = await ItemSummary.findByPk(req.params.id);
        if (entity) {
            // Update the __badge with new data from req.body
            const updatedEntity = await entity.update(req.body);
            res.status(200).json(updatedEntity);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to remove all entities
exports.deleteAllSummarizedItems = async (req, res) => {
    try {
        const deleted = await ItemSummary.destroy({ where: {} });
        res.status(200).json({ deleted });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//--------------------------------------------
//           OUTPOST CONTROLLER               OutpostModel
//--------------------------------------------

// Handle GET request for all entities
exports.getAllOutposts = async (req, res) => {
    try {
        const entity = await OutpostModel.findAll();
        res.status(200).json(entity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single entity by ID
exports.getOutpostById = async (req, res) => {
    try {
        const id = await OutpostModel.findByPk(req.params.id);
        if (id) {
            res.status(200).json(id);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a entity
exports.createOutpost = async (req, res) => {
    try {
        const newEntity = new OutpostModel(req.body);
        const savedEntity = await newEntity.save();
        res.status(201).json(savedEntity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update an entity by ID
exports.updateOutpost = async (req, res) => {
    try {
        // Find the __badge first
        const entity = await OutpostModel.findByPk(req.params.id);
        if (entity) {
            // Update the __badge with new data from req.body
            const updatedEntity = await entity.update(req.body);
            res.status(200).json(updatedEntity);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to remove all entities
exports.deleteAllOutposts = async (req, res) => {
    try {
        const deleted = await OutpostModel.destroy({ where: {} });
        res.status(200).json({ deleted });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//--------------------------------------------
//           PLANET CONTROLLER               PlanetModel
//--------------------------------------------

// Handle GET request for all entities
exports.getAllPlanets = async (req, res) => {
    try {
        const entity = await PlanetModel.findAll();
        res.status(200).json(entity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single entity by ID
exports.getPlanetById = async (req, res) => {
    try {
        const id = await PlanetModel.findByPk(req.params.id);
        if (id) {
            res.status(200).json(id);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a entity
exports.createPlanet = async (req, res) => {
    try {
        const newEntity = new PlanetModel(req.body);
        const savedEntity = await newEntity.save();
        res.status(201).json(savedEntity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update an entity by ID
exports.updatePlanet = async (req, res) => {
    try {
        // Find the __badge first
        const entity = await PlanetModel.findByPk(req.params.id);
        if (entity) {
            // Update the __badge with new data from req.body
            const updatedEntity = await entity.update(req.body);
            res.status(200).json(updatedEntity);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to remove all entities
exports.deleteAllPlanets = async (req, res) => {
    try {
        const deleted = await PlanetModel.destroy({ where: {} });
        res.status(200).json({ deleted });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//--------------------------------------------
//         SPACE STATION CONTROLLER           SpaceStationModel
//--------------------------------------------

// Handle GET request for all entities
exports.getAllSpaceStations = async (req, res) => {
    try {
        const entity = await SpaceStationModel.findAll();
        res.status(200).json(entity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single entity by ID
exports.getSpaceStationById = async (req, res) => {
    try {
        const id = await SpaceStationModel.findByPk(req.params.id);
        if (id) {
            res.status(200).json(id);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a entity
exports.createSpaceStation = async (req, res) => {
    try {
        const newEntity = new SpaceStationModel(req.body);
        const savedEntity = await newEntity.save();
        res.status(201).json(savedEntity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update an entity by ID
exports.updateSpaceStation = async (req, res) => {
    try {
        // Find the __badge first
        const entity = await SpaceStationModel.findByPk(req.params.id);
        if (entity) {
            // Update the __badge with new data from req.body
            const updatedEntity = await entity.update(req.body);
            res.status(200).json(updatedEntity);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to remove all entities
exports.deleteAllSpaceStations = async (req, res) => {
    try {
        const deleted = await SpaceStationModel.destroy({ where: {} });
        res.status(200).json({ deleted });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//--------------------------------------------
//           STAR SYSTEM CONTROLLER           StarSystemModel
//--------------------------------------------

// Handle GET request for all entities
exports.getAllStarSystems = async (req, res) => {
    try {
        const entity = await StarSystemModel.findAll();
        res.status(200).json(entity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single entity by ID
exports.getStarSystemById = async (req, res) => {
    try {
        const id = await StarSystemModel.findByPk(req.params.id);
        if (id) {
            res.status(200).json(id);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a entity
exports.createStarSystem = async (req, res) => {
    try {
        const newEntity = new StarSystemModel(req.body);
        const savedEntity = await newEntity.save();
        res.status(201).json(savedEntity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update an entity by ID
exports.updateStarSystem = async (req, res) => {
    try {
        // Find the __badge first
        const entity = await StarSystemModel.findByPk(req.params.id);
        if (entity) {
            // Update the __badge with new data from req.body
            const updatedEntity = await entity.update(req.body);
            res.status(200).json(updatedEntity);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to remove all entities
exports.deleteAllStarSystems = async (req, res) => {
    try {
        const deleted = await StarSystemModel.destroy({ where: {} });
        res.status(200).json({ deleted });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//--------------------------------------------
//               SHIP CONTROLLER              ShipModel
//--------------------------------------------

// Handle GET request for all entities
exports.getAllShips = async (req, res) => {
    try {
        const entity = await ShipModel.findAll();
        res.status(200).json(entity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single entity by ID
exports.getShipById = async (req, res) => {
    try {
        const id = await ShipModel.findByPk(req.params.id);
        if (id) {
            res.status(200).json(id);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a entity
exports.createShip = async (req, res) => {
    try {
        console.log(`\nTEST\n`)
        const newEntity = new ShipModel(req.body);
        const savedEntity = await newEntity.save();
        res.status(201).json(savedEntity);
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update an entity by ID
exports.updateShip = async (req, res) => {
    try {
        // Find the __badge first
        const entity = await ShipModel.findByPk(req.params.id);
        if (entity) {
            // Update the __badge with new data from req.body
            const updatedEntity = await entity.update(req.body);
            res.status(200).json(updatedEntity);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to remove all entities
exports.deleteAllShips = async (req, res) => {
    try {
        const deleted = await ShipModel.destroy({ where: {} });
        res.status(200).json({ deleted });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//--------------------------------------------
//           TERMINAL CONTROLLER              TerminalModel
//--------------------------------------------

// Handle GET request for all entities
exports.getAllTerminals = async (req, res) => {
    try {
        const entity = await TerminalModel.findAll();
        res.status(200).json(entity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single entity by ID
exports.getTerminalById = async (req, res) => {
    try {
        const id = await TerminalModel.findByPk(req.params.id);
        if (id) {
            res.status(200).json(id);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a entity
exports.createTerminal = async (req, res) => {
    try {
        const newEntity = new TerminalModel(req.body);
        const savedEntity = await newEntity.save();
        res.status(201).json(savedEntity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update an entity by ID
exports.updateTerminal = async (req, res) => {
    try {
        // Find the __badge first
        const entity = await TerminalModel.findByPk(req.params.id);
        if (entity) {
            // Update the __badge with new data from req.body
            const updatedEntity = await entity.update(req.body);
            res.status(200).json(updatedEntity);
        } else {
            res.status(404).send('Entity not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to remove all entities
exports.deleteAllTerminals = async (req, res) => {
    try {
        const deleted = await TerminalModel.destroy({ where: {} });
        res.status(200).json({ deleted });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//--------------------------------------------
//           TERMINAL PRICES CONTROLLER       TerminalPricesModel
//--------------------------------------------

// Handle GET request for all entities
exports.getAllTerminalPrices = async (req, res) => {
    try {
        const entity = await TerminalPricesModel.findAll();
        res.status(200).json(entity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single entity by ID
exports.getTerminalPricesById = async (req, res) => {
    try {
        const id = await TerminalPricesModel.findByPk(req.params.id);
        if (id) {
            res.status(200).json(id);
        } else {
            res.status(404).send('Terminal Price not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create a entity
exports.createTerminalPrices = async (req, res) => {
    try {
        const newEntity = new TerminalPricesModel(req.body);
        const savedEntity = await newEntity.save();
        res.status(201).json(savedEntity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update an entity by ID
exports.updateTerminalPrices = async (req, res) => {
    try {
        // Find the __badge first
        const entity = await TerminalPricesModel.findByPk(req.params.id);
        if (entity) {
            // Update the __badge with new data from req.body
            const updatedEntity = await entity.update(req.body);
            res.status(200).json(updatedEntity);
        } else {
            res.status(404).send('Terminal Price not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to remove all entities
exports.deleteAllTerminalPrices = async (req, res) => {
    try {
        const deleted = await TerminalPricesModel.destroy({ where: {} });
        res.status(200).json({ deleted });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//--------------------------------------------
//               MOON CONTROLLER               MoonModel
//--------------------------------------------

// Handle GET request for all entities
exports.getAllMoons = async (req, res) => {
    try {
        const entity = await MoonModel.findAll();
        res.status(200).json(entity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single entity by ID
exports.getMoonById = async (req, res) => {
    try {
        const id = await MoonModel.findByPk(req.params.id);
        if (id) {
            res.status(200).json(id);
        } else {
            res.status(404).send('Moon not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create an entity
exports.createMoon = async (req, res) => {
    try {
        const savedEntity = await MoonModel.create(req.body);
        res.status(201).json(savedEntity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update an entity by ID
exports.updateMoon = async (req, res) => {
    try {
        const entity = await MoonModel.findByPk(req.params.id);
        if (entity) {
            await entity.update(req.body);
            res.status(200).json(entity);
        } else {
            res.status(404).send('Moon not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to remove all entities
exports.deleteAllMoons = async (req, res) => {
    try {
        const deleted = await MoonModel.destroy({ where: {} });
        res.status(200).json({ deleted });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//--------------------------------------------
//         REFINERY YIELD CONTROLLER           RefineryYieldModel
//--------------------------------------------

// Handle GET request for all entities
exports.getAllRefineryYields = async (req, res) => {
    try {
        const entity = await RefineryYieldModel.findAll();
        res.status(200).json(entity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle GET request for a single entity by ID
exports.getRefineryYieldById = async (req, res) => {
    try {
        const id = await RefineryYieldModel.findByPk(req.params.id);
        if (id) {
            res.status(200).json(id);
        } else {
            res.status(404).send('Refinery yield not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle POST request to create an entity
exports.createRefineryYield = async (req, res) => {
    try {
        const savedEntity = await RefineryYieldModel.create(req.body);
        res.status(201).json(savedEntity);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle PUT request to update an entity by ID
exports.updateRefineryYield = async (req, res) => {
    try {
        const entity = await RefineryYieldModel.findByPk(req.params.id);
        if (entity) {
            await entity.update(req.body);
            res.status(200).json(entity);
        } else {
            res.status(404).send('Refinery yield not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handle DELETE request to remove all entities
exports.deleteAllRefineryYields = async (req, res) => {
    try {
        const deleted = await RefineryYieldModel.destroy({ where: {} });
        res.status(200).json({ deleted });
    } catch (error) {
        res.status(500).send(error.message);
    }
};