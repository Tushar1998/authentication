// Inbuilt Modules
const fs = require("fs");
const path = require("path");
// Third party imports
const uniqid = require("uniqid");

const bcrypt = require("bcryptjs");
const fileName = path.join(__dirname, "..", "data", "users.json");
const users = JSON.parse(fs.readFileSync(fileName, "utf-8"));

const sendErrorMessage = require("../helpers/sendError.js");
const AppError = require("../helpers/appError.js");

// checking the body sent by the user
const checkRequestBody = (req, res, next) => {
	let validationArray;
	console.log(req.url);
	switch (req.url) {
		case "/signup":
			validationArray = ["email", "password", "confirmPassword"];
			break;
		case "/login":
			validationArray = ["email", "password"];
			break;
		default:
			return sendErrorMessage(
				new AppError(404, "Unsucessfull", "Requested request not found"),
				req,
				res
			);
	}
	let result = validationArray.every((key) => {
		return req.body[key] && req.body[key].trim().length;
	});
	if (!result) {
		sendErrorMessage(new AppError(400, "Unsucessfull", "Invalid Request Body"), req, res);
	}
	next();
};

// Checking the password is equal to checkPassword
const checkConfirmPassword = (req, res, next) => {
	if (req.body.password !== req.body.confirmPassword) {
		return sendErrorMessage(
			new AppError(400, "Unsucessfull", "pass confirm pass do not match"),
			req,
			res
		);
	}
	next();
};

// Checking every email is unique
const isEmailUnique = (req, res, next) => {
	let findUser = users.find((user) => {
		return user.email == req.body.email;
	});
	if (findUser) {
		// return res.send(' user already registered');
		return sendErrorMessage(new AppError(401, "Unsucessfull", "User Already Registered"), req, res);
	}
	next();
};

// hashing the password
const hashPassword = async (req, res, next) => {
	try {
		let salt = await bcrypt.genSalt(10);
		req.body.password = await bcrypt.hash(req.body.password, salt);
		next();
	} catch (err) {
		return sendErrorMessage(new AppError(500, "Unsucessfull", "Internal Error"), req, res);
	}
};

//login function
//check for email and password in the body
// check if email and pasword are not empty
// check if emial exists in database

// find the user with email

// checking if the user is registered or not when logging in
const isUserRegistered = (req, res, next) => {
	let findUser = users.find((user) => {
		return user.email == req.body.email;
	});
	if (!findUser) {
		return sendErrorMessage(new AppError(422, "Unsucessfull", "Internal Error"), req, res);
	}
	req.currentUser = { ...findUser };
	next();
};

module.exports = {
	checkRequestBody, // Required MONGODB && JSON
	isEmailUnique, // Required for JSON only
	checkConfirmPassword, // Required MONGODB && JSON
	hashPassword, // Required MONGODB && JSON
	isUserRegistered, // Required for JSON only
};
