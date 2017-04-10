'use strict';

var AuthorDashboardController = require(process.cwd() + '/app/controllers/authorDashboardController.server.js');

module.exports = function (app, db) {
    var aDController = new AuthorDashboardController(db);

    app.route('/')
        .get(function (req, res) {
        res.sendFile(process.cwd() + '/public/author-dashboard.html');
    });

    app.route('/api/polls')
        .get(aDController.getPolls)
        .post(aDController.addPoll)
        .delete(aDController.deletePoll);
};