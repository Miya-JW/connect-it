const Artist = require('../models/Artist');

exports.findAllArtists = async (req, res) => {
    try {
        const artists = await Artist.findAll();
        res.send(artists);
    } catch (error) {
        console.error("Error retrieving artists:", error);
        res.status(500).send({ message: "Error retrieving artists", error: error.message });
    }
};

exports.createArtist = async (req, res) => {
    try {
        const artist = await Artist.create(req.body);
        res.status(201).send(artist);
    } catch (error) {
        console.error("Error creating artist:", error);
        res.status(500).send({ message: "Error creating artist", error: error.message });
    }
};

exports.findArtistById = async (req, res) => {
    try {
        const artist = await Artist.findByPk(req.params.id);
        if (artist) {
            res.send(artist);
        } else {
            res.status(404).send({ message: "Artist not found" });
        }
    } catch (error) {
        console.error("Error retrieving artist:", error);
        res.status(500).send({ message: "Error retrieving artist", error: error.message });
    }
};

exports.updateArtist = async (req, res) => {
    try {
        const updated = await Artist.update(req.body, { where: { artist_id: req.params.id } });
        if (updated[0]) {
            res.send({ message: "Artist updated successfully" });
        } else {
            res.status(404).send({ message: "Artist not found" });
        }
    } catch (error) {
        console.error("Error updating artist:", error);
        res.status(500).send({ message: "Error updating artist", error: error.message });
    }
};

exports.deleteArtist = async (req, res) => {
    try {
        const deleted = await Artist.destroy({ where: { artist_id: req.params.id } });
        if (deleted) {
            res.send({ message: "Artist deleted successfully" });
        } else {
            res.status(404).send({ message: "Artist not found" });
        }
    } catch (error) {
        console.error("Error deleting artist:", error);
        res.status(500).send({ message: "Error deleting artist", error: error.message });
    }
};