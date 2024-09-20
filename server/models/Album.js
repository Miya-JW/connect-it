const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db'); // 确保路径正确

const Album = sequelize.define('Album', {
    album_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    album_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    album_artist_name:{
        type: DataTypes.STRING,
        allowNull: true
    },
    album_image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    album_release_date: {
        type: DataTypes.DATEONLY, // 更适合存储仅日期的字段
        allowNull: true
    },
    album_total_tracks: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    album_spotifyUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    album_market: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'albums',
    timestamps: false
});

module.exports = Album;