const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    user_first_name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    user_last_name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_join_date:{
        type:DataTypes.DATE,
        allowNull: false
    },
    user_date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false
    },
    user_place: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'places',
            key: 'place_id'
        }
    },
    user_about_me: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    user_avatar: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'images',
            key: 'image_id'
        }
    },
    user_tag: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tags',
            key: 'tag_id'
        }
    }
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;