const User = require("../models/userMongoModel");

const isEmailUnique = async (req, res, next) => {
  let findUser = await User.findOne({ email: req.body.email });
  if (findUser) {
    res.json({
      status: "Unsucessfull",
      message: "User already Registered",
    });
  } else {
    next();
  }
};

const UserRegistered = async (req, res, next) => {
  try {
    let findUser = await User.findOne({ email: req.body.email });
    console.log("User Registered", findUser);
    if (!findUser) {
      res.json({
        status: "Unsucessfull",
        message: "User not Registered",
      });
    }
    req.currentUser = { ...findUser };
    console.log("Current User : ",req.currentUser._doc);
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { UserRegistered, isEmailUnique };
