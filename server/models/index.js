const User = require('./User');
const UserRelationship = require('./UserRelationship');

// 定义关联
User.hasMany(UserRelationship, { as: 'Followers', foreignKey: 'follower_id' });
User.hasMany(UserRelationship, { as: 'Following', foreignKey: 'following_id' });

UserRelationship.belongsTo(User, { as: 'Follower', foreignKey: 'follower_id' });
UserRelationship.belongsTo(User, { as: 'Following', foreignKey: 'following_id' });

module.exports = {
    User,
    UserRelationship
};