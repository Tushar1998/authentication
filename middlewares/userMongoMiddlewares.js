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

const isUserRegistered = async (req, res, next) => {
	try {
		let findUser = await User.findOne({ email: req.body.email });
		// console.log(findUser);
		// req.currentUser = { ...findUser };
		if (!findUser) {
			res.json({
				status: "Unsucessfull",
				message: "User not Registered",
			});
		}
		next(findUser);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { isUserRegistered, isEmailUnique };
