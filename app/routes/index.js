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

    app.route('/api/polls')
        .get(dbController.getPolls)
        .post(dbController.addPoll)
        
    app.route('/api/polls/delete')
        .post(dbController.deletePoll)
};