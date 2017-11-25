var express = require('express');
var app = express.Router();
var client = require('./dbconnect');
var bodyParser = require('body-parser').text();
var jwt = require("jsonwebtoken");
var secret = "sushiaresogood";
var logindata;

//Authorize all presentations‐endpoints ‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐
app.use(function (req, res, next) {
    //get the token from the URL‐variable named 'token'
    var token = req.query['token'];
    if (!token) {
        res.status(403).json({msg: "No token received"}); //send 
        return; //quit
    }
    else {
        try {
            logindata = jwt.verify(token, secret); //check the token
        }
        catch(err) {
            res.status(403).json({msg: "The token is not valid!"}); //send
            return; //quit
        }
    }
    next(); //we have a valid token ‐ go to the requested endpoint 
});

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
