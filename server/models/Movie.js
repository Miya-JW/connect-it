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
        allowNull: false
    },
    movie_director: {
        type: DataTypes.STRING,
        allowNull: false
    },
    movie_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    movie_genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    movie_cast: {
        type: DataTypes.STRING,
        allowNull: false
    },
    movie_duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    movie_language: {
        type: DataTypes.STRING,
        allowNull: false
    },
    movie_summary: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    movie_rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    movie_imdburl: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'movies',
    timestamps: false
});

module.exports = Movie;