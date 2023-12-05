const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Defaults extends Model {}

Defaults.init(
  {
    // Manually define the primary key
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id',
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