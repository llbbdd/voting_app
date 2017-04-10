'use strict';

const CLICK_PROJECTION = { '_id': false };

function authorDashboardController (db) {
    var polls = db.collection('polls');

    this.getPolls = function (req, res) {
        console.log("getPolls");
        /*polls.findOne({}, CLICK_PROJECTION, function (err, result) {
            if (err) {
                throw err;
            }

            res.setHeader('Content-Type', 'application/json');

            if(result === null){
                polls.insert({'clicks': 0}, function (err) {
                    if (err) {
                        throw err;
                    }
                });

                res.json({'clicks': 0});
            }
            else{
                res.json(result);
            }
        });*/
    };

    this.addPoll = function (req, res) {
        console.log("addPoll");
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

module.exports = authorDashboardController;