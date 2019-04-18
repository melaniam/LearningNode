const jwt = require('jsonwebtoken');
const config = require('./config');
const utils = require('./utils');

const checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token.startsWith('Bearer')) {
        // remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                utils.sendResponse(res, "Token is not valid", 401);
            } else {
                req.decoded = decoded;
                next();
            }
        })
    }
    else {
        utils.sendResponse(res, "Token not supplied", 400);
    }
}

module.exports = {
    checkToken
}