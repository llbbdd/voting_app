'use strict';
var qs = require('querystring');
const POLL_PROJECTION = { '_id': false };

function databaseController (db) {
    var polls = db.collection('polls');

    this.getPolls = function (req, res) {
        console.log("getPolls");
        /*polls.find({}, POLL_PROJECTION, function (err, result) {
            if (err) {
                throw err;
            }

            res.setHeader('Content-Type', 'application/json');

            if(result === null){
                res.json('No existing polls');
            }
            else{
                res.json(result);
            }
        });*/
    };

    this.addPoll = function (req, res) {
        var pollName = req.body.pollname;
        var pollOptions = req.body.polloptions;
        
        /*polls.findAndModify(
            {},
            { '_id': 1 },
            { $inc: { 'clicks': 1 } },
            function (err, result) {
                if (err) {
                    throw err;

                }

                res.json(result);
            }
        );*/
    };

    this.deletePoll = function (req, res) {
        console.log("deletePoll");
        /*polls.update(
            {},
            { 'clicks': 0 },
            function (err, result) {
                if (err) {
                    throw err;
                }

                res.json(result);
            }
        );*/
    };
}

module.exports = databaseController;