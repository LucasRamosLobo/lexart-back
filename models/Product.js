'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    static associate(models) {
     
    }
  }
  Product.init({
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    price: DataTypes.INTEGER,
    color: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};