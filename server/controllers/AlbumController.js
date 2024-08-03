const Album = require('../models/Album');

// exports.findAllAlbums = async (req, res) => {
//     try {
//         const albums = await Album.findAll();
//         res.send(albums);
//     } catch (error) {
//         res.status(500).send({ message: "Error retrieving albums" });
//     }
// };
exports.findAllAlbums = async (req, res) => {
    try {
        console.log("Fetching all albums from the database...");
        const albums = await Album.findAll();
        console.log("Albums fetched successfully:", albums);
        res.send(albums);
    } catch (error) {
        console.error("Error retrieving albums:", error);
        res.status(500).send({ message: "Error retrieving albums", error: error.message });
    }
};
exports.createAlbum = async (req, res) => {
    try {
        const album = await Album.create(req.body);
        res.status(201).send(album);
    } catch (error) {
        res.status(500).send({ message: "Error creating album" });
    }
};

exports.findAlbumById = async (req, res) => {
    try {
        const album = await Album.findByPk(req.params.id);
        if (album) {
            res.send(album);
        } else {
            res.status(404).send({ message: "Album not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error retrieving album" });
    }
};

exports.updateAlbum = async (req, res) => {
    try {
        const updated = await Album.update(req.body, { where: { album_id: req.params.id } });
        if (updated) {
            res.send({ message: "Album updated successfully" });
        } else {
            res.status(404).send({ message: "Album not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating album" });
    }
};

exports.deleteAlbum = async (req, res) => {
    try {
        const deleted = await Album.destroy({ where: { album_id: req.params.id } });
        if (deleted) {
            res.send({ message: "Album deleted successfully" });
        } else {
            res.status(404).send({ message: "Album not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error deleting album" });
    }
};