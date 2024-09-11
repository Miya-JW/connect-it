const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userArtistController = require('../controllers/UserArtistController');
const userAlbumStatusController = require('../controllers/UserAblumStatusController');

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

// 用户--喜欢的艺术家
router.post('/user_artists', userArtistController.createUserArtist);
router.get('/user_artists/:user_id', userArtistController.getUserArtists);
router.delete('/user_artists', userArtistController.deleteUserArtist);

// 用户-- 音乐（想听，在听，听过）
router.put('/user_album_status/:user_id/:album_id', userAlbumStatusController.updateUserAlbumStatus);

module.exports = router;