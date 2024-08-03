const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.findAllUsers);
router.post('/users', userController.createUser);
router.get('/users/:id', userController.findUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;