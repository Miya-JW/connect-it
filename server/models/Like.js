const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db'); 

const Like = sequelize.define('Like', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'books',
            key: 'book_id'
        }
    },
    book_like: {
        type: DataTypes.BOOLEAN
    },
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'movies',
            key: 'movie_id'
        }
    },
    movie_like: {
        type: DataTypes.BOOLEAN
    },
    album_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'albums',
            key: 'album_id'
        }
    },
    album_like: {
        type: DataTypes.BOOLEAN
    },
    place_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'places',
            key: 'place_id'
        }
    },
    place_like: {
        type: DataTypes.BOOLEAN
    },
    photo_album_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'photo_albums',
            key: 'photo_album_id'
        }
    },
    photo_album_like: {
        type: DataTypes.BOOLEAN
    },
    topic_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'topics',
            key: 'topic_id'
        }
    },
    topic_like: {
        type: DataTypes.BOOLEAN
    },
    tweet_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tweets',
            key: 'tweet_id'
        }
    },
    tweet_like: {
        type: DataTypes.BOOLEAN
    },
    blog_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'blogs',
            key: 'blog_id'
        }
    },
    blog_like: {
        type: DataTypes.BOOLEAN
    }
}, {
    tableName: 'likes',
    timestamps: false
});

module.exports = Like;