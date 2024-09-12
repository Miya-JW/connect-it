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
    console.log("后端接受到请求",req.body.artist_id)
    try {
        const artist = await Artist.create(req.body);
        console.log("后端开始写入",artist.artist_id);
        res.status(201).send(artist);
    } catch (error) {
        //console.error("Error creating artist:", error);
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


exports.checkAndCreateArtists = async (req, res) => {
    const artists = req.body.artists;
    try {
        const results = await Promise.all(artists.map(async (artist) => {
            const found = await Artist.findOne({ where: { artist_id: artist.artist_id } });
            if (!found) {
                return Artist.create(artist);
            }
            return null;
        }));

        // 过滤掉 null 值，仅返回新创建的艺术家数据
        const createdArtists = results.filter(a => a);
        res.status(201).json(createdArtists);
    } catch (error) {
        console.error("Error processing artists:", error);
        res.status(500).json({ message: "Error processing artists", error: error.message });
    }
};