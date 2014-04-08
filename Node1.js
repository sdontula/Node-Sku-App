/*
 * Created by donsa001 on 3/13/14.
 */
var http = require('http');

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World 2\n');
}).listen(8082);

console.log('Server running at http://127.0.0.1:8082/');
