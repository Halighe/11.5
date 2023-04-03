const path = require('path');
const { sequelize } = require('../DB');
const { DataTypes } = require('sequelize');

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'reviews'
});

module.exports = { Review };