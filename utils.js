exports.sendResponse = (response, data, statusCode, headers) => {
    response.writeHead(statusCode, headers);
    response.end(data);
}

exports.collectData = (request, callback) => {
    let data = '';
    request.on('data', chunk => {
        data += chunk;
    });

    request.on('end', () => {
        callback(JSON.parse(data));
    });
}

exports.adminUser = {
    username: "mar",
    password: "1234"
}