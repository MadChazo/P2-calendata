const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Defaults extends Model {}

Defaults.init(
  {
    // Manually define the primary key
    default_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'category_id',
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    // Prevent sequelize from renaming the table
    freezeTableName: true,
    underscored: true,
    modelName: 'defaults'
  }
);

module.exports = Defaults;