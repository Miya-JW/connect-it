const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db'); 

const Place = sequelize.define('Place', {
    place_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    place_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    place_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    place_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    place_phone_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    place_info: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'places',
    timestamps: false
});

module.exports = Place;