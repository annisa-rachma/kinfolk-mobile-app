'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Product, {foreignKey : "productId", onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }
  }
  Image.init({
    productId: DataTypes.INTEGER,
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Image url required'
        },
        notEmpty: {
          msg: 'Image url required'
        },
        isUrl : {
          msg : 'invalid url format'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};