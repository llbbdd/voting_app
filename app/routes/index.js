'use strict';

var databaseController = require(process.cwd() + '/app/controllers/databaseController.server.js');
var passport = require("passport");

module.exports = function(app, db) {
    /*
        Unauthorised GET pages
    */
    app.route('/')
        .get(function(req, res) {
            res.render('home');
        });

    app.route('/home')
        .get(function(req, res) {
            res.render('home', {username: getUser(req)});
        });

    app.route('/sign-in')
        .get(function(req, res) {
            res.sendFile(process.cwd() + '/public/sign-in.html');
        }).post(
            passport.authenticate('local', {
                failureRedirect: '/sign-in'
            }),
            function(req, res) {
                res.redirect('/author-dashboard.html');
            }
        );

    app.route('/sign-up')
        .get(function(req, res) {
            res.sendFile(process.cwd() + '/public/sign-up.html');
        }).post(function(req, res) {
            // todo add user
            console.log("add user");
        });

    app.route('/log-out')
        .get(
            function(req, res) {
                req.logout();
                res.redirect('/');
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
                failureRedirect: '/sign-in'
            }),
            function(req, res) {
                res.sendFile(process.cwd() + '/public/author-dashboard.html');
            }
        ).post(
            passport.authenticate('local', {
                failureRedirect: '/sign-in'
            }),
            function(req, res) {
                res.redirect('/author-dashboard.html');
            }
        );
        
    app.route('/poll-edit')
        .get(
            passport.authenticate('local', {
                failureRedirect: '/sign-in'
            }),
            function(req, res) {
                res.sendFile(process.cwd() + '/public/poll-edit.html');
            }
        ).post(
            passport.authenticate('local', {
                failureRedirect: '/sign-in'
            }),
            function(req, res) {
                res.redirect('/poll-edit.html');
            }
        );

    app.route('/poll-add')
        .get(
            passport.authenticate('local', {
                failureRedirect: '/sign-in'
            }),
            function(req, res) {
                res.sendFile(process.cwd() + '/public/poll-add.html');
            }
        ).post(
            passport.authenticate('local', {
                failureRedirect: '/sign-in'
            }),
            function(req, res) {
                res.redirect('/poll-add.html');
            }
        );
        
    app.route('/poll-url')
        .get(
            passport.authenticate('local', {
                failureRedirect: '/sign-in'
            }),
            function(req, res) {
                res.sendFile(process.cwd() + '/public/poll-url.html');
            }
        ).post(
            passport.authenticate('local', {
                failureRedirect: '/sign-in'
            }),
            function(req, res) {
                res.redirect('/poll-url.html');
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
        
    function getUser(req){
        return (req.user === undefined) ? undefined : req.user.name;
    }
};
