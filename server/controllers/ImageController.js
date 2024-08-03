const Image = require('../models/Image');

exports.findAllImages = async (req, res) => {
    try {
        const images = await Image.findAll();
        res.send(images);
    } catch (error) {
        console.error("Error retrieving images:", error);
        res.status(500).send({ message: "Error retrieving images", error: error.message });
    }
};

exports.createImage = async (req, res) => {
    try {
        const image = await Image.create(req.body);
        res.status(201).send(image);
    } catch (error) {
        console.error("Error creating image:", error);
        res.status(500).send({ message: "Error creating image", error: error.message });
    }
};

exports.findImageById = async (req, res) => {
    try {
        const image = await Image.findByPk(req.params.id);
        if (image) {
            res.send(image);
        } else {
            res.status(404).send({ message: "Image not found" });
        }
    } catch (error) {
        console.error("Error retrieving image:", error);
        res.status(500).send({ message: "Error retrieving image", error: error.message });
    }
};

exports.updateImage = async (req, res) => {
    try {
        const updated = await Image.update(req.body, { where: { image_id: req.params.id } });
        if (updated[0]) {
            res.send({ message: "Image updated successfully" });
        } else {
            res.status(404).send({ message: "Image not found" });
        }
    } catch (error) {
        console.error("Error updating image:", error);
        res.status(500).send({ message: "Error updating image", error: error.message });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const deleted = await Image.destroy({ where: { image_id: req.params.id } });
        if (deleted) {
            res.send({ message: "Image deleted successfully" });
        } else {
            res.status(404).send({ message: "Image not found" });
        }
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).send({ message: "Error deleting image", error: error.message });
    }
};