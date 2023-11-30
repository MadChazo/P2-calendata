const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Events extends Model {}

Events.init(
  {
    // Manually define the primary key
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
      references: {
        model: 'category',
        key: 'id',
      },
    },
    start_date: {
      type: DataTypes.DATE,
    },
    end_date: {
      type: DataTypes.DATE,
    },
    description: {
      type: DataTypes.STRING,
    },
    location: {
        type: DataTypes.STRING,
      },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
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
    modelName: 'events',
  }
);

module.exports = Events;