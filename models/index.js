const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

User.init(sequelize);

const models = {
  sequelize,
  Sequelize,
  User
};

module.exports = models;
