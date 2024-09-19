// const UserRelationship = require('../models/UserRelationship');
// const User = require('../models/User');
const { User, UserRelationship } = require('../models/index');
// 基于用户 ID 查询其关注的所有用户
exports.getFollowing = async (req, res) => {
    try {
        const userId = req.params.id;
        const followingUsers = await UserRelationship.findAll({
            where: { follower_id: userId },
            include: [{
                model: User,
                as: 'Following',
                attributes: ['user_id', 'user_name'] // 选择返回的用户属性
            }]
        });
        res.json(followingUsers);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving following users", error: error.message });
    }
};

// 增加关注一个用户
exports.addFollowing = async (req, res) => {
    try {
        const { follower_id, following_id } = req.body;
        const newFollow = await UserRelationship.create({
            follower_id,
            following_id
        });
        res.status(201).json(newFollow);
    } catch (error) {
        res.status(500).send({ message: "Error adding following", error: error.message });
    }
};

//取消关注一个用户
exports.removeFollowing = async (req, res) => {
    try {
        const { follower_id, following_id } = req.body;
        const result = await UserRelationship.destroy({
            where: {
                follower_id,
                following_id
            }
        });
        res.json({ message: 'Following removed', result });
    } catch (error) {
        res.status(500).send({ message: "Error removing following", error: error.message });
    }
};

// 查询互相关注的用户 ID 组
exports.getMutualFollows = async (req, res) => {
    try {
        const userId = req.params.id;

        // 查询当前用户关注的人
        const follows = await UserRelationship.findAll({
            where: { follower_id: userId },
            attributes: ['following_id']
        });

        // 获取所有用户关注当前用户的记录
        const followers = await UserRelationship.findAll({
            where: { following_id: userId },
            attributes: ['follower_id']
        });

        // 提取出关注列表和被关注列表的用户 ID
        const followingIds = follows.map(follow => follow.following_id);
        const followerIds = followers.map(follow => follow.follower_id);

        // 筛选出互相关注的用户 ID
        const mutualFollowsIds = followingIds.filter(id => followerIds.includes(id));

        // 根据互相关注的用户 ID 获取用户信息
        const mutualFollows = await User.findAll({
            where: {
                user_id: mutualFollowsIds
            },
            attributes: ['user_id', 'user_name'] // 根据需要调整返回的属性
        });

        res.json(mutualFollows);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving mutual follows", error: error.message });
    }
};


















exports.findAllRelationships = async (req, res) => {
    try {
        const relationships = await UserRelationship.findAll();
        res.send(relationships);
    } catch (error) {
        console.error("Error retrieving relationships:", error);
        res.status(500).send({ message: "Error retrieving relationships", error: error.message });
    }
};


exports.createRelationship = async (req, res) => {
    try {
        const relationship = await UserRelationship.create(req.body);
        res.status(201).send(relationship);
    } catch (error) {
        console.error("Error creating relationship:", error);
        res.status(500).send({ message: "Error creating relationship", error: error.message });
    }
};

exports.findRelationshipById = async (req, res) => {
    try {
        const relationship = await UserRelationship.findByPk(req.params.id);
        if (relationship) {
            res.send(relationship);
        } else {
            res.status(404).send({ message: "Relationship not found" });
        }
    } catch (error) {
        console.error("Error retrieving relationship:", error);
        res.status(500).send({ message: "Error retrieving relationship", error: error.message });
    }
};

exports.updateRelationship = async (req, res) => {
    try {
        const updated = await UserRelationship.update(req.body, { where: { relationship_id: req.params.id } });
        if (updated[0]) {
            res.send({ message: "Relationship updated successfully" });
        } else {
            res.status(404).send({ message: "Relationship not found" });
        }
    } catch (error) {
        console.error("Error updating relationship:", error);
        res.status(500).send({ message: "Error updating relationship", error: error.message });
    }
};

// exports.deleteRelationship = async (req, res) => {
//     try {
//         const deleted = await UserRelationship.destroy({ where: { relationship_id: req.params.id } });
//         if (deleted) {
//             res.send({ message: "Relationship deleted successfully" });
//         } else {
//             res.status(404).send({ message: "Relationship not found" });
//         }
//     } catch (error) {
//         console.error("Error deleting relationship:", error);
//         res.status(500).send({ message: "Error deleting relationship", error: error.message });
//     }
// };