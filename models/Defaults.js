const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Defaults extends Model {}

Defaults.init(
  {
    // Manually define the primary key
    default_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    category_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    timestamps: false,
    // Prevent sequelize from renaming the table
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = Defaults;