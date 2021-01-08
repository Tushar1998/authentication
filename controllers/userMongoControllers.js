const bcrypt = require("bcryptjs");
const { generateToken } = require("../helpers/jwtAuthentication");
const uniqid = require("uniqid");

const User = require("../models/userMongoModel");

const signUpUser = async (req, res) => {
	try {
		let newUser = new User({
			userId: uniqid(),
			email: req.body.email,
			password: req.body.password,
		});
		let result = await newUser.save();
		res.json({
			status: "SucessFull",
			message: "User Created",
			user: newUser,
		});
	} catch (error) {
		console.log(error);
		res.json({
			status: "UnSucessfull",
			message: error,
		});
	}
};

const loginUser = async (req, res) => {
	try {
		// let result = await bcrypt.compare(req.body.password, req.currentUser.password);
		let result = await bcrypt.compare(req.body.password, findUser.password);
		if (!result) {
			sendErrorMessage(new AppError(401, "Unsucessfull", "Password is incorrect"), req, res);
		}
		
		let jwtToken = await generateToken({ email: findUser.email }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});

		res.cookie("jwt", jwtToken);
		res.status(200).json({
			status: "Sucessfull",
			data: [{ jwt: jwtToken }],
			message: "User Sucessfully Logged in",
		});
	} catch (err) {
		console.log(err);
		res.json({
			status: "Unsucessfull",
			message: "Error logging in",
		});
	}
};

module.exports = {
	signUpUser,
	loginUser,
};
