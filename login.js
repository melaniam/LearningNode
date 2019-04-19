const jwt = require('jsonwebtoken');
const utils = require('./utils');
const config = require('./config');

// TODO: implement login here
const actions = {
    'POST': (request, response) => {
        utils.collectData(request, formattedData => {
            const { username, password } = formattedData;
            if (!username || !password) {
                utils.sendResponse(response, "Username or password missing", 400, {'Content-Type': 'text/plain'});
                return;
            }

            const { adminUser } = utils;
            if (username !== adminUser.username || password !== adminUser.password){
                utils.sendResponse(response, "Username or password incorrect", 401, {'Content-Type': 'text/plain'});
                return;
            }
            
            let token = jwt.sign({username: username},
                config.secret,
                { expiresIn: '24h' } // expires in 24 hours
            );
            
            const responseObject = {
                message: 'Authentication successful',
                token
            };

            utils.sendResponse(response, JSON.stringify(responseObject), 200, {'Content-Type': 'application/json'});
        });
    }
}

module.exports = (request, response) => {
    const action = actions[request.method];
    if (action) {
        action(request, response);
    } else {
        // add catch all error handler
        sendResponse(response, "Not Found", 404);
    }
}