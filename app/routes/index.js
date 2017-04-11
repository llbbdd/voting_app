'use strict';

var databaseController = require(process.cwd() + '/app/controllers/databaseController.server.js');

module.exports = function (app, db) {
    var dbController = new databaseController(db);

    app.route('/')
        .get(function (req, res) {
        res.sendFile(process.cwd() + '/public/author-dashboard.html');
    });
    
    app.route('/poll-add.html')
        .get(function (req, res) {
        res.sendFile(process.cwd() + '/public/poll-add.html');
    });

    app.route('/api/polls/getpolls')
        .get(dbController.getPolls)
        
    app.route('/api/polls/addpoll')
        .post(dbController.addPoll)
        
    app.route('/api/polls/deletepoll')
        .post(dbController.deletePoll)
};