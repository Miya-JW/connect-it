const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db');
const User = require('./User'); // 确保路径正确
const Artist = require('./Artist'); // 确保路径正确

const UserArtist = sequelize.define('UserArtist', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'User', // 确保这里使用的是数据库中的表名
            key: 'user_id' // 这里应该是 User 表的主键字段名
        }
    },
    artist_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Artist', // 确保这里使用的是数据库中的表名
            key: 'artist_id' // 这里应该是 Artist 表的主键字段名
        }
    }
}, {
    tableName: 'user_artists',
    timestamps: false
});
UserArtist.belongsTo(Artist, { foreignKey: 'artist_id', as: 'Artist' });

module.exports = UserArtist;

