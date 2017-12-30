//require('babel-core/register');
//require('babel-polyfill');

var http = require('http');
var express = require('express');
//import express from 'express';
var bodyParser = require('body-parser');
var cors = require('cors');

var graphqlHTTP = require('express-graphql');
//import { graphiqlExpress } from 'graphql-server';

var schema = require('./schemas/schema');

var app = express();
app.use('*', cors({ origin: '*' }));

var port = process.env.PORT || 1337;

app.use('/graphql',
        bodyParser.json(),
        graphqlHTTP({ schema: schema }));

app.use('/graphiql', (req, res) => {
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end("Hello Express 5");
})


// app.use('/graphiql', graphqlExpress({
//     endpointURL: '/graphql'
// }));

app.listen(port, () => {
    console.log('GraphQL Server is listening on: ' + port);
});
