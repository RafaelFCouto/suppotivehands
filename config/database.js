const { Sequelize } = require('sequelize');
const path = require('path');


const env = process.env.NODE_ENV || 'development';

let sequelize;

if (env === 'test') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '..', 'database_test.sqlite'),
    logging: false,
});
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '..', 'database.sqlite'),
  });
}

module.exports = sequelize;