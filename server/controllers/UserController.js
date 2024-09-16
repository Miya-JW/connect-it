const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');  // 确保导入了 Sequelize 的 Op


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
        res.send({ token: token, user_id: user.user_id });
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


exports.searchUsers = async (req, res) => {
    const searchTerm = req.query.search;  // 假设搜索词是通过查询参数传递的

    try {
        const users = await User.findAll({
            where: {
                [Op.or]: [
                    { user_name: { [Op.like]: `%${searchTerm}%` } },
                    { user_first_name: { [Op.like]: `%${searchTerm}%` } },
                    { user_last_name: { [Op.like]: `%${searchTerm}%` } },
                    { user_about_me: { [Op.like]: `%${searchTerm}%` } }
                ]
            }
        });
        res.send(users);

    } catch (error) {
        console.error("Error retrieving users: ", error);
        res.status(500).send({
            message: "Error retrieving users"
        });
    }
};

//创建用户
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

//修改用户profile信息
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { user_id: req.params.id }
        });

        if (!user) {
            return res.status(404).send({ message: "用户不存在" });
        }


        //修改密码
        // 如果请求中提供了当前密码，则验证密码
        if (req.body.currentPassword && req.body.newPassword) {
            // 确保从数据库获取了密码
            if (!user.user_password) {
                return res.status(500).send({ message: "未找到用户密码" });
            }

            // 验证当前密码是否正确
            const isMatch = await bcrypt.compare(req.body.currentPassword, user.user_password);
            if (!isMatch) {
                return res.status(401).send({ message: "密码不正确" });
            }

            // 更新密码
            const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
            user.user_password = hashedPassword; // 设置新密码
            await User.update({ user_password: hashedPassword }, {
                where: { user_id: req.params.id }
            });
        }
        //修改用户名
        else if (req.body.newUsername) {
            //确保从数据库获得了用户名
            const user_name = req.body.newUsername;
            //验证用户名是否存在
            const userExists = await User.findOne({
                where: { user_name: user_name }
            });
            if (userExists) {
                return res.json({ exists: true, message: 'Username already taken.' });
            } else {
                await User.update({ user_name: user_name }, {
                    where: { user_id: req.params.id }
                });
            }

        } else {
            // 更新其他信息
            // 剔除密码字段，用户名字段，仅更新其他信息
            const updateData = { ...req.body.newUserInfo };
            console.log("后端开始更改用户信息： ", updateData);
            delete updateData.currentPassword;
            delete updateData.newPassword;
            delete updateData.user_name;
            await User.update(updateData, { where: { user_id: req.params.id } });
        }


        res.send({ message: "用户信息更新成功" });
    } catch (error) {
        console.error("更新用户信息时出错：", error);
        res.status(500).send({
            message: "更新用户信息时出现错误",
            error: error.message
        });
    }
};

//修改用户头像
exports.updateUserAvatar = async (req, res, data) => {
    try {

        const { user_id, user_avatar } = data;  // 接收ID和头像路径

        const user = await User.findOne({
            where: { user_id: user_id }
        });

        if (!user) {
            return res.status(404).send({ message: "用户不存在" });
        }

        // 更新头像路径
        user.user_avatar = user_avatar;
        await user.save();

        return res.send({ message: "用户信息更新成功", user_avatar });


    } catch (error) {
        console.error("更新用户头像时出错：", error);
        return res.status(500).send({
            message: "更新用户头像时出现错误",
            error: error.message
        });
    }

}



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