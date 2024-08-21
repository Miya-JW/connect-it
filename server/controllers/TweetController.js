const Tweet = require('../models/Tweet');

exports.findAllTweets = async (req, res) => {
    try {
        const tweets = await Tweet.findAll();
        res.send(tweets);
    } catch (error) {
        console.error("Error retrieving tweets:", error);
        res.status(500).send({ message: "Error retrieving tweets", error: error.message });
    }
};

exports.createTweet = async (req, res) => {
    try {
        const tweet = await Tweet.create(req.body);
        res.status(201).send(tweet);
    } catch (error) {
        console.error("Error creating tweet:", error);
        res.status(500).send({ message: "Error creating tweet", error: error.message });
    }
};

exports.findTweetById = async (req, res) => {
    try {
        const tweet = await Tweet.findByPk(req.params.id);
        if (tweet) {
            res.send(tweet);
        } else {
            res.status(404).send({ message: "Tweet not found" });
        }
    } catch (error) {
        console.error("Error retrieving tweet:", error);
        res.status(500).send({ message: "Error retrieving tweet", error: error.message });
    }
};

exports.updateTweet = async (req, res) => {
    try {
        const updated = await Tweet.update(req.body, { where: { tweet_id: req.params.id } });
        if (updated[0]) {
            res.send({ message: "Tweet updated successfully" });
        } else {
            res.status(404).send({ message: "Tweet not found" });
        }
    } catch (error) {
        console.error("Error updating tweet:", error);
        res.status(500).send({ message: "Error updating tweet", error: error.message });
    }
};

exports.deleteTweet = async (req, res) => {
    try {
        const deleted = await Tweet.destroy({ where: { tweet_id: req.params.id } });
        if (deleted) {
            res.send({ message: "Tweet deleted successfully" });
        } else {
            res.status(404).send({ message: "Tweet not found" });
        }
    } catch (error) {
        console.error("Error deleting tweet:", error);
        res.status(500).send({ message: "Error deleting tweet", error: error.message });
    }
};