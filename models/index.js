const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Institution = require('./institution');
const Need = require('./need');
const DonationType = require('./donation-type');

User.init(sequelize);
Institution.init(sequelize);
Need.init(sequelize);
DonationType.init(sequelize);

const models = {
  sequelize,
  Sequelize,
  User,
  Institution,
  Need,
  DonationType
};

module.exports = models;
