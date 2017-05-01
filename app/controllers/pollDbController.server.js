'use strict';
var mongodb = require('mongodb'); // Only required for static reference to ObjectID constructor
var ObjectID = require('mongodb').ObjectID;

function databaseController (db) {
    var pollsCollection = db.collection('polls');

    /*
        API call database functions
    */
    
    this.deletePoll = function (req, res) {
        del({_id: new mongodb.ObjectID(req.body.selectedpoll)}, function(){
            res.send(true);
        });
    };
    
    this.getPolls = function (req, res) {
        read({}, 
            {_id: 1, pollname: 1, polloptions: 1}, 
            function(documents){
                res.send(documents);
            });
    };
    
    /*
        Generic database functions
    */
    this.getPolls = function (callback) {
        read({}, 
            {_id: 1, pollname: 1, polloptions: 1}, 
            function(documents){
                callback(documents);
            });
    };
    
    this.getPollOptions = function (pollId, callback) {
        read({_id: new ObjectID(pollId)},
            {pollname: 1, pollOptions: 1},
            function(poll){
                callback(poll);
            });
    };

    this.getPollResults = function (pollId, callback) {
        read({_id: new ObjectID(pollId)},
            {},
            function(poll){
                poll[0]["totalvotes"] = calculateTotalVotes(poll);
                callback(poll);
            });
    };
    
    this.addPoll = function (pollName, pollOwner, pollOptions, callback) {
        var initialVoteCount = Array.apply(null, Array(pollOptions.length)).map(Number.prototype.valueOf,0);
        
        create({ 'pollname': pollName, 'pollOwner': pollOwner, 'pollOptions': pollOptions, 'pollVotes': initialVoteCount}, function(){
              callback();
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
    
    /*
        Helper functions
    */
    function calculateTotalVotes(poll){
        var total = 0;
        
        for(var i=0; i<poll[0].polloptions.length; i++){
            total += poll[0]["option" + i];
        }
        
        return total;
    }
}

module.exports = databaseController;