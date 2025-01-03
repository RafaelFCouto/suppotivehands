const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Need extends Model {
  static init(sequelize) {
    super.init(
      {
        donation_type_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        institution_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Needs',
        tableName: 'needs',
        timestamps: true,
      }
    );

    return this;
  }

  static associate(models) {

    this.belongsTo(models.Institution, {
      foreignKey: 'institution_id',
      as: 'institution',
    });

    this.belongsTo(models.DonationTypes, {
      foreignKey: 'donation_type_id',
      as: 'donationType',
    });
  }
}

module.exports = Need;