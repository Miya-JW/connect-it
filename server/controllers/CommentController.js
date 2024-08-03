const Comment = require('../models/Comment');

exports.findAllComments = async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.send(comments);
    } catch (error) {
        console.error("Error retrieving comments:", error);
        res.status(500).send({ message: "Error retrieving comments", error: error.message });
    }
};

exports.createComment = async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        res.status(201).send(comment);
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).send({ message: "Error creating comment", error: error.message });
    }
};

exports.findCommentById = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (comment) {
            res.send(comment);
        } else {
            res.status(404).send({ message: "Comment not found" });
        }
    } catch (error) {
        console.error("Error retrieving comment:", error);
        res.status(500).send({ message: "Error retrieving comment", error: error.message });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const updated = await Comment.update(req.body, { where: { comment_id: req.params.id } });
        if (updated[0]) {
            res.send({ message: "Comment updated successfully" });
        } else {
            res.status(404).send({ message: "Comment not found" });
        }
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).send({ message: "Error updating comment", error: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const deleted = await Comment.destroy({ where: { comment_id: req.params.id } });
        if (deleted) {
            res.send({ message: "Comment deleted successfully" });
        } else {
            res.status(404).send({ message: "Comment not found" });
        }
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).send({ message: "Error deleting comment", error: error.message });
    }
};