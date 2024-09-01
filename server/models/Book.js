const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db'); // 确保路径正确

const Book = sequelize.define('Book', {
    book_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    book_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    book_author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    book_image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    book_ISBN: {
        type: DataTypes.STRING,
        allowNull: true
    },
    book_publisher: {
        type: DataTypes.STRING,
        allowNull: true
    },
    book_publish_date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    book_genre: {
        type: DataTypes.STRING,
        allowNull: true
    },
    book_summary: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    book_language: {
        type: DataTypes.STRING,
        allowNull: true
    },
    book_number_of_page: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'books',
    timestamps: false
});

module.exports = Book;