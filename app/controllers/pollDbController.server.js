'use strict';
var mongodb = require('mongodb'); // Only required for static reference to ObjectID constructor
var ObjectID = require('mongodb').ObjectID;

function databaseController (db) {
    var pollsCollection = db.collection('polls');

    /*
        API call database functions
    */
    
    this.deletePoll = function (req, res) {
        del({'_id': new mongodb.ObjectID(req.body.selectedpoll)}, function(){
            res.send(true);
        });
    };
    
    this.getPoll = function(req, res){
        read({'_id': new ObjectID(req.query.pollId)}, 
            {'_id': 1, 'pollname': 1, 'pollOptions': 1},
            function(documents){
                res.send(documents[0]);
            });
    };
    
    this.getPolls = function (req, res) {
        read({'pollOwner': req.user._id}, 
            {'_id': 1, 'pollname': 1, 'pollOptions': 1}, 
            function(documents){
                res.send(documents);
            });
    };
    
    
    this.getResults = function(req, res){
        read({'_id': new ObjectID(req.query.pollId)}, 
            {'_id': 1, 'pollname': 1, 'pollOptions': 1, 'pollVotes': 1}, 
            function(documents){
                res.send(documents[0]);
            });
    };
    /*
        Generic database functions
    */
    this.getPollList = function (callback) {
        read({}, 
            {'_id': 1, 'pollname': 1, 'pollVotes': 1}, 
            function(documents){
                callback(documents);
            });
    };
    
    this.getPollOptions = function (pollId, callback) {
        read({'_id': new ObjectID(pollId)},
            {'_id': 1, 'pollname': 1, 'pollOptions': 1},
            function(poll){
                callback(poll);
            });
    };

    this.getPollText = function (pollId, callback) {
        read({'_id': new ObjectID(pollId)},
            {'_id': 1, 'pollname': 1, 'pollOptions': 1},
            function(poll){
                callback(poll[0]);
            });
    };
    
    this.addPoll = function (pollName, pollOwner, pollOptions, callback) {
        // Prepare zero-filled array for initial votes
        var initialVoteCount = Array.apply(null, Array(pollOptions.length)).map(Number.prototype.valueOf, 0);
        
        create({'pollname': pollName, 'pollOwner': pollOwner, 'pollOptions': pollOptions, 'pollVotes': initialVoteCount}, function(newPollId){
              callback(newPollId);
            });
    };
    
    this.replacePoll = function(pollId, userId, pollName, pollOptions, callback){
        update(
            {'_id': new ObjectID(pollId), 'pollOwner': new ObjectID(userId)},
            {$set: {'pollname': pollName, 'pollOptions': pollOptions}, $push: {'pollVotes' : 0}},
            callback);
    };
    
    this.incrementPollOption = function (pollId, pollOption, callback) {
        var pollVoteReference = {};
        pollVoteReference["pollVotes." + pollOption] = 1;

        update(
            {'_id': new ObjectID(pollId)},
            { $inc: pollVoteReference },
            callback
        );
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
                
                callback(result.ops[0]._id);
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
    
    /*
        Helper functions
    */
    function calculateTotalVotes(poll){
        var total = 0;
        
        for(var i=0; i<poll[0].pollVotes.length; i++){
            total += poll[0].pollVotes[i];
        }
        
        return total;
    }
}

module.exports = databaseController;