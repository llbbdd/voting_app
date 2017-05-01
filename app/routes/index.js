'use strict';

var pollDbController = require(process.cwd() + '/app/controllers/pollDbController.server.js');
var userDbController = require(process.cwd() + '/app/controllers/userDbController.server.js');
var passport = require("passport");
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

module.exports = function(app, db) {
    var pollDb = new pollDbController(db);
    var userDb = new userDbController(db);
    
    /*
        Unauthorised GET pages
    */
    app.route('/')
        .get(function(req, res) {
            res.render('home', {displayname: getUserDisplayName(req)});
        });

    app.route('/home')
        .get(function(req, res) {
            res.render('home', {displayname: getUserDisplayName(req)});
        });

    app.route('/sign-in')
        .get(function(req, res) {
            res.render('sign-in', {displayname: null});
        }).post(
            passport.authenticate('local', {
                failureRedirect: 'sign-in'
            }),
            function(req, res) {
                res.redirect('author-dashboard');
            }
        );

    app.route('/sign-up')
        .get(function(req, res) {
            res.render('sign-up', {displayname: null});
        }).post(function(req, res) {
            userDb.addUser(req.body.username, req.body.password, req.body.displayName, req.body.email, function(newUser){
                req.login(newUser, function(err) {
                    if(err){
                        throw err; 
                    }
                    
                    res.redirect('author-dashboard');
                });
            });
        });

    app.route('/log-out')
        .get(
            function(req, res) {
                req.logout();
                res.redirect('home');
            }
        );

    app.route('/poll-choice')
        .get(function(req, res) {
            pollDb.getPollOptions(req.query.pollId, function(pollData){
                res.render('poll-choice', {displayname: getUserDisplayName(req), poll: pollData});
            });
        }).post(function(req, res) {
            pollDb.incrementPollOption(req.body.pollId, req.body.polloption, function(){
                pollDb.getPollResults(req.body.pollId, function(pollData){
                    res.render('poll-results', {displayname: getUserDisplayName(req), poll: pollData});
                });
            });
        });
    
    /*
        Authorised GET pages
    */
    app.route('/author-dashboard')
        .get(
            ensureLoggedIn('sign-in'),
            function(req, res){
                res.render('author-dashboard', {displayname: getUserDisplayName(req)});
            }
        ).post(
            ensureLoggedIn('sign-in'),
            function(req, res) {
                res.render('author-dashboard', {displayname: getUserDisplayName(req)});
            }
        );
        
    app.route('/poll-edit')
        .get(
            ensureLoggedIn('sign-in'),
            function(req, res) {
                res.render('poll-edit');
            }
        ).post(
            ensureLoggedIn('sign-in'),
            function(req, res) {
                res.redirect('poll-edit');
            }
        );

    app.route('/poll-add')
        .get(
            ensureLoggedIn('sign-in'),
            function(req, res) {
                res.render('poll-add', {displayname: getUserDisplayName(req)});
            }
        ).post(
            ensureLoggedIn('sign-in'),
            function(req, res) {
                var optionNumber = 0;
                var options = [];
                
                do{
                    options[optionNumber] = req.body["option" + optionNumber];
                    optionNumber++;
                }while(req.body["option" + optionNumber] != null);
                
                pollDb.addPoll(req.body.pollname, req.user._id, options, function(){
                    res.redirect('author-dashboard');
                });
            }
        );
        
    app.route('/poll-url')
        .get(
            ensureLoggedIn('sign-in'),
            function(req, res) {
                res.render('poll-url');
            }
        ).post(
            ensureLoggedIn('sign-in'),
            function(req, res) {
                res.render('poll-url');
            }
        );
        
    /*
    API routes
    */
    app.route('/api/polls/getpolls')
        .get(pollDb.getPolls);

    app.route('/api/polls/addpoll')
        .post(pollDb.addPoll);

    app.route('/api/polls/deletepoll')
        .post(pollDb.deletePoll);
        
    /*
        Helper functions
    */
    function getUserDisplayName(req){
        return (req.user === undefined || req.user === null) ? "" : req.user.displayName;
    }
};
