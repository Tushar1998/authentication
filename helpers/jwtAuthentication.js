const jwt = require('jsonwebtoken');
const util = require('util');

const generateToken = util.promisify(jwt.sign);
const verifyToken = util.promisify(jwt.verify);

module.exports = { generateToken, verifyToken };
