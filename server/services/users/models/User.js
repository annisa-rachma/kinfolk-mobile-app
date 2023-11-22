const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongo");
const bcrypt = require("bcryptjs");

function hashPassword(password) {
  const hash = bcrypt.hashSync(password);
  return hash;
}

class User {
  static getUserCollection() {
    return getDb().collection("Users");
  }

  static async postUser(username, email, password, phoneNumber, address) {
    const users = this.getUserCollection();
    await users.insertOne({
      username,
      email,
      password: hashPassword(password),
      role: "Admin",
      phoneNumber,
      address
    });
  }

  static async findAll() {
    const users = this.getUserCollection();
    const data = await users.find().toArray();
    return data;
  }

  static async findById(id) {
    return await this.getUserCollection().findOne({
      _id: new ObjectId(id),
    });
  }

  static async findOne(email) {
    return await this.getUserCollection().findOne({
      email
    });
  }

  static async deleteById(id) {
    return await this.getUserCollection().deleteOne({
        _id: new ObjectId(id),
      });
  }
}

module.exports = User;
