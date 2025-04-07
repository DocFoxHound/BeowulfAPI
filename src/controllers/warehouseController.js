const pool = require('../config/database');
const Warehouse = require('../models/warehouseModel');


exports.getAll = async (req, res) => {
    try {
        const entries = await Warehouse.findAll();
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getByUserId = async (req, res) => {
    const { user_id } = req.query;
    try {
        const entries = await Warehouse.findAll({
            where: {
                user_id: user_id
            }
        });
        if (entries.length > 0) {
            res.status(200).json(entries);
        } else {
            res.status(404).send('No Warehouse item found for the given user ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getByEntryId = async (req, res) => {
    const { id } = req.query;
    try {
        const entries = await Warehouse.findOne({
            where: {
                id: id
            }
        });
        if (entries.length > 0) {
            res.status(200).json(entries);
        } else {
            res.status(404).send('No Warehouse item found for the given ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getByPatch = async (req, res) => {
    const { patch } = req.query;
    console.log('\npatch', patch);
    try {
        const entries = await Warehouse.findAll({
            where: {
                patch: patch
            }
        });
        if (entries.length > 0) {
            res.status(200).json(entries);
        } else {
            res.status(404).send('No Warehouse item found for the given user ID and patch');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getByCommodity = async (req, res) => {
    const { commodity_name } = req.query;
    console.log('\npatch', patch);
    try {
        const entries = await Warehouse.findAll({
            where: {
                commodity_name: commodity_name
            }
        });
        if (entries.length > 0) {
            res.status(200).json(entries);
        } else {
            res.status(404).send('No Warehouse item found for the given user ID and patch');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getByUserIdAndPatch = async (req, res) => {
    const { user_id, patch } = req.query;
    try {
      const entries = await Warehouse.findAll({
        where: {
            user_id,
            patch
        }
      });
  
      if (entries.length > 0) {
        res.status(200).json(entries);
      } else {
        res.status(404).send('No Warehouse item found for the given user ID and patch');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
};

exports.getByCommodityAndPatch = async (req, res) => {
    const { commodity_name, patch } = req.query;
    try {
      const entries = await Warehouse.findAll({
        where: {
            commodity_name,
            patch
        }
      });
  
      if (entries.length > 0) {
        res.status(200).json(entries);
      } else {
        res.status(404).send('No Warehouse item found for the given user ID and patch');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
};

exports.create = async (req, res) => {
    try {
        const new_entry = new Warehouse(req.body);
        const saved_entry = await new_entry.save();
        res.status(201).json(saved_entry);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.update = async (req, res) => {
    try {
        // Find the __badge first
        const entry = await Warehouse.findByPk(req.params.id);
        if (entry) {
            // Update the __badge with new data from req.body
            const updated_entry = await entry.update(req.body);
            res.status(200).json(updated_entry);
        } else {
            res.status(404).send('Warehouse not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.delete = async (req, res) => {
    const entryId = req.params.id;
    if (!entryId) {
        return res.status(400).send('Warehouse ID is required');
    }
    try {
        const entry = await Warehouse.findByPk(entryId);
        if (entry) {
            await entry.destroy();
            res.status(200).send('Warehouse deleted');
        } else {
            res.status(404).send('Warehouse not found');
        }
    } catch (error) {
        console.error(`Error deleting Warehouse: ${error.message}`);
        res.status(500).send(error.message);
    }
};

