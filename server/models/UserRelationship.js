const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db'); 

const UserRelationship = sequelize.define('UserRelationship', {
    relationship_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    follower_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    following_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    relationship_status: {
        type: DataTypes.ENUM('following', 'mutual'),
        defaultValue: 'following'
    },
    relationship_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'user_relationships',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['follower_id', 'following_id']
        }
    ]
});

module.exports = UserRelationship;