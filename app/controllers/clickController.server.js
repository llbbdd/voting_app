'use strict';

const CLICK_PROJECTION = { '_id': false };

function clickHandler (db) {
    var clicks = db.collection('clicks');

    this.getClicks = function (req, res) {
        clicks.findOne({}, CLICK_PROJECTION, function (err, result) {
            if (err) {
                throw err;
            }

            res.setHeader('Content-Type', 'application/json');

            if(result === null){
                clicks.insert({'clicks': 0}, function (err) {
                    if (err) {
                        throw err;
                    }
                });

                res.json({'clicks': 0});
            }
            else{
                res.json(result);
            }
        });
    };

    this.addClick = function (req, res) {
        clicks
            .findAndModify(
                {},
                { '_id': 1 },
                { $inc: { 'clicks': 1 } },
                function (err, result) {
                    if (err) {
                        throw err;

                    }

                    res.json(result);
                }
            );
    };

    this.resetClicks = function (req, res) {
        clicks
            .update(
                {},
                { 'clicks': 0 },
                function (err, result) {
                    if (err) {
                        throw err;
                    }

                    res.json(result);
                }
            );
    };
}

module.exports = clickHandler;