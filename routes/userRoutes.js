const express = require('express');
const router = express.Router();

const { signUpUser, loginUser } = require('../controllers/userController.js');
const { checkRequestBody, isEmailValid, isEmailUnique, checkConfirmPassword, hashPassword, isUserRegistered } = require('../middlewares/userMiddleware.js')

router.route('/signUp').post(checkRequestBody, isEmailValid, isEmailUnique, checkConfirmPassword, hashPassword, signUpUser);
router.route('/signIn').post(checkRequestBody, isUserRegistered, loginUser);
router.route('/logout').get();


module.exports = router;