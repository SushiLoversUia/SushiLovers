
/* Init */

const express = require('express')
const app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/* Database connection */

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

/* Using public folder */

app.use(express.static(__dirname + '/public'));

/* Example of use */

app.get('/', function(req, res) {
});

app.get('/another', function(req, res) {
    res.redirect('another.html');
});

/*  "/api/users"
*   GET : find all users
*   POST : create a new user 
*/

app.get('/api/users', function(req,res) {
    client.query('SELECT * FROM account;', (err, result) => {
        if (err) throw err;

        res.json(result.rows);
        
        //client.end();
    });
});

/* exemple : http://localhost:8080/api/user?id=heyhey&pwd=passweurd&fstname=Arnaud&lstname=Soler&bdate=03-07-1995 */
app.post('/api/users', function(req,res) {
    var userid = req.body.id;
    var passw = req.body.pwd;
    var fstname = req.body.fstname;
    var lstname = req.body.lstname;
    var bdate = req.body.bdate;
    
    var dummyData = "[{\"userid\":\"" + userid + "\",\"userpassw\":\"" + passw + "\",\"frstname\":\"" + fstname + "\"";
    dummyData += ",\"lstname\":\"" + lstname + "\",\"birthdate\":\"" + bdate + "\"}]";
    
    res.send(dummyData);
    
    /*client.query('INSERT INTO account(userid,userpassw,frstname,lstname,birthdate) VALUES(\'' + userid + '\',\'' + passw + '\',\'' + fstname + '\',\'' + lstname + '\',\'' + bdate + '\');', (err, res) => {
        if (err) throw err;
        console.log('Successful adding user : ' + userid + ' password : ' + passw);
        console.log('First name : ' + fstname + ' Last name : ' + lstname);
        console.log('Birthdate : ' + bdate);
        
        client.end();
    });*/
});

/*  "/api/user/:id"
*   GET : find a single user by ID
*   PUT : update a user by ID
*   DELETE : delete a user by ID
*/

app.get('/api/user/:id', function(req,res) {
    client.query('SELECT * FROM account WHERE ida=' + req.params.id + ';', (err, result) => {
        if (err) throw err;
        
        res.json(result.rows);
    });
});

app.put('/api/user/:id', function(req,res) {
    res.send("The user : " + req.params.id + " has been updated");
});

app.delete('/api/user/:id', function(req,res) {
    
    /*client.query('DELETE FROM account WHERE ida=' + req.params.id + ';', (err, result) => {
        if (err) throw err;
        
        res.json(result.rows);
        
        client.end();
    });*/
    res.send("The user : " + req.params.id + " has been deleted");
});

/*  "/api/presentation/:id"
*   GET : find a single presentation by ID
*   PUT : update a presentation by ID
*   DELETE : delete a presentation by ID
*/

app.get('/api/presentation/:id', function(req,res) {
    client.query('SELECT * FROM presentation WHERE idp=' + req.params.id + ';', (err, result) => {
        if (err) throw err;
        
        res.json(result.rows);
    });
});

app.put('/api/presentation/:id', function(req,res) {
    res.send("The presentation : " + req.params.id + " has been updated");
});

app.delete('/api/presentation/:id', function(req,res) {
    /*client.query('DELETE FROM presentation WHERE idp=' + req.params.id + ';', (err, result) => {
        if (err) throw err;
        
        res.json(result.rows);
        
        client.end();
    });*/
    res.send("The presentation : " + req.params.id + " has been deleted");
});

/*  "/api/slide/:id"
*   GET : find a single slide by ID
*   PUT : update a slide by ID
*   DELETE : delete a slide by ID
*/

app.get('/api/slide/:id', function(req,res) {
    client.query('SELECT * FROM slide WHERE ids=' + req.params.id + ';', (err, result) => {
        if (err) throw err;
        
        res.json(result.rows);
    });
});

app.put('/api/slide/:id', function(req,res) {
    res.send("The slide : " + req.params.id + " has been updated");
});

app.delete('/api/slide/:id', function(req,res) {
    /*client.query('DELETE FROM slide WHERE ids=' + req.params.id + ';', (err, result) => {
        if (err) throw err;
        
        res.json(result.rows);
        
        client.end();
    });*/
    res.send("The slide : " + req.params.id + " has been deleted");
});

/* Default adress */

app.use(function(req, res, next) {
    res.redirect('/');
});

/* Listening PORT */
   
app.listen(process.env.PORT || 8080, function () {
  console.log('My app listening on port 8080!');
});