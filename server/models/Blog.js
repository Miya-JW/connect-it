const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db'); 

const Blog = sequelize.define('Blog', {
    blog_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    blog_auther_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    blog_title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    blog_content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    blog_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    blog_img: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'images',
            key: 'image_id'
        }
    },
    blog_topic: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'topics',
            key: 'topic_id'
        }
    },
    blog_movie: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'movies',
            key: 'movie_id'
        }
    },
    blog_book: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'books',
            key: 'book_id'
        }
    },
    blog_music: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'albums',
            key: 'album_id'
        }
    },
    blog_place: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'places',
            key: 'place_id'
        }
    },
    blog_views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
}, {
    tableName: 'blogs',
    timestamps: false
});

module.exports = Blog;