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

/*  "/api/presentations/"
*   GET : find a single presentation by ID
*   POST : add a new presentation
*   PUT : update a presentation by ID
*   DELETE : delete a presentation by ID
*/

app.get('/', function(req,res) {
    client.query('SELECT * FROM user_presentations WHERE ida=' + req.query['ida'] + ';', (err, result) => {
        if(err) throw err;
        
        res.status(200).json(result.rows);
    });
});

app.post('/', bodyParser, function(req,res) {
    var upload = JSON.parse(req.body);
    var ida = upload.ida;
    var fullname = upload.fullname;
    var namepres = upload.namepres;
    var creationday = dateFormat();
    var nbSlides = upload.nbSlides;
    
    var strquery = 'INSERT INTO presentation(owner,namepres,creationday,ida,nbslides) VALUES(\'' + fullname + '\',\'' + namepres + '\',\'' + creationday + '\',\'' + ida + '\', 1) RETURNING idp;';

    client.query(strquery, (err, result) => {
        if (err) throw err;

        //send logininfo + token to the client
        res.status(200).json(result.rows[0].idp); 
    });
});

function dateFormat() {
    var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();

    if(dd<10)
        dd = '0'+dd

    if(mm<10) 
        mm = '0'+mm

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

app.put('/', function(req,res) {
    var upload = JSON.parse(req.body);
    var ida = upload.idp;
    var namepres = upload.namepres;
    var nbSlides = upload.nbSlides;
    
    var strquery = 'UPDATE presentation SET namepres=\'' + namepres + '\', nbSlides=\'' + nbSlides + '\' WHERE idp=' + upload.ipd + ';';

    client.query(strquery, (err, resu) => {
        if (err) throw err;

        res.status(200).json({msg: "Presentation successfully updated"}); 
    });
});

app.delete('/', function(req,res) {
    client.query('DELETE FROM presentation WHERE idp=' + req.query['idp'] + ';', (err, result) => {
        if (err) throw err;
        
        res.status(200).json({msg: "Presentation successfully deleted"});
    });
});

app.get('/new', function(req,res) {
    res.redirect('presentation.html');
});

//export module -------------------------------------
module.exports = app;
