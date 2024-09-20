const User = require('./User');
const UserRelationship = require('./UserRelationship');
const Album = require('./Album');
const UserAlbumStatus = require('./UserAlbumStatus');

// 定义关联User-UserRelationship
User.hasMany(UserRelationship, { as: 'Followers', foreignKey: 'follower_id' });
User.hasMany(UserRelationship, { as: 'Following', foreignKey: 'following_id' });
UserRelationship.belongsTo(User, { as: 'Follower', foreignKey: 'follower_id' });
UserRelationship.belongsTo(User, { as: 'Following', foreignKey: 'following_id' });



// User 与 UserAlbumStatus 的关系
User.hasMany(UserAlbumStatus, { as: 'AlbumStatuses', foreignKey: 'album_id' });
UserAlbumStatus.belongsTo(User, { as: 'User', foreignKey: 'user_id' });

// Album 与 UserAlbumStatus 的关系
Album.hasMany(UserAlbumStatus, { as: 'UserStatuses', foreignKey: 'album_id' });
UserAlbumStatus.belongsTo(Album, { as: 'Album', foreignKey: 'album_id' });

// User.hasMany(UserAlbumStatus, {as: 'AlbumStatuses',foreignKey: 'user_id' });
// // 专辑可以有多个用户状态
// Album.hasMany(UserAlbumStatus, {as: 'UserStatuses',foreignKey: 'album_id'});

// UserAlbumStatus.belongsTo(Album,{as: 'AlbumStatuses',foreignKey: 'user_id' });
// UserAlbumStatus.belongsTo(User,{as: 'UserStatuses',foreignKey: 'album_id'});




module.exports = {
    User,
    UserRelationship,
    Album,
    UserAlbumStatus

};