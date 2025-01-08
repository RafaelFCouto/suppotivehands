const { Sequelize, DataTypes, Model } = require('sequelize');
const bcryptjs = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
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
        password_hash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.VIRTUAL,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'user',
        timestamps: true,
        defaultScope: {
            attributes: { exclude: ['password'] },
        },
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  toJSON(){

    const attributes = { ... this.get() };

    delete attributes.password_hash;

    return attributes;
  }

  // async checkPassword(password) {
  //   return bcryptjs.compareSync(password, this.password_hash);
  // }
}

module.exports = User;