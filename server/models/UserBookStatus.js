const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db'); // 确保路径正确
const User = require('./User'); 
const Book = require('./Book'); 

const UserBookStatus = sequelize.define('UserBookStatus', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Book,
            key: 'book_id'
        }
    },
    book_status: {
        type: DataTypes.ENUM('to read', 'reading', 'read'),
        allowNull: false
    }
}, {
    tableName: 'user_book_status',
    timestamps: false
});

module.exports = UserBookStatus;