const bcrypt = require("bcryptjs")
const ObjectId = require("mongodb").ObjectId;

const users = [
  {
    name: "admin",
    lastName: "admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("admin@admin.com", 10),
    isAdmin: true,
  },
  {
    _id: ObjectId("63edc0958f3f70ad741b74d9"),
    name: "John",
    lastName: "Doe",
    email: "john@doe.com",
    password: bcrypt.hashSync("john@doe.com", 10),
  },
];

module.exports = users
