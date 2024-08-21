const Like = require('../models/Like');

exports.updateOrCreateLike = async (req, res) => {
    const { user_id } = req.params;
    try {
        const existingLike = await Like.findByPk(user_id);
        if (existingLike) {
            await Like.update(req.body, { where: { user_id: user_id } });
            return res.send({ message: 'Like updated successfully.' });
        } else {
            const newLike = await Like.create({ user_id, ...req.body });
            return res.status(201).send(newLike);
        }
    } catch (error) {
        console.error("Error updating or creating like:", error);
        return res.status(500).send({ message: "Error updating or creating like", error: error.message });
    }
};

exports.getLikesByUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        const likes = await Like.findOne({ where: { user_id } });
        if (likes) {
            res.send(likes);
        } else {
            res.status(404).send({ message: "No likes found for this user." });
        }
    } catch (error) {
        console.error("Error retrieving likes:", error);
        res.status(500).send({ message: "Error retrieving likes", error: error.message });
    }
};