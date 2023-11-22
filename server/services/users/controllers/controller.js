const { ObjectId } = require("mongodb");
const User = require("../models/User");

class Users {
  static async postUser(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      if (!username || !email || !password || !phoneNumber || !address) {
        return res
          .status(400)
          .json({ message: "Please fill in the input fields" });
      }

      const user = await User.findOne(email);
      if (user) {
        return res.status(400).json({ message: "email already registered" });
      }
      await User.postUser(username, email, password, phoneNumber, address);
      res.status(201).json({ message: "succesfully registered" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async findAll(req, res, next) {
    try {
      let users = await User.findAll();
      users = users.map(({ password, ...rest }) => rest);
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async findById(req, res, next) {
    try {
      const { id } = req.params;
      const { password, ...user } = await User.findById(id);
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async deleteById(req, res, next) {
    try {
      const user = await User.findById(req.params.id)
      if(!user) {
        return res.status(404).json({ message: "user not found" });
      }
      await User.deleteById(req.params.id);
      res
        .status(200)
        .json({ message: "Successfully deleted the selected user" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Users;
