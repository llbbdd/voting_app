'use strict';
const POLL_PROJECTION = { '_id': false };

function databaseController (db) {
    var pollsCollection = db.collection('polls');

    this.getPolls = function (req, res) {
        console.log("getPolls");
        read({}, 
            {_id: 0}, 
            function(documents){
                // todo - redirection
                console.log(documents);
                res.send(documents);
            });
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
    
    function del(filter){
        pollsCollection.deleteOne(
            filter
        );
    }
}

module.exports = databaseController;