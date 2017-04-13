'use strict';

var databaseController = require(process.cwd() + '/app/controllers/databaseController.server.js');

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
        // todo authenticate
        console.log("authenticate");
    });
    
    app.route('/sign-up.html')
        .get(function (req, res) {
        res.sendFile(process.cwd() + '/public/sign-up.html');
    }).post(function (req, res) {
        // todo add user
        console.log("add user");
    });
    
    app.route('/poll-edit.html')
        .get(function (req, res) {
        res.sendFile(process.cwd() + '/public/poll-edit.html');
    });

    app.route('/api/polls/getpolls')
        .get(dbController.getPolls);
        
    app.route('/api/polls/addpoll')
        .post(dbController.addPoll);
        
    app.route('/api/polls/deletepoll')
        .post(dbController.deletePoll);
};