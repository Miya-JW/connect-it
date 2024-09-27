const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db');

const Movie = sequelize.define('Movie', {
    movie_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    movie_title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    movie_director: {
        type: DataTypes.STRING,
        allowNull: true
    },
    movie_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    movie_genre: {
        type: DataTypes.STRING,
        allowNull: true
    },
    movie_cast: {
        type: DataTypes.STRING,
        allowNull: true
    },
    movie_duration: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    movie_language: {
        type: DataTypes.STRING,
        allowNull: true
    },
    movie_summary: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    movie_rating: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    movie_imdburl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    movie_poster: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'movies',
    timestamps: false
});

module.exports = Movie;