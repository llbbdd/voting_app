'use strict';

var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb').MongoClient;
var routes = require('./app/routes/index.js');
var favicon = require('serve-favicon');
var path = require('path');
var userDbController = require(process.cwd() + '/app/controllers/userDbController.server.js');

const SERVER_PORT = 8080;
const MONGO_PORT = 27017;
const MONGO_DB_NAME = 'mongodb://localhost:' + MONGO_PORT + '/voting';

var app = express();

mongo.connect(MONGO_DB_NAME, function (err, db) {
    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected on port ' + MONGO_PORT);
    }
    
    var dbController = new userDbController(db);
    
    passport.use(new LocalStrategy(function(username, password, callback) {
      dbController.getUserByUsername(username, function(user){
        if(!user){
          // Username not found
          return callback(null, false);
        }
    
        if(user.password != password) {
          // Username found, but password incorrect
          return callback(null, false);
        }
        
        // Username and password correct
        return callback(null, user);
      });
    }));

    // Configure Passport authenticated session persistence.
    passport.serializeUser(function(user, callback) {
      callback(null, user.id);
    });
    
    passport.deserializeUser(function(id, callback) {
      dbController.getUserById(id, function(user){
        callback(null, user);
      });
    });

    // Configure view engine to render EJS templates.
    app.set('views', __dirname + '/public');
    app.set('view engine', 'ejs');

    app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
    app.use(require('cookie-parser')());
    app.use(require('body-parser').urlencoded({ extended: true }));
    app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
    app.use('/public', express.static(process.cwd() + '/public'));
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
    app.use(passport.initialize());
    app.use(passport.session());

    routes(app, db);

    app.listen(SERVER_PORT, function () {
        console.log('Server listening on port ' + SERVER_PORT);
    });
});