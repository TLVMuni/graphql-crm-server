require('babel-core/register');
require('babel-polyfill');

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var graphqlHTTP = require('express-graphql');

var schema = require('./schemas/schema');

var app = express();
app.use('*', cors({ origin: '*' }));

var port = process.env.PORT || 1337;

// app.use('/graphql', (req, res) => {
//       res.writeHead(200, {"Content-Type": "text/plain"});
//       res.end("Hello Express4");
// })

app.use('/graphql',
        bodyParser.json(),
        graphqlHTTP({ schema: schema }));


app.listen(port, () => {
    console.log('GraphQL Server is listening on: ' + port);
});
