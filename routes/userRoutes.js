const express = require('express');
const router = express.Router();

const { signUpUser, loginUser } = require('../controllers/userControllers.js');
const { checkRequestBody, isEmailValid, isEmailUnique, checkConfirmPassword, hashPassword, isUserRegistered } = require('../middlewares/userMiddleware.js');

router.route('/signup').post(checkRequestBody, isEmailValid, isEmailUnique, checkConfirmPassword, hashPassword, signUpUser);
router.route('/login').post(checkRequestBody, isUserRegistered, loginUser);
router.route('/logout').get();


module.exports = router;