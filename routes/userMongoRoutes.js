const express = require("express");
const router = express.Router();

const { signUpUser, loginUser } = require("../controllers/userMongoControllers");
const {
	checkRequestBody,
	checkConfirmPassword,
	hashPassword,
} = require("../middlewares/userMiddleware.js");

const isUserRegistered = require("../middlewares/userMongoMiddlewares");

router.route("/signup").post(checkRequestBody, checkConfirmPassword, hashPassword, signUpUser);
router.route("/login").post(checkRequestBody, isUserRegistered, loginUser);
// router.route("/logout").get();

module.exports = router;
