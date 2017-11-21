var express = require('express');
var app = express.Router();
var client = require('./dbconnect');
var bodyParser = require('body-parser').text();
var jwt = require("jsonwebtoken");
var secret = "sushiaresogood";

/*  "/api/presentations/:id"
*   GET : find a single presentation by ID
*   PUT : update a presentation by ID
*   DELETE : delete a presentation by ID
*/

app.get('/:id', function(req,res) {
    client.query('SELECT * FROM presentation WHERE idp=' + req.params.id + ';', (err, result) => {
        if(err) throw err;
        
        res.json(result.rows);
    });
});

app.put('/:id', function(req,res) {
    res.send("The presentation : " + req.params.id + " has been updated");
});

app.delete('/:id', function(req,res) {
    /*client.query('DELETE FROM presentation WHERE idp=' + req.params.id + ';', (err, result) => {
        if (err) throw err;
        
        res.json(result.rows);
        
        client.end();
    });*/
    res.send("The presentation : " + req.params.id + " has been deleted");
});

//export module -------------------------------------
module.exports = app;
