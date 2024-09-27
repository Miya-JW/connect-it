const User = require('./User');
const UserRelationship = require('./UserRelationship');
const Album = require('./Album');
const UserAlbumStatus = require('./UserAlbumStatus');
const Blog = require('./Blog');
const UserBookStatus = require('./UserBookStatus');
const Book = require('./Book');
const UserMovieStatus = require('./UserMovieStatus');
const Movie = require('./Movie');

// 定义关联 User-UserRelationship
User.hasMany(UserRelationship, { as: 'Followers', foreignKey: 'follower_id' });
User.hasMany(UserRelationship, { as: 'Following', foreignKey: 'following_id' });
UserRelationship.belongsTo(User, { as: 'Follower', foreignKey: 'follower_id' });
UserRelationship.belongsTo(User, { as: 'Following', foreignKey: 'following_id' });

// User 与 UserAlbumStatus 的关系
User.hasMany(UserAlbumStatus, { as: 'AlbumStatuses', foreignKey: 'user_id' });
UserAlbumStatus.belongsTo(User, { as: 'User', foreignKey: 'user_id' });

// Album 与 UserAlbumStatus 的关系
Album.hasMany(UserAlbumStatus, { as: 'UserStatuses', foreignKey: 'album_id' });
UserAlbumStatus.belongsTo(Album, { as: 'Album', foreignKey: 'album_id' });

// User 与 UserBookStatus 的关系
User.hasMany(UserBookStatus, { as: 'BookStatuses', foreignKey: 'user_id' });
UserBookStatus.belongsTo(User, { as: 'User', foreignKey: 'user_id' });

// Book 与 UserBookStatus 的关系
Book.hasMany(UserBookStatus, { as: 'UserStatusesBook', foreignKey: 'book_id' });
UserBookStatus.belongsTo(Book, { as: 'Book', foreignKey: 'book_id' });

// User 与 UserMovieStatus 的关系
User.hasMany(UserMovieStatus, { as: 'MovieStatuses', foreignKey: 'user_id' });
UserMovieStatus.belongsTo(User, { as: 'User', foreignKey: 'user_id' });

// Movie 与 UserMovieStatus 的关系
Movie.hasMany(UserMovieStatus, { as: 'UserStatusesMovie', foreignKey: 'movie_id' });
UserMovieStatus.belongsTo(Movie, { as: 'Movie', foreignKey: 'movie_id' });

// 定义 User-Blog 关系
User.hasMany(Blog, { as: 'Blogs', foreignKey: 'blog_auther_id' });
Blog.belongsTo(User, { as: 'Author', foreignKey: 'blog_auther_id' });

module.exports = {
    User,
    UserRelationship,
    Album,
    UserAlbumStatus,
    Blog,
    UserBookStatus,
    Book,
    UserMovieStatus,
    Movie

};