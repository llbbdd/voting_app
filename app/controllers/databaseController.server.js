'use strict';
var mongodb = require('mongodb'); // Only required for static reference to ObjectID constructor
var ObjectID = require('mongodb').ObjectID;

function databaseController (db) {
    var pollsCollection = db.collection('polls');

    this.getPolls = function (req, res) {
        read({}, 
            {_id: 1, pollname: 1, polloptions: 1}, 
            function(documents){
                // todo - redirection
                res.send(documents);
            });
    };
    
    this.getPollOptions = function (pollId, callback) {
        read({_id: new ObjectID(pollId)},
            {pollname: 1, polloptions: 1},
            function(poll){
                console.log(poll);
                callback(poll);
            });
    };

    this.getPollResults = function (pollId, callback) {
        read({_id: new ObjectID(pollId)},
            {},
            function(poll){
                callback(poll);
            });
    };
    
    this.addPoll = function (req, res) {
        var pollName = req.body.selectedpoll;
    
        create({ 'pollname': pollName},
            function(){
              res.send(true);
            });
    };
    
    this.incrementPollOption = function (pollId, pollOption, callback) {
        var operation = {};
        operation[pollOption] = 1;

        update(
            {_id: new ObjectID(pollId)},
            { $inc: operation },
            callback
        );
    };

    this.deletePoll = function (req, res) {
        del({_id: new mongodb.ObjectID(req.body.selectedpoll)}, function(){
            res.send(true);
        });
    };
    
    function showCollection(){
        read({}, null, function(documents){
            console.log(documents);
        });
    }
    
    /*
        Low-level database access
    */
    function create(document, callback){
        pollsCollection.insert(
            document,
            function (err, result) {
                if (err) {
                    throw err;
                }
                
                callback();
            }
        );
    }
    
    function read(query, projection, callback){
        pollsCollection.find(query, projection).toArray(function(err, results) {
            if (err) {
                throw err;
            }
            
            callback(results);
        });
    }
    
    function update(query, update, callback){
        pollsCollection.update(
            query,
            update,
            function (err, result) {
                if (err) {
                    throw err;
                }

                callback();
            }
        );
    }
    
    function del(filter, callback){
        pollsCollection.deleteOne(
            filter,
            function(err, results){
                if (err) {
                    throw err;
                }

                callback();
            }
        );
    }
}

module.exports = databaseController;