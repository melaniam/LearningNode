exports.sendResponse = (response, data, statusCode, headers) => {
    response.writeHead(statusCode, headers);
    response.end(data);
}

exports.collectData = (request, callback) => {
    const data = [];
    request.on('data', chunk => {
        data.push(chunk);
    });

    request.on('end', () => {
        data = data.concat.toString();
        callback(data);
    });
}