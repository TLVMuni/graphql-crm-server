var http = require('http');
var express = require('express');
var cors = require('cors');

var app = express();
app.use('*', cors({ origin: '*' }));


// var server = http.createServer(function(request, response) {
//
//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.end("Hello Express2");
//
// });

var port = process.env.PORT || 1337;

app.get('/', (req, res) => {
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end("Hello Express3");
})

// server.listen(port);
//
// console.log("Server running at http://localhost:%d", port);

app.listen(port, () => {
    console.log('GraphQL Server is listening on: ' + port);
});
