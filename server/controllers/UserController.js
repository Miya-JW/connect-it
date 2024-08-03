const User = require('../models/User');

exports.findAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.send(users);
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving users"
        });
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.send(user);
    } catch (error) {
        res.status(500).send({
            message: "Error creating user"
        });
    }
};

exports.findUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({
                message: "User not found"
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving user"
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.update(req.body, {
            where: { user_id: req.params.id }
        });
        res.send({
            message: "User updated successfully"
        });
    } catch (error) {
        res.status(500).send({
            message: "Error updating user"
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: { user_id: req.params.id }
        });
        res.send({
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).send({
            message: "Error deleting user"
        });
    }
};