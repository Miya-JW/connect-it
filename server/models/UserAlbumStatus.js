const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db'); // 确保路径正确
const User = require('./User'); // 引入 User 模型
const Album = require('./Album'); // 引入 Album 模型

const UserAlbumStatus = sequelize.define('UserAlbumStatus', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    album_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Album,
            key: 'album_id'
        }
    },
    album_status: {
        type: DataTypes.ENUM('to listen', 'listening', 'listened'),
        allowNull: false
    }
}, {
    tableName: 'user_album_status',
    timestamps: false
});

module.exports = UserAlbumStatus;