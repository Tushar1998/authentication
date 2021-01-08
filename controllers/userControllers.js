// Inbuilt Modules
const fs = require("fs");
const path = require("path");
// Third party imports
const uniqid = require("uniqid");
const bcrypt = require("bcryptjs");

// Custom Modules
const { generateToken } = require("../helpers/jwtAuthentication.js");

const User = require("../models/userModel.js");
const AppError = require("../helpers/appError.js");
const sendErrorMessage = require("../helpers/sendError.js");
// const sendResponse = require('../helpers/sendResponse.js');

const fileName = path.join(__dirname, "..", "data", "users.json");
const users = JSON.parse(fs.readFileSync(fileName, "utf-8"));

const signUpUser = (req, res) => {
	let newUser = new User(req.body.email, req.body.password);
	users.push(newUser);
	fs.writeFile(fileName, JSON.stringify(users, null, 2), (err) => {
		if (err) {
			return sendErrorMessage(new AppError(401, "Unsucessfull", "Invalid Request"), req, res);
		}
		console.log();
		res.send("User Created");
	});
};

const loginUser = async (req, res) => {
	try {
		let result = await bcrypt.compare(req.body.password, req.currentUser.password);
		let jwtToken = await generateToken({ email: req.currentUser.email }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});
		if (!result) {
			sendErrorMessage(new AppError(401, "Unsucessfull", "Password is incorrect"), req, res);
		}
		res.cookie("jwt", jwtToken);
		res.status(200).json({
			status: "Sucessfull",
			data: [{ jwt: jwtToken }],
			message: "User logged in",
		});
	} catch (err) {
		sendErrorMessage(new AppError(401, "Unsucessfull", "Password is incorrect"), req, res);
	}
};

module.exports = { signUpUser, loginUser };
