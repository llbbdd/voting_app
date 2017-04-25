'use strict';
var ObjectID = require('mongodb').ObjectID;

function databaseController (db) {
    var userCollection = db.collection('users');

    this.getUserByUsername = function (username, callback) {
        readOne({'username': username}, function (user){
            callback(user);
        });
    };
    
    this.getUserById = function (userId, callback) {
        readOne({id: userId}, function(user) {
            callback(user);
        });
    };
    
    function showCollection(){
        read({}, {}, function(documents){
            console.log(documents);
        });
    }
    
    /*
        Low-level database access
    */
    function create(document, callback){
        userCollection.insert(
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
        userCollection.find(query, projection).toArray(function(err, results) {
            if (err) {
                throw err;
            }
            
            callback(results);
        });
    }
    
    function readOne(query, callback){
        userCollection.find(query).limit(1).next(function(err, result){
            if (err) {
                throw err;
            }

            callback(result);
        });
    }
    
    function update(query, update, callback){
        userCollection.update(
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
        userCollection.deleteOne(
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