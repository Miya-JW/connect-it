const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userArtistController = require('../controllers/UserArtistController');
const userAlbumStatusController = require('../controllers/UserAblumStatusController');
const fileController = require('../controllers/FileController');
const userBookStatusController = require('../controllers/UserBookStatusController');

router.get('/users', userController.findAllUsers);
router.post('/users', userController.createUser);
router.get('/users/:id', userController.findUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/check-username', userController.checkUsername);

// 用户注册
router.post('/register', userController.registerUser);

// 用户登录
router.post('/login', userController.loginUser);

// 头像文件上传路由
router.put('/users/avatar/:id',fileController.uploadFile,fileController.handleFileUpload);

// 搜索栏查找用户
router.get('/user-search',userController.searchUsers);

// 用户--喜欢的艺术家
router.post('/user_artists', userArtistController.createUserArtist);
router.get('/user_artists/:user_id', userArtistController.getUserArtists);
router.delete('/user_artists', userArtistController.deleteUserArtist);

// 用户-- 音乐（想听，在听，听过）
router.post('/user_album_status', userAlbumStatusController.createOrUpdateAlbumStatus);
router.get('/user_album_status/:user_id', userAlbumStatusController.getUserAlbumStatuses);
router.get('/user_album_status/:userId/:albumId', userAlbumStatusController.getAlbumStatusByUser);
router.delete('/user_album_status',userAlbumStatusController.deleteAlbumStatus);

// 用户-- 书籍（想读，在读，读过）
router.post('/user_book_status', userBookStatusController.createOrUpdateBookStatus);
router.get('/user_book_status/:user_id', userBookStatusController.getUserBookStatuses);
router.get('/user_book_status/:userId/:albumId', userBookStatusController.getBookStatusByUser);
router.delete('/user_book_status',userBookStatusController.deleteBookStatus);


module.exports = router;