const User = require("../models/UserModel");

const getUsers = async (req, res, next) => {
  try {
    // mengambil semua data kecuail password
    const users = await User.find({}).select("-password");
    return res.json(users);
  } catch (err) {
    next(err);
  }
};
module.exports = getUsers;
