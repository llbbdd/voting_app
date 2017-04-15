'use strict';

var databaseController = require(process.cwd() + '/app/controllers/databaseController.server.js');
var passport = require("passport");
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

module.exports = function (app, db) {
    var dbController = new databaseController(db);

    app.route('/')
        .get(function (req, res) {
        res.sendFile(process.cwd() + '/public/author-dashboard.html');
    });
    
    app.route('/sign-in.html')
        .get(function (req, res) {
        res.sendFile(process.cwd() + '/public/sign-in.html');
    }).post(function (req, res) {
        passport.authenticate('local', { failureRedirect: '/sign-in.html' }),
        function(req, res) {
            res.redirect('/');
        };
    });
    
    app.route('/sign-up.html')
        .get(function (req, res) {
        res.sendFile(process.cwd() + '/public/sign-up.html');
    }).post(function (req, res) {
        // todo add user
        console.log("add user");
    });
    
    app.route('/poll-edit.html')
    .get(
        require('connect-ensure-login').ensureLoggedIn('/sign-in.html'),
        function(req, res){
            res.sendFile(process.cwd() + '/public/poll-edit.html');
        }
    );

    app.route('/api/polls/getpolls')
        .get(dbController.getPolls);
        
    app.route('/api/polls/addpoll')
        .post(dbController.addPoll);
        
    app.route('/api/polls/deletepoll')
        .post(dbController.deletePoll);
}


