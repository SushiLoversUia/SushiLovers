var express = require('express');
var app = express.Router();
var client = require('./dbconnect');
var bodyParser = require('body-parser').text();
var jwt = require("jsonwebtoken");
var bcrypt = require('bcrypt-nodejs');
var secret = "sushiaresogood";

/*  "/api/users"
*   GET : find all users
*   POST : create a new user 
*/

app.get('/', function(req,res) {
    client.query('SELECT * FROM account;', (err, result) => {
        if (err) throw err;

        res.json(result.rows);
    });
});

app.post('/', bodyParser, function(req,res) {
    var upload = JSON.parse(req.body);
    var userid = upload.loginname;
    var passw = bcrypt.hashSync(upload.password);
    var fullname = upload.fullname;
    var email = upload.email;

    client.query('INSERT INTO account(userid,userpassw,fullname,email) VALUES(\'' + userid + '\',\'' + passw + '\',\'' + fullname + '\',\'' + email + '\');', (err, resu) => {
        if (err) throw err;

        //create the token        
        var payload = {loginname: userid, fullname: fullname};
        var tok = jwt.sign(payload, secret, {expiresIn: "12h"});
        //send logininfo + token to the client
        res.status(200).json({loginname: userid, fullname: fullname, email: email, token: tok}); 
    });
});

/*  "/api/users/user/"
*   GET : find a single user by ID
*   PUT : update a user by ID
*   DELETE : delete a user by ID
*/

app.get('/user/', bodyParser, function(req,res) {
    var strquery;
    var msg1;
    var msg2;

    if(req.query['userid'] != undefined)
    {
        strquery = 'SELECT * FROM account WHERE userid=\'' + req.query['userid'] + '\';';
        msg1 = "The user doesn't exist";
        msg2 = "The user exist";
    }
    else
    {
        strquery = 'SELECT * FROM account WHERE email=\'' + req.query['email'] + '\';';
        msg1 = "The email adress doesn't exist";
        msg2 = "The email adress exist";
    }
    
    client.query(strquery, (err, result) => {
        if (err) throw err;
        
        if(result.rows <= 0)
            res.status(403).json({msg: msg1});
        else
            res.status(200).json({msg: msg2});
    });
});

app.put('/user/', bodyParser, function(req,res) {
    var upload = JSON.parse(req.body);
    var userid = upload.loginname;
    var fullname = upload.fullname;
    var passw = bcrypt.hashSync(upload.password);
    var email = upload.email;
    var tok = req.query['token'];
    var strquery;

    if(passw != "")
        strquery = 'UPDATE account SET userpassw=\'' + passw + '\',fullname=\'' + fullname + '\',email=\'' + email + '\' WHERE userid=\'' + userid + '\';';
    else
        strquery = 'UPDATE account SET fullname=\'' + fullname + '\',email=\'' + email + '\' WHERE userid=\'' + userid + '\';';
    
    client.query(strquery, (err, resu) => {
        if (err) throw err;
        
        res.status(200).json({loginname: userid, fullname: fullname, email: email, token: tok});
    });
});

app.delete('/user/', function(req,res) {
   client.query('DELETE FROM account WHERE userid=' + req.query['userid'] + ';', (err, result) => {
        if (err) throw err;
        
        res.json({ message: 'Succesfully deleted' });
    });
});

/* "/api/users/auth"
*   POST : authenticate a user
*/

app.post('/auth', bodyParser, function(req,res) {

    var upload = JSON.parse(req.body);
    var loginname = upload.loginname;
    var password = upload.password;

    /* Query to verify if the login is correct */
    client.query('SELECT * FROM account WHERE userid=\'' + loginname + '\';', (err, result) => {
        
        if(err) throw err;

        if(result.rows <= 0) {
            res.status(403).json({msg: "Login name does not exists"});
            return;
        } 
        else {
            var dbloginname = result.rows[0].userid;
            var dbpassword = result.rows[0].userpassw;
            var dbfullname = result.rows[0].fullname; 
            var dbemail = result.rows[0].email;
            //check if the password is correct
            var checkpwd = bcrypt.compareSync(password, dbpassword);

            if(!checkpwd) {
                res.status(403).json({msg: "Wrong password"});
                return;
            }
        }
        //we have a valid user ‐> create the token
        var payload = { loginname: dbloginname, fullname: dbfullname }; 
        var tok = jwt.sign(payload, secret, {expiresIn: "12h"});
        //send logininfo + token to the client
        res.status(200).json({loginname: dbloginname, fullname: dbfullname, email: dbemail, token: tok});
    });
});

/* Dashboard access */

//Authorize all dashboard‐endpoints ‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐
app.use(function (req, res, next) {
    //get the token from the URL‐variable named 'token'
    var token = req.query['token'];
    if (!token) {
        res.status(403).redirect('https://app-presentation-sushi-lovers.herokuapp.com/errortoken.html'); //send 
        return; //quit
    }
    else {
        try {
            logindata = jwt.verify(token, secret); //check the token
        }
        catch(err) {
            res.status(403).redirect('https://app-presentation-sushi-lovers.herokuapp.com/errortoken.html'); //send
            return; //quit
        }
    }
    next(); //we have a valid token ‐ go to the requested endpoint 
});

app.get('/dashboard', function(req, res) {
    res.status(200).redirect('https://app-presentation-sushi-lovers.herokuapp.com/user_dashboard.html');
});

//export module -------------------------------------
module.exports = app;
