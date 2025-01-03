const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); // Conexão com o banco de dados SQLite

class Institution extends Model {
  static init(sequelize) {
    super.init(
      {
        cnpj: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        phonenumber: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        beneficiaries: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        cep: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        street: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        number: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        vacancies: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Institution',
        tableName: 'institution',
        timestamps: true
      }
    );

    return this;
  }
}

module.exports = Institution;