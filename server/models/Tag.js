const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db'); 

const Tag = sequelize.define('Tag', {
    tag_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tag_content: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tags',
    timestamps: false
});

module.exports = Tag;