const express = require("express");
const router = express.Router();
const Users = require("../controllers/controller");

router.get("/users", Users.findAll);
router.get("/users/:id", Users.findById);
router.post('/users', Users.postUser)
router.delete('/users/:id', Users.deleteById)

module.exports = router;
