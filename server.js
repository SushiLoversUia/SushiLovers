const express = require('express')
const app = express()

/* Database connection */

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

/* Using public folder */

app.use(express.static(__dirname + '/public'));

/* Example of use */

app.get('/', function(req, res) {
});

app.post('/another', function(req, res) {
    res.redirect('another.html');
});

/*  "/api/user"
*   GET : find all users
*   POST : create a new user 
*/

app.get('/api/user', function(req,res) {
    client.query('SELECT idA FROM account;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) 
        {
            console.log(JSON.stringify(row));
        }
        client.end();
    });
});

app.post('/api/user', function(req,res) {
});

/*  "/api/user/:id"
*   GET : find a single user by ID
*   PUT : update the user
*   DELETE : delete a user by ID
*/


app.get('/api/user/:id', function(req,res) {
});

app.put('/api/user/:id', function(req,res) {
});

app.delete('/api/user/:id', function(req,res) {
});

/*  "/api/presentation/:id"
*   GET : find a single presentation by ID
*   PUT : update the presentation
*   DELETE : delete a presentation by ID
*/

app.get('/api/presentation/:id', function(req,res) {
});

app.put('/api/presentation/:id', function(req,res) {
});

app.delete('/api/presentation/:id', function(req,res) {
});

/* Default adress */

app.use(function(req, res, next) {
    res.redirect('/');
});

/* Listening PORT */
   
app.listen(process.env.PORT || 8080, function () {
  console.log('My app listening on port 8080!');
});