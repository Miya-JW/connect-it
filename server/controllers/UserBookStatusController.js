const UserBookStatus = require('../models/UserBookStatus');
const Book = require('../models/Book');
const User = require('../models/User');

exports.updateUserBookStatus = async (req, res) => {
    try {
        const { user_id, book_id } = req.params;
        const updated = await UserBookStatus.update(req.body, {
            where: { user_id, book_id }
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
// POST /api/book_status
exports.createOrUpdateBookStatus = async (req, res) => {
    const { user_id, book_id, book_status } = req.body;


    try {
        const existingStatus = await UserBookStatus.findOne({
            where: { user_id, book_id }
        });

        if (existingStatus) {
            // 更新现有状态
            await existingStatus.update({ book_status });
            res.send({ message: "book status updated successfully", data: existingStatus });
        } else {
            // 创建新状态
             const newStatus = await UserBookStatus.create({
                user_id,
                book_id,
                book_status
            });
             newStatus;
            res.status(201).send({ message: "book status created successfully", data: newStatus });
        }
    } catch (error) {
        console.error("Error managing book status:", error);
        res.status(500).send({ message: "Error managing book status", error: error.message });
    }
};

// GET /api/book_status/
//查询某个用户的所有书籍状态
exports.getUserBookStatuses = async (req, res) => {
    const { user_id} = req.params;

    try {
        const statuses = await UserBookStatus.findAll({
            where: { user_id: user_id },
            include: [{
                model: Book,
                as:'Book',
                attributes: ['book_id', 'book_title','book_author', 'book_image','book_ISBN','book_publisher','book_publish_date','book_genre','book_summary','book_language','book_number_of_page']
            },
        {
            model: User,
            as: 'User' ,
            attributes:['user_id']
        }]
        });
        res.send({data:statuses});
    } catch (error) {
        console.error("Error retrieving book statuses:", error);
        res.status(500).send({ message: "Error retrieving book statuses", error: error.message,data:'' });
    }
};

//查询某张专辑的状态
exports.getBookStatusByUser = async (req, res) => {
    const { userId, bookId } = req.params; // 从请求参数中获取 userId 和 bookId
    try {
        // 使用 Sequelize 的 findOne 方法来查询单条记录
        const status = await UserBookStatus.findOne({
            where: {
                user_id: userId,
                book_id: bookId
            },
            include: [{
                model: Book, // 假设您已经在模型中设置好了关联
                as: 'book', // 使用正确的别名
                attributes: ['book_title'] // 根据需要选择返回的字段
            }]
        });

        if (status) {
            res.send({data:status}); // 如果查询成功，返回状态数据
        } else {
            res.status(404).send({data:{"user_id":userId, "book_id":bookId,"book_status":'' }}); // 如果没有找到记录，返回 404 错误
        }
    } catch (error) {
        console.error("Error retrieving book status:", error);
        res.status(500).send({ message: "Error retrieving book status", error: error.message });
    }
};

// DELETE /api/book_status
exports.deleteBookStatus = async (req, res) => {
    
    const { user_id, book_id } = req.body;


    try {
        await UserBookStatus.destroy({
            where: { user_id, book_id }
        });
        res.send({ message: "book status deleted successfully" });
    } catch (error) {
        console.error("Error deleting book status:", error);
        res.status(500).send({ message: "Error deleting book status", error: error.message });
    }
};