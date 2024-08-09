const UserRelationship = require('../models/UserRelationship');

exports.findAllRelationships = async (req, res) => {
    try {
        const relationships = await UserRelationship.findAll();
        res.send(relationships);
    } catch (error) {
        console.error("Error retrieving relationships:", error);
        res.status(500).send({ message: "Error retrieving relationships", error: error.message });
    }
};

exports.createRelationship = async (req, res) => {
    try {
        const relationship = await UserRelationship.create(req.body);
        res.status(201).send(relationship);
    } catch (error) {
        console.error("Error creating relationship:", error);
        res.status(500).send({ message: "Error creating relationship", error: error.message });
    }
};

exports.findRelationshipById = async (req, res) => {
    try {
        const relationship = await UserRelationship.findByPk(req.params.id);
        if (relationship) {
            res.send(relationship);
        } else {
            res.status(404).send({ message: "Relationship not found" });
        }
    } catch (error) {
        console.error("Error retrieving relationship:", error);
        res.status(500).send({ message: "Error retrieving relationship", error: error.message });
    }
};

exports.updateRelationship = async (req, res) => {
    try {
        const updated = await UserRelationship.update(req.body, { where: { relationship_id: req.params.id } });
        if (updated[0]) {
            res.send({ message: "Relationship updated successfully" });
        } else {
            res.status(404).send({ message: "Relationship not found" });
        }
    } catch (error) {
        console.error("Error updating relationship:", error);
        res.status(500).send({ message: "Error updating relationship", error: error.message });
    }
};

exports.deleteRelationship = async (req, res) => {
    try {
        const deleted = await UserRelationship.destroy({ where: { relationship_id: req.params.id } });
        if (deleted) {
            res.send({ message: "Relationship deleted successfully" });
        } else {
            res.status(404).send({ message: "Relationship not found" });
        }
    } catch (error) {
        console.error("Error deleting relationship:", error);
        res.status(500).send({ message: "Error deleting relationship", error: error.message });
    }
};