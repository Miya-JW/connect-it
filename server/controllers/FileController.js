const multer = require('multer');
const path = require('path');
const userController = require('../controllers/userController');

// 配置存储选项
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/userAvatars');  // 确保这个目录已经存在或在应用启动时创建
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// 文件上传逻辑
exports.uploadFile = upload.single('user_avatar');

// 文件保存后的处理逻辑
exports.handleFileUpload = (req, res) => {

    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
    }
    const filePath = `/userAvatars/${req.file.filename}`;  // 文件存储的相对路径
    // 实际应用中，这里可以更新数据库记录
    const userId = req.params.id;
    console.log("用户id----------------", userId);

    userController.updateUserAvatar(req, res, { user_id: userId, "user_avatar": filePath });
}


