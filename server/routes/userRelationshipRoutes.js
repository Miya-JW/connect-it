const express = require('express');
const router = express.Router();
const userRelationshipController = require('../controllers/UserRelationshipController');

router.get('/user_relationships', userRelationshipController.findAllRelationships);

// router.delete('/user_relationships/:id', userRelationshipController.deleteRelationship);
// 基于用户 ID 查询其关注的所有用户
router.get('/user_relationships/following/:id',userRelationshipController.getFollowing);
// 查询互相关注的用户 ID 组
router.get('/user_relationships/mutual-follow/:id',userRelationshipController.getMutualFollows);
// 增加关注一个用户
router.post('/user_relationships/following',userRelationshipController.addFollowing);
//取消关注一个用户
router.delete('/user_relationships/unfollow',userRelationshipController.removeFollowing);






module.exports = router;