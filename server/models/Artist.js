const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db'); // 确保路径正确

const Artist = sequelize.define('Artist', {
    artist_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    artist_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artist_image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    artist_spotify_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    artist_genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artist_popularity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    artist_followers: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'artists',
    timestamps: false
});

module.exports = Artist;