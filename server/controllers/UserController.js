const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// 验证用户名是否存在

exports.checkUsername = async (req, res) => {
    try {
        const username = req.body.user_name; // 获取用户名

        if (!username) {
            return res.status(400).json({ message: 'No username provided' });
        }

        // 使用 Sequelize 的 findOne 方法查找用户名
        const userExists = await User.findOne({
            where: { user_name: username }
        });


        if (userExists) {
            // 如果用户名已存在
            return res.json({ exists: true, message: 'Username already taken.' });
        } else {
            // 如果用户名不存在
            return res.json({ exists: false, message: 'Username is available.' });
        }
    } catch (error) {
        console.error('Error checking username:', error);
        res.status(500).json({ message: 'Error checking username' });
    }
};

// 注册用户
exports.registerUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.user_password, 10);
        const newUser = {
            ...req.body,
            user_password: hashedPassword
        };
        console.log(newUser);
        const user = await User.create(newUser);
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send({ message: "Error creating user" });
    }
};

// 用户登录
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { user_name: req.body.user_name } });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const validPassword = await bcrypt.compare(req.body.user_password, user.user_password);
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid password" });
        }
        const token = jwt.sign({ user_id: user.user_id }, 'your_jwt_secret', { expiresIn: '24h' });
        res.send({ token: token });
    } catch (error) {
        res.status(500).send({ message: "Error logging in user" });
    }
};

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
            message: "Error creating user",
            error: error.message
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