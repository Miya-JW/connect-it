const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db'); // 确保路径正确

const Comment = sequelize.define('Comment', {
    comment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    comment_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    comment_content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comment_tweet_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    comment_blog_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    comment_movie_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    comment_album_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    comment_book_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    comment_comment_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'comments',
    timestamps: false
});

module.exports = Comment;