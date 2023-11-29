const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Events extends Model {}

Events.init(
  {
    // Manually define the primary key
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    start_date: {
      type: DataTypes.STRING
    },
    end_date: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.STRING
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

module.exports = Events;