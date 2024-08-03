const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db'); // 确保路径正确

const Image = sequelize.define('Image', {
    image_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image_album_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'images',
    timestamps: false
});

module.exports = Image;