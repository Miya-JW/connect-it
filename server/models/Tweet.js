const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db'); 

const Tweet = sequelize.define('Tweet', {
    tweet_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tweet_auther_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'user_id'
        }
    },
    tweet_content: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    tweet_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW, 
        allowNull: false
    },
    tweet_img: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'images', 
            key: 'image_id'
        }
    },
    tweet_topic: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'topics', 
            key: 'topic_id'
        }
    },
    tweet_movie: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'movies', 
            key: 'movie_id'
        }
    },
    tweet_book: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'books', 
            key: 'book_id'
        }
    },
    tweet_music: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'albums', 
            key: 'album_id'
        }
    },
    tweet_place: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'places', 
            key: 'place_id'
        }
    }
}, {
    tableName: 'tweets',
    timestamps: false
});

module.exports = Tweet;