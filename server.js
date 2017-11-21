
/* Init */

const express = require('express');
const app = express();

//app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/* Using public folder */

app.use(express.static('public'));

// global for all routes -------------------------
app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next(); //go to the specified route
});

app.get('/',function(req, res) {
    res.redirect('index.html');
});

app.get('/another', function(req, res) {
    res.redirect('another.html');
});

var users = require('./users.js');
app.use('/api/users/', users);

var presentations = require('./presentations.js');
app.use('/api/presentations/', presentations);

var slides = require('./slides.js');
app.use('/api/slides/', slides);

/* Default adress */

app.use(function(req, res, next) {
    res.send('404 NOT FOUND');
});

/* Listening PORT */
   
app.listen(process.env.PORT || 8080, function () {
  console.log('My app listening on port 8080!');
});