const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('biblio', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = { sequelize };