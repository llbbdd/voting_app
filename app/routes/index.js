'use strict';

var databaseController = require(process.cwd() + '/app/controllers/databaseController.server.js');
var passport = require("passport");

module.exports = function(app, db) {
    var dbController = new databaseController(db);
    
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
                res.render('author-dashboard');
            }
        );

    app.route('/sign-up')
        .get(function(req, res) {
            res.render('sign-up', {username: null});
        }).post(function(req, res) {
            // todo add user
            console.log("add user");
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
            dbController.getPollOptions(req.query.pollId, function(pollData){
                res.render('poll-choice', {username: getUserName(req), poll: pollData});
            });
        }).post(function(req, res) {
            dbController.incrementPollOption(req.body.pollId, req.body.polloption, function(){
                dbController.getPollResults(req.body.pollId, function(pollData){
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
                res.render('author-dashboard');
            }
        ).post(
            passport.authenticate('local', {
                failureRedirect: 'sign-in'
            }),
            function(req, res) {
                res.render('author-dashboard');
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
        .get(dbController.getPolls);

    app.route('/api/polls/addpoll')
        .post(dbController.addPoll);

    app.route('/api/polls/deletepoll')
        .post(dbController.deletePoll);
        
    /*
        Helper functions
    */
    function getUserName(req){
        return (req.user === undefined || req.user === null) ? null : req.user.name;
    }
};
