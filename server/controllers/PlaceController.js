const Place = require('../models/Place');

exports.findAllPlaces = async (req, res) => {
    try {
        const places = await Place.findAll();
        res.send(places);
    } catch (error) {
        console.error("Error retrieving places:", error);
        res.status(500).send({ message: "Error retrieving places", error: error.message });
    }
};

exports.createPlace = async (req, res) => {
    try {
        const place = await Place.create(req.body);
        res.status(201).send(place);
    } catch (error) {
        console.error("Error creating place:", error);
        res.status(500).send({ message: "Error creating place", error: error.message });
    }
};

exports.findPlaceById = async (req, res) => {
    try {
        const place = await Place.findByPk(req.params.id);
        if (place) {
            res.send(place);
        } else {
            res.status(404).send({ message: "Place not found" });
        }
    } catch (error) {
        console.error("Error retrieving place:", error);
        res.status(500).send({ message: "Error retrieving place", error: error.message });
    }
};

exports.updatePlace = async (req, res) => {
    try {
        const updated = await Place.update(req.body, { where: { place_id: req.params.id } });
        if (updated[0]) {
            res.send({ message: "Place updated successfully" });
        } else {
            res.status(404).send({ message: "Place not found" });
        }
    } catch (error) {
        console.error("Error updating place:", error);
        res.status(500).send({ message: "Error updating place", error: error.message });
    }
};

exports.deletePlace = async (req, res) => {
    try {
        const deleted = await Place.destroy({ where: { place_id: req.params.id } });
        if (deleted) {
            res.send({ message: "Place deleted successfully" });
        } else {
            res.status(404).send({ message: "Place not found" });
        }
    } catch (error) {
        console.error("Error deleting place:", error);
        res.status(500).send({ message: "Error deleting place", error: error.message });
    }
};