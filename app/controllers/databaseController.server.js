'use strict';
var qs = require('querystring');
const POLL_PROJECTION = { '_id': false };

function databaseController (db) {
    var pollsCollection = db.collection('polls');

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
    
        create({ 'pollname': pollName,
              'polloptions': pollOptions },
              function(){
                  // todo - redirection
                  showCollection();
              });
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
    
    function showCollection(){
        read({}, null, function(documents){
            console.log(documents);
        })
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
        var cursor = pollsCollection.find(query, projection);
        
        callback(cursor.toArray());
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
    
    function del(filter){
        pollsCollection.deleteOne(
            filter
        );
    }
}

module.exports = databaseController;