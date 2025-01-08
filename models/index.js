const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/database'); // Verifique se o caminho está correto

const db = {};

// Carregar todos os arquivos de modelos na pasta models
fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js' && file.endsWith('.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    if (typeof model.init === 'function') {
      model.init(sequelize); // Inicializa o modelo com o Sequelize
    }
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;