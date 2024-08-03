const PhotoAlbum = require('../models/PhotoAlbum');

exports.findAllPhotoAlbums = async (req, res) => {
    try {
        const photoAlbums = await PhotoAlbum.findAll();
        res.send(photoAlbums);
    } catch (error) {
        console.error("Error retrieving photo albums:", error);
        res.status(500).send({ message: "Error retrieving photo albums", error: error.message });
    }
};

exports.createPhotoAlbum = async (req, res) => {
    try {
        const photoAlbum = await PhotoAlbum.create(req.body);
        res.status(201).send(photoAlbum);
    } catch (error) {
        console.error("Error creating photo album:", error);
        res.status(500).send({ message: "Error creating photo album", error: error.message });
    }
};

exports.findPhotoAlbumById = async (req, res) => {
    try {
        const photoAlbum = await PhotoAlbum.findByPk(req.params.id);
        if (photoAlbum) {
            res.send(photoAlbum);
        } else {
            res.status(404).send({ message: "Photo album not found" });
        }
    } catch (error) {
        console.error("Error retrieving photo album:", error);
        res.status(500).send({ message: "Error retrieving photo album", error: error.message });
    }
};

exports.updatePhotoAlbum = async (req, res) => {
    try {
        const updated = await PhotoAlbum.update(req.body, { where: { photo_album_id: req.params.id } });
        if (updated[0]) {
            res.send({ message: "Photo album updated successfully" });
        } else {
            res.status(404).send({ message: "Photo album not found" });
        }
    } catch (error) {
        console.error("Error updating photo album:", error);
        res.status(500).send({ message: "Error updating photo album", error: error.message });
    }
};

exports.deletePhotoAlbum = async (req, res) => {
    try {
        const deleted = await PhotoAlbum.destroy({ where: { photo_album_id: req.params.id } });
        if (deleted) {
            res.send({ message: "Photo album deleted successfully" });
        } else {
            res.status(404).send({ message: "Photo album not found" });
        }
    } catch (error) {
        console.error("Error deleting photo album:", error);
        res.status(500).send({ message: "Error deleting photo album", error: error.message });
    }
};