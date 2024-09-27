const UserMovieStatus = require('../models/UserMovieStatus');
const Movie = require('../models/Movie');
const User = require('../models/User');

exports.updateUserMovieStatus = async (req, res) => {
    try {
        const { user_id, Movie_id } = req.params;
        const updated = await UserMovieStatus.update(req.body, {
            where: { user_id, movie_id }
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
// POST /api/Movie_status
exports.createOrUpdateMovieStatus = async (req, res) => {
    const { user_id, movie_id, movie_status } = req.body;


    try {
        const existingStatus = await UserMovieStatus.findOne({
            where: { user_id, movie_id }
        });

        if (existingStatus) {
            // 更新现有状态
            await existingStatus.update({ movie_status });
            res.send({ message: "Movie status updated successfully", data: existingStatus });
        } else {
            // 创建新状态
            const newStatus = await UserMovieStatus.create({
                user_id,
                movie_id,
                movie_status
            });
            newStatus;
            res.status(201).send({ message: "Movie status created successfully", data: newStatus });
        }
    } catch (error) {
        console.error("Error managing Movie status:", error);
        res.status(500).send({ message: "Error managing Movie status", error: error.message });
    }
};

// GET /api/Movie_status/
//查询某个用户的所有书籍状态
exports.getUserMovieStatuses = async (req, res) => {
    const { user_id } = req.params;

    try {
        const statuses = await UserMovieStatus.findAll({
            where: { user_id: user_id },
            include: [{
                model: Movie,
                as: 'Movie',
                attributes: ['movie_id', 'movie_title', 'movie_date', 'movie_rating', 'movie_summary', 'movie_poster', 'movie_imdburl']
            },
            {
                model: User,
                as: 'User',
                attributes: ['user_id']
            }]
        });
        res.send({ data: statuses });
    } catch (error) {
        console.error("Error retrieving Movie statuses:", error);
        res.status(500).send({ message: "Error retrieving Movie statuses", error: error.message, data: '' });
    }
};

//查询某张专辑的状态
exports.getMovieStatusByUser = async (req, res) => {
    const { userId, movieId } = req.params; // 从请求参数中获取 userId 和 MovieId
    try {
        // 使用 Sequelize 的 findOne 方法来查询单条记录
        const status = await UserMovieStatus.findOne({
            where: {
                user_id: userId,
                movie_id: movieId
            },
            include: [{
                model: Movie, // 假设您已经在模型中设置好了关联
                as: 'Movie', // 使用正确的别名
                attributes: ['movie_title'] // 根据需要选择返回的字段
            }]
        });

        if (status) {
            res.send({ data: status }); // 如果查询成功，返回状态数据
        } else {
            res.status(404).send({ data: { "user_id": userId, "movie_id": movieId, "movie_status": '' } }); // 如果没有找到记录，返回 404 错误
        }
    } catch (error) {
        console.error("Error retrieving Movie status:", error);
        res.status(500).send({ message: "Error retrieving Movie status", error: error.message });
    }
};

// DELETE /api/Movie_status
exports.deleteMovieStatus = async (req, res) => {
    const { user_id, movie_id } = req.body;

    try {
        await UserMovieStatus.destroy({
            where: { user_id, movie_id }
        });
        res.send({ message: "Movie status deleted successfully" });
    } catch (error) {
        console.error("Error deleting Movie status:", error);
        res.status(500).send({ message: "Error deleting Movie status", error: error.message });
    }
};