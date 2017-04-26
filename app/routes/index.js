'use strict';

var pollDbController = require(process.cwd() + '/app/controllers/pollDbController.server.js');
var passport = require("passport");

module.exports = function(app, db) {
    var pollDb = new pollDbController(db);
    
    /*
        Unauthorised GET pages
    */
    app.route('/')
        .get(function(req, res) {
            res.render('home', {username: getUserName(req)});
        });

    app.route('/home')
        .get(function(req, res) {
            res.render('home', {username: getUserName(req)});
        });

    app.route('/sign-in')
        .get(function(req, res) {
            res.render('sign-in', {username: null});
        }).post(
            passport.authenticate('local', {
                failureRedirect: 'sign-in'
            }),
            function(req, res) {
                res.render('author-dashboard', {username: getUserName(req)});
            }
        );

    app.route('/sign-up')
        .get(function(req, res) {
            res.render('sign-up', {username: null});
        }).post(function(req, res) {
            console.log("add user " + req.body.username + req.body.password);
            
        });

    app.route('/log-out')
        .get(
            function(req, res) {
                req.logout();
                res.render('home', {username: getUserName(req)});
            }
        );

    app.route('/poll-choice')
        .get(function(req, res) {
            pollDb.getPollOptions(req.query.pollId, function(pollData){
                res.render('poll-choice', {username: getUserName(req), poll: pollData});
            });
        }).post(function(req, res) {
            pollDb.incrementPollOption(req.body.pollId, req.body.polloption, function(){
                pollDb.getPollResults(req.body.pollId, function(pollData){
                    res.render('poll-results', {username: getUserName(req), poll: pollData});
                });
            });
        });
    
    /*
        Authorised GET pages
    */
    app.route('/author-dashboard')
        .get(
            passport.authenticate('local', {
                failureRedirect: 'sign-in'
            }),
            function(req, res) {
                res.render('author-dashboard', {username: getUserName(req)});
            }
        ).post(
            passport.authenticate('local', {
                failureRedirect: 'sign-in'
            }),
            function(req, res) {
                res.render('author-dashboard', {username: getUserName(req)});
            }
        );
        
    app.route('/poll-edit')
        .get(
            passport.authenticate('local', {
                failureRedirect: 'sign-in'
            }),
            function(req, res) {
                res.render('poll-edit');
            }
        ).post(
            passport.authenticate('local', {
                failureRedirect: 'sign-in'
            }),
            function(req, res) {
                res.redirect('poll-edit');
            }
        );

    app.route('/poll-add')
        .get(
            passport.authenticate('local', {
                failureRedirect: 'sign-in'
            }),
            function(req, res) {
                res.render('poll-add');
            }
        ).post(
            passport.authenticate('local', {
                failureRedirect: 'sign-in'
            }),
            function(req, res) {
                res.render('poll-add');
            }
        );
        
    app.route('/poll-url')
        .get(
            passport.authenticate('local', {
                failureRedirect: 'sign-in'
            }),
            function(req, res) {
                res.render('poll-url');
            }
        ).post(
            passport.authenticate('local', {
                failureRedirect: 'sign-in'
            }),
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
    function getUserName(req){
        return (req.user === undefined || req.user === null) ? null : req.user.name;
    }
};
