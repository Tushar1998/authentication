const express = require("express");
const router = express.Router();

const { signUpUser, loginUser } = require("../controllers/userMongoControllers");
const {
	checkRequestBody,
	checkConfirmPassword,
	hashPassword,
} = require("../middlewares/userMiddleware.js");

const { isUserRegistered, isEmailUnique } = require("../middlewares/userMongoMiddlewares");

router
	.route("/signup")
	.post(checkRequestBody, isEmailUnique, checkConfirmPassword, hashPassword, signUpUser);
router.route("/login").post(checkRequestBody, isUserRegistered, loginUser);
// router.route("/logout").get();

module.exports = router;
