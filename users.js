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
    var passw = bcrypt.hashSync(upload.password,10);
    var fstname = upload.fstname;
    var lstname = upload.lstname;
    var bdate = "01-01-1990";

    client.query('INSERT INTO account(userid,userpassw,fstname,lstname,birthday) VALUES(\'' + userid + '\',\'' + passw + '\',\'' + fstname + '\',\'' + lstname + '\',\'' + bdate + '\');', (err, resu) => {
        if (err) throw err;

        //create the token        
        var payload = {loginname: userid, fstname: fstname, lstname: lstname};
        var tok = jwt.sign(payload, secret, {expiresIn: "12h"});
        //send logininfo + token to the client
        res.status(200).json({loginname: userid, fstname: fstname, lstname: lstname, token: tok}); 
    });
});

/*  "/api/users/user/:id"
*   GET : find a single user by ID
*   PUT : update a user by ID
*   DELETE : delete a user by ID
*/

app.get('/user/:id', function(req,res) {
    client.query('SELECT * FROM account WHERE ida=' + req.params.id + ';', (err, result) => {
        if (err) throw err;
        
        res.json(result.rows);
    });
});

app.put('/user/:id', function(req,res) {
    res.send("The user : " + req.params.id + " has been updated");
});

app.delete('/user/:id', function(req,res) {
    
    client.query('DELETE FROM account WHERE ida=' + req.params.id + ';', (err, result) => {
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
            var dbfullname = result.rows[0].fstname; 
            //check if the password is correct
            var checkpwd = bcrypt.compareSync(password, dbpassword);

            if(!checkpwd) {
                res.status(403).json({msg: "Wrong password"});
                return;
            }
        }
        //we have a valid user ‐> create the token
        var payload = { loginname: dbloginname, fullname: dbpassword }; 
        var tok = jwt.sign(payload, secret, {expiresIn: "12h"});
        //send logininfo + token to the client
        res.status(200).json({loginname: dbloginname, fullname: dbfullname, token: tok});
    });
});

//export module -------------------------------------
module.exports = app;
