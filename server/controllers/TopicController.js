const Topic = require('../models/Topic');

exports.findAllTopics = async (req, res) => {
    try {
        const topics = await Topic.findAll();
        res.send(topics);
    } catch (error) {
        console.error("Error retrieving topics:", error);
        res.status(500).send({ message: "Error retrieving topics", error: error.message });
    }
};

exports.createTopic = async (req, res) => {
    try {
        const topic = await Topic.create(req.body);
        res.status(201).send(topic);
    } catch (error) {
        console.error("Error creating topic:", error);
        res.status(500).send({ message: "Error creating topic", error: error.message });
    }
};

exports.findTopicById = async (req, res) => {
    try {
        const topic = await Topic.findByPk(req.params.id);
        if (topic) {
            res.send(topic);
        } else {
            res.status(404).send({ message: "Topic not found" });
        }
    } catch (error) {
        console.error("Error retrieving topic:", error);
        res.status(500).send({ message: "Error retrieving topic", error: error.message });
    }
};

exports.updateTopic = async (req, res) => {
    try {
        const updated = await Topic.update(req.body, { where: { topic_id: req.params.id } });
        if (updated[0]) {
            res.send({ message: "Topic updated successfully" });
        } else {
            res.status(404).send({ message: "Topic not found" });
        }
    } catch (error) {
        console.error("Error updating topic:", error);
        res.status(500).send({ message: "Error updating topic", error: error.message });
    }
};

exports.deleteTopic = async (req, res) => {
    try {
        const deleted = await Topic.destroy({ where: { topic_id: req.params.id } });
        if (deleted) {
            res.send({ message: "Topic deleted successfully" });
        } else {
            res.status(404).send({ message: "Topic not found" });
        }
    } catch (error) {
        console.error("Error deleting topic:", error);
        res.status(500).send({ message: "Error deleting topic", error: error.message });
    }
};