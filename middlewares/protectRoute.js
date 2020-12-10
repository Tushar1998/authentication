const fs = require('fs');
const path = require('path');
const AppError = require('../helpers/appError.js');

const fileName = path.join(__dirname, "..", "data", "users.json");
const users = JSON.parse(fs.readFileSync(fileName), 'utf-8');

const { verifyToken } = require('../helpers/jwtAuthentication.js');
const sendErrorMessage = require('../helpers/sendError.js');

const protectRoute = async (req, res, next) => {

    if (!req.header.authorization) {
        return sendErrorMessage(new AppError(401, "Unsucessfull", "Not logged in"), req, res);
    }

    let jwtToken = req.headers.authorization.split(' ')[1];

    try {
        let decoded = await verifyToken(jwtToken, process.env.JWT_SECRET);

        req.body.email == decoded.email;

        let currentUser = users.find(user => {
            return user.email == decoded.email;
        })

        // console.log(jwtToken);


        if (!currentUser) {
            sendErrorMessage(new AppError(401, "Unsucessfull", "Not logged in"), req, res)
            return res.send()
        }

        req.currentUser = currentUser;
        next();
    } catch (err) {
        return new AppError(err, req, res);
    }

}

module.exports = protectRoute;