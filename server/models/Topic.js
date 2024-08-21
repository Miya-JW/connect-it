const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db'); 

const Topic = sequelize.define('Topic', {
    topic_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    topic_title: { 
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true 
    },
    topic_owner_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    topic_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    },
    topic_content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    topic_views: {
        type: DataTypes.INTEGER,
        defaultValue: 0, 
        allowNull: false
    }
}, {
    tableName: 'topics',
    timestamps: false
});

module.exports = Topic;