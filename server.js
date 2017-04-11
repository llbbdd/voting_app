'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongo = require('mongodb').MongoClient;
var bodyParser = require('body-parser'); // For POST parameter reading (1 of 2)

const SERVER_PORT = 8080;
const MONGO_PORT = 27017;
const MONGO_DB_NAME = 'voting';

var app = express();

mongo.connect('mongodb://localhost:' + MONGO_PORT + '/' + MONGO_DB_NAME, function (err, db) {

    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected on port ' + MONGO_PORT);
    }

    app.use(bodyParser.json()); // For POST parameter reading (2 of 2)

    app.use('/public', express.static(process.cwd() + '/public'));
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
    
    routes(app, db);

    app.listen(SERVER_PORT, function () {
        console.log('Server listening on port ' + SERVER_PORT);
    });
});