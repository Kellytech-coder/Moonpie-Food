const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Restaurant = sequelize.define('Restaurant', {
  name: { type: DataTypes.STRING, allowNull: false },
  cuisine: { type: DataTypes.STRING, allowNull: false },
  rating: { type: DataTypes.DECIMAL(2,1), defaultValue: 0 },
  address: { type: DataTypes.STRING, allowNull: false },
  latitude: { type: DataTypes.DECIMAL(9,6), allowNull: true },
  longitude: { type: DataTypes.DECIMAL(9,6), allowNull: true }
}, { timestamps: true });

module.exports = Restaurant;
