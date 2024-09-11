const UserArtist = require('../models/UserArtist');
const Artist = require('../models/Artist');

exports.createUserArtist = async (req, res) => {
    const { user_id, artist_id } = req.body;  // 明确从 req.body 中解构出需要的数据
    // 验证 user_id 和 artist_id 是否存在
    if (!user_id || !artist_id) {
        return res.status(400).json({ message: "Both user_id and artist_id are required." });
    }

    try {
        // 使用解构的数据创建记录
        const userArtist = await UserArtist.create({ user_id, artist_id });
        res.json(userArtist);
    } catch (error) {
        // 更详细的错误处理
        console.error("Failed to create user artist:", error);
        res.status(400).json({
            message: "Error creating user artist relationship",
            error: error.message || error.toString()  // 提供错误消息或错误的字符串表示
        });
    }
};

exports.getUserArtists = async (req, res) => {
    const { user_id } = req.params;  // 从请求参数中获取 user_id

    if (!user_id) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const userArtists = await UserArtist.findAll({
            where: { user_id: user_id },
            include: [{ model: Artist, as: 'Artist' }]  // 假设您有一个关联到 Artist 模型的别名
        });
        res.json(userArtists);
    } catch (error) {
        console.error("Failed to retrieve user's artists:", error);
        res.status(500).json({
            message: "Error retrieving user's artists",
            error: error.message || error.toString()
        });
    }
};


exports.deleteUserArtist = async (req, res) => {
    const { user_id, artist_id } = req.body;  // 从请求体中获取 user_id 和 artist_id
console.log("server deleting------------------",{ user_id, artist_id });
    // 验证 user_id 和 artist_id 是否提供
    if (!user_id || !artist_id) {
        return res.status(400).json({ message: "Both user_id and artist_id are required." });
    }

    try {
        // 尝试删除指定的用户艺术家关系
        const result = await UserArtist.destroy({
            where: {
                user_id: user_id,
                artist_id: artist_id
            }
        });

        // 检查是否实际上删除了任何行
        if (result === 0) {
            return res.status(404).json({ message: "No relationship found with the provided user_id and artist_id." });
        }

        // 返回成功删除的消息
        res.json({ message: "User artist relationship deleted successfully." });
    } catch (error) {
        // 记录错误并返回错误消息
        console.error("Failed to delete user artist relationship:", error);
        res.status(500).json({
            message: "Error deleting user artist relationship",
            error: error.message || error.toString()
        });
    }
};
