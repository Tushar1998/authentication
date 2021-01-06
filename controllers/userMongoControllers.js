const bcrypt = require("bcryptjs");
const { generateToken } = require("../helpers/jwtAuthentication.js");

const User = require("../models/userModel.js");
const AppError = require("../helpers/appError.js");
const sendErrorMessage = require("../helpers/sendError.js");
// const sendResponse = require('../helpers/sendResponse.js');

const signUpUser = async (req, res) => {
  try {
    let newUser = new User(req.body.email, req.body.password);
    let result = await newUser.save();
    res.json({
      status: "SucessFull",
      message: "User Created",
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = () => {};

module.exports = {
  signUpUser,
  loginUser,
};
