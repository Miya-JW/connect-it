const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db'); // 确保路径正确

const PhotoAlbum = sequelize.define('PhotoAlbum', {
    photo_album_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    photo_album_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo_album_description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    photo_album_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    photo_album_location: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'places', // 确保这个表名与数据库中的一致
            key: 'place_id'
        }
    },
    photo_album_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // 确保这个表名与数据库中的一致
            key: 'user_id'
        }
    }
}, {
    tableName: 'photo_albums',
    timestamps: false
});

module.exports = PhotoAlbum;