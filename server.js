'use strict';

var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb').MongoClient;
var routes = require('./app/routes/index.js');

const SERVER_PORT = 8080;
const MONGO_PORT = 27017;
const MONGO_DB_NAME = 'mongodb://localhost:' + MONGO_PORT + '/voting';

var app = express();

passport.use(new LocalStrategy(function(username, password, callback) {
  mongo.connect(MONGO_DB_NAME, function(err, db) {
    if(err){
      throw err;
    }
    
    var usersCollection = db.collection("users");

    usersCollection.findOne({username: username}, function(err, user) {
      if(err){
        throw err;
      }

      db.close();

      if(!user){
        return callback(null, false);
      }

      if(user.password != password) {
        return callback(null, false);
      }
      
      return callback(null, user);
    });
  });
}));

// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, callback) {
  callback(null, user.id);
});

passport.deserializeUser(function(id, callback) {
  mongo.connect(MONGO_DB_NAME, function(err, db) {
    if(err){
      throw err;
    }
    
    var users = db.collection("users");

    users.findOne({id: id}, function(err, user) {
      if(err){ 
        return callback(err); 
      }
      
      callback(null, user);
    });
  });
});

mongo.connect(MONGO_DB_NAME, function (err, db) {
    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected on port ' + MONGO_PORT);
    }
    
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