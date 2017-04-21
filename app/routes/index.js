'use strict';

var databaseController = require(process.cwd() + '/app/controllers/databaseController.server.js');
var passport = require("passport");

module.exports = function(app, db) {
    /*
        Unauthorised GET pages
    */
    app.route('/')
        .get(function(req, res) {
            res.render('home', {username: getUser(req)});
        });

    app.route('/home')
        .get(function(req, res) {
            res.render('home', {username: getUser(req)});
        });

    app.route('/sign-in')
        .get(function(req, res) {
            res.render('sign-in');
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
            res.render('sign-up');
        }).post(function(req, res) {
            // todo add user
            console.log("add user");
        });

    app.route('/log-out')
        .get(
            function(req, res) {
                req.logout();
                res.render('home', {username: getUser(req)});
            }
        );

    app.route('/poll-choice')
        .get(function(req, res) {
            res.render('poll-choice', {username: getUser(req)});
        }).post(function(req, res) {
            // todo send chosen option
            console.log("option chosen");
        });
        
    app.route('/poll-results')
        .get(function(req, res) {
            res.render('poll-results', {username: getUser(req)});
        }).post(function(req, res) {
            // todo view poll results
            console.log("poll results");
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
    var dbController = new databaseController(db);

    app.route('/api/polls/getpolls')
        .get(dbController.getPolls);

    app.route('/api/polls/addpoll')
        .post(dbController.addPoll);

    app.route('/api/polls/deletepoll')
        .post(dbController.deletePoll);
        
    /*
        Helper functions
    */
    function getUser(req){
        return (req.user === undefined || req.user === null) ? null : req.user.name;
    }
};
