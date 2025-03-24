const pool = require('../config/database');
const CityModel = require('../models/uexCityModel');
const CommodityModel = require('../models/uexCommodityModel');
const OutpostModel = require('../models/uexOutpostModel');
const PlanetModel = require('../models/uexPlanetModel');
const SpaceStationModel = require('../models/uexSpaceStationModel');
const StarSystemModel = require('../models/uexStarSystemModel');
const TerminalModel = require('../models/uexTerminalModel');
const TerminalPricesModel = require('../models/uexTerminalPricesModel');


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