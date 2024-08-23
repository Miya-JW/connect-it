const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

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

module.exports = router;