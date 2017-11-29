var express = require('express');
var app = express.Router();
var client = require('./dbconnect');
var bodyParser = require('body-parser').text();
var jwt = require("jsonwebtoken");
var secret = "sushiaresogood";

//Authorize all slides‐endpoints ‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐
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

/*  "/api/slides/:id"
*   GET : find a single slide by ID
*   POST : add a slide
*   DELETE : delete a slide by ID
*/

app.get('/', function(req,res) {
    client.query('SELECT * FROM slide WHERE idp=' + req.query['idp'] + ';', (err, result) => {
        if (err) throw err;

        res.status(200).json(result.rows);
    });
});

app.post('/', bodyParser, function(req,res) {
    var upload = JSON.parse(req.body);
    var content = upload.content;
    var idp = upload.idp;
    var strquery = 'INSERT INTO slide(content,idp) VALUES(\'' + content + '\',' + idp + ');';
    
    client.query(strquery, (err, result) => {
        if (err) throw err;
        
        res.status(200).json("Slide successfully added");
    });
});

app.delete('/', function(req,res) {
    client.query('DELETE FROM slide WHERE idp=' + req.query['idp'] + ';', (err, result) => {
        if (err) throw err;
        
        res.status(200).json({msg: "Slides successfully deleted"});
    });
});

//export module -------------------------------------
module.exports = app;
