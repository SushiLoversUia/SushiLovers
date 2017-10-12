const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.send('<h1> This is my proposal server for the project </h1>');
});

app.get('/about', function (req, res) {
    res.render('index.ejs');
});

app.post('/another', function(req, res) {
    res.render('another.ejs');
});

app.use(function(req, res, next) {
    res.redirect('/about');
})
   
app.listen(process.env.PORT || 8080, function () {
  console.log('My app listening on port 8080!');
});