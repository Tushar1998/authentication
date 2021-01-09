const express = require("express");
const router = express.Router();

const { signUpUser, loginUser, getAllUsers } = require("../controllers/userMongoControllers");
const {
  checkRequestBody,
  checkConfirmPassword,
  hashPassword,
} = require("../middlewares/userMiddleware.js");

const { UserRegistered, isEmailUnique } = require("../middlewares/userMongoMiddlewares");

router.route("/").get(getAllUsers);

router
  .route("/signup")
  .post(checkRequestBody, isEmailUnique, checkConfirmPassword, hashPassword, signUpUser);
router.route("/login").post(checkRequestBody, UserRegistered, loginUser);
// router.route("/logout").get();

module.exports = router;
