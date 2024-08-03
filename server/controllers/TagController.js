const Tag = require('../models/Tag');

exports.findAllTags = async (req, res) => {
    try {
        const tags = await Tag.findAll();
        res.send(tags);
    } catch (error) {
        console.error("Error retrieving tags:", error);
        res.status(500).send({ message: "Error retrieving tags", error: error.message });
    }
};

exports.createTag = async (req, res) => {
    try {
        const tag = await Tag.create(req.body);
        res.status(201).send(tag);
    } catch (error) {
        console.error("Error creating tag:", error);
        res.status(500).send({ message: "Error creating tag", error: error.message });
    }
};

exports.findTagById = async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id);
        if (tag) {
            res.send(tag);
        } else {
            res.status(404).send({ message: "Tag not found" });
        }
    } catch (error) {
        console.error("Error retrieving tag:", error);
        res.status(500).send({ message: "Error retrieving tag", error: error.message });
    }
};

exports.updateTag = async (req, res) => {
    try {
        const updated = await Tag.update(req.body, { where: { tag_id: req.params.id } });
        if (updated[0]) {
            res.send({ message: "Tag updated successfully" });
        } else {
            res.status(404).send({ message: "Tag not found" });
        }
    } catch (error) {
        console.error("Error updating tag:", error);
        res.status(500).send({ message: "Error updating tag", error: error.message });
    }
};

exports.deleteTag = async (req, res) => {
    try {
        const deleted = await Tag.destroy({ where: { tag_id: req.params.id } });
        if (deleted) {
            res.send({ message: "Tag deleted successfully" });
        } else {
            res.status(404).send({ message: "Tag not found" });
        }
    } catch (error) {
        console.error("Error deleting tag:", error);
        res.status(500).send({ message: "Error deleting tag", error: error.message });
    }
};