const UserAlbumStatus = require('../models/UserAlbumStatus');
const Album = require('../models/Album');
const User = require('../models/User');

exports.updateUserAlbumStatus = async (req, res) => {
    try {
        const { user_id, album_id } = req.params;
        const updated = await UserAlbumStatus.update(req.body, {
            where: { user_id, album_id }
        });
        if (updated) {
            res.send('Update successful');
        } else {
            res.status(404).send('Resource not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// 添加更多方法以处理创建、删除和查询
// POST /api/album_status
exports.createOrUpdateAlbumStatus = async (req, res) => {
    const { user_id, album_id, album_status } = req.body;

    try {
        const existingStatus = await UserAlbumStatus.findOne({
            where: { user_id, album_id }
        });

        if (existingStatus) {
            // 更新现有状态
            await existingStatus.update({ album_status });
            res.send({ message: "Album status updated successfully", data: existingStatus });
        } else {
            // 创建新状态
             const newStatus = await UserAlbumStatus.create({
                user_id,
                album_id,
                album_status
            });
             newStatus;
            res.status(201).send({ message: "Album status created successfully", data: newStatus });
        }
    } catch (error) {
        console.error("Error managing album status:", error);
        res.status(500).send({ message: "Error managing album status", error: error.message });
    }
};

// GET /api/album_status/
//查询某个用户的所有专辑状态
exports.getUserAlbumStatuses = async (req, res) => {
    const { user_id} = req.params;
    console.log("------------------",user_id);

    try {
        const statuses = await UserAlbumStatus.findAll({
            where: { user_id: user_id },
            include: [{
                model: Album,
                as:'Album',
                attributes: ['album_id', 'album_title', 'album_image','album_artist_name','album_release_date','album_total_tracks','album_spotifyUrl']
            },
        {
            model: User,
            as: 'User' ,
            attributes:['user_id']
        }]
        });
        res.send({data:statuses});
    } catch (error) {
        console.error("Error retrieving album statuses:", error);
        res.status(500).send({ message: "Error retrieving album statuses", error: error.message,data:'' });
    }
};

//查询某张专辑的状态
exports.getAlbumStatusByUser = async (req, res) => {
    const { userId, albumId } = req.params; // 从请求参数中获取 userId 和 albumId
console.log("----------------",userId,albumId)
    try {
        // 使用 Sequelize 的 findOne 方法来查询单条记录
        const status = await UserAlbumStatus.findOne({
            where: {
                user_id: userId,
                album_id: albumId
            },
            include: [{
                model: Album, // 假设您已经在模型中设置好了关联
                as: 'Album', // 使用正确的别名
                attributes: ['album_title'] // 根据需要选择返回的字段
            }]
        });

        if (status) {
            res.send({data:status}); // 如果查询成功，返回状态数据
        } else {
            res.status(404).send({data:{"user_id":userId, "album_id":albumId,"album_status":'' }}); // 如果没有找到记录，返回 404 错误
        }
    } catch (error) {
        console.error("Error retrieving album status:", error);
        res.status(500).send({ message: "Error retrieving album status", error: error.message });
    }
};

// DELETE /api/album_status
exports.deleteAlbumStatus = async (req, res) => {
    
    const { user_id, album_id } = req.body;
    console.log("后端开始删除用户专辑状态",{ user_id, album_id })

    try {
        await UserAlbumStatus.destroy({
            where: { user_id, album_id }
        });
        res.send({ message: "Album status deleted successfully" });
    } catch (error) {
        console.error("Error deleting album status:", error);
        res.status(500).send({ message: "Error deleting album status", error: error.message });
    }
};