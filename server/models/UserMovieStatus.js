const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db'); // 确保路径正确
const User = require('./User');
const Movie = require('./Movie');

const UserMovieStatus = sequelize.define('UserMovieStatus', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    movie_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Movie,
            key: 'movie_id'
        }
    },
    movie_status: {
        type: DataTypes.ENUM('to watch', 'watching', 'watched'),
        allowNull: false
    }
}, {
    tableName: 'user_movie_status',
    timestamps: false
});

module.exports = UserMovieStatus;