var express = require('express');
var app = express.Router();
var client = require('./dbconnect');
var bodyParser = require('body-parser').text();
var jwt = require("jsonwebtoken");
var secret = "sushiaresogood";

/*  "/api/slides/:id"
*   GET : find a single slide by ID
*   PUT : update a slide by ID
*   DELETE : delete a slide by ID
*/

app.get('/:id', function(req,res) {
    client.query('SELECT * FROM slide WHERE ids=' + req.params.id + ';', (err, result) => {
        if (err) throw err;
        
        res.json(result.rows);
    });
});

app.put('/:id', function(req,res) {
    res.send("The slide : " + req.params.id + " has been updated");
});

app.delete('/:id', function(req,res) {
    /*client.query('DELETE FROM slide WHERE ids=' + req.params.id + ';', (err, result) => {
        if (err) throw err;
        
        res.json(result.rows);
        
        client.end();
    });*/
    res.send("The slide : " + req.params.id + " has been deleted");
});

//export module -------------------------------------
module.exports = app;
