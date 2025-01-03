const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class DonationType extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        modelName: 'DonationType',
        tableName: 'donation_type',
        timestamps: true
      }
    );

    return this;
  }
}

module.exports = DonationType;