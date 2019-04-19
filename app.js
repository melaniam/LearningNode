const http = require('http');
const url = require('url');
const utils = require('./utils');

const defaultHandler = require('./handler');
const loginHandler = require('./login');

const routes = {
    '/': defaultHandler,
    '/login': loginHandler
};

const app = http.createServer((request, response) => {
    const parts = url.parse(request.url);
    const route = routes[parts.pathname];

    if (route) {
        route(request, response);
    } else {
        utils.sendResponse(response, "Not Found", 404);
    }
});

app.listen(8080, () => {
    console.log('Server listening at 8080...');
});