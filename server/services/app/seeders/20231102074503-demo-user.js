'use strict';
// const {hashPassword} = require('../helper/bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // const dataUser = [
    //   {
    //     username: "admin1",
    //     email : 'admin1@mail.com',
    //     password : hashPassword('12345'),
    //     role : "Admin",
    //     phoneNumber : "0123456",
    //     address : "dimana saja",
    //     createdAt : new Date(),
    //     updatedAt : new Date()
    //   },
    //   {
    //     username: "admin2",
    //     email : 'admin2@mail.com',
    //     password : hashPassword('12345'),
    //     role : "Admin",
    //     phoneNumber : "0123456",
    //     address : "dimana saja",
    //     createdAt : new Date(),
    //     updatedAt : new Date()
    //   },   
    // ]

    const dataCategories = require('../data/categories.json').map((el) => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    const dataProducts = require('../data/products.json').map((el) => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    const dataImages = require('../data/images.json').map((el) => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    // await queryInterface.bulkInsert('Users', dataUser);
    await queryInterface.bulkInsert('Categories', dataCategories);
    await queryInterface.bulkInsert('Products', dataProducts);
    await queryInterface.bulkInsert('Images', dataImages);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    // await queryInterface.bulkDelete('Users', null, {});
  }
};
