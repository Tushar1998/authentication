const User = require("../models/userMongoModel");

const isUserRegistered = async (req, res, next) => {
  try {
    let findUser = await User.findOne({ email: req.body.email });
    // console.log(findUser);
    // req.currentUser = { ...findUser };
    next(findUser);
  } catch (error) {
    console.log(error);
  }
};

module.exports = isUserRegistered;
