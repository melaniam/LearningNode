const utils = require('./utils');

const actions = {
    'GET': (request, response) => {
        utils.sendResponse(response, 'Hello World!', 200, {'Content-Type': 'text/plain'});
    },
    'POST': (request, response) => {
        utils.collectData(request, formattedData => {
            // do smth with formattedData
            utils.sendResponse(response, 'Success', 200, {'Content-Type': 'text/plain'});
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