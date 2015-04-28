// localhost's port:
var port = 8878; // localhost:8878

// Setup express
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/'));

// Data source (DB initialization)
var json = require('./cv.json');

// Mongodb config and setup
var db = require('mongodb').Db;
var server = require('mongodb').Server;
var client =  new db('expedITion', new server("127.0.0.1", 27017, {}), {w:1});


/*
 *  Database initialization from json file (based on Aufgabe 2)
 */

client.open(function (err, client) {
    if(err) throw err;
    client.createCollection('Person', function (err, collection) {

            collection.find().toArray(function(err, documents) {
                if(err) throw err;

                //console.log(documents);
                pers = collection;

                if(documents.length > 0) {
                    console.log("Database already initialized.");
                } else {
                    // initialize just once
                    collection.insert(json, {safe: true}, function (err, json) {
                        if (err) throw err;
                    });
                    console.log("Initialized mongodb successfully with CV data...");
                }

            })

    })
});


/*
 * Query for the CV data
 */
app.get('/cv', function(req, res) {

    client.open(function (err, db) {
        if(err) throw err;

        db.collection("Person", function(err, collection) {
            if(err) throw err;

            // get just first Person's CV data
            collection.findOne(function (err, data) {
                //console.log(data);

                if (err) {
                    res.send(err)
                }

                // return data on success
                res.json(data);

            });
        });

    });

});


/*
 * Catchall route for CV delivery
 */
app.get('*', function(req, res) {
    res.sendfile('./index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(port);
console.log('Listening on localhost:' + port + ' ...')