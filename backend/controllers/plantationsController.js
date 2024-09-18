const Plantation = require('../models/Plantation');

exports.getAllPlantations = async (req, res) => {
    try {
        const plantations = await Plantation.find();
        res.json(plantations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPlantation = async (req, res) => {
    const { name, description, location, photo } = req.body;
    const newPlantation = new Plantation({ name, description, location, photo });

    try {
        const savedPlantation = await newPlantation.save();
        res.status(201).json(savedPlantation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updatePlantation = async (req, res) => {
    try {
        const updatedPlantation = await Plantation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPlantation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deletePlantation = async (req, res) => {
    try {
        await Plantation.findByIdAndDelete(req.params.id);
        res.json({ message: 'Plantation deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
