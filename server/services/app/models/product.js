'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Product.belongsTo(models.User, {foreignKey : "authorId", onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      Product.belongsTo(models.Category, {foreignKey : "categoryId", onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      Product.hasMany(models.Image, {foreignKey: "productId"})
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'name is required'
        },
        notEmpty: {
          msg: 'name is required'
        }
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'slug is required'
        },
        notEmpty: {
          msg: 'slug is required'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description is required'
        },
        notEmpty: {
          msg: 'Description is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price is required'
        },
        notEmpty: {
          msg: 'Price is required'
        },
        min : {
          args : 5,
          msg : 'minimum price is $5'
        }
      }
    },
    mainImg: {
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
          msg: 'invalid url format'
        }
      }
    },
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};